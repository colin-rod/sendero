/**
 * API Route Tests: /api/waitlist
 *
 * Tests for the waitlist signup API endpoint
 */

import { NextRequest } from 'next/server';
import type { WaitlistFormData } from '@/lib/types/database';

// Mock resend BEFORE importing the route (prevents TextEncoder error from postal-mime)
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}));

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

// Mock global fetch for Google Sheets webhook
global.fetch = jest.fn();

// Import after mocks
const { POST, GET } = require('@/app/[locale]/api/waitlist/route');

// Mock console.error to avoid cluttering test output
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('POST /api/waitlist', () => {
  // Valid form data for testing
  const validFormData: WaitlistFormData = {
    email: 'test@example.com',
    tourDuration: 'weekend',
    interestTypes: ['hike', 'bike'],
    fitnessLevel: 'beginner',
    travelTimeline: 'next_3_months',
  };

  // Helper to create mock NextRequest
  const createRequest = (body: unknown) => {
    return {
      json: async () => body,
    } as NextRequest;
  };

  // Helper to mock a successful Google Sheets fetch response
  const mockSheetSuccess = () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
    });
  };

  // Helper to mock a failed Google Sheets fetch response
  const mockSheetFailure = (status = 500) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/test-webhook';
    process.env.RESEND_API_KEY = 'test-resend-key';
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Successful submissions', () => {
    it('should accept valid form data and return 201', async () => {
      mockSheetSuccess();
      const request = createRequest(validFormData);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual({
        success: true,
        data: {
          message: 'Successfully added to waitlist',
        },
      });
    });

    it('should normalize email to lowercase and call webhook', async () => {
      mockSheetSuccess();
      const request = createRequest({
        ...validFormData,
        email: 'TEST@EXAMPLE.COM',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        process.env.GOOGLE_SHEETS_WEBHOOK_URL,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com' }),
        })
      );
    });

    it('should handle all tour duration options', async () => {
      const durations: Array<WaitlistFormData['tourDuration']> = [
        'one_day',
        'weekend',
        'one_week',
      ];

      for (const duration of durations) {
        mockSheetSuccess();
        const request = createRequest({
          ...validFormData,
          tourDuration: duration,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
      }
    });

    it('should handle all interest type combinations', async () => {
      mockSheetSuccess();
      const request = createRequest({
        ...validFormData,
        interestTypes: ['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm'],
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
    });

    it('should handle single interest type', async () => {
      mockSheetSuccess();
      const request = createRequest({
        ...validFormData,
        interestTypes: ['hike'],
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
    });

    it('should handle all fitness levels', async () => {
      const levels: Array<WaitlistFormData['fitnessLevel']> = ['beginner', 'moderate'];

      for (const level of levels) {
        mockSheetSuccess();
        const request = createRequest({
          ...validFormData,
          fitnessLevel: level,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
      }
    });

    it('should handle all travel timelines', async () => {
      const timelines: Array<WaitlistFormData['travelTimeline']> = [
        'next_3_months',
        'next_6_months',
        'later',
      ];

      for (const timeline of timelines) {
        mockSheetSuccess();
        const request = createRequest({
          ...validFormData,
          travelTimeline: timeline,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
      }
    });
  });

  describe('Validation errors', () => {
    it('should reject missing email with 400', async () => {
      const request = createRequest({
        ...validFormData,
        email: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Email is required');
    });

    it('should reject invalid email format with 400', async () => {
      const request = createRequest({
        ...validFormData,
        email: 'invalid-email',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Please enter a valid email address');
    });

    it('should reject missing tourDuration with 400', async () => {
      const request = createRequest({
        ...validFormData,
        tourDuration: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('tour duration');
    });

    it('should reject invalid tourDuration with 400', async () => {
      const request = createRequest({
        ...validFormData,
        tourDuration: 'invalid',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject empty interestTypes array with 400', async () => {
      const request = createRequest({
        ...validFormData,
        interestTypes: [],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Please select at least one interest');
    });

    it('should reject invalid interestTypes with 400', async () => {
      const request = createRequest({
        ...validFormData,
        interestTypes: ['invalid'],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject missing fitnessLevel with 400', async () => {
      const request = createRequest({
        ...validFormData,
        fitnessLevel: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('fitness level');
    });

    it('should reject invalid fitnessLevel with 400', async () => {
      const request = createRequest({
        ...validFormData,
        fitnessLevel: 'invalid',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should reject missing travelTimeline with 400', async () => {
      const request = createRequest({
        ...validFormData,
        travelTimeline: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('travel timeline');
    });

    it('should reject invalid travelTimeline with 400', async () => {
      const request = createRequest({
        ...validFormData,
        travelTimeline: 'invalid',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should return combined error messages for multiple validation errors', async () => {
      const request = createRequest({
        email: '',
        tourDuration: '',
        interestTypes: [],
        fitnessLevel: '',
        travelTimeline: '',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain(','); // Multiple errors separated by commas
    });
  });

  describe('Server configuration errors', () => {
    it('should return 500 when GOOGLE_SHEETS_WEBHOOK_URL is not configured', async () => {
      delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      const request = createRequest(validFormData);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Server configuration error');
    });
  });

  describe('Webhook errors', () => {
    it('should handle Google Sheets webhook failure with 500', async () => {
      mockSheetFailure();
      const request = createRequest(validFormData);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to save your information. Please try again.');
    });

    it('should log webhook errors to console', async () => {
      mockSheetFailure(503);
      const request = createRequest(validFormData);

      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('Google Sheets error:', 503);
    });
  });

  describe('Error handling', () => {
    it('should handle JSON parsing errors with 500', async () => {
      const request = {
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('An unexpected error occurred. Please try again.');
    });

    it('should handle unexpected fetch errors with 500', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      const request = createRequest(validFormData);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('An unexpected error occurred. Please try again.');
    });

    it('should log unexpected errors to console', async () => {
      const error = new Error('Unexpected error');
      const request = {
        json: async () => {
          throw error;
        },
      } as unknown as NextRequest;

      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('API route error:', error);
    });
  });
});

describe('GET /api/waitlist', () => {
  it('should return 405 Method Not Allowed', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data).toEqual({ error: 'Method not allowed' });
  });
});
