/**
 * Sendero Design System - Layout Tokens
 *
 * One frame and one reading column for the whole site:
 * - Every section, the header and the footer sit in the same frame
 *   (`<Container>`), so content lines up with the logo.
 * - Every paragraph runs to the same text measure (`max-w-text`);
 *   headings get a slightly wider one (`max-w-heading`).
 */

import { spacing } from './spacing';

export const layout = {
  /** Max width of the site frame (`<Container>`, header, footer) */
  frame: '80rem', // 1280px

  /** Horizontal frame padding, from Figma `padding-left-right` */
  gutter: spacing.padding.leftRight, // 24/40/64px

  /** Max line lengths for copy */
  measure: {
    text: '42rem', // 672px - paragraphs, intros, hero/CTA copy (`max-w-text`)
    heading: '56rem', // 896px - h1/h2 and long eyebrows (`max-w-heading`)
  },
} as const;

export type LayoutToken = typeof layout;
