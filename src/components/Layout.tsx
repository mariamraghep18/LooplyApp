import { ReactNode, useState } from 'react';
import { ViewState } from '../types';
import {
  LogOut,
  MapPin,
  LayoutDashboard,
  Target,
  Calendar as CalendarIcon,
  MessageCircle,
  Star,
  CreditCard,
  ShoppingBag,
  PieChart,
  User,
  Globe,
  Smartphone,
  Menu,
  X,
  Search,
  Sparkles,
  Home
} from 'lucide-react';
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
  
  // Sidebar Collapse & Search States
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [headerSearch, setHeaderSearch] = useState<string>('');

  // 1. Fixed Left Sidebar Menu Items Specification
  const sidebarMenuItems = [
    { view: 'plan', label: lang === 'ar' ? 'المهام والخطط' : 'Tasks', icon: Target },
    { view: 'token-boards', label: lang === 'ar' ? 'التعزيز' : 'Token', icon: Star },
    { view: 'calendar', label: lang === 'ar' ? 'التقويم' : 'Calendar', icon: CalendarIcon },
    { view: 'report', label: lang === 'ar' ? 'التقارير' : 'Report', icon: PieChart },
    { view: 'find-my-child', label: lang === 'ar' ? 'تتبع الطفل' : 'Find My Child', icon: MapPin },
    { view: 'billing', label: lang === 'ar' ? 'الفواتير' : 'Billing', icon: CreditCard },
    { view: 'settings', label: lang === 'ar' ? 'الملف الشخصي' : 'Profile', icon: User },
  ];

  // 2. Fixed Bottom Navigation Bar Specification (Strictly 3 Primary Tabs)
  const bottomPrimaryTabs = [
    { view: 'community-messages', label: lang === 'ar' ? 'المجتمع' : 'Community', icon: MessageCircle },
    { view: 'dashboard', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: Home },
    { view: 'marketplace', label: lang === 'ar' ? 'المتجر' : 'Marketplace', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFD] font-sans flex flex-col text-[#2A2B47]">
      
      {/* 1. FIXED LEFT SIDEBAR (VERTICAL NAVIGATION) */}
      <aside
        className={`fixed top-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-r border-[#ECE8FD] shadow-xl flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${lang === 'ar' ? 'right-0 border-l border-r-0' : 'left-0'}`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          
          {/* Sidebar Top Branding & Hamburger Toggle */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#633BE8] to-[#9C7AF2] text-white font-black text-xl flex items-center justify-center shadow-md shrink-0">
                L
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0 animate-fade-in">
                  <h2 className="text-xs font-black text-[#2A2B47] uppercase tracking-wider truncate">
                    LOOPLY PORTAL
                  </h2>
                  <p className="text-[10px] font-semibold text-[#73758C] truncate">
                    Parent Dashboard
                  </p>
                </div>
              )}
            </div>

            {/* Hamburger Toggle (☰ / X) */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl text-slate-500 hover:text-[#633BE8] hover:bg-purple-50 transition-colors shrink-0"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>

          {/* Sidebar Menu Vertical Items */}
          <div className="space-y-1.5">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-black text-[#73758C] uppercase tracking-wider px-2 mb-2">
                {lang === 'ar' ? 'الأدوات والخدمات' : 'UTILITIES & FEATURES'}
              </p>
            )}

            {sidebarMenuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentView === item.view;

              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view as ViewState)}
                  className={`w-full py-3 px-3 rounded-2xl text-xs font-extrabold flex items-center transition-all duration-200 group ${
                    sidebarCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-[#633BE8] text-white shadow-md shadow-[#633BE8]/25 scale-[1.02]'
                      : 'text-[#73758C] hover:bg-purple-50 hover:text-[#633BE8]'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <IconComp className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#73758C] group-hover:text-[#633BE8]'}`} />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-[#ECE8FD] bg-[#FAFAFD]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#633BE8] font-black text-xs flex items-center justify-center shrink-0 border border-purple-200">
              {parentProfile?.fullName ? parentProfile.fullName.charAt(0) : 'P'}
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 animate-fade-in">
                <p className="text-xs font-black text-[#2A2B47] truncate">
                  {parentProfile?.fullName || 'Parent Portal'}
                </p>
                <p className="text-[10px] font-semibold text-emerald-600 truncate">
                  • Online
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT CONTAINER (Adjusted margins for sidebar width) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          lang === 'ar'
            ? sidebarCollapsed ? 'md:mr-20' : 'md:mr-64'
            : sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* TOP HEADER */}
        <header className="bg-white/95 backdrop-blur-md border-b border-[#ECE8FD] px-4 sm:px-8 py-3.5 pt-safe flex justify-between items-center sticky top-0 z-30 shadow-xs">
          {/* Header Left Welcome Message */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-[10px] font-extrabold text-[#73758C] uppercase tracking-wider">
                {lang === 'ar' ? 'بوابة أولياء الأمور - Looply' : 'LOOPLY PARENT PORTAL'}
              </h1>
              <h2 className="text-sm sm:text-base font-black text-[#2A2B47] flex items-center gap-1.5">
                <span>{parentProfile?.fullName || (lang === 'ar' ? 'مرحباً بك!' : 'Welcome Back!')}</span>
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300" />
              </h2>
            </div>
          </div>

          {/* Header Right Actions: Global Search, Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Global Search Input Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث شامل...' : 'Global search...'}
                className="w-40 lg:w-56 bg-[#FAFAFD] text-slate-800 placeholder-slate-400 text-xs font-semibold rounded-2xl pl-9 pr-3 py-2 rtl:pr-9 rtl:pl-3 border border-[#ECE8FD] focus:outline-none focus:ring-2 focus:ring-[#633BE8]/30 focus:bg-white transition-all"
              />
            </div>


            {/* Looply Pro Portal Switcher Button */}
            <button 
              onClick={() => onNavigate('looply-pro')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-purple-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 font-black text-xs transition-all shadow-md shadow-purple-600/20"
              title="Open Looply Pro Suite"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{lang === 'ar' ? 'لوبلي برو' : 'Looply Pro'}</span>
            </button>

            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[#633BE8]/20 bg-[#ECE8FD] text-[#633BE8] hover:bg-[#633BE8] hover:text-white font-extrabold text-xs transition-all shadow-xs"
              title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </header>

        {/* Viewport Main Children */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 pb-32 sm:pb-36 flex flex-col gap-6">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      {/* 2. FIXED BOTTOM NAVIGATION BAR (Strictly 3 Primary Tabs: Home, Community, Marketplace) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-[#ECE8FD] shadow-[0_12px_40px_rgba(99,59,232,0.18)] rounded-full p-2 transition-all duration-300">
        <div className="flex items-center gap-2 px-2">
          {bottomPrimaryTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = currentView === tab.view;

            return (
              <button
                key={tab.view}
                onClick={() => onNavigate(tab.view as ViewState)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#633BE8] to-[#805AD5] text-white shadow-lg shadow-[#633BE8]/30 scale-105' 
                    : 'text-[#73758C] hover:text-[#633BE8] hover:bg-purple-50'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#73758C]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
