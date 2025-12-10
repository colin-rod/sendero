'use client';

import { Container } from '@/components/ui/Container';
import { Link } from '@/lib/i18n/routing';

interface BackToTrailsProps {
  text: string;
}

export function BackToTrails({ text }: BackToTrailsProps) {
  return (
    <section className="py-8 bg-background border-t border-gray-200">
      <Container>
        <Link
          href="/trails"
          className="text-label text-primary-500 hover:text-primary-600 inline-flex items-center gap-2"
        >
          ← {text}
        </Link>
      </Container>
    </section>
  );
}
