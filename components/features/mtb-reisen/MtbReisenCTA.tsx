'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import posthog from 'posthog-js';

interface MtbReisenCTAProps {
  heading: string;
  buttonText: string;
}

export function MtbReisenCTA({ heading, buttonText }: MtbReisenCTAProps) {
  return (
    <section className="relative bg-[#131313] py-24 md:py-32">
      <Image
        src="/Hero Newsletter.svg"
        alt=""
        fill
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <Container size="md" className="relative text-center flex flex-col items-center gap-8">
        <h2 className="text-h3 text-white font-light tracking-[0.06em] max-w-xl">{heading}</h2>
        <Link
          href="/contact"
          onClick={() => posthog.capture('mtb_reisen_cta_clicked', { source: 'mtb_reisen_page' })}
        >
          <Button size="lg" variant="secondary">
            {buttonText}
          </Button>
        </Link>
      </Container>
    </section>
  );
}
