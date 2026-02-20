'use client';

import Image from 'next/image';

interface TourGridCardData {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

interface TourGridProps {
  cards: TourGridCardData[];
}

function FlipCard({ title, imageSrc, imageAlt }: Omit<TourGridCardData, 'id'>) {
  return (
    <div className="flip-card h-80 cursor-pointer rounded-lg shadow-sm">
      <div className="flip-card-inner rounded-lg">
        {/* Front */}
        <div className="flip-card-front flex flex-col overflow-hidden rounded-lg bg-white">
          <div className="relative flex-1">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex items-center justify-center px-4 py-4">
            <p className="text-center text-base font-normal text-gray-800">{title}</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back flex items-center justify-center rounded-lg bg-primary-500 px-6">
          <p className="text-center text-xl font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function TourGrid({ cards }: TourGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          title={card.title}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
        />
      ))}
    </div>
  );
}
