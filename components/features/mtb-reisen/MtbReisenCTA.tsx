'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import posthog from 'posthog-js';

interface MtbReisenCTAProps {
  heading: string;
  text: string;
  buttonText: string;
  image: string;
}

export function MtbReisenCTA({ heading, text, buttonText, image }: MtbReisenCTAProps) {
  return (
    <section className="relative bg-[#131313] py-24 md:py-32">
      {/* TODO(image): see `images.cta` in lib/data/mtbReisen.ts */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Container className="relative text-center flex flex-col items-center gap-8">
        <h2 className="text-h3 text-white font-light tracking-[0.06em] max-w-heading">{heading}</h2>
        <p className="text-base leading-[26px] text-white/90 max-w-text">{text}</p>
        <Link
          href="/anfragen"
          onClick={() => posthog.capture('mtb_reisen_cta_clicked', { source: 'mtb_reisen_page' })}
        >
          <Button variant="hero-cta" className="w-[260px]">{buttonText}</Button>
        </Link>
      </Container>
    </section>
  );
}
