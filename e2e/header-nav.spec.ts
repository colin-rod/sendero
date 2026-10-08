/**
 * E2E Tests: Header across every page and locale
 *
 * Regression coverage for the outline-logo swap (Logo_Dark.svg /
 * Logo_Light.svg) — confirms the header, logo, and language switcher all
 * still render correctly on every routed page, in all three locales.
 */

import { test, expect } from '@playwright/test';

const locales = ['en', 'de', 'es'] as const;

const routes = [
  '',
  '/trails',
  '/trails/sendero-del-tigre',
  '/contact',
  '/thank-you',
  '/datenschutz',
  '/faq',
  '/about',
  '/impressum',
];

test.describe('Header renders on every page and locale', () => {
  for (const locale of locales) {
    for (const path of routes) {
      test(`${locale}${path || '/'} shows the header with the dark logo`, async ({ page }) => {
        await page.goto(`/${locale}${path}`);

        const header = page.locator('header');
        await expect(header).toBeVisible();

        const logo = header.locator('img').first();
        await expect(logo).toHaveAttribute('src', /Logo_Dark\.svg/);

        await expect(header.getByLabel('Language selector')).toBeVisible();
      });
    }
  }
});

test.describe('Header logo link', () => {
  for (const locale of locales) {
    test(`logo links home (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}/trails`);

      const header = page.locator('header');
      const logoLink = header.locator('a').first();
      await logoLink.click();

      await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));
    });
  }
});

test.describe('Header scroll behavior', () => {
  test('toggles a solid background on scroll', async ({ page }) => {
    await page.goto('/en/trails');
    const header = page.locator('header');
    await expect(header).not.toHaveClass(/bg-white/);

    await page.mouse.wheel(0, 400);
    await expect(header).toHaveClass(/bg-white/);
  });
});
