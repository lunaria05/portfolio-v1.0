import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY);

// Create nodemailer transporter for sending thank you emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Save contact to database
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email notification to portfolio owner using Resend
    try {
      await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>', // You'll need to verify your domain or use Resend's test email
        to: 'valahiral563@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: white;
                  border-radius: 10px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background: linear-gradient(135deg, #1aa9da 0%, #60d4f7 100%);
                  color: white;
                  padding: 30px;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .content {
                  padding: 30px;
                }
                .field {
                  margin-bottom: 20px;
                }
                .field-label {
                  font-weight: bold;
                  color: #1aa9da;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 5px;
                }
                .field-value {
                  background: #f8f9fa;
                  padding: 12px;
                  border-radius: 5px;
                  border-left: 3px solid #1aa9da;
                }
                .message-box {
                  background: #f8f9fa;
                  padding: 15px;
                  border-radius: 5px;
                  border-left: 3px solid #1aa9da;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
                .footer {
                  background: #f8f9fa;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                  border-top: 1px solid #e0e0e0;
                }
                .cta-button {
                  display: inline-block;
                  padding: 12px 24px;
                  background: #1aa9da;
                  color: white !important;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 15px;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📬 New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <p>You have received a new message from your portfolio contact form:</p>

                  <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">${name}</div>
                  </div>

                  <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value">
                      <a href="mailto:${email}" style="color: #1aa9da; text-decoration: none;">${email}</a>
                    </div>
                  </div>

                  <div class="field">
                    <div class="field-label">Message</div>
                    <div class="message-box">${message}</div>
                  </div>

                  <a href="mailto:${email}" class="cta-button">Reply to ${name}</a>
                </div>
                <div class="footer">
                  <p>This email was sent from your portfolio contact form.</p>
                  <p>Received on ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the entire request if email fails, but log it
      // The contact is still saved in the database
    }

    // Send thank you email to the user using Gmail
    try {
      await transporter.sendMail({
        from: `"Hiral Vala - Portfolio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank You for Reaching Out!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; padding: 20px; }
                .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
                .header { background: linear-gradient(135deg, #1aa9da 0%, #60d4f7 100%); padding: 50px 40px; text-align: center; }
                .header h1 { color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; }
                .emoji { font-size: 48px; margin-bottom: 16px; display: inline-block; }
                .content { padding: 40px; }
                .greeting { font-size: 20px; font-weight: 600; color: #1aa9da; margin-bottom: 20px; }
                .message-text { font-size: 16px; color: #555; margin-bottom: 20px; }
                .highlight-box { background: #f0f9ff; border-left: 4px solid #1aa9da; padding: 20px; margin: 25px 0; border-radius: 8px; }
                .info-card { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 25px 0; }
                .info-content { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
                .cta-container { text-align: center; margin: 30px 0; }
                .cta-button { display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #1aa9da 0%, #60d4f7 100%); color: #ffffff !important; text-decoration: none; border-radius: 50px; font-weight: 700; }
                
                /* --- FIXED SOCIAL LINKS CSS --- */
                .social-links-wrapper {
                  text-align: center;
                  margin: 30px 0;
                }
                /* Use inline-block instead of flex for better email support & wrapping */
                .social-link {
                  display: inline-block; 
                  padding: 10px 20px;
                  margin: 5px; /* Adds space around buttons so they don't touch when wrapping */
                  background: #f8f9fa;
                  color: #555 !important;
                  text-decoration: none;
                  border-radius: 25px;
                  font-size: 13px;
                  font-weight: 600;
                  border: 1px solid #e5e7eb;
                  white-space: nowrap; /* Keeps "GitHub" on one line, but moves whole button down */
                }
                .social-link:hover {
                  background: #1aa9da;
                  color: #ffffff !important;
                  border-color: #1aa9da;
                }
                /* -------------------------------- */

                .footer { background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb; }
                .footer-text { color: #888; font-size: 13px; margin: 8px 0; }
                .divider { height: 1px; background: #e5e7eb; margin: 30px 0; }
              </style>
            </head>
            <body>
              <div class="email-container">
                <!-- Header -->
                <div class="header">
                  <div class="header-content">
                    <div class="emoji">👋</div>
                    <h1>Thank You!</h1>
                  </div>
                </div>

                <!-- Content -->
                <div class="content">
                  <div class="greeting">Hey ${name}!</div>

                  <p class="message-text">
                    Thank you so much for reaching out through my portfolio! I really appreciate you taking the time to connect with me.
                  </p>

                  <div class="highlight-box">
                    <p style="margin:0; color:#0c4a6e;">
                      ✅ Your message has been successfully received. I'll get back to you as soon as possible!
                    </p>
                  </div>

                  <div class="info-card">
                    <div style="font-weight:700; color:#1aa9da; margin-bottom:12px;">📝 Your Message</div>
                    <div class="info-content">${message}</div>
                  </div>

                  <div class="cta-container">
                    <a href="https://github.com/Hiralvala563" class="cta-button" target="_blank">
                      Check Out My Work
                    </a>
                  </div>

                  <div class="divider"></div>

                  <p style="text-align: center; color: #888; font-size: 14px; margin-bottom: 15px;">Connect with me:</p>
                  
                  <!-- SOCIAL TEXT LINKS (Flows naturally on mobile) -->
                  <div class="social-links-wrapper">
                    <a href="https://github.com/Hiralvala563" class="social-link" target="_blank">GitHub</a>
                    <a href="https://www.linkedin.com/in/hiral-vala-3309b0212/" class="social-link" target="_blank">LinkedIn</a>
                    <a href="https://x.com/0xhiral" class="social-link" target="_blank">Twitter</a>
                    <a href="https://t.me/hiralvala563" class="social-link" target="_blank">Telegram</a>
                    <a href="mailto:valahiral563@gmail.com" class="social-link" target="_blank">Email</a>
                  </div>

                </div>

                <!-- Footer -->
                <div class="footer">
                  <p class="footer-text">
                    This is an automated confirmation email.
                  </p>
                  <p class="footer-text" style="margin-top: 20px;">
                    © ${new Date().getFullYear()} Hiral Vala. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      console.log('Thank you email sent successfully to:', email);
    } catch (thankYouEmailError) {
      console.error('Error sending thank you email:', thankYouEmailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        error: 'Failed to process your message. Please try again.',
      },
      { status: 500 }
    );
  }
}
