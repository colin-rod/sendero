import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NumberBadge } from '@/components/ui/Badge';
import HeroVideo from '@/components/HeroVideo';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollReveal from '@/components/ScrollReveal';
import BottomEmailCapture from '@/components/BottomEmailCapture';
import { CarouselSection } from '@/components/features/carousel/CarouselSection';
import { Bike, Coffee, Globe, Users, Mountain, Backpack } from 'lucide-react';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tCarousel = useTranslations('carousel');
  const tHowItWorks = useTranslations('howItWorks');
  const tPerfectFor = useTranslations('perfectFor');
  const tWaitlist = useTranslations('waitlist');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen">
          {/* Background Video */}
          <HeroVideo />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="mb-6 text-h1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {tHero('title')}
                </h1>
                <p className="mb-12 text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-4xl mx-auto">
                  {tHero('subtitle')}
                </p>
                {/* Discover Trails Button */}
                <Link href="/trails" className="inline-block">
                  <Button variant="hero-cta" size="lg">
                    {tHero('discoverTrails')}
                  </Button>
                </Link>
              </div>
            </Container>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Carousel Section - Eyebrow + Heading + Description + Images */}
        <ScrollReveal>
          <section className="py-20 md:py-32 bg-white">
            <CarouselSection
              eyebrow={tCarousel('eyebrow')}
              heading={tCarousel('heading')}
              description={tCarousel('description')}
              images={[
                '/carousel/placeholder-1.jpg',
                '/carousel/placeholder-2.jpg',
                '/carousel/placeholder-3.jpg',
              ]}
            />
          </section>
        </ScrollReveal>

        {/* How It Works Section */}
        <ScrollReveal>
          <section id="how-it-works" className="py-20 md:py-32">
            <Container>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-h2 text-foreground">
                  {tHowItWorks('heading')}
                </h2>
                <p className="mx-auto max-w-2xl text-body text-muted-foreground">
                  {tHowItWorks('description')}
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                  <NumberBadge variant="primary" size="xl" className="mb-4 shadow-md">
                    1
                  </NumberBadge>
                  <h3 className="mb-2 text-h3 text-foreground">{tHowItWorks('steps.signUp.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tHowItWorks('steps.signUp.description')}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                  <NumberBadge variant="accent" size="xl" className="mb-4 shadow-md">
                    2
                  </NumberBadge>
                  <h3 className="mb-2 text-h3 text-foreground">{tHowItWorks('steps.stayTuned.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tHowItWorks('steps.stayTuned.description')}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                  <NumberBadge variant="primary" size="xl" className="mb-4 shadow-md">
                    3
                  </NumberBadge>
                  <h3 className="mb-2 text-h3 text-foreground">{tHowItWorks('steps.bookAdventure.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tHowItWorks('steps.bookAdventure.description')}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </ScrollReveal>

        {/* Who It's For Section */}
        <ScrollReveal delay={100}>
          <section id="about" className="bg-muted/50 py-20 md:py-32">
            <Container>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-h2 text-foreground">
                  {tPerfectFor('heading')}
                </h2>
                <p className="mx-auto max-w-2xl text-body text-muted-foreground">
                  {tPerfectFor('description')}
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Bike className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-h3">{tPerfectFor('personas.beginnerCyclists.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.beginnerCyclists.description')}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Globe className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-h3">
                    {tPerfectFor('personas.ecoTravelers.title')}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.ecoTravelers.description')}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Coffee className="h-10 w-10 text-accent-600" />
                  </div>
                  <h3 className="mb-2 text-h3">{tPerfectFor('personas.coffeeLovers.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.coffeeLovers.description')}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Users className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-h3">{tPerfectFor('personas.womenGroups.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.womenGroups.description')}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Mountain className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-h3">{tPerfectFor('personas.natureEnthusiasts.title')}</h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.natureEnthusiasts.description')}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4">
                    <Backpack className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mb-2 text-h3">
                    {tPerfectFor('personas.weekendAdventurers.title')}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {tPerfectFor('personas.weekendAdventurers.description')}
                  </p>
                </div>
              </div>
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
              <h2 className="text-h2 text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {tWaitlist('becomeAPioneer')}
              </h2>
              <p className="text-body text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {tWaitlist('stayInformed')}
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
