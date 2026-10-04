import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, FileText, UserCheck } from 'lucide-react';
import { Appointment, PatientRecord } from './LooplyProData';

export interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: PatientRecord[];
  onScheduleAppointment: (appointment: Appointment) => void;
  initialDate?: string;
  initialTime?: string;
}

export function ScheduleAppointmentModal({
  isOpen,
  onClose,
  patients,
  onScheduleAppointment,
  initialDate,
  initialTime
}: ScheduleAppointmentModalProps) {
  const [patientId, setPatientId] = useState<string>('');
  const [date, setDate] = useState<string>('2026-08-28');
  const [time, setTime] = useState<string>('10:00 AM');
  const [durationMins, setDurationMins] = useState<number>(45);
  const [type, setType] = useState<string>('Speech Therapy');
  const [location, setLocation] = useState<string>('Telehealth Video Room');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (patients.length > 0 && !patientId) {
      setPatientId(patients[0].id);
    }
  }, [patients, patientId]);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
  }, [initialDate, initialTime]);

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
    if (!patientId) newErrors.patientId = 'Please select a patient';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPatient = patients.find(p => p.id === patientId) || patients[0];
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: selectedPatient ? selectedPatient.id : 'p-101',
      patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Liam Miller',
      date,
      time,
      durationMins,
      type: (type.includes('Speech') ? 'Individual' : type.includes('Evaluation') ? 'Assessment' : 'Individual') as any,
      location,
      recurrence: 'Weekly',
      therapistName: 'Dr. Mariam Raghep',
      status: 'Confirmed'
    };

    onScheduleAppointment(newAppointment);
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
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Schedule Appointment</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Live Booking
                </span>
              </h3>
              <p className="text-xs text-slate-500">Book clinical telehealth sessions or room appointments</p>
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
          
          {/* Patient Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Select Patient</span>
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
                patients.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.firstName} {pt.lastName}
                  </option>
                ))
              )}
            </select>
            {errors.patientId && <p className="text-red-500 text-[11px] mt-1">{errors.patientId}</p>}
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                <span>Date</span>
                <span className="text-purple-600">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors({ ...errors, date: '' });
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Time</span>
                <span className="text-purple-600">*</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              >
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
          </div>

          {/* Session Duration Selector */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Session Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {[30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDurationMins(mins)}
                  className={`py-2 rounded-xl text-xs font-black transition-all border ${
                    durationMins === mins
                      ? 'bg-purple-100 text-purple-700 border-purple-300 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type & Location / Mode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Appointment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              >
                <option value="Speech Therapy">Speech Therapy</option>
                <option value="Occupational Therapy">Occupational Therapy</option>
                <option value="ABA / Behavior">ABA / Behavior</option>
                <option value="Evaluation & Intake">Evaluation & Intake</option>
                <option value="Parent Consultation">Parent Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>Location / Mode</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl text-slate-800 focus:outline-none font-medium transition-all"
              >
                <option value="Telehealth Video Room">Telehealth Video Room</option>
                <option value="In-Clinic / Room 101">In-Clinic / Room 101</option>
                <option value="Sensory Gym B">Sensory Gym B</option>
                <option value="Behavioral Suite 201">Behavioral Suite 201</option>
              </select>
            </div>
          </div>

          {/* Notes / Agenda */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes / Session Agenda</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Focus on 3-word phrase targets and AAC board usage..."
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
              <CalendarIcon className="w-4 h-4" />
              <span>Schedule Appointment</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
