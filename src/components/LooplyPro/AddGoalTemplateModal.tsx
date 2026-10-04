import React, { useState, useEffect } from 'react';
import { X, Target, Layers, BarChart, FileText, CheckCircle2 } from 'lucide-react';
import { GoalTemplate } from './LooplyProData';

export interface AddGoalTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: GoalTemplate) => void;
}

export function AddGoalTemplateModal({ isOpen, onClose, onAddGoal }: AddGoalTemplateModalProps) {
  const [domain, setDomain] = useState<'Speech' | 'Occupational' | 'Social-Emotional' | 'Academics' | 'Executive' | 'Physical' | 'Daily Living'>('Speech');
  const [measurementType, setMeasurementType] = useState<'Percentage' | 'Duration' | 'Frequency' | 'Latency'>('Percentage');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetCriteria, setTargetCriteria] = useState('80% accuracy over 3 consecutive sessions');
  const [exampleTrials, setExampleTrials] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Goal title is required';
    if (!targetCriteria.trim()) newErrors.targetCriteria = 'Target criteria is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newGoal: GoalTemplate = {
      id: `g-${Date.now()}`,
      domain,
      measurementType,
      title: title.trim(),
      description: description.trim() || 'Standardized IEP clinical objective target.',
      targetCriteria: targetCriteria.trim(),
      exampleTrials: exampleTrials.trim() || '10 trials per session using structured visual prompt cards.'
    };

    onAddGoal(newGoal);

    // Reset form
    setTitle('');
    setDescription('');
    setExampleTrials('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      <div 
        className="bg-white border border-purple-100 rounded-3xl w-full max-w-lg shadow-pastel-card overflow-hidden transform transition-all text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-[#7C3AED] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Add Goal Template</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                  IEP Target Bank
                </span>
              </h3>
              <p className="text-xs text-slate-500">Add standardized clinical goals to the master template repository</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Domain & Measurement Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Domain</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              >
                <option value="Speech">Speech & Language</option>
                <option value="Occupational">Motor Skills / OT</option>
                <option value="Social-Emotional">Behavioral & Social</option>
                <option value="Academics">Cognition & Academics</option>
                <option value="Executive">Executive Function</option>
                <option value="Physical">Physical Therapy</option>
                <option value="Daily Living">Daily Living (ADL)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <BarChart className="w-3.5 h-3.5 text-cyan-600" />
                <span>Measurement Type</span>
              </label>
              <select
                value={measurementType}
                onChange={(e) => setMeasurementType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Duration">Duration (Time)</option>
                <option value="Frequency">Frequency (Count)</option>
                <option value="Latency">Latency (Delay)</option>
              </select>
            </div>
          </div>

          {/* Goal Title */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
              <span>Goal Title</span>
              <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              placeholder="e.g. Expressive Vocabulary Expansion"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.title ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all`}
            />
            {errors.title && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.title}</p>}
          </div>

          {/* Description & Clinical Intent */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Goal Description / Objective</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Student will spontaneously produce functional 3-word sentences during structured play without prompts."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all"
            />
          </div>

          {/* Target Criteria */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Criteria Target</span>
              <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              value={targetCriteria}
              onChange={(e) => {
                setTargetCriteria(e.target.value);
                if (errors.targetCriteria) setErrors({ ...errors, targetCriteria: '' });
              }}
              placeholder="e.g. 80% accuracy over 3 consecutive sessions"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.targetCriteria ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all`}
            />
            {errors.targetCriteria && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.targetCriteria}</p>}
          </div>

          {/* Example Trials / Operational Definition */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Example Trials / Operational Definition</label>
            <textarea
              rows={2}
              value={exampleTrials}
              onChange={(e) => setExampleTrials(e.target.value)}
              placeholder="e.g. 10 discrete trials per session using picture exchange cards or verbal prompts."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-purple-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-gradient hover:opacity-95 text-white font-black rounded-xl shadow-brand-button transition-all flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              <span>Save to Goal Bank</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
