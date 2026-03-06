import Image from 'next/image';

export function NewsletterHeroSection() {
  return (
    <section
      className="w-full bg-[#131313]"
      aria-label="Sendero newsletter hero"
      data-testid="newsletter-hero-section"
    >
      <div
        className="relative w-full aspect-[1200/714]"
        data-testid="newsletter-hero-image-wrap"
      >
        <Image
          src="/Hero Newsletter.svg"
          alt="Sendero newsletter hero artwork"
          fill
          className="object-contain"
          sizes="100vw"
          priority={false}
        />
      </div>
    </section>
  );
}
