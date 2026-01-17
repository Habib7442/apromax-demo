// Google Calendar Integration Utilities
// Note: This requires server-side implementation for security

/**
 * Client-side Google Calendar integration helper
 * For production, move sensitive operations to API routes
 */

export const GOOGLE_CALENDAR_CONFIG = {
  // These should be environment variables in production
  CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  SCOPES: 'https://www.googleapis.com/auth/calendar.events',
};

/**
 * Initialize Google Calendar API
 */
export async function initializeGoogleCalendar() {
  try {
    if (typeof window === 'undefined') return null;
    
    // Load Google API
    await new Promise((resolve) => {
      if (window.gapi) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = resolve;
        document.head.appendChild(script);
      }
    });

    await window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        apiKey: GOOGLE_CALENDAR_CONFIG.API_KEY,
        clientId: GOOGLE_CALENDAR_CONFIG.CLIENT_ID,
        discoveryDocs: [GOOGLE_CALENDAR_CONFIG.DISCOVERY_DOC],
        scope: GOOGLE_CALENDAR_CONFIG.SCOPES
      });
    });

    return window.gapi;
  } catch (error) {
    console.error('Error initializing Google Calendar:', error);
    return null;
  }
}

/**
 * Create a Google Calendar event
 */
export async function createCalendarEvent(eventDetails) {
  try {
    const { date, time, duration, meetingType, formData } = eventDetails;
    
    // Parse date and time
    const [hours, minutes] = time.split(':').map(Number);
    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes, 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(duration));

    // Create event object
    const event = {
      summary: `${meetingType.replace('-', ' ').toUpperCase()} - ${formData.name}`,
      description: `
Meeting with ${formData.name} from ${formData.company || 'N/A'}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone || 'N/A'}

Project Details:
${formData.message || 'No additional details provided.'}

Meeting Type: ${meetingType.replace('-', ' ')}
Duration: ${duration} minutes
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [
        { email: formData.email, displayName: formData.name },
        { email: 'info@apromaxeng.com', displayName: 'AproMax Engineering' }
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 15 }, // 15 minutes before
        ],
      },
    };

    // For production, this should be done server-side
    const response = await window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    return {
      success: true,
      eventId: response.result.id,
      meetLink: response.result.hangoutLink,
      event: response.result
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Check availability for a given date and time
 */
export async function checkAvailability(date, timeSlots) {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.result.items || [];
    const busySlots = events.map(event => {
      const start = new Date(event.start.dateTime || event.start.date);
      const end = new Date(event.end.dateTime || event.end.date);
      return { start, end };
    });

    // Filter available time slots
    const availableSlots = timeSlots.filter(timeSlot => {
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);
      
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30); // Assuming 30-min minimum slots

      return !busySlots.some(busy => 
        (slotStart >= busy.start && slotStart < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (slotStart <= busy.start && slotEnd >= busy.end)
      );
    });

    return availableSlots;
  } catch (error) {
    console.error('Error checking availability:', error);
    return timeSlots; // Return all slots if check fails
  }
}

/**
 * Generate Google Meet link (alternative method)
 */
export function generateMeetLink() {
  // Simple Meet link generation for fallback
  const meetingId = Math.random().toString(36).substring(2, 15);
  return `https://meet.google.com/${meetingId}`;
}

/**
 * Send calendar invite via email (server-side implementation needed)
 */
export async function sendCalendarInvite(eventDetails) {
  try {
    // This should be implemented as an API route
    const response = await fetch('/api/calendar/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to send calendar invite');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending calendar invite:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Format timezone for display
 */
export function getTimezoneDisplay() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  
  return {
    timezone,
    display: `${timezone} (UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')})`
  };
}

/**
 * Validate business hours
 */
export function isBusinessHours(date, time) {
  const [hours] = time.split(':').map(Number);
  const dayOfWeek = date.getDay();
  
  // Monday to Friday, 9 AM to 6 PM
  return dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours < 18;
}

/**
 * Get next available business day
 */
export function getNextBusinessDay(date = new Date()) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
}
