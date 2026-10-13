/**
 * E2E Tests: Header across every page and locale
 *
 * Regression coverage for the dark outline logo (Logo_Dark.svg) and the
 * "Reisen/Trips/Viajes" nav rename — confirms the header, logo, language switcher, and
 * MTB trip link all still render/behave correctly on every routed page,
 * in all three locales.
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
  '/agb',
  '/anfragen',
  '/mtb-reisen',
];

const mtbNavLabel: Record<(typeof locales)[number], string> = {
  en: 'Your Trip',
  de: 'Deine Reise',
  es: 'Tu Viaje',
};

test.describe('Header renders on every page and locale', () => {
  for (const locale of locales) {
    for (const route of routes) {
      test(`${locale}${route || '/'} shows the header with the dark logo`, async ({ page }) => {
        await page.goto(`/${locale}${route}`);

        const header = page.locator('header');
        await expect(header).toBeVisible();

        const logo = header.locator('img').first();
        await expect(logo).toHaveAttribute('src', /Logo_Dark\.svg/);

        await expect(header.getByLabel('Language selector')).toBeVisible();
      });
    }
  }
});

test.describe('Header background on scroll', () => {
  for (const route of ['', '/mtb-reisen']) {
    test(`de${route || '/'} is transparent at the top and white after scrolling`, async ({ page }) => {
      await page.goto(`/de${route}`);

      const header = page.locator('header');
      await expect(header).toHaveClass(/bg-transparent/);

      await page.evaluate(() => window.scrollTo(0, 400));
      await expect(header).toHaveClass(/bg-white/);
    });
  }
});

test.describe('Header logo link and "Deine Reise" link', () => {
  for (const locale of locales) {
    test(`logo links home and the trip link opens /mtb-reisen (${locale})`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`/${locale}/trails`);

      const header = page.locator('header');

      const logoLink = header.locator('a').first();
      await logoLink.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/?$`));

      await page.goto(`/${locale}/trails`);

      const tripLink = header.getByRole('link', { name: mtbNavLabel[locale] });
      await expect(tripLink).toBeVisible();
      await expect(tripLink).toHaveAttribute('href', `/${locale}/mtb-reisen`);
    });
  }

  test('the old 7-day URL redirects to /mtb-reisen', async ({ page }) => {
    await page.goto('/de/mtb-reisen-7-tage');
    await expect(page).toHaveURL(/\/de\/mtb-reisen$/);
  });
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
    await expect(header).toHaveClass(/bg-white/);
  });
});
