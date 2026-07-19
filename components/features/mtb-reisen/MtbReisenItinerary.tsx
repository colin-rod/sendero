import type { MtbReisenDay } from '@/lib/types/mtbReisen';

interface DayCopy {
  title: string;
  description: string;
  meals: string;
}

interface MtbReisenItineraryProps {
  heading: string;
  dayLabel: string;
  mealsIncludedLabel: string;
  days: MtbReisenDay[];
  dayCopy: DayCopy[];
}

export function MtbReisenItinerary({
  heading,
  dayLabel,
  mealsIncludedLabel,
  days,
  dayCopy,
}: MtbReisenItineraryProps) {
  return (
    <section id="itinerary" className="bg-gray-950 py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <h2 className="text-h2 text-white">{heading}</h2>

        <ol className="flex flex-col gap-8">
          {days.map((day, index) => {
            const copy = dayCopy[index];
            if (!copy) return null;
            const hasStats = day.distanceKm > 0;

            return (
              <li key={day.day} className="bg-white p-8 md:p-12 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-label text-primary-500 tracking-[0.06em] uppercase">
                    {dayLabel} <span className="font-bold">{day.day}</span>
                  </p>
                  <h3 className="text-h2 text-lava">{copy.title}</h3>
                  <div className="text-body text-foreground space-y-4">
                    {copy.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {hasStats && (
                    <p className="text-h3 text-foreground font-thin">
                      {day.distanceKm} km · {day.elevationGainM} ↗
                    </p>
                  )}
                  <p className="text-body text-foreground">
                    {mealsIncludedLabel} <span className="text-primary-500">{copy.meals}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
