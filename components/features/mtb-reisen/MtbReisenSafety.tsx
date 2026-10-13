import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

interface SafetyItem {
  title: string;
  text: string;
}

interface MtbReisenSafetyProps {
  id: string;
  heading: string;
  items: SafetyItem[];
}

export function MtbReisenSafety({ id, heading, items }: MtbReisenSafetyProps) {
  return (
    <section id={id} className="scroll-mt-[180px] bg-background py-20 md:py-28">
      <Container size="lg" className="flex flex-col gap-12">
        <h2 className="text-h2 text-foreground">{heading}</h2>

        {/* TODO: fill in [Marke], [Federweg] and [S–XL] in mtbReisen.safety.items[0] (all three locales) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.title} padding="lg">
              <p className="text-body-em text-primary-500 mb-3">{item.title}</p>
              <p className="text-base leading-[26px] text-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
