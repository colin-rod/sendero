/**
 * Feedback System Type Definitions
 *
 * Types for the Linear feedback integration system.
 * Feedback is submitted via a modal dialog and sent to Linear as issues.
 */

/**
 * Feedback categories that map to Linear labels
 */
export type FeedbackCategory = 'bug-report' | 'feature-request' | 'general' | 'ux-issue';

/**
 * Form data collected from the user
 */
export interface FeedbackFormData {
  email?: string;           // Optional - user can provide contact info
  category: FeedbackCategory;
  message: string;
  screenshot?: File | null;  // Optional screenshot file
}

/**
 * Payload sent to the Supabase Edge Function
 */
export interface FeedbackPayload {
  email?: string;
  category: FeedbackCategory;
  message: string;
  screenshot?: string;      // Base64 data URL
  platform: string;         // Browser user agent
  url: string;              // Page where feedback was submitted
  locale: string;           // Current language (en/de/es)
}

/**
 * Response from the feedback submission
 */
export interface FeedbackResponse {
  success: boolean;
  error?: string;
  issueId?: string;         // Linear issue identifier (e.g., "SEN-123")
}
