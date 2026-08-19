import type {
  BookingFormData,
  CallbackFormData,
  TechnicalLevel,
  TourDate,
} from '@/lib/types/database';
import { isValidEmail, type ValidationError } from './validation';

// Re-export ValidationError for use in components
export type { ValidationError };

/**
 * Validates a single tour date value
 */
export function isValidTourDate(value: string): value is TourDate {
  return ['2027-04', '2027-11'].includes(value);
}

/**
 * Validates a single technical level value
 */
export function isValidTechnicalLevel(value: string): value is TechnicalLevel {
  return ['basic', 'intermediate', 'advanced', 'expert'].includes(value);
}

/**
 * Validates the entire booking form data
 * Returns an array of validation errors (empty if valid)
 */
export function validateBookingForm(data: Partial<BookingFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name) {
    errors.push({ field: 'name', message: 'nameRequired' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'nameTooShort' });
  }

  if (!data.email) {
    errors.push({ field: 'email', message: 'emailRequired' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'emailInvalid' });
  }

  if (!data.country || !data.country.trim()) {
    errors.push({ field: 'country', message: 'countryRequired' });
  }

  if (data.travelers === undefined || data.travelers === null) {
    errors.push({ field: 'travelers', message: 'travelersRequired' });
  } else if (!Number.isInteger(data.travelers) || data.travelers < 1) {
    errors.push({ field: 'travelers', message: 'travelersInvalid' });
  }

  if (!data.tourDate) {
    errors.push({ field: 'tourDate', message: 'tourDateRequired' });
  } else if (!isValidTourDate(data.tourDate)) {
    errors.push({ field: 'tourDate', message: 'tourDateRequired' });
  }

  if (!data.technicalLevel) {
    errors.push({ field: 'technicalLevel', message: 'technicalLevelRequired' });
  } else if (!isValidTechnicalLevel(data.technicalLevel)) {
    errors.push({ field: 'technicalLevel', message: 'technicalLevelRequired' });
  }

  return errors;
}

/**
 * Validates the callback (Rückruf) request form data
 * Returns an array of validation errors (empty if valid)
 */
export function validateCallbackForm(data: Partial<CallbackFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name) {
    errors.push({ field: 'name', message: 'nameRequired' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'nameTooShort' });
  }

  if (!data.phone || !data.phone.trim()) {
    errors.push({ field: 'phone', message: 'phoneRequired' });
  }

  if (!data.email) {
    errors.push({ field: 'email', message: 'emailRequired' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'emailInvalid' });
  }

  return errors;
}
