import { getSiteUrl, localizedUrl, buildAlternates } from '@/lib/seo/canonical';

const FALLBACK = 'https://www.senderobiketrails.com';

describe('getSiteUrl', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = original;
  });

  it('returns the env var value', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    expect(getSiteUrl()).toBe('https://example.com');
  });

  it('strips trailing slash from env var', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/';
    expect(getSiteUrl()).toBe('https://example.com');
  });

  it('falls back to default when env var is unset', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe(FALLBACK);
  });
});

describe('localizedUrl', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  it('builds locale root URL when path is empty', () => {
    expect(localizedUrl('en')).toBe('https://example.com/en');
    expect(localizedUrl('de')).toBe('https://example.com/de');
  });

  it('builds URL with path', () => {
    expect(localizedUrl('en', '/about')).toBe('https://example.com/en/about');
    expect(localizedUrl('es', '/trails/sendero-del-tigre')).toBe(
      'https://example.com/es/trails/sendero-del-tigre'
    );
  });

  it('handles path without leading slash', () => {
    expect(localizedUrl('en', 'about')).toBe('https://example.com/en/about');
  });

  it('handles root path /', () => {
    expect(localizedUrl('en', '/')).toBe('https://example.com/en');
  });
});

describe('buildAlternates', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  it('includes canonical for the given locale', () => {
    const result = buildAlternates('en', '/about');
    expect(result.canonical).toBe('https://example.com/en/about');
  });

  it('includes all three locale URLs in languages', () => {
    const result = buildAlternates('en', '/about');
    expect(result.languages['en']).toBe('https://example.com/en/about');
    expect(result.languages['de']).toBe('https://example.com/de/about');
    expect(result.languages['es']).toBe('https://example.com/es/about');
  });

  it('includes x-default pointing to the default locale (en)', () => {
    const result = buildAlternates('en', '/about');
    expect(result.languages['x-default']).toBe('https://example.com/en/about');
  });

  it('works without a path argument', () => {
    const result = buildAlternates('de');
    expect(result.canonical).toBe('https://example.com/de');
    expect(result.languages['en']).toBe('https://example.com/en');
  });
});
