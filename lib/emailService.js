// Email Service for Meeting Confirmations
// This is a simple implementation - you can extend it with your preferred email service

/**
 * Send meeting confirmation email
 * @param {Object} data - Meeting and contact data
 * @returns {Promise<Object>} - Success/error response
 */
export async function sendMeetingConfirmation(data) {
  try {
    const {
      name,
      email,
      company,
      phone,
      message,
      eventDetails
    } = data;

    // Email template
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meeting Confirmation - AproMax Engineering</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .meeting-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #2563eb; }
        .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Meeting Confirmed!</h1>
            <p>Your meeting with AproMax Engineering has been successfully scheduled</p>
        </div>
        
        <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for scheduling a meeting with us! We're excited to discuss your project and explore how AproMax Engineering can help bring your vision to life.</p>
            
            <div class="meeting-details">
                <h3>📅 Meeting Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span>${eventDetails.date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span>${eventDetails.time} EST</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span>${eventDetails.duration} minutes</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Meeting Type:</span>
                    <span>${eventDetails.meetingType}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Google Meet:</span>
                    <span style="color: #f59e0b;">Link will be provided by our team before the meeting</span>
                </div>
            </div>
            
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${message ? `
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <strong>Project Details:</strong>
                    <p style="margin-top: 10px;">${message}</p>
                </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
                    <p><strong>📹 Google Meet Link:</strong> Our team will send you the meeting link 15 minutes before the scheduled time.</p>
                </div>
                <a href="https://calendar.google.com" class="button">📅 Add to Calendar</a>
            </div>
            
            <h3>🔔 What to Expect</h3>
            <ul>
                <li>You'll receive a calendar invite for this meeting</li>
                <li>Google Meet link will be sent 15 minutes before the meeting</li>
                <li>We'll send a reminder email before the meeting starts</li>
                <li>Please join a few minutes early to test your audio/video</li>
                <li>Have any relevant documents or questions ready</li>
            </ul>
            
            <h3>📞 Need to Reschedule?</h3>
            <p>If you need to reschedule or have any questions, please contact us:</p>
            <ul>
                <li>📧 Email: <a href="mailto:info@apromaxeng.com">info@apromaxeng.com</a></li>
                <li>📱 Phone: +91-9577291349 (India) | +1 (312) 313-9125 (US)</li>
            </ul>
            
            <p>We look forward to meeting with you!</p>
            
            <p>Best regards,<br>
            <strong>The AproMax Engineering Team</strong></p>
        </div>
        
        <div class="footer">
            <p>AproMax Engineering LLP</p>
            <p>57 Idgah Rd, Sijubari, Hatigaon, Guwahati, Assam 781038, India</p>
            <p>🌐 <a href="https://apromaxeng.com">www.apromaxeng.com</a></p>
        </div>
    </div>
</body>
</html>
    `;

    const emailText = `
Meeting Confirmation - AproMax Engineering

Dear ${name},

Your meeting with AproMax Engineering has been successfully scheduled!

Meeting Details:
- Date: ${eventDetails.date}
- Time: ${eventDetails.time} EST
- Duration: ${eventDetails.duration} minutes
- Type: ${eventDetails.meetingType}
- Google Meet: ${eventDetails.meetLink}

${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${message ? `Project Details: ${message}` : ''}

What to Expect:
- You'll receive a calendar invite with the Google Meet link
- We'll send a reminder 15 minutes before the meeting
- Please join a few minutes early to test your audio/video
- Have any relevant documents or questions ready

Need to reschedule? Contact us:
- Email: info@apromaxeng.com
- Phone: +91-9577291349 (India) | +1 (312) 313-9125 (US)

We look forward to meeting with you!

Best regards,
The AproMax Engineering Team

AproMax Engineering LLP
57 Idgah Rd, Sijubari, Hatigaon, Guwahati, Assam 781038, India
www.apromaxeng.com
    `;

    // Send actual email using the send-email API
    console.log('Sending confirmation email to:', email);

    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: `Meeting Confirmation - AproMax Engineering (${eventDetails.date} at ${eventDetails.time})`,
          html: emailHTML,
          text: emailText
        })
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        console.log('✅ Confirmation email sent successfully to:', email);
        return {
          success: true,
          message: 'Confirmation email sent successfully',
          messageId: emailResult.messageId
        };
      } else {
        console.error('❌ Failed to send confirmation email:', emailResult.error);
        return {
          success: false,
          error: 'Failed to send confirmation email',
          details: emailResult.details
        };
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      return {
        success: false,
        error: 'Email service unavailable',
        fallback: 'Meeting saved but confirmation email failed'
      };
    }
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Send internal notification to AproMax team (your Gmail)
 * @param {Object} data - Meeting and contact data
 * @returns {Promise<Object>} - Success/error response
 */
export async function sendInternalNotification(data) {
  try {
    const {
      name,
      email,
      company,
      phone,
      message,
      eventDetails
    } = data;

    // This will send an email to your Gmail account
    const founderEmail = 'guest74427@gmail.com'; // Your Gmail

    const internalEmailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>🚨 New Meeting Scheduled - ${name}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .client-info { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #059669; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .meeting-info { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .timezone-info { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        .action-button { display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: bold; }
        .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #374151; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Meeting Alert!</h1>
            <p>A client has scheduled a meeting with AproMax Engineering</p>
        </div>

        <div class="content">
            <div class="client-info">
                <h3>👤 Client Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span>${name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span><a href="mailto:${email}">${email}</a></span>
                </div>
                ${company ? `
                <div class="detail-row">
                    <span class="detail-label">Company:</span>
                    <span>${company}</span>
                </div>
                ` : ''}
                ${phone ? `
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span><a href="tel:${phone}">${phone}</a></span>
                </div>
                ` : ''}
            </div>

            <div class="meeting-info">
                <h3>📅 Meeting Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span>${eventDetails.date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Your Time (IST):</span>
                    <span><strong>${eventDetails.time}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Client Time (US):</span>
                    <span>${eventDetails.clientTime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span>${eventDetails.duration} minutes</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Meeting Type:</span>
                    <span>${eventDetails.meetingType}</span>
                </div>

            </div>

            <div class="timezone-info">
                <h3>🌍 Timezone Information</h3>
                <p><strong>Important:</strong> The meeting is scheduled in your calendar in IST (Indian Standard Time). The client selected the time in US timezone, which has been automatically converted.</p>
            </div>

            ${message ? `
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3>💬 Project Details</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            ` : ''}

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://calendar.google.com" class="action-button">📅 View Calendar</a>
            </div>

            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h3>✅ Action Items</h3>
                <ul>
                    <li>Meeting has been added to your Google Calendar</li>
                    <li>Prepare any relevant materials or questions</li>
                    <li>Create and send Google Meet link to client before meeting</li>
                    <li>Review client details and requirements above</li>
                </ul>
            </div>

            <p style="text-align: center; margin-top: 30px; color: #6b7280;">
                <strong>This meeting was scheduled via the AproMax Engineering website.</strong>
            </p>
        </div>
    </div>
</body>
</html>
    `;

    // Send actual email to your Gmail
    console.log('📧 Sending internal notification to:', founderEmail);
    console.log('Meeting scheduled by:', name, 'for', eventDetails.date, 'at', eventDetails.time, 'IST');

    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: founderEmail,
          subject: `🚨 New Meeting Scheduled - ${name} (${eventDetails.date} at ${eventDetails.time} IST)`,
          html: internalEmailHTML
        })
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        console.log('✅ Email sent successfully to:', founderEmail);
        return {
          success: true,
          message: 'Internal notification sent successfully',
          messageId: emailResult.messageId
        };
      } else {
        console.error('❌ Failed to send email:', emailResult.error);
        return {
          success: false,
          error: 'Failed to send email notification',
          details: emailResult.details
        };
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      return {
        success: false,
        error: 'Email service unavailable',
        fallback: 'Meeting saved but notification email failed'
      };
    }
    
  } catch (error) {
    console.error('Error sending internal notification:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Example integration with SendGrid
 * Uncomment and configure if using SendGrid
 */
/*
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmailWithSendGrid(to, subject, html, text) {
  try {
    const msg = {
      to,
      from: process.env.COMPANY_EMAIL || 'info@apromaxeng.com',
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error);
    return { success: false, error: error.message };
  }
}
*/

/**
 * Example integration with Nodemailer
 * Uncomment and configure if using Nodemailer
 */
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmailWithNodemailer(to, subject, html, text) {
  try {
    const mailOptions = {
      from: process.env.COMPANY_EMAIL || 'info@apromaxeng.com',
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Nodemailer error:', error);
    return { success: false, error: error.message };
  }
}
*/
