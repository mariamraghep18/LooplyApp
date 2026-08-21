import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Portals
    looplyFamily: 'Looply Family',
    looplyPro: 'Looply Pro',
    parentPortal: 'Parent Portal',
    childPortal: 'Child Portal',
    portalSelection: 'Select Your Experience',
    comingSoon: 'Coming Soon',
    privacyPolicy: 'Privacy Policy',
    letsGo: 'Let\'s Go!',
    welcomeChampion: 'What\'s your name, champion?',
    enterName: 'Enter your name...',
    
    // Parent Portal Fallbacks
    dashboard: 'Dashboard',
    
    // Child Portal
    games: 'Games',
    goals: 'Goals',
    schedule: 'Schedule',
    achievements: 'Achievements',
    rewards: 'Rewards',
    messages: 'Messages',
    challenges: 'Challenges',
    homeplan: 'Home Plan',
    progress: 'Progress',
    keepGoing: 'Keep going! You\'re doing great!',
  },
  ar: {
    looplyFamily: 'عائلة لوبلي',
    looplyPro: 'لوبلي برو',
    parentPortal: 'بوابة الآباء',
    childPortal: 'بوابة الطفل',
    portalSelection: 'اختر تجربتك',
    comingSoon: 'قريباً',
    privacyPolicy: 'سياسة الخصوصية',
    letsGo: 'هيا بنا!',
    welcomeChampion: 'ما اسمك يا بطل؟',
    enterName: 'اكتب اسمك...',

    dashboard: 'لوحة القيادة',
    games: 'الألعاب',
    goals: 'الأهداف',
    schedule: 'الجدول',
    achievements: 'الإنجازات',
    rewards: 'المكافآت',
    messages: 'الرسائل',
    challenges: 'التحديات',
    homeplan: 'خطة المنزل',
    progress: 'التقدم',
    keepGoing: 'استمر! أنت تقوم بعمل رائع!',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const translate = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate, translate } as any}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
