/**
 * Sendero Design System - Shadow Tokens
 *
 * Elevation system using shadows for depth and hierarchy
 */

export const shadows = {
  // Base shadow definitions
  none: 'none',

  // Subtle elevation
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  // Default elevation
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  // Medium elevation
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // High elevation
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // Very high elevation
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Maximum elevation
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Inner shadow
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Semantic shadow tokens
  elevation: {
    flat: 'none', // No elevation - flush with background
    raised: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Slightly raised (cards)
    floating: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Floating (dropdowns)
    overlay: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // Overlays (modals, dialogs)
    popup: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // Popups (tooltips, popovers)
  },

  // Focus shadows (for accessibility)
  focus: {
    primary: '0 0 0 3px rgb(34 197 94 / 0.3)', // Green ring
    accent: '0 0 0 3px rgb(234 179 8 / 0.3)', // Yellow ring
    error: '0 0 0 3px rgb(239 68 68 / 0.3)', // Red ring
  },
} as const;

/**
 * Shadow usage guidelines:
 *
 * ELEVATION HIERARCHY
 * - flat (none): Flush elements, disabled states
 * - raised (sm): Default cards, benefit boxes
 * - floating (md): Dropdowns, small popovers
 * - overlay (lg): Modals, dialogs, important forms
 * - popup (xl): Tooltips, notifications, toasts
 *
 * INTERACTIVE STATES
 * - Use shadows to indicate interactivity
 * - Increase elevation on hover (sm → md)
 * - Reduce elevation when pressed (md → sm)
 *
 * FOCUS RINGS
 * - Always use focus shadows for keyboard navigation
 * - Primary (green) for primary actions
 * - Error (red) for validation errors
 * - Accent (yellow) for secondary actions
 *
 * PERFORMANCE
 * - Avoid animating shadows (expensive)
 * - Use opacity transitions instead when possible
 * - Limit to 2-3 levels of elevation per view
 */

export type ShadowToken = typeof shadows;
