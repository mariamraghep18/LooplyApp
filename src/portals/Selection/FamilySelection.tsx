import { useState } from 'react';
import { ArrowLeft, User, Star } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';
import { useSharedData } from '../../shared/SharedData';
import { speakVoice } from '../../shared/audio';

export default function FamilySelection({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { t, lang, setLang } = useLanguage();
  const { children, setActiveChildId } = useSharedData();
  const isRTL = lang === 'ar';
  
  const [showChildSelection, setShowChildSelection] = useState(false);

  const backNavigationActions: Record<string, () => void> = {
    true: () => setShowChildSelection(false),
    false: () => onNavigate('portal-selection'),
  };

  return (
    <div className={`min-h-screen bg-[#F8F1FE] text-[#1D1A23] flex flex-col p-6 relative overflow-x-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Decorative Ambient Background Soft Glows */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#E9DDFF] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#C9E6FF] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* Top Header Navigation */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <button 
          onClick={() => backNavigationActions[String(showChildSelection)]()}
          className="p-3 bg-white rounded-full shadow-sm border border-[#E9DDFF] text-[#6B38D4] hover:bg-white transition-all"
        >
          {isRTL ? <ArrowLeft className="w-5 h-5 rotate-180" /> : <ArrowLeft className="w-5 h-5" />}
        </button>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-[#E9DDFF] font-extrabold text-xs text-[#6B38D4] hover:bg-[#F3EBF8] transition-all"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative z-10 animate-fade-in">
        
        {/* 3D Purple Mascot Header Logo */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full p-2 bg-white shadow-[0_8px_20px_rgba(107,56,212,0.15)] border-2 border-white flex items-center justify-center overflow-hidden mb-2 transform hover:scale-105 transition-transform cursor-pointer">
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
            <div className="text-center mb-10 space-y-1">
              <h1 className="text-4xl font-black text-[#1D1A23]">Looply Family</h1>
              <p className="text-base font-semibold text-[#494454]">
                {lang === 'en' ? 'Who is logging in?' : 'من سيسجل الدخول؟'}
              </p>
            </div>

            {/* Portal Selection Cards (Parent Portal vs Child Portal) */}
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-2xl">
              
              {/* Parent Portal Card */}
              <div 
                onClick={() => onNavigate('login')}
                className="group cursor-pointer bg-white rounded-[2rem] p-8 w-64 text-center shadow-[0_8px_24px_rgba(107,56,212,0.08)] border-2 border-transparent hover:border-[#6B38D4] hover:shadow-xl transition-all"
              >
                <div className="w-28 h-28 mx-auto bg-[#EEF2FF] text-[#6366F1] rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border-4 border-white shadow-xs">
                  <User className="w-14 h-14" />
                </div>
                <h2 className="text-2xl font-bold text-[#1D1A23] mb-2">
                  {lang === 'en' ? 'Parent Portal' : 'بوابة الآباء'}
                </h2>
                <p className="text-xs font-semibold text-[#494454]">
                  {lang === 'en' ? 'Manage, track, and support' : 'إدارة ومتابعة ودعم'}
                </p>
              </div>

              {/* Child Portal Card */}
              <div 
                onClick={() => {
                  speakVoice(lang === 'en' ? 'Welcome to the kids zone!' : 'أهلاً بك في منطقة الأطفال!', lang);
                  onNavigate('child-welcome');
                }}
                className="group cursor-pointer bg-white rounded-[2rem] p-8 w-64 text-center shadow-[0_8px_24px_rgba(168,85,247,0.08)] border-2 border-transparent hover:border-[#A855F7] hover:shadow-xl transition-all"
              >
                <div className="w-28 h-28 mx-auto bg-[#F3E8FF] text-[#A855F7] rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs border-4 border-white">
                  <Star className="w-14 h-14 fill-current" />
                </div>
                <h2 className="text-2xl font-bold text-[#1D1A23] mb-2">
                  {lang === 'en' ? 'Child Portal' : 'بوابة الأطفال'}
                </h2>
                <p className="text-xs font-semibold text-[#494454]">
                  {lang === 'en' ? 'Play, learn, and earn rewards' : 'العب، تعلم، واربح المكافآت'}
                </p>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10 space-y-1">
              <h1 className="text-4xl font-black text-[#1D1A23]">
                {lang === 'en' ? 'Choose Your Profile' : 'اختر ملفك الشخصي'}
              </h1>
              <p className="text-base font-semibold text-[#494454]">
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
                  className="group cursor-pointer bg-white rounded-[2rem] p-6 w-48 text-center shadow-sm border-2 border-transparent hover:border-purple-400 hover:shadow-xl transition-all"
                >
                  <div className="w-24 h-24 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform shadow-inner border-4 border-white">
                    {child.avatar || '🧑'}
                  </div>
                  <h2 className="text-xl font-bold text-[#1D1A23]">{child.name}</h2>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="mt-14 text-center">
          <button className="text-[#494454] hover:text-[#1D1A23] underline underline-offset-4 text-xs font-semibold transition-colors">
            {t('privacyPolicy')}
          </button>
        </div>
      </div>
    </div>
  );
}
