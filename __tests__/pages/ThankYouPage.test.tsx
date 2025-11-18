/**
 * Page Tests: Thank You Page
 *
 * Tests for the thank you page after waitlist signup
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThankYouPage from '@/app/thank-you/page';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock child components
jest.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('ThankYouPage', () => {
  beforeEach(() => {
    render(<ThankYouPage />);
  });

  describe('Page structure', () => {
    it('should render header', () => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should render footer', () => {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should have main content area', () => {
      const main = document.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Success message', () => {
    it('should render success heading', () => {
      expect(screen.getByText(/you're on the list!/i)).toBeInTheDocument();
    });

    it('should render thank you message', () => {
      expect(
        screen.getByText(/thank you for joining the sendero waitlist/i)
      ).toBeInTheDocument();
    });

    it('should display success icon', () => {
      const checkIcon = document.querySelector('svg');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe('What happens next section', () => {
    it('should render section heading', () => {
      expect(screen.getByText(/what happens next\?/i)).toBeInTheDocument();
    });

    it('should list next steps', () => {
      expect(screen.getByText(/check your inbox/i)).toBeInTheDocument();
      expect(screen.getByText(/you'll receive a confirmation email shortly/i)).toBeInTheDocument();

      expect(screen.getByText(/stay tuned/i)).toBeInTheDocument();
      expect(screen.getByText(/we'll keep you updated on tour dates/i)).toBeInTheDocument();

      expect(screen.getByText(/be among the first/i)).toBeInTheDocument();
      expect(screen.getByText(/waitlist members get priority booking access/i)).toBeInTheDocument();
    });
  });

  describe('Share section', () => {
    it('should render share heading', () => {
      expect(screen.getByText(/share the adventure/i)).toBeInTheDocument();
    });

    it('should render share description', () => {
      expect(screen.getByText(/know someone who'd love this/i)).toBeInTheDocument();
    });

    it('should have copy link button', () => {
      expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument();
    });

    it('should have WhatsApp share link', () => {
      const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
      expect(whatsappLink).toBeInTheDocument();
      expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
    });

    it('should have Twitter/X share link', () => {
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', expect.stringContaining('twitter.com'));
    });

    it('should have Facebook share link', () => {
      const facebookLink = screen.getByRole('link', { name: /facebook/i });
      expect(facebookLink).toBeInTheDocument();
      expect(facebookLink).toHaveAttribute('href', expect.stringContaining('facebook.com'));
    });

    it('should have target="_blank" on share links', () => {
      const shareLinks = screen.getAllByRole('link', { name: /whatsapp|twitter|facebook/i });
      shareLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Copy link functionality', () => {
    it('should copy link to clipboard when clicked', async () => {
      const user = userEvent.setup();
      const copyButton = screen.getByRole('button', { name: /copy link/i });

      await user.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('http')
      );
    });

    it('should show "Copied!" feedback after copying', async () => {
      const user = userEvent.setup();
      const copyButton = screen.getByRole('button', { name: /copy link/i });

      await user.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText(/copied!/i)).toBeInTheDocument();
      });
    });

    it('should revert to "Copy Link" after 2 seconds', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });

      const copyButton = screen.getByRole('button', { name: /copy link/i });
      await user.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText(/copied!/i)).toBeInTheDocument();
      });

      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(screen.getByText(/copy link/i)).toBeInTheDocument();
      });

      jest.useRealTimers();
    });
  });

  describe('Back to home button', () => {
    it('should render back to home button', () => {
      expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
    });

    it('should link to homepage', () => {
      const backLink = screen.getByRole('button', { name: /back to home/i }).closest('a');
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  describe('Content hierarchy', () => {
    it('should have proper heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Accessibility', () => {
    it('should have main landmark', () => {
      const main = document.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('should have proper link attributes for external links', () => {
      const externalLinks = screen.getAllByRole('link', { name: /whatsapp|twitter|facebook/i });

      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have interactive elements keyboard accessible', () => {
      const copyButton = screen.getByRole('button', { name: /copy link/i });
      expect(copyButton).not.toBeDisabled();

      const backButton = screen.getByRole('button', { name: /back to home/i });
      expect(backButton).not.toBeDisabled();
    });
  });

  describe('Share URLs', () => {
    it('should encode share text and URL correctly', () => {
      const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
      expect(whatsappLink.getAttribute('href')).toMatch(/text=.*Sendero/);
    });

    it('should include site URL in share links', () => {
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      expect(twitterLink.getAttribute('href')).toMatch(/url=/);
    });
  });
});
