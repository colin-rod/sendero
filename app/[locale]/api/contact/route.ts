import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm } from '@/lib/utils/contactValidation';
import { generateContactEmail } from '@/lib/email/contactEmail';
import { logEvent, emailDomain } from '@/lib/utils/log';
import type { ContactFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const request_id = crypto.randomUUID();
  const event = 'contact_submit';

  try {
    const { locale } = await params;
    const body = await request.json();

    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      logEvent({ event, request_id, status: 'fail', reason: 'validation', locale });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const formData = body as ContactFormData;
    const domain = emailDomain(formData.email);

    if (resend) {
      try {
        const emailContent = generateContactEmail({
          ...formData,
          locale: locale,
        });

        await resend.emails.send({
          from: 'Sendero Contact Form <julian@senderobiketrails.com>',
          to: 'julian@senderobiketrails.com',
          subject: emailContent.subject,
          text: emailContent.text,
        });
      } catch (emailError) {
        logEvent({ event: 'contact_email', request_id, status: 'fail', error: emailError instanceof Error ? emailError.message : String(emailError) });
      }
    } else {
      logEvent({ event: 'contact_email', request_id, status: 'fail', reason: 'resend_not_configured' });
    }

    logEvent({ event, request_id, status: 'ok', locale, email_domain: domain, has_subject: Boolean(formData.subject) });

    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Message sent successfully',
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
 * GET /api/contact
 * Not allowed - return 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
