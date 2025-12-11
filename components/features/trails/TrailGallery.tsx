import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface TrailGalleryProps {
  heading: string;
  images: string[];
  trailName: string;
}

export function TrailGallery({ heading, images, trailName }: TrailGalleryProps) {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <Container>
        <h2 className="text-h2 text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`${trailName} - Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
