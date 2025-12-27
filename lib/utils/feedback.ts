import { supabase } from '@/lib/supabase/client';
import type { FeedbackFormData, FeedbackResponse } from '@/lib/types/feedback';

/**
 * Submits feedback to Supabase Edge Function
 *
 * Handles screenshot conversion to base64 and platform detection.
 * The Edge Function will upload the screenshot to Storage and create a Linear issue.
 *
 * @param data - The feedback form data
 * @param locale - Current language (en/de/es)
 * @returns Promise with success status and optional issue ID
 */
export async function submitFeedback(
  data: FeedbackFormData,
  locale: string
): Promise<FeedbackResponse> {
  try {
    // Get platform info
    const platform = navigator.userAgent;
    const url = window.location.href;

    // Convert screenshot to base64 if provided
    let screenshotBase64: string | undefined;
    if (data.screenshot) {
      screenshotBase64 = await fileToBase64(data.screenshot);
    }

    // Prepare payload
    const payload = {
      email: data.email?.trim() || undefined,
      category: data.category,
      message: data.message.trim(),
      screenshot: screenshotBase64,
      platform,
      url,
      locale,
    };

    // Call Edge Function
    const { data: result, error } = await supabase.functions.invoke('submit-feedback', {
      body: payload,
    });

    if (error) {
      console.error('Edge function error:', error);
      return {
        success: false,
        error: 'Failed to submit feedback. Please try again.',
      };
    }

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to submit feedback',
      };
    }

    return {
      success: true,
      issueId: result.issueId,
    };
  } catch (error) {
    console.error('Submit feedback error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Converts File to base64 data URL
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validates feedback form data
 *
 * @param data - Partial feedback form data to validate
 * @returns Validation result with errors object
 */
export function validateFeedback(data: Partial<FeedbackFormData>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Category is required
  if (!data.category) {
    errors.category = 'Please select a category';
  }

  // Message is required and must have minimum length
  if (!data.message || !data.message.trim()) {
    errors.message = 'Please enter a message';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // Email format validation (only if provided)
  if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Screenshot size validation (max 5MB)
  if (data.screenshot && data.screenshot.size > 5 * 1024 * 1024) {
    errors.screenshot = 'Screenshot must be less than 5MB';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
