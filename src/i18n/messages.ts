import type { Locale } from '../data/types';
import { enUS } from './locales/en-US';
import { ptBR } from './locales/pt-BR';
import type { Messages } from './types';

export const messages: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

/** Idioma já resolvido pelo script inline do index.html. */
export function readDocumentLocale(): Locale {
  return document.documentElement.lang === 'en-US' ? 'en-US' : 'pt-BR';
}
