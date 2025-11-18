/**
 * Sendero Design System - Color Tokens
 *
 * Semantic color definitions for the Sendero brand.
 * These tokens provide meaningful names that communicate intent
 * rather than specific color values.
 */

export const colors = {
  // Primary Brand Colors (Green - Nature, Eco-conscious, Sustainable)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main brand color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Accent Colors (Coffee/Yellow - Warmth, Energy, Coffee farms)
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308', // Main accent color
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },

  // Neutral Colors
  background: '#ffffff',
  foreground: '#0a0a0a',

  muted: {
    DEFAULT: '#f1f5f9',
    foreground: '#64748b',
  },

  border: '#e2e8f0',

  // Semantic Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444', // Main error color
    600: '#dc2626',
    700: '#b91c1c',
  },

  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e', // Uses primary green
    600: '#16a34a',
    700: '#15803d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
} as const;

/**
 * Color usage guidelines:
 *
 * PRIMARY (Green)
 * - Use for: Primary buttons, brand elements, key CTAs, icons
 * - Variants: 500 (default), 600 (hover), 100 (backgrounds), 50 (subtle backgrounds)
 *
 * ACCENT (Coffee/Yellow)
 * - Use for: Secondary buttons, highlights, warm accents
 * - Variants: 500 (default), 600 (hover)
 *
 * ERROR (Red)
 * - Use for: Validation errors, destructive actions, alerts
 * - Variants: 500 (default), 600 (hover)
 *
 * SUCCESS (Green - same as primary)
 * - Use for: Success messages, confirmations, positive feedback
 *
 * WARNING (Orange)
 * - Use for: Warnings, caution messages
 *
 * INFO (Blue)
 * - Use for: Informational messages, tips, helpers
 */

export type ColorToken = typeof colors;
