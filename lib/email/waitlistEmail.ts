import type { Locale } from '@/lib/i18n/config';

interface WaitlistEmailContent {
  subject: string;
  html: string;
  text: string;
}

const content: Record<Locale, WaitlistEmailContent> = {
  en: {
    subject: 'Welcome to the Sendero Bike Trails waitlist!',
    html: `
      <h2>You're on the list!</h2>
      <p>Thanks for joining the <strong>Sendero Bike Trails</strong> waitlist. We'll be in touch as soon as our first tours are ready to book.</p>
      <p>Get ready — adventure in Colombia's Coffee Region is on its way.</p>
      <br/>
      <p>— Julián</p>
    `,
    text: `You're on the list!

Thanks for joining the Sendero Bike Trails waitlist. We'll be in touch as soon as our first tours are ready to book.

Get ready — adventure in Colombia's Coffee Region is on its way.

— Julián`,
  },
  de: {
    subject: 'Willkommen auf der Warteliste von Sendero Bike Trails!',
    html: `
      <h2>Du stehst auf der Liste!</h2>
      <p>Danke, dass du dich auf die Warteliste von <strong>Sendero Bike Trails</strong> eingetragen hast. Wir melden uns, sobald unsere ersten Touren buchbar sind.</p>
      <p>Mach dich bereit — das Abenteuer in Kolumbiens Kaffeeregion steht bevor.</p>
      <br/>
      <p>— Julián</p>
    `,
    text: `Du stehst auf der Liste!

Danke, dass du dich auf die Warteliste von Sendero Bike Trails eingetragen hast. Wir melden uns, sobald unsere ersten Touren buchbar sind.

Mach dich bereit — das Abenteuer in Kolumbiens Kaffeeregion steht bevor.

— Julián`,
  },
  es: {
    subject: '¡Bienvenido a la lista de espera de Sendero Bike Trails!',
    html: `
      <h2>¡Ya estás en la lista!</h2>
      <p>Gracias por unirte a la lista de espera de <strong>Sendero Bike Trails</strong>. Te contactaremos en cuanto nuestros primeros tours estén listos para reservar.</p>
      <p>Prepárate — la aventura en la Región Cafetera de Colombia está en camino.</p>
      <br/>
      <p>— Julián</p>
    `,
    text: `¡Ya estás en la lista!

Gracias por unirte a la lista de espera de Sendero Bike Trails. Te contactaremos en cuanto nuestros primeros tours estén listos para reservar.

Prepárate — la aventura en la Región Cafetera de Colombia está en camino.

— Julián`,
  },
};

/**
 * Generates the waitlist confirmation email content for a given locale,
 * falling back to English for unrecognized locales.
 */
export function generateWaitlistEmail(locale: string): WaitlistEmailContent {
  return content[locale as Locale] ?? content.en;
}
