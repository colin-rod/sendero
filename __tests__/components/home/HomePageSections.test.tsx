import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[locale]/page';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(),
}));

jest.mock('@/lib/seo/jsonLd', () => ({
  breadcrumbSchema: () => ({}),
}));

jest.mock('@/lib/seo/canonical', () => ({
  buildAlternates: () => ({ canonical: '/', languages: {} }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/layout/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));

jest.mock('@/components/ui/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

jest.mock('@/components/HeroVideo', () => () => <div data-testid="hero-video" />);
jest.mock('@/components/ScrollIndicator', () => () => <div data-testid="scroll-indicator" />);
jest.mock('@/components/ScrollReveal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@/components/BottomEmailCapture', () => () => <div data-testid="bottom-email" />);

jest.mock('@/components/features/tourGrid/TourGrid', () => ({
  TourGrid: () => <div data-testid="tour-grid" />,
}));

jest.mock('@/components/seo/JsonLd', () => ({
  JsonLd: () => null,
}));

describe('HomePage section flow', () => {
  it('renders waitlist email capture after the tour grid', () => {
    render(<HomePage />);

    const tourGrid = screen.getByTestId('tour-grid');
    const bottomEmail = screen.getByTestId('bottom-email');
    const DOCUMENT_POSITION_FOLLOWING = 4;

    expect(
      tourGrid.compareDocumentPosition(bottomEmail) & DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(screen.queryByTestId('newsletter-hero')).not.toBeInTheDocument();
  });
});
