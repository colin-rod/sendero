'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin, FaStrava } from 'react-icons/fa6';
import { SiKomoot } from 'react-icons/si';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'X',
      icon: FaXTwitter,
      href: '#',
      ariaLabel: t('social.twitter'),
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/sendero_bike_trails/',
      ariaLabel: t('social.instagram'),
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      href: '#',
      ariaLabel: t('social.youtube'),
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: '#',
      ariaLabel: t('social.linkedin'),
    },
    {
      name: 'Strava',
      icon: FaStrava,
      href: '#',
      ariaLabel: t('social.strava'),
    },
    {
      name: 'Komoot',
      icon: SiKomoot,
      href: '#',
      ariaLabel: t('social.komoot'),
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <Container>
        <div className="py-12">
          {/* Logo and Social Icons Section */}
          <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/Color=Gravel.png"
                alt={t('brandName')}
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <span className="text-label text-gray-400">{t('social.followUs')}</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== '#' ? '_blank' : undefined}
                    rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={social.ariaLabel}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Trails Column */}
            <div>
              <h4 className="mb-4 text-label text-white">{t('trails.heading')}</h4>
              <ul className="space-y-2 text-body text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.places')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.landscapes')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.experiences')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.localCollaboration')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.testimonials')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('trails.bookYourTrails')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="mb-4 text-label text-white">{t('about.heading')}</h4>
              <ul className="space-y-2 text-body text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('about.ourStory')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t('about.experiences')}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    {t('about.faqs')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="mb-4 text-label text-white">{t('contact.heading')}</h4>
              <p className="text-body text-gray-300">
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('contact.getInTouch')}
                </Link>
              </p>
            </div>

            {/* Empty column for 4-column grid on desktop */}
            <div className="hidden lg:block" aria-hidden="true"></div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-body text-gray-400">
            <p>&copy; {currentYear} {t('brandName')}. {t('copyright')}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
