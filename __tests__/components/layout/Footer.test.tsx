import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      brandName: 'sendero bike trails',
      tagline: 'Mindful travel on two wheels.\nA culture to immerse yourself in.',
      'social.followUs': 'Follow us',
      'social.instagram': 'Follow us on Instagram',
      'social.komoot': 'Follow us on Komoot',
      'legal.heading': 'Legal',
      'legal.imprint': 'Imprint',
      'legal.privacy': 'Privacy Policy',
      'legal.terms': 'Terms & Conditions',
    };

    return translations[key] ?? key;
  },
}));

jest.mock('@/lib/i18n/routing', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  it('renders a green logo badge with white lines that links home', () => {
    render(<Footer />);

    const logo = screen.getByRole('img', { name: 'sendero bike trails' });
    expect(logo.closest('a')).toHaveAttribute('href', '/');
    expect(logo).toHaveClass('text-white', 'group-hover:text-foreground');
    expect(logo.querySelector('circle')).toHaveClass('fill-river-forest', 'group-hover:fill-white', 'group-active:fill-white');
  });

  it('renders as a responsive 3-column grid', () => {
    const { container } = render(<Footer />);
    const layout = container.querySelector('footer > div > div:last-child');

    expect(layout).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-3');
    expect(layout).not.toHaveClass('flex');
  });
});
