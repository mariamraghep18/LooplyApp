import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar as CalendarIcon,
  Target,
  BarChart3,
  CreditCard,
  Video,
  Home,
  FileSpreadsheet,
  Activity,
  ClipboardList,
  Clock,
  UserCheck,
  Settings,
  Bell,
  Globe,
  LogOut,
  Search,
  Plus,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Building,
  CheckCircle,
  X,
  ChevronRight,
  Printer,
  ChevronLeft,
  FileText,
  Trash2,
  Lock,
  MessageSquare,
  AlertCircle,
  Check,
  Send,
  Zap,
  Filter,
  UserPlus
} from 'lucide-react';
import {
  PatientRecord,
  Appointment,
  GoalTemplate,
  HomeExercise,
  TreatmentPlan,
  TrialTapeEntry,
  IntakeSubmission,
  WaitlistEntry,
  TeamMember,
  INITIAL_NOVA_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_GOALS,
  INITIAL_TEAM,
  INITIAL_WAITLIST
} from './NovaData';
import { AddPatientModal } from './AddPatientModal';
import { ScheduleAppointmentModal } from './ScheduleAppointmentModal';
import { AddGoalTemplateModal } from './AddGoalTemplateModal';
import { QuickSoapModal } from './QuickSoapModal';
import { SessionTimer } from './SessionTimer';
import { ToastNotification } from './ToastNotification';

interface NovaCRMProps {
  onBackToPortalSelection?: () => void;
}

