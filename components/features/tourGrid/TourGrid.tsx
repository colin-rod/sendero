'use client';

interface TourGridCardData {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

interface TourGridProps {
  heading: string;
  subheading: string;
  cards: TourGridCardData[];
}

function FlipCard({ title, imageSrc }: Omit<TourGridCardData, 'id'>) {
  const backgroundStyle = {
    background: `linear-gradient(360deg, rgba(0, 0, 0, 0.6) 27.66%, rgba(0, 0, 0, 0) 100%), url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

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
              className="text-center font-['Helvetica_Neue'] text-[28px] leading-[32px] tracking-[0.12em]"
              style={{ fontWeight: 200, color: '#F2F2F2' }}
            >
              {title}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex items-center justify-center px-6"
          style={{ backgroundColor: '#e2b71f' }}
        >
          <p className="text-center text-xl font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function TourGrid({ heading, subheading, cards }: TourGridProps) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-['Helvetica_Neue'] text-[32px] font-bold leading-[145%] tracking-[0] text-[#1D1D1F] align-middle">
          {heading}
        </h2>
        <p className="font-['Helvetica_Neue'] text-[32px] font-normal leading-[145%] tracking-[0] text-[#1D1D1F] align-middle">
          {subheading}
        </p>
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {cards.map((card) => (
          <FlipCard
            key={card.id}
            title={card.title}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}
