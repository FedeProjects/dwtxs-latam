import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Category } from '../content/specs';
import { categorySegments, routes, type Page } from './routes';
import { catalog, defaultLang, langs, locales, ui, type Lang } from './ui';

export function isLang(value: string | undefined): value is Lang {
  return langs.includes(value as Lang);
}

/** `/es/...` → `es`; anything else → default locale (pt is served at the root). */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['pt']): string {
    return ui[lang][key];
  };
}

/** Labels for categories and the spec sheet in the given language. */
export function useCatalogLabels(lang: Lang) {
  return catalog[lang];
}

export function homePath(lang: Lang): string {
  return getRelativeLocaleUrl(lang, '');
}

export function pagePath(lang: Lang, page: Page): string {
  return getRelativeLocaleUrl(lang, routes[lang][page]);
}

export function categoryPath(lang: Lang, category: Category): string {
  return getRelativeLocaleUrl(lang, `${routes[lang].machines}/${categorySegments[lang][category]}`);
}

export function modelPath(lang: Lang, category: Category, slug: string): string {
  return getRelativeLocaleUrl(
    lang,
    `${routes[lang].machines}/${categorySegments[lang][category]}/${slug}`,
  );
}

/** Replaces `{name}` placeholders in a translated string. */
export function fill(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

export function formatNumber(lang: Lang, value: number): string {
  return new Intl.NumberFormat(locales[lang]).format(value);
}

/** `12000, "N·m"` → "12.000 N·m". Degrees go without a space: "13–19°". */
export function formatQuantity(lang: Lang, value: number | string, unit?: string): string {
  const text = typeof value === 'number' ? formatNumber(lang, value) : value;
  if (!unit) return text;
  return unit === '°' ? `${text}${unit}` : `${text} ${unit}`;
}
