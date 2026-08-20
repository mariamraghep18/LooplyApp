import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

const colors = [
  { name: 'Red', nameAr: 'أحمر', class: 'bg-red-500' },
  { name: 'Blue', nameAr: 'أزرق', class: 'bg-blue-500' },
  { name: 'Green', nameAr: 'أخضر', class: 'bg-green-500' },
  { name: 'Yellow', nameAr: 'أصفر', class: 'bg-yellow-400' }
];

export default function ColorMatch({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [targetIndex, setTargetIndex] = useState(0);
  
  const target = colors[targetIndex];

  const handleColorClick = (clickedColor: typeof colors[0]) => {
    if (clickedColor.name === target.name) {
      playAudioFeedback('success');
      speakVoice(lang === 'en' ? 'Correct!' : 'صحيح!', lang);
      if (targetIndex < colors.length - 1) {
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
    <div className="flex flex-col min-h-[60vh] bg-orange-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-extrabold text-slate-800">
          {lang === 'en' ? `Find the color ${target.name}` : `أين اللون ${target.nameAr}؟`}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {colors.map((c) => (
            <button 
              key={c.name}
              onClick={() => handleColorClick(c)}
              className={`aspect-square rounded-3xl ${c.class} shadow-lg hover:scale-105 transition-transform active:scale-95 border-4 border-white`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
