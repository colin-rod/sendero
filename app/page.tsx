import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { NumberBadge } from '@/components/ui/Badge';
import { WaitlistForm } from '@/components/features/waitlist/WaitlistForm';
import HeroVideo from '@/components/HeroVideo';
import { Bike, Leaf, Coffee, Globe, Users, Mountain, Backpack } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] lg:h-[800px]">
          {/* Background Video */}
          <HeroVideo />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <Container>
              <div className="max-w-3xl">
                <h1 className="mb-6 text-h1 text-white">
                  Discover Colombia's Coffee Region
                  <span className="block text-primary-400">
                    One Pedal at a Time
                  </span>
                </h1>
                <p className="mb-8 text-body text-white/90">
                  Beginner-friendly, sustainable hike & bike tours through
                  Pereira's stunning landscapes. E-bikes, women-only groups, and
                  authentic coffee farm experiences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Bike className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white">E-Bikes Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white">
                      Eco-Conscious Tours
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Coffee className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-body text-white">Coffee Farm Visits</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-h2 text-foreground">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-body text-muted-foreground">
                Join the waitlist today and be the first to know when tours open
                up. Simple, easy, and no commitment required.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <NumberBadge variant="primary" size="xl" className="mb-4 shadow-md">
                  1
                </NumberBadge>
                <h3 className="mb-2 text-h2 text-foreground">Sign Up</h3>
                <p className="text-body text-muted-foreground">
                  Fill out the quick form below with your email and tour
                  preferences.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <NumberBadge variant="accent" size="xl" className="mb-4 shadow-md">
                  2
                </NumberBadge>
                <h3 className="mb-2 text-h2 text-foreground">Stay Tuned</h3>
                <p className="text-body text-muted-foreground">
                  We'll keep you updated as we finalize tour dates and packages.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <NumberBadge variant="primary" size="xl" className="mb-4 shadow-md">
                  3
                </NumberBadge>
                <h3 className="mb-2 text-h2 text-foreground">Book Your Adventure</h3>
                <p className="text-body text-muted-foreground">
                  Be among the first to book when tours officially launch.
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
                Perfect For
              </h2>
              <p className="mx-auto max-w-2xl text-body text-muted-foreground">
                Our tours are designed for everyone, from complete beginners to
                moderate cyclists looking for an authentic Colombian experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Bike className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-h2">Beginner Cyclists</h3>
                <p className="text-body text-muted-foreground">
                  Never biked long distances? No problem. Our e-bikes and gentle
                  routes make it easy for anyone to enjoy.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Globe className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-h2">
                  Eco-Conscious Travelers
                </h3>
                <p className="text-body text-muted-foreground">
                  Sustainable tourism that respects local communities and the
                  environment.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Coffee className="h-10 w-10 text-accent-600" />
                </div>
                <h3 className="mb-2 text-h2">Coffee Lovers</h3>
                <p className="text-body text-muted-foreground">
                  Experience authentic coffee farm visits and learn from local
                  farmers.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Users className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-h2">Women-Only Groups</h3>
                <p className="text-body text-muted-foreground">
                  Safe, supportive group tours designed specifically for women
                  travelers.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Mountain className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-h2">Nature Enthusiasts</h3>
                <p className="text-body text-muted-foreground">
                  Explore stunning landscapes, cloud forests, and mountain
                  trails.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Backpack className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-h2">
                  Weekend Adventurers
                </h3>
                <p className="text-body text-muted-foreground">
                  Short trips perfect for those with limited time but big
                  wanderlust.
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
                  Join the Waitlist
                </h2>
                <p className="text-body text-muted-foreground">
                  Be the first to know when tours open up. No spam, just
                  adventure.
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
