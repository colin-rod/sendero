import {
  validateContactForm,
  isValidContactSubject,
} from '@/lib/utils/contactValidation';

describe('Contact Form Validation', () => {
  describe('isValidContactSubject', () => {
    it('should accept valid subjects', () => {
      const validSubjects = ['general', 'tour', 'custom', 'feedback'];

      validSubjects.forEach((subject) => {
        expect(isValidContactSubject(subject)).toBe(true);
      });
    });

    it('should reject invalid subjects', () => {
      const invalidSubjects = ['invalid', 'bad', 'wrong', ''];

      invalidSubjects.forEach((subject) => {
        expect(isValidContactSubject(subject)).toBe(false);
      });
    });
  });

  describe('validateContactForm', () => {
    const validForm = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'general' as const,
      message: 'This is a valid message with enough characters.',
    };

    it('should return empty errors array for valid form', () => {
      const errors = validateContactForm(validForm);
      expect(errors).toEqual([]);
    });

    it('should return error for missing name', () => {
      const invalidForm = { ...validForm, name: '' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'name',
        message: 'nameRequired',
      });
    });

    it('should return error for name too short', () => {
      const invalidForm = { ...validForm, name: 'A' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'name',
        message: 'nameTooShort',
      });
    });

    it('should accept name with exactly 2 characters', () => {
      const form = { ...validForm, name: 'Ab' };
      const errors = validateContactForm(form);

      const nameErrors = errors.filter((e) => e.field === 'name');
      expect(nameErrors).toEqual([]);
    });

    it('should trim whitespace from name', () => {
      const form = { ...validForm, name: '  A  ' };
      const errors = validateContactForm(form);

      expect(errors).toContainEqual({
        field: 'name',
        message: 'nameTooShort',
      });
    });

    it('should return error for missing email', () => {
      const invalidForm = { ...validForm, email: '' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'email',
        message: 'emailRequired',
      });
    });

    it('should return error for invalid email format', () => {
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@nodomain.com',
        'no@domain',
      ];

      invalidEmails.forEach((email) => {
        const invalidForm = { ...validForm, email };
        const errors = validateContactForm(invalidForm);

        expect(errors).toContainEqual({
          field: 'email',
          message: 'emailInvalid',
        });
      });
    });

    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@test-domain.com',
      ];

      validEmails.forEach((email) => {
        const form = { ...validForm, email };
        const errors = validateContactForm(form);

        const emailErrors = errors.filter((e) => e.field === 'email');
        expect(emailErrors).toEqual([]);
      });
    });

    it('should return error for invalid subject', () => {
      const invalidForm = { ...validForm, subject: 'invalid' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'subject',
        message: 'invalidSubject',
      });
    });

    it('should accept empty subject (optional field)', () => {
      const form = { ...validForm, subject: '' };
      const errors = validateContactForm(form);

      const subjectErrors = errors.filter((e) => e.field === 'subject');
      expect(subjectErrors).toEqual([]);
    });

    it('should return error for missing message', () => {
      const invalidForm = { ...validForm, message: '' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'message',
        message: 'messageRequired',
      });
    });

    it('should return error for message too short', () => {
      const invalidForm = { ...validForm, message: 'short' };
      const errors = validateContactForm(invalidForm);

      expect(errors).toContainEqual({
        field: 'message',
        message: 'messageTooShort',
      });
    });

    it('should accept message with exactly 10 characters', () => {
      const form = { ...validForm, message: 'Ten chars!' };
      const errors = validateContactForm(form);

      const messageErrors = errors.filter((e) => e.field === 'message');
      expect(messageErrors).toEqual([]);
    });

    it('should trim whitespace from message', () => {
      const form = { ...validForm, message: '  short  ' };
      const errors = validateContactForm(form);

      expect(errors).toContainEqual({
        field: 'message',
        message: 'messageTooShort',
      });
    });

    it('should return multiple errors for completely invalid form', () => {
      const invalidForm = {
        name: 'A',
        email: 'invalid',
        subject: 'bad',
        message: 'x',
      };

      const errors = validateContactForm(invalidForm);
      expect(errors.length).toBe(4);
      expect(errors).toContainEqual({ field: 'name', message: 'nameTooShort' });
      expect(errors).toContainEqual({ field: 'email', message: 'emailInvalid' });
      expect(errors).toContainEqual({ field: 'subject', message: 'invalidSubject' });
      expect(errors).toContainEqual({ field: 'message', message: 'messageTooShort' });
    });

    it('should handle empty form', () => {
      const emptyForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };

      const errors = validateContactForm(emptyForm);
      expect(errors.length).toBe(3); // name, email, message required
      expect(errors).toContainEqual({ field: 'name', message: 'nameRequired' });
      expect(errors).toContainEqual({ field: 'email', message: 'emailRequired' });
      expect(errors).toContainEqual({ field: 'message', message: 'messageRequired' });
    });

    it('should handle partial form data', () => {
      const partialForm = {
        name: 'John Doe',
        email: 'invalid',
      };

      const errors = validateContactForm(partialForm);
      expect(errors).toContainEqual({ field: 'email', message: 'emailInvalid' });
      expect(errors).toContainEqual({ field: 'message', message: 'messageRequired' });
    });
  });
});
