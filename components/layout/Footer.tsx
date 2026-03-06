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
      <div className="mx-auto max-w-[1200px] px-16 py-16">
        <div className="flex flex-wrap items-start justify-between gap-[120px]">

          {/* Column 1: Brand */}
          <div className="flex w-[300px] flex-col gap-4">
            <Image
              src="/Logo White.svg"
              alt={t('brandName')}
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="text-base font-bold leading-6 text-white">
              <p>{t('brandName')}</p>
              <p className="mt-4">{t('tagline')}</p>
            </div>
          </div>

          {/* Column 2: Social */}
          <div className="flex w-[300px] flex-col gap-[23px]">
            <span className="text-base font-bold text-white">{t('social.followUs')}</span>
            <div className="flex items-center gap-[25px]">
              <a
                href="https://www.instagram.com/sendero_bike_trails/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('social.instagram')}
              >
                <FaInstagram className="h-6 w-6 text-white" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label={t('social.komoot')}
              >
                <SiKomoot className="h-6 w-6 text-white" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex w-[300px] flex-col gap-3">
            <span className="text-base font-bold text-white">{t('legal.heading')}</span>
            <Link href="#" className="text-base font-bold text-white">
              {t('legal.imprint')}
            </Link>
            <Link href="#" className="text-base font-bold text-white">
              {t('legal.privacy')}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
