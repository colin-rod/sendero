import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnfragenHero } from '@/components/features/anfragen/AnfragenHero';
import { AnfragenIntro } from '@/components/features/anfragen/AnfragenIntro';
import { AnfragenForm } from '@/components/features/anfragen/AnfragenForm';
import { AnfragenGallery } from '@/components/features/anfragen/AnfragenGallery';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'anfragenPage' });
  const alternates = buildAlternates(locale, '/anfragen');

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

export default function AnfragenPage() {
  const locale = useLocale();
  const t = useTranslations('anfragenPage');
  const tHeader = useTranslations('header');

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: t('title'), path: '/anfragen' },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={breadcrumbs} />
      <Header overlay />

      <main id="main-content" className="flex-1">
        <AnfragenHero title={t('hero.title')} subtitle={t('hero.subtitle')} />

        <AnfragenIntro
          eyebrow={t('intro.eyebrow')}
          title={t('intro.title')}
          paragraphs={t.raw('intro.paragraphs') as string[]}
          photoAlt={t('intro.photoAlt')}
        />

        <section className="px-5 py-20">
          <AnfragenForm />
        </section>

        <AnfragenGallery
          heading={t('gallery.heading')}
          items={t.raw('gallery.items') as { caption: string; alt: string }[]}
        />
      </main>

      <Footer />
    </div>
  );
}
