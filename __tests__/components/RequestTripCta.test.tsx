import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import posthog from 'posthog-js';
import { RequestTripCta } from '@/components/RequestTripCta';

jest.mock('posthog-js', () => ({
  __esModule: true,
  default: { capture: jest.fn() },
}));

jest.mock('@/lib/i18n/routing', () => ({
  Link: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('RequestTripCta', () => {
  it('links to the booking form with the primary hero style', () => {
    render(<RequestTripCta label="Request a trip" source="home_next_trips" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/anfragen');
    expect(screen.getByRole('button', { name: 'Request a trip' })).toHaveClass(
      'bg-primary-500',
      'text-accent-400',
      'w-[260px]'
    );
  });

  it('tracks the click in PostHog with its source', async () => {
    const user = userEvent.setup();
    render(<RequestTripCta label="Request a trip" source="home_next_trips" />);

    await user.click(screen.getByRole('button', { name: 'Request a trip' }));

    expect(posthog.capture).toHaveBeenCalledWith('request_trip_cta_clicked', {
      source: 'home_next_trips',
    });
  });
});
