/**
 * MtbReisenItinerary Test Suite
 *
 * Uses the real German day copy from messages/de.json and the trip data.
 *
 * @see components/features/mtb-reisen/MtbReisenItinerary.tsx
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MtbReisenItinerary } from '@/components/features/mtb-reisen/MtbReisenItinerary';
import { mtbReise } from '@/lib/data/mtbReisen';
import de from '@/messages/de.json';

const copy = de.mtbReisen.itinerary;
const dayCopy = copy.days as Record<string, { title: string; text: string }>;

const days = mtbReise.days.map((day) => ({
  key: day.key,
  nineDaysOnly: day.nineDaysOnly,
  image: day.image,
  ...dayCopy[day.key],
}));

function renderItinerary() {
  return render(
    <MtbReisenItinerary
      id="tag-fuer-tag"
      heading={copy.heading}
      intro={copy.intro}
      dayLabel={copy.dayLabel}
      days={days}
    />
  );
}

const dayCards = () => screen.getAllByRole('article');
const cardFor = (title: string) =>
  dayCards().find((card) => within(card).queryByRole('heading', { name: title }))!;

describe('MtbReisenItinerary', () => {
  it('shows all 9 days, numbered in order', () => {
    renderItinerary();

    expect(dayCards()).toHaveLength(9);
    expect(cardFor('Ankommen')).toHaveTextContent('Tag 1');
    expect(cardFor('Sendero del Cacao')).toHaveTextContent('Tag 5');
    expect(cardFor('Sendero del Páramo')).toHaveTextContent('Tag 8');
    expect(cardFor('Abreise')).toHaveTextContent('Tag 9');
  });

  it('has no trip-length toggle, 9-day-only badge or meals line', () => {
    renderItinerary();

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText('Nur 9 Tage', { exact: false })).not.toBeInTheDocument();
    expect(screen.queryByText('Inklusive:', { exact: false })).not.toBeInTheDocument();
  });
});
