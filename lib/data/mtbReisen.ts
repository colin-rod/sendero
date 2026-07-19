import type { MtbReisenTrip } from '@/lib/types/mtbReisen';

export const mtbReisenNueveTage: MtbReisenTrip = {
  id: 'mtb-reise-9-tage',
  slug: 'mtb-reisen',
  priceFrom: 3890,
  currency: 'EUR',
  nextDates: ['2027-04', '2027-11'],
  bookingEmail: 'julian@senderobiketrails.com',
  images: {
    hero: '/images/mtb-reisen/hero.jpg',
    introBackground: '/images/mtb-reisen/intro-bg.png',
    gallery: [
      '/images/mtb-reisen/gallery-1.jpg',
      '/images/mtb-reisen/gallery-2.jpg',
      '/images/mtb-reisen/gallery-3.jpg',
    ],
  },
  days: [
    { day: 1, distanceKm: 0, elevationGainM: 0 },
    { day: 2, distanceKm: 15, elevationGainM: 130 },
    { day: 3, distanceKm: 22, elevationGainM: 273 },
    { day: 4, distanceKm: 32, elevationGainM: 750 },
    { day: 5, distanceKm: 18, elevationGainM: 315 },
    { day: 6, distanceKm: 23, elevationGainM: 658 },
    { day: 7, distanceKm: 17, elevationGainM: 154 },
    { day: 8, distanceKm: 18, elevationGainM: 485 },
    { day: 9, distanceKm: 0, elevationGainM: 0 },
  ],
};
