import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './lib/i18n/routing';
import { getSession } from './lib/auth/session';
import {
  isPublicRoute,
  isLoginRoute,
  buildLoginUrl,
} from './lib/auth/utils';

// Create the intl middleware instance
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Feature flag: skip auth entirely if disabled
  const authEnabled = process.env.PASSWORD_PROTECTION_ENABLED === 'true';
  if (!authEnabled) {
    return intlMiddleware(request);
  }

  // 1. Allow public routes (static assets, API)
  if (isPublicRoute(pathname)) {
    return intlMiddleware(request);
  }

  // 2. Allow login page (serve directly, no locale processing)
  if (isLoginRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. Check authentication
  const session = await getSession(request);

  if (!session.isAuthenticated) {
    // Build login URL with return parameter
    const loginUrl = buildLoginUrl(pathname);

    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // 4. User is authenticated - proceed with intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(de|en|es)/:path*',
    '/((?!_next|icon.svg).*)', // Catch-all excluding static files
  ],
};
