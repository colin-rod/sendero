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


export default function HomePage() {
  const tHero = useTranslations('hero');
  const tHeroIntro = useTranslations('heroIntro');
  const tWaitlist = useTranslations('waitlist');
  const tTourGrid = useTranslations('tourGrid');

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoVariant="dark" />
      <main id="main-content" className="flex-1">
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen">
          {/* Background Video */}
          <HeroVideo />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <Image
              src="/Logo Dark.svg"
              alt="Sendero"
              width={96}
              height={96}
              className="mb-8"
              priority
            />
            <h1 className="text-3xl md:text-h1 font-bold text-white max-w-3xl">
              {tHero('title')}
            </h1>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Hero Intro Section */}
        <ScrollReveal>
          <section className="flex flex-col items-center justify-center gap-8 self-stretch bg-[#232323] px-16 py-20">
            <div className="text-center max-w-4xl flex flex-col gap-2">
              <h2 className="text-xl md:text-h2 font-bold font-work-sans text-[#ffffff]">
                {tHeroIntro('heading')}
              </h2>
              <p className="text-xl md:text-h2 font-light font-work-sans text-[#ffffff]">
                {tHeroIntro('subheading')}
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
              <p className="text-lg leading-relaxed font-normal text-center font-work-sans text-white/90">
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
                    id: 'tigre',
                    title: tTourGrid('cards.tigre.name'),
                    imageSrc: '/tours/sendero-tigre.png',
                    imageAlt: tTourGrid('cards.tigre.name'),
                    description: tTourGrid('cards.tigre.description'),
                    distance: tTourGrid('cards.tigre.distance'),
                    difficulty: tTourGrid('cards.tigre.difficulty'),
                  },
                  {
                    id: 'cafe',
                    title: tTourGrid('cards.cafe.name'),
                    imageSrc: '/tours/sendero_cafe.jpg',
                    imageAlt: tTourGrid('cards.cafe.name'),
                    description: tTourGrid('cards.cafe.description'),
                    distance: tTourGrid('cards.cafe.distance'),
                    difficulty: tTourGrid('cards.cafe.difficulty'),
                  },
                  {
                    id: 'agua',
                    title: tTourGrid('cards.agua.name'),
                    imageSrc: '/tours/sendero_agua.jpg',
                    imageAlt: tTourGrid('cards.agua.name'),
                    description: tTourGrid('cards.agua.description'),
                    distance: tTourGrid('cards.agua.distance'),
                    difficulty: tTourGrid('cards.agua.difficulty'),
                  },
                  {
                    id: 'cacao',
                    title: tTourGrid('cards.cacao.name'),
                    imageSrc: '/tours/sendero_cacao.jpg',
                    imageAlt: tTourGrid('cards.cacao.name'),
                    description: tTourGrid('cards.cacao.description'),
                    distance: tTourGrid('cards.cacao.distance'),
                    difficulty: tTourGrid('cards.cacao.difficulty'),
                  },
                  {
                    id: 'volcan',
                    title: tTourGrid('cards.volcan.name'),
                    imageSrc: '/tours/sendero_volcan.jpeg',
                    imageAlt: tTourGrid('cards.volcan.name'),
                    description: tTourGrid('cards.volcan.description'),
                    distance: tTourGrid('cards.volcan.distance'),
                    difficulty: tTourGrid('cards.volcan.difficulty'),
                  },
                  {
                    id: 'paramo',
                    title: tTourGrid('cards.paramo.name'),
                    imageSrc: '/tours/sendero_paramo.jpg',
                    imageAlt: tTourGrid('cards.paramo.name'),
                    description: tTourGrid('cards.paramo.description'),
                    distance: tTourGrid('cards.paramo.distance'),
                    difficulty: tTourGrid('cards.paramo.difficulty'),
                  },
                  {
                    id: 'guadua',
                    title: tTourGrid('cards.guadua.name'),
                    imageSrc: '/tours/sendero_guadua.webp',
                    imageAlt: tTourGrid('cards.guadua.name'),
                    description: tTourGrid('cards.guadua.description'),
                    distance: tTourGrid('cards.guadua.distance'),
                    difficulty: tTourGrid('cards.guadua.difficulty'),
                  },
                  {
                    id: 'oro',
                    title: tTourGrid('cards.oro.name'),
                    imageSrc: '/tours/sendero_oro.png',
                    imageAlt: tTourGrid('cards.oro.name'),
                    description: tTourGrid('cards.oro.description'),
                    distance: tTourGrid('cards.oro.distance'),
                    difficulty: tTourGrid('cards.oro.difficulty'),
                  },
                  {
                    id: 'luminoso',
                    title: tTourGrid('cards.luminoso.name'),
                    imageSrc: '/tours/sendero_luminoso.png',
                    imageAlt: tTourGrid('cards.luminoso.name'),
                    description: tTourGrid('cards.luminoso.description'),
                    distance: tTourGrid('cards.luminoso.distance'),
                    difficulty: tTourGrid('cards.luminoso.difficulty'),
                  },
                ]}
              />
            </Container>
          </section>
        </ScrollReveal>

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
              <h2 className="text-h2 text-white mb-4">
                {tWaitlist('becomeAPioneer')}
              </h2>
              <p className="mb-8 text-h3 leading-none text-[#F2F2F7] ">
                {tWaitlist('nextDate')}
              </p>
              <p className="mb-8 text-h3 leading-none text-[#F2F2F7] ">
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
