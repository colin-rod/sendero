import { Container } from '@/components/ui/Container';
import type { ElevationProfile } from '@/lib/types/trails';

interface ElevationChartProps {
  heading: string;
  profile: ElevationProfile;
  highestLabel: string;
  lowestLabel: string;
  metersLabel: string;
}

export function ElevationChart({
  heading,
  profile,
  highestLabel,
  lowestLabel,
  metersLabel,
}: ElevationChartProps) {
  return (
    <section className="py-20 md:py-32 bg-background">
      <Container size="md">
        <h2 className="text-h2 text-center mb-8">{heading}</h2>

        {/* Placeholder for elevation chart */}
        <div className="mb-8">
          <div className="aspect-[3/1] bg-white border border-border rounded-lg flex items-center justify-center shadow-sm">
            <p className="text-body text-muted-foreground">
              Elevation chart visualization coming soon
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-6 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-label text-muted-foreground mb-1">{highestLabel}</p>
            <p className="text-h3">
              {profile.highest} {metersLabel}
            </p>
          </div>
          <div className="text-center">
            <p className="text-label text-muted-foreground mb-1">{lowestLabel}</p>
            <p className="text-h3">
              {profile.lowest} {metersLabel}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-body text-center text-muted-foreground max-w-2xl mx-auto">
          {profile.description}
        </p>
      </Container>
    </section>
  );
}
