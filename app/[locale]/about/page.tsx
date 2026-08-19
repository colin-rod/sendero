import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const alternates = buildAlternates(locale, '/about');

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

export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations('aboutPage');
  const tHeader = useTranslations('header');

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: t('title'), path: '/about' },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <JsonLd data={breadcrumbs} />
      <Header logoVariant="dark" />

      <main className="flex-1 py-12 md:py-16">
        <Container size="lg">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-h1 mb-4 text-foreground">{t('heading')}</h1>
            <p className="text-body mx-auto max-w-2xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* Section 1: Berlin */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-h2 mb-4 text-foreground">
                  {t('sections.berlin.heading')}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t('sections.berlin.content')}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=Berlin+Cycling+Culture"
                  alt={t('sections.berlin.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* Section 2: Andes */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Image - Left on desktop */}
              <div className="relative h-64 lg:h-auto lg:order-1">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=Colombian+Andes"
                  alt={t('sections.andes.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                  unoptimized
                />
              </div>

              {/* Text Content - Right on desktop */}
              <div className="flex flex-col justify-center lg:order-2">
                <h2 className="text-h2 mb-4 text-foreground">
                  {t('sections.andes.heading')}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t('sections.andes.content')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: The Journey */}
          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-h2 mb-4 text-foreground">
                  {t('sections.journey.heading')}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {t('sections.journey.content')}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://placehold.co/600x400/e2b71f/1b1b1b?text=The+Journey"
                  alt={t('sections.journey.imageAlt')}
                  fill
                  className="rounded-lg object-cover shadow-md"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* Section 4: CTA */}
          <section className="mb-12">
            <div className="rounded-lg border border-border bg-white p-8 text-center shadow-md md:p-12">
              <h2 className="text-h2 mb-4 text-foreground">
                {t('sections.cta.heading')}
              </h2>
              <p className="text-body mx-auto mb-6 max-w-2xl text-muted-foreground">
                {t('sections.cta.content')}
              </p>
              <Link href="/#waitlist">
                <Button variant="primary" size="lg">
                  {t('sections.cta.buttonText')}
                </Button>
              </Link>
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
