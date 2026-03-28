'use client';

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

const HOVER_TEXT: Record<string, string> = {
  agua:     'Bergflüsse und Andenwälder.\nNah an uralten Geschichten.',
  cacao:    'Warme Wege im Kakaotal.\nRadeln und Kakaohandwerk erleben.',
  guadua:   'Bambuswälder zur goldenen Stunde.\nIn die Klänge des Abends eintauchen.',
  paramo:   'Kompakter Hochgebirgsanstieg.\nDünne Luft, rohe Schönheit, weite Stille.',
  volcan:   'Vulkanisches Gelände.\nFahren zwischen hohen Wachspalmen.',
  tigre:    'Malerische Rundstrecken.\nBio-Hof Mittagessen.',
  cafe:     'Kaffeelandschaften.\nSpezialitätenkaffee am Ursprung.',
  oro:      'Farbenfrohe Pueblos.\nLebendiges Kulturerbe erfahren.',
  luminoso: 'Sanftes Landgelände.\nRuhiges Radfahren bei Nacht.',
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

function TourCard({ id, title, imageSrc, imageAlt }: TourGridCardData) {
  const backgroundStyle = {
    background: `linear-gradient(360deg, rgba(0, 0, 0, 0.6) 27.66%, rgba(0, 0, 0, 0) 100%), url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const pathSrc = PATH_SVG[id] ?? '/svg/trails/elements/path-tigre.svg';
  const hoverText = HOVER_TEXT[id] ?? '';
  const [line1, line2] = hoverText.split('\n');

  // Split "Sendero del Tigre" → prefix "SENDERO DEL" + name "TIGRE"
  const delIndex = title.toLowerCase().indexOf(' del ');
  const prefix = delIndex !== -1 ? title.slice(0, delIndex + 5).toUpperCase() : '';
  const trailName = delIndex !== -1 ? title.slice(delIndex + 5).toUpperCase() : title.toUpperCase();

  return (
    <div className="group relative aspect-square w-full overflow-hidden cursor-pointer">
      {/* Photo background */}
      <div className="absolute inset-0" style={backgroundStyle} role="img" aria-label={imageAlt} />

      {/* Default: title at bottom */}
      <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-9">
        <p className="text-center font-sans text-h3 font-medium leading-[32px] tracking-[0.12em] text-[#F2F2F2]">
          {prefix && <span className="font-medium">{prefix}</span>}
          {prefix && ' '}
          <span className="font-bold">{trailName}</span>
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-6 px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <img
          src={pathSrc}
          alt=""
          className="w-32 h-32 object-contain"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          {line1 && <p className="text-body text-gray-600">{line1}</p>}
          {line2 && <p className="text-body text-gray-600">{line2}</p>}
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
