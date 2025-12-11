import { Container } from '@/components/ui/Container';

interface TrailMapProps {
  trailName: string;
}

export function TrailMap({ trailName }: TrailMapProps) {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Placeholder for SVG map - will be replaced with custom SVG */}
          <div className="aspect-[4/3] bg-white border-2 border-border rounded-lg flex items-center justify-center shadow-sm">
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
