'use client';

import dynamic from 'next/dynamic';

const TRAIL_COLORS = [
  '#e2b71f', // golden yellow (primary-500)
  '#c4963f', // honey yellow
  '#2563eb', // blue
  '#16a34a', // green
  '#dc2626', // red
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#ca9a1b', // primary-600
];

export interface TrailEntry {
  name: string;
  gpxPath: string;
}

interface TrailsMapSectionProps {
  trails: TrailEntry[];
}

const TrailsOverviewMap = dynamic(
  () => import('./TrailsOverviewMap').then((m) => ({ default: m.TrailsOverviewMap })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full bg-gray-200 animate-pulse"
        style={{ height: '350px' }}
        aria-label="Loading map..."
      />
    ),
  }
);

export function TrailsMapSection({ trails }: TrailsMapSectionProps) {
  const trailsWithColors = trails.map((trail, i) => ({
    ...trail,
    color: TRAIL_COLORS[i % TRAIL_COLORS.length],
  }));

  return (
    <div className="w-full">
      <TrailsOverviewMap trails={trailsWithColors} />
    </div>
  );
}
