'use client';

import { LogoMark } from '@/components/ui/LogoMark';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { FaInstagram } from 'react-icons/fa6';
import { SiKomoot } from 'react-icons/si';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-river-forest text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-8">

          {/* Column 1: Logo → brand name → tagline */}
          <div className="flex max-w-[300px] flex-col gap-4">
            <div className="h-12 flex items-center">
              <Link href="/" className="group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-river-forest">
                <LogoMark
                  label={t('brandName')}
                  className="h-12 w-12 text-white transition-colors group-hover:text-foreground group-active:text-foreground group-focus-visible:text-foreground"
                  circleClassName="fill-river-forest group-hover:fill-white group-active:fill-white group-focus-visible:fill-white"
                />
              </Link>
            </div>
            <p className="text-body font-bold text-white">{t('brandName')}</p>
            <p className="text-body leading-[26px] text-white">{t('tagline')}</p>
          </div>

          {/* Column 2: Follow us → icons */}
          <div className="flex flex-col gap-4">
            <div className="h-12 flex items-center">
              <span className="text-body-em text-white">{t('social.followUs')}</span>
            </div>
            <div className="flex items-center gap-[25px]">
              <a
                href="https://www.instagram.com/sendero_bike_trails/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.instagram')}
                className="text-white transition-colors hover:text-accent-400"
              >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.komoot.com/collection/4055430/-sendero-bike-trails-collection"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.komoot')}
                className="text-white transition-colors hover:text-accent-400"
              >
                <SiKomoot className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Legal heading → imprint → privacy */}
          <div className="flex flex-col gap-4">
            <div className="h-12 flex items-center">
              <span className="text-body-em text-white">{t('legal.heading')}</span>
            </div>
            <Link href="/impressum" className="text-body text-white transition-colors hover:text-accent-400">
              {t('legal.imprint')}
            </Link>
            <Link href="/datenschutz" className="text-body text-white transition-colors hover:text-accent-400">
              {t('legal.privacy')}
            </Link>
            <Link href="/agb" className="text-body text-white transition-colors hover:text-accent-400">
              {t('legal.terms')}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
