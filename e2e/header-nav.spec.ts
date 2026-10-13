/**
 * E2E Tests: Header across every page and locale
 *
 * Regression coverage for the dark outline logo (Logo_Dark.svg) — confirms the header, logo, and language switcher all
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
  '/agb',
  '/anfragen',
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

const requestNavLabel: Record<(typeof locales)[number], string> = {
  en: 'Inquire',
  de: 'Anfragen',
  es: 'Solicitar',
};

test.describe('Header "Anfragen" link', () => {
  for (const locale of locales) {
    test(`links to the trip request page (${locale})`, async ({ page, isMobile }) => {
      test.skip(isMobile, 'nav is hidden below md');
      await page.goto(`/${locale}/trails`);

      const link = page.locator('header').getByRole('link', { name: requestNavLabel[locale], exact: true });
      await expect(link).toHaveAttribute('href', `/${locale}/anfragen`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/anfragen$`));
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

test.describe('Header background on scroll', () => {
  for (const route of ['']) {
    test(`de${route || '/'} is transparent at the top and white after scrolling`, async ({ page }) => {
      await page.goto(`/de${route}`);

      const header = page.locator('header');
      await expect(header).toHaveClass(/bg-transparent/);

      await page.evaluate(() => window.scrollTo(0, 400));
      await expect(header).toHaveClass(/bg-white/);
    });
  }
});

test.describe('Overlay header on /anfragen', () => {
  test('is a translucent bar at the top and solid white after scrolling, dark logo throughout', async ({ page }) => {
    await page.goto('/de/anfragen');

    const header = page.locator('header');
    const logo = header.locator('img').first();
    await expect(header).toHaveClass(/bg-background\/60/);
    await expect(logo).toHaveAttribute('src', /Logo_Dark\.svg/);

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveClass(/bg-white/);
    await expect(logo).toHaveAttribute('src', /Logo_Dark\.svg/);
  });
});
