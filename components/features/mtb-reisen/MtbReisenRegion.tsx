import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface MtbReisenRegionProps {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

/** Short chronicle of the region beside a photo. */
export function MtbReisenRegion({ id, eyebrow, heading, paragraphs, image, imageAlt }: MtbReisenRegionProps) {
  return (
    <section id={id} className="scroll-mt-[116px] bg-background py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-x-8 gap-y-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-component-card bg-gray-200">
          {/* TODO(image): see `images.region` in lib/data/mtbReisen.ts */}
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-label text-primary-500 tracking-[0.06em]">{eyebrow}</p>
          <h2 className="text-h2 text-foreground text-balance max-w-heading">{heading}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-[26px] text-foreground max-w-text">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
