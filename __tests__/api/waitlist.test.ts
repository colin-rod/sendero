/**
 * API Route Tests: /api/waitlist
 *
 * Tests for the waitlist signup API endpoint
 */

import { NextRequest } from 'next/server';
import type { WaitlistFormData } from '@/lib/types/database';

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

// Import after mocks
const { POST, GET } = require('@/app/api/waitlist/route');
const { supabase } = require('@/lib/supabase/client');

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

  // Mock Supabase response
  const mockSupabaseInsert = (error: unknown = null) => {
    const insertMock = jest.fn().mockResolvedValue({ error });
    (supabase.from as jest.Mock).mockReturnValue({
      insert: insertMock,
    });
    return insertMock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Successful submissions', () => {
    it('should accept valid form data and return 201', async () => {
      const insertMock = mockSupabaseInsert();
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
      expect(insertMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        tour_duration: 'weekend',
        interest_types: ['hike', 'bike'],
        fitness_level: 'beginner',
        travel_timeline: 'next_3_months',
      });
    });

    it('should normalize email to lowercase and trim whitespace', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest({
        ...validFormData,
        email: '  TEST@EXAMPLE.COM  ',
      });

      await POST(request);

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
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
        const insertMock = mockSupabaseInsert();
        const request = createRequest({
          ...validFormData,
          tourDuration: duration,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
        expect(insertMock).toHaveBeenCalledWith(
          expect.objectContaining({
            tour_duration: duration,
          })
        );
      }
    });

    it('should handle all interest type combinations', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest({
        ...validFormData,
        interestTypes: ['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm'],
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          interest_types: ['hike', 'bike', 'e_bike', 'women_only', 'coffee_farm'],
        })
      );
    });

    it('should handle single interest type', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest({
        ...validFormData,
        interestTypes: ['hike'],
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          interest_types: ['hike'],
        })
      );
    });

    it('should handle all fitness levels', async () => {
      const levels: Array<WaitlistFormData['fitnessLevel']> = ['beginner', 'moderate'];

      for (const level of levels) {
        const insertMock = mockSupabaseInsert();
        const request = createRequest({
          ...validFormData,
          fitnessLevel: level,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
        expect(insertMock).toHaveBeenCalledWith(
          expect.objectContaining({
            fitness_level: level,
          })
        );
      }
    });

    it('should handle all travel timelines', async () => {
      const timelines: Array<WaitlistFormData['travelTimeline']> = [
        'next_3_months',
        'next_6_months',
        'later',
      ];

      for (const timeline of timelines) {
        const insertMock = mockSupabaseInsert();
        const request = createRequest({
          ...validFormData,
          travelTimeline: timeline,
        });

        const response = await POST(request);
        expect(response.status).toBe(201);
        expect(insertMock).toHaveBeenCalledWith(
          expect.objectContaining({
            travel_timeline: timeline,
          })
        );
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
      expect(data.error).toContain('Invalid email address');
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
      expect(data.error).toContain('interest type');
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

  describe('Database errors', () => {
    it('should handle duplicate email with 409', async () => {
      mockSupabaseInsert({
        code: '23505', // PostgreSQL unique constraint violation
        message: 'duplicate key value violates unique constraint',
      });

      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error).toBe('This email is already on the waitlist');
    });

    it('should handle generic database errors with 500', async () => {
      mockSupabaseInsert({
        code: 'PGRST000',
        message: 'Database connection failed',
      });

      const request = createRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to save your information. Please try again.');
    });

    it('should log database errors to console', async () => {
      const dbError = {
        code: 'PGRST000',
        message: 'Database connection failed',
      };
      mockSupabaseInsert(dbError);

      const request = createRequest(validFormData);
      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('Supabase error:', dbError);
    });
  });

  describe('Error handling', () => {
    it('should handle JSON parsing errors with 500', async () => {
      const request = {
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('An unexpected error occurred. Please try again.');
    });

    it('should handle unexpected errors with 500', async () => {
      const insertMock = jest.fn().mockRejectedValue(new Error('Network error'));
      (supabase.from as jest.Mock).mockReturnValue({
        insert: insertMock,
      });

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
      } as NextRequest;

      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('API route error:', error);
    });
  });

  describe('Data transformation', () => {
    it('should convert camelCase form fields to snake_case database fields', async () => {
      const insertMock = mockSupabaseInsert();
      const request = createRequest(validFormData);

      await POST(request);

      const insertData = insertMock.mock.calls[0][0];
      expect(insertData).toHaveProperty('tour_duration');
      expect(insertData).toHaveProperty('interest_types');
      expect(insertData).toHaveProperty('fitness_level');
      expect(insertData).toHaveProperty('travel_timeline');
      expect(insertData).not.toHaveProperty('tourDuration');
      expect(insertData).not.toHaveProperty('interestTypes');
      expect(insertData).not.toHaveProperty('fitnessLevel');
      expect(insertData).not.toHaveProperty('travelTimeline');
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
