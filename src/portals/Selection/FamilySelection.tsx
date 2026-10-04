import { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Star } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';
import { useSharedData } from '../../shared/SharedData';
import { speakVoice } from '../../shared/audio';

export default function FamilySelection({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { t, lang, setLang } = useLanguage();
  const { children, setActiveChildId } = useSharedData();
  const isRTL = lang === 'ar';
  
  const [showChildSelection, setShowChildSelection] = useState(false);

  return (
    <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Decorative Ambient Background Soft Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center z-10 pt-2">
        <button 
          onClick={() => {
            if (showChildSelection) {
              setShowChildSelection(false);
            } else {
              onNavigate('portal-selection');
            }
          }}
          className="p-3 bg-white/90 rounded-2xl shadow-xs border border-purple-100/80 text-[#7C3AED] hover:bg-white transition-all cursor-pointer"
        >
          {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
        </button>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          className="px-4 py-2 bg-white/90 rounded-2xl shadow-xs border border-purple-100/80 font-extrabold text-xs text-[#7C3AED] hover:bg-purple-50 transition-all cursor-pointer"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative z-10 animate-fade-in py-6">
        
        {/* 3D Purple Mascot Header Logo */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 bg-white shadow-[0_12px_32px_rgba(124,58,237,0.15)] border-2 border-purple-100 flex items-center justify-center overflow-hidden mb-2 transform hover:scale-105 transition-transform cursor-pointer">
            <img 
              src="/mascot_waving.png" 
              alt="Waving Purple Mascot Logo" 
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
            />
          </div>
        </div>

        {!showChildSelection ? (
          <>
            {/* Title Header */}
            <div className="text-center mb-10 space-y-2">
              <span className="px-3.5 py-1.5 bg-purple-50 text-[#7C3AED] border border-purple-200 text-xs font-semibold rounded-full uppercase tracking-wider inline-block">
                Looply Family
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B]">
                {lang === 'en' ? 'Who is logging in?' : 'من سيسجل الدخول؟'}
              </h1>
              <p className="text-base text-slate-500 max-w-md mx-auto">
                {lang === 'en' ? 'Choose the parent dashboard or child interactive portal.' : 'اختر بوابة أولياء الأمور للمتابعة أو بوابة الأطفال التفاعلية.'}
              </p>
            </div>

            {/* Portal Selection Cards (Parent Portal vs Child Portal) */}
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-2xl">
              
              {/* Parent Portal Card */}
              <div 
                onClick={() => onNavigate('login')}
                className="group cursor-pointer bg-white rounded-3xl p-8 w-72 text-center border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/40 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="w-24 h-24 mx-auto bg-purple-100 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E1B4B] mb-2">
                  {lang === 'en' ? 'Parent Portal' : 'بوابة الآباء'}
                </h2>
                <p className="text-xs font-medium text-slate-500 mb-6">
                  {lang === 'en' ? 'Manage, track, and support learning journey' : 'إدارة ومتابعة ودعم رحلة التعلم'}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[#7C3AED] font-black text-sm group-hover:gap-2 transition-all">
                  <span>{lang === 'ar' ? 'دخول أولياء الأمور' : 'Enter Portal'}</span>
                  {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </div>

              {/* Child Portal Card */}
              <div 
                onClick={() => {
                  speakVoice(lang === 'en' ? 'Welcome to the kids zone!' : 'أهلاً بك في منطقة الأطفال!', lang);
                  onNavigate('child-welcome');
                }}
                className="group cursor-pointer bg-white rounded-3xl p-8 w-72 text-center border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/40 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-100 to-pink-100 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E1B4B] mb-2">
                  {lang === 'en' ? 'Child Portal' : 'بوابة الأطفال'}
                </h2>
                <p className="text-xs font-medium text-slate-500 mb-6">
                  {lang === 'en' ? 'Play, learn, and earn playful rewards' : 'العب، تعلم، واربح المكافآت'}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[#7C3AED] font-black text-sm group-hover:gap-2 transition-all">
                  <span>{lang === 'ar' ? 'دخول منطقة الأطفال' : 'Kids Zone'}</span>
                  {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10 space-y-1">
              <h1 className="text-4xl font-extrabold text-[#1E1B4B]">
                {lang === 'en' ? 'Choose Your Profile' : 'اختر ملفك الشخصي'}
              </h1>
              <p className="text-base font-semibold text-slate-500">
                {lang === 'en' ? 'Who is playing today?' : 'من سيلعب اليوم؟'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-3xl">
              {children.map(child => (
                <div 
                  key={child.id}
                  onClick={() => {
                    setActiveChildId(child.id);
                    sessionStorage.setItem('childName', child.name);
                    onNavigate('child-welcome');
                  }}
                  className="group cursor-pointer bg-white rounded-3xl p-6 w-52 text-center border border-purple-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <div className="w-24 h-24 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform border border-purple-100 shadow-xs">
                    {child.avatar || '🧑'}
                  </div>
                  <h2 className="text-xl font-bold text-[#1E1B4B]">{child.name}</h2>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-12 text-center">
          <button className="text-slate-400 hover:text-[#7C3AED] underline underline-offset-4 text-xs font-semibold transition-colors cursor-pointer">
            {t('privacyPolicy')}
          </button>
        </div>
      </div>

      <footer className="w-full text-center relative z-20 pb-3 pt-2">
        <p className="text-xs text-purple-900/60 font-medium">
          {lang === 'ar' ? 'منصة لوبلي • 2026' : 'Looply Platform • 2026'}
        </p>
      </footer>
    </div>
  );
}
