'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SelectChips } from '@/components/features/anfragen/SelectChips';
import { daysForVariant } from '@/lib/data/mtbReisen';
import type { MtbReisenVariantKey } from '@/lib/types/mtbReisen';

export interface ItineraryDay {
  key: string;
  nineDaysOnly?: boolean;
  image: string;
  title: string;
  text: string;
  meals: string;
  /** Pre-formatted "km · Hm" line; empty on arrival/departure days */
  stats?: string;
}

interface MtbReisenItineraryProps {
  id: string;
  heading: string;
  intro: string;
  toggleLabel: string;
  variantLabels: Record<MtbReisenVariantKey, string>;
  dayLabel: string;
  nineOnlyLabel: string;
  mealsLabel: string;
  days: ItineraryDay[];
}

export function MtbReisenItinerary({
  id,
  heading,
  intro,
  toggleLabel,
  variantLabels,
  dayLabel,
  nineOnlyLabel,
  mealsLabel,
  days,
}: MtbReisenItineraryProps) {
  const [variant, setVariant] = useState<MtbReisenVariantKey>('nine');
  const visibleDays = daysForVariant(days, variant);

  return (
    <section id={id} className="scroll-mt-[180px] bg-gray-950">
      <Container size="md" className="flex flex-col gap-8 py-20 md:py-28">
        <h2 className="text-h2 text-white">{heading}</h2>
        <p className="text-base leading-[26px] text-white max-w-2xl">{intro}</p>
        <div role="group" aria-label={toggleLabel}>
          <SelectChips<MtbReisenVariantKey>
            options={[
              { value: 'nine', label: variantLabels.nine },
              { value: 'seven', label: variantLabels.seven },
            ]}
            selected={[variant]}
            // Single mode clears on a second click; keep the current variant instead
            onChange={(next) => next[0] && setVariant(next[0])}
          />
        </div>
      </Container>

      <ol>
        {visibleDays.map((day) => (
          <li key={day.key} className="relative py-16 md:py-28">
            {/* TODO(image): motif named in `days` in lib/data/mtbReisen.ts */}
            <Image
              src={day.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />

            <Container size="md" className="relative">
              <article className="bg-white p-8 md:p-12 flex flex-col gap-6 max-w-3xl">
                <div className="flex flex-col gap-4">
                  <p className="text-label text-primary-500 tracking-[0.06em] uppercase">
                    {dayLabel} <span className="font-bold">{day.number}</span>
                    {variant === 'nine' && day.nineDaysOnly && (
                      <span className="ml-3 text-lava">· {nineOnlyLabel}</span>
                    )}
                  </p>
                  <h3 className="text-h2 text-lava">{day.title}</h3>
                  <p className="text-base leading-[26px] text-foreground">{day.text}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {day.stats && (
                    <p className="text-h3 text-foreground font-thin">{day.stats}</p>
                  )}
                  <p className="text-body text-foreground">
                    {mealsLabel} <span className="text-primary-500">{day.meals}</span>
                  </p>
                </div>
              </article>
            </Container>
          </li>
        ))}
      </ol>
    </section>
  );
}
