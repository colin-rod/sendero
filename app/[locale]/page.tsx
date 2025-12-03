import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { NumberBadge } from '@/components/ui/Badge';
import { WaitlistForm } from '@/components/features/waitlist/WaitlistForm';
import HeroVideo from '@/components/HeroVideo';
import HeroEmailCapture from '@/components/HeroEmailCapture';
import { Bike, Leaf, Coffee, Globe, Users, Mountain, Backpack } from 'lucide-react';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tHowItWorks = useTranslations('howItWorks');
  const tPerfectFor = useTranslations('perfectFor');
  const tWaitlist = useTranslations('waitlist');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] lg:h-[800px]">
          {/* Background Video */}
          <HeroVideo />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="mb-6 text-h1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {tHero('title')}
                  <span className="block text-primary-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {tHero('subtitle')}
                  </span>
                </h1>
                <p className="mb-8 text-body text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {tHero('description')}
                </p>
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                      <Bike className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {tHero('features.eBikes')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {tHero('features.ecoConscious')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                      <Coffee className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {tHero('features.coffeeFarm')}
                    </span>
                  </div>
                </div>
                {/* Hero Email Capture */}
                <HeroEmailCapture />
              </div>
            </Container>
          </div>
        </section>

        {/* How It Works Section */}
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

        {/* Who It's For Section */}
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

        {/* Waitlist Form Section */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-2xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-h2 text-foreground">
                  {tWaitlist('heading')}
                </h2>
                <p className="text-body text-muted-foreground">
                  {tWaitlist('description')}
                </p>
              </div>
              <WaitlistForm />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
