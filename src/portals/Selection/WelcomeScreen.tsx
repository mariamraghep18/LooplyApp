import React from 'react';
import { ViewState } from '../../types';
import { useLanguage } from '../../shared/LanguageContext';
import { Globe, ArrowRight, Sparkles, Star } from 'lucide-react';
import { LooplyLogo } from '../../components/LooplyLogo';

export default function WelcomeScreen({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#FAF8FF] via-[#F3EDFF] to-[#FAF8FF] text-[#2E1065] flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* 1. SOFT DECORATIVE BACKGROUND ACCENTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-300/20 via-pink-200/20 to-cyan-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Floating Sparkle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* 2. TOP APP BAR & LANGUAGE SWITCHER */}
      <header className="w-full max-w-5xl flex justify-between items-center relative z-20 pt-2">
        {/* Looply Pro Badge */}
        <div className="flex items-center gap-2">
          <div 
            onClick={() => onNavigate('looply-pro')}
            className="px-4 py-1.5 bg-white/90 text-[#3B0764] border border-purple-200/80 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-sm hover:border-purple-400 hover:bg-white transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Looply Pro</span>
          </div>
        </div>

        {/* Language Switcher */}
        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-purple-200/80 text-[#3B0764] font-extrabold text-xs shadow-sm hover:bg-white transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-[#7C3AED]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </header>

      {/* 3. MAIN CENTER CONTAINER */}
      <main className="max-w-2xl w-full relative z-10 my-auto flex flex-col items-center text-center space-y-6 animate-fade-in py-4">
        
        {/* STATIC NON-CLICKABLE OFFICIAL LOOPLY LOGO PROMINENTLY AT TOP CENTER */}
        <div className="flex flex-col items-center justify-center pointer-events-none select-none">
          <LooplyLogo size="xl" />
        </div>

        {/* GLOWING RING WITH PURPLE 3D CHARACTER / MASCOT */}
        <div className="relative py-2">
          {/* Outer Glowing Lavender-Purple Ring */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#00C4CC] p-1.5 shadow-[0_12px_40px_rgba(124,58,237,0.25)] relative flex items-center justify-center">
            
            {/* Inner Soft White Circle */}
            <div className="w-full h-full bg-white rounded-full p-3 relative flex items-center justify-center overflow-hidden border border-purple-100 shadow-inner">
              
              {/* Mascot / Purple 3D Character Image */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-purple-50 p-2 shadow-md border border-purple-100 flex items-center justify-center z-10 transform hover:rotate-6 transition-transform duration-300">
                <img 
                  src="/mascot.png" 
                  alt="Looply 3D Character" 
                  className="w-full h-full object-contain"
                />
              </div>

            </div>
          </div>
        </div>

        {/* HERO HEADING & DESCRIPTIVE TEXT */}
        <div className="space-y-3 max-w-xl mx-auto">
          {/* Main Heading: "Welcome to the Looply" (Word "Portal" completely removed) */}
          <h1 className="text-3xl sm:text-4xl font-black text-[#2E1065] tracking-tight leading-tight">
            {lang === 'ar' ? (
              <>أهلاً بك في <span className="text-[#7C3AED]">Looply</span> <span className="text-[#00C4CC] font-sans">∞</span></>
            ) : (
              <>Welcome to the <span className="text-[#7C3AED]">Looply</span> <span className="text-[#00C4CC] font-sans">∞</span></>
            )}
          </h1>
          
          {/* Subtitle / Descriptive Text in Dark Purple */}
          <p className="text-base sm:text-lg font-bold text-[#3B0764] leading-relaxed max-w-lg mx-auto">
            {lang === 'ar'
              ? 'مساحة رقمية تفاعلية صُممت لتجعل رحلة التعلم والتأهيل أكثر توازناً، تفاعلاً، ودعماً.'
              : 'A new kind of digital space, designed to make learning and rehabilitation connected, engaging, and supported.'}
          </p>

          <p className="text-xs sm:text-sm font-semibold text-[#4C1D95] max-w-md mx-auto leading-relaxed pt-1">
            {lang === 'ar' ? (
              <>حيث يلتقي <span className="text-[#7C3AED] font-extrabold">التعلم</span> بـ <span className="text-[#FF4D8D] font-extrabold">التواصل</span>، وتلتقي <span className="text-[#00C4CC] font-extrabold">التنمية</span> بـ <span className="text-[#FF7A00] font-extrabold">اللعب</span>.</>
            ) : (
              <>Where <span className="text-[#7C3AED] font-extrabold">learning</span> meets <span className="text-[#FF4D8D] font-extrabold">communication</span>, <span className="text-[#00C4CC] font-extrabold">development</span> meets <span className="text-[#FF7A00] font-extrabold">play</span>.</>
            )}
          </p>
        </div>

        {/* PRIMARY CALL TO ACTION BUTTON "LET'S GET STARTED" */}
        <div className="pt-4 w-full max-w-sm mx-auto">
          <button
            onClick={() => onNavigate('portal-selection')}
            className="w-full py-4 px-8 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#00C4CC] hover:from-[#6D28D9] hover:to-[#0891B2] text-white rounded-2xl text-base sm:text-lg font-black shadow-lg shadow-[#7C3AED]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 border border-purple-300/40 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'ابدأ الآن — Let\'s Get Started' : 'Let\'s Get Started'}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </main>

      {/* 4. FOOTER TEXT IN DARK PURPLE */}
      <footer className="w-full text-center relative z-20 pb-3 pt-2">
        <p className="text-xs sm:text-sm font-extrabold text-[#3B0764]">
          {lang === 'ar' ? 'هل لديك حساب بالفعل؟ ' : 'Already have an account? '}
          <button
            onClick={() => onNavigate('login')}
            className="text-[#7C3AED] hover:text-[#5B21B6] underline underline-offset-4 font-black transition-colors ml-1 cursor-pointer"
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}
          </button>
        </p>
      </footer>

    </div>
  );
}
