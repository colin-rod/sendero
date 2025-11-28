'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { FAQAccordion } from '@/components/features/faq/FAQAccordion';

const sectionKeys = [
  'safety',
  'weather',
  'fitness',
  'transport',
  'gear',
  'insurance',
  'payments',
] as const;

export default function FAQPage() {
  const t = useTranslations('faqPage');

  // Generate JSON-LD structured data for SEO
  const generateFAQSchema = () => {
    const mainEntity: Array<{
      '@type': string;
      name: string;
      acceptedAnswer: {
        '@type': string;
        text: string;
      };
    }> = [];

    sectionKeys.forEach((sectionKey) => {
      const questions = t.raw(`sections.${sectionKey}.questions`) as Array<{
        question: string;
        answer: string;
      }>;

      if (Array.isArray(questions)) {
        questions.forEach((qa) => {
          mainEntity.push({
            '@type': 'Question',
            name: qa.question.replace('[PLACEHOLDER] ', ''),
            acceptedAnswer: {
              '@type': 'Answer',
              text: qa.answer.replace(/\[TODO:.*?\]\s*/g, ''),
            },
          });
        });
      }
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity,
    };
  };

  const faqSchema = generateFAQSchema();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

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
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm">
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
