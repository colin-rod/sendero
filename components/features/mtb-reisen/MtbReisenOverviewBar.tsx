interface MtbReisenOverviewBarProps {
  overview: string;
  included: string;
  itinerary: string;
  dates: string;
}

export function MtbReisenOverviewBar({
  overview,
  included,
  itinerary,
  dates,
}: MtbReisenOverviewBarProps) {
  const links = [
    { label: overview, href: '#overview' },
    { label: included, href: '#included' },
    { label: itinerary, href: '#itinerary' },
    { label: dates, href: '#dates' },
  ];

  return (
    <nav
      className="bg-gray-950 py-8 px-4"
      aria-label={overview}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
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
    </nav>
  );
}
