import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/routing';

interface InfoCard {
  emoji: string;
  label: string;
  value: React.ReactNode;
}

interface MtbReisenIntroProps {
  backgroundImage: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  priceLabel: string;
  priceValue: string;
  nextDatesLabel: string;
  nextDates: string[];
  bookLabel: string;
  bookCta: string;
}

export function MtbReisenIntro({
  backgroundImage,
  heading,
  paragraph1,
  paragraph2,
  priceLabel,
  priceValue,
  nextDatesLabel,
  nextDates,
  bookLabel,
  bookCta,
}: MtbReisenIntroProps) {
  const cards: InfoCard[] = [
    { emoji: '🗻', label: priceLabel, value: priceValue },
    {
      emoji: '🗓️',
      label: nextDatesLabel,
      value: (
        <>
          {nextDates.map((date) => (
            <span key={date} className="block">
              → {date}
            </span>
          ))}
        </>
      ),
    },
    {
      emoji: '💬',
      label: bookLabel,
      value: (
        <Link href="/buchen" className="underline">
          {bookCta}
        </Link>
      ),
    },
  ];

  return (
    <section id="overview" className="relative bg-gray-950 py-20 md:py-28">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gray-950/60" />

      <Container size="md" className="relative flex flex-col items-center gap-10 text-center">
        <Image src="/images/mtb-reisen/divider.svg" alt="" width={55} height={4} className="opacity-80" />
        <h2 className="text-h2 text-white max-w-2xl">{heading}</h2>
        <div className="text-body text-white max-w-2xl space-y-4 text-left">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
        </div>

        <div id="dates" className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
          {cards.map((card) => (
            <Card key={card.label} className="text-left">
              <p className="text-body mb-2">{card.emoji}</p>
              <p className="text-label font-bold uppercase tracking-[0.06em] mb-2">{card.label}</p>
              <div className="text-body">{card.value}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
