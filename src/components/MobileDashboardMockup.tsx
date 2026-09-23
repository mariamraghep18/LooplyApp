import React, { useState } from 'react';
import {
  Menu,
  Search,
  CheckSquare,
  Coins,
  Calendar as CalendarIcon,
  FileText,
  MapPin,
  CreditCard,
  User,
  Users,
  Home,
  ShoppingBag,
  X,
  Bell,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';
import { ViewState } from '../types';

export interface MobileDashboardMockupProps {
  onNavigateView?: (view: ViewState) => void;
}

export function MobileDashboardMockup({ onNavigateView }: MobileDashboardMockupProps) {
  const { lang } = useLanguage();
  
  // Navigation States
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('Tasks');
  const [activeBottomTab, setActiveBottomTab] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sidebar Menu Items Specification
  const sidebarMenuItems = [
    { id: 'Tasks', label: 'Tasks', icon: CheckSquare, badge: '5' },
    { id: 'Tokens', label: 'Tokens', icon: Coins, badge: '120' },
    { id: 'Calender', label: 'Calender', icon: CalendarIcon, badge: 'Today' },
    { id: 'Report', label: 'Report', icon: FileText },
    { id: 'Find my child', label: 'Find my child', icon: MapPin, badge: 'Live' },
    { id: 'Billing', label: 'Billing', icon: CreditCard },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  // Bottom Navigation Bar Items Specification
  const bottomNavTabs = [
    { id: 'Community', label: 'Community', icon: Users },
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Market Place', label: 'Market Place', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-slate-200 p-2 sm:p-6 flex items-center justify-center font-sans">
      
      {/* Mobile Device Viewport Container Wrapper */}
      <div className="w-full max-w-md h-[840px] bg-slate-50 rounded-[40px] shadow-2xl border-8 border-slate-900 overflow-hidden flex flex-col relative">
        
        {/* Mobile Screen Notch / Status Bar Header */}
        <div className="bg-slate-900 text-white px-6 py-2 flex items-center justify-between text-xs font-semibold shrink-0 select-none">
          <span>9:41</span>
          <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2.5 border border-white rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-white rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* TOP HEADER ALIGNED WITH SIDEBAR */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 shadow-xs z-20">
          <div className="flex items-center gap-3">
            {/* 1. Hamburger Menu Icon (☰) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="Toggle Sidebar Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-black text-slate-900 tracking-tight">Looply Mobile</h1>
          </div>

          {/* 2. Top Header Right Search Bar & Magnifying Glass Icon (🔍) */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-32 sm:w-40 bg-slate-100 text-slate-800 text-xs font-medium rounded-full pl-9 pr-3 py-1.5 rtl:pr-9 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all border border-slate-200"
              />
            </div>
            <button className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1"></span>
            </button>
          </div>
        </header>

        {/* MIDDLE VIEWPORT BODY: FIXED LEFT SIDEBAR + FLEXIBLE MAIN CONTENT AREA */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* 1. FIXED LEFT SIDEBAR (NAVIGATION DRAWER) */}
          <aside
            className={`w-48 sm:w-52 bg-slate-100/95 backdrop-blur-md border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-10 shrink-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute h-full'
            } rtl:${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Sidebar Menu List */}
            <div className="p-3 space-y-1 overflow-y-auto">
              <div className="px-2 py-1 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Navigation</span>
              </div>

              {sidebarMenuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeSidebarItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSidebarItem(item.id);
                      if (onNavigateView) {
                        if (item.id === 'Tasks') onNavigateView('plan');
                        else if (item.id === 'Tokens') onNavigateView('token-boards');
                        else if (item.id === 'Calender') onNavigateView('calendar');
                        else if (item.id === 'Report') onNavigateView('report');
                        else if (item.id === 'Find my child') onNavigateView('find-my-child');
                        else if (item.id === 'Billing') onNavigateView('billing');
                        else if (item.id === 'Profile') onNavigateView('settings');
                      }
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 group ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                        : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-600'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Bottom Navigation Section (Community, Home, Market Place inside Left Sidebar) */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <div className="px-2 py-1 mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bottom Navigation</span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {bottomNavTabs.map((tab) => {
                  const IconComp = tab.icon;
                  const isActive = activeBottomTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveBottomTab(tab.id);
                        if (onNavigateView) {
                          if (tab.id === 'Community') onNavigateView('community-messages');
                          else if (tab.id === 'Home') onNavigateView('dashboard');
                          else if (tab.id === 'Market Place') onNavigateView('marketplace');
                        }
                      }}
                      className={`flex flex-col items-center gap-1 transition-all duration-200 py-2 px-1 rounded-xl ${
                        isActive
                          ? 'bg-purple-600 text-white font-black shadow-xs'
                          : 'text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-200/60'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="text-[9px] tracking-tight truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Footer User Info */}
            <div className="p-3 border-t border-slate-200/80 bg-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-700 font-black text-xs flex items-center justify-center border border-purple-300">
                  AP
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">Alex Parent</p>
                  <p className="text-[10px] text-slate-400 truncate">Looply Premium</p>
                </div>
              </div>
            </div>
          </aside>

          {/* 3. MAIN CONTENT AREA */}
          <main className="flex-1 bg-white p-4 overflow-y-auto space-y-4">
            
            {/* Section Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h2 className="text-base font-black text-slate-900">Dashboard Overview</h2>
                <p className="text-xs text-slate-400 font-medium">Welcome back, Alex!</p>
              </div>

              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-600" /> Active View: {activeSidebarItem}
              </span>
            </div>

            {/* Empty & Filled Card Placeholders Grid */}
            <div className="grid grid-cols-1 gap-3">
              
              {/* Card Placeholder 1: Daily Tasks */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-200">Daily Tasks</span>
                    <h3 className="text-lg font-black mt-0.5">4 of 5 Tasks Completed</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div className="bg-amber-300 h-full rounded-full w-4/5"></div>
                </div>
              </div>

              {/* Card Placeholder 2: Token Balance & Calender Quick View */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-amber-500">
                    <Coins className="w-4 h-4" />
                    <span className="text-[10px] font-bold text-slate-400">Balance</span>
                  </div>
                  <p className="text-base font-black text-slate-800">120 Tokens</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +15 this week
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-purple-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold text-slate-400">Calender</span>
                  </div>
                  <p className="text-xs font-black text-slate-800">Speech Therapy</p>
                  <p className="text-[10px] text-slate-500 font-medium">Today • 4:00 PM</p>
                </div>
              </div>

              {/* Card Placeholder 3: Find My Child & Location */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">Find my child</h4>
                      <p className="text-[10px] text-slate-400">Green Valley Academy • Live GPS</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
              </div>

              {/* Card Placeholder 4: Empty Grid Slot */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-2 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-500">Add Custom Widget</p>
              </div>

            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
