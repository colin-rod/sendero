import { Container } from '@/components/ui/Container';

interface TrailMapProps {
  trailName: string;
}

export function TrailMap({ trailName }: TrailMapProps) {
  return (
    <section className="py-20 md:py-32 bg-accent-400/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Placeholder for SVG map - will be replaced with custom SVG */}
          <div className="aspect-[4/3] bg-background border-2 border-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-h3 text-muted-foreground mb-2">Trail Map</p>
              <p className="text-body text-muted-foreground">
                Interactive map for {trailName} coming soon
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
