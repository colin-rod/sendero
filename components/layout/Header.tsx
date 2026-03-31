'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type HeaderProps = {
  logoVariant?: 'dark' | 'white';
};

export function Header({ logoVariant = 'dark' }: HeaderProps) {
  const t = useTranslations('header');
  const isWhiteLogo = logoVariant === 'white';
  const logoSrc = isWhiteLogo ? '/Logo White.svg' : '/Logo Dark.svg';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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

      <header className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${scrolled ? 'bg-[#F2F2F2] shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex py-[34px] gap-6 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={t('ariaLabel')}
            >
              <Image
                src={logoSrc}
                alt={t('logoAlt')}
                width={48}
                height={48}
                className="h-12 w-12 flex-none"
                priority
              />
              <span className={`text-caption font-medium leading-tight tracking-[0.06em] uppercase ${isWhiteLogo ? 'text-white' : 'text-foreground'}`}>
                Sendero<br />Bike Trails
              </span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
