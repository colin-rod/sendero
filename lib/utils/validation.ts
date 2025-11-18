import type {
  TourDuration,
  InterestType,
  FitnessLevel,
  TravelTimeline,
  WaitlistFormData,
} from '@/lib/types/database';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validates email format using a simple regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a single tour duration value
 */
export function isValidTourDuration(value: string): value is TourDuration {
  return ['one_day', 'weekend', 'one_week'].includes(value);
}

/**
 * Validates an array of interest types
 */
export function isValidInterestTypes(values: string[]): values is InterestType[] {
  if (values.length === 0) return false;

  const validTypes: InterestType[] = ['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm'];
  return values.every((value) => validTypes.includes(value as InterestType));
}

/**
 * Validates a single fitness level value
 */
export function isValidFitnessLevel(value: string): value is FitnessLevel {
  return ['beginner', 'moderate'].includes(value);
}

/**
 * Validates a single travel timeline value
 */
export function isValidTravelTimeline(value: string): value is TravelTimeline {
  return ['next_3_months', 'next_6_months', 'later'].includes(value);
}

/**
 * Validates the entire waitlist form data
 * Returns an array of validation errors (empty if valid)
 */
export function validateWaitlistForm(data: Partial<WaitlistFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate email
  if (!data.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Validate tour duration
  if (!data.tourDuration) {
    errors.push({ field: 'tourDuration', message: 'Please select a tour duration' });
  } else if (!isValidTourDuration(data.tourDuration)) {
    errors.push({ field: 'tourDuration', message: 'Invalid tour duration selected' });
  }

  // Validate interest types
  if (!data.interestTypes || data.interestTypes.length === 0) {
    errors.push({ field: 'interestTypes', message: 'Please select at least one interest' });
  } else if (!isValidInterestTypes(data.interestTypes)) {
    errors.push({ field: 'interestTypes', message: 'Invalid interest type selected' });
  }

  // Validate fitness level
  if (!data.fitnessLevel) {
    errors.push({ field: 'fitnessLevel', message: 'Please select your fitness level' });
  } else if (!isValidFitnessLevel(data.fitnessLevel)) {
    errors.push({ field: 'fitnessLevel', message: 'Invalid fitness level selected' });
  }

  // Validate travel timeline
  if (!data.travelTimeline) {
    errors.push({ field: 'travelTimeline', message: 'Please select your travel timeline' });
  } else if (!isValidTravelTimeline(data.travelTimeline)) {
    errors.push({ field: 'travelTimeline', message: 'Invalid travel timeline selected' });
  }

  return errors;
}
