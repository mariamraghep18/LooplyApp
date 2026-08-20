import React from 'react';
import { ViewState } from '../../types';
import { useLanguage } from '../../shared/LanguageContext';
import { Globe, ArrowRight, Sparkles, Star } from 'lucide-react';
import { LooplyLogo } from '../../components/LooplyLogo';

export default function WelcomeScreen({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-[#FFFDF9] text-[#1D1A23] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Decorative Playful Background Shapes (Matching Poster Image 3) */}
      {/* Top Left Red/Pink Wave */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-[#FF4D8D]/15 rounded-br-full blur-xl pointer-events-none"></div>
      {/* Top Right Cyan Cloud */}
      <div className="absolute top-0 right-0 w-56 h-56 sm:w-80 sm:h-80 bg-[#00C4CC]/15 rounded-bl-full blur-xl pointer-events-none"></div>
      {/* Bottom Yellow Wave */}
      <div className="absolute bottom-0 left-0 w-64 h-48 sm:w-96 sm:h-64 bg-[#FFB800]/20 rounded-tr-full blur-xl pointer-events-none"></div>
      {/* Bottom Right Orange Wave */}
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-80 bg-[#FF7A00]/15 rounded-tl-full blur-xl pointer-events-none"></div>

      {/* Top Bar with Language Switcher */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4 relative z-20">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#FFB800]/15 text-[#D97706] rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Looply Play Pro</span>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-[#FFB800]/30 text-[#2A2B47] font-extrabold text-xs shadow-sm hover:bg-[#FFFDF9] transition-all"
        >
          <Globe className="w-4 h-4 text-[#FF7A00]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Container Card (Matching Poster Layout) */}
      <div className="max-w-2xl w-full relative z-10 animate-fade-in flex flex-col items-center">
        
        {/* Brand Logo Header */}
        <div className="mb-6 flex justify-center transform hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('portal-selection')}>
          <LooplyLogo size="xl" />
        </div>

        {/* Poster White Card */}
        <div className="w-full bg-white/95 backdrop-blur-sm rounded-[36px] p-6 sm:p-10 shadow-[0_16px_40px_rgba(255,122,0,0.08)] border-2 border-dashed border-[#FF4D8D]/25 relative overflow-hidden text-center space-y-6">
          
          {/* Infinity Icon Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1D1A23] tracking-tight">
              {lang === 'ar' ? (
                <>أهلاً بك في <span className="text-[#7C3AED]">Looply</span> <span className="text-[#00C4CC] inline-block font-sans">∞</span></>
              ) : (
                <>Welcome to <span className="text-[#7C3AED]">Looply</span>. <span className="text-[#00C4CC] inline-block font-sans">∞</span></>
              )}
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#494454] max-w-xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'مساحة رقمية من نوع جديد، صُممت لتجعل رحلة كل طفل أكثر توازناً، تفاعلاً، ودعماً.'
                : 'A new kind of digital space, designed to make every child\'s journey more connected, engaging, and supported.'}
            </p>
          </div>

          {/* Multi-color Dashed Divider */}
          <div className="flex justify-center items-center gap-1.5 py-1">
            <div className="h-1 w-8 rounded-full bg-[#FF4D8D]"></div>
            <div className="h-1 w-8 rounded-full bg-[#FFB800]"></div>
            <div className="h-1 w-8 rounded-full bg-[#00C4CC]"></div>
            <div className="h-1 w-8 rounded-full bg-[#7C3AED]"></div>
          </div>

          {/* Highlight Subtitle */}
          <div className="max-w-lg mx-auto space-y-2 text-sm sm:text-base font-semibold text-[#1D1A23] leading-relaxed">
            <p>
              {lang === 'ar' ? (
                <>حيث يلتقي <span className="text-[#FF4D8D] font-extrabold">التعلم</span> بـ <span className="text-[#FF7A00] font-extrabold">التواصل</span>، وتلتقي <span className="text-[#00C4CC] font-extrabold">التنمية</span> بـ <span className="text-[#7C3AED] font-extrabold">اللعب</span>، وكل خطوة تقربنا أكثر.</>
              ) : (
                <>Where <span className="text-[#7C3AED] font-extrabold">learning</span> meets <span className="text-[#FF4D8D] font-extrabold">communication</span>, <span className="text-[#00C4CC] font-extrabold">development</span> meets <span className="text-[#FFB800] font-extrabold">play</span>, and every step brings us closer together.</>
              )}
            </p>
          </div>

          {/* Mascot Preview & Sub-note */}
          <div className="pt-2 flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFB800]">
              <Star className="w-4 h-4 fill-current text-[#FFB800]" />
              <span className="text-[#1D1A23] font-bold">
                {lang === 'ar' ? 'شيء ذو قيمة بانتظارك' : 'Stay tuned. Something meaningful is coming.'}
              </span>
              <Star className="w-4 h-4 fill-current text-[#FFB800]" />
            </div>

            {/* Waving Mascot Image */}
            <div className="w-24 h-24 rounded-full bg-[#F3EBF8] p-1.5 shadow-md border-2 border-white flex items-center justify-center transform hover:rotate-6 transition-transform">
              <img src="/mascot.png" alt="Looply Mascot" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4">
            <button
              onClick={() => onNavigate('portal-selection')}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#FF7A00] via-[#FF4D8D] to-[#7C3AED] text-white rounded-2xl text-lg font-black shadow-lg shadow-[#FF7A00]/25 hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <span>{lang === 'ar' ? 'ابدأ الاستكشاف الآن' : "Let's Get Started"}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
