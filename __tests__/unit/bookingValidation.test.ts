import { validateBookingForm, parseRequestMonths } from '@/lib/utils/bookingValidation';
import type { BookingFormData } from '@/lib/types/database';

const valid: BookingFormData = {
  firstName: 'Anna',
  email: 'anna@example.de',
  months: ['2027-03', '2027-04'],
  travelers: '1',
  level: 'intermediate-light',
  message: 'Schwarz, bitte.',
  mailingList: true,
};

const fields = (data: Partial<BookingFormData>) => validateBookingForm(data).map((e) => e.field);

describe('validateBookingForm', () => {
  it('accepts a complete request', () => {
    expect(validateBookingForm(valid)).toEqual([]);
  });

  it('accepts a minimal request with only first name and email', () => {
    expect(validateBookingForm({ firstName: 'Anna', email: 'anna@example.de' })).toEqual([]);
  });

  it('requires a first name', () => {
    expect(fields({ ...valid, firstName: '   ' })).toEqual(['firstName']);
  });

  it('requires a valid email', () => {
    expect(validateBookingForm({ ...valid, email: '' })).toEqual([{ field: 'email', message: 'emailRequired' }]);
    expect(validateBookingForm({ ...valid, email: 'anna@' })).toEqual([{ field: 'email', message: 'emailInvalid' }]);
  });

  it('rejects unknown months and flexible combined with months', () => {
    expect(fields({ ...valid, months: ['2027-11' as never] })).toEqual(['months']);
    expect(fields({ ...valid, months: ['flexible', '2027-04'] })).toEqual(['months']);
    expect(fields({ ...valid, months: ['flexible'] })).toEqual([]);
  });

  it('rejects unknown travelers and level values', () => {
    expect(fields({ ...valid, travelers: '7' as never })).toEqual(['travelers']);
    expect(fields({ ...valid, level: 'expert' as never })).toEqual(['level']);
    expect(fields({ ...valid, travelers: null, level: null })).toEqual([]);
  });

  it('caps the message length', () => {
    expect(fields({ ...valid, message: 'x'.repeat(5001) })).toEqual(['message']);
  });
});

describe('parseRequestMonths', () => {
  it('keeps valid months and drops unknown ones', () => {
    expect(parseRequestMonths('2027-04')).toEqual(['2027-04']);
    expect(parseRequestMonths('2027-03,2027-11,2027-03')).toEqual(['2027-03']);
    expect(parseRequestMonths(null)).toEqual([]);
  });

  it('lets flexible win', () => {
    expect(parseRequestMonths('2027-04,flexible')).toEqual(['flexible']);
  });
});
