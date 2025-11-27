'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gray-800 text-white">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-h3 text-primary-400">
                {t('brandName')}
              </h3>
              <p className="text-body text-gray-300">
                {t('brandDescription')}
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-h4 text-white">{t('quickLinks.heading')}</h4>
              <ul className="space-y-2 text-body text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    {t('quickLinks.about')}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    {t('quickLinks.howItWorks')}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    {t('quickLinks.contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-h4 text-white">{t('contact.heading')}</h4>
              <p className="text-body text-gray-300">
                {t('contact.description')}
              </p>
              <a
                href="mailto:info@senderobiketrails.com"
                className="mt-3 block text-body text-primary-400 hover:text-primary-300 transition-colors"
              >
                {t('contact.email')}
              </a>
              <a
                href="https://www.instagram.com/sendero_bike_trails/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-body text-primary-400 hover:text-primary-300 transition-colors"
              >
                {t('contact.instagram')}
                <span className="ml-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-body text-gray-400">
            <p>&copy; {currentYear} {t('brandName')}. {t('copyright')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
