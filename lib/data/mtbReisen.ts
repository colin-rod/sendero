import type { MtbReisenDay, MtbReisenTrip, MtbReisenVariantKey } from '@/lib/types/mtbReisen';

/*
 * Image paths below are stand-ins taken from photos already in the project.
 * Each TODO(image) names the motif the final photo should show.
 */
export const mtbReise: MtbReisenTrip = {
  id: 'mtb-reise-kaffeeregion',
  slug: 'mtb-reisen',
  currency: 'EUR',
  variants: [
    { key: 'nine', priceFrom: 3890 },
    { key: 'seven', priceFrom: 3290 },
  ],
  images: {
    // TODO(image): Wide hero – riders on a ridge between coffee slopes and clouds (video optional)
    hero: '/images/mtb-reisen/hero.jpg',
    landscapes: [
      // TODO(image): Coffee cultural landscape – rows of coffee on steep green slopes
      '/images/anfragen/gallery-gastgeber.jpg',
      // TODO(image): Cacao plantation – ripe cacao pods on the tree
      '/images/anfragen/gallery-finca.jpg',
      // TODO(image): Colorful village – painted balconies in Salento or Filandia
      '/images/mtb-reisen/gallery-1.jpg',
      // TODO(image): Volcano landscape – Nevado del Ruiz / Los Nevados panorama
      '/images/anfragen/hero-poster.jpg',
      // TODO(image): Waterfall or hot spring in the cloud forest
      '/images/anfragen/gallery-nebelwald.jpg',
      // TODO(image): Bamboo forest – guadua cathedral from below
      '/images/mtb-reisen/cta-alto-de-letras.jpg',
      // TODO(image): Páramo – frailejones and lagoon at 3,400 m
      '/images/mtb-reisen/hero.jpg',
    ],
    // TODO(image): Casa Tacay – the finca house and terrace above the coffee slopes
    casaTacay: '/images/anfragen/gallery-finca.jpg',
    // TODO(image): Final CTA – wide sunset over the Andes from the saddle
    cta: '/images/mtb-reisen/cta-alto-de-letras.jpg',
  },
  days: [
    // TODO(image): Arrival – group at the Casa Tacay table at dusk
    { key: 'arrival', distanceKm: 0, elevationGainM: 0, image: '/images/anfragen/gallery-finca.jpg' },
    // TODO(image): Sendero del Tigre – bamboo-lined trail and fruit orchards
    { key: 'tigre', distanceKm: 15, elevationGainM: 130, image: '/images/mtb-reisen/cta-alto-de-letras.jpg' },
    // TODO(image): Sendero del Café – quiet country road through the UNESCO coffee landscape
    { key: 'cafe', distanceKm: 22, elevationGainM: 273, image: '/images/anfragen/gallery-gastgeber.jpg' },
    // TODO(image): Sendero del Agua – river crossing / bridge in the cloud forest near La Florida
    { key: 'agua', distanceKm: 32, elevationGainM: 750, image: '/images/anfragen/gallery-nebelwald.jpg' },
    // TODO(image): Sendero del Cacao – hands holding an opened cacao pod
    { key: 'cacao', distanceKm: 18, elevationGainM: 315, nineDaysOnly: true, image: '/images/mtb-reisen/gallery-2.jpg' },
    // TODO(image): Sendero del Volcán – wax palms with the volcano behind
    { key: 'volcan', distanceKm: 23, elevationGainM: 658, image: '/images/anfragen/hero-poster.jpg' },
    // TODO(image): Sendero del Oro – Quimbaya gold piece or old connecting road near Armenia
    { key: 'oro', distanceKm: 17, elevationGainM: 154, nineDaysOnly: true, image: '/images/mtb-reisen/gallery-1.jpg' },
    // TODO: confirm Páramo stats (18 km · 485 Hm) with the final route
    // TODO(image): Sendero del Páramo – riders among frailejones at 3,400 m
    { key: 'paramo', distanceKm: 18, elevationGainM: 485, image: '/images/mtb-reisen/hero.jpg' },
    // TODO(image): Departure – last breakfast on the finca terrace
    { key: 'departure', distanceKm: 0, elevationGainM: 0, image: '/images/anfragen/gallery-gruppe.jpg' },
  ],
};

/** Days of the chosen variant, renumbered from 1. */
export function daysForVariant<T extends Pick<MtbReisenDay, 'nineDaysOnly'>>(
  days: T[],
  variant: MtbReisenVariantKey
): (T & { number: number })[] {
  return days
    .filter((day) => variant === 'nine' || !day.nineDaysOnly)
    .map((day, index) => ({ ...day, number: index + 1 }));
}
