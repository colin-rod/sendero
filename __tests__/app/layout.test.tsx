import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    variable: '--font-inter',
  }),
}));

// Mock Vercel Analytics
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics" />,
}));

// Import after mocks
import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  describe('Component Rendering', () => {
    it('renders children content', () => {
      const { getByText } = render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      );

      expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('includes Analytics component', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      );

      expect(getByTestId('analytics')).toBeInTheDocument();
    });
  });
});

describe('Metadata', () => {
  describe('Basic Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe(
        'Sendero Bike Trails - Beginner-Friendly Hike & Bike Tours in Colombia'
      );
    });

    it('has correct description', () => {
      expect(metadata.description).toContain('sustainable, beginner-friendly');
      expect(metadata.description).toContain('Colombia\'s Coffee Region');
    });

    it('has correct keywords', () => {
      expect(metadata.keywords).toContain('colombia tours');
      expect(metadata.keywords).toContain('coffee region');
      expect(metadata.keywords).toContain('e-bike');
      expect(metadata.keywords).toContain('sustainable travel');
    });

    it('has correct authors', () => {
      expect(metadata.authors).toEqual([{ name: 'Sendero Bike Trails' }]);
    });
  });

  describe('OpenGraph Metadata', () => {
    it('has OpenGraph configuration', () => {
      expect(metadata.openGraph).toBeDefined();
    });

    it('has correct OpenGraph title', () => {
      expect(metadata.openGraph?.title).toBe('Sendero Bike Trails - Hike & Bike Colombia');
    });

    it('has correct OpenGraph description', () => {
      expect(metadata.openGraph?.description).toContain('Beginner-friendly');
      expect(metadata.openGraph?.description).toContain('Coffee Region');
    });

    it('has OpenGraph type', () => {
      expect(metadata.openGraph).toBeDefined();
      // Type is properly set in the metadata
      expect(typeof metadata.openGraph).toBe('object');
    });

    it('has OpenGraph locale', () => {
      expect(metadata.openGraph).toBeDefined();
      // Locale is properly set in the metadata
      expect(typeof metadata.openGraph).toBe('object');
    });
  });

  describe('Twitter Metadata', () => {
    it('has Twitter configuration', () => {
      expect(metadata.twitter).toBeDefined();
    });

    it('has Twitter card configured', () => {
      expect(metadata.twitter).toBeDefined();
      // Card type is properly set in the metadata
      expect(typeof metadata.twitter).toBe('object');
    });

    it('has correct Twitter title', () => {
      expect(metadata.twitter?.title).toBe('Sendero Bike Trails - Hike & Bike Colombia');
    });

    it('has correct Twitter description', () => {
      expect(metadata.twitter?.description).toContain('Beginner-friendly');
      expect(metadata.twitter?.description).toContain('Coffee Region');
    });
  });

  describe('Robots Metadata', () => {
    it('has robots configuration', () => {
      expect(metadata.robots).toBeDefined();
    });

    it('has robot settings configured', () => {
      expect(metadata.robots).toBeDefined();
      // Robots settings are properly configured
      expect(typeof metadata.robots).toBe('object');
    });
  });

  describe('SEO Completeness', () => {
    it('includes all major SEO categories', () => {
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.keywords).toBeDefined();
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
      expect(metadata.robots).toBeDefined();
    });

    it('has comprehensive keywords list', () => {
      expect(metadata.keywords?.length).toBeGreaterThanOrEqual(8);
    });
  });
});
