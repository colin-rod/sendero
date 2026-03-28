import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BottomEmailCapture from '@/components/BottomEmailCapture';

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'hero.emailCapture': {
        buttonLearnMore: 'LEARN MORE',
        buttonSubmit: 'SUBMIT',
        buttonSent: 'SENT',
        placeholder: 'Enter your email',
        helperText: 'No spam, just updates when we launch',
        successMessage: 'Thanks! We will keep you updated.',
      },
      waitlist: {
        joinButton: 'JOIN',
      },
      validation: {
        emailInvalid: 'Please enter a valid email address',
        emailDuplicate: 'This email is already on the waitlist',
        generalError: 'Something went wrong. Please try again.',
        networkError: 'Network error. Please check your connection and try again.',
      },
    };

    return translations[namespace]?.[key] || key;
  },
  useLocale: () => 'en',
}));

describe('BottomEmailCapture', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses a high-contrast join button style for better visibility on image backgrounds', () => {
    render(<BottomEmailCapture />);

    const joinButton = screen.getByRole('button', { name: 'JOIN' });
    expect(joinButton).toHaveClass('bg-primary-500', 'text-accent-400');
  });

  it('keeps email input and submit action in the same row after expanding', async () => {
    const user = userEvent.setup();
    render(<BottomEmailCapture />);

    await user.click(screen.getByRole('button', { name: 'JOIN' }));

    const input = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByRole('button', { name: 'SUBMIT' });
    const row = screen.getByTestId('bottom-email-capture-row');

    expect(row).toContainElement(input);
    expect(row).toContainElement(submitButton);
    expect(row).toHaveClass('items-center');
  });

  it('shows success notification and replaces submit action with confirmation state after successful submit', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<BottomEmailCapture />);

    await user.click(screen.getByRole('button', { name: 'JOIN' }));
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'SUBMIT' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Thanks! We will keep you updated.')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-email-confirmation')).toHaveTextContent('SENT');
    expect(screen.queryByRole('button', { name: 'SUBMIT' })).not.toBeInTheDocument();
  });
});
