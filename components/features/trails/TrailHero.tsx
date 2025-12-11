import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import type { TrailStats } from '@/lib/types/trails';
import { getDifficultyBadgeProps } from '@/lib/utils/difficulty';

interface TrailHeroProps {
  name: string;
  subtitle: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  stats: TrailStats;
  heroImage: string;
  difficultyLabel: string;
  distanceLabel: string;
  durationLabel: string;
  elevationLabel: string;
  elevationGainLabel: string;
  elevationLossLabel: string;
}

export function TrailHero({
  name,
  subtitle,
  difficulty,
  stats,
  heroImage,
  difficultyLabel,
  distanceLabel,
  durationLabel,
  elevationLabel,
  elevationGainLabel,
  elevationLossLabel,
}: TrailHeroProps) {
  return (
    <section className="relative w-full">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={heroImage}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-12">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white">{name}</h1>
              <Badge variant={getDifficultyBadgeProps(difficulty).variant}>
                {difficultyLabel}
              </Badge>
            </div>
            <p className="text-h3 text-white/90 max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-background border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Distance */}
            <div className="text-center md:text-left">
              <p className="text-label text-muted-foreground mb-1">
                {distanceLabel}
              </p>
              <p className="text-h3">{stats.distance} km</p>
            </div>

            {/* Duration */}
            <div className="text-center md:text-left">
              <p className="text-label text-muted-foreground mb-1">
                {durationLabel}
              </p>
              <p className="text-h3">{stats.duration}</p>
            </div>

            {/* Elevation Gain */}
            <div className="text-center md:text-left">
              <p className="text-label text-muted-foreground mb-1">
                {elevationLabel} {elevationGainLabel}
              </p>
              <p className="text-h3">+{stats.elevationGain}m</p>
            </div>

            {/* Elevation Loss */}
            <div className="text-center md:text-left">
              <p className="text-label text-muted-foreground mb-1">
                {elevationLabel} {elevationLossLabel}
              </p>
              <p className="text-h3">-{stats.elevationLoss}m</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
