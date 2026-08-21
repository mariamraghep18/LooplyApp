import React, { useState, useEffect, DragEvent } from 'react';
import { ArrowLeft, Check, Sparkles, Droplets, Wind, GripVertical } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

interface HandWashingGameProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function HandWashingGame({ onBack, onComplete }: HandWashingGameProps) {
  const { lang } = useLanguage();
  
  const correctOrder = [
    { id: 'water', icon: '🚰', title: lang === 'en' ? 'Turn on water' : 'افتح الماء', color: 'bg-sky-100', border: 'border-sky-300' },
    { id: 'wet', icon: <Droplets className="w-8 h-8 text-sky-500 mx-auto" />, title: lang === 'en' ? 'Wet hands' : 'بلل يديك', color: 'bg-blue-100', border: 'border-blue-300' },
    { id: 'soap', icon: <Sparkles className="w-8 h-8 text-purple-500 mx-auto" />, title: lang === 'en' ? 'Apply soap' : 'ضع الصابون', color: 'bg-purple-100', border: 'border-purple-300' },
    { id: 'scrub', icon: '🧼', title: lang === 'en' ? 'Rub hands' : 'افرك', color: 'bg-amber-100', border: 'border-amber-300' },
    { id: 'rinse', icon: <Droplets className="w-8 h-8 text-indigo-500 mx-auto" />, title: lang === 'en' ? 'Rinse' : 'اغسل بالماء', color: 'bg-indigo-100', border: 'border-indigo-300' },
    { id: 'dry', icon: <Wind className="w-8 h-8 text-emerald-500 mx-auto" />, title: lang === 'en' ? 'Dry hands' : 'جفف يديك', color: 'bg-emerald-100', border: 'border-emerald-300' },
  ];

  const [items, setItems] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // Shuffle on mount
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    // Ensure it's not already sorted
    if (JSON.stringify(shuffled.map(i => i.id)) === JSON.stringify(correctOrder.map(i => i.id))) {
      shuffled.push(shuffled.shift()!);
    }
    setItems(shuffled);
  }, [lang]);

  const handleDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceIndex === targetIndex) return;

    const newItems = [...items];
    const [moved] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, moved);
    
    setItems(newItems);
    
  };

    const checkOrder = () => {
    const isCorrect = JSON.stringify(items.map(i => i.id)) === JSON.stringify(correctOrder.map(i => i.id));
    if (isCorrect) {
      setIsSuccess(true);
      playAudioFeedback('win');
      speakVoice(lang === 'en' ? 'Hahaha! Yay! You won!' : 'هاهاها! ياي! أنت بطل وكسبت!', lang);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#38bdf8', '#bae6fd', '#e0f2fe', '#ffffff'], shapes: ['circle'], gravity: 0.5, scalar: 1.2, drift: 0.5
      });
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setErrorCount(prev => prev + 1);
      playAudioFeedback('lose');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <div className="bg-white px-6 py-3 rounded-full font-bold text-slate-800 shadow-sm flex items-center gap-2 text-xl">
          🫧 {lang === 'en' ? 'Hand Washing' : 'غسل اليدين'}
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
            {lang === 'en' ? 'Put the steps in the correct order!' : 'ضع الخطوات بالترتيب الصحيح!'}
          </h2>
          {errorCount > 0 && !isSuccess && (
            <p className="text-amber-500 font-bold animate-pulse">
              {lang === 'en' ? 'Try again! You can do it!' : 'حاول مرة تانية! أنت تقدر!'}
            </p>
          )}
        </div>

        <div className="w-full max-w-lg space-y-3 mb-12">
          {items.map((item, index) => (
            <div 
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-4 p-4 ${item.color} border-2 ${item.border} rounded-2xl cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform`}
            >
              <GripVertical className="text-slate-400 w-6 h-6 flex-shrink-0" />
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 text-2xl">
                {typeof item.icon === 'string' ? item.icon : item.icon}
              </div>
              <div className="font-bold text-slate-700 text-lg flex-1">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {!isSuccess && (
          <button 
            onClick={checkOrder}
            className="px-12 py-5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-full font-extrabold text-2xl shadow-xl shadow-purple-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Check className="w-8 h-8" />
            {lang === 'en' ? 'Check Answer' : 'تأكد من الإجابة'}
          </button>
        )}
      </div>
    </div>
  );
}
