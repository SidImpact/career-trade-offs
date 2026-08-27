import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting (IP -> timestamp)
// Note: In a serverless environment (Vercel) this resets on cold starts, but still prevents aggressive looping.
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    // Allow 1 request per minute per IP
    if (rateLimitMap.has(ip)) {
      const lastRequest = rateLimitMap.get(ip)!;
      if (now - lastRequest < 60000) {
        return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, now);

    const { name, email, category, rating, message, _honeypot } = await req.json();

    // Honeypot check: If the hidden field is filled, it's a bot
    if (_honeypot) {
      console.warn(`Honeypot triggered by IP: ${ip}`);
      return NextResponse.json({ ok: true }); // Fake success for bots
    }

    if (!message || !category) {
      return NextResponse.json({ error: 'Message and category are required.' }, { status: 400 });
    }

    const starLabel = rating > 0 ? ['', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'][rating] + ' (' + ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating] + ')' : 'Not rated';

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f7; padding: 24px; border-radius: 16px;">
        <div style="background: #111; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">📬 New Feedback Received</h1>
          <p style="margin: 6px 0 0; color: #aaa; font-size: 14px;">Career Trade-Offs Platform</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; margin-bottom: 20px; border: 1px solid #e5e5e5;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888; width: 140px;">From</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #111;">${name || 'Anonymous'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Reply-To</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #111;">${email || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Category</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #111;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Rating</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #111;">${starLabel}</td>
          </tr>
        </table>

        <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888;">Message</p>
          <p style="margin: 0; font-size: 15px; color: #111; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="text-align: center; font-size: 12px; color: #999; margin: 0;">Sent via Career Trade-Offs Feedback System</p>
      </div>
    `;

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"Career Trade-Offs Feedback" <${gmailUser}>`,
        to: 'sidimpact6196@gmail.com',
        replyTo: email || gmailUser,
        subject: `[${category}] New Feedback${name ? ' from ' + name : ''}${rating > 0 ? ' - ' + rating + '★' : ''}`,
        html: htmlBody,
      });

      return NextResponse.json({ ok: true });
    }

    // Fallback: log to console if no credentials (for local dev testing)
    console.log('--- FEEDBACK (no SMTP configured) ---');
    console.log({ name, email, category, rating, message });
    console.log('-------------------------------------');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ error: 'Failed to send feedback. Please try again.' }, { status: 500 });
  }
}
