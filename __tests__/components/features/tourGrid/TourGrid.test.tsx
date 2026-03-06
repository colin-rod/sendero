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

  it('applies design-system surface styles to tour cards', () => {
    const { container } = render(
      <TourGrid
        cards={cards}
        heading="More than bike trails."
        subheading="Paths that connect lives."
      />
    );

    const card = container.querySelector('.flip-card');
    const cardBack = container.querySelector('.flip-card-back');

    expect(card).toHaveClass(
      'bg-white',
      'rounded-component-card',
      'shadow-elevation-raised',
      'p-2',
      'box-border'
    );
    expect(cardBack).toHaveClass('bg-white');
  });
});
