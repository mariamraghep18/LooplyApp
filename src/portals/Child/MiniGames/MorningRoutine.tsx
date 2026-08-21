import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

const routine = [
  { id: 1, text: 'Wake Up', textAr: 'استيقظ', icon: '🌅' },
  { id: 2, text: 'Brush Teeth', textAr: 'اغسل أسنانك', icon: '🪥' },
  { id: 3, text: 'Get Dressed', textAr: 'ارتد ملابسك', icon: '👕' },
  { id: 4, text: 'Eat Breakfast', textAr: 'تناول الإفطار', icon: '🥣' }
];

export default function MorningRoutine({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepId: number) => {
    if (stepId === routine[currentStep].id) {
       playAudioFeedback('success');
       speakVoice(lang === 'en' ? 'Good job!' : 'عمل رائع!', lang);
       if (currentStep < routine.length - 1) {
          setCurrentStep(currentStep + 1);
       } else {
          confetti({ particleCount: 100, spread: 70 });
          setTimeout(() => onComplete(100), 2000);
       }
    } else {
       playAudioFeedback('error');
       speakVoice(lang === 'en' ? 'Not yet!' : 'ليس بعد!', lang);
    }
  };

  return (
    <div className="flex flex-col min-h-[60vh] bg-amber-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-800">
          {lang === 'en' ? 'Morning Routine' : 'الروتين الصباحي'}
        </h2>
        <p className="text-slate-500 font-bold mb-4">
          {lang === 'en' ? 'What comes next?' : 'ما هي الخطوة التالية؟'}
        </p>
        
        <div className="w-full max-w-sm space-y-3">
          {routine.map((item, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const state = isCompleted ? 'completed' : isCurrent ? 'current' : 'default';
            const buttonClassMap = {
              completed: 'bg-emerald-100 border-2 border-emerald-300 opacity-50',
              current: 'bg-white border-4 border-amber-300 shadow-md hover:scale-105 active:scale-95',
              default: 'bg-white/50 border-2 border-slate-200'
            };
            const textClassMap = {
              completed: 'text-emerald-700 line-through',
              current: 'text-amber-600',
              default: 'text-slate-400'
            };
            return (
              <button 
                key={item.id}
                onClick={() => handleStepClick(item.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${buttonClassMap[state]}`}
              >
                 <div className={`text-4xl ${isCompleted ? 'opacity-50' : ''}`}>{item.icon}</div>
                 <div className={`text-xl font-bold ${textClassMap[state]}`}>{lang === 'en' ? item.text : item.textAr}</div>
                 {isCompleted && <div className="ml-auto text-emerald-500 font-bold text-2xl">✓</div>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
