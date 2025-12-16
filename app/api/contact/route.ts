import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email notification using Resend
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
      console.error('Error sending email:', emailError);
      // Don't fail the entire request if email fails, but log it
      // The contact is still saved in the database
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
