/**
 * Sendero Design System - Spacing Tokens
 *
 * Semantic spacing values for consistent layouts
 */

export const spacing = {
  // Base spacing scale (4px increments)
  // Inherits from Tailwind's default scale
  base: {
    0: '0',
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    4.5: '1.125rem', // 18px - Custom addition
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    11: '2.75rem', // 44px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
    36: '9rem', // 144px
    40: '10rem', // 160px
    44: '11rem', // 176px
    48: '12rem', // 192px
    52: '13rem', // 208px
    56: '14rem', // 224px
    60: '15rem', // 240px
    64: '16rem', // 256px
    72: '18rem', // 288px
    80: '20rem', // 320px
    96: '24rem', // 384px
  },

  // Semantic spacing tokens for common use cases
  component: {
    // Internal component spacing
    tight: '0.5rem', // 8px - Tight spacing within small components
    compact: '0.75rem', // 12px - Compact spacing
    comfortable: '1rem', // 16px - Comfortable default
    relaxed: '1.5rem', // 24px - Relaxed spacing
    spacious: '2rem', // 32px - Spacious layouts
  },

  gap: {
    // Gap spacing for flex/grid layouts
    xs: '0.5rem', // 8px
    sm: '1rem', // 16px
    md: '1.5rem', // 24px
    lg: '2rem', // 32px
    xl: '3rem', // 48px
    '2xl': '4rem', // 64px
  },

  section: {
    // Vertical section spacing
    mobile: '5rem', // 80px (py-20)
    tablet: '6rem', // 96px
    desktop: '8rem', // 128px (py-32)
  },

  container: {
    // Container horizontal padding
    mobile: '1rem', // 16px (px-4)
    tablet: '1.5rem', // 24px (px-6)
    desktop: '2rem', // 32px (px-8)
  },

  formField: {
    // Spacing between form fields
    default: '1.5rem', // 24px (space-y-6)
    compact: '1rem', // 16px
    relaxed: '2rem', // 32px
  },

  card: {
    // Card internal padding
    sm: '1rem', // 16px
    md: '1.5rem', // 24px (p-6)
    lg: '2rem', // 32px (p-8)
  },
} as const;

/**
 * Spacing usage guidelines:
 *
 * COMPONENT SPACING
 * - Use 'tight' for button internals, small badges
 * - Use 'comfortable' for default component padding
 * - Use 'relaxed' for cards, panels
 * - Use 'spacious' for hero sections, feature blocks
 *
 * GAPS (Flex/Grid)
 * - Use 'sm' for inline elements (tags, chips)
 * - Use 'md' for card grids
 * - Use 'lg' for feature sections
 * - Use 'xl' for major layout sections
 *
 * SECTIONS
 * - Always use responsive section spacing (mobile → desktop)
 * - Mobile: py-20 (80px)
 * - Desktop: py-32 (128px)
 *
 * CONTAINERS
 * - Always use responsive container padding
 * - Mobile: px-4 (16px)
 * - Tablet: px-6 (24px)
 * - Desktop: px-8 (32px)
 *
 * FORMS
 * - Use formField.default (24px) between fields
 * - Use formField.compact for inline forms
 */

export type SpacingToken = typeof spacing;
