import React from 'react';
import { render, screen } from '@testing-library/react';
import { TourGrid } from '@/components/features/tourGrid/TourGrid';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const cards = [
  {
    id: 'tigre',
    title: 'Sendero del Tigre',
    imageSrc: '/tours/sendero-tigre.png',
    imageAlt: 'Sendero del Tigre',
  },
];

describe('TourGrid', () => {
  it('renders heading copy above the route cards', () => {
    render(
      <TourGrid
        cards={cards}
        heading="More than bike trails."
        subheading="Paths that connect lives."
      />
    );

    expect(
      screen.getByRole('heading', { name: 'More than bike trails.' })
    ).toBeInTheDocument();
    expect(screen.getByText('Paths that connect lives.')).toBeInTheDocument();
  });

  it('renders the trail name in the card title', () => {
    render(<TourGrid cards={cards} />);
    expect(screen.getByText('TIGRE')).toBeInTheDocument();
  });

  it('renders the hover overlay text for a known card id', () => {
    render(<TourGrid cards={cards} />);
    expect(screen.getByText('Malerische Rundstrecken.')).toBeInTheDocument();
    expect(screen.getByText('Bio-Hof Mittagessen.')).toBeInTheDocument();
  });

  it('renders a 2-column grid container', () => {
    const { container } = render(<TourGrid cards={cards} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'gap-10');
  });
});
