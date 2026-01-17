import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    console.log('Testing Google Calendar authentication...');

    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json({
        error: 'Missing Google Calendar environment variables',
        details: {
          hasEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
          hasKey: !!process.env.GOOGLE_PRIVATE_KEY
        }
      }, { status: 400 });
    }

    // Clean up the private key
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    // Remove outer quotes if present
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }

    // Replace escaped newlines with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    console.log('Private key starts with:', privateKey.substring(0, 27));
    console.log('Private key ends with:', privateKey.substring(privateKey.length - 27));

    // Create the service account credentials object
    const serviceAccountKey = {
      type: 'service_account',
      project_id: 'apromax', // Your project ID
      private_key_id: 'dummy', // Not needed for JWT
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: 'dummy', // Not needed for JWT
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs'
    };

    console.log('Creating GoogleAuth...');
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });

    console.log('Getting auth client...');
    const authClient = await auth.getClient();

    console.log('Creating calendar client...');
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    console.log('Testing calendar access...');
    // Test by listing calendars
    const calendars = await calendar.calendarList.list();

    console.log('Calendar test successful!');
    return NextResponse.json({
      success: true,
      message: 'Google Calendar authentication successful',
      calendarsCount: calendars.data.items?.length || 0,
      serviceAccount: process.env.GOOGLE_CLIENT_EMAIL,
      calendars: calendars.data.items?.map(cal => ({
        id: cal.id,
        summary: cal.summary,
        primary: cal.primary
      }))
    });

  } catch (error) {
    console.error('Calendar test error:', error);

    return NextResponse.json({
      error: 'Google Calendar test failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      serviceAccount: process.env.GOOGLE_CLIENT_EMAIL
    }, { status: 500 });
  }
}
