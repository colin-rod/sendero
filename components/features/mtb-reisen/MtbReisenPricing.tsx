import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

interface PriceOption {
  key: string;
  title: string;
  /** Formatted price, e.g. "3.890 €" */
  price: string;
  text: string;
}

interface MtbReisenPricingProps {
  id: string;
  heading: string;
  dates: string;
  perPerson: string;
  options: PriceOption[];
  note: string;
  trust: string;
  cta: string;
  privateQuestion: string;
  privateLink: string;
}

export function MtbReisenPricing({
  id,
  heading,
  dates,
  perPerson,
  options,
  note,
  trust,
  cta,
  privateQuestion,
  privateLink,
}: MtbReisenPricingProps) {
  return (
    <section id={id} className="scroll-mt-[180px] bg-white py-20 md:py-28">
      <Container size="lg" className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-foreground mb-6">{heading}</h2>
          <p className="text-base leading-[26px] text-foreground">{dates}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <Card key={option.key} variant="bordered" padding="lg" className="flex flex-col gap-3">
              <p className="text-label text-primary-500 tracking-[0.06em] uppercase">{option.title}</p>
              <p className="text-h1 text-foreground">
                {option.price} <span className="text-body text-gray-600">{perPerson}</span>
              </p>
              <p className="text-base leading-[26px] text-foreground">{option.text}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {/* TODO: fill in the single room supplement [X] in mtbReisen.pricing.note (all three locales) */}
          <p className="text-caption text-gray-600">{note}</p>
          <p className="text-body-em text-primary-500">{trust}</p>
        </div>

        <div>
          <Link href="/anfragen">
            <Button variant="hero-cta">{cta}</Button>
          </Link>
        </div>

        <p className="text-base leading-[26px] text-foreground">
          {privateQuestion}{' '}
          {/* TODO: switch to /private-reisen once that page exists */}
          <Link href="/anfragen" className="text-primary-500 underline hover:text-river-forest">
            {privateLink}
          </Link>
        </p>
      </Container>
    </section>
  );
}
