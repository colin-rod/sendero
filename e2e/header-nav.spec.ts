/**
 * E2E Tests: Header across every page and locale
 *
 * Regression coverage for the outline-logo swap (Logo_Dark.svg /
 * Logo_Light.svg) and the "Mountain Bike Urlaub/Holidays/Vacaciones en MTB"
 * nav rename — confirms the header, logo variant, language switcher, and
 * MTB trip dropdown all still render/behave correctly on every routed page,
 * in all three locales.
 */

import { test, expect } from '@playwright/test';

const locales = ['en', 'de', 'es'] as const;

const routes: { path: string; logoVariant: 'dark' | 'white' }[] = [
  { path: '', logoVariant: 'dark' },
  { path: '/trails', logoVariant: 'dark' },
  { path: '/trails/sendero-del-tigre', logoVariant: 'dark' },
  { path: '/contact', logoVariant: 'dark' },
  { path: '/thank-you', logoVariant: 'dark' },
  { path: '/datenschutz', logoVariant: 'dark' },
  { path: '/faq', logoVariant: 'dark' },
  { path: '/about', logoVariant: 'dark' },
  { path: '/impressum', logoVariant: 'dark' },
  { path: '/mtb-reisen', logoVariant: 'white' },
  { path: '/mtb-reisen-7-tage', logoVariant: 'white' },
];

const mtbNavLabel: Record<(typeof locales)[number], string> = {
  en: 'Mountain Bike Holidays',
  de: 'Mountain Bike Urlaub',
  es: 'Vacaciones en MTB',
};

test.describe('Header renders on every page and locale', () => {
  for (const locale of locales) {
    for (const route of routes) {
      test(`${locale}${route.path || '/'} shows the header with the ${route.logoVariant} logo`, async ({
        page,
      }) => {
        await page.goto(`/${locale}${route.path}`);

        const header = page.locator('header');
        await expect(header).toBeVisible();

        const expectedLogo = route.logoVariant === 'white' ? 'Logo_Light.svg' : 'Logo_Dark.svg';
        const logo = header.locator('img').first();
        await expect(logo).toHaveAttribute('src', new RegExp(expectedLogo.replace('.', '\\.')));

        await expect(header.getByLabel('Language selector')).toBeVisible();
      });
    }
  }
});

test.describe('Header logo link and MTB nav dropdown', () => {
  for (const locale of locales) {
    test(`logo links home and the MTB dropdown works (${locale})`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`/${locale}/trails`);

      const header = page.locator('header');

      const logoLink = header.locator('a').first();
      await logoLink.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));

      await page.goto(`/${locale}/trails`);

      const navButton = header.getByRole('button', { name: mtbNavLabel[locale] });
      await expect(navButton).toBeVisible();
      await navButton.click();

      const menuItems = header.getByRole('menuitem');
      await expect(menuItems).toHaveCount(2);
      await expect(menuItems.nth(0)).toHaveAttribute('href', `/${locale}/mtb-reisen`);
      await expect(menuItems.nth(1)).toHaveAttribute('href', `/${locale}/mtb-reisen-7-tage`);
    });
  }
});

test.describe('Header scroll behavior', () => {
  test('toggles a solid background on scroll (light-background page)', async ({ page }) => {
    await page.goto('/en/trails');
    const header = page.locator('header');
    await expect(header).not.toHaveClass(/bg-white/);

    await page.mouse.wheel(0, 400);
    await expect(header).toHaveClass(/bg-white/);
  });

  test('toggles a solid background on scroll (dark-hero page)', async ({ page }) => {
    await page.goto('/en/mtb-reisen');
    const header = page.locator('header');
    await expect(header).not.toHaveClass(/bg-white/);

    await page.mouse.wheel(0, 400);
    // NOTE: on white-logo hero pages the header background still turns solid
    // white on scroll while the logo/nav text stay white-styled — this is
    // pre-existing Header.tsx behavior (the `scrolled` state only toggles
    // the background, not `logoVariant`), not introduced by the logo swap.
    // Recorded here as a known contrast issue rather than "fixed" — out of
    // scope for this change.
    await expect(header).toHaveClass(/bg-white/);
  });
});
