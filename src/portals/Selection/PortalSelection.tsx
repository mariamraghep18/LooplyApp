import { Users, Building, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';
import { LooplyLogo } from '../../components/LooplyLogo';

export default function PortalSelection({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { t, lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-20 pt-2">
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/90 hover:bg-white text-[#7C3AED] rounded-2xl border border-purple-100/80 text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </button>

        <div className="cursor-pointer" onClick={() => onNavigate('welcome')}>
          <LooplyLogo size="sm" />
        </div>

        {/* Language Switcher */}
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          className="flex items-center gap-2 px-3.5 py-2 bg-white/90 hover:bg-white text-[#7C3AED] rounded-2xl border border-purple-100/80 text-xs font-extrabold transition-all shadow-xs cursor-pointer"
        >
          <Globe className="w-4 h-4 text-[#7C3AED]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Selection Area */}
      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto py-8">
        <div className="text-center mb-10">
          <span className="px-3.5 py-1.5 bg-purple-50 text-[#7C3AED] border border-purple-200 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 inline-block shadow-xs">
            {isRTL ? 'اختر مسارك' : 'Choose Your Experience'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-3">
            {t('portalSelection')}
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto font-medium">
            {isRTL ? 'اختر كيف ترغب في تجربة منصة Looply التفاعلية' : 'Select how you want to experience the Looply interactive portal'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 1: Family & Learner Experience */}
          <div 
            onClick={() => onNavigate('family-selection')}
            className="group cursor-pointer bg-white rounded-3xl p-8 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-100/40 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
            
            <div>
              <div className="w-16 h-16 bg-purple-100 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <Users className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#1E1B4B] mb-3">{t('looplyFamily')}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {isRTL 
                  ? 'للأطفال وأولياء الأمور للتركيز على التعلم والتطوير اليومي، التحفيز والمتابعة المنزلية.' 
                  : 'For learners and families focusing on interactive skill development, daily progress, and playful rewards.'}
              </p>
            </div>
            
            <div className="flex items-center text-[#7C3AED] font-black text-sm group-hover:translate-x-1 transition-all">
              <span>{t('letsGo')}</span> 
              {isRTL ? <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ml-2" />}
            </div>
          </div>

          {/* Option 2: Enterprise & Pro Suite */}
          <div 
            onClick={() => onNavigate('looply-pro')}
            className="group cursor-pointer bg-white rounded-3xl p-8 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-100/40 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            <div>
              <div className="w-16 h-16 bg-cyan-100 text-[#0891B2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xs">
                <Building className="w-8 h-8" />
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-[#1E1B4B]">{t('looplyPro')}</h2>
                <span className="bg-purple-50 text-[#7C3AED] border border-purple-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Pro Suite
                </span>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {isRTL 
                  ? 'للأخصائيين والمراكز والمدارس لإدارة الحالات الكلينيكية، خطط IEP، جلسات التأهيل والتوثيق الطبي.' 
                  : 'For therapists, clinics, and special ed schools managing EHR cases, SOAP notes, IEP goals, and telemetry.'}
              </p>
            </div>
            
            <div className="flex items-center text-[#7C3AED] font-black text-sm group-hover:translate-x-1 transition-all">
              <span>{t('letsGo')}</span> 
              {isRTL ? <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ml-2" />}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="text-slate-400 hover:text-[#7C3AED] text-xs underline underline-offset-4 font-semibold transition-colors cursor-pointer">
            {t('privacyPolicy')}
          </button>
        </div>
      </div>

      {/* Footer info */}
      <footer className="w-full text-center relative z-20 pb-3 pt-2">
        <p className="text-xs text-purple-900/60 font-medium">
          {lang === 'ar' ? 'منصة لوبلي • 2026' : 'Looply Platform • 2026'}
        </p>
      </footer>

    </div>
  );
}
