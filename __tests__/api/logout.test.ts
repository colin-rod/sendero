/**
 * API Route Tests: /api/auth/logout
 *
 * Tests for the logout API endpoint
 */

import { NextRequest } from 'next/server';

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

// Mock the session utilities
const mockSessionSave = jest.fn();
const mockSession = {
  isAuthenticated: true,
  authenticatedAt: Date.now(),
  save: mockSessionSave,
};

const mockGetSessionFromCookies = jest.fn().mockResolvedValue(mockSession);
const mockDestroySession = jest.fn();

jest.mock('@/lib/auth/session', () => ({
  getSessionFromCookies: mockGetSessionFromCookies,
  destroySession: mockDestroySession,
}));

// Import after mocks
const { POST, GET } = require('@/app/api/auth/logout/route');

// Mock console.error to avoid cluttering test output
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('POST /api/auth/logout', () => {
  beforeEach(() => {
    // Clear all mocks but keep the mock implementations
    jest.clearAllMocks();
    // Reset mock implementations to successful defaults
    mockGetSessionFromCookies.mockResolvedValue(mockSession);
    mockSessionSave.mockResolvedValue(undefined);
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe('Successful logout', () => {
    it('should return 200 status code on successful logout', async () => {
      const request = {} as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ success: true });
    });

    it('should call getSessionFromCookies to retrieve session', async () => {
      const request = {} as NextRequest;

      await POST(request);

      expect(mockGetSessionFromCookies).toHaveBeenCalledTimes(1);
    });

    it('should call destroySession with the session object', async () => {
      const request = {} as NextRequest;

      await POST(request);

      expect(mockDestroySession).toHaveBeenCalledTimes(1);
      expect(mockDestroySession).toHaveBeenCalledWith(mockSession);
    });

    it('should call session.save() to persist logout state', async () => {
      const request = {} as NextRequest;

      await POST(request);

      expect(mockSessionSave).toHaveBeenCalledTimes(1);
    });

    it('should execute session lifecycle in correct order', async () => {
      const request = {} as NextRequest;
      const callOrder: string[] = [];

      mockGetSessionFromCookies.mockImplementation(async () => {
        callOrder.push('getSession');
        return mockSession;
      });

      mockDestroySession.mockImplementation(() => {
        callOrder.push('destroySession');
      });

      mockSessionSave.mockImplementation(async () => {
        callOrder.push('save');
      });

      await POST(request);

      expect(callOrder).toEqual(['getSession', 'destroySession', 'save']);
    });
  });

  describe('Error handling', () => {
    it('should return 500 when getSessionFromCookies throws error', async () => {
      const error = new Error('Failed to get session');
      mockGetSessionFromCookies.mockRejectedValueOnce(error);

      const request = {} as NextRequest;
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'An error occurred during logout',
      });
    });

    it('should log error when getSessionFromCookies fails', async () => {
      const error = new Error('Failed to get session');
      mockGetSessionFromCookies.mockRejectedValueOnce(error);

      const request = {} as NextRequest;
      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('Logout API error:', error);
    });

    it('should return 500 when session.save() throws error', async () => {
      const error = new Error('Failed to save session');
      mockSessionSave.mockRejectedValueOnce(error);

      const request = {} as NextRequest;
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'An error occurred during logout',
      });
    });

    it('should log error when session.save() fails', async () => {
      const error = new Error('Failed to save session');
      mockSessionSave.mockRejectedValueOnce(error);

      const request = {} as NextRequest;
      await POST(request);

      expect(mockConsoleError).toHaveBeenCalledWith('Logout API error:', error);
    });

    it('should handle unexpected errors gracefully', async () => {
      const error = new Error('Unexpected error');
      mockDestroySession.mockImplementationOnce(() => {
        throw error;
      });

      const request = {} as NextRequest;
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({
        success: false,
        error: 'An error occurred during logout',
      });
      expect(mockConsoleError).toHaveBeenCalledWith('Logout API error:', error);
    });

    it('should not call session.save() if getSessionFromCookies fails', async () => {
      mockGetSessionFromCookies.mockRejectedValueOnce(new Error('Session error'));

      const request = {} as NextRequest;
      await POST(request);

      expect(mockSessionSave).not.toHaveBeenCalled();
    });

    it('should not call session.save() if destroySession throws', async () => {
      mockDestroySession.mockImplementationOnce(() => {
        throw new Error('Destroy error');
      });

      const request = {} as NextRequest;
      await POST(request);

      expect(mockSessionSave).not.toHaveBeenCalled();
    });
  });
});

describe('GET /api/auth/logout', () => {
  beforeEach(() => {
    // Clear all mocks before GET tests
    jest.clearAllMocks();
  });

  it('should return 405 Method Not Allowed', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data).toEqual({ error: 'Method not allowed' });
  });

  it('should not call any session functions for GET requests', async () => {
    await GET();

    expect(mockGetSessionFromCookies).not.toHaveBeenCalled();
    expect(mockDestroySession).not.toHaveBeenCalled();
    expect(mockSessionSave).not.toHaveBeenCalled();
  });
});
