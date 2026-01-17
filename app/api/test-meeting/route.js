import { NextResponse } from 'next/server';

/**
 * Test endpoint to verify the complete meeting scheduling flow
 */
export async function POST() {
  try {
    console.log('🧪 Testing complete meeting scheduling flow...');

    // Test data
    const testData = {
      date: '2025-01-15',
      time: '2:00 PM',
      duration: '60',
      meetingType: 'consultation',
      formData: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '+1-555-0123',
        message: 'This is a test meeting to verify the system works correctly.'
      },
      clientTimezone: 'America/New_York'
    };

    console.log('📅 Scheduling test meeting with data:', testData);

    // Call the actual calendar scheduling API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/calendar/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Test meeting scheduled successfully!');
      return NextResponse.json({
        success: true,
        message: 'Test meeting scheduled successfully',
        details: {
          eventId: result.eventId,
          meetLink: result.meetLink,
          eventUrl: result.eventUrl,
          testData: testData
        }
      });
    } else {
      console.error('❌ Test meeting failed:', result.error);
      return NextResponse.json({
        success: false,
        error: 'Test meeting failed',
        details: result
      }, { status: 500 });
    }

  } catch (error) {
    console.error('🚨 Test meeting error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test meeting error',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * Get test status
 */
export async function GET() {
  return NextResponse.json({
    message: 'Meeting test endpoint ready',
    instructions: 'Send a POST request to test the complete meeting scheduling flow',
    testData: {
      date: '2025-01-15',
      time: '2:00 PM',
      duration: '60',
      meetingType: 'consultation',
      formData: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '+1-555-0123',
        message: 'This is a test meeting.'
      },
      clientTimezone: 'America/New_York'
    }
  });
}
