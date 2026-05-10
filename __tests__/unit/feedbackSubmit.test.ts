import { submitFeedback } from '@/lib/utils/feedback';
import type { FeedbackFormData } from '@/lib/types/feedback';

class MockFileReader {
  result: string | null = null;
  onload: (() => void) | null = null;
  onerror: ((e: unknown) => void) | null = null;

  readAsDataURL(file: File) {
    this.result = `data:${file.type};base64,dGVzdA==`;
    if (this.onload) this.onload();
  }
}

// jsdom locks window.location — delete and redefine at module level
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (global as any).window.location;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).window.location = { href: 'https://example.com/en/trails' };

beforeEach(() => {
  Object.defineProperty(window, 'FileReader', {
    writable: true,
    configurable: true,
    value: MockFileReader,
  });

  Object.defineProperty(navigator, 'userAgent', {
    value: 'TestAgent/1.0',
    writable: true,
    configurable: true,
  });
});

const baseData: FeedbackFormData = {
  category: 'bug-report',
  message: 'Something is broken',
};

describe('submitFeedback', () => {
  it('returns { success: true } on a 200 response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await submitFeedback(baseData, 'en');
    expect(result).toEqual({ success: true });
  });

  it('posts to the correct locale API endpoint', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

    await submitFeedback(baseData, 'de');

    expect(global.fetch).toHaveBeenCalledWith(
      '/de/api/feedback',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('includes category, message, platform, url, locale in payload', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

    await submitFeedback(baseData, 'en');

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.category).toBe('bug-report');
    expect(body.message).toBe('Something is broken');
    expect(body.platform).toBe('TestAgent/1.0');
    expect(body.locale).toBe('en');
  });

  it('trims email whitespace', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

    await submitFeedback({ ...baseData, email: '  test@example.com  ' }, 'en');

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.email).toBe('test@example.com');
  });

  it('omits email from payload when not provided', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

    await submitFeedback(baseData, 'en');

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.email).toBeUndefined();
  });

  it('returns error message from API on non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error from API' }),
    });

    const result = await submitFeedback(baseData, 'en');
    expect(result).toEqual({ success: false, error: 'Server error from API' });
  });

  it('uses fallback error message when API returns no error field', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    const result = await submitFeedback(baseData, 'en');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to submit feedback. Please try again.');
  });

  it('returns generic error on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const result = await submitFeedback(baseData, 'en');
    expect(result).toEqual({ success: false, error: 'An unexpected error occurred' });
  });

  it('converts screenshot to base64 and includes it in payload', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });

    const file = new File(['test'], 'screenshot.png', { type: 'image/png' });
    await submitFeedback({ ...baseData, screenshot: file }, 'en');

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.screenshot).toContain('data:image/png;base64,');
  });
});
