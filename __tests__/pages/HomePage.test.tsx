/**
 * Page Tests: Landing Page (HomePage)
 *
 * Tests for the main landing page
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock child components
jest.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

jest.mock('@/components/features/waitlist/WaitlistForm', () => ({
  WaitlistForm: () => <form data-testid="waitlist-form">Waitlist Form</form>,
}));

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  describe('Page structure', () => {
    it('should render header', () => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should render footer', () => {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should have main content area with ID', () => {
      const main = document.querySelector('#main-content');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Hero section', () => {
    it('should render main heading', () => {
      expect(screen.getByText(/discover colombia's coffee region/i)).toBeInTheDocument();
    });

    it('should render subheading with value proposition', () => {
      expect(screen.getByText(/one pedal at a time/i)).toBeInTheDocument();
    });

    it('should render hero description', () => {
      expect(
        screen.getByText(/beginner-friendly, sustainable hike & bike tours/i)
      ).toBeInTheDocument();
    });

    it('should display key features', () => {
      expect(screen.getByText(/e-bikes available/i)).toBeInTheDocument();
      expect(screen.getByText(/eco-conscious tours/i)).toBeInTheDocument();
      // Coffee Farm Visits appears in both hero and form, so use getAllByText
      expect(screen.getAllByText(/coffee farm visits/i).length).toBeGreaterThan(0);
    });

    it('should render hero image', () => {
      const image = screen.getByAltText(/lush green rolling hills of colombia's coffee region/i);
      expect(image).toBeInTheDocument();
    });
  });

  describe('How It Works section', () => {
    it('should render section heading', () => {
      expect(screen.getByText(/^how it works$/i)).toBeInTheDocument();
    });

    it('should render step 1: Sign Up', () => {
      expect(screen.getByText(/sign up/i)).toBeInTheDocument();
      expect(
        screen.getByText(/fill out the quick form below with your email/i)
      ).toBeInTheDocument();
    });

    it('should render step 2: Stay Tuned', () => {
      expect(screen.getByText(/stay tuned/i)).toBeInTheDocument();
      expect(
        screen.getByText(/we'll keep you updated as we finalize tour dates/i)
      ).toBeInTheDocument();
    });

    it('should render step 3: Book Your Adventure', () => {
      expect(screen.getByText(/book your adventure/i)).toBeInTheDocument();
      expect(
        screen.getByText(/be among the first to book when tours officially launch/i)
      ).toBeInTheDocument();
    });

    it('should have section with ID for navigation', () => {
      const section = document.querySelector('#how-it-works');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Perfect For section', () => {
    it('should render section heading', () => {
      expect(screen.getByText(/^perfect for$/i)).toBeInTheDocument();
    });

    it('should render section description', () => {
      expect(
        screen.getByText(/our tours are designed for everyone/i)
      ).toBeInTheDocument();
    });

    it('should list all target audiences', () => {
      expect(screen.getByText(/beginner cyclists/i)).toBeInTheDocument();
      expect(screen.getByText(/eco-conscious travelers/i)).toBeInTheDocument();
      expect(screen.getByText(/coffee lovers/i)).toBeInTheDocument();
      // Women-only Groups appears in both Perfect For section and form, use getAllByText
      expect(screen.getAllByText(/women-only groups/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/nature enthusiasts/i)).toBeInTheDocument();
      expect(screen.getByText(/weekend adventurers/i)).toBeInTheDocument();
    });

    it('should have descriptions for each audience', () => {
      expect(screen.getByText(/never biked long distances/i)).toBeInTheDocument();
      expect(screen.getByText(/sustainable tourism that respects/i)).toBeInTheDocument();
      expect(screen.getByText(/experience authentic coffee farm visits/i)).toBeInTheDocument();
      expect(screen.getByText(/safe, supportive group tours/i)).toBeInTheDocument();
      expect(screen.getByText(/explore stunning landscapes/i)).toBeInTheDocument();
      expect(screen.getByText(/short trips perfect for those with limited time/i)).toBeInTheDocument();
    });

    it('should have about section with ID for navigation', () => {
      const section = document.querySelector('#about');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Waitlist section', () => {
    it('should render section heading', () => {
      // "Join the Waitlist" appears both as heading and button, use getAllByText
      expect(screen.getAllByText(/join the waitlist/i).length).toBeGreaterThan(0);
    });

    it('should render section description', () => {
      // Description appears in multiple places, use getAllByText
      expect(screen.getAllByText(/be the first to know when tours open up/i).length).toBeGreaterThan(0);
    });

    it('should render waitlist form', () => {
      expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
    });
  });

  describe('Content hierarchy', () => {
    it('should have proper heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);

      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      expect(h3Elements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have main landmark', () => {
      const main = document.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute('id', 'main-content');
    });

    it('should have navigation sections with IDs', () => {
      expect(document.querySelector('#how-it-works')).toBeInTheDocument();
      expect(document.querySelector('#about')).toBeInTheDocument();
    });
  });
});
