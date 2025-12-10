import { Container } from '@/components/ui/Container';
import type { Waypoint } from '@/lib/types/trails';

interface WaypointsTimelineProps {
  heading: string;
  waypoints: Waypoint[];
}

export function WaypointsTimeline({ heading, waypoints }: WaypointsTimelineProps) {
  return (
    <section className="py-20 md:py-32">
      <Container size="md">
        <h2 className="text-h2 text-center mb-12">{heading}</h2>
        <div className="max-w-2xl mx-auto">
          <ol className="relative border-l-2 border-primary-500 ml-4">
            {waypoints.map((waypoint, index) => (
              <li key={index} className="mb-10 ml-8">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-500 rounded-full -left-3 ring-4 ring-background">
                  <span className="text-xs text-white font-semibold">
                    {waypoint.type === 'start' ? 'A' : waypoint.type === 'end' ? 'B' : index}
                  </span>
                </span>
                <h3 className="text-h4 mb-1">{waypoint.name}</h3>
                <p className="text-label text-muted-foreground mb-2">
                  {waypoint.distance} km
                </p>
                <p className="text-body text-muted-foreground">
                  {waypoint.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
