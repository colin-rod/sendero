import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Sendero Bike Trails' }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'es_ES',
      images: [{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-logo.png`,
        width: 96,
        height: 96,
        alt: 'Sendero Bike Trails',
      }],
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: '/en',
        de: '/de',
        es: '/es',
      },
    },
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validatedLocale = locale as Locale;

  // Bind the request locale explicitly so message resolution does not
  // depend on middleware/header locale negotiation.
  setRequestLocale(validatedLocale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale: validatedLocale });

  return (
    <html lang={validatedLocale}>
      <body>
        <NextIntlClientProvider locale={validatedLocale} messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
