/**
 * Trail Data
 *
 * Central repository for all trail information, based on Komoot exports
 * and custom content. This file contains the data for all Sendero trails.
 */

import type { Trail, TrailSummary } from '@/lib/types/trails';

/**
 * Sendero del Tigre - The Tiger Trail
 * Data from Komoot export: 23km, 1h23min, Easy difficulty
 */
export const senderoDelTigre: Trail = {
  id: 'sendero-del-tigre',
  slug: 'sendero-del-tigre',
  name: 'El Sendero del Tigre',
  subtitle: 'A guided journey through bamboo forests and mountain streams',
  difficulty: 'Easy',
  stats: {
    distance: 23.0, // km
    duration: '1h 23min',
    elevationGain: 230, // meters
    elevationLoss: 230, // meters
    averageSpeed: 16.7, // km/h
    wayTypes: {
      road: 21.1, // km
      street: 1.49, // km
      singletrack: 448, // meters
    },
    surfaces: {
      paved: 13.0, // km
      asphalt: 9.56, // km
      unpaved: 448, // meters
    },
  },
  experiences: [
    {
      id: 'stream-crossing',
      title: 'El Tigre Stream Crossing',
      description:
        'Wade through crystal-clear mountain waters where wildlife comes to drink. This peaceful stream crossing is a highlight of the trail, offering a refreshing pause in your journey.',
      location: 1.62, // km
      icon: 'river',
      image: '/images/trails/sendero-del-tigre/experience-stream.webp',
    },
    {
      id: 'bamboo-forest',
      title: 'Bamboo Forest Trail',
      description:
        'Ride through towering bamboo groves with dappled sunlight filtering through the canopy. The gentle rustling of bamboo creates a serene atmosphere perfect for nature lovers.',
      location: 8.0, // km (estimated)
      icon: 'bamboo',
      image: '/images/trails/sendero-del-tigre/experience-bamboo.webp',
    },
    {
      id: 'farm-lunch',
      title: 'Ecological Farm Lunch',
      description:
        'Traditional Colombian lunch at a sustainable family farm. Enjoy fresh, organic ingredients and learn about local farming practices while surrounded by coffee plants.',
      location: 10.2, // km (estimated)
      icon: 'farm',
      image: '/images/trails/sendero-del-tigre/experience-farm.webp',
    },
    {
      id: 'mountain-vista',
      title: 'Mountain Vista Point',
      description:
        'Panoramic views of coffee plantations and distant peaks. This scenic overlook provides the perfect photo opportunity and a chance to appreciate the Coffee Region landscape.',
      location: 15.0, // km (estimated)
      icon: 'mountain',
      image: '/images/trails/sendero-del-tigre/experience-vista.webp',
    },
  ],
  waypoints: [
    {
      name: 'Start Point',
      distance: 0,
      description: 'Town square in Pereira - Meet your guide and receive equipment',
      type: 'start',
    },
    {
      name: 'El Tigre Stream',
      distance: 1.62,
      description: 'Peaceful river crossing with mountain views',
      type: 'highlight',
    },
    {
      name: 'Bamboo Ridge',
      distance: 8.0,
      description: 'Dense bamboo forest section with cool shade',
    },
    {
      name: 'Ecological Farm',
      distance: 10.2,
      description: 'Lunch stop at sustainable family farm',
    },
    {
      name: 'Vista Point',
      distance: 15.0,
      description: 'Panoramic overlook of Coffee Region valleys',
    },
    {
      name: 'End Point',
      distance: 23.0,
      description: 'Return to starting point in Pereira',
      type: 'end',
    },
  ],
  elevationProfile: {
    highest: 1240, // meters
    lowest: 1150, // meters
    description:
      'Mostly gentle rolling terrain with one gradual climb around the midpoint. The elevation changes are manageable for beginners, with no steep descents or technical sections.',
  },
  testimonials: [
    {
      quote:
        "One of the most peaceful rides of my life. I felt guided, safe, and deeply connected to the forest. The bamboo section was absolutely magical.",
      author: 'Anna Schmidt',
      country: 'Germany',
    },
    {
      quote:
        "The perfect introduction to cycling in Colombia. Beautiful scenery, authentic experiences, and our guide was incredibly knowledgeable about the local ecology.",
      author: 'James Miller',
      country: 'USA',
    },
    {
      quote:
        "The bamboo forests were magical. Our guide knew every plant and bird along the way. Lunch at the farm was a highlight – fresh ingredients and warm hospitality.",
      author: 'Sofia Martinez',
      country: 'Spain',
    },
  ],
  images: {
    hero: '/images/trails/sendero-del-tigre/hero.webp',
    gallery: [
      '/images/trails/sendero-del-tigre/gallery/1.webp',
      '/images/trails/sendero-del-tigre/gallery/2.webp',
      '/images/trails/sendero-del-tigre/gallery/3.webp',
      '/images/trails/sendero-del-tigre/gallery/4.webp',
      '/images/trails/sendero-del-tigre/gallery/5.webp',
      '/images/trails/sendero-del-tigre/gallery/6.webp',
    ],
  },
};

/**
 * Trail Summaries for Master/Overview Page
 * Contains basic info for trail cards
 */
export const trailSummaries: TrailSummary[] = [
  {
    id: 'sendero-del-tigre',
    slug: 'sendero-del-tigre',
    name: 'El Sendero del Tigre',
    difficulty: 'Easy',
    distance: 23.0,
    duration: '1h 23min',
    thumbnail: '/images/trails/sendero-del-tigre/hero.webp',
  },
  // Future trails will be added here:
  // {
  //   id: 'sendero-del-rio',
  //   slug: 'sendero-del-rio',
  //   name: 'El Sendero del Rio',
  //   difficulty: 'Moderate',
  //   distance: 28.0,
  //   duration: '2h 15min',
  //   thumbnail: '/images/trails/sendero-del-rio/hero.webp',
  // },
  // {
  //   id: 'sendero-del-cafe',
  //   slug: 'sendero-del-cafe',
  //   name: 'El Sendero del Café',
  //   difficulty: 'Easy',
  //   distance: 18.0,
  //   duration: '1h 10min',
  //   thumbnail: '/images/trails/sendero-del-cafe/hero.webp',
  // },
];

/**
 * Get trail by slug
 */
export function getTrailBySlug(slug: string): Trail | undefined {
  const trails: Record<string, Trail> = {
    'sendero-del-tigre': senderoDelTigre,
    // Add more trails here as they're created
  };

  return trails[slug];
}

/**
 * Get all trail summaries
 */
export function getAllTrailSummaries(): TrailSummary[] {
  return trailSummaries;
}
