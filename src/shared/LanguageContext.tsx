import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, getTranslation, isRtl } from '../locales';

export type Language = Locale;

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  t: (key: string, fallbackAr?: string) => string;
  translate: (key: string, fallbackAr?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const dir = isRtl(lang) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  /**
   * Overloaded translation helper:
   * 1. t('common.save') => resolves 'Save' or 'حفظ' via locales
   * 2. t('Save', 'حفظ') => bilingual inline fallback (returns 2nd arg if ar, 1st if en)
   */
  const t = (key: string, fallbackAr?: string): string => {
    if (fallbackAr !== undefined) {
      return lang === 'ar' ? fallbackAr : key;
    }
    return getTranslation(lang, key);
  };

  const dir: 'rtl' | 'ltr' = isRtl(lang) ? 'rtl' : 'ltr';

  const contextValue: LanguageContextType = {
    lang,
    setLang,
    dir,
    isRtl: isRtl(lang),
    t,
    translate: t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
