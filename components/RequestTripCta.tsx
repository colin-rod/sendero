'use client';

import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import posthog from 'posthog-js';

interface RequestTripCtaProps {
  label: string;
  /** Where the CTA is placed, sent with the PostHog event */
  source: string;
}

export function RequestTripCta({ label, source }: RequestTripCtaProps) {
  return (
    <Link
      href="/buchen"
      onClick={() => posthog.capture('request_trip_cta_clicked', { source })}
    >
      <Button variant="hero-cta" className="w-[260px] rounded-[30px]!">
        {label}
      </Button>
    </Link>
  );
}
