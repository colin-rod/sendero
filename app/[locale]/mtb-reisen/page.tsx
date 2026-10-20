import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo/jsonLd';
import { buildAlternates } from '@/lib/seo/canonical';
import { mtbReise } from '@/lib/data/mtbReisen';
import { MtbReisenHero } from '@/components/features/mtb-reisen/MtbReisenHero';
import { MtbReisenOverviewBar } from '@/components/features/mtb-reisen/MtbReisenOverviewBar';
import { MtbReisenFacts } from '@/components/features/mtb-reisen/MtbReisenFacts';
import { MtbReisenLandscapes } from '@/components/features/mtb-reisen/MtbReisenLandscapes';
import { MtbReisenItinerary, type ItineraryDay } from '@/components/features/mtb-reisen/MtbReisenItinerary';
import { MtbReisenFit } from '@/components/features/mtb-reisen/MtbReisenFit';
import { MtbReisenSafety } from '@/components/features/mtb-reisen/MtbReisenSafety';
import { MtbReisenCasaTacay } from '@/components/features/mtb-reisen/MtbReisenCasaTacay';
import { MtbReisenPricing } from '@/components/features/mtb-reisen/MtbReisenPricing';
import { MtbReisenInclusions } from '@/components/features/mtb-reisen/MtbReisenInclusions';
import { MtbReisenFaq } from '@/components/features/mtb-reisen/MtbReisenFaq';
import { MtbReisenCTA } from '@/components/features/mtb-reisen/MtbReisenCTA';

const PAGE_PATH = '/mtb-reisen';

const SECTION_IDS = {
  overview: 'ueberblick',
  itinerary: 'tag-fuer-tag',
  safety: 'sicherheit',
  price: 'preis',
  faq: 'faq',
} as const;

/** Sections hidden for now (overview bar, facts, landscapes, safety); flip to bring them back */
const SHOW_FULL_PAGE = false;

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

  const navLinks = [
    { label: t('nav.overview'), href: `#${SECTION_IDS.overview}` },
    { label: t('nav.itinerary'), href: `#${SECTION_IDS.itinerary}` },
    { label: t('nav.safety'), href: `#${SECTION_IDS.safety}` },
    { label: t('nav.price'), href: `#${SECTION_IDS.price}` },
    { label: t('nav.faq'), href: `#${SECTION_IDS.faq}` },
  ];

  const priceOptions = trip.variants.map((variant) => ({
    key: variant.key,
    title: t(`pricing.variants.${variant.key}.title`),
    price: priceFormatter.format(variant.priceFrom),
    text: t(`pricing.variants.${variant.key}.text`),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={breadcrumbs} />
      <Header />
      <main id="main-content">
        <MtbReisenHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          text={t('hero.text')}
          secondaryCta={t('hero.secondaryCta')}
          secondaryHref={`#${SECTION_IDS.itinerary}`}
          heroImage={trip.images.hero}
        />

        {SHOW_FULL_PAGE && (
          <>
            <MtbReisenOverviewBar ariaLabel={t('nav.ariaLabel')} links={navLinks} ctaLabel={t('nav.cta')} />

            <MtbReisenFacts
              id={SECTION_IDS.overview}
              heading={t('nav.overview')}
              facts={t.raw('facts.items') as string[]}
            />

            <MtbReisenLandscapes
              heading={t('landscapes.heading')}
              text={t('landscapes.text')}
              items={t.raw('landscapes.items') as string[]}
              images={trip.images.landscapes}
            />
          </>
        )}

        <MtbReisenItinerary
          id={SECTION_IDS.itinerary}
          heading={t('itinerary.heading')}
          intro={t('itinerary.intro')}
          dayLabel={t('itinerary.dayLabel')}
          days={days}
        />

        <MtbReisenFit
          heading={t('fit.heading')}
          blocks={[
            { title: t('fit.fitnessTitle'), text: t('fit.fitnessText') },
            { title: t('fit.techniqueTitle'), text: t('fit.techniqueText') },
          ]}
          yesHeading={t('fit.yesHeading')}
          yesItems={t.raw('fit.yesItems') as string[]}
          noHeading={t('fit.noHeading')}
          noItems={t.raw('fit.noItems') as string[]}
          cta={t('fit.cta')}
        />

        {SHOW_FULL_PAGE && (
          <MtbReisenSafety
            id={SECTION_IDS.safety}
            heading={t('safety.heading')}
            items={t.raw('safety.items') as { title: string; text: string }[]}
          />
        )}

        <MtbReisenCasaTacay
          heading={t('casa.heading')}
          text={t('casa.text')}
          features={t.raw('casa.features') as string[]}
          image={trip.images.casaTacay}
          imageAlt={t('casa.imageAlt')}
        />

        <MtbReisenPricing
          id={SECTION_IDS.price}
          heading={t('pricing.heading')}
          dates={t('pricing.dates')}
          perPerson={t('pricing.perPerson')}
          options={priceOptions}
          note={t('pricing.note')}
          trust={t('pricing.trust')}
          cta={t('pricing.cta')}
          privateQuestion={t('pricing.privateQuestion')}
          privateLink={t('pricing.privateLink')}
        />

        <MtbReisenInclusions
          includedHeading={t('inclusions.includedHeading')}
          notIncludedHeading={t('inclusions.notIncludedHeading')}
          includedItems={t.raw('inclusions.includedItems') as string[]}
          notIncludedItems={t.raw('inclusions.notIncludedItems') as string[]}
        />

        <MtbReisenFaq
          id={SECTION_IDS.faq}
          heading={t('faq.heading')}
          groups={t.raw('faq.groups') as { title: string; questions: { question: string; answer: string }[] }[]}
          ctaQuestion={t('faq.ctaQuestion')}
          ctaLink={t('faq.ctaLink')}
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
