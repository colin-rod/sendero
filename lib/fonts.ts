import { Aboreto } from 'next/font/google';

/**
 * Display font, exposed as `--font-aboreto` (Tailwind `font-aboreto`).
 * Applied on <html> by each top-level layout that renders the document
 * (app/[locale]/layout.tsx, app/login/layout.tsx).
 */
export const aboreto = Aboreto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-aboreto',
  display: 'swap',
});
