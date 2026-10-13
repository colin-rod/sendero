import {
  REQUEST_MONTHS,
  RIDING_LEVELS,
  TRAVELER_OPTIONS,
  type BookingFormData,
  type RequestMonth,
  type RidingLevel,
  type Travelers,
} from '@/lib/types/database';
import { isValidEmail, type ValidationError } from './validation';

// Re-export ValidationError for use in components
export type { ValidationError };

export const MAX_MESSAGE_LENGTH = 5000;

/**
 * Validates a single request month value (including "flexible")
 */
export function isValidRequestMonth(value: unknown): value is RequestMonth {
  return value === 'flexible' || (REQUEST_MONTHS as readonly unknown[]).includes(value);
}

/**
 * Parses a `?monat=` query value (e.g. "2027-04" or "2027-03,2027-04") into a valid
 * month selection. Unknown values are dropped; "flexible" wins over specific months.
 */
export function parseRequestMonths(raw: string | null | undefined): RequestMonth[] {
  const months = (raw ?? '').split(',').map((m) => m.trim()).filter(isValidRequestMonth);
  if (months.includes('flexible')) return ['flexible'];
  return Array.from(new Set(months));
}

/**
 * Validates a travelers value
 */
export function isValidTravelers(value: unknown): value is Travelers {
  return (TRAVELER_OPTIONS as readonly unknown[]).includes(value);
}

/**
 * Validates a riding level value
 */
export function isValidRidingLevel(value: unknown): value is RidingLevel {
  return (RIDING_LEVELS as readonly unknown[]).includes(value);
}

/**
 * Validates the entire trip request form data.
 * Only first name and email are required; the rest is optional but must be well-formed.
 * Returns an array of validation errors (empty if valid)
 */
export function validateBookingForm(data: Partial<BookingFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof data.firstName !== 'string' || !data.firstName.trim()) {
    errors.push({ field: 'firstName', message: 'firstNameRequired' });
  }

  if (typeof data.email !== 'string' || !data.email.trim()) {
    errors.push({ field: 'email', message: 'emailRequired' });
  } else if (!isValidEmail(data.email.trim())) {
    errors.push({ field: 'email', message: 'emailInvalid' });
  }

  if (data.months !== undefined) {
    if (!Array.isArray(data.months) || !data.months.every(isValidRequestMonth)) {
      errors.push({ field: 'months', message: 'monthsInvalid' });
    } else if (data.months.includes('flexible') && data.months.length > 1) {
      errors.push({ field: 'months', message: 'monthsInvalid' });
    }
  }

  if (data.travelers != null && !isValidTravelers(data.travelers)) {
    errors.push({ field: 'travelers', message: 'travelersInvalid' });
  }

  if (data.level != null && !isValidRidingLevel(data.level)) {
    errors.push({ field: 'level', message: 'levelInvalid' });
  }

  if (data.message !== undefined) {
    if (typeof data.message !== 'string') {
      errors.push({ field: 'message', message: 'messageInvalid' });
    } else if (data.message.length > MAX_MESSAGE_LENGTH) {
      errors.push({ field: 'message', message: 'messageTooLong' });
    }
  }

  if (data.mailingList !== undefined && typeof data.mailingList !== 'boolean') {
    errors.push({ field: 'mailingList', message: 'mailingListInvalid' });
  }

  return errors;
}
