import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img {...props} alt={props.alt ?? ''} />,
}));

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
  it('uses the dark logo asset', () => {
    render(<Footer />);

    const logo = screen.getByAltText('sendero bike trails');
    expect(logo).toHaveAttribute('src', '/Logo Dark.svg');
  });

  it('renders as a responsive 3-column grid', () => {
    const { container } = render(<Footer />);
    const layout = container.querySelector('footer > div > div:last-child');

    expect(layout).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-3');
    expect(layout).not.toHaveClass('flex');
  });
});
