import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { senderoDelTigre } from '@/lib/data/trails';
import { TrailHero } from '@/components/features/trails/TrailHero';
import { TrailStory } from '@/components/features/trails/TrailStory';
import { TrailMap } from '@/components/features/trails/TrailMap';
import { ExperiencesGrid } from '@/components/features/trails/ExperiencesGrid';
import { WaypointsTimeline } from '@/components/features/trails/WaypointsTimeline';
import { ElevationChart } from '@/components/features/trails/ElevationChart';
import { TrailGallery } from '@/components/features/trails/TrailGallery';
import { TestimonialBand } from '@/components/features/trails/TestimonialBand';
import { TrailBookingCTA } from '@/components/features/trails/TrailBookingCTA';
import { BackToTrails } from '@/components/features/trails/BackToTrails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'trails.senderoDelTigre',
  });

  return {
    title: `${t('name')} - Sendero`,
    description: t('subtitle'),
  };
}

export default async function SenderoDelTigrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'trails.senderoDelTigre',
  });

  const trail = senderoDelTigre;

  // Map translation keys to experience data
  const experienceKeyMap: Record<string, string> = {
    'stream-crossing': 'stream',
    'bamboo-forest': 'bamboo',
    'farm-lunch': 'farm',
    'mountain-vista': 'vista',
  };

  const translatedExperiences = trail.experiences.map((exp) => {
    const expKey = experienceKeyMap[exp.id] || exp.id;
    return {
      ...exp,
      title: t(`experiences.${expKey}.title`),
      description: t(`experiences.${expKey}.description`),
    };
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content">
        {/* 1. Hero Section */}
        <TrailHero
          name={t('name')}
          subtitle={t('subtitle')}
          difficulty={trail.difficulty}
          stats={trail.stats}
          heroImage={trail.images.hero}
          difficultyLabel={t(`difficulty.${trail.difficulty.toLowerCase()}`)}
          distanceLabel={t('stats.distance')}
          durationLabel={t('stats.duration')}
          elevationLabel={t('stats.elevation')}
          elevationGainLabel={t('stats.elevationGain')}
          elevationLossLabel={t('stats.elevationLoss')}
        />

        {/* 2. Story Block */}
        <TrailStory
          paragraph1={t('story.paragraph1')}
          paragraph2={t('story.paragraph2')}
        />

        {/* 3. Mini-Map Illustration */}
        <TrailMap trailName={t('name')} />

        {/* 4. Experiences Grid */}
        <ExperiencesGrid
          heading={t('experiences.heading')}
          experiences={translatedExperiences}
          locationLabel={t('experiences.stream.location')}
        />

        {/* 5. Waypoints Timeline */}
        <WaypointsTimeline
          heading={t('waypoints.heading')}
          waypoints={trail.waypoints}
        />

        {/* 6. Elevation Chart */}
        <ElevationChart
          heading={t('elevation.heading')}
          profile={trail.elevationProfile}
          highestLabel={t('elevation.highest')}
          lowestLabel={t('elevation.lowest')}
          metersLabel={t('elevation.meters')}
        />

        {/* 7. Gallery */}
        <TrailGallery
          heading={t('gallery.heading')}
          images={trail.images.gallery}
          trailName={t('name')}
        />

        {/* 8. Testimonials */}
        <TestimonialBand
          heading={t('testimonials.heading')}
          testimonials={trail.testimonials}
        />

        {/* 9. Booking CTA */}
        <TrailBookingCTA
          heading={t('booking.heading')}
          buttonText={t('booking.button')}
          subtext={t('booking.subtext')}
          placeholder={t('booking.placeholder')}
        />

        {/* 10. Back to All Trails Link */}
        <BackToTrails text={t('backToAll')} />
      </main>
      <Footer />
    </div>
  );
}
