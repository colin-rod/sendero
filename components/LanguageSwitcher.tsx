'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded transition-colors
            ${
              locale === loc
                ? 'bg-primary-500 text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          `}
          aria-label={`Switch to ${
            loc === 'en' ? 'English' :
            loc === 'de' ? 'German' :
            'Spanish'
          }`}
          aria-current={locale === loc ? 'true' : 'false'}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
