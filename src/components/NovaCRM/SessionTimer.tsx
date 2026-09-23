import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag, Minus, X, ChevronUp, Video, Activity, User } from 'lucide-react';

export interface SessionTimerProps {
  isTelehealthActive?: boolean;
  isAbaActive?: boolean;
  activePatientName?: string;
  activePatientAvatar?: string;
}

export function SessionTimer({
  isTelehealthActive = false,
  isAbaActive = false,
  activePatientName = 'Liam Miller',
  activePatientAvatar = 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150'
}: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(45 * 60); // Default 45 min
  const [totalDuration, setTotalDuration] = useState<number>(45 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  // Automatically start timer if telehealth or ABA is active
  useEffect(() => {
    if (isTelehealthActive || isAbaActive) {
      setIsRunning(true);
      setIsClosed(false);
    }
  }, [isTelehealthActive, isAbaActive]);

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
        className="fixed bottom-4 right-4 z-50 p-3 bg-[#0B1120] text-purple-400 border border-slate-700/80 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-black hover:bg-[#1E293B] hover:text-purple-300 transition-all group"
        title="Open Session Timer"
      >
        <div className="relative">
          <Timer className="w-4 h-4 text-purple-400 animate-spin-slow group-hover:scale-110 transition-transform" />
          {(isTelehealthActive || isAbaActive) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>
        <span>Session Timer</span>
        <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 font-mono text-[11px] rounded-lg border border-slate-700">
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

  // Progress percentage (0% to 100%)
  const elapsed = totalDuration - secondsLeft;
  const progressPct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <div className="fixed bottom-4 right-4 z-50 w-84 bg-[#0B1120]/95 backdrop-blur-md text-slate-100 border border-slate-700/80 rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden font-sans transition-all duration-300">
      
      {/* ACTIVE CLINICAL SESSION BADGE BANNER */}
      {(isTelehealthActive || isAbaActive) && (
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-b border-emerald-500/30 px-4 py-1.5 flex items-center justify-between text-[11px] font-extrabold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              {isTelehealthActive && <Video className="w-3 h-3 text-cyan-400 inline" />}
              {isAbaActive && <Activity className="w-3 h-3 text-amber-400 inline" />}
              {isTelehealthActive && isAbaActive
                ? 'Telehealth & ABA Live'
                : isTelehealthActive
                ? 'Telehealth Call Active'
                : 'ABA Live Logger Active'}
            </span>
          </div>

          <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-500/30">
            LIVE SESSION
          </span>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-[#1E293B]/90 border-b border-slate-700/80 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black tracking-wide text-white uppercase block">Live Session Timer</span>
            {activePatientName && (
              <div className="flex items-center gap-1 text-[10px] text-purple-300 font-semibold">
                <User className="w-3 h-3 text-purple-400" />
                <span>Patient: {activePatientName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isMinimized ? 'Expand Timer' : 'Minimize Timer'}
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
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
          <div className="flex items-center justify-between p-2.5 bg-[#0F172A] border border-slate-700/80 rounded-xl">
            <div className="flex items-center gap-2.5">
              <img
                src={activePatientAvatar}
                alt={activePatientName}
                className="w-8 h-8 rounded-lg object-cover border border-purple-500/40"
              />
              <div>
                <p className="text-xs font-black text-slate-100">{activePatientName}</p>
                <p className="text-[10px] font-medium text-slate-400">Target: 3-Word Sentence Expansion</p>
              </div>
            </div>

            <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800/50 rounded-full text-[10px] font-bold">
              Active Patient
            </span>
          </div>

          {/* DIGITAL WATCH DISPLAY */}
          <div className="bg-[#0F172A] border border-slate-700/80 rounded-xl p-4 text-center relative overflow-hidden shadow-inner">
            <div className="text-4xl font-black font-mono tracking-wider text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.35)]">
              {formatTime(secondsLeft)}
            </div>

            {/* TIME PROGRESS BAR WITH CHECKPOINTS */}
            <div className="mt-3.5 space-y-1">
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 relative">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex justify-between text-[9px] font-bold text-slate-400 px-0.5">
                <span>0:00</span>
                <span className={progressPct >= 50 ? 'text-purple-300 font-extrabold' : ''}>Halfway</span>
                <span className={progressPct >= 100 ? 'text-emerald-400 font-extrabold' : ''}>Target End</span>
              </div>
            </div>
          </div>

          {/* CONTROLS ROW */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="p-2.5 bg-[#0F172A] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/25'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
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
              className="p-2.5 bg-[#0F172A] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-all disabled:opacity-40"
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
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all border ${
                  totalDuration === mins * 60
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/60 shadow-sm'
                    : 'bg-[#0F172A] text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* LAPS RECORDING LIST */}
          {laps.length > 0 && (
            <div className="pt-2 border-t border-slate-700/80 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Session Checkpoints</span>
              <div className="flex flex-wrap gap-1">
                {laps.map((lap, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#0F172A] text-purple-300 rounded-md text-[10px] font-mono font-bold border border-slate-700">
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
