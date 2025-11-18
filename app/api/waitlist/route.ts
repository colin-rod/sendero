import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { validateWaitlistForm } from '@/lib/utils/validation';
import type { WaitlistFormData, ApiSuccessResponse, ApiErrorResponse } from '@/lib/types/database';

/**
 * POST /api/waitlist
 * Handles waitlist signup submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate the request body
    const validationErrors = validateWaitlistForm(body);
    if (validationErrors.length > 0) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: validationErrors.map((e) => e.message).join(', '),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Type-safe after validation
    const formData = body as WaitlistFormData;

    // Prepare data for Supabase insert
    const insertData = {
      email: formData.email.toLowerCase().trim(),
      tour_duration: formData.tourDuration,
      interest_types: formData.interestTypes,
      fitness_level: formData.fitnessLevel,
      travel_timeline: formData.travelTimeline,
    };

    // Insert into Supabase
    // Note: We don't select the ID because RLS policy blocks selects for anon users
     
    const { error } = await supabase
      .from('waitlist_signups')
      .insert(insertData as any);

    // Handle errors
    if (error) {
      console.error('Supabase error:', error);

      // Check for unique constraint violation (duplicate email)
      if (error.code === '23505') {
        const errorResponse: ApiErrorResponse = {
          success: false,
          error: 'This email is already on the waitlist',
        };
        return NextResponse.json(errorResponse, { status: 409 });
      }

      // Generic error response
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: 'Failed to save your information. Please try again.',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Success response
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
