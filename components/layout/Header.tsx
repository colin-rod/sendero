'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/**
 * Header Component
 *
 * Main site header with logo, language switcher, and skip-to-content link.
 * Transparent background overlays the hero section.
 */

export function Header() {
  const t = useTranslations('header');

  return (
    <>
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        {t('skipToContent')}
      </a>

      <header className="sticky top-0 z-50 w-full bg-transparent">
        <Container>
          <div className="flex h-16 max-w-[1200px] mx-auto gap-6 items-center justify-between flex-wrap">
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

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </Container>
      </header>
    </>
  );
}
