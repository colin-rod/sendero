import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates } from '@/lib/seo/canonical';
import { mtbReise } from '@/lib/data/mtbReisen';
import { MtbReisenHero } from '@/components/features/mtb-reisen/MtbReisenHero';
import { MtbReisenRegion } from '@/components/features/mtb-reisen/MtbReisenRegion';
import { MtbReisenFacts } from '@/components/features/mtb-reisen/MtbReisenFacts';
import { MtbReisenItinerary, type ItineraryDay } from '@/components/features/mtb-reisen/MtbReisenItinerary';
import { MtbReisenFaq } from '@/components/features/mtb-reisen/MtbReisenFaq';
import { MtbReisenGallery } from '@/components/features/mtb-reisen/MtbReisenGallery';
import { MtbReisenInclusions } from '@/components/features/mtb-reisen/MtbReisenInclusions';
import { MtbReisenCTA } from '@/components/features/mtb-reisen/MtbReisenCTA';

const PAGE_PATH = '/mtb-reisen';

const SECTION_IDS = {
  region: 'region',
  facts: 'auf-einen-blick',
  itinerary: 'tag-fuer-tag',
  faq: 'fragen',
} as const;

interface DayCopy {
  title: string;
  text: string;
  note?: string;
}

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
      images: [{ url: mtbReise.images.hero, alt: t('title') }],
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

  const trip = mtbReise;

  const breadcrumbs = breadcrumbSchema(locale, [
    { name: tHeader('brandName'), path: '' },
    { name: tHeader('nav.mtbReisen'), path: PAGE_PATH },
  ]);

  const priceFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: trip.currency,
    maximumFractionDigits: 0,
  });

  const dayCopy = t.raw('itinerary.days') as Record<string, DayCopy>;
  const days: ItineraryDay[] = trip.days.map((day) => {
    const copy = dayCopy[day.key];
    const stats =
      day.distanceKm > 0
        ? [t('itinerary.stats', { km: day.distanceKm, hm: day.elevationGainM }), copy.note]
            .filter(Boolean)
            .join(' · ')
        : undefined;

    return {
      key: day.key,
      nineDaysOnly: day.nineDaysOnly,
      image: day.image,
      title: copy.title,
      text: copy.text,
      stats,
    };
  });

  const prices = trip.variants.map((variant) =>
    t('hero.priceLine', { price: priceFormatter.format(variant.priceFrom), days: variant.days })
  );

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={breadcrumbs} />
      <Header />
      <main id="main-content">
        <MtbReisenHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          text={t('hero.text')}
          prices={prices}
          priceNote={t('hero.priceNote', { price: priceFormatter.format(trip.singleSupplement) })}
          secondaryCta={t('hero.secondaryCta')}
          secondaryHref={`#${SECTION_IDS.region}`}
          heroImage={trip.images.hero}
        />

        <MtbReisenRegion
          id={SECTION_IDS.region}
          eyebrow={t('region.eyebrow')}
          heading={t('region.heading')}
          paragraphs={t.raw('region.paragraphs') as string[]}
          image={trip.images.region}
          imageAlt={t('region.imageAlt')}
        />

        <MtbReisenFacts
          id={SECTION_IDS.facts}
          heading={t('facts.heading')}
          facts={t.raw('facts.items') as string[]}
        />

        <MtbReisenItinerary
          id={SECTION_IDS.itinerary}
          heading={t('itinerary.heading')}
          intro={t('itinerary.intro')}
          dayLabel={t('itinerary.dayLabel')}
          days={days}
        />

        <MtbReisenFaq
          id={SECTION_IDS.faq}
          eyebrow={t('faq.eyebrow')}
          heading={t('faq.heading')}
          items={t.raw('faq.items') as { question: string; paragraphs: string[] }[]}
          ctaQuestion={t('faq.ctaQuestion')}
          ctaLink={t('faq.ctaLink')}
          faqPageLink={t('faq.faqPageLink')}
        />

        <MtbReisenGallery
          heading={t('gallery.heading')}
          items={t.raw('gallery.items') as { caption: string; alt: string }[]}
          images={trip.images.gallery}
        />

        <MtbReisenInclusions
          includedHeading={t('inclusions.includedHeading')}
          notIncludedHeading={t('inclusions.notIncludedHeading')}
          includedItems={t.raw('inclusions.includedItems') as string[]}
          notIncludedItems={t.raw('inclusions.notIncludedItems') as string[]}
        />

        <MtbReisenCTA
          heading={t('cta.heading')}
          text={t('cta.text')}
          buttonText={t('cta.button')}
          image={trip.images.cta}
        />
      </main>
      <Footer />
    </div>
  );
}
