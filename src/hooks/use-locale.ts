'use client';

import { useCallback, useTransition } from 'react';
import { useLocale as useNextIntlLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n';

export function useLocale() {
  const locale = useNextIntlLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const setLocale = useCallback((newLocale: Locale) => {
    if (!locales.includes(newLocale)) return;

    startTransition(() => {
      // Set cookie and reload to apply new locale
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  }, []);

  return {
    locale,
    setLocale,
    isPending,
  };
}
