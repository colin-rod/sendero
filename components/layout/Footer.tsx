'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { FaInstagram } from 'react-icons/fa6';
import { SiKomoot } from 'react-icons/si';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="text-white" style={{ backgroundColor: '#1B1B1B' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-8">

          {/* Column 1: Logo → brand name → tagline */}
          <div className="flex max-w-[300px] flex-col gap-4">
            <div className="h-12 flex items-center">
              <Image
                src="/Logo Dark.svg"
                alt={t('brandName')}
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </div>
            <p className="text-body text-white">{t('brandName')}</p>
            <p className="text-body text-white">{t('tagline')}</p>
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
                className="text-white transition-colors hover:text-[#fff0bb]"
              >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label={t('social.komoot')}
                className="text-white transition-colors hover:text-[#fff0bb]"
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
            <Link href="/impressum" className="text-body text-white transition-colors hover:text-[#fff0bb]">
              {t('legal.imprint')}
            </Link>
            <Link href="/datenschutz" className="text-body text-white transition-colors hover:text-[#fff0bb]">
              {t('legal.privacy')}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
