import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { getAllTrailSummaries } from '@/lib/data/trails';
import { TrailCard } from '@/components/features/trails/TrailCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trails.master' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TrailsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trails.master' });
  const tDifficulty = await getTranslations({
    locale,
    namespace: 'trails.senderoDelTigre.difficulty',
  });

  const trails = getAllTrailSummaries();

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800';
      case 'Challenging':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'Easy':
        return tDifficulty('easy');
      case 'Moderate':
        return tDifficulty('moderate');
      case 'Challenging':
        return tDifficulty('challenging');
      default:
        return level;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent-400/10">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-h1 mb-6">{t('title')}</h1>
              <p className="text-h3 text-muted-foreground mb-8">{t('subtitle')}</p>
              <p className="text-body text-muted-foreground">{t('description')}</p>
            </div>
          </Container>
        </section>

        {/* Master SVG Illustration Placeholder */}
        <section className="py-20 md:py-32 bg-accent-400/5">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[16/9] bg-background border-2 border-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-h3 text-muted-foreground mb-2">
                    All Routes Map
                  </p>
                  <p className="text-body text-muted-foreground">
                    Interactive master map showing all three trails coming soon
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Trail Cards */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {trails.map((trail) => (
                <TrailCard
                  key={trail.id}
                  id={trail.id}
                  slug={trail.slug}
                  name={trail.name}
                  thumbnail={trail.thumbnail}
                  difficulty={trail.difficulty}
                  difficultyLabel={getDifficultyLabel(trail.difficulty)}
                  difficultyColor={getDifficultyColor(trail.difficulty)}
                  distance={trail.distance}
                  duration={trail.duration}
                  distanceLabel={t('stats.distance')}
                  durationLabel={t('stats.duration')}
                  ctaText={t('cta')}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
