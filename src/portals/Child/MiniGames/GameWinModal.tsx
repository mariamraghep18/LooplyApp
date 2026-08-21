import React from 'react';
import { useLanguage } from '../../../shared/LanguageContext';
import { Trophy } from 'lucide-react';

export default function GameWinModal({ xp, coins, onHome }: { xp: number, coins: number, onHome: () => void }) {
  const { lang } = useLanguage();
  const textMap: Record<string, { dir: string; layout: string; title: string; subtitle: string; coinsLabel: string; buttonLabel: string }> = {
    en: {
      dir: 'ltr',
      layout: 'ltr',
      title: 'Great job!',
      subtitle: 'You completed the game!',
      coinsLabel: 'Coins',
      buttonLabel: 'Back to Home'
    },
    ar: {
      dir: 'rtl',
      layout: 'rtl',
      title: 'أحسنت يا بطل!',
      subtitle: 'لقد أكملت اللعبة بنجاح!',
      coinsLabel: 'عملات',
      buttonLabel: 'العودة للرئيسية'
    }
  };
  const { dir, layout, title, subtitle, coinsLabel, buttonLabel } = textMap[lang];
  return (
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${layout}`} dir={dir}>
        <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg text-center shadow-2xl border-4 border-amber-100 animate-bounce-in relative overflow-hidden font-['Fredoka']">
          <div className="absolute inset-0 bg-amber-50 opacity-50"></div>
          <div className="relative z-10">
            <div className="text-8xl mb-6 flex justify-center">
               <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                 <Trophy className="w-16 h-16 text-amber-500" />
               </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
              {title}
            </h1>
            <p className="text-lg text-slate-500 mb-8 font-medium">
              {subtitle}
            </p>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <span className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-1">XP</span>
                <span className="text-2xl font-extrabold text-purple-600">+{xp}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">{coinsLabel}</span>
                <span className="text-2xl font-extrabold text-amber-500">+{coins} 🪙</span>
              </div>
            </div>
            
            <button 
              onClick={onHome}
              className="w-full py-5 font-extrabold text-white bg-amber-500 rounded-2xl hover:bg-amber-400 shadow-lg shadow-amber-200 transition-colors text-xl"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
  );
}
