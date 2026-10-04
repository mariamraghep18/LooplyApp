import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function ToastNotification({ message, isOpen, onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-5 right-5 z-[150] bg-white text-slate-800 border border-emerald-200 rounded-2xl p-4 shadow-pastel-card flex items-center gap-3 animate-slide-in max-w-sm">
      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black text-slate-900">Action Completed</p>
        <p className="text-xs text-slate-600 font-medium truncate">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
