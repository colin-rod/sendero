import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase/client';
import { validateContactForm } from '@/lib/utils/contactValidation';
import { generateContactEmail } from '@/lib/email/contactEmail';
import type { ContactFormData, ApiSuccessResponse, ApiErrorResponse, ContactSubmissionInsert } from '@/lib/types/database';

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
  try {
    // Await params (Next.js 15+ async params)
    const { locale } = await params;

    // Parse request body
    const body = await request.json();

    // Validate the request body
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Type-safe after validation
    const formData = body as ContactFormData;

    // Prepare data for Supabase insert
    const insertData: ContactSubmissionInsert = {
      email: formData.email.toLowerCase().trim(),
      name: formData.name.trim(),
      subject: formData.subject || null,
      message: formData.message.trim(),
      locale: locale,
    };

    // Insert into Supabase
    // Note: We don't select the ID because RLS policy blocks selects for anon users
    const { error } = await supabase
      .from('contact_submissions')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(insertData as any);

    // Handle errors
    if (error) {
      console.error('Supabase error:', error);

      // Generic error response
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: 'Failed to save your message. Please try again.',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Send email notification via Resend (if configured)
    if (resend) {
      try {
        const emailContent = generateContactEmail({
          ...formData,
          locale: locale,
        });

        await resend.emails.send({
          from: 'Sendero Contact Form <contact@senderobiketrails.com>',
          to: 'info@senderobiketrails.com',
          subject: emailContent.subject,
          text: emailContent.text,
        });
      } catch (emailError) {
        // Log email error but don't fail the request
        // The submission is already saved in the database
        console.error('Email sending error:', emailError);
      }
    } else {
      console.log('Resend not configured - email notification skipped');
    }

    // Success response
    const successResponse: ApiSuccessResponse = {
      success: true,
      data: {
        message: 'Message sent successfully',
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
 * GET /api/contact
 * Not allowed - return 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
