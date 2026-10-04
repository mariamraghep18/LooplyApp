import React, { useState, useEffect } from 'react';
import { X, FileText, Sparkles, Check, UserCheck } from 'lucide-react';
import { PatientRecord } from './LooplyProData';

export interface QuickSoapModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: PatientRecord[];
  onSaveSoapNote?: (note: {
    patientId: string;
    patientName: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    date: string;
  }) => void;
}

export function QuickSoapModal({
  isOpen,
  onClose,
  patients,
  onSaveSoapNote
}: QuickSoapModalProps) {
  const [patientId, setPatientId] = useState<string>('');
  const [subjective, setSubjective] = useState<string>('Client arrived alert, attentive, and ready for session with parent.');
  const [objective, setObjective] = useState<string>('Completed 12 trials of 3-word phrase expansion. 9/12 correct trials produced independently.');
  const [assessment, setAssessment] = useState<string>('Demonstrated 75% accuracy on target IEP goal. Exceeded baseline (+10%).');
  const [plan, setPlan] = useState<string>('Maintain 3-word target phrases. Introduce home exercise visual prompt board for parents.');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
  }, [patients, patientId]);

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

  const handleAiDraft = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setSubjective('Child arrived on time, cooperative and fully engaged during speech greeting exercises.');
      setObjective('Targeted 15 trials of receptive language sequencing. Produced 12 correct responses with minimal visual prompts.');
      setAssessment('Demonstrated 80% accuracy. Showed high retention of task rules over 3 consecutive sessions.');
      setPlan('Progress to 4-word sentence expansion next session. Assign Home Exercise module to guardian.');
      setIsAiGenerating(false);
    }, 400);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!patientId) newErrors.patientId = 'Please select a patient';
    if (!subjective.trim()) newErrors.subjective = 'Subjective note is required';
    if (!objective.trim()) newErrors.objective = 'Objective note is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPatient = patients.find(p => p.id === patientId) || patients[0];

    if (onSaveSoapNote) {
      onSaveSoapNote({
        patientId: selectedPatient ? selectedPatient.id : 'p-101',
        patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Liam Miller',
        subjective,
        objective,
        assessment,
        plan,
        date: new Date().toISOString().split('T')[0]
      });
    }

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-purple-100 rounded-3xl w-full max-w-xl shadow-pastel-card overflow-hidden transform transition-all text-slate-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-[#7C3AED] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Log Clinical SOAP Note</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                  Quick Log
                </span>
              </h3>
              <p className="text-xs text-slate-500">Record real-time clinical observations and treatment plan update</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAiDraft}
              disabled={isAiGenerating}
              className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border border-purple-200 shadow-sm disabled:opacity-50"
              title="Auto-fill with AI draft"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{isAiGenerating ? 'Drafting...' : '✨ AI Draft'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Patient Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Patient</span>
              <span className="text-purple-600">*</span>
            </label>
            <select
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                if (errors.patientId) setErrors({ ...errors, patientId: '' });
              }}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.patientId ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
              } rounded-xl text-slate-800 focus:outline-none font-medium transition-all`}
            >
              {patients.length === 0 ? (
                <option value="">No patients available</option>
              ) : (
                patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.firstName} {p.lastName} — {p.primaryDiagnosis}
                  </option>
                ))
              )}
            </select>
            {errors.patientId && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.patientId}</p>}
          </div>

          {/* Subjective (S) */}
          <div>
            <label className="block text-purple-700 font-extrabold mb-1.5 flex items-center justify-between">
              <span>Subjective (S) — Patient/Parent Presentation</span>
              <span className="text-[10px] text-slate-500 font-normal">Behavior & Affect</span>
            </label>
            <textarea
              rows={2}
              value={subjective}
              onChange={(e) => {
                setSubjective(e.target.value);
                if (errors.subjective) setErrors({ ...errors, subjective: '' });
              }}
              placeholder="Record guardian reporting, emotional presentation, alertness..."
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.subjective ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all`}
            />
            {errors.subjective && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.subjective}</p>}
          </div>

          {/* Objective (O) */}
          <div>
            <label className="block text-cyan-700 font-extrabold mb-1.5 flex items-center justify-between">
              <span>Objective (O) — Quantitative Trial & Metric Data</span>
              <span className="text-[10px] text-slate-500 font-normal">Trial Counts & Measurements</span>
            </label>
            <textarea
              rows={2}
              value={objective}
              onChange={(e) => {
                setObjective(e.target.value);
                if (errors.objective) setErrors({ ...errors, objective: '' });
              }}
              placeholder="Record trial accuracy, prompt levels, duration data..."
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.objective ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all`}
            />
            {errors.objective && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.objective}</p>}
          </div>

          {/* Assessment (A) */}
          <div>
            <label className="block text-emerald-700 font-extrabold mb-1.5 flex items-center justify-between">
              <span>Assessment (A) — Clinical Analysis & Mastery Trajectory</span>
              <span className="text-[10px] text-slate-500 font-normal">Therapist Synthesis</span>
            </label>
            <textarea
              rows={2}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Analyze progress compared to baseline criteria..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-medium transition-all"
            />
          </div>

          {/* Plan (P) */}
          <div>
            <label className="block text-amber-700 font-extrabold mb-1.5 flex items-center justify-between">
              <span>Plan (P) — Future Recommendations & Home Prescriptions</span>
              <span className="text-[10px] text-slate-500 font-normal">Next Steps</span>
            </label>
            <textarea
              rows={2}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Specify next targets, homework assignments, schedule adjustments..."
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
              <Check className="w-4 h-4" />
              <span>Save SOAP Note</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
