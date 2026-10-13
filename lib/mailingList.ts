/**
 * Mailing list = the Google Sheets sheet behind GOOGLE_SHEETS_WEBHOOK_URL
 * (the same list the waitlist form writes to).
 */
export type MailingListResult =
  | { ok: true }
  | { ok: false; reason: 'missing_webhook_url' }
  | { ok: false; reason: 'sheets_error'; status: number };

export async function addToMailingList(email: string): Promise<MailingListResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, reason: 'missing_webhook_url' };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.toLowerCase().trim(),
    }),
  });

  if (!response.ok) {
    return { ok: false, reason: 'sheets_error', status: response.status };
  }

  return { ok: true };
}
