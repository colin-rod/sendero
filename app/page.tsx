import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { WaitlistForm } from '@/components/features/waitlist/WaitlistForm';
import { Bike, Leaf, Coffee, Globe, Users, Mountain, Backpack } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary-50 via-accent-50/30 to-white py-20 md:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Discover Colombia's Coffee Region
                  <span className="block text-primary-600">
                    One Pedal at a Time
                  </span>
                </h1>
                <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                  Beginner-friendly, sustainable hike & bike tours through
                  Pereira's stunning landscapes. E-bikes, women-only groups, and
                  authentic coffee farm experiences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <Bike className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium">E-Bikes Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <Leaf className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium">
                      Eco-Conscious Tours
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100">
                      <Coffee className="h-5 w-5 text-accent-600" />
                    </div>
                    <span className="text-sm font-medium">Coffee Farm Visits</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl lg:h-[500px]">
                <Image
                  src="/hero-coffee-region.jpg"
                  alt="Lush green rolling hills of Colombia's Coffee Region near Pereira"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Join the waitlist today and be the first to know when tours open
                up. Simple, easy, and no commitment required.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-3xl text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Sign Up</h3>
                <p className="text-muted-foreground">
                  Fill out the quick form below with your email and tour
                  preferences.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-3xl text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Stay Tuned</h3>
                <p className="text-muted-foreground">
                  We'll keep you updated as we finalize tour dates and packages.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-3xl text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Book Your Adventure</h3>
                <p className="text-muted-foreground">
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
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Perfect For
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Our tours are designed for everyone, from complete beginners to
                moderate cyclists looking for an authentic Colombian experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Bike className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Beginner Cyclists</h3>
                <p className="text-muted-foreground">
                  Never biked long distances? No problem. Our e-bikes and gentle
                  routes make it easy for anyone to enjoy.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Globe className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Eco-Conscious Travelers
                </h3>
                <p className="text-muted-foreground">
                  Sustainable tourism that respects local communities and the
                  environment.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Coffee className="h-10 w-10 text-accent-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Coffee Lovers</h3>
                <p className="text-muted-foreground">
                  Experience authentic coffee farm visits and learn from local
                  farmers.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Users className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Women-Only Groups</h3>
                <p className="text-muted-foreground">
                  Safe, supportive group tours designed specifically for women
                  travelers.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Mountain className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Nature Enthusiasts</h3>
                <p className="text-muted-foreground">
                  Explore stunning landscapes, cloud forests, and mountain
                  trails.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Backpack className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Weekend Adventurers
                </h3>
                <p className="text-muted-foreground">
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
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                  Join the Waitlist
                </h2>
                <p className="text-lg text-muted-foreground">
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
