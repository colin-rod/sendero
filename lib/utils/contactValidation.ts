import type { ContactSubject, ContactFormData } from '@/lib/types/database';
import { isValidEmail, type ValidationError } from './validation';

// Re-export ValidationError for use in components
export type { ValidationError };

/**
 * Validates a single contact subject value
 */
export function isValidContactSubject(value: string): value is ContactSubject {
  return ['general', 'tour', 'custom', 'feedback'].includes(value);
}

/**
 * Validates the entire contact form data
 * Returns an array of validation errors (empty if valid)
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name) {
    errors.push({ field: 'name', message: 'nameRequired' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'nameTooShort' });
  }

  // Validate email
  if (!data.email) {
    errors.push({ field: 'email', message: 'emailRequired' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'emailInvalid' });
  }

  // Validate subject (optional)
  if (data.subject && !isValidContactSubject(data.subject)) {
    errors.push({ field: 'subject', message: 'invalidSubject' });
  }

  // Validate message
  if (!data.message) {
    errors.push({ field: 'message', message: 'messageRequired' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'messageTooShort' });
  }

  return errors;
}
