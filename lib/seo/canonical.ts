import { locales, defaultLocale, type Locale } from '@/lib/i18n/config';

const FALLBACK_SITE_URL = 'https://www.senderobiketrails.com';

export const ogImages = [
  { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Sendero Bike Trails' },
];

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
  return raw.replace(/\/$/, '');
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function localizedUrl(locale: Locale | string, path: string = ''): string {
  return `${getSiteUrl()}/${locale}${normalizePath(path)}`;
}

export type Alternates = {
  canonical: string;
  languages: Record<string, string>;
};

/**
 * Build canonical + hreflang alternates for a path that exists in every locale.
 * `path` is locale-agnostic (e.g. '/about', '/trails/sendero-del-tigre').
 */
export function buildAlternates(locale: Locale | string, path: string = ''): Alternates {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localizedUrl(loc, path);
  }
  languages['x-default'] = localizedUrl(defaultLocale, path);

  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}
