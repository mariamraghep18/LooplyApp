import { Users, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';

export default function PortalSelection({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { t, lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-slate-50 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="absolute top-4 right-4 flex gap-4">
        <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">
          {lang === 'en' ? 'عربي' : 'English'}
        </button>
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{t('portalSelection')}</h1>
          <p className="text-lg text-slate-500">Choose how you want to experience Looply</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            onClick={() => onNavigate('family-selection')}
            className="group cursor-pointer bg-white rounded-[2rem] p-8 shadow-sm border-2 border-transparent hover:border-purple-400 hover:shadow-xl transition-all"
          >
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{t('looplyFamily')}</h2>
            <p className="text-slate-500 mb-8">For parents and children focusing on rehabilitation, learning, and daily progress together.</p>
            <div className="flex items-center text-purple-600 font-bold group-hover:gap-2 transition-all">
              {t('letsGo')} {isRTL ? <ArrowRight className="w-5 h-5 ml-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ml-2" />}
            </div>
          </div>

          <div className="group bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-200 opacity-80">
            <div className="w-20 h-20 bg-slate-200 text-slate-500 rounded-3xl flex items-center justify-center mb-6">
              <Building className="w-10 h-10" />
            </div>
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-slate-800">{t('looplyPro')}</h2>
              <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase">{t('comingSoon')}</span>
            </div>
            <p className="text-slate-500 mb-8">For schools, institutes, clinics, and individual therapists managing multiple cases.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="text-slate-500 hover:text-slate-800 underline underline-offset-4 font-medium transition-colors">
            {t('privacyPolicy')}
          </button>
        </div>
      </div>
    </div>
  );
}
