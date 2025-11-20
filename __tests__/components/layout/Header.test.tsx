/**
 * Component Tests: Header
 *
 * Tests for the Header layout component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaBars: () => <div data-testid="bars-icon" />,
  FaTimes: () => <div data-testid="times-icon" />,
}));

describe('Header', () => {
  describe('Rendering', () => {
    it('should render the header element', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should render the Sendero Bike Trails logo/brand', () => {
      render(<Header />);
      expect(screen.getByText('Sendero Bike Trails')).toBeInTheDocument();
    });

    it('should render desktop navigation links', () => {
      render(<Header />);
      const aboutLinks = screen.getAllByText(/about/i);
      const howItWorksLinks = screen.getAllByText(/how it works/i);
      expect(aboutLinks.length).toBeGreaterThan(0);
      expect(howItWorksLinks.length).toBeGreaterThan(0);
    });

    it('should render skip to content link', () => {
      render(<Header />);
      expect(screen.getByText(/skip to content/i)).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      render(<Header />);
      const button = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(button).toBeInTheDocument();
    });

    it('should not show mobile menu by default', () => {
      render(<Header />);
      const mobileMenu = screen.queryByRole('dialog');
      expect(mobileMenu).not.toBeInTheDocument();
    });
  });

  describe('Logo/Brand link', () => {
    it('should link to home page', () => {
      render(<Header />);
      const logoLink = screen.getByRole('link', { name: /sendero bike trails home/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should have accessible label', () => {
      render(<Header />);
      const logoLink = screen.getByRole('link', { name: /sendero bike trails home/i });
      expect(logoLink).toHaveAttribute('aria-label', 'Sendero Bike Trails home');
    });
  });

  describe('Desktop navigation', () => {
    it('should render About link', () => {
      render(<Header />);
      const aboutLink = screen.getAllByText(/about/i)[0].closest('a');
      expect(aboutLink).toHaveAttribute('href', '#about');
    });

    it('should render How It Works link', () => {
      render(<Header />);
      const howItWorksLink = screen.getAllByText(/how it works/i)[0].closest('a');
      expect(howItWorksLink).toHaveAttribute('href', '#how-it-works');
    });

    it('should have main navigation landmark', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Mobile menu toggle', () => {
    it('should show mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggleButton);

      const mobileMenu = screen.getByRole('dialog', { name: /mobile navigation/i });
      expect(mobileMenu).toBeInTheDocument();
    });

    it('should hide mobile menu when button is clicked again', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      // Open menu
      await user.click(toggleButton);
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Close menu
      await user.click(toggleButton);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should update aria-expanded attribute', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should show hamburger icon when menu is closed', () => {
      render(<Header />);
      expect(screen.getByTestId('bars-icon')).toBeInTheDocument();
    });

    it('should show close icon when menu is open', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggleButton);

      expect(screen.getByTestId('times-icon')).toBeInTheDocument();
    });
  });

  describe('Mobile menu', () => {
    it('should render mobile navigation links when open', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggleButton);

      const mobileMenu = screen.getByRole('dialog');
      expect(mobileMenu).toBeInTheDocument();

      // Check for links within the mobile menu
      const links = screen.getAllByText(/about|how it works/i);
      expect(links.length).toBeGreaterThan(2); // Desktop + Mobile links
    });

    it('should close menu when mobile link is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // Open menu
      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggleButton);

      // Click a mobile menu link
      const mobileMenu = screen.getByRole('dialog');
      const aboutLink = mobileMenu.querySelector('a[href="#about"]');
      if (aboutLink) {
        await user.click(aboutLink);
      }

      // Menu should be closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should have mobile navigation role', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggleButton);

      const mobileNav = screen.getByRole('dialog', { name: /mobile navigation/i });
      expect(mobileNav).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have skip to content link with correct href', () => {
      render(<Header />);
      const skipLink = screen.getByText(/skip to content/i);
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('should have banner landmark role', () => {
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should have aria-label on toggle button', () => {
      render(<Header />);
      const button = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(button).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('should have aria-expanded attribute on mobile menu button', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // The Header component includes aria-hidden="true" on the FaBars and FaTimes icons
      // (defined in the source code at lines 73, 75 of Header.tsx)
      const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      // Initially not expanded
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // After clicking, should be expanded
      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have focus styles on navigation links', () => {
      render(<Header />);
      const aboutLink = screen.getAllByText(/about/i)[0].closest('a');
      expect(aboutLink).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // First tab goes to "Skip to content" link (accessibility feature)
      await user.tab();
      expect(screen.getByText(/skip to content/i)).toHaveFocus();

      // Second tab goes to logo
      await user.tab();
      expect(screen.getByRole('link', { name: /sendero bike trails home/i })).toHaveFocus();

      // Tab to first nav link or mobile menu button (depends on viewport)
      await user.tab();
      // The next focused element should be a navigation link or button
      const focusedElement = document.activeElement;
      expect(['A', 'BUTTON']).toContain(focusedElement?.tagName);
    });
  });

  describe('Responsive behavior', () => {
    it('should have desktop navigation hidden on mobile', () => {
      render(<Header />);
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('should have mobile menu button visible on mobile only', () => {
      render(<Header />);
      const button = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(button).toHaveClass('md:hidden');
    });
  });

  describe('Styling', () => {
    it('should be sticky positioned', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky', 'top-0');
    });

    it('should have backdrop blur', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('backdrop-blur');
    });

    it('should have high z-index for layering', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('z-50');
    });
  });
});
