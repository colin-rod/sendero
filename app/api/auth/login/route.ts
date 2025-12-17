import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromCookies,
  setSessionAuthenticated,
  verifyPassword,
} from '@/lib/auth/session';

interface LoginRequest {
  password: string;
  returnUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { password, returnUrl } = body;

    // Validate input
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Verify password using constant-time comparison
    const isValid = verifyPassword(password);

    if (!isValid) {
      // Log failed attempt for monitoring
      console.warn('Failed login attempt');

      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create/update session
    const session = await getSessionFromCookies();
    setSessionAuthenticated(session);
    await session.save();

    // Return success with return URL
    return NextResponse.json({
      success: true,
      returnUrl: returnUrl || '/',
    });
  } catch (error) {
    console.error('Login API error:', error);

    return NextResponse.json(
      { success: false, error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

// Disallow other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
