import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateWaitlistForm } from '@/lib/utils/validation';
import { logEvent, emailDomain } from '@/lib/utils/log';
import { generateWaitlistEmail } from '@/lib/email/waitlistEmail';
import type { WaitlistFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

/**
 * POST /api/waitlist
 * Handles waitlist signup submissions — writes to Google Sheets via Apps Script
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const request_id = crypto.randomUUID();
  const event = 'waitlist_submit';

  try {
    const { locale } = await params;
    const body = await request.json();

    const validationErrors = validateWaitlistForm(body);
    if (validationErrors.length > 0) {
      logEvent({ event, request_id, status: 'fail', reason: 'validation' });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const formData = body as WaitlistFormData;
    const domain = emailDomain(formData.email);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      logEvent({ event, request_id, status: 'fail', reason: 'missing_webhook_url' });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: 'Server configuration error. Please try again later.',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const sheetsResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email.toLowerCase().trim(),
      }),
    });

    if (!sheetsResponse.ok) {
      logEvent({ event, request_id, status: 'fail', reason: 'sheets_error', sheets_status: sheetsResponse.status, email_domain: domain });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: 'Failed to save your information. Please try again.',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Send confirmation email — awaited so Vercel doesn't shut down before it completes
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const emailContent = generateWaitlistEmail(locale);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'julian@senderobiketrails.com',
        to: formData.email.toLowerCase().trim(),
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });
    } catch (err) {
      logEvent({ event: 'waitlist_email', request_id, status: 'fail', error: err instanceof Error ? err.message : String(err) });
    }

    logEvent({ event, request_id, status: 'ok', email_domain: domain });

    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Successfully added to waitlist',
      },
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    logEvent({ event, request_id, status: 'fail', reason: 'unhandled', error: error instanceof Error ? error.message : String(error) });

    const errorResponse: ApiErrorResponse = {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * GET /api/waitlist
 * Not allowed - return 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
