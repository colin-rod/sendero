'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';
import { Select } from '@/components/ui/Select';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const localeLabels: Record<string, string> = {
    en: '🇺🇸 English',
    de: '🇩🇪 German',
    es: '🇪🇸 Spanish',
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select
      aria-label="Language selector"
      value={locale}
      onChange={(event) => switchLocale(event.target.value)}
      options={locales.map((loc) => ({
        value: loc,
        label: localeLabels[loc] ?? loc.toUpperCase(),
      }))}
      className="h-9 w-auto min-w-[140px] rounded-md border border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    />
  );
}
