import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface MtbReisenCasaTacayProps {
  heading: string;
  text: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export function MtbReisenCasaTacay({ heading, text, features, image, imageAlt }: MtbReisenCasaTacayProps) {
  return (
    <section className="relative bg-gray-950 py-24 md:py-32">
      {/* TODO(image): see `images.casaTacay` in lib/data/mtbReisen.ts */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gray-950/50" />

      <Container className="relative">
        <div className="flex flex-col items-start gap-6">
          <Image src="/images/mtb-reisen/divider.svg" alt="" width={55} height={4} className="opacity-80" />
          <h2 className="text-h2 text-white text-balance max-w-heading">{heading}</h2>
          <p className="text-base leading-[26px] text-white/90 max-w-text">{text}</p>
          <ul className="flex flex-col gap-3 mt-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-base leading-[26px] text-white">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
