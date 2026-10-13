/**
 * MtbReisenItinerary (9/7-day toggle) Test Suite
 *
 * Uses the real German day copy from messages/de.json and the trip data.
 *
 * @see components/features/mtb-reisen/MtbReisenItinerary.tsx
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MtbReisenItinerary } from '@/components/features/mtb-reisen/MtbReisenItinerary';
import { mtbReise } from '@/lib/data/mtbReisen';
import de from '@/messages/de.json';

const copy = de.mtbReisen.itinerary;
const dayCopy = copy.days as Record<string, { title: string; text: string; meals: string }>;

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
      toggleLabel={copy.toggleLabel}
      variantLabels={{ nine: copy.nine, seven: copy.seven }}
      dayLabel={copy.dayLabel}
      nineOnlyLabel={copy.nineOnly}
      mealsLabel={copy.mealsLabel}
      days={days}
    />
  );
}

const dayCards = () => screen.getAllByRole('article');
const cardFor = (title: string) =>
  dayCards().find((card) => within(card).queryByRole('heading', { name: title }))!;

describe('MtbReisenItinerary', () => {
  it('shows all 9 days by default, marking the 9-day-only ones', () => {
    renderItinerary();

    expect(dayCards()).toHaveLength(9);
    expect(screen.getByRole('button', { name: '9 Tage' })).toHaveAttribute('aria-pressed', 'true');
    expect(cardFor('Sendero del Cacao')).toHaveTextContent('Nur 9 Tage');
    expect(cardFor('Sendero del Páramo')).toHaveTextContent('Tag 8');
  });

  it('hides the 9-day-only days and renumbers in the 7-day view', async () => {
    const user = userEvent.setup();
    renderItinerary();

    await user.click(screen.getByRole('button', { name: '7 Tage' }));

    expect(dayCards()).toHaveLength(7);
    expect(screen.queryByRole('heading', { name: 'Sendero del Cacao' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sendero del Oro' })).not.toBeInTheDocument();
    expect(screen.queryByText('Nur 9 Tage', { exact: false })).not.toBeInTheDocument();
    expect(cardFor('Sendero del Volcán')).toHaveTextContent('Tag 5');
    expect(cardFor('Sendero del Páramo')).toHaveTextContent('Tag 6');
    expect(cardFor('Abreise')).toHaveTextContent('Tag 7');
  });

  it('keeps the selected variant when its chip is clicked again', async () => {
    const user = userEvent.setup();
    renderItinerary();

    await user.click(screen.getByRole('button', { name: '9 Tage' }));

    expect(dayCards()).toHaveLength(9);
    expect(screen.getByRole('button', { name: '9 Tage' })).toHaveAttribute('aria-pressed', 'true');
  });
});
