/**
 * AnfragenForm (trip request form) Test Suite
 *
 * Uses the real German copy from messages/de.json through a tiny next-intl mock.
 *
 * @see components/features/anfragen/AnfragenForm.tsx
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnfragenForm } from '@/components/features/anfragen/AnfragenForm';
import de from '@/messages/de.json';

jest.mock('next-intl', () => {
  const messages = require('@/messages/de.json');
  const resolve = (path: string): unknown =>
    path.split('.').reduce<unknown>((node, key) => (node as Record<string, unknown>)?.[key], messages);

  return {
    useLocale: () => 'de',
    useTranslations: (namespace: string) => {
      const t = (key: string, values: Record<string, string> = {}) =>
        String(resolve(`${namespace}.${key}`) ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
      t.raw = (key: string) => resolve(`${namespace}.${key}`);
      t.rich = (key: string, tags: Record<string, (chunks: string) => React.ReactNode>) => {
        const text = String(resolve(`${namespace}.${key}`));
        const match = text.match(/^(.*)<(\w+)>(.*)<\/\2>(.*)$/);
        if (!match) return text;
        const [, before, tag, inner, after] = match;
        return (
          <>
            {before}
            {tags[tag](inner)}
            {after}
          </>
        );
      };
      return t;
    },
  };
});

jest.mock('@/lib/i18n/routing', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('posthog-js', () => ({ capture: jest.fn() }));

const form = de.anfragenPage.form;
const success = de.anfragenPage.success;

const pressed = (name: string) => screen.getByRole('button', { name }).getAttribute('aria-pressed');

describe('AnfragenForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    window.history.replaceState({}, '', '/de/anfragen');
  });

  it('renders all fields with the mailing list unchecked by default', () => {
    render(<AnfragenForm />);

    expect(screen.getByLabelText(form.labels.firstName)).toHaveAttribute('autocomplete', 'given-name');
    expect(screen.getByLabelText(form.labels.email)).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByRole('group', { name: form.labels.months })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: form.labels.travelers })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: form.labels.level })).toBeInTheDocument();
    expect(screen.getByLabelText(form.labels.message)).toHaveAttribute('placeholder', form.placeholders.message);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('link', { name: form.legal.privacy })).toHaveAttribute('href', '/datenschutz');
  });

  it('makes "Ich bin flexibel" exclusive with the months', async () => {
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.click(screen.getByRole('button', { name: form.months['2027-03'] }));
    await user.click(screen.getByRole('button', { name: form.months['2027-04'] }));
    expect(pressed(form.months['2027-03'])).toBe('true');
    expect(pressed(form.months['2027-04'])).toBe('true');

    await user.click(screen.getByRole('button', { name: form.months.flexible }));
    expect(pressed(form.months.flexible)).toBe('true');
    expect(pressed(form.months['2027-03'])).toBe('false');
    expect(pressed(form.months['2027-04'])).toBe('false');

    await user.click(screen.getByRole('button', { name: form.months['2027-05'] }));
    expect(pressed(form.months.flexible)).toBe('false');
    expect(pressed(form.months['2027-05'])).toBe('true');
  });

  it('selects a single travelers value and toggles it off on re-click', async () => {
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(pressed('2')).toBe('false');
    expect(pressed('3')).toBe('true');

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(pressed('3')).toBe('false');
  });

  it('prefills months from ?monat=', async () => {
    window.history.replaceState({}, '', '/de/anfragen?monat=2027-04');
    render(<AnfragenForm />);

    await waitFor(() => expect(pressed(form.months['2027-04'])).toBe('true'));
  });

  it('focuses the first invalid field and does not submit', async () => {
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.click(screen.getByRole('button', { name: form.buttons.submit }));

    const firstName = screen.getByLabelText(form.labels.firstName);
    expect(firstName).toHaveFocus();
    expect(firstName).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText(form.errors.firstNameRequired)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();

    await user.type(firstName, 'Anna');
    await user.type(screen.getByLabelText(form.labels.email), 'anna@');
    await user.click(screen.getByRole('button', { name: form.buttons.submit }));

    expect(screen.getByLabelText(form.labels.email)).toHaveFocus();
    expect(screen.getByText(form.errors.emailInvalid)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits the payload and shows the success state with the first name', async () => {
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.type(screen.getByLabelText(form.labels.firstName), 'Anna Maria');
    await user.type(screen.getByLabelText(form.labels.email), 'anna@example.de');
    await user.click(screen.getByRole('button', { name: form.months['2027-04'] }));
    await user.click(screen.getByRole('button', { name: form.travelers['1'] }));
    await user.click(screen.getByRole('button', { name: form.levels.beginner.title }));
    await user.click(screen.getByRole('button', { name: form.buttons.submit }));

    await screen.findByRole('heading', { name: 'Danke, Anna!' });
    expect(screen.queryByText(success.mailingList)).not.toBeInTheDocument();

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe('/de/api/anfragen');
    expect(JSON.parse(init.body)).toEqual({
      firstName: 'Anna Maria',
      email: 'anna@example.de',
      months: ['2027-04'],
      travelers: '1',
      level: 'beginner',
      message: '',
      mailingList: false,
      company: '',
      locale: 'de',
      source: 'anfrage-page',
    });
  });

  it('shows the mailing list line only when the box was checked', async () => {
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.type(screen.getByLabelText(form.labels.firstName), 'Anna');
    await user.type(screen.getByLabelText(form.labels.email), 'anna@example.de');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: form.buttons.submit }));

    expect(await screen.findByText(success.mailingList)).toBeInTheDocument();
  });

  it('shows an error with a mail link when the request fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    const user = userEvent.setup();
    render(<AnfragenForm />);

    await user.type(screen.getByLabelText(form.labels.firstName), 'Anna');
    await user.type(screen.getByLabelText(form.labels.email), 'anna@example.de');
    await user.click(screen.getByRole('button', { name: form.buttons.submit }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Da ist etwas schiefgelaufen');
    expect(screen.getByRole('link', { name: 'julian@senderobiketrails.com' })).toHaveAttribute(
      'href',
      'mailto:julian@senderobiketrails.com'
    );
    expect(screen.getByRole('button', { name: form.buttons.submit })).toBeEnabled();
  });

  describe('level info overlay', () => {
    const trigger = () => screen.getByRole('button', { name: form.levelInfo.trigger });

    it('renders single-select level chips with nothing preselected', async () => {
      const user = userEvent.setup();
      render(<AnfragenForm />);

      for (const value of ['beginner', 'intermediate-light', 'intermediate'] as const) {
        expect(pressed(form.levels[value].title)).toBe('false');
      }
      expect(screen.getByText(form.hints.level)).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: form.levels.beginner.title }));
      await user.click(screen.getByRole('button', { name: form.levels.intermediate.title }));
      expect(pressed(form.levels.beginner.title)).toBe('false');
      expect(pressed(form.levels.intermediate.title)).toBe('true');
    });

    it('opens on click only, not on hover', async () => {
      const user = userEvent.setup();
      render(<AnfragenForm />);

      expect(trigger()).toHaveAttribute('aria-expanded', 'false');
      await user.hover(trigger());
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(trigger());
      expect(trigger()).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('dialog', { name: form.levelInfo.title })).toBeInTheDocument();
      for (const value of ['beginner', 'intermediate-light', 'intermediate'] as const) {
        expect(screen.getByText(form.levels[value].text)).toBeInTheDocument();
      }
    });

    it('closes on Escape and returns focus to the info button', async () => {
      const user = userEvent.setup();
      render(<AnfragenForm />);

      await user.click(trigger());
      await user.keyboard('{Escape}');

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(trigger()).toHaveFocus();
      expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes on the close button and on an outside click', async () => {
      const user = userEvent.setup();
      render(<AnfragenForm />);

      await user.click(trigger());
      await user.click(screen.getByRole('button', { name: form.levelInfo.close }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(trigger()).toHaveFocus();

      await user.click(trigger());
      await user.click(screen.getByRole('heading', { name: form.heading }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('selects the level chip when a level is picked in the overlay', async () => {
      const user = userEvent.setup();
      render(<AnfragenForm />);

      await user.click(trigger());
      const dialog = screen.getByRole('dialog');
      await user.click(
        Array.from(dialog.querySelectorAll('button')).find((b) =>
          b.textContent?.includes(form.levels['intermediate-light'].text)
        )!
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(pressed(form.levels['intermediate-light'].title)).toBe('true');
      expect(trigger()).toHaveFocus();
    });
  });
});
