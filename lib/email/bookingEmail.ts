import type { BookingFormData } from '@/lib/types/database';

interface BookingEmailData extends BookingFormData {
  locale: string;
}

/**
 * Generates email content for booking form submissions
 */
export function generateBookingEmail(data: BookingEmailData) {
  const emailBody = `
New booking inquiry from Sendero website:

Name: ${data.name}
Email: ${data.email}
Country: ${data.country}
Travelers: ${data.travelers}
Tour date: ${data.tourDate}
Technical level: ${data.technicalLevel}
Language: ${data.locale}

Message:
${data.message || 'None'}

---
Submitted: ${new Date().toLocaleString()}
`.trim();

  return {
    subject: 'New Booking Inquiry',
    text: emailBody,
  };
}
