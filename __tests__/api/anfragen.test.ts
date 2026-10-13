/**
 * API Route Tests: /api/anfragen (trip request form)
 */

import { NextRequest } from 'next/server';

process.env.RESEND_API_KEY = 'test-api-key';

jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}));

const mockEmailSend = jest.fn().mockResolvedValue({ id: 'mock-email-id' });
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockEmailSend },
  })),
}));

const { POST, GET } = require('@/app/[locale]/api/anfragen/route');

const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

const validPayload = {
  firstName: ' Anna ',
  email: 'Anna@Example.de',
  months: ['2027-03', '2027-04'],
  travelers: '1',
  level: 'intermediate-light',
  message: 'Schwarz, mit Panela.',
  mailingList: true,
  company: '',
  locale: 'de',
  source: 'anfrage-page',
};

const createRequest = (body: unknown) => ({ json: async () => body }) as unknown as NextRequest;
const post = (body: unknown) => POST(createRequest(body), { params: Promise.resolve({ locale: 'de' }) });

describe('POST /api/anfragen', () => {
  beforeEach(() => {
    mockEmailSend.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
    mockConsoleLog.mockRestore();
  });

  it('accepts a valid request and notifies Julian with all fields', async () => {
    const response = await post(validPayload);

    expect(response.status).toBe(201);
    expect(mockEmailSend).toHaveBeenCalledTimes(1);

    const email = mockEmailSend.mock.calls[0][0];
    expect(email.to).toBe('julian@senderobiketrails.com');
    expect(email.replyTo).toBe('anna@example.de');
    expect(email.subject).toBe('Neue Reiseanfrage – Anna');
    expect(email.text).toContain('Monate: 2027-03, 2027-04');
    expect(email.text).toContain('Reisende: 1');
    expect(email.text).toContain('Level: intermediate-light');
    expect(email.text).toContain('Mailingliste: ja');
    expect(email.text).toContain('Schwarz, mit Panela.');
  });

  it('accepts a minimal request with only first name and email', async () => {
    const response = await post({ firstName: 'Anna', email: 'anna@example.de' });

    expect(response.status).toBe(201);
    expect(mockEmailSend.mock.calls[0][0].text).toContain('Mailingliste: nein');
  });

  it('rejects a missing first name', async () => {
    const response = await post({ ...validPayload, firstName: '' });

    expect(response.status).toBe(400);
    expect(mockEmailSend).not.toHaveBeenCalled();
  });

  it('rejects an invalid email', async () => {
    const response = await post({ ...validPayload, email: 'anna@' });

    expect(response.status).toBe(400);
    expect(mockEmailSend).not.toHaveBeenCalled();
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const response = await post({ ...validPayload, company: 'Spam Inc.' });

    expect(response.status).toBe(201);
    expect(mockEmailSend).not.toHaveBeenCalled();
  });

  describe('mailing list opt-in', () => {
    const webhookUrl = 'https://script.google.com/test-webhook';

    beforeEach(() => {
      process.env.GOOGLE_SHEETS_WEBHOOK_URL = webhookUrl;
      global.fetch = jest.fn().mockResolvedValue({ ok: true });
    });

    afterEach(() => {
      delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    });

    it('adds the email to the mailing list when opted in', async () => {
      await post(validPayload);

      expect(global.fetch).toHaveBeenCalledWith(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'anna@example.de' }),
      });
    });

    it('does not touch the mailing list without opt-in', async () => {
      await post({ ...validPayload, mailingList: false });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('still succeeds when the mailing list webhook fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
      const response = await post(validPayload);

      expect(response.status).toBe(201);
      expect(mockEmailSend).toHaveBeenCalledTimes(1);
    });
  });

  it('still succeeds when the notification email fails', async () => {
    mockEmailSend.mockRejectedValueOnce(new Error('resend down'));
    const response = await post(validPayload);

    expect(response.status).toBe(201);
  });
});

describe('GET /api/anfragen', () => {
  it('returns 405', async () => {
    const response = await GET();
    expect(response.status).toBe(405);
  });
});
