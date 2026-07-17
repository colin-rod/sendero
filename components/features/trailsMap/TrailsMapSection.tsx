'use client';

import dynamic from 'next/dynamic';
import { landscape } from '@/lib/design-tokens';

const TRAIL_COLORS = [
  landscape.cacao.nuez,     // #b85c42
  landscape.azul.cielo,     // #244b71
  landscape.lila.flor,      // #4a3b7a
  landscape.verde.selva,    // #006d62 — Landscape verde-selva, NOT Brand primary-selva (#1e6a62)
  landscape.naranjo.fuego,  // #fa7121
  landscape.cafe.arcilla,   // #725d40
  landscape.cacao.pulpa,    // #8f3530
  landscape.azul.niebla,    // #3f719c
  landscape.naranjo.cobre,  // #fea465
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
