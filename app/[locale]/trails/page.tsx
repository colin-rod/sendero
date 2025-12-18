import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { getAllTrailSummaries } from '@/lib/data/trails';
import { TrailCard } from '@/components/features/trails/TrailCard';
import { getDifficultyBadgeProps } from '@/lib/utils/difficulty';

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
        <section className="py-20 md:py-32">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('title')}</h1>
              <p className="text-h3 text-muted-foreground mb-8">{t('subtitle')}</p>
              <p className="text-body text-muted-foreground">{t('description')}</p>
            </div>
          </Container>
        </section>

        {/* Master SVG Illustration Placeholder */}
        <section className="py-20 md:py-32 bg-muted/50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[16/9] bg-white border-2 border-border rounded-lg flex items-center justify-center shadow-sm">
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
                  difficultyBadgeProps={getDifficultyBadgeProps(trail.difficulty)}
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
