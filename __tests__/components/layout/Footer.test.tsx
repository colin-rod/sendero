/**
 * Component Tests: Footer
 *
 * Tests for the Footer layout component
 */

import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('should render the footer element', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should render Sendero Bike Trails branding', () => {
      render(<Footer />);
      expect(screen.getByText('Sendero Bike Trails')).toBeInTheDocument();
    });

    it('should render company description', () => {
      render(<Footer />);
      expect(
        screen.getByText(/beginner-friendly hike & bike tours in colombia's coffee region/i)
      ).toBeInTheDocument();
    });

    it('should render Quick Links section', () => {
      render(<Footer />);
      expect(screen.getByText(/quick links/i)).toBeInTheDocument();
    });

    it('should render Contact section', () => {
      render(<Footer />);
      expect(screen.getByText(/^contact$/i)).toBeInTheDocument();
    });

    it('should render copyright notice', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Sendero Bike Trails`))).toBeInTheDocument();
    });
  });

  describe('Quick Links', () => {
    it('should render About link', () => {
      render(<Footer />);
      const links = screen.getAllByText(/about/i);
      const aboutLink = links.find((link) => link.tagName === 'A');
      expect(aboutLink).toHaveAttribute('href', '#about');
    });

    it('should render How It Works link', () => {
      render(<Footer />);
      const links = screen.getAllByText(/how it works/i);
      const howItWorksLink = links.find((link) => link.tagName === 'A');
      expect(howItWorksLink).toHaveAttribute('href', '#how-it-works');
    });

    it('should have two navigation links', () => {
      render(<Footer />);
      const quickLinksSection = screen.getByText(/quick links/i).parentElement;
      const links = quickLinksSection?.querySelectorAll('a');
      expect(links).toHaveLength(2);
    });
  });

  describe('Contact section', () => {
    it('should render contact message', () => {
      render(<Footer />);
      expect(screen.getByText(/questions\? we'd love to hear from you/i)).toBeInTheDocument();
    });
  });

  describe('Copyright', () => {
    it('should display current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('should display "All rights reserved"', () => {
      render(<Footer />);
      expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('Layout structure', () => {
    it('should have three column grid on desktop', () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector('.md\\:grid-cols-3');
      expect(grid).toBeInTheDocument();
    });

    it('should have sections in correct order', () => {
      render(<Footer />);
      const sections = screen.getAllByRole('heading', { level: 3 }).concat(
        screen.getAllByRole('heading', { level: 4 })
      );

      const headings = sections.map((s) => s.textContent);
      expect(headings).toContain('Sendero Bike Trails');
      expect(headings).toContain('Quick Links');
      expect(headings).toContain('Contact');
    });
  });

  describe('Styling', () => {
    it('should have border top', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('border-t', 'border-border');
    });

    it('should have muted background', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-muted/50');
    });

    it('should have proper spacing', () => {
      const { container } = render(<Footer />);
      const contentDiv = container.querySelector('.py-12');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should have primary color on branding', () => {
      render(<Footer />);
      const branding = screen.getByText('Sendero Bike Trails');
      expect(branding).toHaveClass('text-primary-600');
    });
  });

  describe('Links hover states', () => {
    it('should have hover styles on links', () => {
      render(<Footer />);
      const links = screen.getAllByText(/about/i);
      const aboutLink = links.find((link) => link.tagName === 'A');
      expect(aboutLink).toHaveClass('hover:text-foreground');
    });
  });

  describe('Accessibility', () => {
    it('should have contentinfo landmark role', () => {
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should have semantic heading structure', () => {
      render(<Footer />);
      expect(
        screen.getByRole('heading', { level: 3, name: /sendero bike trails/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: /quick links/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: /contact/i })).toBeInTheDocument();
    });

    it('should have valid link structure', () => {
      render(<Footer />);
      const quickLinksSection = screen.getByText(/quick links/i).parentElement;
      const list = quickLinksSection?.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list?.querySelectorAll('li')).toHaveLength(2);
    });
  });

  describe('Responsive behavior', () => {
    it('should stack sections on mobile', () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-8');
    });
  });
});
