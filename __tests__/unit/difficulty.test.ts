import {
  getDifficultyBadgeProps,
  getDifficultyColor,
} from '@/lib/utils/difficulty';

describe('getDifficultyBadgeProps', () => {
  it('returns success variant for Easy', () => {
    expect(getDifficultyBadgeProps('Easy')).toEqual({ variant: 'success' });
  });

  it('returns warning variant for Moderate', () => {
    expect(getDifficultyBadgeProps('Moderate')).toEqual({ variant: 'warning' });
  });

  it('returns error variant for Challenging', () => {
    expect(getDifficultyBadgeProps('Challenging')).toEqual({ variant: 'error' });
  });

  it('returns default variant for unknown level', () => {
    expect(getDifficultyBadgeProps('Unknown')).toEqual({ variant: 'default' });
    expect(getDifficultyBadgeProps('')).toEqual({ variant: 'default' });
  });
});

describe('getDifficultyColor', () => {
  it('returns success color for Easy', () => {
    expect(getDifficultyColor('Easy')).toBe('text-success-700');
  });

  it('returns warning color for Moderate', () => {
    expect(getDifficultyColor('Moderate')).toBe('text-warning-700');
  });

  it('returns error color for Challenging', () => {
    expect(getDifficultyColor('Challenging')).toBe('text-error-700');
  });

  it('returns muted color for unknown level', () => {
    expect(getDifficultyColor('Unknown')).toBe('text-muted-foreground');
    expect(getDifficultyColor('')).toBe('text-muted-foreground');
  });
});
