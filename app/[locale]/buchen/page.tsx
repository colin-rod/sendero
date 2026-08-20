import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BuchenForm } from '@/components/features/buchen/BuchenForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'buchenPage' });
  const alternates = buildAlternates(locale, '/buchen');

  return {
    title: t('title'),
    description: t('description'),
    alternates,
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: alternates.canonical,
      images: ogImages,
    },
  };
}

export default function BuchenPage() {
  const locale = useLocale();
  const t = useTranslations('buchenPage');
  const tHeader = useTranslations('header');

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: t('title'), path: '/buchen' },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <JsonLd data={breadcrumbs} />
      <Header logoVariant="dark" />

      <main className="flex-1 py-12 md:py-16">
        <Container size="lg">
          <div className="mb-12 text-center">
            <h1 className="text-h1 mb-4 text-foreground">{t('title')}</h1>
            <p className="text-body text-muted-foreground">{t('subtitle')}</p>
          </div>

          <div className="mx-auto max-w-2xl">
            <BuchenForm />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
