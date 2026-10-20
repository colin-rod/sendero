import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

interface SectionLink {
  label: string;
  href: string;
}

interface MtbReisenOverviewBarProps {
  ariaLabel: string;
  links: SectionLink[];
  ctaLabel: string;
}

/** Section nav that sticks right below the fixed header (116px tall). */
export function MtbReisenOverviewBar({ ariaLabel, links, ctaLabel }: MtbReisenOverviewBarProps) {
  return (
    <nav
      className="sticky top-[116px] z-40 bg-gray-950 py-3"
      aria-label={ariaLabel}
    >
      <Container className="flex items-center justify-between gap-6">
        <ul className="flex items-center gap-x-3 overflow-x-auto whitespace-nowrap">
          {links.map((link, index) => (
            <li key={link.href} className="flex items-center gap-3">
              {index > 0 && <span className="text-white/40" aria-hidden="true">|</span>}
              <a
                href={link.href}
                className="text-caption text-white tracking-[0.06em] uppercase hover:text-primary-300 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/anfragen" className="hidden sm:block flex-none">
          <Button variant="hero-cta">{ctaLabel}</Button>
        </Link>
      </Container>
    </nav>
  );
}
