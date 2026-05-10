import {
  isPublicRoute,
  isLoginRoute,
  extractLocaleFromPath,
  buildLoginUrl,
} from '@/lib/auth/utils';

describe('isPublicRoute', () => {
  it('treats /api/ routes as public', () => {
    expect(isPublicRoute('/api/waitlist')).toBe(true);
    expect(isPublicRoute('/api/')).toBe(true);
  });

  it('treats /_next/ routes as public', () => {
    expect(isPublicRoute('/_next/static/chunk.js')).toBe(true);
  });

  it('treats /icon.svg as public', () => {
    expect(isPublicRoute('/icon.svg')).toBe(true);
  });

  it('treats /favicon routes as public', () => {
    expect(isPublicRoute('/favicon.ico')).toBe(true);
    expect(isPublicRoute('/favicon-16x16.png')).toBe(true);
  });

  it('treats paths with file extensions as public', () => {
    expect(isPublicRoute('/hero.jpg')).toBe(true);
    expect(isPublicRoute('/fonts/font.woff2')).toBe(true);
    expect(isPublicRoute('/og-image.png')).toBe(true);
  });

  it('treats regular page paths as private', () => {
    expect(isPublicRoute('/about')).toBe(false);
    expect(isPublicRoute('/en/about')).toBe(false);
    expect(isPublicRoute('/')).toBe(false);
    expect(isPublicRoute('/login')).toBe(false);
  });
});

describe('isLoginRoute', () => {
  it('matches /login exactly', () => {
    expect(isLoginRoute('/login')).toBe(true);
  });

  it('matches /login/ with trailing slash', () => {
    expect(isLoginRoute('/login/')).toBe(true);
  });

  it('does not match other routes', () => {
    expect(isLoginRoute('/about')).toBe(false);
    expect(isLoginRoute('/en/login')).toBe(false);
    expect(isLoginRoute('/')).toBe(false);
  });
});

describe('extractLocaleFromPath', () => {
  it('extracts en locale', () => {
    expect(extractLocaleFromPath('/en/about')).toBe('en');
    expect(extractLocaleFromPath('/en/')).toBe('en');
    expect(extractLocaleFromPath('/en')).toBe('en');
  });

  it('extracts de locale', () => {
    expect(extractLocaleFromPath('/de/trails')).toBe('de');
  });

  it('extracts es locale', () => {
    expect(extractLocaleFromPath('/es/contact')).toBe('es');
  });

  it('returns null for unsupported locales', () => {
    expect(extractLocaleFromPath('/fr/page')).toBeNull();
    expect(extractLocaleFromPath('/')).toBeNull();
    expect(extractLocaleFromPath('/about')).toBeNull();
  });
});

describe('buildLoginUrl', () => {
  it('returns /login when no returnUrl given', () => {
    expect(buildLoginUrl()).toBe('/login');
    expect(buildLoginUrl(undefined)).toBe('/login');
  });

  it('appends encoded return param for normal paths', () => {
    expect(buildLoginUrl('/about')).toBe('/login?return=%2Fabout');
    expect(buildLoginUrl('/en/trails')).toBe('/login?return=%2Fen%2Ftrails');
  });

  it('does not add return param when returnUrl is /login', () => {
    expect(buildLoginUrl('/login')).toBe('/login');
  });
});
