/**
 * Sendero Design System - Design Tokens
 *
 * Central export for all design tokens.
 * Import tokens from this file to ensure consistency across the application.
 *
 * @example
 * ```tsx
 * import { colors, typography, spacing } from '@/lib/design-tokens';
 *
 * const primaryColor = colors.primary[500];
 * const headingSize = typography.fontSize.h1.desktop;
 * const cardPadding = spacing.card.md;
 * ```
 */

export { colors, type ColorToken } from './colors';
export { typography, type TypographyToken } from './typography';
export { spacing, type SpacingToken } from './spacing';
export { shadows, type ShadowToken } from './shadows';
export { radius, type RadiusToken } from './radius';
export { animations, type AnimationToken } from './animations';

/**
 * Complete design token set
 */
export const designTokens = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  shadows: require('./shadows').shadows,
  radius: require('./radius').radius,
  animations: require('./animations').animations,
} as const;

export type DesignTokens = typeof designTokens;
