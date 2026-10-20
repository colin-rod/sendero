/**
 * Sendero Design System - Layout Tokens
 *
 * One frame and one reading column for the whole site:
 * - Every section, the header and the footer sit in the same frame
 *   (`<Container>`), so content lines up with the logo.
 * - The frame splits into two halves with one gap (`gap-8`). Every
 *   paragraph runs to one half (`max-w-text`), so single-column copy ends
 *   where the first column of a 2-column grid ends. Headings get a wider
 *   measure (`max-w-heading`).
 *
 * `max-w-text` is defined in app/globals.css (it is fluid: one half of the
 * frame from lg up, measured with container query units); keep the values
 * there in sync with this file.
 */

import { spacing } from './spacing';

export const layout = {
  /** Max width of the site frame (`<Container>`, header, footer) */
  frame: '80rem', // 1280px

  /** Horizontal frame padding, from Figma `padding-left-right` */
  gutter: spacing.padding.leftRight, // 24/40/64px

  /** Gap between grid columns (`gap-8`) */
  gridGap: '2rem', // 32px

  /** Max line lengths for copy */
  measure: {
    text: '35rem', // 560px = one half of the frame - paragraphs, intros, hero/CTA copy (`max-w-text`)
    heading: '56rem', // 896px - h1/h2 and long eyebrows (`max-w-heading`)
  },
} as const;

export type LayoutToken = typeof layout;
