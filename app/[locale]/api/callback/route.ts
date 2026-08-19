import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateCallbackForm } from '@/lib/utils/bookingValidation';
import { generateCallbackEmail } from '@/lib/email/bookingEmail';
import { logEvent, emailDomain } from '@/lib/utils/log';
import type { CallbackFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * POST /api/callback
 * Handles callback (Rückruf) request submissions
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const request_id = crypto.randomUUID();
  const event = 'callback_submit';

  try {
    const { locale } = await params;
    const body = await request.json();

    const validationErrors = validateCallbackForm(body);
    if (validationErrors.length > 0) {
      logEvent({ event, request_id, status: 'fail', reason: 'validation', locale });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const formData = body as CallbackFormData;
    const domain = emailDomain(formData.email);

    if (resend) {
      try {
        const emailContent = generateCallbackEmail({
          ...formData,
          locale: locale,
        });

        await resend.emails.send({
          from: 'Sendero Callback Request <julian@senderobiketrails.com>',
          to: 'julian@senderobiketrails.com',
          subject: emailContent.subject,
          text: emailContent.text,
        });
      } catch (emailError) {
        logEvent({ event: 'callback_email', request_id, status: 'fail', error: emailError instanceof Error ? emailError.message : String(emailError) });
      }
    } else {
      logEvent({ event: 'callback_email', request_id, status: 'fail', reason: 'resend_not_configured' });
    }

    logEvent({ event, request_id, status: 'ok', locale, email_domain: domain });

    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Callback request sent successfully',
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
 * GET /api/callback
 * Not allowed - return 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
