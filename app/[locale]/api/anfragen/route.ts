import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateBookingForm } from '@/lib/utils/bookingValidation';
import { generateBookingEmail } from '@/lib/email/bookingEmail';
import { addToMailingList } from '@/lib/mailingList';
import { logEvent, emailDomain } from '@/lib/utils/log';
import type { BookingFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * POST /api/anfragen
 * Handles trip request ("Reise anfragen") form submissions
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const request_id = crypto.randomUUID();
  const event = 'anfragen_submit';

  try {
    const { locale } = await params;
    const body = await request.json();

    // Honeypot: bots fill the hidden "company" field. Pretend success, send nothing.
    if (typeof body?.company === 'string' && body.company.trim() !== '') {
      logEvent({ event, request_id, status: 'fail', reason: 'honeypot', locale });
      const successResponse: ApiSuccessResponse = {
        success: true,
        data: { message: 'Booking inquiry sent successfully' },
      };
      return NextResponse.json(successResponse, { status: 201 });
    }

    const validationErrors = validateBookingForm(body);
    if (validationErrors.length > 0) {
      logEvent({ event, request_id, status: 'fail', reason: 'validation', locale });
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const formData: BookingFormData = {
      firstName: body.firstName.trim(),
      email: body.email.trim().toLowerCase(),
      months: body.months ?? [],
      travelers: body.travelers ?? null,
      level: body.level ?? null,
      message: body.message?.trim() || undefined,
      mailingList: body.mailingList === true,
      source: typeof body.source === 'string' ? body.source.slice(0, 50) : undefined,
    };
    const domain = emailDomain(formData.email);

    if (resend) {
      try {
        const emailContent = generateBookingEmail({
          ...formData,
          locale: locale,
        });

        await resend.emails.send({
          from: 'Sendero Booking Form <julian@senderobiketrails.com>',
          to: 'julian@senderobiketrails.com',
          replyTo: formData.email,
          subject: emailContent.subject,
          text: emailContent.text,
        });
      } catch (emailError) {
        logEvent({ event: 'anfragen_email', request_id, status: 'fail', error: emailError instanceof Error ? emailError.message : String(emailError) });
      }
    } else {
      logEvent({ event: 'anfragen_email', request_id, status: 'fail', reason: 'resend_not_configured' });
    }

    // Mailing list opt-in — non-blocking, the request itself already reached Julian.
    if (formData.mailingList) {
      try {
        const result = await addToMailingList(formData.email);
        if (!result.ok) {
          logEvent({ event: 'anfragen_mailing_list', request_id, status: 'fail', reason: result.reason, sheets_status: 'status' in result ? result.status : undefined });
        }
      } catch (listError) {
        logEvent({ event: 'anfragen_mailing_list', request_id, status: 'fail', error: listError instanceof Error ? listError.message : String(listError) });
      }
    }

    // TODO: auto-reply to the requester from Julian's address (first-person copy to be written separately).

    logEvent({
      event,
      request_id,
      status: 'ok',
      locale,
      email_domain: domain,
      months: formData.months.join(','),
      mailingList: formData.mailingList,
    });

    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Booking inquiry sent successfully',
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
 * GET /api/anfragen
 * Not allowed - return 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
