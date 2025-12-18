import { Container } from '@/components/ui/Container';

interface TrailStoryProps {
  paragraph1: string;
  paragraph2?: string;
}

export function TrailStory({ paragraph1, paragraph2 }: TrailStoryProps) {
  return (
    <section className="py-16 md:py-20 bg-accent-400/20">
      <Container size="md">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-body text-foreground leading-relaxed">
            {paragraph1}
          </p>
          {paragraph2 && (
            <p className="text-body text-muted-foreground leading-relaxed">
              {paragraph2}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
