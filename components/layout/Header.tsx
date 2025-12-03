'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/**
 * Header Component
 *
 * Main site header with navigation, mobile menu, language switcher, and skip-to-content link.
 * Includes accessibility improvements and responsive behavior.
 */

export function Header() {
  const t = useTranslations('header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        {t('skipToContent')}
      </a>

      <header className="sticky top-0 z-50 w-full bg-[rgba(27,27,27,1.0)]">
        <Container>
          <div className="flex h-16 max-w-[1200px] mx-auto p-8 gap-6 items-center justify-between flex-wrap">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label={t('ariaLabel')}
            >
              <Image
                src="/Color=Gravel.png"
                alt={t('logoAlt')}
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span className="text-label text-white">{t('brandName')}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-6 md:flex" aria-label="Main navigation">
              <Link
                href="/about"
                className="text-label text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/#how-it-works"
                className="text-label text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
              >
                {t('nav.howItWorks')}
              </Link>
              <LanguageSwitcher />
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label={t('mobileMenu.toggle')}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div
              className="animate-slide-in-down md:hidden bg-[rgba(27,27,27,0.95)]"
              role="dialog"
              aria-label={t('mobileMenu.ariaLabel')}
            >
              <nav className="space-y-1 pb-4 pt-2">
                <Link
                  href="/about"
                  className="block rounded-md px-3 py-2 text-label text-gray-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  onClick={closeMobileMenu}
                >
                  {t('nav.about')}
                </Link>
                <Link
                  href="/#how-it-works"
                  className="block rounded-md px-3 py-2 text-label text-gray-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  onClick={closeMobileMenu}
                >
                  {t('nav.howItWorks')}
                </Link>
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          )}
        </Container>
      </header>
    </>
  );
}
