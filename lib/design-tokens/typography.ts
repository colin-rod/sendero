/**
 * Sendero Design System - Typography Tokens
 *
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
  },

  // Font Sizes (with responsive variants)
  fontSize: {
    // Display sizes (hero headings)
    display: {
      mobile: '2.25rem', // 36px
      tablet: '3rem', // 48px
      desktop: '3.75rem', // 60px
      lineHeight: {
        mobile: '2.5rem', // 40px
        tablet: '1', // tight
        desktop: '1', // tight
      },
    },

    // H1
    h1: {
      mobile: '2.25rem', // 36px
      tablet: '3rem', // 48px
      desktop: '3.75rem', // 60px
      lineHeight: {
        mobile: '2.5rem',
        tablet: '1',
        desktop: '1',
      },
    },

    // H2
    h2: {
      mobile: '1.875rem', // 30px
      tablet: '2.25rem', // 36px
      desktop: '3rem', // 48px
      lineHeight: {
        mobile: '2.25rem',
        tablet: '2.5rem',
        desktop: '1',
      },
    },

    // H3
    h3: {
      mobile: '1.5rem', // 24px
      tablet: '1.875rem', // 30px
      desktop: '1.875rem', // 30px
      lineHeight: {
        mobile: '2rem',
        tablet: '2.25rem',
        desktop: '2.25rem',
      },
    },

    // H4
    h4: {
      mobile: '1.25rem', // 20px
      tablet: '1.5rem', // 24px
      desktop: '1.5rem', // 24px
      lineHeight: {
        mobile: '1.75rem',
        tablet: '2rem',
        desktop: '2rem',
      },
    },

    // H5
    h5: {
      mobile: '1.125rem', // 18px
      tablet: '1.25rem', // 20px
      desktop: '1.25rem', // 20px
      lineHeight: '1.5',
    },

    // H6
    h6: {
      mobile: '1rem', // 16px
      tablet: '1.125rem', // 18px
      desktop: '1.125rem', // 18px
      lineHeight: '1.5',
    },

    // Body text
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    sm: '0.875rem', // 14px
    xs: '0.75rem', // 12px

    // Utility sizes
    lead: '1.25rem', // 20px - Lead paragraphs
    caption: '0.875rem', // 14px - Captions, labels
    overline: '0.75rem', // 12px - Overlines, metadata
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
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
 * Typography usage guidelines:
 *
 * HEADINGS
 * - Always use semibold (600) weight
 * - Use display size for hero sections
 * - Maintain hierarchy: h1 > h2 > h3 > h4 > h5 > h6
 *
 * BODY TEXT
 * - Use normal (400) weight for readability
 * - Base size (16px) for primary content
 * - Use 'lead' size for important paragraphs
 * - Use 'sm' for secondary content
 *
 * LABELS & UI
 * - Use medium (500) weight for labels
 * - Use 'sm' or 'xs' for form labels
 * - Use 'caption' for helper text
 *
 * LINE HEIGHT
 * - Headings: tight to none (1 to 1.25)
 * - Body: normal to relaxed (1.5 to 1.625)
 * - UI elements: normal (1.5)
 */

export type TypographyToken = typeof typography;
