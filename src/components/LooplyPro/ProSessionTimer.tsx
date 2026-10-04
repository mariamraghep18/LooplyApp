import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag, Minus, X, ChevronUp } from 'lucide-react';

export function ProSessionTimer() {
  const [secondsLeft, setSecondsLeft] = useState<number>(45 * 60); // Default 45 min
  const [totalDuration, setTotalDuration] = useState<number>(45 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (isClosed) {
    return (
      <button
        onClick={() => setIsClosed(false)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-white text-emerald-600 border border-purple-200 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black hover:bg-purple-50 transition-all cursor-pointer shadow-[0_10px_25px_-5px_rgba(99,102,241,0.2)]"
        title="Open Session Timer"
      >
        <Timer className="w-4 h-4 text-emerald-600 animate-spin-slow" />
        <span>Session Timer</span>
      </button>
    );
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handlePreset = (mins: number) => {
    const newTotal = mins * 60;
    setTotalDuration(newTotal);
    setSecondsLeft(newTotal);
    setIsRunning(false);
    setLaps([]);
  };

  const handleReset = () => {
    setSecondsLeft(totalDuration);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    const lapTime = formatTime(totalDuration - secondsLeft);
    setLaps((prev) => [lapTime, ...prev].slice(0, 4));
  };

  const elapsed = totalDuration - secondsLeft;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white/95 backdrop-blur-md text-slate-800 border border-purple-100 shadow-[0_16px_40px_rgba(124,58,237,0.15)] rounded-3xl overflow-hidden font-sans transition-all duration-300">
      
      {/* HEADER */}
      <div className="bg-purple-50/70 border-b border-purple-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <Timer className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black tracking-wide text-[#1E1B4B] uppercase">Session Timer</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-slate-400 hover:text-purple-700 rounded-md hover:bg-purple-100 transition-colors cursor-pointer"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      {!isMinimized && (
        <div className="p-4 space-y-4">
          
          {/* DIGITAL WATCH DISPLAY */}
          <div className="bg-slate-50 border border-purple-100 rounded-2xl p-4 text-center relative overflow-hidden shadow-inner">
            <div className="text-4xl font-black font-mono tracking-wider text-emerald-600 drop-shadow-xs">
              {formatTime(secondsLeft)}
            </div>

            {/* TIME PROGRESS BAR WITH CHECKPOINTS */}
            <div className="mt-3 space-y-1">
              <div className="h-2 w-full bg-purple-100/70 rounded-full overflow-hidden border border-purple-200 relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-[#7C3AED] to-[#06B6D4] rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] font-bold text-slate-400 px-0.5">
                <span>0:00</span>
                <span className={progressPct >= 75 ? 'text-emerald-600 font-extrabold' : ''}>45:00</span>
                <span className={progressPct >= 100 ? 'text-emerald-600 font-extrabold' : ''}>60:00</span>
              </div>
            </div>
          </div>

          {/* CONTROLS ROW */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 transition-all cursor-pointer shadow-xs"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:opacity-95 hover:scale-[1.01] active:scale-[0.98]'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Session</span>
                </>
              )}
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 transition-all disabled:opacity-40 cursor-pointer shadow-xs"
              title="Record Lap"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

          {/* PRESETS ROW */}
          <div className="flex items-center gap-2">
            {[30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => handlePreset(mins)}
                className={`flex-1 py-1.5 rounded-xl text-[11px] font-black transition-all border cursor-pointer ${
                  totalDuration === mins * 60
                    ? 'bg-purple-100 text-[#7C3AED] border-purple-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* LAPS RECORDING LIST */}
          {laps.length > 0 && (
            <div className="pt-2 border-t border-purple-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lap Checkpoints</span>
              <div className="flex flex-wrap gap-1">
                {laps.map((lap, i) => (
                  <span key={i} className="px-2 py-0.5 bg-purple-50 text-emerald-700 rounded text-[10px] font-mono font-bold border border-purple-200">
                    Lap {laps.length - i}: {lap}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
