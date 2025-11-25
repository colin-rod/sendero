/**
 * Sendero Design System - Typography Tokens
 *
 * Font families, sizes, weights, and line heights
 * Updated from Figma design specifications (November 2024)
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
    mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
  },

  // Font Sizes (Tailwind standard scale from Figma)
  fontSize: {
    // Heading styles from Figma
    h1: '3rem', // 48px - text-5xl
    h2: '2.25rem', // 36px - text-4xl
    h3: '1.5rem', // 24px - text-2xl

    // Body and utility sizes from Figma
    base: '1rem', // 16px - text-base
    label: '0.75rem', // 12px - text-xs

    // Additional Tailwind sizes (for flexibility)
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
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

/**
 * Typography usage guidelines (from Figma, November 2024):
 *
 * HEADER 1
 * - Size: text-5xl (48px)
 * - Weight: font-bold (700)
 * - Usage: Main page headings, hero titles
 * - Tailwind: text-5xl font-bold
 *
 * HEADER 2
 * - Size: text-4xl (36px)
 * - Weight: font-bold (700)
 * - Usage: Section headings, major content divisions
 * - Tailwind: text-4xl font-bold
 *
 * HEADER 3
 * - Size: text-2xl (24px)
 * - Weight: font-medium (500)
 * - Usage: Sub-section headings, card titles
 * - Tailwind: text-2xl font-medium
 *
 * BODY
 * - Size: text-base (16px)
 * - Weight: font-normal (400)
 * - Line Height: leading-4 (16px)
 * - Usage: Primary body text, paragraphs
 * - Tailwind: text-base font-normal leading-4
 *
 * LABEL
 * - Size: text-xs (12px)
 * - Weight: font-semibold (600)
 * - Usage: Form labels, metadata, small UI text
 * - Tailwind: text-xs font-semibold
 *
 * HIERARCHY
 * - Maintain consistent hierarchy: H1 > H2 > H3
 * - Use semantic HTML tags (h1, h2, h3) for accessibility
 * - Apply styles via Tailwind utilities or custom classes
 */

export type TypographyToken = typeof typography;
