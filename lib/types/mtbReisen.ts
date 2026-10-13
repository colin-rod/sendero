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

export type MtbReisenVariantKey = 'nine' | 'seven';

export interface MtbReisenVariant {
  key: MtbReisenVariantKey;
  priceFrom: number;
}

export interface MtbReisenImages {
  hero: string;
  /** One per highlight in `mtbReisen.landscapes.items` (same order) */
  landscapes: string[];
  casaTacay: string;
  cta: string;
}

export interface MtbReisenTrip {
  id: string;
  slug: string;
  currency: string;
  variants: MtbReisenVariant[];
  images: MtbReisenImages;
  days: MtbReisenDay[];
}
