/**
 * Sendero Design System - Typography Tokens
 *
 * Font families, sizes, weights, and line heights
 * Updated from Figma design specifications (November 2024)
 */

export const typography = {
  // Font Families — Updated to Helvetica Neue (system font, from Figma)
  fontFamily: {
    sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
  },

  // Font Sizes — Updated from Figma Desktop/Mobile/Tablet tokens (2025)
  fontSize: {
    // Display (new) — Desktop: 64px, Mobile/Tablet: 48px
    display: '4rem', // 64px desktop base

    // Heading styles from Figma
    h1: '3rem', // 48px desktop (40px on mobile — use responsive Tailwind)
    h2: '2rem', // 32px — updated from 36px per Figma
    h3: '1.75rem', // 28px desktop (24px on mobile — use responsive Tailwind)

    // Body sizes from Figma
    base: '1rem', // 16px - Body Standard
    bodyEm: '1rem', // 16px - Body Emphasised (same size, bold weight)
    bodySmall: '0.625rem', // 10px - Body Small

    // UI sizes from Figma
    buttonLabel: '1rem', // 16px - Button Label
    label: '0.75rem', // 12px - text-xs

    // Additional sizes (for flexibility)
    lg: '1.125rem', // 18px
    sm: '0.875rem', // 14px
    xs: '0.75rem', // 12px

    // Utility sizes
    lead: '1.25rem', // 20px - Lead paragraphs
    caption: '0.875rem', // 14px - Captions
    overline: '0.75rem', // 12px - Overlines, metadata
  },

  // Font Weights (from Figma)
  fontWeight: {
    normal: '400', // Body text
    medium: '500', // Header 3
    semibold: '600', // Labels
    bold: '700', // Header 1 & 2
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
    // Figma-specific line heights
    base: '1rem', // 16px - used for body text (leading-4)
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    tight2: '-0.02em', // -2% for Label (navbar titles)
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

/**
 * Typography usage guidelines (from Figma Desktop/Mobile/Tablet tokens, 2025):
 *
 * DISPLAY (new)
 * - Size: 64px desktop / 48px mobile (text-display / md:text-display)
 * - Weight: font-bold (700)
 * - Usage: Hero super-headings, splash screens
 *
 * HEADER 1
 * - Size: 48px desktop / 40px mobile (text-h1 / md:text-5xl)
 * - Weight: font-bold (700)
 * - Usage: Main page headings, hero titles
 *
 * HEADER 2
 * - Size: 32px (text-h2) — updated from 36px
 * - Weight: font-bold (700)
 * - Usage: Section headings, major content divisions
 *
 * HEADER 3
 * - Size: 28px desktop / 24px mobile (text-h3 / md:text-h3)
 * - Weight: font-medium (500)
 * - Usage: Sub-section headings, card titles
 *
 * BODY STANDARD
 * - Size: text-base (16px), font-normal (400)
 * - Usage: Primary body text, paragraphs
 *
 * BODY EMPHASISED
 * - Size: text-base (16px), font-bold (700)
 * - Usage: Callouts, highlighted body copy
 *
 * BODY SMALL
 * - Size: 10px (text-body-small), font-normal (400)
 * - Usage: Fine print, footnotes, captions
 *
 * BUTTON LABEL
 * - Size: 16px (text-base), font-medium (500)
 * - Usage: All button text
 *
 * LABEL
 * - Size: text-xs (12px), font-semibold (600), uppercase, tracking-tight2
 * - Usage: Navbar titles, form labels, metadata
 *
 * FONT FAMILY
 * - Helvetica Neue (system font — no Google Fonts import needed)
 * - Falls back to: Helvetica, Arial, sans-serif
 */

export type TypographyToken = typeof typography;
