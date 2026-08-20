'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

type MtbReisenNavDropdownProps = {
  isWhiteLogo: boolean;
};

export function MtbReisenNavDropdown({ isWhiteLogo }: MtbReisenNavDropdownProps) {
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 text-caption font-medium tracking-[0.06em] uppercase transition-opacity hover:opacity-70 cursor-pointer ${isWhiteLogo ? 'text-white' : 'text-foreground'}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {t('nav.mtbReisen')}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 rounded-md bg-gray-950/95 border border-white/20 shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              href="/mtb-reisen"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-4 py-2 text-caption text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              {t('nav.mtbReisenNineDays')}
            </Link>
            <Link
              href="/mtb-reisen-7-tage"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-4 py-2 text-caption text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              {t('nav.mtbReisenSevenDays')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
