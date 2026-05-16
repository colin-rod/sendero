import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { FAQAccordion } from '@/components/features/faq/FAQAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';

const sectionKeys = [
  'safety',
  'weather',
  'fitness',
  'transport',
  'gear',
  'insurance',
  'payments',
] as const;

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

  for (const sectionKey of sectionKeys) {
    const questions = t.raw(`sections.${sectionKey}.questions`) as QA[] | undefined;
    if (Array.isArray(questions)) {
      for (const qa of questions) {
        mainEntity.push({
          '@type': 'Question',
          name: qa.question.replace('[PLACEHOLDER] ', ''),
          acceptedAnswer: {
            '@type': 'Answer',
            text: qa.answer.replace(/\[TODO:.*?\]\s*/g, ''),
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

      <Header logoVariant="dark" />

      <main className="flex-1 py-12 md:py-16">
        <Container size="md">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-h1 mb-3 text-foreground">{t('title')}</h1>
            <p className="text-body text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm md:p-8">
            <FAQAccordion sections={sectionKeys} />
          </div>

          {/* Helper Note for Placeholder Content */}
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-caption">
            <p className="text-amber-900">
              <strong>Note:</strong> Content marked with{' '}
              <span className="font-mono">[PLACEHOLDER]</span> and{' '}
              <span className="font-mono">[TODO]</span> is temporary and will be
              updated with final information.
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
