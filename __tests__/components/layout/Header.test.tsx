import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

const mockReplace = jest.fn();

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _priority, ...props }: React.ComponentProps<'img'> & { priority?: boolean }) => (
    <img {...props} alt={props.alt ?? ''} />
  ),
}));

jest.mock('posthog-js', () => ({ capture: jest.fn() }));

jest.mock('next-intl', () => ({
  useLocale: () => 'de',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'nav.mtbReisen': 'Deine Reise',
      'nav.buchen': "Los geht's!",
      'mobileMenu.toggle': 'Navigationsmenü umschalten',
      'mobileMenu.ariaLabel': 'Mobile Navigation',
      'mobileMenu.language': 'Sprache',
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
    onClick?: () => void;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/anfragen',
}));

describe('Header mobile menu', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  beforeEach(() => {
    mockReplace.mockClear();
  });

  const toggle = () => screen.getByRole('button', { name: 'Navigationsmenü umschalten' });
  const menu = () => screen.queryByRole('navigation', { name: 'Mobile Navigation' });

  it('opens from the burger button and lists the nav links', () => {
    render(<Header />);

    expect(menu()).not.toBeInTheDocument();
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle());

    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    const nav = within(menu()!);
    expect(nav.getByRole('link', { name: "Los geht's!" })).toHaveAttribute('href', '/anfragen');
    expect(nav.getByRole('link', { name: 'Deine Reise' })).toHaveAttribute('href', '/mtb-reisen');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and on link click, and unlocks page scroll', () => {
    render(<Header />);

    fireEvent.click(toggle());
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(menu()).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');

    fireEvent.click(toggle());
    fireEvent.click(within(menu()!).getByRole('link', { name: "Los geht's!" }));
    expect(menu()).not.toBeInTheDocument();
  });

  it('switches language from the menu', () => {
    render(<Header />);

    fireEvent.click(toggle());
    const languages = within(screen.getByRole('group', { name: 'Sprache' }));
    expect(languages.getByRole('button', { name: 'DE' })).toHaveAttribute('aria-current', 'true');

    fireEvent.click(languages.getByRole('button', { name: 'EN' }));

    expect(mockReplace).toHaveBeenCalledWith('/anfragen', { locale: 'en' });
    expect(menu()).not.toBeInTheDocument();
  });
});
