import { Container } from '@/components/ui/Container';

interface MtbReisenFactsProps {
  id: string;
  /** Screen-reader heading for the section (the nav label) */
  heading: string;
  facts: string[];
}

export function MtbReisenFacts({ id, heading, facts }: MtbReisenFactsProps) {
  return (
    <section id={id} className="scroll-mt-[180px] bg-river-forest py-12 md:py-16">
      <Container>
        <h2 className="sr-only">{heading}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-8 text-center">
          {facts.map((fact) => (
            <li key={fact} className="text-body-em text-accent-400 leading-snug">
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
