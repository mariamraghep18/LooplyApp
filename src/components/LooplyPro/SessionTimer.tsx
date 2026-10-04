import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Flag,
  ChevronUp,
  Minus,
  X,
  Timer,
  Video,
  Activity,
  User,
} from 'lucide-react';

interface SessionTimerProps {
  activePatientName?: string;
  activePatientAvatar?: string;
  isTelehealthActive?: boolean;
  isAbaActive?: boolean;
}

export function SessionTimer({
  activePatientName = 'Maya Lin',
  activePatientAvatar = 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
  isTelehealthActive = false,
  isAbaActive = false,
}: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(45 * 60); // 45 mins default
  const [totalDuration, setTotalDuration] = useState<number>(45 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (isClosed) {
    return (
      <button
        onClick={() => setIsClosed(false)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-white text-purple-700 rounded-2xl shadow-pastel-card border border-purple-100 flex items-center gap-2 hover:bg-purple-50 transition-all group font-bold text-xs"
        title="Open Floating Session Timer"
      >
        <div className="relative">
          <Timer className="w-4 h-4 text-purple-600 animate-spin-slow group-hover:scale-110 transition-transform" />
          {(isTelehealthActive || isAbaActive) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          )}
        </div>
        <span>Session Timer</span>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[11px] rounded-lg border border-emerald-200">
          {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
        </span>
      </button>
    );
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handlePreset = (mins: number) => {
    const total = mins * 60;
    setTotalDuration(total);
    setSecondsLeft(total);
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

  // Progress percentage (0% to 100%)
  const elapsed = totalDuration - secondsLeft;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <div className="fixed bottom-4 right-4 z-50 w-84 bg-white/95 backdrop-blur-md text-slate-800 border border-purple-100 rounded-3xl shadow-pastel-card overflow-hidden font-sans transition-all duration-300">
      
      {/* ACTIVE CLINICAL SESSION BADGE BANNER */}
      {(isTelehealthActive || isAbaActive) && (
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 flex items-center justify-between text-[11px] font-extrabold text-emerald-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 uppercase tracking-wider flex items-center gap-1 font-bold">
              {isTelehealthActive && <Video className="w-3 h-3 text-cyan-600 inline" />}
              {isAbaActive && <Activity className="w-3 h-3 text-amber-500 inline" />}
              {isTelehealthActive && isAbaActive
                ? 'Telehealth & ABA Live'
                : isTelehealthActive
                ? 'Telehealth Call Active'
                : 'ABA Live Logger Active'}
            </span>
          </div>

          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
            LIVE SESSION
          </span>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white border-b border-purple-100 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center border border-purple-200">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black tracking-wide text-slate-900 uppercase block">Live Session Timer</span>
            {activePatientName && (
              <div className="flex items-center gap-1 text-[10px] text-purple-600 font-semibold">
                <User className="w-3 h-3 text-purple-500" />
                <span>Patient: {activePatientName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-500 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
            title={isMinimized ? 'Expand Timer' : 'Minimize Timer'}
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            title="Close Timer Widget"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      {!isMinimized && (
        <div className="p-4 space-y-4">
          
          {/* CURRENT PATIENT BADGE CARD */}
          <div className="flex items-center justify-between p-2.5 bg-purple-50/60 border border-purple-100 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <img
                src={activePatientAvatar}
                alt={activePatientName}
                className="w-8 h-8 rounded-lg object-cover border border-purple-200"
              />
              <div>
                <p className="text-xs font-black text-slate-900">{activePatientName}</p>
                <p className="text-[10px] font-medium text-slate-500">Target: 3-Word Sentence Expansion</p>
              </div>
            </div>

            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-[10px] font-bold">
              Active Patient
            </span>
          </div>

          {/* DIGITAL WATCH DISPLAY */}
          <div className="bg-slate-50 border border-purple-100 rounded-2xl p-4 text-center relative overflow-hidden">
            <div className="text-4xl font-black font-mono tracking-wider text-emerald-600">
              {formatTime(secondsLeft)}
            </div>

            {/* TIME PROGRESS BAR WITH CHECKPOINTS */}
            <div className="mt-3.5 space-y-1">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-100 relative">
                <div
                  className="h-full bg-brand-gradient rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] font-bold text-slate-400 px-0.5">
                <span>0:00</span>
                <span className={progressPct >= 50 ? 'text-purple-600 font-extrabold' : ''}>Halfway</span>
                <span className={progressPct >= 100 ? 'text-emerald-600 font-extrabold' : ''}>Target End</span>
              </div>
            </div>
          </div>

          {/* CONTROLS ROW */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 rounded-xl border border-purple-100 transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25'
                  : 'bg-brand-gradient hover:opacity-95 text-white shadow-brand-button'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Session</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Live Session</span>
                </>
              )}
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="p-2.5 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 rounded-xl border border-purple-100 transition-all disabled:opacity-40"
              title="Record Lap / Checkpoint"
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
                    ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-sm'
                    : 'bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* LAPS RECORDING LIST */}
          {laps.length > 0 && (
            <div className="pt-2 border-t border-purple-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Session Checkpoints</span>
              <div className="flex flex-wrap gap-1">
                {laps.map((lap, i) => (
                  <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-[10px] font-mono font-bold border border-purple-200">
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
