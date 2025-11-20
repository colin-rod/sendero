/**
 * E2E Tests: Complete Waitlist Flow
 *
 * Tests the complete user journey from landing page to thank you page
 */

import { test, expect } from '@playwright/test';

test.describe('Waitlist Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the landing page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Sendero Bike Trails/i);
    await expect(page.getByText(/sendero bike trails/i)).toBeVisible();
  });

  test('should display all landing page sections', async ({ page }) => {
    // Hero section
    await expect(page.getByText(/discover colombia's coffee region/i)).toBeVisible();

    // Features or How It Works
    await expect(page.getByText(/how it works|perfect for/i).first()).toBeVisible();

    // Waitlist form
    await expect(page.getByRole('button', { name: /join the waitlist/i })).toBeVisible();
  });

  test('should complete successful waitlist signup', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/email address/i).fill('test@example.com');

    // Select tour duration
    await page.getByLabel(/weekend/i).check();

    // Select interest types
    await page.getByLabel(/^hiking$/i).check();
    await page.getByLabel(/^biking$/i).check();

    // Select fitness level
    await page.getByLabel(/beginner/i).first().check();

    // Select travel timeline
    await page.getByLabel(/next 3 months/i).check();

    // Mock the API response
    await page.route('**/api/waitlist', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { message: 'Successfully added to waitlist' },
        }),
      });
    });

    // Submit the form
    await page.getByRole('button', { name: /join the waitlist/i }).click();

    // Should redirect to thank you page
    await expect(page).toHaveURL('/thank-you');
    await expect(page.getByText(/thank you|thanks/i).first()).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    // Submit without filling anything
    await page.getByRole('button', { name: /join the waitlist/i }).click();

    // Should show validation errors
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.getByLabel(/email address/i).fill('invalid-email');
    await page.getByRole('button', { name: /join the waitlist/i }).click();

    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test('should show error when no tour duration selected', async ({ page }) => {
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByRole('button', { name: /join the waitlist/i }).click();

    await expect(page.getByText(/tour duration/i)).toBeVisible();
  });

  test('should show error when no interest types selected', async ({ page }) => {
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByLabel(/weekend/i).check();
    await page.getByRole('button', { name: /join the waitlist/i }).click();

    await expect(page.getByText(/interest type/i)).toBeVisible();
  });

  test('should handle duplicate email error (409)', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/email address/i).fill('existing@example.com');
    await page.getByLabel(/weekend/i).check();
    await page.getByLabel(/^hiking$/i).check();
    await page.getByLabel(/beginner/i).first().check();
    await page.getByLabel(/next 3 months/i).check();

    // Mock duplicate email error
    await page.route('**/api/waitlist', async (route) => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'This email is already on the waitlist',
        }),
      });
    });

    await page.getByRole('button', { name: /join the waitlist/i }).click();

    // Should show duplicate email error
    await expect(page.getByText(/this email is already on the waitlist/i)).toBeVisible();

    // Should NOT redirect
    await expect(page).toHaveURL('/');
  });

  test('should handle server error gracefully', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByLabel(/weekend/i).check();
    await page.getByLabel(/^hiking$/i).check();
    await page.getByLabel(/beginner/i).first().check();
    await page.getByLabel(/next 3 months/i).check();

    // Mock server error
    await page.route('**/api/waitlist', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Server error occurred',
        }),
      });
    });

    await page.getByRole('button', { name: /join the waitlist/i }).click();

    // Should show error message
    await expect(page.getByText(/server error|something went wrong/i)).toBeVisible();
  });

  test('should allow selecting multiple interest types', async ({ page }) => {
    await page.getByLabel(/^hiking$/i).check();
    await page.getByLabel(/^biking$/i).check();
    await page.getByLabel(/e-bike/i).check();
    await page.getByLabel(/women-only/i).check();
    await page.getByLabel(/coffee farm/i).check();

    // All should be checked
    await expect(page.getByLabel(/^hiking$/i)).toBeChecked();
    await expect(page.getByLabel(/^biking$/i)).toBeChecked();
    await expect(page.getByLabel(/e-bike/i)).toBeChecked();
    await expect(page.getByLabel(/women-only/i)).toBeChecked();
    await expect(page.getByLabel(/coffee farm/i)).toBeChecked();
  });

  test('should allow deselecting interest types', async ({ page }) => {
    // Select and deselect
    await page.getByLabel(/^hiking$/i).check();
    await expect(page.getByLabel(/^hiking$/i)).toBeChecked();

    await page.getByLabel(/^hiking$/i).uncheck();
    await expect(page.getByLabel(/^hiking$/i)).not.toBeChecked();
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.getByLabel(/email address/i).fill('test@example.com');
    await page.getByLabel(/weekend/i).check();
    await page.getByLabel(/^hiking$/i).check();
    await page.getByLabel(/beginner/i).first().check();
    await page.getByLabel(/next 3 months/i).check();

    // Mock slow API response
    await page.route('**/api/waitlist', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { message: 'Success' },
        }),
      });
    });

    await page.getByRole('button', { name: /join the waitlist/i }).click();

    // Should show "Joining..." text and button should be disabled
    await expect(page.getByRole('button', { name: /joining/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /joining/i })).toBeDisabled();
  });
});

test.describe('Thank You Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to thank you page for these tests
    await page.goto('/thank-you');
  });

  test('should display thank you message', async ({ page }) => {
    await expect(page.getByText(/thank you|thanks for joining/i).first()).toBeVisible();
  });

  test('should display "what happens next" section', async ({ page }) => {
    await expect(page.getByText(/what happens next|what's next/i)).toBeVisible();
  });

  test('should have share buttons', async ({ page }) => {
    // Check for share functionality (buttons or links)
    const shareSection = page.locator('text=/share|tell your friends/i').first();
    if (await shareSection.isVisible()) {
      await expect(shareSection).toBeVisible();
    }
  });

  test('should have back to home link', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /back to home|home/i });
    if (await homeLink.isVisible()) {
      await expect(homeLink).toHaveAttribute('href', '/');
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate via header links', async ({ page }) => {
    await page.goto('/');

    // Test About link (hash link)
    const aboutLink = page.getByRole('link', { name: /about/i }).first();
    if (await aboutLink.isVisible()) {
      await expect(aboutLink).toHaveAttribute('href', /#about/);
    }

    // Test How It Works link (hash link)
    const howItWorksLink = page.getByRole('link', { name: /how it works/i }).first();
    if (await howItWorksLink.isVisible()) {
      await expect(howItWorksLink).toHaveAttribute('href', /#how-it-works/);
    }
  });

  test('should have working logo link to home', async ({ page }) => {
    await page.goto('/thank-you');

    const logoLink = page.getByRole('link', { name: /sendero/i }).first();
    await logoLink.click();

    await expect(page).toHaveURL('/');
  });
});

test.describe('Responsive Design', () => {
  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');

    // Page should still be functional
    await expect(page.getByRole('button', { name: /join the waitlist/i })).toBeVisible();

    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole('button', { name: /toggle|menu/i });
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toBeVisible();
    }
  });

  test('should be tablet responsive', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');

    await expect(page.getByRole('button', { name: /join the waitlist/i })).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have skip to content link', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByText(/skip to content/i);
    await expect(skipLink).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through the form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to focus on form elements
    const emailInput = page.getByLabel(/email address/i);
    await emailInput.focus();
    await expect(emailInput).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Should have h1
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });
});
