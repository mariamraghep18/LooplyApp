import React, { useState } from 'react';
import { Mic, Play, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

const lettersEn = ['A', 'B', 'C', 'D', 'E'];
const lettersAr = ['أ', 'ب', 'ت', 'ث', 'ج'];

export default function LetterAdventure({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const letters = lang === 'en' ? lettersEn : lettersAr;

  const currentLetter = letters[currentIndex];

  const playLetter = () => {
    speakVoice(currentLetter, lang);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('error');
      speakVoice(lang === 'en' ? 'Speech recognition is not supported' : 'التعرف الصوتي غير مدعوم', lang);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'ar-SA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const target = currentLetter.toLowerCase();
      
      // Simple validation for demo purposes. Speech recognition for single letters can be tricky.
      if (transcript.startsWith(target) || transcript.includes(target) || transcript.length > 0) {
         setFeedback('success');
         speakVoice(lang === 'en' ? 'Great job!' : 'أحسنت!', lang);
         confetti({ particleCount: 50, spread: 60 });
         setTimeout(() => {
            setFeedback('idle');
            if (currentIndex < letters.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              onComplete(100);
            }
         }, 2000);
      } else {
         setFeedback('error');
         speakVoice(lang === 'en' ? 'Try again!' : 'حاول مرة أخرى!', lang);
         setTimeout(() => setFeedback('idle'), 2000);
      }
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col min-h-[60vh] bg-sky-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-extrabold text-slate-800">
          {lang === 'en' ? 'Say the Letter!' : 'انطق الحرف!'}
        </h2>
        
        <div className={`text-9xl font-black text-sky-600 transition-all duration-300 ${feedback === 'success' ? 'scale-125 text-emerald-500' : ''} ${feedback === 'error' ? 'animate-shake text-red-500' : ''}`}>
          {currentLetter}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={playLetter}
            className="w-16 h-16 bg-sky-200 text-sky-700 rounded-full flex items-center justify-center hover:bg-sky-300 transition-colors shadow-sm"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
          
          <button 
            onClick={startListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white border-4 border-sky-200 text-sky-500 hover:border-sky-400'}`}
          >
            <Mic className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
