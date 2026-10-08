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
 * const headingSize = typography.fontSize.h1; // '3rem' (48px desktop) — responsive step-down lives in app/globals.css .text-h1
 * const cardPadding = spacing.card.md;
 * ```
 */

export { colors, landscape, type ColorToken, type LandscapeToken } from './colors';
export { typography, type TypographyToken } from './typography';
export { spacing, type SpacingToken } from './spacing';
export { shadows, type ShadowToken } from './shadows';
export { radius, type RadiusToken } from './radius';
export { animations, type AnimationToken } from './animations';
export { glyphs, type GlyphToken } from './glyphs';

/**
 * Complete design token set
 */
export const designTokens = {
  colors: require('./colors').colors,
  landscape: require('./colors').landscape,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  shadows: require('./shadows').shadows,
  radius: require('./radius').radius,
  animations: require('./animations').animations,
  glyphs: require('./glyphs').glyphs,
} as const;

export type DesignTokens = typeof designTokens;
