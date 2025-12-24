'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/lib/i18n/routing';
import Image from 'next/image';

interface TrailCardProps {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  difficulty: string;
  difficultyLabel: string;
  difficultyBadgeProps: { variant: 'success' | 'warning' | 'error' | 'default' };
  distance: number;
  duration: string;
  distanceLabel: string;
  durationLabel: string;
  ctaText: string;
  comingSoon?: boolean;
  comingSoonLabel?: string;
}

export function TrailCard({
  id,
  slug,
  name,
  thumbnail,
  difficultyLabel,
  difficultyBadgeProps,
  distance,
  duration,
  distanceLabel,
  durationLabel,
  ctaText,
  comingSoon = false,
  comingSoonLabel,
}: TrailCardProps) {
  // Card content JSX
  const cardContent = (
    <Card className="overflow-hidden h-full">
      {/* Trail Image */}
      <div className="relative h-48 w-full">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Coming Soon Badge */}
        {comingSoon && comingSoonLabel && (
          <div className="absolute top-4 right-4 bg-primary-500 text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {comingSoonLabel}
          </div>
        )}
      </div>

      {/* Trail Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-h3">{name}</h3>
          <Badge variant={difficultyBadgeProps.variant}>{difficultyLabel}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-label text-muted-foreground">
              {distanceLabel}
            </p>
            <p className="text-body font-semibold">{distance} km</p>
          </div>
          <div>
            <p className="text-label text-muted-foreground">
              {durationLabel}
            </p>
            <p className="text-body font-semibold">{duration}</p>
          </div>
        </div>

        {!comingSoon && (
          <p className="text-label text-primary-500 hover:text-primary-600">
            {ctaText} →
          </p>
        )}
      </div>
    </Card>
  );

  // For coming soon cards, render as div instead of Link
  if (comingSoon) {
    return (
      <div
        key={id}
        className="block cursor-not-allowed opacity-75"
        aria-disabled="true"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      key={id}
      href={`/trails/${slug}`}
      className="block transition-transform hover:-translate-y-1"
    >
      {cardContent}
    </Link>
  );
}
