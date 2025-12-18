import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

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
// Edge Runtime compatible version using Web Crypto API
export async function verifyPassword(inputPassword: string): Promise<boolean> {
  const storedPassword = process.env.SITE_PASSWORD;

  if (!storedPassword) {
    console.error('SITE_PASSWORD environment variable is not set');
    return false;
  }

  try {
    // Use Web Crypto API (available in Edge Runtime) for constant-time comparison
    const encoder = new TextEncoder();

    // Ensure both strings are the same length to prevent timing attacks
    const maxLength = Math.max(inputPassword.length, storedPassword.length);
    const input = inputPassword.padEnd(maxLength, '\0');
    const stored = storedPassword.padEnd(maxLength, '\0');

    // Create HMAC keys from the strings
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode('sendero-password-comparison-key'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Sign both strings
    const inputSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(input));
    const storedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(stored));

    // Compare signatures (constant-time comparison)
    const inputArray = new Uint8Array(inputSignature);
    const storedArray = new Uint8Array(storedSignature);

    if (inputArray.length !== storedArray.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < inputArray.length; i++) {
      result |= inputArray[i] ^ storedArray[i];
    }

    return result === 0;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
