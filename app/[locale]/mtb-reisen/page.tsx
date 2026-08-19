import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates } from '@/lib/seo/canonical';
import { mtbReisenNueveTage } from '@/lib/data/mtbReisen';
import { MtbReisenHero } from '@/components/features/mtb-reisen/MtbReisenHero';
import { MtbReisenOverviewBar } from '@/components/features/mtb-reisen/MtbReisenOverviewBar';
import { MtbReisenIntro } from '@/components/features/mtb-reisen/MtbReisenIntro';
import { MtbReisenGallery } from '@/components/features/mtb-reisen/MtbReisenGallery';
import { MtbReisenInclusions } from '@/components/features/mtb-reisen/MtbReisenInclusions';
import { MtbReisenItinerary } from '@/components/features/mtb-reisen/MtbReisenItinerary';
import { MtbReisenCTA } from '@/components/features/mtb-reisen/MtbReisenCTA';

const PAGE_PATH = '/mtb-reisen';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mtbReisen.seo' });
  const alternates = buildAlternates(locale, PAGE_PATH);

  return {
    title: t('title'),
    description: t('description'),
    alternates,
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: alternates.canonical,
      type: 'article',
      images: [{ url: mtbReisenNueveTage.images.hero, alt: t('title') }],
    },
  };
}

export default async function MtbReisenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mtbReisen' });
  const tHeader = await getTranslations({ locale, namespace: 'header' });

  const trip = mtbReisenNueveTage;

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: tHeader('nav.mtbReisenNineDays'), path: PAGE_PATH },
  ]);

  const priceFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: trip.currency,
    maximumFractionDigits: 0,
  });
  const priceValue = `${t('intro.pricePrefix')} ${priceFormatter.format(trip.priceFrom)}`;

  const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const nextDates = trip.nextDates.map((iso) => {
    const [year, month] = iso.split('-').map(Number);
    return dateFormatter.format(new Date(year, month - 1, 1));
  });

  const dayCopy = t.raw('itinerary.days') as { title: string; description: string; meals: string }[];
  const categories = t.raw('inclusions.categories') as { title: string; items: string[] }[];
  const notIncludedItems = t.raw('inclusions.notIncludedItems') as string[];

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={breadcrumbs} />
      <Header logoVariant="white" />
      <main id="main-content">
        <MtbReisenHero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          heroImage={trip.images.hero}
        />

        <MtbReisenOverviewBar
          overview={t('overviewBar.overview')}
          included={t('overviewBar.included')}
          itinerary={t('overviewBar.itinerary')}
          dates={t('overviewBar.dates')}
        />

        <MtbReisenIntro
          backgroundImage={trip.images.introBackground}
          heading={t('intro.heading')}
          paragraph1={t('intro.paragraph1')}
          paragraph2={t('intro.paragraph2')}
          priceLabel={t('intro.priceLabel')}
          priceValue={priceValue}
          nextDatesLabel={t('intro.nextDatesLabel')}
          nextDates={nextDates}
          bookLabel={t('intro.bookLabel')}
          bookCta={t('intro.bookCta')}
        />

        <MtbReisenGallery images={trip.images.gallery} title={t('hero.title')} />

        <MtbReisenInclusions
          includedHeading={t('inclusions.includedHeading')}
          notIncludedHeading={t('inclusions.notIncludedHeading')}
          categories={categories}
          notIncludedItems={notIncludedItems}
        />

        <MtbReisenItinerary
          heading={t('itinerary.heading')}
          dayLabel={t('itinerary.dayLabel')}
          mealsIncludedLabel={t('itinerary.mealsIncludedLabel')}
          days={trip.days}
          dayCopy={dayCopy}
        />

        <MtbReisenCTA
          heading={t('cta.heading')}
          buttonText={t('cta.button')}
        />
      </main>
      <Footer />
    </div>
  );
}
