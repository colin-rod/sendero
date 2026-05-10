import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/lib/i18n/config';

const ROUTES = [
  '',
  '/about',
  '/faq',
  '/contact',
  '/trails',
  '/trails/sendero-del-tigre',
  '/datenschutz',
  '/impressum',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://senderobiketrails.com').replace(/\/$/, '');

  return ROUTES.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
    );

    return locales.map((loc) => ({
      url: `${baseUrl}/${loc}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: {
          ...languages,
          'x-default': `${baseUrl}/${defaultLocale}${route}`,
        },
      },
    }));
  });
}
