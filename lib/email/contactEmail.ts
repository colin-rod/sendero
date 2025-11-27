import type { ContactFormData } from '@/lib/types/database';

interface ContactEmailData extends ContactFormData {
  locale: string;
}

/**
 * Generates email content for contact form submissions
 */
export function generateContactEmail(data: ContactEmailData) {
  const subjectLine = data.subject
    ? `New Contact Form Submission - ${data.subject.charAt(0).toUpperCase() + data.subject.slice(1)}`
    : 'New Contact Form Submission';

  const emailBody = `
New contact form submission from Sendero website:

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || 'None'}
Language: ${data.locale}

Message:
${data.message}

---
Submitted: ${new Date().toLocaleString()}
`.trim();

  return {
    subject: subjectLine,
    text: emailBody,
  };
}
