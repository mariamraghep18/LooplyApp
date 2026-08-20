import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

const emotions = [
  { text: 'Happy', textAr: 'سعيد', icon: '😊' },
  { text: 'Sad', textAr: 'حزين', icon: '😔' },
  { text: 'Angry', textAr: 'غاضب', icon: '😡' },
  { text: 'Surprised', textAr: 'متفاجئ', icon: '😲' }
];

export default function EmotionMirror({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [targetIndex, setTargetIndex] = useState(0);
  const target = emotions[targetIndex];

  const handleSelect = (emoji: string) => {
    if (emoji === target.icon) {
      playAudioFeedback('success');
      speakVoice(lang === 'en' ? 'Yes! That is ' + target.text : 'نعم! هذا ' + target.textAr, lang);
      if (targetIndex < emotions.length - 1) {
        setTimeout(() => setTargetIndex(targetIndex + 1), 1000);
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
    <div className="flex flex-col min-h-[60vh] bg-pink-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-extrabold text-slate-800">
          {lang === 'en' ? `Show me: ${target.text}` : `أرني: ${target.textAr}`}
        </h2>
        
        <div className="w-48 h-48 bg-white border-8 border-pink-200 rounded-[3rem] flex items-center justify-center shadow-inner relative overflow-hidden mb-8">
           <div className="text-8xl animate-bounce">{target.icon}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {[...emotions].sort(() => Math.random() - 0.5).map((emo, idx) => (
            <button 
              key={idx}
              onClick={() => handleSelect(emo.icon)}
              className="aspect-square bg-white text-6xl rounded-3xl shadow-sm border-4 border-pink-100 hover:bg-pink-100 hover:scale-105 active:scale-95 transition-all"
            >
              {emo.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
