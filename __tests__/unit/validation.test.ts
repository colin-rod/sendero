import {
  isValidEmail,
  isValidTourDuration,
  isValidInterestTypes,
  isValidFitnessLevel,
  isValidTravelTimeline,
  validateWaitlistForm,
} from '@/lib/utils/validation';
import type { WaitlistFormData } from '@/lib/types/database';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('invalid@example')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidTourDuration', () => {
    it('should validate correct tour durations', () => {
      expect(isValidTourDuration('one_day')).toBe(true);
      expect(isValidTourDuration('weekend')).toBe(true);
      expect(isValidTourDuration('one_week')).toBe(true);
    });

    it('should reject invalid tour durations', () => {
      expect(isValidTourDuration('invalid')).toBe(false);
      expect(isValidTourDuration('')).toBe(false);
      expect(isValidTourDuration('two_weeks')).toBe(false);
    });
  });

  describe('isValidInterestTypes', () => {
    it('should validate correct interest types', () => {
      expect(isValidInterestTypes(['hike'])).toBe(true);
      expect(isValidInterestTypes(['hike', 'bike'])).toBe(true);
      expect(isValidInterestTypes(['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm'])).toBe(true);
    });

    it('should reject invalid interest types', () => {
      expect(isValidInterestTypes([])).toBe(false);
      expect(isValidInterestTypes(['invalid'])).toBe(false);
      expect(isValidInterestTypes(['hike', 'invalid'])).toBe(false);
    });
  });

  describe('isValidFitnessLevel', () => {
    it('should validate correct fitness levels', () => {
      expect(isValidFitnessLevel('beginner')).toBe(true);
      expect(isValidFitnessLevel('moderate')).toBe(true);
    });

    it('should reject invalid fitness levels', () => {
      expect(isValidFitnessLevel('invalid')).toBe(false);
      expect(isValidFitnessLevel('advanced')).toBe(false);
      expect(isValidFitnessLevel('')).toBe(false);
    });
  });

  describe('isValidTravelTimeline', () => {
    it('should validate correct travel timelines', () => {
      expect(isValidTravelTimeline('next_3_months')).toBe(true);
      expect(isValidTravelTimeline('next_6_months')).toBe(true);
      expect(isValidTravelTimeline('later')).toBe(true);
    });

    it('should reject invalid travel timelines', () => {
      expect(isValidTravelTimeline('invalid')).toBe(false);
      expect(isValidTravelTimeline('now')).toBe(false);
      expect(isValidTravelTimeline('')).toBe(false);
    });
  });

  describe('validateWaitlistForm', () => {
    const validFormData: WaitlistFormData = {
      email: 'test@example.com',
      tourDuration: 'weekend',
      interestTypes: ['hike', 'bike'],
      fitnessLevel: 'beginner',
      travelTimeline: 'next_3_months',
    };

    it('should pass validation for valid form data', () => {
      const errors = validateWaitlistForm(validFormData);
      expect(errors).toHaveLength(0);
    });

    it('should return error for missing email', () => {
      const data = { ...validFormData, email: '' };
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'email',
        message: 'Email is required',
      });
    });

    it('should return error for invalid email format', () => {
      const data = { ...validFormData, email: 'invalid-email' };
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'email',
        message: 'Please enter a valid email address',
      });
    });

    it('should return error for missing tour duration', () => {
      const data = { ...validFormData, tourDuration: undefined } as Partial<WaitlistFormData>;
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'tourDuration',
        message: 'Please select a tour duration',
      });
    });

    it('should return error for empty interest types', () => {
      const data = { ...validFormData, interestTypes: [] };
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'interestTypes',
        message: 'Please select at least one interest',
      });
    });

    it('should return error for missing fitness level', () => {
      const data = { ...validFormData, fitnessLevel: undefined } as Partial<WaitlistFormData>;
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'fitnessLevel',
        message: 'Please select your fitness level',
      });
    });

    it('should return error for missing travel timeline', () => {
      const data = { ...validFormData, travelTimeline: undefined } as Partial<WaitlistFormData>;
      const errors = validateWaitlistForm(data);
      expect(errors).toContainEqual({
        field: 'travelTimeline',
        message: 'Please select your travel timeline',
      });
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const data: Partial<WaitlistFormData> = {
        email: '',
        interestTypes: [],
      };
      const errors = validateWaitlistForm(data);
      expect(errors.length).toBeGreaterThan(1);
    });
  });
});
