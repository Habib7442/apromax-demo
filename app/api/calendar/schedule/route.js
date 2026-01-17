import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendInternalNotification } from '@/lib/emailService';

// Configuration
const GOOGLE_CALENDAR_CONFIG = {
  CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID || 'primary'
};

/**
 * Initialize Google Calendar client with service account
 */
async function getGoogleCalendarClient() {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Calendar environment variables');
      throw new Error('Google Calendar configuration is missing');
    }

    console.log('Initializing Google Calendar with:', {
      email: process.env.GOOGLE_CLIENT_EMAIL,
      keyLength: process.env.GOOGLE_PRIVATE_KEY?.length
    });

    // Clean up the private key
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Create the service account credentials object
    const serviceAccountKey = {
      type: 'service_account',
      project_id: 'apromax',
      private_key_id: 'dummy',
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: 'dummy',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs'
    };

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/meetings.space.created'
      ]
    });

    const authClient = await auth.getClient();
    console.log('Google Calendar authenticated successfully');

    return google.calendar({ version: 'v3', auth: authClient });
  } catch (error) {
    console.error('Error initializing Google Calendar client:', error);
    throw new Error('Failed to initialize calendar client');
  }
}

/**
 * Create a calendar event
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { date, time, duration, meetingType, formData, clientTimezone } = body;

    console.log('Received meeting request:', { date, time, duration, meetingType, clientTimezone });

    // Validate required fields
    if (!date || !time || !duration || !meetingType || !formData?.name || !formData?.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse date and time properly
    // Handle AM/PM format like "5:30 PM"
    let hours, minutes;

    if (time.includes('AM') || time.includes('PM')) {
      const [timePart, period] = time.split(' ');
      const [hoursStr, minutesStr] = timePart.split(':');
      hours = parseInt(hoursStr);
      minutes = parseInt(minutesStr);

      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0; // Midnight case
      }
    } else {
      // Handle 24-hour format like "17:30"
      [hours, minutes] = time.split(':').map(Number);
    }

    console.log('Parsed time:', { originalTime: time, hours, minutes });

    // Create datetime in client's timezone (assuming US Eastern)
    // Handle both Date objects and date strings
    let clientDateTime;
    if (typeof date === 'string') {
      // If it's a string like "2024-01-15", create a proper date
      clientDateTime = new Date(date + 'T00:00:00');
    } else {
      clientDateTime = new Date(date);
    }

    clientDateTime.setHours(hours, minutes, 0, 0);

    // Validate the client datetime
    if (isNaN(clientDateTime.getTime())) {
      console.error('Invalid client datetime:', { date, time, clientDateTime });
      throw new Error('Invalid date or time provided');
    }

    console.log('Client datetime:', clientDateTime.toISOString());

    // Convert to IST manually (EST is UTC-5, IST is UTC+5:30, so IST = EST + 10.5 hours)
    // For simplicity, we'll add 10.5 hours to convert EST to IST
    const istDateTime = new Date(clientDateTime.getTime() + (10.5 * 60 * 60 * 1000));

    console.log('IST datetime:', istDateTime.toISOString());

    const endDateTime = new Date(istDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(duration));

    // Calendar event creation DISABLED as per user request.
    // Instead, we will store the meeting and notify via email.
    
    // Generate a reference ID for tracking
    const meetingReference = `apromax-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const meetLink = "To be sent manually"; 

    console.log('Meeting reference for tracking:', meetingReference);

    // Store meeting in Supabase
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase');
      const supabase = getSupabaseAdmin();

      const meetingData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        message: formData.message || '',
        date: istDateTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: istDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        }),
        duration: parseInt(duration),
        meeting_type: meetingType,
        meet_link: null, // No automatic link
        google_event_id: null,
        google_event_url: null,
        status: 'pending' // pending manual approval/link
      };

      const { data: dbResult, error: dbError } = await supabase
        .from('meetings')
        .insert(meetingData)
        .select()
        .single();

      if (dbError) throw dbError;

      console.log('Meeting stored in Supabase database:', dbResult.id);
    
      // Send internal notification email to you (founder)
      await sendInternalNotification({
        ...formData,
        eventDetails: {
          date: istDateTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          time: istDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
          }),
          clientTime: clientDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/New_York'
          }),
          duration,
          meetingType: meetingType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          meetLink: "Manual (Check Supabase)",
          meetingId: dbResult.id // Use the DB ID
        }
      });

      return NextResponse.json({
        success: true,
        eventId: dbResult.id,
        meetLink: null,
        eventUrl: null,
        message: 'Meeting request received successfully'
      });

    } catch (dbError) {
      console.error('Failed to store meeting in Supabase:', dbError);
      throw dbError; // Fail if we can't save to DB
    }

  } catch (error) {
    console.error('Error creating calendar event:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to schedule meeting',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Get available time slots for a date
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const calendar = await getGoogleCalendarClient();
    
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get existing events for the day
    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items || [];
    const busySlots = events.map(event => ({
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date)
    }));

    // Define business hours time slots
    const timeSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
    ];

    // Filter available slots
    const availableSlots = timeSlots.filter(timeSlot => {
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      return !busySlots.some(busy => 
        (slotStart >= busy.start && slotStart < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (slotStart <= busy.start && slotEnd >= busy.end)
      );
    });

    return NextResponse.json({
      success: true,
      availableSlots,
      busySlots: busySlots.map(slot => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString()
      }))
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to check availability',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Send confirmation email (implement with your preferred email service)
 */
async function sendConfirmationEmail(data) {
  try {
    // Import the email service
    const { sendMeetingConfirmation, sendInternalNotification } = await import('@/lib/emailService');
    
    // Send confirmation to client
    const clientResult = await sendMeetingConfirmation(data);
    if (!clientResult.success) {
      console.error('Failed to send client confirmation:', clientResult.error);
    }
    
    // Convert time to IST for founder notification
    const eventDateTime = new Date(`${data.eventDetails.date} ${data.eventDetails.time}`);
    // Set the timezone to EST (America/New_York)
    const estDateTime = new Date(eventDateTime.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
    // Convert to IST (Asia/Kolkata)
    const istOptions = { 
      timeZone: 'Asia/Kolkata', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    const istTimeString = estDateTime.toLocaleTimeString('en-US', istOptions);
    
    const istDateOptions = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    const istDateString = estDateTime.toLocaleDateString('en-US', istDateOptions);
    
    // Send internal notification to founder using email service
    const internalNotificationResult = await sendInternalNotification({
      ...data,
      eventDetails: {
        ...data.eventDetails,
        date: istDateString,
        time: istTimeString + ' IST'
      }
    });
    
    if (!internalNotificationResult.success) {
      console.error('Failed to send internal notification to founder:', internalNotificationResult.error);
    } else {
      console.log('Internal notification sent successfully to founder');
    }
    // Database storage is now handled in the main function
    console.log('Meeting confirmation emails sent successfully');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
}
