import { Container } from '@/components/ui/Container';
import { ExperienceCard } from './ExperienceCard';
import type { Experience } from '@/lib/types/trails';

interface ExperiencesGridProps {
  heading: string;
  experiences: Experience[];
  locationLabel: string;
}

export function ExperiencesGrid({
  heading,
  experiences,
  locationLabel,
}: ExperiencesGridProps) {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <h2 className="text-h2 text-center mb-12">{heading}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              id={experience.id}
              title={experience.title}
              description={experience.description}
              location={experience.location}
              locationLabel={locationLabel}
              image={experience.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
