import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Helper function to highlight placeholder text
function highlightPlaceholders(text: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Match [PLACEHOLDER] or [TODO: ...]
  const regex = /(\[PLACEHOLDER\]|\[TODO:.*?\])/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add highlighted placeholder
    parts.push(
      <span key={match.index} className="bg-amber-100 px-1 font-mono text-amber-900">
        {match[0]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <Container size="lg">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-h1 mb-4 text-foreground">
              {highlightPlaceholders(t('heading'))}
            </h1>
            <p className="text-body mx-auto max-w-2xl text-muted-foreground">
              {highlightPlaceholders(t('subtitle'))}
            </p>
          </div>

          {/* Section 1: Philosophy & Story */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-h2 mb-4 text-foreground">
                  {highlightPlaceholders(t('sections.philosophy.heading'))}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {highlightPlaceholders(t('sections.philosophy.content'))}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=Philosophy+%26+Story"
                  alt={t('sections.philosophy.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Why Andes & Coffee Region */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Image - Left on desktop */}
              <div className="relative h-64 lg:h-auto lg:order-1">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=Andes+%26+Coffee+Region"
                  alt={t('sections.region.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                />
              </div>

              {/* Text Content - Right on desktop */}
              <div className="flex flex-col justify-center lg:order-2">
                <h2 className="text-h2 mb-4 text-foreground">
                  {highlightPlaceholders(t('sections.region.heading'))}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {highlightPlaceholders(t('sections.region.content'))}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Local Fincas Partners */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-h2 mb-4 text-foreground">
                  {highlightPlaceholders(t('sections.partners.heading'))}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {highlightPlaceholders(t('sections.partners.content'))}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=Local+Fincas"
                  alt={t('sections.partners.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </section>

          {/* Section 4: CTA */}
          <section className="mb-12">
            <div className="rounded-lg border border-border bg-white p-8 text-center shadow-md md:p-12">
              <h2 className="text-h2 mb-4 text-foreground">
                {highlightPlaceholders(t('sections.cta.heading'))}
              </h2>
              <p className="text-body mx-auto mb-6 max-w-2xl text-muted-foreground">
                {highlightPlaceholders(t('sections.cta.content'))}
              </p>
              <Link href="/tours">
                <Button variant="primary" size="lg">
                  {t('sections.cta.buttonText')}
                </Button>
              </Link>
            </div>
          </section>

          {/* Placeholder Note */}
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm">
            <p className="text-amber-900">
              <strong>Note:</strong> {t('placeholderNote.text')}
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
