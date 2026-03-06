import React from 'react';
import { render, screen } from '@testing-library/react';
import { NewsletterHeroSection } from '@/components/features/trailsMap/NewsletterHeroSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('NewsletterHeroSection', () => {
  it('renders the newsletter hero artwork at full width', () => {
    render(<NewsletterHeroSection />);

    expect(screen.getByTestId('newsletter-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-hero-image-wrap')).toBeInTheDocument();

    const image = screen.getByRole('img', {
      name: 'Sendero newsletter hero artwork',
    });
    expect(image).toHaveAttribute('src', '/Hero Newsletter.svg');
  });
});
