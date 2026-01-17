import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Send email using Nodemailer with Gmail
 * This will send emails to your Gmail account when meetings are scheduled
 */
export async function POST(request) {
  try {
    const { to, subject, html, text } = await request.json();

    // Validate required fields
    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required email fields' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    // You'll need to set up an App Password in your Gmail account
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'webdevelopment7442@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD // You need to generate this in Gmail settings
      },
      // Add additional security options
      secure: true,
      port: 465,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email options
    const mailOptions = {
      from: `"AproMax Engineering" <${process.env.GMAIL_USER || 'guest74427@gmail.com'}>`,
      to: to,
      subject: subject,
      html: html,
      text: text || 'Please enable HTML to view this email properly.'
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Test endpoint to verify email configuration
 */
export async function GET() {
  try {
    // Test email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'guest74427@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Verify connection
    await transporter.verify();

    return NextResponse.json({
      success: true,
      message: 'Email configuration is valid',
      user: process.env.GMAIL_USER || 'guest74427@gmail.com'
    });

  } catch (error) {
    console.error('Email configuration error:', error);
    
    return NextResponse.json(
      { 
        error: 'Email configuration failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        help: 'Make sure to set GMAIL_USER and GMAIL_APP_PASSWORD environment variables'
      },
      { status: 500 }
    );
  }
}
