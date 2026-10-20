import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { daysForVariant } from '@/lib/data/mtbReisen';

export interface ItineraryDay {
  key: string;
  nineDaysOnly?: boolean;
  image: string;
  title: string;
  text: string;
  /** Pre-formatted "km · Hm" line; empty on arrival/departure days */
  stats?: string;
}

interface MtbReisenItineraryProps {
  id: string;
  heading: string;
  intro: string;
  dayLabel: string;
  days: ItineraryDay[];
}

export function MtbReisenItinerary({ id, heading, intro, dayLabel, days }: MtbReisenItineraryProps) {
  // Always the full 9-day trip; the helper still numbers the days
  const visibleDays = daysForVariant(days, 'nine');

  return (
    <section id={id} className="scroll-mt-[116px] bg-gray-950">
      <Container className="flex flex-col gap-8 py-20 md:py-28">
        <h2 className="text-h2 text-white max-w-heading">{heading}</h2>
        <p className="text-base leading-[26px] text-white max-w-text">{intro}</p>
      </Container>

      <ol>
        {visibleDays.map((day) => (
          <li key={day.key} className="relative py-20 md:py-32">
            {/* TODO(image): motif named in `days` in lib/data/mtbReisen.ts */}
            <Image
              src={day.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />

            <Container className="relative">
              <article className="flex flex-col gap-4 max-w-text">
                <p className="text-label text-accent-400 tracking-[0.06em] uppercase">
                  {dayLabel} <span className="font-bold">{day.number}</span>
                </p>
                <h3 className="text-h2 text-white">{day.title}</h3>
                <p className="text-base leading-[26px] text-white/90">{day.text}</p>
                {day.stats && (
                  <p className="text-h3 text-white font-thin mt-2">{day.stats}</p>
                )}
              </article>
            </Container>
          </li>
        ))}
      </ol>
    </section>
  );
}