export function NovaCRM({ onBackToPortalSelection }: NovaCRMProps) {
  // Navigation Modules
  const [activeModule, setActiveModule] = useState<
    | 'dashboard'
    | 'patients'
    | 'appointments'
    | 'goal-bank'
    | 'analytics'
    | 'billing'
    | 'telehealth'
    | 'home-programs'
    | 'treatment-plans'
    | 'trial-data'
    | 'intake-forms'
    | 'waitlist'
    | 'team'
    | 'settings'
  >('dashboard');

  // Targeting Suites Toggle / Active Suite
  const [activeSuite, setActiveSuite] = useState<'solo' | 'school' | 'clinic'>('solo');

  // Master State Arrays
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_NOVA_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [goals, setGoals] = useState<GoalTemplate[]>(INITIAL_GOALS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(INITIAL_WAITLIST);

  // Search & Filter States
  const [patientSearch, setPatientSearch] = useState('');
  const [patientStatusFilter, setPatientStatusFilter] = useState<'All' | 'Active' | 'Inactive' | 'Discharged'>('All');
  const [goalDomainFilter, setGoalDomainFilter] = useState<string>('All');
  const [goalSearch, setGoalSearch] = useState('');

  // Interactive Modals Architecture State
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showQuickSoapModal, setShowQuickSoapModal] = useState(false);
  const [selectedSlotDate, setSelectedSlotDate] = useState<string>('2026-08-28');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('10:00 AM');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // Home Program Builder State
  const [hpNotes, setHpNotes] = useState('Please perform these exercises once daily before bedtime.');
  const [hpExercises, setHpExercises] = useState<HomeExercise[]>([
    { id: 'ex-1', title: 'Lip Trill & Breath Control', instructions: 'Blowing lip trills for 5 counts with deep belly breaths.', frequency: '1x/day', duration: '5 min' },
    { id: 'ex-2', title: 'Target Word Card Repetition', instructions: 'Repeat 3-word picture cards 5 times each with parent.', frequency: '2x/day', duration: '10 min' }
  ]);

  // Telehealth & Side-by-Side SOAP State
  const [thMeetingLink, setThMeetingLink] = useState('https://zoom.us/j/9948271032');
  const [soapS, setSoapS] = useState('Child arrived alert and energetic. Guardian noted good progress at home.');
  const [soapO, setSoapO] = useState('Completed 12 trials of 3-word sentence expansion. Produced 9 correct responses.');
  const [soapA, setSoapA] = useState('Demonstrated 75% accuracy. Expressive vocabulary shows positive trajectory (+10%).');
  const [soapP, setSoapP] = useState('Continue current 3-word phrase targets and introduce visual token board.');

  // ABA Live Trial Data Logger State
  const [trialTape, setTrialTape] = useState<TrialTapeEntry[]>([
    { id: 't-1', timestamp: '09:02 AM', result: 'Correct' },
    { id: 't-2', timestamp: '09:03 AM', result: 'Correct' },
    { id: 't-3', timestamp: '09:04 AM', result: 'Prompted' },
    { id: 't-4', timestamp: '09:05 AM', result: 'Incorrect' }
  ]);

  // Keyboard Event Listener for ABA Live Trial Logger
  useEffect(() => {
    if (activeModule !== 'trial-data') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        addTrialEntry('Correct');
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        addTrialEntry('Incorrect');
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        addTrialEntry('Prompted');
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        addTrialEntry('No Response');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModule]);

  const addTrialEntry = (result: 'Correct' | 'Incorrect' | 'Prompted' | 'No Response') => {
    const newEntry: TrialTapeEntry = {
      id: `t-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      result
    };
    setTrialTape((prev) => [newEntry, ...prev]);
  };

  // Handlers for Modals
  const handleAddPatient = (newPatient: PatientRecord) => {
    setPatients((prev) => [newPatient, ...prev]);
    triggerToast(`Patient "${newPatient.firstName} ${newPatient.lastName}" registered successfully!`);
  };

  const handleScheduleAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    triggerToast(`Appointment scheduled for ${newAppointment.patientName} on ${newAppointment.date}!`);
  };

  const handleAddGoal = (newGoal: GoalTemplate) => {
    setGoals((prev) => [newGoal, ...prev]);
    triggerToast(`Goal "${newGoal.title}" saved to IEP Goal Bank!`);
  };

  const handleSaveSoapNote = (note: { patientName: string; subjective: string; objective: string; assessment: string; plan: string }) => {
    setSoapS(note.subjective);
    setSoapO(note.objective);
    setSoapA(note.assessment);
    setSoapP(note.plan);
    triggerToast(`SOAP Note logged successfully for ${note.patientName}!`);
  };

  const handleOpenScheduleForSlot = (dateStr: string, timeStr: string = '10:00 AM') => {
    setSelectedSlotDate(dateStr);
    setSelectedSlotTime(timeStr);
    setShowScheduleModal(true);
  };

  const handleAddExercise = () => {
    const newEx: HomeExercise = {
      id: `ex-${Date.now()}`,
      title: 'New Dynamic Exercise',
      instructions: 'Step-by-step instructions for parent execution.',
      frequency: '1x/day',
      duration: '10 min'
    };
    setHpExercises([...hpExercises, newEx]);
    triggerToast('New home exercise added!');
  };

  const handleRemoveExercise = (id: string) => {
    setHpExercises(hpExercises.filter(e => e.id !== id));
  };

  const handleAiDraftSoap = () => {
    setSoapS('Client arrived on time with guardian. Engaged warmly during greeting.');
    setSoapO('Target 3-word phrase production yielded 10/12 correct trials during structured play.');
    setSoapA('Demonstrated 83% accuracy, exceeding baseline target criteria.');
    setSoapP('Maintain current 3-word target set. Prepare home exercise program for parents.');
    triggerToast('AI draft generated for SOAP Note!');
  };

  // Filtered Patients list
  const filteredPatients = patients.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(patientSearch.toLowerCase()) || p.primaryDiagnosis.toLowerCase().includes(patientSearch.toLowerCase());
    const matchesStatus = patientStatusFilter === 'All' || p.status === patientStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Goal Bank
  const filteredGoals = goals.filter((g) => {
    const matchesDomain = goalDomainFilter === 'All' || g.domain === goalDomainFilter;
    const matchesSearch = g.title.toLowerCase().includes(goalSearch.toLowerCase()) || g.description.toLowerCase().includes(goalSearch.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Calculate ABA Trial Tape accuracy
  const totalTrialsCount = trialTape.length;
  const correctTrialsCount = trialTape.filter(t => t.result === 'Correct').length;
  const trialAccuracyPct = totalTrialsCount > 0 ? Math.round((correctTrialsCount / totalTrialsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans flex relative overflow-hidden">
      
      {/* 1. PERSISTENT LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1E293B] border-r border-slate-700/80 flex flex-col justify-between shrink-0 shadow-2xl z-30 hidden md:flex">
        
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-purple-600/30 border border-purple-400/30">
                L
              </div>
              <div>
                <h1 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  <span>Looply</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-purple-950 text-purple-300 rounded-full border border-purple-800/50">
                    CLINICAL
                  </span>
                </h1>
                <p className="text-[10px] font-semibold text-slate-400">Tele-Rehab Suite</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-400 hover:text-purple-400 rounded-lg hover:bg-slate-800 transition-colors" title="Notifications">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-purple-400 rounded-lg hover:bg-slate-800 transition-colors" title="Language">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 14 Navigation Menu Items */}
          <nav className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 mb-2">CLINICAL NAVIGATION</p>
            
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'patients', label: 'Patients', icon: Users, badge: patients.length },
              { id: 'appointments', label: 'Appointments', icon: CalendarIcon, badge: appointments.length },
              { id: 'goal-bank', label: 'Goal Bank', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'telehealth', label: 'Telehealth', icon: Video, pulse: true },
              { id: 'home-programs', label: 'Home Programs', icon: Home },
              { id: 'treatment-plans', label: 'Treatment Plans', icon: FileSpreadsheet },
              { id: 'trial-data', label: 'Trial Data (ABA)', icon: Activity },
              { id: 'intake-forms', label: 'Intake Forms', icon: ClipboardList },
              { id: 'waitlist', label: 'Waitlist', icon: Clock, badge: waitlist.length },
              { id: 'team', label: 'Team', icon: UserCheck },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeModule === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-black scale-[1.01]'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-purple-800 text-white' : 'bg-[#0F172A] text-slate-300 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.pulse && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-700/80 bg-[#0F172A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
              alt="Dr. Mariam Raghep"
              className="w-8 h-8 rounded-full object-cover border border-purple-500/40"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">Dr. Mariam Raghep</p>
              <p className="text-[10px] font-semibold text-emerald-400 truncate">• Lead Specialist</p>
            </div>
          </div>

          <button
            onClick={() => onBackToPortalSelection ? onBackToPortalSelection() : null}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Sign Out to Portal Selection"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-28">
        
        {/* TOP APP BAR */}
        <header className="bg-[#1E293B] border-b border-slate-700/80 px-6 py-3.5 sticky top-0 z-20 flex items-center justify-between shadow-xl">
          
          {/* Header Left Title */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif font-black text-white capitalize tracking-tight">
              {activeModule.replace('-', ' ')}
            </h2>
            <span className="px-2.5 py-0.5 bg-[#0F172A] text-purple-300 rounded-full text-[10px] font-bold border border-purple-800/40 uppercase">
              LOOPLY CLINICAL CRM
            </span>
          </div>

          {/* Header Right Quick Actions (Log SOAP Note & Add Patient) */}
          <div className="flex items-center gap-2.5">
            
            {/* 3 Core Suite Pills */}
            <div className="bg-[#0F172A] p-1 rounded-xl flex items-center gap-1 border border-slate-700 hidden lg:flex">
              <button
                onClick={() => setActiveSuite('solo')}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  activeSuite === 'solo' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solo Practice
              </button>
              <button
                onClick={() => setActiveSuite('school')}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  activeSuite === 'school' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                School Portal
              </button>
              <button
                onClick={() => setActiveSuite('clinic')}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  activeSuite === 'clinic' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Enterprise Clinic
              </button>
            </div>

            {/* Topbar Action 1: Log SOAP Note Button */}
            <button
              onClick={() => setShowQuickSoapModal(true)}
              className="px-3.5 py-2 bg-purple-950 hover:bg-purple-900 text-purple-300 rounded-xl text-xs font-black border border-purple-800/50 shadow-md transition-all flex items-center gap-1.5"
              title="Log Real-Time Clinical SOAP Note"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Log SOAP Note</span>
            </button>

            {/* Topbar Action 2: Add Patient Button */}
            <button
              onClick={() => setShowAddPatientModal(true)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Patient</span>
            </button>
          </div>
        </header>

        {/* CORE CONTENT VIEWS */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* BANNER */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>
                  {activeSuite === 'solo' && 'Solo Practice Tele-Rehab Suite Active'}
                  {activeSuite === 'school' && 'Inclusive School IEP Tracking Active'}
                  {activeSuite === 'clinic' && 'Enterprise Multi-Disciplinary Clinic Active'}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-black tracking-tight text-white">
                {activeSuite === 'solo' && 'Tailored Private Practice Tools for Speech, OT, ABA & PT'}
                {activeSuite === 'school' && 'Special Ed Classroom IEP Goals & Multidisciplinary Team Sync'}
                {activeSuite === 'clinic' && 'Full-Scale Clinical Rehabilitation & Session Analytics'}
              </h3>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                Manage client records, side-by-side SOAP Telehealth notes, discrete trial data logging, and standardized IEP goal targets.
              </p>
            </div>

            <button
              onClick={() => setActiveModule('patients')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all shrink-0 flex items-center gap-2"
            >
              <span>Explore Patients Directory</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* ================================================================ */}
          {/* MODULE 1: DASHBOARD OVERVIEW                                     */}
          {/* ================================================================ */}
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs font-bold">Total Active Caseload</span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-serif font-black text-white">{patients.length}</div>
                  <span className="text-[10px] font-bold text-emerald-400 block">+2 new intakes this week</span>
                </div>

                <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs font-bold">Appointments Today</span>
                    <CalendarIcon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-serif font-black text-white">{appointments.length}</div>
                  <span className="text-[10px] font-bold text-purple-400 block">Next: Liam Miller (10:00 AM)</span>
                </div>

                <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs font-bold">Goal Mastery Rate</span>
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-serif font-black text-white">84%</div>
                  <span className="text-[10px] font-bold text-emerald-400 block">Avg 12 trials per target</span>
                </div>

                <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs font-bold">Waitlist Queue</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-serif font-black text-white">{waitlist.length}</div>
                  <span className="text-[10px] font-bold text-amber-400 block">2 pending intakes</span>
                </div>
              </div>

              {/* Scheduled Appointments Panel */}
              <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-slate-700/80 pb-4">
                  <h4 className="text-lg font-serif font-black text-white">Today's Scheduled Appointments</h4>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-[#0F172A] border border-slate-700/80 rounded-xl flex items-center justify-between gap-4 hover:border-purple-500/50 transition-all">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">{apt.patientName}</h5>
                          <p className="text-xs text-slate-400">{apt.type} • {apt.time} ({apt.durationMins} mins) • {apt.location}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveModule('telehealth')}
                        className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Session</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 2: PATIENT DIRECTORY                                      */}
          {/* ================================================================ */}
          {activeModule === 'patients' && (
            <div className="space-y-6">
              
              {/* Directory Bar */}
              <div className="bg-[#1E293B] border border-slate-700/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3 w-full md:w-auto flex-1">
                  <div className="relative w-full max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      placeholder="Search patients by name or diagnosis..."
                      className="w-full pl-9 pr-3.5 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Status Tabs */}
                  <div className="bg-[#0F172A] p-1 rounded-xl flex items-center gap-1 border border-slate-700">
                    {(['All', 'Active', 'Inactive', 'Discharged'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setPatientStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          patientStatusFilter === st ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setShowAddPatientModal(true)}
                    className="w-full md:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Add Patient Profile</span>
                  </button>
                </div>
              </div>

              {/* Patients Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl hover:border-purple-500/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img src={patient.avatar} alt={patient.firstName} className="w-12 h-12 rounded-xl object-cover border border-purple-500/30" />
                        <div>
                          <h4 className="text-base font-bold text-white">{patient.firstName} {patient.lastName}</h4>
                          <p className="text-xs text-slate-400">{patient.age} yrs • {patient.school}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/50 rounded-full text-[10px] font-black uppercase">
                        {patient.status}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0F172A] rounded-xl border border-slate-700/80 text-xs space-y-1">
                      <span className="font-bold text-purple-400 block">Primary Diagnosis:</span>
                      <p className="text-slate-200 font-semibold">{patient.primaryDiagnosis}</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <p><strong className="text-slate-400">Guardian:</strong> {patient.guardianName} ({patient.guardianPhone})</p>
                      <p><strong className="text-slate-400">Specialist:</strong> {patient.therapistAssigned}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 3: APPOINTMENTS & SCHEDULING                              */}
          {/* ================================================================ */}
          {activeModule === 'appointments' && (
            <div className="space-y-6">
              <div className="bg-[#1E293B] border border-slate-700/80 p-4 rounded-2xl flex justify-between items-center shadow-xl">
                <div>
                  <h3 className="text-lg font-serif font-black text-white">Clinical Calendar & Booking Grid</h3>
                  <p className="text-xs text-slate-400">Interactive patient booking manager — click any slot to schedule</p>
                </div>

                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Schedule Appointment</span>
                </button>
              </div>

              <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center pb-4 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-sm font-bold text-white">August 24 – August 30, 2026</span>
                    <button className="p-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="bg-[#0F172A] p-1 rounded-lg flex gap-1 border border-slate-700">
                    <button className="px-3 py-1 bg-purple-600 text-white font-bold text-xs rounded-md shadow-md">Week Grid</button>
                    <button className="px-3 py-1 text-slate-400 font-bold text-xs hover:text-white">Month View</button>
                  </div>
                </div>

                {/* Calendar Days Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-2 border-b border-slate-700/80">
                  {['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28 (Today)', 'Sat 29', 'Sun 30'].map((dayStr, idx) => (
                    <button
                      key={dayStr}
                      onClick={() => handleOpenScheduleForSlot(`2026-08-${24 + idx}`)}
                      className={`p-2 rounded-xl border border-transparent hover:border-purple-500/50 hover:bg-purple-950/20 transition-all ${
                        idx === 4 ? 'text-purple-400 font-extrabold bg-purple-950/40 border-purple-800/40' : ''
                      }`}
                    >
                      {dayStr}
                    </button>
                  ))}
                </div>

                {/* Appointments List */}
                <div className="space-y-3 pt-2">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-[#0F172A] border border-slate-700/80 rounded-xl flex justify-between items-center hover:border-purple-500/50 transition-all">
                      <div>
                        <h4 className="text-sm font-bold text-white">{apt.patientName}</h4>
                        <p className="text-xs text-slate-400">{apt.type} • {apt.time} ({apt.durationMins} min) • {apt.location}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/50 rounded-full text-xs font-bold">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 4: GOAL BANK (IEP TARGET REPOSITORY)                      */}
          {/* ================================================================ */}
          {activeModule === 'goal-bank' && (
            <div className="space-y-6">
              
              <div className="bg-[#1E293B] border border-slate-700/80 p-4 rounded-2xl space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-serif font-black text-white">IEP Goals Target Bank</h3>
                    <p className="text-xs text-slate-400">Clinical goal template repository across 8 therapeutic domains</p>
                  </div>

                  <button
                    onClick={() => setShowAddGoalModal(true)}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Goal Template</span>
                  </button>
                </div>

                {/* Domain Filter Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['All', 'Speech', 'Occupational', 'Social-Emotional', 'Academics', 'Executive', 'Physical', 'Daily Living'].map((dom) => (
                    <button
                      key={dom}
                      onClick={() => setGoalDomainFilter(dom)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        goalDomainFilter === dom
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-[#0F172A] text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Cards Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredGoals.map((g) => (
                  <div key={g.id} className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-3 shadow-xl hover:border-purple-500/50 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-800/50 rounded-full text-xs font-bold">
                        {g.domain}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">Measurement: {g.measurementType}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{g.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{g.description}</p>

                    <div className="p-3 bg-[#0F172A] rounded-xl border border-slate-700/80 text-xs space-y-1">
                      <span className="font-bold text-purple-400 block">Target Criteria:</span>
                      <p className="text-slate-200 font-medium">{g.targetCriteria}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 5: HOME PROGRAM BUILDER                                   */}
          {/* ================================================================ */}
          {activeModule === 'home-programs' && (
            <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-700/80 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-black text-white">Home Exercise Program Builder</h3>
                  <p className="text-xs text-slate-400">Create custom home activity plans for guardians and parent portals</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerToast('Saved to Parent Portal successfully!')}
                    className="px-4 py-2 bg-purple-950 text-purple-300 hover:bg-purple-900 rounded-xl text-xs font-bold transition-all border border-purple-800/50"
                  >
                    Save to Parent Portal
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Therapist Note */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">Therapist Personal Note to Parents:</label>
                <textarea
                  rows={2}
                  value={hpNotes}
                  onChange={(e) => setHpNotes(e.target.value)}
                  className="w-full p-3 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-medium text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">Prescribed Dynamic Exercises</h4>
                  <button
                    onClick={handleAddExercise}
                    className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700 transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exercise</span>
                  </button>
                </div>

                {hpExercises.map((ex, index) => (
                  <div key={ex.id} className="p-4 bg-[#0F172A] border border-slate-700/80 rounded-xl space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-400">Exercise #{index + 1}</span>
                      <button
                        onClick={() => handleRemoveExercise(ex.id)}
                        className="text-slate-400 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={ex.title}
                          onChange={(e) => {
                            const updated = [...hpExercises];
                            updated[index].title = e.target.value;
                            setHpExercises(updated);
                          }}
                          className="w-full p-2 bg-[#1E293B] border border-slate-700 rounded-lg font-bold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Frequency</label>
                        <select
                          value={ex.frequency}
                          onChange={(e) => {
                            const updated = [...hpExercises];
                            updated[index].frequency = e.target.value;
                            setHpExercises(updated);
                          }}
                          className="w-full p-2 bg-[#1E293B] border border-slate-700 rounded-lg font-bold text-white"
                        >
                          <option value="1x/day">1x/day</option>
                          <option value="2x/day">2x/day</option>
                          <option value="3x/week">3x/week</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Duration</label>
                        <select
                          value={ex.duration}
                          onChange={(e) => {
                            const updated = [...hpExercises];
                            updated[index].duration = e.target.value;
                            setHpExercises(updated);
                          }}
                          className="w-full p-2 bg-[#1E293B] border border-slate-700 rounded-lg font-bold text-white"
                        >
                          <option value="5 min">5 min</option>
                          <option value="10 min">10 min</option>
                          <option value="15 min">15 min</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Step-by-Step Instructions</label>
                      <textarea
                        rows={2}
                        value={ex.instructions}
                        onChange={(e) => {
                          const updated = [...hpExercises];
                          updated[index].instructions = e.target.value;
                          setHpExercises(updated);
                        }}
                        className="w-full p-2 bg-[#1E293B] border border-slate-700 rounded-lg font-medium text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 6: TELEHEALTH & SIDE-BY-SIDE SOAP NOTES                  */}
          {/* ================================================================ */}
          {activeModule === 'telehealth' && (
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Left Panel: Telehealth Meeting */}
              <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
                  <h3 className="text-lg font-serif font-black text-white">Virtual Telehealth Suite</h3>
                  <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/50 rounded-full text-xs font-bold">
                    HD Stream Active
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Meeting Link (Zoom / Meet / Teams):</label>
                    <input
                      type="text"
                      value={thMeetingLink}
                      onChange={(e) => setThMeetingLink(e.target.value)}
                      className="w-full p-2.5 bg-[#0F172A] border border-slate-700 rounded-xl font-mono text-purple-400 font-bold"
                    />
                  </div>

                  <div className="aspect-video bg-[#0F172A] rounded-xl border border-slate-700/80 relative overflow-hidden flex items-center justify-center text-white">
                    <img src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=800" alt="Video stream" className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      LIVE • Liam Miller (Speech Session)
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Side-by-Side SOAP Notes */}
              <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
                  <h3 className="text-lg font-serif font-black text-white">Real-Time SOAP Documentation</h3>
                  <button
                    onClick={handleAiDraftSoap}
                    className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 text-purple-300 rounded-lg text-xs font-black transition-all flex items-center gap-1 border border-purple-800/50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ AI Draft</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-purple-400 font-bold mb-1">Subjective (S):</label>
                    <textarea rows={2} value={soapS} onChange={(e) => setSoapS(e.target.value)} className="w-full p-2 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100" />
                  </div>

                  <div>
                    <label className="block text-cyan-400 font-bold mb-1">Objective (O):</label>
                    <textarea rows={2} value={soapO} onChange={(e) => setSoapO(e.target.value)} className="w-full p-2 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100" />
                  </div>

                  <div>
                    <label className="block text-emerald-400 font-bold mb-1">Assessment (A):</label>
                    <textarea rows={2} value={soapA} onChange={(e) => setSoapA(e.target.value)} className="w-full p-2 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100" />
                  </div>

                  <div>
                    <label className="block text-amber-400 font-bold mb-1">Plan (P):</label>
                    <textarea rows={2} value={soapP} onChange={(e) => setSoapP(e.target.value)} className="w-full p-2 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100" />
                  </div>

                  <button
                    onClick={() => triggerToast('Session SOAP note saved successfully!')}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-xs transition-all shadow-lg shadow-purple-600/30"
                  >
                    Save Session Note
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 7: ABA LIVE TRIAL DATA LOGGER                             */}
          {/* ================================================================ */}
          {activeModule === 'trial-data' && (
            <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-700/80 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-black text-white">ABA Live Trial Data Logger</h3>
                  <p className="text-xs text-slate-400">Real-time discrete trial recording with calculated accuracy & keyboard shortcuts</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-[#0F172A] rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                    Total Trials: <strong className="text-white">{totalTrialsCount}</strong>
                  </div>
                  <div className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800/50 rounded-xl text-xs font-black">
                    Accuracy: {trialAccuracyPct}%
                  </div>
                </div>
              </div>

              {/* 4 Interactive Buttons with Keyboard Bindings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => addTrialEntry('Correct')}
                  className="p-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/30 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <span className="text-2xl font-bold">+</span>
                  <span className="text-base">Correct</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Key: [+]</span>
                </button>

                <button
                  onClick={() => addTrialEntry('Incorrect')}
                  className="p-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black shadow-lg shadow-rose-600/30 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <span className="text-2xl font-bold">-</span>
                  <span className="text-base">Incorrect</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Key: [-]</span>
                </button>

                <button
                  onClick={() => addTrialEntry('Prompted')}
                  className="p-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black shadow-lg shadow-amber-600/30 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <span className="text-2xl font-bold">P</span>
                  <span className="text-base">Prompted</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Key: [P]</span>
                </button>

                <button
                  onClick={() => addTrialEntry('No Response')}
                  className="p-5 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-black shadow-lg shadow-slate-700/30 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <span className="text-2xl font-bold">N</span>
                  <span className="text-base">No Response</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Key: [N]</span>
                </button>
              </div>

              {/* Stream Tape */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Tape Stream</h4>
                <div className="flex flex-wrap gap-2 p-4 bg-[#0F172A] border border-slate-700/80 rounded-xl min-h-[60px] items-center">
                  {trialTape.length === 0 && <span className="text-xs text-slate-500 italic">No trials logged yet. Click buttons above or press keys.</span>}
                  {trialTape.map((entry) => (
                    <span
                      key={entry.id}
                      className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 border ${
                        entry.result === 'Correct' ? 'bg-emerald-950 text-emerald-300 border-emerald-800/50' :
                        entry.result === 'Incorrect' ? 'bg-rose-950 text-rose-300 border-rose-800/50' :
                        entry.result === 'Prompted' ? 'bg-amber-950 text-amber-300 border-amber-800/50' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span>{entry.result}</span>
                      <span className="text-[9px] opacity-75">{entry.timestamp}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 8-14: OTHER MODULES                                       */}
          {/* ================================================================ */}
          {['treatment-plans', 'intake-forms', 'analytics', 'billing', 'waitlist', 'team', 'settings'].includes(activeModule) && (
            <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xl font-serif font-black text-white capitalize">{activeModule.replace('-', ' ')} Module</h3>
              <p className="text-xs text-slate-400">Active medical-grade CRM module running inside Looply Tele-rehab Suite.</p>
            </div>
          )}

        </div>
      </div>

      {/* 3. PERSISTENT FLOATING SESSION TIMER WIDGET */}
      <SessionTimer
        isTelehealthActive={activeModule === 'telehealth'}
        isAbaActive={activeModule === 'trial-data'}
        activePatientName="Liam Miller"
        activePatientAvatar="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150"
      />

      {/* 4. INTERACTIVE MODALS */}
      <AddPatientModal
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        onAddPatient={handleAddPatient}
      />

      <ScheduleAppointmentModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        patients={patients}
        onScheduleAppointment={handleScheduleAppointment}
        initialDate={selectedSlotDate}
        initialTime={selectedSlotTime}
      />

      <AddGoalTemplateModal
        isOpen={showAddGoalModal}
        onClose={() => setShowAddGoalModal(false)}
        onAddGoal={handleAddGoal}
      />

      <QuickSoapModal
        isOpen={showQuickSoapModal}
        onClose={() => setShowQuickSoapModal(false)}
        patients={patients}
        onSaveSoapNote={handleSaveSoapNote}
      />

      {/* 5. TOAST NOTIFICATION */}
      <ToastNotification
        isOpen={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
}
