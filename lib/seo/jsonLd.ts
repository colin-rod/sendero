import { getSiteUrl, localizedUrl } from './canonical';
import type { Locale } from '@/lib/i18n/config';
import type { Trail } from '@/lib/types/trails';

const ORG_ID = `${getSiteUrl()}#organization`;
const SITE_ID = `${getSiteUrl()}#website`;

export function organizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Sendero Bike Trails',
    url: siteUrl,
    logo: `${siteUrl}/Logo_Dark.png`,
    email: 'info@senderobiketrails.com',
    sameAs: ['https://www.instagram.com/sendero_bike_trails/'],
  };
}

export function localBusinessSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    '@id': `${siteUrl}#localbusiness`,
    name: 'Sendero Bike Trails',
    url: siteUrl,
    image: `${siteUrl}/Logo_Dark.png`,
    email: 'info@senderobiketrails.com',
    description:
      'Beginner-friendly hike & bike tours through Colombia\'s Coffee Region (Eje Cafetero), based in Pereira.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pereira',
      addressRegion: 'Risaralda',
      addressCountry: 'CO',
    },
    areaServed: [
      { '@type': 'City', name: 'Pereira' },
      { '@type': 'AdministrativeArea', name: 'Eje Cafetero' },
      { '@type': 'Country', name: 'Colombia' },
    ],
  };
}

export function websiteSchema(locale: Locale | string) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteUrl,
    name: 'Sendero Bike Trails',
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(locale: Locale | string, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}

export function touristAttractionSchema(
  trail: Trail,
  locale: Locale | string,
  opts: { name: string; description: string; path: string }
) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: opts.name,
    description: opts.description,
    url: localizedUrl(locale, opts.path),
    image: trail.images?.hero ? `${siteUrl}${trail.images.hero}` : undefined,
    inLanguage: locale,
    isAccessibleForFree: false,
    touristType: ['Beginner cyclists', 'Hikers', 'Eco-tourists'],
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'CO',
      addressRegion: 'Risaralda',
    },
  };
}

export function touristTripSchema(
  trail: Trail,
  locale: Locale | string,
  opts: { name: string; description: string; path: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: opts.name,
    description: opts.description,
    url: localizedUrl(locale, opts.path),
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    itinerary: trail.waypoints.map((wp, i) => ({
      '@type': 'Place',
      position: i + 1,
      name: wp.name,
      description: wp.description,
    })),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'distance',
        value: trail.stats.distance,
        unitCode: 'KMT',
      },
      {
        '@type': 'PropertyValue',
        name: 'duration',
        value: trail.stats.duration,
      },
      {
        '@type': 'PropertyValue',
        name: 'difficulty',
        value: trail.difficulty,
      },
      {
        '@type': 'PropertyValue',
        name: 'elevationGain',
        value: trail.stats.elevationGain,
        unitCode: 'MTR',
      },
    ],
  };
}

export function trailItemListSchema(
  locale: Locale | string,
  trails: Array<{ slug: string; name: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: trails.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: localizedUrl(locale, `/trails/${t.slug}`),
      name: t.name,
    })),
  };
}
