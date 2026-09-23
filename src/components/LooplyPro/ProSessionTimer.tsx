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
        className="fixed bottom-4 right-4 z-50 p-3 bg-slate-900 text-emerald-400 border border-purple-500/40 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-black hover:bg-slate-800 transition-all"
        title="Open Session Timer"
      >
        <Timer className="w-4 h-4 text-emerald-400 animate-spin-slow" />
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
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-slate-900/95 backdrop-blur-md text-slate-100 border border-slate-800 shadow-[0_16px_40px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden font-sans transition-all duration-300">
      
      {/* HEADER */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Timer className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black tracking-wide text-white uppercase">Session Timer</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition-colors"
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
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center relative overflow-hidden">
            <div className="text-4xl font-black font-mono tracking-wider text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              {formatTime(secondsLeft)}
            </div>

            {/* TIME PROGRESS BAR WITH CHECKPOINTS */}
            <div className="mt-3 space-y-1">
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] font-bold text-slate-500 px-0.5">
                <span>0:00</span>
                <span className={progressPct >= 75 ? 'text-emerald-400 font-extrabold' : ''}>45:00</span>
                <span className={progressPct >= 100 ? 'text-emerald-400 font-extrabold' : ''}>60:00</span>
              </div>
            </div>
          </div>

          {/* CONTROLS ROW */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
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
              className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all disabled:opacity-40"
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
                className={`flex-1 py-1.5 rounded-xl text-[11px] font-black transition-all border ${
                  totalDuration === mins * 60
                    ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* LAPS RECORDING LIST */}
          {laps.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lap Checkpoints</span>
              <div className="flex flex-wrap gap-1">
                {laps.map((lap, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-950 text-emerald-400 rounded text-[10px] font-mono font-bold border border-slate-800">
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
