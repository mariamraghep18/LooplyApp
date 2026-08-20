import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useLanguage } from '../../shared/LanguageContext';

export default function SessionTimer({ onTimeUp }: { onTimeUp?: () => void }) {
  const { lang } = useLanguage();
  const SESSION_MINUTES = 20;
  const SESSION_SECONDS = SESSION_MINUTES * 60;
  
  const [timeLeft, setTimeLeft] = useState(SESSION_SECONDS);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="bg-[#3A3F47] rounded-[2rem] p-4 flex items-center justify-between shadow-xl w-full mx-auto my-4 border-2 border-white/50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#2A2E35] rounded-full flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        </div>
        <div>
          <div className="text-red-400 font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            {lang === 'en' ? 'Session Recording...' : 'جاري تسجيل الجلسة...'}
          </div>
          <div className="text-slate-300 text-sm font-medium">
            {lang === 'en' ? 'Time Left:' : 'الوقت المتبقي:'} {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
      
      <button className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors hover:bg-emerald-500/30">
        <Camera className="w-5 h-5" />
        <span className="hidden sm:inline">{lang === 'en' ? 'Cam Active' : 'الكاميرا نشطة'}</span>
      </button>
    </div>
  );
}
