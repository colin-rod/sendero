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

      <Container size="md" className="relative flex flex-col items-center gap-8 text-center">
        <Image src="/images/mtb-reisen/divider.svg" alt="" width={55} height={4} className="opacity-80" />
        <h2 className="text-h2 text-white text-balance">{heading}</h2>
        <p className="text-base leading-[26px] text-white max-w-2xl">{text}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {features.map((feature, index) => (
            <li key={feature} className="flex items-center gap-3">
              {index > 0 && <span className="text-white/40" aria-hidden="true">·</span>}
              <span className="text-caption text-accent-400 tracking-[0.06em] uppercase">{feature}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
