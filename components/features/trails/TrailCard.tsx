'use client';

import { Link } from '@/lib/i18n/routing';

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
  comingSoon = false,
}: TrailCardProps) {
  const lastSpaceIndex = name.lastIndexOf(' ');
  const prefix = lastSpaceIndex !== -1 ? name.slice(0, lastSpaceIndex).toUpperCase() : null;
  const trailName = lastSpaceIndex !== -1 ? name.slice(lastSpaceIndex + 1).toUpperCase() : name.toUpperCase();

  const cardContent = (
    <div
      className="relative flex flex-col justify-end items-center w-full h-[476px] rounded-sm overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.6) 27.66%, rgba(0, 0, 0, 0) 100%), url(${thumbnail})`,
      }}
    >
      <div className="flex flex-col items-center px-6 py-9 w-full">
        <h3 className="font-aboreto text-[28px] leading-8 tracking-[0.12em] text-center text-[#F2F2F7]">
          {prefix && <span className="font-normal">{prefix}</span>}
          {prefix && ' '}
          <span className="font-bold">{trailName}</span>
        </h3>
      </div>
    </div>
  );

  if (comingSoon) {
    return (
      <div key={id} className="block" aria-disabled="true">
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
