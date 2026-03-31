'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const localeLabels: Record<string, string> = {
    en: 'EN',
    de: 'DE',
    es: 'ES',
  };

  const switchLocale = (newLocale: string) => {
    const cleanPath = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/';
    router.replace(cleanPath, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
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
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg border-2 border-[#1B1B1B] px-2.5 py-1 text-caption font-medium text-foreground transition-colors hover:bg-[#1B1B1B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        <Image
          src="/globe.svg"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4"
        />
        <span>{localeLabels[locale]}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md bg-[rgba(27,27,27,0.95)] border border-white/20 shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`block w-full text-left px-4 py-2 text-caption transition-colors ${
                  locale === loc
                    ? 'bg-primary-500/20 text-white font-semibold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                role="menuitem"
              >
                {localeLabels[loc] ?? loc.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
