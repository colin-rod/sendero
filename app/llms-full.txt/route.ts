import { getTranslations } from 'next-intl/server';
import { getSiteUrl, localizedUrl } from '@/lib/seo/canonical';
import { trailSummaries, senderoDelTigre } from '@/lib/data/trails';

export const dynamic = 'force-static';
export const revalidate = 86400;

const LOCALE = 'en';

const FAQ_SECTIONS = [
  'safety',
  'weather',
  'fitness',
  'transport',
  'gear',
  'insurance',
  'payments',
] as const;

type QA = { question: string; answer: string };

function clean(text: string): string {
  return text
    .replace('[PLACEHOLDER] ', '')
    .replace(/\[TODO:.*?\]\s*/g, '')
    .trim();
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const tMeta = await getTranslations({ locale: LOCALE, namespace: 'metadata' });
  const tHero = await getTranslations({ locale: LOCALE, namespace: 'hero' });
  const tHeroIntro = await getTranslations({ locale: LOCALE, namespace: 'heroIntro' });
  const tAbout = await getTranslations({ locale: LOCALE, namespace: 'aboutPage' });
  const tTrails = await getTranslations({ locale: LOCALE, namespace: 'trails.master' });
  const tTigre = await getTranslations({ locale: LOCALE, namespace: 'trails.senderoDelTigre' });
  const tFaq = await getTranslations({ locale: LOCALE, namespace: 'faqPage' });

  const out: string[] = [];

  out.push(`# Sendero Bike Trails — Full Reference`);
  out.push('');
  out.push(`> ${tMeta('description')}`);
  out.push('');
  out.push(`Site: ${siteUrl}`);
  out.push(`Languages: English (/en), Deutsch (/de), Español (/es)`);
  out.push(`Default locale: de`);
  out.push('');

  out.push('## What Sendero is');
  out.push('');
  out.push(clean(tHero('title')));
  out.push('');
  out.push(clean(tHeroIntro('heading')));
  out.push(clean(tHeroIntro('subheading')));
  out.push(clean(tHeroIntro('subtitle')));
  out.push('');

  out.push('## About');
  out.push('');
  out.push(`URL: ${localizedUrl(LOCALE, '/about')}`);
  out.push('');
  for (const section of ['philosophy', 'region', 'partners'] as const) {
    out.push(`### ${clean(tAbout(`sections.${section}.heading`))}`);
    out.push('');
    out.push(clean(tAbout(`sections.${section}.content`)));
    out.push('');
  }

  out.push('## Trails');
  out.push('');
  out.push(`URL: ${localizedUrl(LOCALE, '/trails')}`);
  out.push('');
  out.push(clean(tTrails('description')));
  out.push('');

  for (const trail of trailSummaries) {
    out.push(
      `- **${trail.name}** — difficulty ${trail.difficulty}` +
        (trail.distance ? `, ${trail.distance} km` : '') +
        (trail.duration ? `, ${trail.duration}` : '') +
        (trail.comingSoon ? ' _(coming soon)_' : '')
    );
  }
  out.push('');

  // Detailed trail page
  out.push(`### ${clean(tTigre('name'))}`);
  out.push('');
  out.push(`URL: ${localizedUrl(LOCALE, '/trails/sendero-del-tigre')}`);
  out.push('');
  out.push(clean(tTigre('subtitle')));
  out.push('');
  out.push(`- Distance: ${senderoDelTigre.stats.distance} km`);
  out.push(`- Duration: ${senderoDelTigre.stats.duration}`);
  out.push(`- Elevation gain: ${senderoDelTigre.stats.elevationGain} m`);
  out.push(`- Difficulty: ${senderoDelTigre.difficulty}`);
  out.push('');
  out.push(clean(tTigre('story.paragraph1')));
  out.push('');
  out.push(clean(tTigre('story.paragraph2')));
  out.push('');

  out.push('#### Waypoints');
  out.push('');
  for (const wp of senderoDelTigre.waypoints) {
    out.push(`- km ${wp.distance}: **${wp.name}** — ${wp.description}`);
  }
  out.push('');

  out.push('## Frequently asked questions');
  out.push('');
  out.push(`URL: ${localizedUrl(LOCALE, '/faq')}`);
  out.push('');

  for (const sectionKey of FAQ_SECTIONS) {
    const heading = clean(tFaq(`sections.${sectionKey}.title`));
    out.push(`### ${heading}`);
    out.push('');
    const questions = tFaq.raw(`sections.${sectionKey}.questions`) as QA[] | undefined;
    if (Array.isArray(questions)) {
      for (const qa of questions) {
        out.push(`**Q: ${clean(qa.question)}**`);
        out.push('');
        out.push(`A: ${clean(qa.answer)}`);
        out.push('');
      }
    }
  }

  out.push('## Contact');
  out.push('');
  out.push(`- Website: ${siteUrl}`);
  out.push(`- Email: info@senderobiketrails.com`);
  out.push(`- Instagram: https://www.instagram.com/sendero_bike_trails/`);
  out.push('');

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
