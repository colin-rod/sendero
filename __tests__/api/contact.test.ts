/**
 * API Route Tests: /api/contact
 *
 * Tests for the contact form submission API endpoint
 */

import { NextRequest } from 'next/server';
import type { ContactFormData } from '@/lib/types/database';

// Set environment variables before any imports
process.env.RESEND_API_KEY = 'test-api-key';

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}));

// Mock Resend
const mockEmailSend = jest.fn().mockResolvedValue({ id: 'mock-email-id' });
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockEmailSend,
    },
  })),
}));

// Import after mocks
const { POST, GET } = require('@/app/[locale]/api/contact/route');

// Mock console methods to avoid cluttering test output
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('POST /api/contact', () => {
  // Valid form data for testing
  const validFormData: ContactFormData = {
    name: 'John Doe',
    email: 'test@example.com',
    subject: 'general',
    message: 'This is a test message with enough characters to pass validation.',
  };

  // Helper to create mock NextRequest with locale params
  const createRequest = (body: unknown, locale: string = 'en') => {
    return {
      json: async () => body,
      params: Promise.resolve({ locale }),
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockEmailSend.mockClear();
    mockEmailSend.mockResolvedValue({ id: 'mock-email-id' });
    process.env.RESEND_API_KEY = 'test-api-key';
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();
    delete process.env.RESEND_API_KEY;
  });

  describe('Successful submissions', () => {
    it('should accept valid form data with all fields and return 201', async () => {
      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual({
        success: true,
        data: {
          message: 'Message sent successfully',
        },
      });
    });

    it('should accept valid form without subject and return 201', async () => {
      const formDataWithoutSubject = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'A message without a subject field specified.',
      };
      const request = createRequest(formDataWithoutSubject, 'de');

      const response = await POST(request, { params: Promise.resolve({ locale: 'de' }) });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
    });

    it('should send email notification when Resend is configured', async () => {
      const request = createRequest(validFormData, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Sendero Contact Form <julian@senderobiketrails.com>',
          to: 'julian@senderobiketrails.com',
          subject: expect.stringContaining('New Contact Form Submission'),
          text: expect.stringContaining('John Doe'),
        })
      );
    });
  });

  describe('Validation errors', () => {
    it('should reject missing name with 400', async () => {
      const request = createRequest({ ...validFormData, name: '' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('nameRequired');
    });

    it('should reject name that is too short with 400', async () => {
      const request = createRequest({ ...validFormData, name: 'A' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('nameTooShort');
    });

    it('should reject missing email with 400', async () => {
      const request = createRequest({ ...validFormData, email: '' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('emailRequired');
    });

    it('should reject invalid email format with 400', async () => {
      const invalidEmails = ['notanemail', 'missing@domain', '@example.com', 'user@', 'user @example.com'];

      for (const email of invalidEmails) {
        const request = createRequest({ ...validFormData, email }, 'en');

        const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toContain('emailInvalid');
      }
    });

    it('should reject missing message with 400', async () => {
      const request = createRequest({ ...validFormData, message: '' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('messageRequired');
    });

    it('should reject message that is too short with 400', async () => {
      const request = createRequest({ ...validFormData, message: 'Too short' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('messageTooShort');
    });

    it('should reject invalid subject enum value with 400', async () => {
      const request = createRequest({ ...validFormData, subject: 'invalid-subject' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('invalidSubject');
    });

    it('should return multiple validation errors as comma-separated string', async () => {
      const request = createRequest({ name: '', email: 'invalid', subject: 'general', message: 'short' }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain(',');
      expect(data.error).toContain('nameRequired');
      expect(data.error).toContain('emailInvalid');
      expect(data.error).toContain('messageTooShort');
    });
  });

  describe('Email errors (non-fatal)', () => {
    it('should return 201 even if email sending fails', async () => {
      mockEmailSend.mockRejectedValueOnce(new Error('Email service unavailable'));

      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
    });

    it('should log email errors but not return them to client', async () => {
      const emailError = new Error('Email service error');
      mockEmailSend.mockRejectedValueOnce(emailError);

      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(mockConsoleError).toHaveBeenCalledWith('Email sending error:', emailError);
      expect(data.error).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty request body', async () => {
      const request = createRequest({}, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should handle malformed JSON gracefully', async () => {
      const request = {
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as NextRequest;

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('An unexpected error occurred. Please try again.');
    });

    it('should accept very long messages (no max length validation)', async () => {
      const longMessage = 'A'.repeat(5000);
      const request = createRequest({ ...validFormData, message: longMessage }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(response.status).toBe(201);
    });

    it('should preserve special characters in message', async () => {
      const messageWithSpecialChars = 'Hello! This has émojis 🎉, symbols @#$%, and quotes "test".';
      const request = createRequest({ ...validFormData, message: messageWithSpecialChars }, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(response.status).toBe(201);
    });
  });
});

describe('GET /api/contact', () => {
  it('should return 405 Method Not Allowed', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data).toEqual({
      error: 'Method not allowed',
    });
  });
});
