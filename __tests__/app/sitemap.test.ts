import sitemap from '@/app/sitemap';

jest.mock('@/lib/seo/canonical', () => ({
  getSiteUrl: () => 'https://example.com',
}));

jest.mock('@/lib/i18n/config', () => ({
  locales: ['en', 'de', 'es'],
  defaultLocale: 'de',
}));

jest.mock('@/lib/data/trails', () => ({
  trailSummaries: [
    { slug: 'sendero-del-tigre', name: 'Sendero del Tigre', comingSoon: false },
    { slug: 'coming-soon-trail', name: 'Coming Soon', comingSoon: true },
  ],
}));

describe('sitemap()', () => {
  it('generates entries for all three locales per route', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://example.com/en');
    expect(urls).toContain('https://example.com/de');
    expect(urls).toContain('https://example.com/es');
  });

  it('includes the active trail in the sitemap', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://example.com/en/trails/sendero-del-tigre');
    expect(urls).toContain('https://example.com/de/trails/sendero-del-tigre');
  });

  it('excludes comingSoon trails', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const hasComingSoon = urls.some((u) => u.includes('coming-soon-trail'));
    expect(hasComingSoon).toBe(false);
  });

  it('includes hreflang alternates on each entry', () => {
    const entries = sitemap();
    const entry = entries.find((e) => e.url === 'https://example.com/en');
    expect(entry!.alternates!.languages!['en']).toBe('https://example.com/en');
    expect(entry!.alternates!.languages!['de']).toBe('https://example.com/de');
    expect(entry!.alternates!.languages!['es']).toBe('https://example.com/es');
    expect(entry!.alternates!.languages!['x-default']).toBe('https://example.com/de');
  });

  it('sets priority on trail entries', () => {
    const entries = sitemap();
    const trailEntry = entries.find((e) =>
      e.url === 'https://example.com/en/trails/sendero-del-tigre'
    );
    expect(trailEntry!.priority).toBe(0.8);
  });

  it('includes static routes like /about and /faq', () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://example.com/en/about');
    expect(urls).toContain('https://example.com/de/faq');
  });
});
