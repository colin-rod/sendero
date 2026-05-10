import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  touristAttractionSchema,
  touristTripSchema,
  trailItemListSchema,
} from '@/lib/seo/jsonLd';
import type { Trail } from '@/lib/types/trails';

jest.mock('@/lib/seo/canonical', () => ({
  getSiteUrl: () => 'https://example.com',
  localizedUrl: (locale: string, path: string = '') =>
    `https://example.com/${locale}${path}`,
}));

const TRAIL_FIXTURE: Trail = {
  id: 'trail-1',
  slug: 'sendero-del-tigre',
  name: 'Sendero del Tigre',
  subtitle: 'A great trail',
  difficulty: 'Easy',
  stats: {
    distance: 12.5,
    duration: '3h 30min',
    elevationGain: 350,
    elevationLoss: 280,
  },
  experiences: [],
  waypoints: [
    { name: 'Start', distance: 0, description: 'Parking lot', type: 'start' },
    { name: 'Viewpoint', distance: 6, description: 'Great views', type: 'highlight' },
  ],
  elevationProfile: { highest: 1800, lowest: 1500, description: 'Rolling hills' },
  testimonials: [],
  images: { hero: '/images/trail-hero.jpg', gallery: [] },
};

describe('organizationSchema', () => {
  it('returns correct @type and @context', () => {
    const schema = organizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('includes site URL and logo', () => {
    const schema = organizationSchema();
    expect(schema.url).toBe('https://example.com');
    expect(schema.logo).toBe('https://example.com/Logo_Dark.png');
  });
});

describe('localBusinessSchema', () => {
  it('returns TouristInformationCenter type', () => {
    const schema = localBusinessSchema();
    expect(schema['@type']).toBe('TouristInformationCenter');
  });

  it('includes address in Colombia', () => {
    const schema = localBusinessSchema();
    expect(schema.address.addressCountry).toBe('CO');
    expect(schema.address.addressLocality).toBe('Pereira');
  });
});

describe('websiteSchema', () => {
  it('returns WebSite type with locale', () => {
    const schema = websiteSchema('en');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.inLanguage).toBe('en');
  });

  it('includes publisher reference', () => {
    const schema = websiteSchema('de');
    expect(schema.publisher).toHaveProperty('@id');
  });
});

describe('breadcrumbSchema', () => {
  it('returns BreadcrumbList with correct positions', () => {
    const schema = breadcrumbSchema('en', [
      { name: 'Home', path: '' },
      { name: 'Trails', path: '/trails' },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });

  it('builds localized URLs for each item', () => {
    const schema = breadcrumbSchema('es', [{ name: 'Trails', path: '/trails' }]);
    expect(schema.itemListElement[0].item).toBe('https://example.com/es/trails');
  });
});

describe('touristAttractionSchema', () => {
  const opts = { name: 'Sendero del Tigre', description: 'A trail', path: '/trails/sendero-del-tigre' };

  it('returns TouristAttraction type', () => {
    const schema = touristAttractionSchema(TRAIL_FIXTURE, 'en', opts);
    expect(schema['@type']).toBe('TouristAttraction');
  });

  it('includes hero image URL when present', () => {
    const schema = touristAttractionSchema(TRAIL_FIXTURE, 'en', opts);
    expect(schema.image).toBe('https://example.com/images/trail-hero.jpg');
  });

  it('sets image to undefined when trail has no hero image', () => {
    const noImage: Trail = { ...TRAIL_FIXTURE, images: { hero: '', gallery: [] } };
    const schema = touristAttractionSchema(noImage, 'en', opts);
    expect(schema.image).toBeUndefined();
  });

  it('includes Colombia geo data', () => {
    const schema = touristAttractionSchema(TRAIL_FIXTURE, 'en', opts);
    expect(schema.geo.addressCountry).toBe('CO');
  });
});

describe('touristTripSchema', () => {
  const opts = { name: 'Sendero del Tigre', description: 'A trail', path: '/trails/sendero-del-tigre' };

  it('returns TouristTrip type', () => {
    const schema = touristTripSchema(TRAIL_FIXTURE, 'en', opts);
    expect(schema['@type']).toBe('TouristTrip');
  });

  it('maps waypoints to itinerary places', () => {
    const schema = touristTripSchema(TRAIL_FIXTURE, 'en', opts);
    expect(schema.itinerary).toHaveLength(2);
    expect(schema.itinerary[0].position).toBe(1);
    expect(schema.itinerary[0].name).toBe('Start');
  });

  it('includes distance and difficulty in additionalProperty', () => {
    const schema = touristTripSchema(TRAIL_FIXTURE, 'en', opts);
    const propNames = schema.additionalProperty.map((p: { name: string }) => p.name);
    expect(propNames).toContain('distance');
    expect(propNames).toContain('difficulty');
    expect(propNames).toContain('elevationGain');
  });
});

describe('trailItemListSchema', () => {
  it('returns ItemList type', () => {
    const schema = trailItemListSchema('en', [{ slug: 'sendero-del-tigre', name: 'Sendero del Tigre' }]);
    expect(schema['@type']).toBe('ItemList');
  });

  it('builds localized trail URLs', () => {
    const schema = trailItemListSchema('de', [{ slug: 'sendero-del-tigre', name: 'Sendero del Tigre' }]);
    expect(schema.itemListElement[0].url).toBe(
      'https://example.com/de/trails/sendero-del-tigre'
    );
  });

  it('assigns sequential positions', () => {
    const schema = trailItemListSchema('en', [
      { slug: 'trail-a', name: 'Trail A' },
      { slug: 'trail-b', name: 'Trail B' },
    ]);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });
});
