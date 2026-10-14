'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';
import LanguageSwitcher, { localeLabels, useSwitchLocale } from '@/components/LanguageSwitcher';

/** Header links, shared by the desktop nav and the mobile menu. */
const navItems = [
  { href: '/mtb-reisen', labelKey: 'nav.mtbReisen' },
  { href: '/anfragen', labelKey: 'nav.buchen' },
] as const;

interface HeaderProps {
  /** Translucent bar while at the top of the page, for hero media. */
  overlay?: boolean;
}

export function Header({ overlay = false }: HeaderProps) {
  const t = useTranslations('header');
  const locale = useLocale();
  const switchLocale = useSwitchLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape or
  // when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const handleResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', handleResize);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        {t('skipToContent')}
      </a>

      <header
        className={`fixed top-0 left-0 w-full transition-colors duration-300 ${
          // Open menu sits above the cookie banner (z-50); the header stays on top of it.
          menuOpen
            ? 'z-[70] bg-background'
            : scrolled
              ? 'z-50 bg-white shadow-sm'
              : overlay
                ? 'z-50 bg-background/60'
                : 'z-50 bg-transparent'
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex py-[34px] gap-6 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={t('ariaLabel')}
            >
              <Image
                src="/Logo_Dark.svg"
                alt={t('logoAlt')}
                width={48}
                height={48}
                className="h-12 w-12 flex-none"
                priority
              />
              <span className="text-caption font-medium leading-tight tracking-[0.06em] uppercase text-foreground">
                Sendero<br />Bike Trails
              </span>
            </Link>

            <div className="flex items-center gap-8">
              {/* Nav */}
              <nav className="hidden md:flex items-center gap-6" aria-label={t('ariaLabel')}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-caption font-medium tracking-[0.06em] uppercase text-foreground transition-opacity hover:opacity-70"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>

              {/* Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center rounded-lg border border-foreground p-1.5 text-foreground transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer"
                aria-label={t('mobileMenu.toggle')}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background px-6 pt-[116px] pb-10 sm:px-10 md:hidden"
        >
          <nav className="flex flex-col gap-6 pt-8" aria-label={t('mobileMenu.ariaLabel')}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-h3 text-foreground transition-opacity hover:opacity-70"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div
            className="mt-auto flex gap-3 border-t border-foreground/20 pt-6"
            role="group"
            aria-label={t('mobileMenu.language')}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  switchLocale(loc);
                }}
                aria-current={locale === loc ? 'true' : undefined}
                className={`rounded-lg border border-foreground px-4 py-2 text-caption font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  locale === loc
                    ? 'bg-foreground text-white'
                    : 'text-foreground hover:bg-foreground hover:text-white'
                }`}
              >
                {localeLabels[loc] ?? loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
