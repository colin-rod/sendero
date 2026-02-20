import { validateFeedback } from '@/lib/utils/feedback';
import type { FeedbackFormData } from '@/lib/types/feedback';

describe('validateFeedback', () => {
  const validData: FeedbackFormData = {
    category: 'general',
    message: 'This is a valid message',
  };

  it('returns valid with no errors for complete data', () => {
    const result = validateFeedback(validData);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('returns error when category is missing', () => {
    const result = validateFeedback({ message: 'Hello' });
    expect(result.valid).toBe(false);
    expect(result.errors.category).toBe('Please select a category');
  });

  it('returns error when message is missing', () => {
    const result = validateFeedback({ category: 'general' });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBe('Please enter a message');
  });

  it('returns error when message is whitespace only', () => {
    const result = validateFeedback({ category: 'general', message: '   ' });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBe('Please enter a message');
  });

  it('returns error for invalid email format', () => {
    const result = validateFeedback({ ...validData, email: 'not-an-email' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('Please enter a valid email address');
  });

  it('does not return email error when email is empty string', () => {
    const result = validateFeedback({ ...validData, email: '' });
    expect(result.valid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  it('does not return email error when email is whitespace', () => {
    const result = validateFeedback({ ...validData, email: '   ' });
    expect(result.valid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  it('accepts a valid email address', () => {
    const result = validateFeedback({ ...validData, email: 'user@example.com' });
    expect(result.valid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  it('returns error for screenshot over 5MB', () => {
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'big.png', { type: 'image/png' });
    const result = validateFeedback({ ...validData, screenshot: largeFile });
    expect(result.valid).toBe(false);
    expect(result.errors.screenshot).toBe('Screenshot must be less than 5MB');
  });

  it('does not return screenshot error for file under 5MB', () => {
    const smallFile = new File(['data'], 'small.png', { type: 'image/png' });
    const result = validateFeedback({ ...validData, screenshot: smallFile });
    expect(result.valid).toBe(true);
    expect(result.errors.screenshot).toBeUndefined();
  });

  it('does not return screenshot error when screenshot is null', () => {
    const result = validateFeedback({ ...validData, screenshot: null });
    expect(result.valid).toBe(true);
    expect(result.errors.screenshot).toBeUndefined();
  });

  it('returns multiple errors simultaneously', () => {
    const result = validateFeedback({});
    expect(result.valid).toBe(false);
    expect(result.errors.category).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });
});
