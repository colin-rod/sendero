'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || '/ingest',
      ui_host: 'https://eu.posthog.com',
      capture_pageview: false,
      capture_pageleave: true,
      capture_exceptions: true,
      persistence: 'localStorage+cookie',
      session_recording: {
        maskAllInputs: true,
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug();
      },
    });
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
