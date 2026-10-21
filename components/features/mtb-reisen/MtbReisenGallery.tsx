import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface GalleryItem {
  caption: string;
  alt: string;
}

interface MtbReisenGalleryProps {
  heading: string;
  items: GalleryItem[];
  /** One per item, same order (see `images.gallery` in lib/data/mtbReisen.ts) */
  images: string[];
}

/** Horizontally scrolling photo strip. */
export function MtbReisenGallery({ heading, items, images }: MtbReisenGalleryProps) {
  return (
    <section className="bg-background py-20 md:py-28">
      <Container>
        <h2 className="text-h2 text-foreground text-balance max-w-heading mb-10">{heading}</h2>

        {/* Focusable so keyboard users can scroll the strip */}
        <ul
          tabIndex={0}
          aria-label={heading}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {items.map((item, index) => (
            <li key={item.caption} className="w-[70vw] max-w-[300px] flex-none snap-start">
              <figure className="m-0 flex flex-col gap-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-component-card bg-gray-200">
                  {/* TODO(image): motif named in `images.gallery` in lib/data/mtbReisen.ts */}
                  <Image
                    src={images[index % images.length]}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 300px, 70vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-body-em text-foreground">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
