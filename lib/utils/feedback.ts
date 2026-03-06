import type { FeedbackFormData, FeedbackResponse } from '@/lib/types/feedback';

/**
 * Submits feedback to Google Sheets via the feedback API route.
 * Screenshots are converted to base64 and uploaded to Google Drive by the Apps Script webhook.
 *
 * @param data - The feedback form data
 * @param locale - Current language (en/de/es)
 * @returns Promise with success status
 */
export async function submitFeedback(
  data: FeedbackFormData,
  locale: string
): Promise<FeedbackResponse> {
  try {
    const payload = {
      email: data.email?.trim() || undefined,
      category: data.category,
      message: data.message.trim(),
      screenshot: data.screenshot ? await fileToBase64(data.screenshot) : undefined,
      platform: navigator.userAgent,
      url: window.location.href,
      locale,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(`/${locale}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      return {
        success: false,
        error: result.error || 'Failed to submit feedback. Please try again.',
      };
    }

    return { success: true };
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

  // Message is required
  if (!data.message || !data.message.trim()) {
    errors.message = 'Please enter a message';
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
