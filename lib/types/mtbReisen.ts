export interface MtbReisenDay {
  day: number;
  distanceKm: number;
  elevationGainM: number;
}

export interface MtbReisenImages {
  hero: string;
  introBackground: string;
  gallery: [string, string, string];
}

export interface MtbReisenTrip {
  id: string;
  slug: string;
  priceFrom: number;
  currency: string;
  nextDates: string[];
  bookingEmail: string;
  images: MtbReisenImages;
  days: MtbReisenDay[];
}
