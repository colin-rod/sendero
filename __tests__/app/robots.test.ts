import robots from '@/app/robots';

jest.mock('@/lib/seo/canonical', () => ({
  getSiteUrl: () => 'https://example.com',
}));

describe('robots()', () => {
  it('returns sitemap URL from site URL', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://example.com/sitemap.xml');
  });

  it('sets host to site URL', () => {
    const result = robots();
    expect(result.host).toBe('https://example.com');
  });

  it('has a wildcard rule allowing /', () => {
    const result = robots();
    const wildcardRule = (result.rules as Array<{ userAgent: string; allow: string; disallow: string[] }>)
      .find((r) => r.userAgent === '*');
    expect(wildcardRule).toBeDefined();
    expect(wildcardRule!.allow).toBe('/');
  });

  it('disallows /api/ and /login in the wildcard rule', () => {
    const result = robots();
    const wildcardRule = (result.rules as Array<{ userAgent: string; allow: string; disallow: string[] }>)
      .find((r) => r.userAgent === '*');
    expect(wildcardRule!.disallow).toContain('/api/');
    expect(wildcardRule!.disallow).toContain('/login');
  });

  it('has rules for AI crawlers', () => {
    const result = robots();
    const userAgents = (result.rules as Array<{ userAgent: string }>).map((r) => r.userAgent);
    expect(userAgents).toContain('GPTBot');
    expect(userAgents).toContain('ClaudeBot');
    expect(userAgents).toContain('PerplexityBot');
  });

  it('disallows /api/ for AI crawlers', () => {
    const result = robots();
    const aiRule = (result.rules as Array<{ userAgent: string; disallow: string[] }>)
      .find((r) => r.userAgent === 'GPTBot');
    expect(aiRule!.disallow).toContain('/api/');
  });
});
