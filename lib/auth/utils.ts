// Route matchers for public routes
export function isPublicRoute(pathname: string): boolean {
  const publicPatterns = [
    '/api/',      // All API routes
    '/_next/',    // Next.js internals
    '/icon.svg',  // Static assets
    '/favicon',   // Favicon
  ];

  return publicPatterns.some(pattern => pathname.startsWith(pattern));
}

// Check if the route is the login page
export function isLoginRoute(pathname: string): boolean {
  // Matches /login
  return pathname === '/login' || pathname === '/login/';
}

// Extract locale from pathname
export function extractLocaleFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(en|de|es)(\/|$)/);
  return match ? match[1] : null;
}

// Build login URL with return parameter
export function buildLoginUrl(returnUrl?: string): string {
  const loginPath = '/login';

  if (returnUrl && returnUrl !== '/login') {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    return `${loginPath}?return=${encodedReturnUrl}`;
  }

  return loginPath;
}
