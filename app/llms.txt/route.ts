import { getTranslations } from 'next-intl/server';
import { getSiteUrl, localizedUrl } from '@/lib/seo/canonical';
import { trailSummaries, getTrailBySlug } from '@/lib/data/trails';

export const dynamic = 'force-static';
export const revalidate = 86400; // 1 day

const LOCALE = 'en';

export async function GET() {
  const siteUrl = getSiteUrl();
  const tMeta = await getTranslations({ locale: LOCALE, namespace: 'metadata' });
  const tTrails = await getTranslations({ locale: LOCALE, namespace: 'trails.master' });
  const tFaq = await getTranslations({ locale: LOCALE, namespace: 'faqPage' });
  const tAbout = await getTranslations({ locale: LOCALE, namespace: 'aboutPage' });
  const tContact = await getTranslations({ locale: LOCALE, namespace: 'contactPage' });

  const lines: string[] = [];

  lines.push(`# Sendero Bike Trails`);
  lines.push('');
  lines.push(`> ${tMeta('description')}`);
  lines.push('');
  lines.push(
    'Sendero offers beginner-friendly hike & bike tours through Colombia\'s Coffee Region (Eje Cafetero), based in Pereira. Tours are guided, eco-conscious, and designed for travelers new to cycling adventures.'
  );
  lines.push('');

  lines.push('## Core pages');
  lines.push(`- [Home](${siteUrl}/${LOCALE}): ${tMeta('description')}`);
  lines.push(`- [About](${siteUrl}/${LOCALE}/about): ${tAbout('description')}`);
  lines.push(`- [Trails](${siteUrl}/${LOCALE}/trails): ${tTrails('subtitle')}`);
  lines.push(`- [FAQ](${siteUrl}/${LOCALE}/faq): ${tFaq('subtitle')}`);
  lines.push(`- [Contact](${siteUrl}/${LOCALE}/contact): ${tContact('description')}`);
  lines.push('');

  lines.push('## Trails');
  for (const trail of trailSummaries) {
    const status = trail.comingSoon ? ' (coming soon)' : '';
    const detail = getTrailBySlug(trail.slug);
    const url = detail
      ? localizedUrl(LOCALE, `/trails/${trail.slug}`)
      : localizedUrl(LOCALE, '/trails');
    const meta: string[] = [`difficulty: ${trail.difficulty}`];
    if (trail.distance) meta.push(`${trail.distance} km`);
    if (trail.duration) meta.push(trail.duration);
    lines.push(`- [${trail.name}${status}](${url}) — ${meta.join(', ')}`);
  }
  lines.push('');

  lines.push('## Languages');
  lines.push(`- English: ${siteUrl}/en`);
  lines.push(`- Deutsch: ${siteUrl}/de`);
  lines.push(`- Español: ${siteUrl}/es`);
  lines.push('');

  lines.push('## Optional');
  lines.push(`- [Sitemap](${siteUrl}/sitemap.xml)`);
  lines.push(`- [Detailed reference](${siteUrl}/llms-full.txt)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
