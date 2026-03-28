'use client';

const ELEMENT_SVG: Record<string, string> = {
  tigre:    '/svg/trails/elements/element-tierra.svg',
  cafe:     '/svg/trails/elements/element-cafe.svg',
  agua:     '/svg/trails/elements/element-agua.svg',
  cacao:    '/svg/trails/elements/element-cacao.svg',
  volcan:   '/svg/trails/elements/element-volcan.svg',
  paramo:   '/svg/trails/elements/element-paramo.svg',
  guadua:   '/svg/trails/elements/element-guadua.svg',
  oro:      '/svg/trails/elements/element-oro.svg',
  luminoso: '/svg/trails/elements/element-luminoso.svg',
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

function FlipCard({ id, title, imageSrc, description, distance, difficulty }: TourGridCardData) {
  const backgroundStyle = {
    background: `linear-gradient(360deg, rgba(0, 0, 0, 0.6) 27.66%, rgba(0, 0, 0, 0) 100%), url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const elementSrc = ELEMENT_SVG[id] ?? '/svg/trails/elements/element-tierra.svg';

  return (
    <div className="flip-card h-[476px] min-w-[300px] w-[330px] cursor-pointer">
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front flex flex-col justify-end items-center"
          style={backgroundStyle}
        >
          <div className="flex flex-col items-center px-6 pb-9">
            <p
              className="text-center font-sans text-h3 font-medium leading-[32px] tracking-[0.12em]"
              style={{ color: '#F2F2F2' }}
            >
              {title}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex flex-col justify-center items-center px-6 gap-8"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Thread symbol illustration */}
          <img
            src={elementSrc}
            alt=""
            className="w-[180px] h-[190px] object-contain"
            aria-hidden="true"
          />

          {/* Text content */}
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-center font-['Helvetica_Neue'] text-[20px] font-semibold text-[#1D1D1F]">
              {title}
            </p>
            {description && (
              <p className="text-center text-sm text-[#616161] leading-snug">
                {description}
              </p>
            )}
            {(distance || difficulty) && (
              <p className="text-center text-sm text-[#616161]">
                {[distance, difficulty].filter(Boolean).join(' | ')}
              </p>
            )}
          </div>
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
      <div className="flex flex-wrap gap-10 justify-center">
        {cards.map((card) => (
          <FlipCard
            key={card.id}
            id={card.id}
            title={card.title}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            description={card.description}
            distance={card.distance}
            difficulty={card.difficulty}
          />
        ))}
      </div>
    </div>
  );
}
