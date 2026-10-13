'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { MtbReisenNavDropdown } from '@/components/layout/MtbReisenNavDropdown';

interface HeaderProps {
  /** Faint translucent bar while at the top of the page, for hero media. */
  overlay?: boolean;
}

export function Header({ overlay = false }: HeaderProps) {
  const t = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
          scrolled ? 'bg-white shadow-sm' : overlay ? 'bg-background/15' : 'bg-transparent'
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
                <MtbReisenNavDropdown />
                <Link
                  href="/anfragen"
                  className="text-caption font-medium tracking-[0.06em] uppercase text-foreground transition-opacity hover:opacity-70"
                >
                  {t('nav.buchen')}
                </Link>
              </nav>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
