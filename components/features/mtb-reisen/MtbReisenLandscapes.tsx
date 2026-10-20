import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface MtbReisenLandscapesProps {
  heading: string;
  text: string;
  items: string[];
  /** One image per item, same order (see `images.landscapes` in lib/data/mtbReisen.ts) */
  images: string[];
}

export function MtbReisenLandscapes({ heading, text, items, images }: MtbReisenLandscapesProps) {
  return (
    <section className="bg-background py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="max-w-text">
          <h2 className="text-h2 text-foreground text-balance mb-6">{heading}</h2>
          <p className="text-base leading-[26px] text-foreground">{text}</p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <li key={item}>
              <figure className="m-0 flex flex-col gap-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-component-card bg-gray-200">
                  {/* TODO(image): motif named in `images.landscapes` in lib/data/mtbReisen.ts */}
                  <Image
                    src={images[index % images.length]}
                    alt={item}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-body-em text-foreground">{item}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
