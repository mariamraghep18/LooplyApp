import React, { useState, useEffect } from 'react';
import { X, UserPlus, Calendar, Stethoscope, Phone, GraduationCap, Building2, UserCheck } from 'lucide-react';
import { PatientRecord } from './NovaData';

export interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: PatientRecord) => void;
}

export function AddPatientModal({ isOpen, onClose, onAddPatient }: AddPatientModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('2019-04-12');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Discharged'>('Active');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
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
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!primaryDiagnosis.trim()) newErrors.primaryDiagnosis = 'Primary diagnosis is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Calculate approximate age from DOB
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = Math.max(1, currentYear - birthYear);

    const newPatient: PatientRecord = {
      id: `p-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob,
      age,
      gender: 'Male',
      status,
      primaryDiagnosis: primaryDiagnosis.trim(),
      guardianName: guardianName.trim() || 'Primary Guardian',
      guardianPhone: guardianPhone.trim() || '(555) 000-0000',
      school: school.trim() || 'General Academy',
      grade: grade.trim() || 'Kindergarten',
      avatar: `https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150`,
      therapistAssigned: 'Dr. Mariam Raghep (SLP)',
      lastSessionDate: new Date().toISOString().split('T')[0],
      iepCompletionPct: 50
    };

    onAddPatient(newPatient);

    // Reset form
    setFirstName('');
    setLastName('');
    setPrimaryDiagnosis('');
    setGuardianName('');
    setGuardianPhone('');
    setSchool('');
    setGrade('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      <div 
        className="bg-[#1E293B] border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-4 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Add New Patient</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-950 text-purple-300 rounded-full border border-purple-800/50">
                  Quick Intake
                </span>
              </h3>
              <p className="text-xs text-slate-400">Rapidly register patient details into Looply Clinical CRM</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* First & Last Name Side-by-Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <span>First Name</span>
                <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors({ ...errors, firstName: '' });
                }}
                placeholder="e.g. Liam"
                className={`w-full px-3.5 py-2.5 bg-[#0F172A] border ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/20'
                } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 font-medium transition-all`}
              />
              {errors.firstName && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <span>Last Name</span>
                <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors({ ...errors, lastName: '' });
                }}
                placeholder="e.g. Miller"
                className={`w-full px-3.5 py-2.5 bg-[#0F172A] border ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/20'
                } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 font-medium transition-all`}
              />
              {errors.lastName && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.lastName}</p>}
            </div>
          </div>

          {/* Date of Birth & Status Dropdown */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 focus:outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Status</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 focus:outline-none font-medium transition-all"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>

          {/* Primary Diagnosis */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
              <span>Primary Diagnosis</span>
              <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              value={primaryDiagnosis}
              onChange={(e) => {
                setPrimaryDiagnosis(e.target.value);
                if (errors.primaryDiagnosis) setErrors({ ...errors, primaryDiagnosis: '' });
              }}
              placeholder="e.g. Autism Spectrum Disorder, Level 1"
              className={`w-full px-3.5 py-2.5 bg-[#0F172A] border ${
                errors.primaryDiagnosis ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-700 focus:border-purple-500 focus:ring-purple-500/20'
              } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 font-medium transition-all`}
            />
            {errors.primaryDiagnosis && <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.primaryDiagnosis}</p>}
          </div>

          {/* Guardian Name & Guardian Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Guardian Name</label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="e.g. Rachel Miller"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>Guardian Phone</span>
              </label>
              <input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="e.g. (555) 234-5678"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none font-medium transition-all"
              />
            </div>
          </div>

          {/* School & Grade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>School</span>
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Lincoln Elementary"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-slate-400" />
                <span>Grade</span>
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. Kindergarten"
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none font-medium transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
