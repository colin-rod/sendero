'use client';

import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/Container';

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
  heading: string;
  subtitle: string;
  legendLabel: string;
  trails: TrailEntry[];
}

const TrailsOverviewMap = dynamic(
  () => import('./TrailsOverviewMap').then((m) => ({ default: m.TrailsOverviewMap })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-lg bg-gray-100 animate-pulse"
        style={{ height: '500px' }}
        aria-label="Loading map..."
      />
    ),
  }
);

export function TrailsMapSection({
  heading,
  subtitle,
  legendLabel,
  trails,
}: TrailsMapSectionProps) {
  const trailsWithColors = trails.map((trail, i) => ({
    ...trail,
    color: TRAIL_COLORS[i % TRAIL_COLORS.length],
  }));

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-h2 text-foreground mb-3">{heading}</h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Map */}
        <TrailsOverviewMap trails={trailsWithColors} />

        {/* Legend */}
        {trailsWithColors.length > 0 && (
          <div className="mt-6">
            <p className="text-label text-muted-foreground mb-3 uppercase tracking-wide">
              {legendLabel}
            </p>
            <div className="flex flex-wrap gap-3">
              {trailsWithColors.map((trail) => (
                <div key={trail.gpxPath} className="flex items-center gap-2">
                  <span
                    className="inline-block w-6 h-1 rounded-full"
                    style={{ backgroundColor: trail.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-foreground">{trail.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no GPX files loaded yet */}
        {trailsWithColors.length === 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Trail routes coming soon.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
