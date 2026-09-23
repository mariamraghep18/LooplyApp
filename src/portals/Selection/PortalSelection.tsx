import { Users, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';

export default function PortalSelection({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { t, lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Background Cosmic Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-bold transition-all shadow-md"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-10">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-black uppercase tracking-wider mb-3 inline-block">
            {isRTL ? 'اختر مسارك' : 'Choose Your Experience'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {t('portalSelection')}
          </h1>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            {isRTL ? 'اختر كيف ترغب في تجربة منصة CodeRa / Looply التفاعلية' : 'Select how you want to experience the CodeRa interactive portal'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 1: Family & Learner Experience */}
          <div 
            onClick={() => onNavigate('family-selection')}
            className="group cursor-pointer bg-[#1E293B] rounded-3xl p-8 shadow-xl border-2 border-slate-700/80 hover:border-purple-500 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none" />
            
            <div className="w-16 h-16 bg-purple-600/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">{t('looplyFamily')}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {isRTL 
                ? 'للطلاب والأطفال وأولياء الأمور للتركيز على التعلم والتطوير اليومي والتفاعل المباشر.' 
                : 'For coders, learners, and families focusing on skill development, learning, and daily progress together.'}
            </p>
            
            <div className="flex items-center text-purple-400 font-black text-sm group-hover:gap-2 transition-all">
              <span>{t('letsGo')}</span> 
              {isRTL ? <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ml-2" />}
            </div>
          </div>

          {/* Option 2: Enterprise & Pro Mentor Suite */}
          <div 
            onClick={() => onNavigate('looply-pro')}
            className="group cursor-pointer bg-[#0F172A] text-white rounded-3xl p-8 shadow-xl border-2 border-slate-800 hover:border-cyan-500 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none" />

            <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <Building className="w-8 h-8" />
            </div>
            
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-white">{t('looplyPro')}</h2>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-[10px] font-black uppercase tracking-wider">
                PRO SUITE
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {isRTL 
                ? 'للمدارس والمراكز والمدربين لإدارة المجموعات، متابعة الأداء، وإعداد التقييمات.' 
                : 'For mentors, schools, institutes, and team leads managing learning programs and cases.'}
            </p>
            
            <div className="flex items-center text-cyan-400 font-black text-sm group-hover:gap-2 transition-all">
              <span>{t('letsGo')}</span> 
              {isRTL ? <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ml-2" />}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="text-slate-500 hover:text-slate-300 text-xs underline underline-offset-4 font-semibold transition-colors">
            {t('privacyPolicy')}
          </button>
        </div>
      </div>
    </div>
  );
}
