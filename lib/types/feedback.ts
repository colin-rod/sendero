/**
 * Feedback System Type Definitions
 */

export type FeedbackCategory = 'bug-report' | 'feature-request' | 'general' | 'ux-issue';

export interface FeedbackFormData {
  email?: string;
  category: FeedbackCategory;
  message: string;
  screenshot?: File | null;
}

export interface FeedbackPayload {
  email?: string;
  category: FeedbackCategory;
  message: string;
  screenshot?: string;      // Base64 data URL
  platform: string;
  url: string;
  locale: string;
  timestamp: string;
}

export interface FeedbackResponse {
  success: boolean;
  error?: string;
  issueId?: string;
}
