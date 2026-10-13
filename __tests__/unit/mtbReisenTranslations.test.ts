import enMessages from '@/messages/en.json';
import deMessages from '@/messages/de.json';
import esMessages from '@/messages/es.json';
import { mtbReise } from '@/lib/data/mtbReisen';

/** Flattens an object into dotted key paths (array indices included). */
function keyPaths(node: unknown, prefix = ''): string[] {
  if (node === null || typeof node !== 'object') return [prefix];
  return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) =>
    keyPaths(value, prefix ? `${prefix}.${key}` : key)
  );
}

function allStrings(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (node === null || typeof node !== 'object') return [];
  return Object.values(node as Record<string, unknown>).flatMap(allStrings);
}

describe('mtbReisen translations', () => {
  it('has the same keys in de, en and es', () => {
    const deKeys = keyPaths(deMessages.mtbReisen).sort();
    expect(keyPaths(enMessages.mtbReisen).sort()).toEqual(deKeys);
    expect(keyPaths(esMessages.mtbReisen).sort()).toEqual(deKeys);
  });

  it('has copy for every day and landscape image in the trip data', () => {
    for (const messages of [deMessages, enMessages, esMessages]) {
      const days = messages.mtbReisen.itinerary.days as Record<string, unknown>;
      expect(Object.keys(days)).toEqual(mtbReise.days.map((day) => day.key));
      expect(messages.mtbReisen.landscapes.items).toHaveLength(mtbReise.images.landscapes.length);
    }
  });

  it('always capitalizes Du/Dich/Dir/Dein in German', () => {
    const lowercase = /(?<![\p{L}-])(du|dich|dir|dein|deine|deinem|deinen|deiner|deines)(?![\p{L}])/u;
    const offenders = allStrings(deMessages.mtbReisen).filter((text) => lowercase.test(text));
    expect(offenders).toEqual([]);
  });
});
