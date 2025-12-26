/**
 * Trail Type Definitions
 *
 * TypeScript interfaces for trail pages, defining the structure
 * for trail data from Komoot exports and custom content.
 */

export interface Trail {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  stats: TrailStats;
  experiences: Experience[];
  waypoints: Waypoint[];
  elevationProfile: ElevationProfile;
  testimonials: Testimonial[];
  images: TrailImages;
}

export interface TrailStats {
  distance: number; // kilometers
  duration: string; // e.g., "1h 23min"
  elevationGain: number; // meters
  elevationLoss: number; // meters
  averageSpeed?: number; // km/h (optional)
  wayTypes?: {
    road?: number; // km
    street?: number; // km
    singletrack?: number; // meters
  };
  surfaces?: {
    paved?: number; // km
    asphalt?: number; // km
    unpaved?: number; // meters
  };
}

export interface Experience {
  id: string; // Used for data-experience-id attribute
  title: string;
  description: string;
  location: number; // km marker
  icon: 'river' | 'bamboo' | 'farm' | 'mountain' | 'coffee' | 'viewpoint'; // Icon name
  image: string; // Image path
}

export interface Waypoint {
  name: string;
  distance: number; // km
  description: string;
  type?: 'start' | 'highlight' | 'end';
  icon?: string;
}

export interface ElevationProfile {
  highest: number; // meters
  lowest: number; // meters
  description: string;
  chartData?: number[]; // For future dynamic chart generation from GPX
}

export interface Testimonial {
  quote: string;
  author: string;
  country: string;
}

export interface TrailImages {
  hero: string; // Hero image path
  gallery: string[]; // Array of gallery image paths
}

/**
 * Trail summary for use in overview/master page cards
 */
export interface TrailSummary {
  id: string;
  slug: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  distance: number; // km
  duration: string;
  thumbnail: string; // Image path for card
  comingSoon?: boolean; // Optional flag for placeholder trails
  priority?: number; // Optional priority for sorting
}
