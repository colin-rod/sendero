/**
 * Sendero Design System - Border Radius Tokens
 *
 * Rounded corners for different component sizes
 */

export const radius = {
  // Base radius scale
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.375rem', // 6px - Default for buttons, inputs
  md: '0.5rem', // 8px - Default for cards
  lg: '0.75rem', // 12px - Large cards, sections
  xl: '1rem', // 16px - Hero images, large panels
  '2xl': '1.5rem', // 24px - Very large elements
  '3xl': '2rem', // 32px - Extra large
  full: '9999px', // Fully rounded (pills, circles)

  // Semantic radius tokens
  component: {
    button: '0.375rem', // 6px - Buttons, links
    input: '0.375rem', // 6px - Form inputs
    card: '0.5rem', // 8px - Cards, panels
    badge: '9999px', // Full - Badges, pills
    avatar: '9999px', // Full - Avatars, profile images
    modal: '0.75rem', // 12px - Modals, dialogs
    image: '0.5rem', // 8px - Standard images
    imageHero: '1rem', // 16px - Hero images
  },
} as const;

/**
 * Border radius usage guidelines:
 *
 * SMALL ELEMENTS
 * - Buttons: base (6px)
 * - Inputs: base (6px)
 * - Badges: full (pill shape)
 * - Small icons: sm (2px) or base (6px)
 *
 * MEDIUM ELEMENTS
 * - Cards: md (8px)
 * - Panels: md (8px)
 * - Images: md (8px)
 * - Modals: lg (12px)
 *
 * LARGE ELEMENTS
 * - Hero sections: xl (16px) or 2xl (24px)
 * - Large panels: xl (16px)
 * - Feature images: lg (12px) or xl (16px)
 *
 * CIRCULAR ELEMENTS
 * - Avatars: full
 * - Icon wrappers: full
 * - Badges/Pills: full
 * - Number bubbles: full
 *
 * CONSISTENCY RULES
 * - Smaller elements = smaller radius
 * - Larger elements = larger radius
 * - Related elements should share radius values
 * - Use semantic tokens (component.*) for consistency
 */

export type RadiusToken = typeof radius;
