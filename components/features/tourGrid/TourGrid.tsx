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
  elevation?: string;
  elevationGain?: string;
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
        const patched = text
          // Remove fixed dimensions so the SVG scales to its container via viewBox
          .replace(/(<svg[^>]*)\s+width="[^"]*"\s+height="[^"]*"/, '$1 width="100%" height="100%"')
          // Inject pathLength="1" onto every <path> so stroke-dashoffset 0→1 works
          .replace(/<path /g, '<path pathLength="1" ');
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

function StatPill({ raw, suffix }: { raw: string; suffix?: string }) {
  const sp = raw.indexOf(' ');
  const num = sp !== -1 ? raw.slice(0, sp) : raw;
  const unit = sp !== -1 ? raw.slice(sp) : '';
  return (
    <>
      <span className="font-bold">{num}</span>
      <span className="font-light text-gray-500">{unit}</span>
      {suffix && <span className="font-light text-gray-500"> {suffix}</span>}
    </>
  );
}

function TourCard({ id, title, imageSrc, imageAlt, description, distance, elevation, elevationGain }: TourGridCardData) {
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
    ? (dotIndex !== -1 ? description.slice(0, dotIndex) : description)
    : '';
  const line2 = description && dotIndex !== -1 ? description.slice(dotIndex + 2) : '';

  const isVisible = isActive || isHovered;

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(true);
    setAnimKey((k) => k + 1);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(false);
  };

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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Photo background */}
      <div className="absolute inset-0" style={backgroundStyle} role="img" aria-label={imageAlt} />

      {/* Default: title at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-8 md:pb-[54px]">
        {(() => {
          const lastSpace = title.lastIndexOf(' ');
          const first = lastSpace !== -1 ? title.slice(0, lastSpace) : '';
          const last  = lastSpace !== -1 ? title.slice(lastSpace + 1) : title;
          return (
            <p className="text-center text-h3 font-light leading-8 tracking-[0.12em] uppercase text-[#F2F2F2]">
              {first && <>{first} </>}
              <strong className="font-bold">{last}</strong>
            </p>
          );
        })()}
      </div>

      {/* Hover / tap overlay */}
      <div className={`absolute inset-0 bg-white flex flex-col items-center px-6 pt-6 md:pt-[54px] pb-8 md:pb-[54px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div
          className="flex-1 flex items-center justify-center min-h-0 cursor-default"
          onClick={(e) => e.stopPropagation()}
          onPointerEnter={(e) => e.stopPropagation()}
          onPointerLeave={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-[55%] md:max-w-[70%] pointer-events-none">
            <TrailSVG src={pathSrc} animate={isVisible} animKey={animKey} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          {line1 && <p className="text-xl font-bold text-foreground">{line1}</p>}
          {line2 && <p className="text-base font-normal text-foreground">{line2}</p>}
          {(distance || elevation || elevationGain) && (
            <div className="flex items-center justify-center gap-x-1 text-sm mt-3 flex-wrap">
              {distance && <StatPill raw={distance} />}
              {distance && elevation && <span className="text-gray-400 mx-0.5">·</span>}
              {elevation && <StatPill raw={elevation} />}
              {elevation && elevationGain && <span className="text-gray-400 mx-0.5">·</span>}
              {elevationGain && <StatPill raw={elevationGain} suffix="↗" />}
            </div>
          )}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
        {cards.map((card) => (
          <TourCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
