import { Container } from '@/components/ui/Container';
import type { Testimonial } from '@/lib/types/trails';

interface TestimonialBandProps {
  heading: string;
  testimonials: Testimonial[];
}

export function TestimonialBand({ heading, testimonials }: TestimonialBandProps) {
  // For MVP, show just the first testimonial
  const testimonial = testimonials[0];

  if (!testimonial) return null;

  return (
    <section className="py-20 md:py-32 bg-accent-400/20">
      <Container size="md">
        <h2 className="text-h2 text-center mb-12">{heading}</h2>
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="mb-6">
            <p className="text-h3 text-foreground mb-4 italic">
              "{testimonial.quote}"
            </p>
          </blockquote>
          <p className="text-body text-muted-foreground">
            — {testimonial.author}, {testimonial.country}
          </p>
        </div>
      </Container>
    </section>
  );
}
