import { generateContactEmail } from '@/lib/email/contactEmail';

describe('Contact Email Utilities', () => {
  const validFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'general' as const,
    message: 'This is a test message with enough characters to be valid.',
    locale: 'en',
  };

  describe('generateContactEmail', () => {
    it('should generate email with all fields', () => {
      const email = generateContactEmail(validFormData);

      expect(email.subject).toBe('New Contact Form Submission - General');
      expect(email.text).toContain('John Doe');
      expect(email.text).toContain('john@example.com');
      expect(email.text).toContain('general');
      expect(email.text).toContain('This is a test message');
      expect(email.text).toContain('Language: en');
    });

    it('should capitalize subject in email subject line', () => {
      const data = {
        ...validFormData,
        subject: 'tour' as const,
      };

      const email = generateContactEmail(data);

      expect(email.subject).toBe('New Contact Form Submission - Tour');
    });

    it('should handle missing subject gracefully', () => {
      const dataWithoutSubject = {
        ...validFormData,
        subject: '',
      };

      const email = generateContactEmail(dataWithoutSubject);

      expect(email.subject).toBe('New Contact Form Submission');
      expect(email.text).toContain('Subject: None');
    });

    it('should preserve line breaks in message', () => {
      const dataWithLineBreaks = {
        ...validFormData,
        message: 'Line 1\nLine 2\nLine 3',
      };

      const email = generateContactEmail(dataWithLineBreaks);

      expect(email.text).toContain('Line 1\nLine 2\nLine 3');
    });

    it('should include timestamp', () => {
      const email = generateContactEmail(validFormData);

      expect(email.text).toContain('Submitted:');
    });

    it('should include locale information', () => {
      const data = {
        ...validFormData,
        locale: 'de',
      };

      const email = generateContactEmail(data);

      expect(email.text).toContain('Language: de');
    });

    it('should handle different locales', () => {
      const locales = ['en', 'de', 'es'];

      locales.forEach((locale) => {
        const data = {
          ...validFormData,
          locale,
        };

        const email = generateContactEmail(data);

        expect(email.text).toContain(`Language: ${locale}`);
      });
    });

    it('should include all form fields in email body', () => {
      const email = generateContactEmail(validFormData);

      expect(email.text).toContain('Name:');
      expect(email.text).toContain('Email:');
      expect(email.text).toContain('Subject:');
      expect(email.text).toContain('Language:');
      expect(email.text).toContain('Message:');
    });

    it('should handle long messages', () => {
      const longMessage = 'A'.repeat(5000);
      const dataWithLongMessage = {
        ...validFormData,
        message: longMessage,
      };

      const email = generateContactEmail(dataWithLongMessage);

      expect(email.text).toContain(longMessage);
      expect(email.text.length).toBeGreaterThan(5000);
    });

    it('should format email body with proper structure', () => {
      const email = generateContactEmail(validFormData);

      expect(email.text).toContain('New contact form submission from Sendero website:');
      expect(email.text).toContain('---');
      expect(email.text).toMatch(/Name:.*\nEmail:.*\nSubject:.*\nLanguage:/);
    });
  });
});
