'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

interface TrailBookingCTAProps {
  heading: string;
  buttonText: string;
  subtext: string;
  placeholder: string;
}

export function TrailBookingCTA({
  heading,
  buttonText,
  subtext,
  placeholder,
}: TrailBookingCTAProps) {
  return (
    <section className="py-20 md:py-32 bg-primary-500">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-h2 text-foreground mb-6">{heading}</h2>
          <p className="text-body text-foreground/80 mb-8">{subtext}</p>

          {/* Placeholder - Link to waitlist */}
          <Link href="/#waitlist">
            <Button size="lg" variant="secondary">
              {buttonText}
            </Button>
          </Link>

          <p className="text-label text-foreground/70 mt-4">{placeholder}</p>
        </div>
      </Container>
    </section>
  );
}
