/**
 * locales/index.ts — Internationalization (i18n) Resource Loader & Exporter
 */
import { en, LocaleSchema } from './en';
import { ar } from './ar';

export type Locale = 'en' | 'ar';

export const locales: Record<Locale, LocaleSchema> = {
  en,
  ar
};

/**
 * Resolves a nested dot-notation string key or flat key from the locale dictionary.
 * e.g., getTranslation('en', 'common.save') => 'Save'
 *       getTranslation('en', 'looplyPro') => 'Looply Pro'
 */
export function getTranslation(lang: Locale, key: string, fallback?: string): string {
  const dict = locales[lang] || locales.en;

  // 1. Direct match on nested dot-notation (e.g. "common.save", "clinical.dashboard")
  if (key.includes('.')) {
    const parts = key.split('.');
    let curr: any = dict;
    for (const part of parts) {
      if (curr && typeof curr === 'object' && part in curr) {
        curr = curr[part];
      } else {
        curr = undefined;
        break;
      }
    }
    if (typeof curr === 'string') return curr;
  }

  // 2. Search across namespaces for direct key (e.g. "looplyPro", "dashboard", "save")
  for (const namespace of Object.values(dict)) {
    if (namespace && typeof namespace === 'object' && key in namespace) {
      const val = (namespace as any)[key];
      if (typeof val === 'string') return val;
    }
  }

  // 3. Fallback to provided fallback or original key
  return fallback !== undefined ? fallback : key;
}

export function isRtl(lang: Locale): boolean {
  return lang === 'ar';
}

export { en, ar };
