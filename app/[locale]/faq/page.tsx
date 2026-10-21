import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { FAQAccordion } from '@/components/features/faq/FAQAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';
import { FAQ_SECTION_KEYS } from '@/lib/data/faq';
import { Link } from '@/lib/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const alternates = buildAlternates(locale, '/faq');
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates,
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      url: alternates.canonical,
      images: ogImages,
    },
  };
}

type QA = { question: string; answer: string };

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const tHeader = await getTranslations({ locale, namespace: 'header' });

  // Build FAQPage JSON-LD from translations.
  const mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }> = [];

  for (const sectionKey of FAQ_SECTION_KEYS) {
    const questions = t.raw(`sections.${sectionKey}.questions`) as QA[] | undefined;
    if (Array.isArray(questions)) {
      for (const qa of questions) {
        mainEntity.push({
          '@type': 'Question',
          name: qa.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: qa.answer,
          },
        });
      }
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: t('title'), path: '/faq' },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <JsonLd data={[faqSchema, breadcrumbs]} />

      <Header />

      <main className="flex-1 pt-[164px] pb-12 md:pt-[180px] md:pb-16">
        <Container>
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-h1 mb-3 mx-auto max-w-heading text-foreground">{t('title')}</h1>
            <p className="text-body mx-auto max-w-text text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="mx-auto max-w-heading rounded-xl border border-border bg-white p-6 shadow-sm md:p-8">
            <FAQAccordion sections={FAQ_SECTION_KEYS} />
          </div>

          {/* Trip-specific questions live on the trip page */}
          <p className="text-body mx-auto mt-6 max-w-heading text-center text-foreground">
            {t('tripNote')}{' '}
            <Link href="/mtb-reisen#fragen" className="text-primary-500 underline hover:text-river-forest">
              {t('tripLink')}
            </Link>
          </p>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
