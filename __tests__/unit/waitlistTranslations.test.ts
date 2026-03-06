import enMessages from '@/messages/en.json';
import deMessages from '@/messages/de.json';
import esMessages from '@/messages/es.json';

describe('waitlist translation keys', () => {
  it('includes a non-empty ctaPrompt in all supported locales', () => {
    const locales = [enMessages, deMessages, esMessages];

    locales.forEach((messages) => {
      expect(messages.waitlist.ctaPrompt).toBeDefined();
      expect(typeof messages.waitlist.ctaPrompt).toBe('string');
      expect(messages.waitlist.ctaPrompt.trim().length).toBeGreaterThan(0);
    });
  });
});
