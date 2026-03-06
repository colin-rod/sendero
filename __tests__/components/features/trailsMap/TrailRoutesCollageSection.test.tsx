import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { TrailRoutesCollageSection } from '@/components/features/trailsMap/TrailRoutesCollageSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const SPANISH_LABELS = [
  'SENDERO DEL AGUA',
  'SENDERO DEL ORO',
  'SENDERO DEL CACAO',
  'SENDERO DEL TIGRE',
  'SENDERO DEL CAFÉ',
  'SENDERO DEL VOLCÁN',
  'SENDERO DEL PÁRAMO',
  'SENDERO DE LA GUADUA',
  'SENDERO LUMINOSO',
];

describe('TrailRoutesCollageSection', () => {
  it('renders collage background, fixed Spanish labels, and route overlays', () => {
    render(<TrailRoutesCollageSection />);

    expect(screen.getByTestId('trail-routes-collage-section')).toBeInTheDocument();

    for (const label of SPANISH_LABELS) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    const desktop = screen.getByTestId('trail-routes-collage-desktop');
    const overlays = within(desktop).getAllByTestId(/^trail-route-overlay-/);
    expect(overlays).toHaveLength(9);
  });
});
