import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

export default function MathCounting({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [level, setLevel] = useState(1);
  const starsCount = level + 2;
  
  const options = [starsCount - 1, starsCount, starsCount + 1, starsCount + 2].sort(() => Math.random() - 0.5);

  const handleOptionClick = (option: number) => {
    if (option === starsCount) {
      playAudioFeedback('success');
      speakVoice(lang === 'en' ? 'Awesome!' : 'رائع!', lang);
      if (level < 3) {
        setTimeout(() => setLevel(level + 1), 1000);
      } else {
        confetti({ particleCount: 100, spread: 70 });
        setTimeout(() => onComplete(100), 2000);
      }
    } else {
      playAudioFeedback('error');
      speakVoice(lang === 'en' ? 'Try again!' : 'حاول مرة أخرى!', lang);
    }
  };

  return (
    <div className="flex flex-col min-h-[60vh] bg-emerald-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-extrabold text-slate-800">
          {lang === 'en' ? 'Count the Stars!' : 'كم عدد النجوم؟'}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-5xl mb-8">
          {Array.from({ length: starsCount }).map((_, i) => (
            <span key={i} className="drop-shadow-md text-amber-400">⭐</span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {options.map((opt, idx) => (
            <button 
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className="py-6 bg-white text-emerald-600 text-4xl font-black rounded-3xl shadow-sm border-4 border-emerald-100 hover:bg-emerald-100 transition-colors hover:scale-105 active:scale-95"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
