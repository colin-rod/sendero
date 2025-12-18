/**
 * Difficulty Badge Utility
 *
 * Maps trail difficulty levels to semantic Badge component variants.
 * Uses design system semantic colors instead of hardcoded Tailwind classes.
 *
 * This centralized utility ensures:
 * - Consistent difficulty badge styling across all trail pages
 * - Use of design system semantic color tokens
 * - Single source of truth for difficulty-to-color mappings
 * - Type-safe difficulty level handling
 */

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'default';

export interface DifficultyConfig {
  variant: BadgeVariant;
  className?: string; // For additional custom styling if needed
}

/**
 * Get Badge variant and styling for a difficulty level
 *
 * Maps difficulty levels to semantic Badge variants:
 * - Easy → success (green)
 * - Moderate → warning (amber)
 * - Challenging → error (red)
 * - Unknown → default (gray)
 *
 * @param level - The difficulty level of the trail
 * @returns Configuration object with Badge variant
 *
 * @example
 * const badgeProps = getDifficultyBadgeProps('Easy');
 * <Badge variant={badgeProps.variant}>Easy</Badge>
 */
export function getDifficultyBadgeProps(
  level: DifficultyLevel | string
): DifficultyConfig {
  switch (level) {
    case 'Easy':
      return { variant: 'success' }; // Uses success.100 bg / success.700 text
    case 'Moderate':
      return { variant: 'warning' }; // Uses warning.100 bg / warning.700 text
    case 'Challenging':
      return { variant: 'error' }; // Uses error.100 bg / error.700 text
    default:
      return { variant: 'default' }; // Uses muted colors
  }
}

/**
 * Get semantic color class for difficulty (for custom styling beyond Badge component)
 *
 * Useful when you need just the text color for difficulty-related elements
 * outside of the Badge component.
 *
 * @param level - The difficulty level of the trail
 * @returns Tailwind text color class
 *
 * @example
 * const colorClass = getDifficultyColor('Easy');
 * <span className={colorClass}>Easy difficulty</span>
 */
export function getDifficultyColor(level: DifficultyLevel | string): string {
  const config = getDifficultyBadgeProps(level);
  switch (config.variant) {
    case 'success':
      return 'text-success-700';
    case 'warning':
      return 'text-warning-700';
    case 'error':
      return 'text-error-700';
    default:
      return 'text-muted-foreground';
  }
}
