import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/lib/i18n/config';
import { getSiteUrl } from '@/lib/seo/canonical';
import { trailSummaries } from '@/lib/data/trails';

type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const STATIC_ROUTES: RouteEntry[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/trails', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  // Only include trails that have a real detail page (not coming-soon stubs).
  const trailRoutes: RouteEntry[] = trailSummaries
    .filter((t) => !t.comingSoon)
    .map((t) => ({
      path: `/trails/${t.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    }));

  const routes = [...STATIC_ROUTES, ...trailRoutes];

  return routes.flatMap(({ path, priority, changeFrequency }) => {
    const languages = Object.fromEntries(
      locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
    );

    return locales.map((loc) => ({
      url: `${baseUrl}/${loc}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...languages,
          'x-default': `${baseUrl}/${defaultLocale}${path}`,
        },
      },
    }));
  });
}
