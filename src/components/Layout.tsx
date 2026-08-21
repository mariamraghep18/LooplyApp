import { ReactNode } from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Target, Calendar as CalendarIcon, MessageCircle, Star, CreditCard, ShoppingBag, MapPin, PieChart, User } from 'lucide-react';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function Layout({ currentView, onNavigate, onLogout, children }: LayoutProps) {
  const { parentProfile } = useSharedData() as any;
  const { lang, setLang } = useLanguage();

  const tabs = [
    { view: 'dashboard', label: lang === 'ar' ? 'الرئيسية' : 'Dashboard', icon: LayoutDashboard },
    { view: 'token-boards', label: lang === 'ar' ? 'لوحة التعزيز' : 'Token Board', icon: Star },
    { view: 'settings', label: lang === 'ar' ? 'الملف الشخصي' : 'Profile', icon: User },
    { view: 'plan', label: lang === 'ar' ? 'المهام' : 'Tasks', icon: Target },
    { view: 'calendar', label: lang === 'ar' ? 'التقويم' : 'Calendar', icon: CalendarIcon },
    { view: 'report', label: lang === 'ar' ? 'التقارير' : 'Report', icon: PieChart },
    { view: 'find-my-child', label: lang === 'ar' ? 'تتبع الطفل' : 'Find My Child', icon: MapPin },
    { view: 'community-messages', label: lang === 'ar' ? 'المجتمع' : 'Community', icon: MessageCircle },
    { view: 'marketplace', label: lang === 'ar' ? 'المتجر' : 'Marketplace', icon: ShoppingBag },
    { view: 'billing', label: lang === 'ar' ? 'الفواتير والمدفوعات' : 'Billing & Payments', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFD] font-sans flex flex-col text-[#2A2B47]">
      {/* Minimal Top Header Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#ECE8FD] px-4 sm:px-8 py-3.5 pt-safe flex justify-between items-center sticky top-0 z-40 shadow-xs">
        <div 
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-3 cursor-pointer group"
          title={lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
        >
          <div className="w-11 h-11 bg-[#ECE8FD] group-hover:bg-[#633BE8] group-hover:text-white rounded-2xl flex items-center justify-center text-[#633BE8] border border-[#633BE8]/20 shadow-xs transition-all">
             <span className="font-extrabold text-2xl tracking-tight">L</nspan>
          </div>
          <div>
            <h1 className="text-[11px] font-bold text-[#73758C] uppercase tracking-wider group-hover:text-[#633BE8] transition-colors">
              {lang === 'ar' ? 'بورتال الأهل - Looply' : 'Looply Parent Portal'}
            </h1>
            <h2 className="text-base font-black text-[#2A2B47]">
              {parentProfile?.fullName || (lang === 'ar' ? 'مرحباً بك!' : 'Welcome Back!')}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher Button */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#633BE8]/20 bg-[#ECE8FD] text-[#633BE8] hover:bg-[#633BE8] hover:text-white font-extrabold text-xs transition-all shadow-xs"
            title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button 
            onClick={onLogout} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold transition-colors text-xs border border-rose-100"
          >
            <LogOut className="w-4 h-4" /> 
            <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Log Out'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area (With generous bottom padding to allow full scroll past fixed bottom navbar) */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 pb-44 sm:pb-48 flex flex-col gap-6">
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Modern Professional Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#ECE8FD] shadow-[0_-8px_30px_rgba(99,59,232,0.1)] px-3 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.view;
            return (
              <button
                key={tab.view}
                onClick={() => onNavigate(tab.view as ViewState)}
                className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#633BE8] text-white shadow-md shadow-[#633BE8]/25 scale-105' 
                    : 'text-[#73758C] hover:text-[#2A2B47] hover:bg-[#ECE8FD]/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#73758C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

