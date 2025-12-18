/**
 * Sendero Design System - Color Tokens
 *
 * Semantic color definitions for the Sendero brand.
 * These tokens provide meaningful names that communicate intent
 * rather than specific color values.
 *
 * Updated to match Figma design system
 */

export const colors = {
  // Primary Brand Colors (Golden Yellow - Warmth, Energy, Adventure)
  primary: {
    50: '#fffbeb',
    100: '#fff0bb', // Secondary from Figma
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#e2b71f', // Main brand color from Figma
    600: '#ca9a1b',
    700: '#a87c16',
    800: '#865f11',
    900: '#6b4a0e',
    950: '#422006',
  },

  // Secondary/Accent Colors (Light Cream - Soft, Warm accent)
  accent: {
    50: '#fffefb',
    100: '#fffcf5',
    200: '#fff8eb',
    300: '#fff3d6',
    400: '#fff0bb', // Secondary from Figma
    500: '#ffe89a',
    600: '#f5d980',
    700: '#e5c566',
    800: '#d4b04d',
    900: '#c39b33',
    950: '#a87c16',
  },

  // Honey Yellow (Rich Golden - Adventure, Warmth, Buttons)
  honey: {
    50: '#fdf8ec',
    100: '#faedc9',
    200: '#f5da8f',
    300: '#efc055',
    400: '#eaad2f',
    500: '#c4963f', // Main Honey Yellow from Figma
    600: '#a97935',
    700: '#8c5e2d',
    800: '#734c2a',
    900: '#613f28',
    950: '#372016',
  },

  // Neutral Colors - Updated from Figma
  background: '#f1f1f1', // Background from Figma
  foreground: '#1b1b1b', // Gravel Black from Figma

  muted: {
    DEFAULT: '#f1f1f1', // Background from Figma
    foreground: '#616161', // Steel Gray from Figma
  },

  border: '#e2e8f0',

  // Grays from Figma
  gray: {
    50: '#f9f9f9',
    100: '#f1f1f1', // Background from Figma
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#616161', // Steel Gray from Figma
    700: '#494949', // Medium gray
    800: '#262626',
    900: '#1b1b1b', // Gravel Black from Figma
    950: '#0a0a0a',
  },

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
    500: '#22c55e',
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
 * PRIMARY (Golden Yellow - #e2b71f)
 * - Use for: Primary buttons, brand elements, key CTAs, highlights
 * - Variants: 500 (default), 600 (hover), 100 (light backgrounds), 50 (subtle backgrounds)
 *
 * ACCENT (Light Cream - #fff0bb)
 * - Use for: Secondary buttons, soft backgrounds, warm accents
 * - Variants: 400 (default), 500 (hover)
 *
 * HONEY (Honey Yellow - #c4963f)
 * - Use for: Special CTA buttons, hero buttons, discover/explore actions
 * - Variants: 500 (default), 600 (hover), 700 (active), 50-100 (light backgrounds)
 *
 * GRAVEL BLACK (#1b1b1b)
 * - Use for: Primary text, headings, dark backgrounds
 * - Access via: foreground or gray.900
 *
 * STEEL GRAY (#616161)
 * - Use for: Secondary text, muted text, borders
 * - Access via: muted.foreground or gray.600
 *
 * BACKGROUND (#f1f1f1)
 * - Use for: Page backgrounds, card backgrounds
 * - Access via: background or gray.100
 *
 * ERROR (Red)
 * - Use for: Validation errors, destructive actions, alerts
 * - Variants: 500 (default), 600 (hover)
 *
 * SUCCESS (Green)
 * - Use for: Success messages, confirmations, positive feedback
 *
 * WARNING (Orange)
 * - Use for: Warnings, caution messages
 *
 * INFO (Blue)
 * - Use for: Informational messages, tips, helpers
 */

export type ColorToken = typeof colors;
