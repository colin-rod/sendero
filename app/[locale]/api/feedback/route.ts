import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/utils/log';

export async function POST(request: NextRequest) {
  const request_id = crypto.randomUUID();
  const event = 'feedback_submit';

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    logEvent({ event, request_id, status: 'fail', reason: 'missing_webhook_url' });
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    logEvent({ event, request_id, status: 'fail', reason: 'invalid_body' });
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!payload.category || !payload.message) {
    logEvent({ event, request_id, status: 'fail', reason: 'missing_fields' });
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sheetsResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'feedback', ...payload }),
  });

  if (!sheetsResponse.ok) {
    logEvent({ event, request_id, status: 'fail', reason: 'sheets_error', sheets_status: sheetsResponse.status });
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }

  logEvent({ event, request_id, status: 'ok', category: String(payload.category) });

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
