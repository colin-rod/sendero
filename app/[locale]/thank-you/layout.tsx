import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYou' });
  return {
    title: t('heading'),
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
