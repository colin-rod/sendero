import { test, expect } from '@playwright/test';
import de from '../messages/de.json';
import en from '../messages/en.json';
import es from '../messages/es.json';

/**
 * Trip request page (/anfragen): content per locale, level info overlay and form submit.
 * The API is mocked — no emails or sheet rows are created.
 */

const pages = { de: de.anfragenPage, en: en.anfragenPage, es: es.anfragenPage };

test.describe('Anfragen page', () => {
  for (const [locale, copy] of Object.entries(pages)) {
    test(`renders hero, intro, form and gallery (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}/anfragen`);

      await expect(page.getByRole('heading', { level: 1, name: copy.hero.title })).toBeVisible();
      await expect(page.getByRole('heading', { name: copy.intro.title })).toBeVisible();
      await expect(page.getByRole('heading', { name: copy.form.heading })).toBeVisible();
      await expect(page.getByRole('heading', { name: copy.gallery.heading })).toBeVisible();
      await expect(page.getByPlaceholder(copy.form.placeholders.firstName)).toBeVisible();
    });
  }

  test('level info overlay opens on click, picks a level and closes', async ({ page }) => {
    const form = de.anfragenPage.form;
    await page.goto('/de/anfragen');

    const trigger = page.getByRole('button', { name: form.levelInfo.trigger });
    await trigger.scrollIntoViewIfNeeded();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    const dialog = page.getByRole('dialog', { name: form.levelInfo.title });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await dialog.getByRole('button', { name: new RegExp(form.levels['intermediate-light'].title) }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole('button', { name: form.levels['intermediate-light'].title, exact: true })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  test('shows validation errors and submits a valid request', async ({ page }) => {
    const form = de.anfragenPage.form;
    let payload: Record<string, unknown> | null = null;
    await page.route('**/api/anfragen', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });

    await page.goto('/de/anfragen');
    await page.getByRole('button', { name: form.buttons.submit }).click();
    await expect(page.getByText(form.errors.firstNameRequired)).toBeVisible();

    await page.getByLabel(form.labels.firstName).fill('Anna');
    await page.getByLabel(form.labels.email).fill('anna@example.de');
    await page.getByRole('button', { name: form.months['2027-04'], exact: true }).click();
    await page.getByRole('button', { name: form.buttons.submit }).click();

    await expect(page.getByRole('heading', { name: 'Danke, Anna!' })).toBeVisible();
    expect(payload).toMatchObject({ firstName: 'Anna', email: 'anna@example.de', months: ['2027-04'], locale: 'de' });
  });
});
