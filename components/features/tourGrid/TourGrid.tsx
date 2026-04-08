'use client';

import { useState, useEffect, useRef } from 'react';

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

function TrailSVG({ src, animate, animKey }: { src: string; animate: boolean; animKey: number }) {
  const [svgContent, setSvgContent] = useState<string>('');
  const fetchedRef = useRef<string>('');

  useEffect(() => {
    if (fetchedRef.current === src) return;
    fetchedRef.current = src;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        // Inject pathLength="1" onto every <path> so stroke-dashoffset 0→1 works
        const patched = text.replace(/<path /g, '<path pathLength="1" ');
        setSvgContent(patched);
      })
      .catch(() => {});
  }, [src]);

  if (!svgContent) return null;

  return (
    <div
      key={animKey}
      className={`trail-svg-wrapper w-full aspect-square${animate ? ' trail-animate' : ''}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-hidden="true"
    />
  );
}

function TourCard({ id, title, imageSrc, imageAlt, description }: TourGridCardData) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

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

  const isVisible = isActive || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setAnimKey((k) => k + 1); // restart animation each hover
  };
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden cursor-pointer"
      onClick={() => {
        // On desktop the user is always hovering when they click, so isHovered is true
        // and we skip — hover alone controls visibility. On mobile, isHovered is always
        // false (no mouse events), so taps exclusively toggle the active state.
        if (!isHovered) {
          const opening = !isActive;
          setIsActive(opening);
          if (opening) setAnimKey((k) => k + 1);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <div className={`absolute inset-0 bg-white flex flex-col items-center px-6 py-[54px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="flex-1 flex items-center justify-center">
          <TrailSVG src={pathSrc} animate={isVisible} animKey={animKey} />
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
