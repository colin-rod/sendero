import type { BookingFormData } from '@/lib/types/database';

interface BookingEmailData extends BookingFormData {
  locale: string;
}

/**
 * Generates the notification email Julian receives for trip request submissions
 */
export function generateBookingEmail(data: BookingEmailData) {
  const firstName = data.firstName.trim();
  const months = data.months.length > 0 ? data.months.join(', ') : '–';

  const emailBody = `
Neue Reiseanfrage über senderobiketrails.com:

Vorname: ${firstName}
E-Mail: ${data.email.trim()}
Monate: ${months}
Reisende: ${data.travelers ?? '–'}
Level: ${data.level ?? '–'}
Mailingliste: ${data.mailingList ? 'ja' : 'nein'}
Sprache: ${data.locale}
Quelle: ${data.source ?? '–'}

Nachricht:
${data.message?.trim() || '–'}

---
Eingegangen: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
`.trim();

  return {
    subject: `Neue Reiseanfrage – ${firstName}`,
    text: emailBody,
  };
}
