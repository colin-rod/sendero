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

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
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
const { supabase } = require('@/lib/supabase/client');

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
      // Simulate Next.js 15+ async params pattern
      params: Promise.resolve({ locale }),
    } as unknown as NextRequest;
  };

  // Mock Supabase insert response
  const mockSupabaseInsert = (error: unknown = null) => {
    const insertMock = jest.fn().mockResolvedValue({ error });
    (supabase.from as jest.Mock).mockReturnValue({
      insert: insertMock,
    });
    return insertMock;
  };

  beforeEach(() => {
    // Clear all mocks but keep the mock implementations
    jest.clearAllMocks();
    // Reset the supabase.from mock to ensure fresh state
    (supabase.from as jest.Mock).mockClear();
    // Reset email mock
    mockEmailSend.mockClear();
    mockEmailSend.mockResolvedValue({ id: 'mock-email-id' });
    // Set Resend API key for tests (needs to be set before module load, but we'll keep it for clarity)
    process.env.RESEND_API_KEY = 'test-api-key';
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();
    delete process.env.RESEND_API_KEY;
  });

  describe('Successful submissions', () => {
    it('should accept valid form data with all fields and return 201', async () => {
      const insertMock = mockSupabaseInsert();
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
      expect(insertMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'John Doe',
        subject: 'general',
        message: 'This is a test message with enough characters to pass validation.',
        locale: 'en',
      });
    });

    it('should accept valid form without subject and return 201', async () => {
      const insertMock = mockSupabaseInsert();
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
      expect(insertMock).toHaveBeenCalledWith({
        email: 'jane@example.com',
        name: 'Jane Smith',
        subject: null,
        message: 'A message without a subject field specified.',
        locale: 'de',
      });
    });

    it('should trim whitespace from text fields', async () => {
      const insertMock = mockSupabaseInsert();
      const formDataWithWhitespace = {
        name: '  John Doe  ',
        email: 'test@example.com',
        subject: 'general',
        message: '  Test message with enough chars and whitespace.  ',
      };
      const request = createRequest(formDataWithWhitespace, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'John Doe',
        subject: 'general',
        message: 'Test message with enough chars and whitespace.',
        locale: 'en',
      });
    });

    it('should lowercase email addresses', async () => {
      const insertMock = mockSupabaseInsert();
      const formDataWithUppercaseEmail = {
        ...validFormData,
        email: 'TEST@EXAMPLE.COM',
      };
      const request = createRequest(formDataWithUppercaseEmail, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
        })
      );
    });

    it('should capture locale parameter from URL', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest(validFormData, 'es');

      await POST(request, { params: Promise.resolve({ locale: 'es' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: 'es',
        })
      );
    });

    it('should send email notification when Resend is configured', async () => {
      mockSupabaseInsert();
      const request = createRequest(validFormData, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'Sendero Contact Form <contact@senderobiketrails.com>',
          to: 'info@senderobiketrails.com',
          subject: expect.stringContaining('New Contact Form Submission'),
          text: expect.stringContaining('John Doe'),
        })
      );
    });

  });

  describe('Validation errors', () => {
    it('should reject missing name with 400', async () => {
      const formDataWithoutName = {
        ...validFormData,
        name: '',
      };
      const request = createRequest(formDataWithoutName, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('nameRequired');
    });

    it('should reject name that is too short with 400', async () => {
      const formDataWithShortName = {
        ...validFormData,
        name: 'A',
      };
      const request = createRequest(formDataWithShortName, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('nameTooShort');
    });

    it('should reject missing email with 400', async () => {
      const formDataWithoutEmail = {
        ...validFormData,
        email: '',
      };
      const request = createRequest(formDataWithoutEmail, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('emailRequired');
    });

    it('should reject invalid email format with 400', async () => {
      const invalidEmails = ['notanemail', 'missing@domain', '@example.com', 'user@', 'user @example.com'];

      for (const email of invalidEmails) {
        const formDataWithInvalidEmail = {
          ...validFormData,
          email,
        };
        const request = createRequest(formDataWithInvalidEmail, 'en');

        const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toContain('emailInvalid');
      }
    });

    it('should reject missing message with 400', async () => {
      const formDataWithoutMessage = {
        ...validFormData,
        message: '',
      };
      const request = createRequest(formDataWithoutMessage, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('messageRequired');
    });

    it('should reject message that is too short with 400', async () => {
      const formDataWithShortMessage = {
        ...validFormData,
        message: 'Too short',
      };
      const request = createRequest(formDataWithShortMessage, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('messageTooShort');
    });

    it('should reject invalid subject enum value with 400', async () => {
      const formDataWithInvalidSubject = {
        ...validFormData,
        subject: 'invalid-subject',
      };
      const request = createRequest(formDataWithInvalidSubject, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('invalidSubject');
    });

    it('should return multiple validation errors as comma-separated string', async () => {
      const formDataWithMultipleErrors = {
        name: '',
        email: 'invalid',
        subject: 'general',
        message: 'short',
      };
      const request = createRequest(formDataWithMultipleErrors, 'en');

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

  describe('Database errors', () => {
    it('should handle Supabase insert failure with 500', async () => {
      mockSupabaseInsert({ code: 'DB_ERROR', message: 'Database connection failed' });
      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to save your message. Please try again.');
    });

    it('should log database errors to console', async () => {
      const dbError = { code: 'DB_ERROR', message: 'Database error' };
      mockSupabaseInsert(dbError);
      const request = createRequest(validFormData, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(mockConsoleError).toHaveBeenCalledWith('Supabase error:', dbError);
    });

    it('should handle database connection errors gracefully', async () => {
      mockSupabaseInsert({ code: 'CONNECTION_ERROR', message: 'Could not connect' });
      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(response.status).toBe(500);
      expect(response).toBeDefined();
    });
  });

  describe('Email errors (non-fatal)', () => {
    it('should return 201 even if email sending fails', async () => {
      mockSupabaseInsert();
      mockEmailSend.mockRejectedValueOnce(new Error('Email service unavailable'));

      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
    });

    it('should save to database even if email fails', async () => {
      const insertMock = mockSupabaseInsert();
      mockEmailSend.mockRejectedValueOnce(new Error('Email service down'));

      const request = createRequest(validFormData, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          name: 'John Doe',
        })
      );
    });

    it('should log email errors but not return them to client', async () => {
      mockSupabaseInsert();
      const emailError = new Error('Email service error');
      mockEmailSend.mockRejectedValueOnce(emailError);

      const request = createRequest(validFormData, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });
      const data = await response.json();

      expect(mockConsoleError).toHaveBeenCalledWith('Email sending error:', emailError);
      expect(data.error).toBeUndefined();
    });
  });

  describe('Data transformation', () => {
    it('should default subject to null when not provided', async () => {
      const insertMock = mockSupabaseInsert();
      const formDataWithoutSubject = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Message without subject field.',
      };
      const request = createRequest(formDataWithoutSubject, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: null,
        })
      );
    });

    it('should transform email to lowercase', async () => {
      const insertMock = mockSupabaseInsert();
      const formDataWithMixedCaseEmail = {
        ...validFormData,
        email: 'TeSt@ExAmPlE.CoM',
      };
      const request = createRequest(formDataWithMixedCaseEmail, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
        })
      );
    });

    it('should trim text fields during data preparation', async () => {
      const insertMock = mockSupabaseInsert();
      const formDataWithSpaces = {
        name: '   Jane Doe   ',
        email: 'jane@example.com',
        subject: 'general',
        message: '   This is my long enough message with spaces around.   ',
      };
      const request = createRequest(formDataWithSpaces, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith({
        email: 'jane@example.com',
        name: 'Jane Doe',
        subject: 'general',
        message: 'This is my long enough message with spaces around.',
        locale: 'en',
      });
    });

    it('should preserve locale from URL params for different languages', async () => {
      // Test with German locale
      const insertMock = mockSupabaseInsert();
      const request = createRequest(validFormData, 'de');

      await POST(request, { params: Promise.resolve({ locale: 'de' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          locale: 'de',
        })
      );
    });

    it('should not convert to snake_case (contact uses camelCase)', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest(validFormData, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      const insertCall = insertMock.mock.calls[0][0];
      // Contact submissions use snake_case field names in DB
      expect(insertCall).toHaveProperty('email');
      expect(insertCall).toHaveProperty('name');
      expect(insertCall).toHaveProperty('subject');
      expect(insertCall).toHaveProperty('message');
      expect(insertCall).toHaveProperty('locale');
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
      const insertMock = mockSupabaseInsert();
      const longMessage = 'A'.repeat(5000);
      const formDataWithLongMessage = {
        ...validFormData,
        message: longMessage,
      };
      const request = createRequest(formDataWithLongMessage, 'en');

      const response = await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(response.status).toBe(201);
      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: longMessage,
        })
      );
    });

    it('should preserve special characters in message', async () => {
      const insertMock = mockSupabaseInsert();
      const messageWithSpecialChars = 'Hello! This has émojis 🎉, symbols @#$%, and quotes "test".';
      const formDataWithSpecialChars = {
        ...validFormData,
        message: messageWithSpecialChars,
      };
      const request = createRequest(formDataWithSpecialChars, 'en');

      await POST(request, { params: Promise.resolve({ locale: 'en' }) });

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: messageWithSpecialChars,
        })
      );
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
