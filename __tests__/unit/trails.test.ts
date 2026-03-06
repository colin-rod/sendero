import {
  getTrailBySlug,
  getAllTrailSummaries,
  senderoDelTigre,
  trailSummaries,
} from '@/lib/data/trails';

describe('getTrailBySlug', () => {
  it('returns the sendero-del-tigre trail for its slug', () => {
    const trail = getTrailBySlug('sendero-del-tigre');
    expect(trail).toBeDefined();
    expect(trail).toBe(senderoDelTigre);
    expect(trail?.id).toBe('sendero-del-tigre');
    expect(trail?.name).toBe('El Sendero del Tigre');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getTrailBySlug('does-not-exist')).toBeUndefined();
    expect(getTrailBySlug('')).toBeUndefined();
  });
});

describe('getAllTrailSummaries', () => {
  it('returns the full list of trail summaries', () => {
    const summaries = getAllTrailSummaries();
    expect(summaries).toBe(trailSummaries);
    expect(summaries).toHaveLength(9);
  });

  it('includes expected trails with correct slugs', () => {
    const summaries = getAllTrailSummaries();
    const slugs = summaries.map((s) => s.slug);
    expect(slugs).toContain('sendero-del-tigre');
    expect(slugs).toContain('sendero-del-cafe');
    expect(slugs).toContain('sendero-del-paramo');
  });

  it('marks coming-soon trails correctly', () => {
    const summaries = getAllTrailSummaries();
    const tigre = summaries.find((s) => s.slug === 'sendero-del-tigre');
    const cafe = summaries.find((s) => s.slug === 'sendero-del-cafe');
    expect(tigre?.comingSoon).toBeFalsy();
    expect(cafe?.comingSoon).toBe(true);
  });
});
