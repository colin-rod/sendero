/**
 * Database type definitions for Supabase
 *
 * These types match the schema defined in supabase/migrations/001_create_waitlist_signups.sql
 */

// Enum types
export type TourDuration = 'one_day' | 'weekend' | 'one_week';

export type InterestType = 'hike' | 'bike' | 'e_bike' | 'women_only' | 'coffee_farm';

export type FitnessLevel = 'beginner' | 'moderate';

export type TravelTimeline = 'next_3_months' | 'next_6_months' | 'later';

// Database row type
export interface WaitlistSignup {
  id: string;
  created_at: string;
  email: string;
  tour_duration: TourDuration;
  interest_types: InterestType[];
  fitness_level: FitnessLevel;
  travel_timeline: TravelTimeline;
  notes: string | null;
}

// Insert type (without auto-generated fields)
export interface WaitlistSignupInsert {
  email: string;
  tour_duration: TourDuration;
  interest_types: InterestType[];
  fitness_level: FitnessLevel;
  travel_timeline: TravelTimeline;
  notes?: string | null;
}

// Form data type (matches API request body)
export interface WaitlistFormData {
  email: string;
  tourDuration: TourDuration;
  interestTypes: InterestType[];
  fitnessLevel: FitnessLevel;
  travelTimeline: TravelTimeline;
}

// API response types
export interface ApiSuccessResponse {
  success: true;
  data: {
    message: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Contact form types
export type ContactSubject = 'general' | 'tour' | 'custom' | 'feedback';

// Database row type for contact submissions
export interface ContactSubmission {
  id: string;
  created_at: string;
  email: string;
  name: string;
  subject: ContactSubject | null;
  message: string;
  locale: string;
}

// Insert type (without auto-generated fields)
export interface ContactSubmissionInsert {
  email: string;
  name: string;
  subject?: ContactSubject | null;
  message: string;
  locale: string;
}

// Form data type (matches API request body)
export interface ContactFormData {
  name: string;
  email: string;
  subject?: ContactSubject | null;
  message: string;
}

// Supabase Database schema type
export interface Database {
  public: {
    Tables: {
      waitlist_signups: {
        Row: WaitlistSignup;
        Insert: WaitlistSignupInsert;
        Update: Partial<WaitlistSignupInsert>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
      };
    };
  };
}
