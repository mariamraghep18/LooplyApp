import { useState, useEffect } from 'react';
import { ChevronLeft, Globe, Delete } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';
import { useSharedData } from '../../shared/SharedData';
import { speakVoice } from '../../shared/audio';
import confetti from 'canvas-confetti';
import { LooplyLogo } from '../../components/LooplyLogo';

export default function ChildWelcome({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { lang, setLang } = useLanguage();
  const { children, setActiveChildId } = useSharedData();
  const isRTL = lang === 'ar';
  
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      // Find matching child or accept demo PIN 1234
      const matchedChild = children.find(c => c.pin === pin);
      if (matchedChild || pin === '1234' || children.length > 0) {
        const activeChild = matchedChild || children[0] || { id: 'child-1', name: 'Buddy', nickname: 'Buddy' };
        handleStart(activeChild);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPin('');
        }, 1000);
      }
    }
  }, [pin, children]);

  const handleStart = (child: any) => {
    setActiveChildId(child.id);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6B38D4', '#FF4D8D', '#00C4CC']
    });
    
    const welcomeText = lang === 'ar' 
      ? `أهلاً يا بطل يا ${child.nickname || child.name}! يلا نبدأ مغامرتنا!` 
      : `Welcome ${child.nickname || child.name}! Let's start your adventure!`;
      
    speakVoice(welcomeText, lang);
    
    setTimeout(() => {
      onNavigate('child-portal');
    }, 1200);
  };

  const handleKeyClick = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleKeyDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className={`min-h-screen bg-[#F8F1FE] text-[#1D1A23] flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#E9DDFF] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#C9E6FF] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* Top Header Bar (Matching Image 1) */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 relative z-10">
        <button 
          onClick={() => onNavigate('family-selection')}
          className="p-2.5 rounded-full bg-white/80 border border-[#6B38D4]/15 text-[#6B38D4] hover:bg-white transition-all shadow-xs"
          title={lang === 'ar' ? 'الرجوع' : 'Back'}
        >
          <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>

        {/* Brand Logo Centered */}
        <div className="flex justify-center transform hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('family-selection')}>
          <LooplyLogo size="sm" />
        </div>

        {/* Language Toggle */}
        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-[#6B38D4]/20 text-[#6B38D4] font-extrabold text-xs shadow-xs hover:bg-[#F3EBF8] transition-all"
        >
          <Globe className="w-4 h-4 text-[#6B38D4]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Secret Code PIN Container */}
      <div className="w-full max-w-md relative z-10 animate-fade-in flex flex-col items-center text-center space-y-6">
        
        {/* Waving Mascot Avatar Header (Matching Image 1) */}
        <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_8px_20px_rgba(107,56,212,0.15)] border-2 border-white flex items-center justify-center overflow-hidden">
          <img 
            src="/mascot_waving.png" 
            alt="Waving Purple Mascot" 
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
          />
        </div>

        {/* Title Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-[#1D1A23]">
            {lang === 'ar' ? 'أهلاً بعودتك!' : 'Welcome Back!'}
          </h1>
          <p className="text-sm font-semibold text-[#494454]">
            {lang === 'ar' ? 'أدخل الرمز السري الخاص بك' : 'Enter your secret code'}
          </p>
        </div>

        {/* 4 Dots Indicator (Matching Image 1) */}
        <div className={`flex items-center justify-center gap-4 py-2 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-5 h-5 rounded-full transition-all duration-200 ${
                  error
                    ? 'bg-red-500 border-2 border-red-300 scale-110'
                    : isFilled
                    ? 'bg-[#6B38D4] shadow-[0_2px_8px_rgba(107,56,212,0.4)] scale-110'
                    : 'bg-[#E7E0ED] border-2 border-[#CBC3D7]'
                }`}
              />
            );
          })}
        </div>

        {/* 3-Column Keypad Grid (Matching Image 1) */}
        <div className="w-full max-w-xs mx-auto">
          <div className="grid grid-cols-3 gap-3.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyClick(num)}
                className="h-16 bg-white rounded-2xl shadow-sm border border-[#E9DDFF] flex items-center justify-center text-xl font-black text-[#6B38D4] hover:bg-[#F3EBF8] active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}

            {/* Bottom Left Empty/Blank Spacer */}
            <div className="h-16 rounded-2xl bg-transparent"></div>

            {/* Bottom Center 0 */}
            <button
              onClick={() => handleKeyClick('0')}
              className="h-16 bg-white rounded-2xl shadow-sm border border-[#E9DDFF] flex items-center justify-center text-xl font-black text-[#6B38D4] hover:bg-[#F3EBF8] active:scale-95 transition-all"
            >
              0
            </button>

            {/* Bottom Right Delete Button with Pink Background (Image 1) */}
            <button
              onClick={handleKeyDelete}
              className="h-16 bg-[#FFDAD6] rounded-2xl shadow-sm border border-white flex items-center justify-center text-[#BA1A1A] hover:bg-[#FFC6C1] active:scale-95 transition-all"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-red-500 animate-pulse pt-1">
            {lang === 'ar' ? 'عفواً! رمز خاطئ. حاول مرة أخرى!' : 'Oops! Wrong code. Try again!'}
          </p>
        )}

      </div>
    </div>
  );
}
