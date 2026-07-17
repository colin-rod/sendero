import Image from 'next/image';

export function NewsletterHeroSection() {
  return (
    <section
      // Intentional near-black arbitrary value — distinct from gray-950 (#1b1b1b), not a design token
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
