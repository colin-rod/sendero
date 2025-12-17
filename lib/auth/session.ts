import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { timingSafeEqual } from 'crypto';

// Session data type
export interface SessionData {
  isAuthenticated: boolean;
  authenticatedAt: number;
}

// Iron session configuration
export function getSessionConfig(): SessionOptions {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret || sessionSecret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set and at least 32 characters long. ' +
      'Generate one with: openssl rand -base64 32'
    );
  }

  return {
    password: sessionSecret,
    cookieName: 'sendero_auth_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    },
  };
}

// Get session from request (middleware)
export async function getSession(
  request: NextRequest
): Promise<IronSession<SessionData>> {
  const response = new Response();
  return getIronSession<SessionData>(request, response, getSessionConfig());
}

// Get session from cookies (server component / API route)
export async function getSessionFromCookies(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(
    await cookies(),
    getSessionConfig()
  );
}

// Mark session as authenticated
export function setSessionAuthenticated(session: IronSession<SessionData>): void {
  session.isAuthenticated = true;
  session.authenticatedAt = Date.now();
}

// Destroy session (logout)
export function destroySession(session: IronSession<SessionData>): void {
  session.isAuthenticated = false;
  session.authenticatedAt = 0;
}

// Verify password using constant-time comparison to prevent timing attacks
export function verifyPassword(inputPassword: string): boolean {
  const storedPassword = process.env.SITE_PASSWORD;

  if (!storedPassword) {
    console.error('SITE_PASSWORD environment variable is not set');
    return false;
  }

  try {
    // Ensure both strings are the same length to prevent timing attacks
    const maxLength = Math.max(inputPassword.length, storedPassword.length);
    const inputBuffer = Buffer.from(inputPassword.padEnd(maxLength, '\0'));
    const storedBuffer = Buffer.from(storedPassword.padEnd(maxLength, '\0'));

    return timingSafeEqual(inputBuffer, storedBuffer);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
