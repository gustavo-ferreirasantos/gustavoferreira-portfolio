import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale } from '../data/types';
import { I18nContext } from './I18nContext';
import { messages, readDocumentLocale } from './messages';

const STORAGE_KEY = 'locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readDocumentLocale);
  const t = messages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [locale, t]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem armazenamento disponível, a escolha vale só para esta visita.
    }
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next === 'en-US' ? 'en' : 'pt');
      window.history.replaceState(window.history.state, '', url);
    }
  }, []);

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
