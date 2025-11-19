/**
 * Component Tests: WaitlistForm
 *
 * Tests for the waitlist signup form component
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WaitlistForm } from '@/components/features/waitlist/WaitlistForm';
import { useRouter } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('WaitlistForm', () => {
  const mockPush = jest.fn();
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<WaitlistForm />);

      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByText(/preferred tour duration/i)).toBeInTheDocument();
      expect(screen.getByText(/what interests you/i)).toBeInTheDocument();
      expect(screen.getByText(/fitness level/i)).toBeInTheDocument();
      expect(screen.getByText(/when are you planning to travel/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /join the waitlist/i })).toBeInTheDocument();
    });

    it('should render all tour duration options', () => {
      render(<WaitlistForm />);

      expect(screen.getByLabelText(/1 day/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/weekend/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/1 week/i)).toBeInTheDocument();
    });

    it('should render all interest type checkboxes', () => {
      render(<WaitlistForm />);

      expect(screen.getByLabelText(/^hiking$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^biking$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-bike/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/women-only/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/coffee farm/i)).toBeInTheDocument();
    });

    it('should render all fitness level options', () => {
      render(<WaitlistForm />);

      expect(screen.getByLabelText(/beginner/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/moderate/i)).toBeInTheDocument();
    });

    it('should render all travel timeline options', () => {
      render(<WaitlistForm />);

      expect(screen.getByLabelText(/next 3 months/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/next 6 months/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/just exploring/i)).toBeInTheDocument();
    });

    it('should render privacy message', () => {
      render(<WaitlistForm />);

      expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
    });
  });

  describe('Form interactions', () => {
    it('should update email input value', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should allow selecting tour duration', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const weekendOption = screen.getByLabelText(/weekend/i);
      await user.click(weekendOption);

      expect(weekendOption).toBeChecked();
    });

    it('should allow selecting multiple interest types', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const hikingCheckbox = screen.getByLabelText(/^hiking$/i);
      const bikingCheckbox = screen.getByLabelText(/^biking$/i);

      await user.click(hikingCheckbox);
      await user.click(bikingCheckbox);

      expect(hikingCheckbox).toBeChecked();
      expect(bikingCheckbox).toBeChecked();
    });

    it('should allow deselecting interest types', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const hikingCheckbox = screen.getByLabelText(/^hiking$/i);

      await user.click(hikingCheckbox);
      expect(hikingCheckbox).toBeChecked();

      await user.click(hikingCheckbox);
      expect(hikingCheckbox).not.toBeChecked();
    });

    it('should allow selecting all interest types', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const checkboxes = [
        screen.getByLabelText(/^hiking$/i),
        screen.getByLabelText(/^biking$/i),
        screen.getByLabelText(/e-bike/i),
        screen.getByLabelText(/women-only/i),
        screen.getByLabelText(/coffee farm/i),
      ];

      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });

    it('should allow selecting fitness level', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const beginnerOption = screen.getByLabelText(/beginner/i);
      await user.click(beginnerOption);

      expect(beginnerOption).toBeChecked();
    });

    it('should allow changing fitness level selection', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const beginnerOption = screen.getByLabelText(/beginner/i);
      const moderateOption = screen.getByLabelText(/moderate/i);

      await user.click(beginnerOption);
      expect(beginnerOption).toBeChecked();

      await user.click(moderateOption);
      expect(moderateOption).toBeChecked();
      expect(beginnerOption).not.toBeChecked();
    });

    it('should allow selecting travel timeline', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const next3MonthsOption = screen.getByLabelText(/next 3 months/i);
      await user.click(next3MonthsOption);

      expect(next3MonthsOption).toBeChecked();
    });
  });

  describe('Form validation', () => {
    it('should show error when submitting without email', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      // Type an email that passes HTML5 validation but fails our custom validation
      await user.type(emailInput, 'invalid@email');

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should show error when submitting without tour duration', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please select a tour duration')).toBeInTheDocument();
      });
    });

    it('should show error when submitting without interest types', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const weekendOption = screen.getByLabelText(/weekend/i);
      await user.click(weekendOption);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please select at least one interest')).toBeInTheDocument();
      });
    });

    it('should show error when submitting without fitness level', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const weekendOption = screen.getByLabelText(/weekend/i);
      await user.click(weekendOption);

      const hikingCheckbox = screen.getByLabelText(/^hiking$/i);
      await user.click(hikingCheckbox);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please select your fitness level')).toBeInTheDocument();
      });
    });

    it('should show error when submitting without travel timeline', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const weekendOption = screen.getByLabelText(/weekend/i);
      await user.click(weekendOption);

      const hikingCheckbox = screen.getByLabelText(/^hiking$/i);
      await user.click(hikingCheckbox);

      const beginnerOption = screen.getByLabelText(/beginner/i);
      await user.click(beginnerOption);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please select your travel timeline')).toBeInTheDocument();
      });
    });

    it('should clear errors when user starts correcting', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    const fillOutForm = async (user: ReturnType<typeof userEvent.setup>) => {
      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const weekendOption = screen.getByLabelText(/weekend/i);
      await user.click(weekendOption);

      const hikingCheckbox = screen.getByLabelText(/^hiking$/i);
      const bikingCheckbox = screen.getByLabelText(/^biking$/i);
      await user.click(hikingCheckbox);
      await user.click(bikingCheckbox);

      const beginnerOption = screen.getByLabelText(/beginner/i);
      await user.click(beginnerOption);

      const next3MonthsOption = screen.getByLabelText(/next 3 months/i);
      await user.click(next3MonthsOption);
    };

    it('should submit form data to API', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { message: 'Success' } }),
      });

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            tourDuration: 'weekend',
            interestTypes: ['hike', 'bike'],
            fitnessLevel: 'beginner',
            travelTimeline: 'next_3_months',
          }),
        });
      });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ success: true, data: { message: 'Success' } }),
                }),
              100
            )
          )
      );

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      expect(screen.getByRole('button', { name: /joining/i })).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should redirect to thank you page on success', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { message: 'Success' } }),
      });

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/thank-you');
      });
    });

    it('should handle duplicate email error (409)', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({ success: false, error: 'Email already exists' }),
      });

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/this email is already on the waitlist/i)).toBeInTheDocument();
      });
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should handle server errors (500)', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ success: false, error: 'Server error' }),
      });

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/server error/i)).toBeInTheDocument();
      });
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should restore button state after error', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<WaitlistForm />);
      await fillOutForm(user);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      expect(screen.getByRole('button', { name: /join the waitlist/i })).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<WaitlistForm />);

      const form = screen.getByRole('button', { name: /join the waitlist/i }).closest('form');
      expect(form).toBeInTheDocument();
    });

    it('should have required fields marked with asterisk', () => {
      render(<WaitlistForm />);

      // Check that required fields are marked with * in the label
      expect(screen.getByText(/email address \*/i)).toBeInTheDocument();
      expect(screen.getByText(/preferred tour duration \*/i)).toBeInTheDocument();
      expect(screen.getByText(/fitness level \*/i)).toBeInTheDocument();
    });

    it('should associate error messages with fields', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);

      const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
      await user.click(submitButton);

      await waitFor(() => {
        const emailInput = screen.getByLabelText(/email address/i);
        const errorMessage = screen.getByText('Email is required');
        expect(errorMessage).toBeInTheDocument();
        expect(emailInput.getAttribute('aria-invalid')).toBe('true');
      });
    });
  });
});
