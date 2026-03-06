import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import HeroVideo from '@/components/HeroVideo';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollReveal from '@/components/ScrollReveal';
import BottomEmailCapture from '@/components/BottomEmailCapture';
import { TourGrid } from '@/components/features/tourGrid/TourGrid';
import { TrailsMapSection } from '@/components/features/trailsMap/TrailsMapSection';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tHeroIntro = useTranslations('heroIntro');
  const tWaitlist = useTranslations('waitlist');
  const tTourGrid = useTranslations('tourGrid');

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoVariant="white" />
      <main id="main-content" className="flex-1">
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen">
          {/* Background Video */}
          <HeroVideo />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <Image
              src="/Logo White.svg"
              alt="Sendero"
              width={96}
              height={96}
              className="mb-8"
              priority
            />
            <h1 className="text-h1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-3xl">
              {tHero('title')}
            </h1>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Hero Intro Section */}
        <ScrollReveal>
          <section className="flex h-[454px] flex-col items-center justify-center gap-[34px] self-stretch bg-[#232323] px-16 pb-[58px] pt-16">
            <div className="text-center max-w-4xl">
              <p
                className="text-[32px] leading-[40px] font-medium text-center font-['Helvetica Neue']"
                style={{ color: 'var(--Text-Text-White, #FFF)' }}
              >
                {tHeroIntro('subtitle')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Tour Grid Section */}
        <ScrollReveal>
          <section className="bg-white py-16 md:py-24">
            <Container>
              <TourGrid
                heading={tTourGrid('heading')}
                subheading={tTourGrid('subheading')}
                cards={[
                  {
                    id: 'tigre',
                    title: tTourGrid('cards.tigre'),
                    imageSrc: '/tours/sendero-tigre.png',
                    imageAlt: tTourGrid('cards.tigre'),
                  },
                  {
                    id: 'cafe',
                    title: tTourGrid('cards.cafe'),
                    imageSrc: '/tours/sendero_cafe.jpg',
                    imageAlt: tTourGrid('cards.cafe'),
                  },
                  {
                    id: 'agua',
                    title: tTourGrid('cards.agua'),
                    imageSrc: '/tours/sendero_agua.jpg',
                    imageAlt: tTourGrid('cards.agua'),
                  },
                  {
                    id: 'cacao',
                    title: tTourGrid('cards.cacao'),
                    imageSrc: '/tours/sendero_cacao.jpg',
                    imageAlt: tTourGrid('cards.cacao'),
                  },
                  {
                    id: 'volcan',
                    title: tTourGrid('cards.volcan'),
                    imageSrc: '/tours/sendero_volcan.jpeg',
                    imageAlt: tTourGrid('cards.volcan'),
                  },
                  {
                    id: 'paramo',
                    title: tTourGrid('cards.paramo'),
                    imageSrc: '/tours/sendero_paramo.jpg',
                    imageAlt: tTourGrid('cards.paramo'),
                  },
                  {
                    id: 'guadua',
                    title: tTourGrid('cards.guadua'),
                    imageSrc: '/tours/sendero_guadua.webp',
                    imageAlt: tTourGrid('cards.guadua'),
                  },
                  {
                    id: 'oro',
                    title: tTourGrid('cards.oro'),
                    imageSrc: '/tours/sendero_oro.png',
                    imageAlt: tTourGrid('cards.oro'),
                  },
                  {
                    id: 'luminoso',
                    title: tTourGrid('cards.luminoso'),
                    imageSrc: '/tours/sendero_luminoso.jpg',
                    imageAlt: tTourGrid('cards.luminoso'),
                  },
                ]}
              />
            </Container>
          </section>
        </ScrollReveal>

        {/* Trails Map Section - full-bleed, no wrapper */}
        <TrailsMapSection
          trails={[
            { name: 'Sendero del Tigre', gpxPath: '/gpx/sendero-del-tigre.gpx' },
            { name: 'Sendero del Café', gpxPath: '/gpx/sendero-del-cafe.gpx' },
            { name: 'Sendero del Agua', gpxPath: '/gpx/sendero-del-agua.gpx' },
            { name: 'Sendero del Cacao', gpxPath: '/gpx/sendero-del-cacao.gpx' },
            { name: 'Sendero del Volcán', gpxPath: '/gpx/sendero-del-volcan.gpx' },
            { name: 'Sendero del Páramo', gpxPath: '/gpx/sendero-del-paramo.gpx' },
            { name: 'Sendero de la Guadua', gpxPath: '/gpx/sendero-de-la-guadua.gpx' },
            { name: 'Sendero del Oro', gpxPath: '/gpx/sendero-del-oro.gpx' },
            { name: 'Sendero Luminoso', gpxPath: '/gpx/sendero-luminoso.gpx' },
          ]}
        />

        {/* Simplified Waitlist Section - Bottom of Page */}
        <ScrollReveal delay={200}>
          <section className="relative py-20 md:py-32">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/hero-poster.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <Container className="relative z-10 text-center">
              <h2 className="text-h2 text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {tWaitlist('becomeAPioneer')}
              </h2>
              <p className="mb-8 text-h3 leading-none text-[#F2F2F7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {tWaitlist('nextDate')}
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
