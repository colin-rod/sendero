import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { CookieBanner } from '@/components/features/cookie-consent/CookieBanner';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { PostHogProvider } from '@/components/PostHogProvider';
import { PostHogPageView } from '@/components/PostHogPageView';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/lib/seo/jsonLd';
import { buildAlternates, getSiteUrl } from '@/lib/seo/canonical';

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
  const siteUrl = getSiteUrl();
  const alternates = buildAlternates(locale, '');

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Sendero Bike Trails' }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: alternates.canonical,
      siteName: 'Sendero Bike Trails',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'es_ES',
      images: [{
        url: '/Logo_Dark.png',
        width: 96,
        height: 96,
        alt: 'Sendero Bike Trails',
      }],
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: ['/Logo_Dark.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates,
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
        <JsonLd
          data={[
            organizationSchema(),
            localBusinessSchema(),
            websiteSchema(validatedLocale),
          ]}
        />
        <NextIntlClientProvider locale={validatedLocale} messages={messages}>
          <PostHogProvider>
            <PostHogPageView />
            {children}
          </PostHogProvider>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
