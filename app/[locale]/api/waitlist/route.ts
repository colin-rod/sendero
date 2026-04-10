import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateWaitlistForm } from '@/lib/utils/validation';
import type { WaitlistFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

/**
 * POST /api/waitlist
 * Handles waitlist signup submissions — writes to Google Sheets via Apps Script
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationErrors = validateWaitlistForm(body);
    if (validationErrors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const formData = body as WaitlistFormData;

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL is not configured');
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
      console.error('Google Sheets error:', sheetsResponse.status);
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: 'Failed to save your information. Please try again.',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Send confirmation email — awaited so Vercel doesn't shut down before it completes
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'julian@senderobiketrails.com',
        to: formData.email.toLowerCase().trim(),
        subject: "You're on the Sendero waitlist!",
        html: `
          <h2>Welcome to Sendero Bike Trails!</h2>
          <p>Thanks for joining the waitlist. We'll reach out as soon as our first tours are ready to book.</p>
          <p>Stay tuned — something special is coming.</p>
          <br/>
          <p>The Sendero Team</p>
        `,
      });
    } catch (err) {
      console.error('Resend email failed (non-blocking):', err);
    }

    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Successfully added to waitlist',
      },
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    console.error('API route error:', error);

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
