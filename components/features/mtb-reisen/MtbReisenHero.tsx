import Image from 'next/image';

interface MtbReisenHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

export function MtbReisenHero({ title, subtitle, heroImage }: MtbReisenHeroProps) {
  return (
    <section className="relative h-[560px] md:h-[720px] w-full">
      <Image
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-end gap-8 pb-20 px-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-caption text-white/90 tracking-[0.06em] uppercase">{subtitle}</p>
          <h1 className="text-display text-white">{title}</h1>
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
