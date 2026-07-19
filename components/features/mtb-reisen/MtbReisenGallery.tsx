import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface MtbReisenGalleryProps {
  images: [string, string, string];
  title: string;
}

export function MtbReisenGallery({ images, title }: MtbReisenGalleryProps) {
  return (
    <section className="bg-landscape-verde-hoja py-14">
      <Container size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={image} className="relative h-[280px] w-full overflow-hidden rounded-component-card">
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
