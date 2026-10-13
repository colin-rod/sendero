import Image from 'next/image';

interface GalleryItem {
  caption: string;
  alt: string;
}

interface AnfragenGalleryProps {
  heading: string;
  items: GalleryItem[];
}

const IMAGE_SRCS = [
  '/images/anfragen/gallery-nebelwald.jpg',
  '/images/anfragen/gallery-finca.jpg',
  '/images/anfragen/gallery-gastgeber.jpg',
  '/images/anfragen/gallery-gruppe.jpg',
];

export function AnfragenGallery({ heading, items }: AnfragenGalleryProps) {
  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1344px]">
        <h2 className="text-h2 mb-8 font-normal text-foreground">{heading}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {items.map((item, index) => (
            <figure key={item.caption} className="m-0 flex flex-col gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-200">
                <Image
                  src={IMAGE_SRCS[index % IMAGE_SRCS.length]}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1100px) 25vw, (min-width: 560px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-base leading-[26px] text-gray-700">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
