import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import HeroVideo from '@/components/HeroVideo';
import ScrollReveal from '@/components/ScrollReveal';
import BottomEmailCapture from '@/components/BottomEmailCapture';
import { TourGrid } from '@/components/features/tourGrid/TourGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates, ogImages } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = buildAlternates(locale, '');
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

export default function HomePage() {
  const locale = useLocale();
  const tHero = useTranslations('hero');
  const tHeroIntro = useTranslations('heroIntro');
  const tWaitlist = useTranslations('waitlist');
  const tTourGrid = useTranslations('tourGrid');
  const tHeader = useTranslations('header');
  const tTrails = useTranslations('trails.master');

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
  ]);
  // ItemList of all surfaced tours so AI/SEO crawlers can discover trail names.
  const tourCardKeys = ['guadua', 'cafe', 'agua', 'volcan', 'cacao', 'paramo', 'tigre', 'oro', 'luminoso'];
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tTrails('title'),
    itemListElement: tourCardKeys.map((key, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tTourGrid(`cards.${key}.name`),
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={[breadcrumbs, itemList]} />
      <Header logoVariant="dark" />
      <main id="main-content" className="flex-1">
        {/* Hero Section - Full Screen */}
        <section className="relative min-h-[100dvh] bg-black flex flex-col hero-section">
          {/* Background Video */}
          <HeroVideo />

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4">
            <h1 className="text-h1 text-white max-w-3xl">
              {tHero('title')}
            </h1>
          </div>
        </section>

        {/* Hero Intro Section */}
        <ScrollReveal>
          <section className="flex flex-col items-center justify-center gap-8 self-stretch bg-[#232323] px-4 sm:px-8 lg:px-16 py-20">
            <div className="text-center max-w-4xl flex flex-col gap-2">
              <h2 className="text-h2 font-bold text-white">
                {tHeroIntro('heading')}
              </h2>
              <p className="text-h2 font-light text-white">
                {tHeroIntro('subheading')
                  .split(/\.\s+/)
                  .filter(Boolean)
                  .map((sentence, i, arr) => {
                    const trimmed = sentence.trim();
                    const needsPeriod = !trimmed.endsWith('.');
                    return (
                      <span key={i} className="block sm:inline">
                        {trimmed}
                        {needsPeriod ? '.' : ''}
                        {i < arr.length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
              </p>
            </div>
            <svg width="72" height="16" viewBox="0 0 72 16" fill="none" aria-hidden="true">
              <path
                d="M2 10 C10 2, 18 14, 26 10 C34 6, 42 2, 50 10 C58 14, 66 6, 70 10"
                stroke="#fff0bb"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="text-center max-w-2xl">
              <p className="text-lg leading-relaxed font-normal text-center text-white/90">
                {tHeroIntro('subtitle')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Tour Grid Section */}
        <ScrollReveal>
          <section className="bg-gray-100 py-16 md:py-24">
            <Container>
              <TourGrid
                cards={[
                  {
                    id: 'guadua',
                    title: tTourGrid('cards.guadua.name'),
                    imageSrc: '/tours/sendero_guadua.webp',
                    imageAlt: tTourGrid('cards.guadua.name'),
                    description: tTourGrid('cards.guadua.description'),
                    distance: tTourGrid('cards.guadua.distance'),
                    difficulty: tTourGrid('cards.guadua.difficulty'),
                    elevation: tTourGrid('cards.guadua.elevation'),
                    elevationGain: tTourGrid('cards.guadua.elevationGain'),
                  },
                  {
                    id: 'cafe',
                    title: tTourGrid('cards.cafe.name'),
                    imageSrc: '/tours/sendero_cafe.webp',
                    imageAlt: tTourGrid('cards.cafe.name'),
                    description: tTourGrid('cards.cafe.description'),
                    distance: tTourGrid('cards.cafe.distance'),
                    difficulty: tTourGrid('cards.cafe.difficulty'),
                    elevation: tTourGrid('cards.cafe.elevation'),
                    elevationGain: tTourGrid('cards.cafe.elevationGain'),
                  },
                  {
                    id: 'agua',
                    title: tTourGrid('cards.agua.name'),
                    imageSrc: '/tours/sendero_agua.webp',
                    imageAlt: tTourGrid('cards.agua.name'),
                    description: tTourGrid('cards.agua.description'),
                    distance: tTourGrid('cards.agua.distance'),
                    difficulty: tTourGrid('cards.agua.difficulty'),
                    elevation: tTourGrid('cards.agua.elevation'),
                    elevationGain: tTourGrid('cards.agua.elevationGain'),
                  },
                  {
                    id: 'volcan',
                    title: tTourGrid('cards.volcan.name'),
                    imageSrc: '/tours/sendero_volcan.webp',
                    imageAlt: tTourGrid('cards.volcan.name'),
                    description: tTourGrid('cards.volcan.description'),
                    distance: tTourGrid('cards.volcan.distance'),
                    difficulty: tTourGrid('cards.volcan.difficulty'),
                    elevation: tTourGrid('cards.volcan.elevation'),
                    elevationGain: tTourGrid('cards.volcan.elevationGain'),
                  },
                  {
                    id: 'cacao',
                    title: tTourGrid('cards.cacao.name'),
                    imageSrc: '/tours/sendero_cacao.webp',
                    imageAlt: tTourGrid('cards.cacao.name'),
                    description: tTourGrid('cards.cacao.description'),
                    distance: tTourGrid('cards.cacao.distance'),
                    difficulty: tTourGrid('cards.cacao.difficulty'),
                    elevation: tTourGrid('cards.cacao.elevation'),
                    elevationGain: tTourGrid('cards.cacao.elevationGain'),
                  },
                  {
                    id: 'paramo',
                    title: tTourGrid('cards.paramo.name'),
                    imageSrc: '/tours/sendero_paramo.webp',
                    imageAlt: tTourGrid('cards.paramo.name'),
                    description: tTourGrid('cards.paramo.description'),
                    distance: tTourGrid('cards.paramo.distance'),
                    difficulty: tTourGrid('cards.paramo.difficulty'),
                    elevation: tTourGrid('cards.paramo.elevation'),
                    elevationGain: tTourGrid('cards.paramo.elevationGain'),
                  },
                  {
                    id: 'tigre',
                    title: tTourGrid('cards.tigre.name'),
                    imageSrc: '/tours/sendero-tigre.webp',
                    imageAlt: tTourGrid('cards.tigre.name'),
                    description: tTourGrid('cards.tigre.description'),
                    distance: tTourGrid('cards.tigre.distance'),
                    difficulty: tTourGrid('cards.tigre.difficulty'),
                    elevation: tTourGrid('cards.tigre.elevation'),
                    elevationGain: tTourGrid('cards.tigre.elevationGain'),
                  },
                  {
                    id: 'oro',
                    title: tTourGrid('cards.oro.name'),
                    imageSrc: '/tours/sendero_oro.webp',
                    imageAlt: tTourGrid('cards.oro.name'),
                    description: tTourGrid('cards.oro.description'),
                    distance: tTourGrid('cards.oro.distance'),
                    difficulty: tTourGrid('cards.oro.difficulty'),
                    elevation: tTourGrid('cards.oro.elevation'),
                    elevationGain: tTourGrid('cards.oro.elevationGain'),
                  },
                  {
                    id: 'luminoso',
                    title: tTourGrid('cards.luminoso.name'),
                    imageSrc: '/tours/sendero_luminoso.webp',
                    imageAlt: tTourGrid('cards.luminoso.name'),
                    description: tTourGrid('cards.luminoso.description'),
                    distance: tTourGrid('cards.luminoso.distance'),
                    difficulty: tTourGrid('cards.luminoso.difficulty'),
                    elevation: tTourGrid('cards.luminoso.elevation'),
                    elevationGain: tTourGrid('cards.luminoso.elevationGain'),
                  },
                ]}
              />
            </Container>
          </section>
        </ScrollReveal>

        {/* Simplified Waitlist Section - Bottom of Page */}
        <ScrollReveal delay={200}>
          <section className="relative py-40 md:py-56 cta-section">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/cta-pioneer.png"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <Container className="relative z-10 text-center">
              <h2 className="text-h1 font-bold text-white mb-4">
                {tWaitlist('becomeAPioneer')}
              </h2>
              <p className="mb-8 text-h3 font-light leading-8 tracking-wide text-[#F2F2F2]">
                {tWaitlist('ctaPrompt')}
              </p>

              {/* Simplified email form */}
              <div className="max-w-md mx-auto">
                <BottomEmailCapture />
              </div>
            </Container>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
