'use client';

import { useState } from 'react';

const PATH_SVG: Record<string, string> = {
  tigre:    '/svg/trails/elements/path-tigre.svg',
  cafe:     '/svg/trails/elements/path-cafe.svg',
  agua:     '/svg/trails/elements/path-agua.svg',
  cacao:    '/svg/trails/elements/path-cacao.svg',
  volcan:   '/svg/trails/elements/path-volcan.svg',
  paramo:   '/svg/trails/elements/path-paramo.svg',
  guadua:   '/svg/trails/elements/path-guadua.svg',
  oro:      '/svg/trails/elements/path-oro.svg',
  luminoso: '/svg/trails/elements/path-luminoso.svg',
};

interface TourGridCardData {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description?: string;
  distance?: string;
  difficulty?: string;
}

interface TourGridProps {
  cards: TourGridCardData[];
  heading?: string;
  subheading?: string;
}

function TourCard({ id, title, imageSrc, imageAlt, description }: TourGridCardData) {
  const [isActive, setIsActive] = useState(false);
  const backgroundStyle = {
    background: `linear-gradient(360deg, rgba(0, 0, 0, 0.6) 27.66%, rgba(0, 0, 0, 0) 100%), url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const pathSrc = PATH_SVG[id] ?? '/svg/trails/elements/path-tigre.svg';
  const dotIndex = description ? description.indexOf('. ') : -1;
  const line1 = description
    ? (dotIndex !== -1 ? description.slice(0, dotIndex + 1) : description)
    : '';
  const line2 = description && dotIndex !== -1 ? description.slice(dotIndex + 2) : '';

  // Split on last word: prefix is everything before, trailName is the last word
  const lastSpaceIndex = title.lastIndexOf(' ');
  const prefix = lastSpaceIndex !== -1 ? title.slice(0, lastSpaceIndex).toUpperCase() : '';
  const trailName = lastSpaceIndex !== -1 ? title.slice(lastSpaceIndex + 1).toUpperCase() : title.toUpperCase();

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden cursor-circled-dot"
      onClick={() => setIsActive((prev) => !prev)}
    >
      {/* Photo background */}
      <div className="absolute inset-0" style={backgroundStyle} role="img" aria-label={imageAlt} />

      {/* Default: title at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-9">
        <p className="text-center text-h3 font-light leading-8 tracking-[0.12em] text-[#F2F2F2]">
          {prefix && <span className="font-light">{prefix}</span>}
          {prefix && ' '}
          <span className="font-bold">{trailName}</span>
        </p>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-white flex flex-col items-center px-6 py-[54px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100' : ''}`}>
        <div className="flex-1 flex items-center justify-center">
          <img
            src={pathSrc}
            alt=""
            className="w-full aspect-square object-contain"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center pb-9">
          {line1 && <p className="text-body font-bold text-foreground">{line1}</p>}
          {line2 && <p className="text-body font-normal text-foreground">{line2}</p>}
        </div>
      </div>
    </div>
  );
}

export function TourGrid({ cards, heading, subheading }: TourGridProps) {
  return (
    <div className="space-y-10">
      {(heading || subheading) && (
        <div className="text-center space-y-2">
          {heading && <h2 className="text-h2 font-bold">{heading}</h2>}
          {subheading && <p className="text-body">{subheading}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {cards.map((card) => (
          <TourCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
