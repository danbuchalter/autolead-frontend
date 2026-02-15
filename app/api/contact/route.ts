import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

interface ContactBody {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function validate(body: ContactBody) {
  const errors: Record<string, string> = {};

  if (!body.fullName || body.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required.';
  }

  if (!body.email || body.email.trim().length === 0) {
    errors.email = 'Email is required.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      errors.email = 'Email is invalid.';
    }
  }

  if (!body.phone || body.phone.trim().length === 0) {
    errors.phone = 'Phone number is required.';
  }

  if (!body.subject || body.subject.trim().length < 3) {
    errors.subject = 'Subject is required.';
  }

  if (!body.message || body.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      { success: false, message: 'Method not allowed' },
      { status: 405 }
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !notificationEmail) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Email service is not configured correctly. Please try again later.',
      },
      { status: 500 }
    );
  }

  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const errors = validate(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const timestamp = new Date().toISOString();

  const mailTextLines = [
    'New contact form submission from Auto-Lead landing page',
    '',
    `Timestamp: ${timestamp}`,
    '',
    `Full Name: ${body.fullName}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || 'N/A'}`,
    `Subject: ${body.subject}`,
    '',
    'Message:',
    body.message ?? '',
  ];

  const recipients = [
    notificationEmail,
    'danielbuchalter@auto-lead.co.za',
    'danielgad@auto-lead.co.za',
  ]
    .filter(Boolean)
    .join(', ');

  try {
    await transporter.sendMail({
      from: `"Auto-Lead Contact Form" <${smtpUser}>`,
      to: recipients,
      subject: `New contact form submission: ${body.subject}`,
      text: mailTextLines.join('\n'),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. We will be in touch shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}

