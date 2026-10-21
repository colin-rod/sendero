import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface MtbReisenHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  /** Pre-formatted price lines, e.g. "3.290 € / 7 Tage" */
  prices: string[];
  /** Footnote under the prices, e.g. "*Einzelzimmer +300 €" */
  priceNote: string;
  secondaryCta: string;
  /** In-page anchor for the secondary CTA, e.g. `#region` */
  secondaryHref: string;
  heroImage: string;
}

export function MtbReisenHero({
  eyebrow,
  title,
  text,
  prices,
  priceNote,
  secondaryCta,
  secondaryHref,
  heroImage,
}: MtbReisenHeroProps) {
  return (
    <section className="relative flex min-h-[640px] md:min-h-[760px] w-full flex-col justify-end bg-gray-950">
      {/* TODO(image): see `images.hero` in lib/data/mtbReisen.ts */}
      <Image
        src={heroImage}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Top padding keeps the copy clear of the fixed header (116px) */}
      <div className="relative flex flex-col items-center gap-8 pt-[164px] pb-20 px-4">
        <div className="flex max-w-heading flex-col items-center gap-4 text-center">
          <p className="text-caption text-white/90 tracking-[0.06em] uppercase">{eyebrow}</p>
          <h1 className="text-display text-white text-balance">{title}</h1>
          <p className="text-base leading-[26px] text-white/90 max-w-text">{text}</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-h3 text-white">
            {prices.map((price) => (
              <span key={price}>{price}</span>
            ))}
          </p>
          <p className="text-caption text-white/80">{priceNote}</p>
        </div>
        <a href={secondaryHref}>
          <Button variant="hero-cta-secondary" className="w-[260px]">{secondaryCta}</Button>
        </a>
        <Image
          src="/images/mtb-reisen/divider.svg"
          alt=""
          width={55}
          height={4}
          className="opacity-80"
        />
      </div>
    </section>
  );
}
