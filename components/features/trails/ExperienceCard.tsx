import Image from 'next/image';
import { Card } from '@/components/ui/Card';

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  location: number;
  locationLabel: string;
  image: string;
}

export function ExperienceCard({
  id,
  title,
  description,
  location,
  locationLabel,
  image,
}: ExperienceCardProps) {
  return (
    <Card
      data-experience-id={id}
      className="overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-h3 mb-2">{title}</h3>
        <p className="text-body text-muted-foreground mb-4">
          {description}
        </p>
        <span className="text-label text-primary-500">
          {locationLabel.replace('{km}', location.toString())}
        </span>
      </div>
    </Card>
  );
}
