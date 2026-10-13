import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

interface MtbReisenHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  primaryCta: string;
  secondaryCta: string;
  /** In-page anchor for the secondary CTA, e.g. `#tag-fuer-tag` */
  secondaryHref: string;
  heroImage: string;
}

export function MtbReisenHero({
  eyebrow,
  title,
  text,
  primaryCta,
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
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-caption text-white/90 tracking-[0.06em] uppercase">{eyebrow}</p>
          <h1 className="text-display text-white text-balance">{title}</h1>
          <p className="text-base leading-[26px] text-white/90 max-w-xl">{text}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/anfragen">
            <Button variant="hero-cta">{primaryCta}</Button>
          </Link>
          <a href={secondaryHref}>
            <Button variant="hero-cta-secondary">{secondaryCta}</Button>
          </a>
        </div>
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
