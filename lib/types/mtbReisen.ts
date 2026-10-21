export interface MtbReisenDay {
  /** Matches the day's copy in `mtbReisen.itinerary.days` (same order) */
  key: string;
  distanceKm: number;
  elevationGainM: number;
  /** Day only runs on the 9-day trip; hidden (and the rest renumbered) in the 7-day view */
  nineDaysOnly?: boolean;
  /** Wide background image for the day */
  image: string;
}

export type MtbReisenVariantKey = 'seven' | 'nine';

export interface MtbReisenVariant {
  key: MtbReisenVariantKey;
  days: number;
  priceFrom: number;
}

export interface MtbReisenImages {
  hero: string;
  /** Photo beside the region chronicle */
  region: string;
  /** One per caption in `mtbReisen.gallery.items` (same order) */
  gallery: string[];
  cta: string;
}

export interface MtbReisenTrip {
  id: string;
  slug: string;
  currency: string;
  variants: MtbReisenVariant[];
  /** Single room supplement, same currency */
  singleSupplement: number;
  images: MtbReisenImages;
  days: MtbReisenDay[];
}
