import React, { useState, useEffect } from 'react';
import {
  Building,
  Users,
  Stethoscope,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Globe,
  Plus,
  Search,
  CheckCircle,
  FileText,
  Video,
  Target,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  Clock,
  ChevronRight,
  TrendingUp,
  Brain,
  Calendar as CalendarIcon,
  X,
  UserCheck,
  Zap,
  Mic,
  Camera,
  Play,
  Share2,
  Lock,
  MessageSquare,
  Award,
  AlertCircle,
  Home,
  FileSpreadsheet,
  Activity,
  ClipboardList,
  Printer,
  ChevronLeft,
  Trash2,
  Check,
  Mail,
  KeyRound,
  User,
  School,
  Briefcase,
  Loader2,
  Upload,
  Eye,
  EyeOff,
  FileUp,
  CheckCircle2,
  MapPin,
  Phone,
  Link as LinkIcon,
  Linkedin
} from 'lucide-react';
import {
  Patient,
  IepGoal,
  AppointedSession,
  HomeSubmission,
  StaffMember,
  BillingInvoice,
  SoapNote,
  HomeExerciseItem,
  TrialTapeEntry,
  TreatmentObjective,
  LongTermGoalItem,
  WaitlistEntry,
  INITIAL_PATIENTS,
  INITIAL_IEP_GOALS,
  INITIAL_SESSIONS,
  INITIAL_HOME_SUBMISSIONS,
  INITIAL_STAFF,
  INITIAL_INVOICES,
  INITIAL_SOAP_NOTES,
  INITIAL_WAITLIST
} from './ProData';
import { ProSessionTimer } from './ProSessionTimer';
import { useLanguage } from '../../shared/LanguageContext';

interface LooplyProProps {
  onBackToPortalSelection?: () => void;
}

export function LooplyPro({ onBackToPortalSelection }: LooplyProProps) {
  // Navigation & View States
  const [proView, setProView] = useState<'workspace-select' | 'signin' | 'register' | 'forgot-password' | 'pro-dashboard'>('workspace-select');
  const [selectedWorkspace, setSelectedWorkspace] = useState<'therapist' | 'school' | 'clinic'>('therapist');
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'patients'
    | 'appointments'
    | 'soap-notes'
    | 'iep-bank'
    | 'home-programs'
    | 'telehealth'
    | 'trial-data'
    | 'treatment-plans'
    | 'intake-forms'
    | 'waitlist'
    | 'analytics-ai'
    | 'billing'
    | 'settings'
  >('overview');
  
  // Language & Localization (Global Context Provider)
  const { lang, setLang, t: tGlobal, isRtl } = useLanguage();
  const isRTL = isRtl;

  // Auth Form State Variables (Sign In & Forgot Password)
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // 3-STEP CLINICAL REGISTRATION ONBOARDING STATE
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  
  // Step 1: Personal & Contact Info
  const [regProfilePhoto, setRegProfilePhoto] = useState<string | null>(null);
  const [regLegalName, setRegLegalName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regConfirmEmail, setRegConfirmEmail] = useState('');
  const [regWorkspace, setRegWorkspace] = useState<'therapist' | 'school' | 'clinic'>('therapist');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regShowPassword, setRegShowPassword] = useState(false);

  // Step 2: Employment & Clinical Credentials
  const [regWorkplace, setRegWorkplace] = useState('');
  const [regSpecialization, setRegSpecialization] = useState('Speech-Language Pathologist (SLP)');
  const [regLicenseId, setRegLicenseId] = useState('');
  const [regLicenseFileName, setRegLicenseFileName] = useState<string | null>(null);
  const [regBio, setRegBio] = useState('');

  // Step 3: Identity Verification & Career Links
  const [regNationalIdFileName, setRegNationalIdFileName] = useState<string | null>(null);
  const [regCvFileName, setRegCvFileName] = useState<string | null>(null);
  const [regPortfolioUrl, setRegPortfolioUrl] = useState('');
  const [regLinkedinUrl, setRegLinkedinUrl] = useState('');

  // Shared Master Data States
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [goals, setGoals] = useState<IepGoal[]>(INITIAL_IEP_GOALS);
  const [sessions, setSessions] = useState<AppointedSession[]>(INITIAL_SESSIONS);
  const [soapNotes, setSoapNotes] = useState<SoapNote[]>(INITIAL_SOAP_NOTES);
  const [invoices, setInvoices] = useState<BillingInvoice[]>(INITIAL_INVOICES);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [homeSubmissions, setHomeSubmissions] = useState<HomeSubmission[]>(INITIAL_HOME_SUBMISSIONS);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(INITIAL_WAITLIST);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [diagnosisFilter, setDiagnosisFilter] = useState<string>('all');
  const [patientStatusFilter, setPatientStatusFilter] = useState<'all' | 'active' | 'inactive' | 'discharged'>('all');
  const [goalDomainFilter, setGoalDomainFilter] = useState<string>('all');
  const [goalSearch, setGoalSearch] = useState('');

  // Interactive Modals
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddWaitlistModal, setShowAddWaitlistModal] = useState(false);
  const [showSoapModal, setShowSoapModal] = useState(false);
  const [showTelehealthModal, setShowTelehealthModal] = useState(false);
  const [showSuperbillModal, setShowSuperbillModal] = useState(false);
  const [selectedInvoiceForSuperbill, setSelectedInvoiceForSuperbill] = useState<BillingInvoice | null>(null);
  const [activeTelehealthRoom, setActiveTelehealthRoom] = useState<AppointedSession | null>(null);

  // Form Field States
  // 1. Add Patient Form
  const [newPFirstName, setNewPFirstName] = useState('');
  const [newPLastName, setNewPLastName] = useState('');
  const [newPDob, setNewPDob] = useState('2019-04-12');
  const [newPStatus, setNewPStatus] = useState<'active' | 'inactive' | 'discharged'>('active');
  const [newPDiagnosis, setNewPDiagnosis] = useState('Speech Articulation');
  const [newPGuardianName, setNewPGuardianName] = useState('');
  const [newPGuardianPhone, setNewPGuardianPhone] = useState('');
  const [newPSchool, setNewPSchool] = useState('Lincoln Elementary');
  const [newPGrade, setNewPGrade] = useState('Kindergarten');

  // 2. Schedule Appointment Form
  const [aptPatientId, setAptPatientId] = useState('p1');
  const [aptDate, setAptDate] = useState('2026-08-28');
  const [aptTime, setAptTime] = useState('09:00 AM');
  const [aptDuration, setAptDuration] = useState('45');
  const [aptType, setAptType] = useState<'individual' | 'group' | 'assessment' | 'consultation'>('individual');
  const [aptLocation, setAptLocation] = useState('Room 204 (Speech Suite)');
  const [aptRecurrence, setAptRecurrence] = useState<'none' | 'weekly' | 'bi-weekly' | 'monthly'>('weekly');

  // 3. Add Goal Template Form
  const [newGDomain, setNewGDomain] = useState<'speech' | 'motor' | 'cognitive' | 'behavioral' | 'social-emotional' | 'academics' | 'executive' | 'physical' | 'daily-living'>('speech');
  const [newGMeasurement, setNewGMeasurement] = useState<'percentage' | 'duration' | 'frequency' | 'latency'>('percentage');
  const [newGTitle, setNewGTitle] = useState('');
  const [newGDesc, setNewGDesc] = useState('');
  const [newGCriteria, setNewGCriteria] = useState('80% accuracy over 3 consecutive sessions');
  const [newGTrials, setNewGTrials] = useState('10 trials per session using picture cards.');

  // 4. Add Waitlist Entry Form
  const [newWName, setNewWName] = useState('');
  const [newWAge, setNewWAge] = useState('5');
  const [newWService, setNewWService] = useState('Speech-Language Evaluation');
  const [newWPriority, setNewWPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newWPhone, setNewWPhone] = useState('(555) 777-8899');

  // 5. Home Program Builder Form
  const [hpPatientId, setHpPatientId] = useState('p1');
  const [hpNotes, setHpNotes] = useState('Please perform these exercises once daily before bedtime with guardian assistance.');
  const [hpExercises, setHpExercises] = useState<HomeExerciseItem[]>([
    { id: 'ex-1', title: 'Lip Trill & Breath Control', instructions: 'Blowing lip trills for 5 counts with deep belly breaths.', frequency: '1x/day', duration: '5 min' },
    { id: 'ex-2', title: 'Target Word Card Repetition', instructions: 'Repeat 3-word picture cards 5 times each with parent.', frequency: '2x/day', duration: '10 min' }
  ]);

  // 6. Telehealth Side-by-Side SOAP Form
  const [thMeetingLink, setThMeetingLink] = useState('https://zoom.us/j/9948271032');
  const [soapSubjective, setSoapSubjective] = useState('Client arrived in good spirits. Mother reported Liam used 3-word phrase at breakfast.');
  const [soapObjective, setSoapObjective] = useState('Engaged in 45-minute Speech & AAC session. Produced 12 spontaneous 3-word functional requests.');
  const [soapAssessment, setSoapAssessment] = useState('Expressive vocabulary goal g1 is at 72% mastery (+10% increase from baseline).');
  const [soapPlan, setSoapPlan] = useState('Continue 3-word sentence expansion with sensory reward cards in next session.');
  const [soapPatientId, setSoapPatientId] = useState('p1');
  const [soapCpt, setSoapCpt] = useState('CPT-92507');

  // 7. ABA Live Trial Data Logger State
  const [trialPatientId, setTrialPatientId] = useState('p1');
  const [trialGoalId, setTrialGoalId] = useState('g1');
  const [trialTape, setTrialTape] = useState<TrialTapeEntry[]>([
    { id: 't-1', timestamp: '09:02 AM', result: 'correct' },
    { id: 't-2', timestamp: '09:03 AM', result: 'correct' },
    { id: 't-3', timestamp: '09:04 AM', result: 'prompted' },
    { id: 't-4', timestamp: '09:05 AM', result: 'incorrect' }
  ]);

  // 8. Patient Intake Wizard State (5 Steps)
  const [intakeStep, setIntakeStep] = useState<number>(1);
  const [intakeChildName, setIntakeChildName] = useState('');
  const [intakeDob, setIntakeDob] = useState('2020-03-15');
  const [intakeGuardianName, setIntakeGuardianName] = useState('');
  const [intakeGuardianEmail, setIntakeGuardianEmail] = useState('');
  const [intakeGuardianPhone, setIntakeGuardianPhone] = useState('');
  const [intakeMedicalHistory, setIntakeMedicalHistory] = useState('');
  const [intakeServices, setIntakeServices] = useState<string[]>(['Speech-Language Therapy']);
  const [intakeConcerns, setIntakeConcerns] = useState('');
  const [intakeInsurance, setIntakeInsurance] = useState('Blue Cross Blue Shield');
  const [intakePolicy, setIntakePolicy] = useState('POL-9948271');

  // 9. Treatment Plan Builder State
  const [tpPatientId, setTpPatientId] = useState('p1');
  const [tpFrequency, setTpFrequency] = useState('2x / week (45 mins)');
  const [tpPeriodStart, setTpPeriodStart] = useState('Aug 2026');
  const [tpPeriodEnd, setTpPeriodEnd] = useState('Feb 2027');
  const [tpGoals, setTpGoals] = useState<LongTermGoalItem[]>([
    {
      id: 'ltg-1',
      title: 'Long-Term Goal #1: Expressive Language Expansion',
      domain: 'Speech',
      targetDate: 'Feb 2027',
      objectives: [
        { id: 'stg-1', description: 'STG 1.1: Produce 3-word functional phrases in 8/10 opportunities.', targetDate: 'Oct 2026', criteria: '80% accuracy', status: 'mastered' },
        { id: 'stg-2', description: 'STG 1.2: Spontaneously use visual AAC board during snack time.', targetDate: 'Dec 2026', criteria: '90% independence', status: 'in-progress' }
      ]
    }
  ]);

  // AI Report State
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiReportGenerated, setAiReportGenerated] = useState(false);

  // Helper translation wrapper (supports both inline fallback and i18n keys)
  const t = (enStr: string, arStr?: string) => tGlobal(enStr, arStr);

  // Keyboard Shortcuts Listener for ABA Live Trial Logger
  useEffect(() => {
    if (activeTab !== 'trial-data') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === '+' || e.key === '=' || e.key.toLowerCase() === 'c') {
        e.preventDefault();
        addTrialEntry('correct');
      } else if (e.key === '-' || e.key === '_' || e.key.toLowerCase() === 'i') {
        e.preventDefault();
        addTrialEntry('incorrect');
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        addTrialEntry('prompted');
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        addTrialEntry('no-response');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const addTrialEntry = (result: 'correct' | 'incorrect' | 'prompted' | 'no-response') => {
    const newEntry: TrialTapeEntry = {
      id: `t-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      result
    };
    setTrialTape((prev) => [newEntry, ...prev]);
  };

  // Filtered Patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameAr.includes(searchQuery);
    const matchesDiag = diagnosisFilter === 'all' || p.diagnoses.some(d => d.toLowerCase().includes(diagnosisFilter.toLowerCase()));
    const matchesStatus = patientStatusFilter === 'all' || p.status === patientStatusFilter;
    return matchesSearch && matchesDiag && matchesStatus;
  });

  // Filtered Goals
  const filteredGoals = goals.filter((g) => {
    const matchesDomain = goalDomainFilter === 'all' || g.domain === goalDomainFilter;
    const matchesSearch = g.title.toLowerCase().includes(goalSearch.toLowerCase()) || g.description.toLowerCase().includes(goalSearch.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Calculation for ABA Trial Accuracy
  const totalTrialsCount = trialTape.length;
  const correctTrialsCount = trialTape.filter(t => t.result === 'correct').length;
  const trialAccuracyPct = totalTrialsCount > 0 ? Math.round((correctTrialsCount / totalTrialsCount) * 100) : 0;

  // File Upload Handlers for Registration
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setAuthError(t('Please upload a JPG or PNG image.', 'يرجى تحميل صورة بصيغة JPG أو PNG.'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (filename: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file.name);
    }
  };

  // Step 1 Next Handler
  const handleRegStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!regLegalName.trim()) {
      setAuthError(t('Full legal name is required.', 'الاسم القانوني الكامل مطلوب.'));
      return;
    }
    if (!regAddress.trim()) {
      setAuthError(t('Residential address or city is required.', 'عنوان السكن أو المدينة مطلوب.'));
      return;
    }
    if (!regPhone.trim()) {
      setAuthError(t('Phone number is required.', 'رقم الهاتف مطلوب.'));
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setAuthError(t('Please enter a valid work email address.', 'يرجى إدخال عنوان بريد إلكتروني عمل صحيح.'));
      return;
    }
    if (regEmail !== regConfirmEmail) {
      setAuthError(t('Work email and confirm email must match.', 'عنوان البريد الإلكتروني وتأكيده غير متطابقين.'));
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setAuthError(t('Password must be at least 6 characters long.', 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.'));
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setAuthError(t('Passwords do not match.', 'كلمتا المرور غير متطابقتين.'));
      return;
    }

    setRegStep(2);
  };

  // Step 2 Next Handler
  const handleRegStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!regWorkplace.trim()) {
      setAuthError(t('Current workplace / clinic name is required.', 'اسم جهة العمل أو العيادة الحالية مطلوب.'));
      return;
    }
    if (!regLicenseId.trim()) {
      setAuthError(t('License / Registration ID is required.', 'ترخيص مزاولة المهنة مطلوب.'));
      return;
    }

    setRegStep(3);
  };

  // Step 3 Complete Handler
  const handleRegComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (regPortfolioUrl && !regPortfolioUrl.startsWith('http')) {
      setAuthError(t('Please enter a valid URL starting with http:// or https:// for Portfolio.', 'يرجى إدخال رابط معتمد يبدأ بـ http:// أو https:// للملف الشخصي.'));
      return;
    }
    if (regLinkedinUrl && !regLinkedinUrl.includes('linkedin.com')) {
      setAuthError(t('Please enter a valid LinkedIn URL.', 'يرجى إدخال رابط LinkedIn صحيح.'));
      return;
    }

    setAuthSubmitting(true);
    setTimeout(() => {
      setAuthSubmitting(false);
      setSelectedWorkspace(regWorkspace);
      
      // Register new staff member
      const newStaff: StaffMember = {
        id: `tm-${Date.now()}`,
        name: regLegalName,
        nameAr: regLegalName,
        email: regEmail,
        avatar: regProfilePhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
        role: 'therapist',
        roleAr: 'أخصائي معتمد',
        specialty: regSpecialization,
        specialtyAr: regSpecialization,
        caseload: 0,
        activeToday: true,
        permissions: ['full_access']
      };
      setStaff([newStaff, ...staff]);

      setAuthSuccessMsg(t('Clinical onboarding completed! Entering workspace...', 'تم التوثيق وإنشاء الحساب بنجاح! جاري الدخول...'));
      setTimeout(() => {
        setProView('pro-dashboard');
      }, 700);
    }, 900);
  };

  // Authentication Submission Handlers for Sign In & Forgot Password
  const handleAuthSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!authEmail || !authEmail.includes('@')) {
      setAuthError(t('Please enter a valid work or practice email address.', 'يرجى إدخال عنوان بريد إلكتروني عمل صحيح.'));
      return;
    }
    if (!authPassword || authPassword.length < 4) {
      setAuthError(t('Please enter your password.', 'يرجى إدخال كلمة المرور.'));
      return;
    }

    setAuthSubmitting(true);
    setTimeout(() => {
      setAuthSubmitting(false);
      setProView('pro-dashboard');
    }, 800);
  };

  const handleAuthForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!authEmail || !authEmail.includes('@')) {
      setAuthError(t('Please enter your registered practice email.', 'يرجى إدخال البريد الإلكتروني المسجل.'));
      return;
    }

    setAuthSubmitting(true);
    setTimeout(() => {
      setAuthSubmitting(false);
      setAuthSuccessMsg(t(`Password recovery instructions sent to ${authEmail}`, `تم إرسال تعليمات استعادة كلمة المرور إلى ${authEmail}`));
    }, 800);
  };

  // Handlers for Add Operations (Fully Propagating State)
  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPFirstName) return;
    const fullName = `${newPFirstName} ${newPLastName}`.trim();
    const newP: Patient = {
      id: `p${Date.now()}`,
      name: fullName,
      nameAr: fullName,
      age: 6,
      gender: 'M',
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150',
      diagnoses: [newPDiagnosis],
      diagnosesAr: [newPDiagnosis],
      iepProgress: 50,
      primarySpecialist: 'Dr. Mariam Raghep (SLP)',
      gradeOrGroup: newPGrade || 'Early Intervention',
      lastSession: 'Just Added',
      nextSession: 'Tomorrow, 10:00 AM',
      status: newPStatus,
      dob: newPDob,
      guardianName: newPGuardianName || 'Parent Guardian',
      guardianPhone: newPGuardianPhone || '(555) 123-4567',
      school: newPSchool || 'Lincoln Elementary',
      grade: newPGrade || 'Kindergarten'
    };
    setPatients([newP, ...patients]);
    setNewPFirstName('');
    setNewPLastName('');
    setShowAddPatientModal(false);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === aptPatientId) || patients[0];
    const newApt: AppointedSession = {
      id: `ap-${Date.now()}`,
      patientId: pat.id,
      patientName: pat.name,
      therapistName: 'Dr. Mariam Raghep',
      serviceType: 'Speech & Language Session',
      serviceTypeAr: 'جلسة علاج نطق وتخاطب',
      date: aptDate,
      time: aptTime,
      durationMins: parseInt(aptDuration) || 45,
      room: aptLocation,
      status: 'scheduled',
      type: aptType,
      recurrence: aptRecurrence
    };
    setSessions([newApt, ...sessions]);
    setShowScheduleModal(false);
  };

  const handleAddGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGTitle) return;
    const newG: IepGoal = {
      id: `g${Date.now()}`,
      title: newGTitle,
      titleAr: newGTitle,
      domain: newGDomain,
      domainLabelEn: newGDomain.toUpperCase(),
      domainLabelAr: newGDomain.toUpperCase(),
      description: newGDesc || 'Standardized clinical target criteria.',
      descriptionAr: newGDesc || 'هدف سريري معاييري.',
      difficulty: 'intermediate',
      ageRange: '4-10 yrs',
      targetCriteria: newGCriteria,
      measurementType: newGMeasurement,
      exampleTrials: newGTrials
    };
    setGoals([newG, ...goals]);
    setNewGTitle('');
    setNewGDesc('');
    setShowAddGoalModal(false);
  };

  const handleAddWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWName) return;
    const newW: WaitlistEntry = {
      id: `w-${Date.now()}`,
      patientName: newWName,
      age: parseInt(newWAge) || 5,
      requestedService: newWService,
      priority: newWPriority,
      addedDate: new Date().toISOString().split('T')[0],
      contactNumber: newWPhone
    };
    setWaitlist([newW, ...waitlist]);
    setNewWName('');
    setShowAddWaitlistModal(false);
  };

  const handleSoapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === soapPatientId) || patients[0];
    const newNote: SoapNote = {
      id: `sn-${Date.now()}`,
      patientId: pat.id,
      patientName: pat.name,
      date: new Date().toISOString().split('T')[0],
      therapistName: 'Dr. Mariam Raghep',
      subjective: soapSubjective || 'Patient attended session promptly.',
      objective: soapObjective || 'Completed target trial drills.',
      assessment: soapAssessment || 'Demonstrated high response accuracy.',
      plan: soapPlan || 'Maintain target frequency for upcoming session.',
      cptCode: soapCpt,
      durationMins: 45
    };
    setSoapNotes([newNote, ...soapNotes]);
    setShowSoapModal(false);
  };

  const handleAiDraftSoap = () => {
    setSoapSubjective('Patient arrived alert and ready to work with parent guardian.');
    setSoapObjective('Target 3-word phrase production yielded 10/12 correct trials during structured play.');
    setSoapAssessment('Demonstrated 83% accuracy, exceeding baseline target criteria.');
    setSoapPlan('Maintain current 3-word target set and prepare home practice program for parents.');
  };

  const handleGenerateAiReport = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setAiReportGenerated(true);
    }, 1200);
  };

  const handleCompleteIntake = () => {
    if (intakeChildName) {
      const newP: Patient = {
        id: `p${Date.now()}`,
        name: intakeChildName,
        nameAr: intakeChildName,
        age: 5,
        gender: 'M',
        avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150',
        diagnoses: intakeServices.length > 0 ? intakeServices : ['Pediatric Assessment Needed'],
        diagnosesAr: intakeServices.length > 0 ? intakeServices : ['تقييم أطفال'],
        iepProgress: 40,
        primarySpecialist: 'Dr. Mariam Raghep (SLP)',
        gradeOrGroup: 'Intake Registration',
        lastSession: 'Newly Admitted',
        nextSession: 'Pending Evaluation',
        status: 'active',
        dob: intakeDob,
        guardianName: intakeGuardianName || 'Guardian',
        guardianPhone: intakeGuardianPhone || '(555) 000-1111',
        school: 'Preschool',
        grade: 'Pre-K'
      };
      setPatients([newP, ...patients]);
    }
    alert('Intake completed & patient admitted to active caseload successfully!');
    setIntakeStep(1);
    setIntakeChildName('');
  };

  const getWorkspaceTitle = () => {
    switch (selectedWorkspace) {
      case 'therapist':
        return t('🟣 Solo Therapist Suite', '🟣 عيادة أخصائي مستقل (Solo Therapist Suite)');
      case 'school':
        return t('🟣 Inclusive School Portal', '🟣 مدرسة الشمول والتأهيل (Inclusive School Portal)');
      case 'clinic':
        return t('🟣 Multi-Specialty Clinic Center', '🟣 مركز العلاج والتأهيل (Multi-Specialty Clinic)');
      default:
        return '🟣 Looply Pro Enterprise';
    }
  };

  // Helper getters for Workspace Authentication Identity
  const getWorkspaceMeta = () => {
    switch (selectedWorkspace) {
      case 'therapist':
        return {
          badgeEn: 'SOLO PRACTICE',
          badgeAr: 'ممارسة مستقلة',
          titleEn: 'Solo Therapist Suite',
          titleAr: 'عيادة الأخصائي المستقل',
          subEn: 'Private SLP, OT, PT & BCBA EHR Portal',
          subAr: 'بوابة التوثيق والبرامج العلاجية للأخصائيين المستقلين',
          icon: Stethoscope,
          color: 'purple',
          border: 'border-purple-200',
          bgGlow: 'bg-purple-500/[0.12]',
          btnBg: 'bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:opacity-95'
        };
      case 'school':
        return {
          badgeEn: 'SPECIAL ED SCHOOLS',
          badgeAr: 'مدارس ومراكز الدمج',
          titleEn: 'Inclusive School Portal',
          titleAr: 'مدرسة الشمول والتأهيل',
          subEn: 'Multi-Classroom IEP Progress & Special Ed Team Portal',
          subAr: 'بوابة المتابعة الشاملة لمدارس التربية الخاصة والدمج',
          icon: GraduationCap,
          color: 'indigo',
          border: 'border-indigo-200',
          bgGlow: 'bg-indigo-500/[0.12]',
          btnBg: 'bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:opacity-95'
        };
      case 'clinic':
        return {
          badgeEn: 'ENTERPRISE CLINIC',
          badgeAr: 'مراكز التأهيل الطبية',
          titleEn: 'Multi-Specialty Clinic',
          titleAr: 'مركز العلاج والتأهيل',
          subEn: 'Clinical Management, Staff Rosters & Insurance CPT Claims',
          subAr: 'منظومة إدارة المراكز الكبرى وغرف العلاج والفواتير',
          icon: Building,
          color: 'emerald',
          border: 'border-emerald-200',
          bgGlow: 'bg-cyan-500/[0.12]',
          btnBg: 'bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:opacity-95'
        };
    }
  };

  /* ========================================================================= */
  /* 1. WORKSPACE SELECTION SCREEN                                             */
  /* ========================================================================= */
  if (proView === 'workspace-select') {
    return (
      <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden w-full ${isRTL ? 'rtl font-sans' : 'ltr font-sans'}`}>
        
        {/* Subtle Ambient Glowing Background Lights */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        {/* Top Bar */}
        <div className="flex items-center justify-between z-10 max-w-6xl w-full mx-auto pb-4">
          <button
            onClick={() => onBackToPortalSelection ? onBackToPortalSelection() : setProView('workspace-select')}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white border border-purple-100/80 rounded-2xl text-xs font-bold text-[#7C3AED] transition-all shadow-xs cursor-pointer"
          >
            <ArrowRight className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            <span>{t('Back to Portal Selection', 'العودة لاختيار البوابة')}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-purple-100/80 rounded-2xl text-xs font-extrabold text-[#7C3AED] hover:bg-purple-50 transition-all shadow-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#7C3AED]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>

        {/* Main Selection Body */}
        <div className="max-w-5xl w-full mx-auto z-10 my-auto py-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-[#7C3AED] tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{t('LOOPLY PRO ENTERPRISE SUITE 2026', 'منظومة لوبلي برو الكلينيكية 2026')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#1E1B4B] tracking-tight">
              {t('Select Your Professional Workspace', 'اختر مساحة العمل التخصصية المناسبة')}
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-semibold">
              {t(
                'Comprehensive clinical EHR, IEP trajectory tracking, SOAP notes, telehealth & insurance billing built for specialists.',
                'منظومة كلينيكية متكاملة لمتابعة خطط التخاطب والتأهيل الحركي والسلوكي، توثيق جلسات SOAP، البث المباشر والفواتير.'
              )}
            </p>
          </div>

          {/* 3 Specialized Workspaces Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. Solo Therapist Suite */}
            <div
              onClick={() => {
                setSelectedWorkspace('therapist');
                setRegWorkspace('therapist');
                setProView('signin');
              }}
              className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#7C3AED] border border-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div>
                  <span className="bg-purple-50 text-[#7C3AED] border border-purple-200 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                    {t('SOLO PRACTICE', 'ممارسة مستقلة')}
                  </span>
                  <h3 className="text-xl font-black text-[#1E1B4B] mt-2">
                    {t('Solo Therapist Suite', 'عيادة أخصائي مستقل')}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
                    {t(
                      'Ideal for private SLP, OT, PT, and BCBA practitioners. Manage client records, SOAP notes, telehealth, & claim superbills.',
                      'مصممة للأخصائيين المستقلين للنطق والتخاطب، العلاج الوظيفي وتعديل السلوك لمتابعة الحالات وكتابة التقارير.'
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-100 flex items-center justify-between text-xs font-black text-[#7C3AED] group-hover:translate-x-1 transition-all">
                <span>{t('Launch Therapist Suite', 'دخول عيادة الأخصائي')}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* 2. Inclusive School Portal */}
            <div
              onClick={() => {
                setSelectedWorkspace('school');
                setRegWorkspace('school');
                setProView('signin');
              }}
              className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 border border-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                    {t('SPECIAL ED SCHOOLS', 'مدارس ومراكز الدمج')}
                  </span>
                  <h3 className="text-xl font-black text-[#1E1B4B] mt-2">
                    {t('Inclusive School Portal', 'مدرسة الشمول والتأهيل')}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
                    {t(
                      'Multi-classroom IEP progress tracking, special education teachers, multidisciplinary team collaboration & parent updates.',
                      'مخصصة لمدارس التربية الخاصة والدمج للتنسيق بين معلمي المصادر وأخصائيي الفصول والوالدين.'
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-100 flex items-center justify-between text-xs font-black text-[#7C3AED] group-hover:translate-x-1 transition-all">
                <span>{t('Launch School Portal', 'دخول بوابة المدرسة')}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* 3. Multi-Specialty Clinic Center */}
            <div
              onClick={() => {
                setSelectedWorkspace('clinic');
                setRegWorkspace('clinic');
                setProView('signin');
              }}
              className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-[#0891B2] border border-cyan-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Building className="w-7 h-7" />
                </div>
                <div>
                  <span className="bg-cyan-50 text-[#0891B2] border border-cyan-200 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                    {t('ENTERPRISE CLINIC', 'مراكز ومستشفيات التأهيل')}
                  </span>
                  <h3 className="text-xl font-black text-[#1E1B4B] mt-2">
                    {t('Multi-Specialty Clinic', 'مركز العلاج والتأهيل')}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
                    {t(
                      'Full clinical management suite, multi-therapist staff management, room scheduling, insurance CPT claims, & analytics.',
                      'منظومة إدارية وسريرية للمراكز الطبية الكبرى لإدارة الأطقم والعيادات وغرف العلاج والفواتير الطبية.'
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-100 flex items-center justify-between text-xs font-black text-[#7C3AED] group-hover:translate-x-1 transition-all">
                <span>{t('Enter Clinical Center', 'دخول مساحة المركز')}</span>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-purple-900/60 font-semibold z-10 py-2">
          {t('Looply Pro Enterprise Portal • 2026 Edition', 'بوابة لوبلي برو للمؤسسات الكلينيكية • إصدار 2026')}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 2. AUTHENTICATION FLOWS (SIGN IN & FORGOT PASSWORD)                       */
  /* ========================================================================= */
  if (['signin', 'forgot-password'].includes(proView)) {
    const meta = getWorkspaceMeta();
    const IconComp = meta.icon;

    return (
      <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden w-full ${isRTL ? 'rtl font-sans' : 'ltr font-sans'}`}>
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between z-10 max-w-4xl w-full mx-auto pb-4">
          <button
            onClick={() => {
              setAuthError(null);
              setAuthSuccessMsg(null);
              setProView('workspace-select');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white border border-purple-100/80 rounded-2xl text-xs font-bold text-[#7C3AED] transition-all shadow-xs cursor-pointer"
          >
            <ArrowRight className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            <span>{t('Back to Workspace Selection', 'العودة لاختيار مساحة العمل')}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-purple-100/80 rounded-2xl text-xs font-extrabold text-[#7C3AED] hover:bg-purple-50 transition-all shadow-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#7C3AED]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>

        {/* AUTH CARD FORM CONTAINER */}
        <div className="max-w-md w-full mx-auto z-10 my-auto py-6">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-[0_12px_32px_-4px_rgba(124,58,237,0.08)]">
            
            {/* Workspace Identity Banner */}
            <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C3AED] border border-purple-200 flex items-center justify-center shrink-0 shadow-xs">
                <IconComp className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <div>
                <span className="bg-purple-50 text-[#7C3AED] border border-purple-200 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                  {lang === 'ar' ? meta.badgeAr : meta.badgeEn}
                </span>
                <h2 className="text-lg font-black text-[#1E1B4B] leading-tight mt-1">
                  {lang === 'ar' ? meta.titleAr : meta.titleEn}
                </h2>
                <p className="text-[11px] font-semibold text-slate-500">
                  {lang === 'ar' ? meta.subAr : meta.subEn}
                </p>
              </div>
            </div>

            {/* Error / Success Feedback Banners */}
            {authError && (
              <div className="p-3.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccessMsg && (
              <div className="p-3.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{authSuccessMsg}</span>
              </div>
            )}

            {/* VIEW 1: SIGN IN */}
            {proView === 'signin' && (
              <form onSubmit={handleAuthSignInSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('Sign In to Workspace', 'تسجيل الدخول إلى العيادة')}</h3>
                  <p className="text-xs text-slate-500">{t('Enter your practice email and password to access your EHR portal.', 'أدخل البريد الإلكتروني وكلمة المرور للدخول.')}</p>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-[#1E1B4B] mb-1">{t('Practice Work Email *', 'البريد الإلكتروني للعمل *')}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 rtl:right-3 rtl:left-auto" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="dr.mariam@looplypro.com"
                        className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-2xl pl-10 pr-3 py-3 rtl:pr-10 rtl:pl-3 border border-slate-200 focus:outline-none focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[#1E1B4B]">{t('Password *', 'كلمة المرور *')}</label>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthError(null);
                          setAuthSuccessMsg(null);
                          setProView('forgot-password');
                        }}
                        className="text-[11px] font-bold text-[#7C3AED] hover:text-[#5B21B6] cursor-pointer"
                      >
                        {t('Forgot Password?', 'نسيت كلمة المرور؟')}
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 rtl:right-3 rtl:left-auto" />
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-2xl pl-10 pr-3 py-3 rtl:pr-10 rtl:pl-3 border border-slate-200 focus:outline-none focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-3.5 rounded-2xl text-xs font-black text-white transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('Signing In...', 'جاري الدخول...')}</span>
                    </>
                  ) : (
                    <span>{t('Sign In to Workspace', 'تسجيل الدخول')}</span>
                  )}
                </button>

                <div className="pt-2 text-center text-xs">
                  <span className="text-slate-500">{t("Don't have an account? ", 'ليس لديك حساب؟ ')}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setAuthSuccessMsg(null);
                      setRegStep(1);
                      setProView('register');
                    }}
                    className="font-black text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    {t('Create Account', 'إنشاء حساب جديد')}
                  </button>
                </div>
              </form>
            )}

            {/* VIEW 3: FORGOT PASSWORD */}
            {proView === 'forgot-password' && (
              <form onSubmit={handleAuthForgotPasswordSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('Reset Workspace Password', 'استعادة كلمة المرور')}</h3>
                  <p className="text-xs text-slate-500">{t('Enter your registered email to receive password recovery instructions.', 'أدخل بريدك الإلكتروني المسجل لاستلام رابط الاستعادة.')}</p>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-[#1E1B4B] mb-1">{t('Registered Practice Email *', 'البريد الإلكتروني المسجل *')}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 rtl:right-3 rtl:left-auto" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="dr.mariam@looplypro.com"
                        className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-2xl pl-10 pr-3 py-3 rtl:pr-10 rtl:pl-3 border border-slate-200 focus:outline-none focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-3.5 rounded-2xl text-xs font-black text-white transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('Sending Instructions...', 'جاري الإرسال...')}</span>
                    </>
                  ) : (
                    <span>{t('Send Password Reset Link', 'إرسال رابط الاستعادة')}</span>
                  )}
                </button>

                <div className="pt-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setAuthSuccessMsg(null);
                      setProView('signin');
                    }}
                    className="font-black text-[#7C3AED] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    <span>{t('Return to Workspace Sign In', 'العودة لتسجيل الدخول')}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-purple-900/60 font-semibold z-10 py-2">
          {t('Looply Pro Security & HIPAA Encrypted • 2026', 'أمان لوبلي برو وتشفير HIPAA المعتمد • 2026')}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 3. CLINICAL PRACTITIONER ONBOARDING (3-STEP REGISTRATION WIZARD)           */
  /* ========================================================================= */
  if (proView === 'register') {
    return (
      <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden w-full ${isRTL ? 'rtl font-sans' : 'ltr font-sans'}`}>
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        {/* Top Navigation */}
        <div className="flex items-center justify-between z-10 max-w-5xl w-full mx-auto pb-4">
          <button
            onClick={() => {
              setAuthError(null);
              setProView('workspace-select');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white border border-purple-100/80 rounded-2xl text-xs font-bold text-[#7C3AED] transition-all shadow-xs cursor-pointer"
          >
            <ArrowRight className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            <span>{t('Back to Portal Selection', 'العودة لاختيار البوابة')}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-purple-100/80 rounded-2xl text-xs font-extrabold text-[#7C3AED] hover:bg-purple-50 transition-all shadow-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#7C3AED]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>

        {/* MAIN ONBOARDING CARD CONTAINER */}
        <div className="max-w-3xl w-full mx-auto z-10 my-auto py-6">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl shadow-[0_12px_32px_-4px_rgba(124,58,237,0.08)]">
            
            {/* Header & Titles */}
            <div className="text-center space-y-2 border-b border-purple-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>{t('Clinical Practitioner Onboarding', 'توثيق وتسجيل الأخصائي السريري')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
                Looply Pro Clinical Verification & Registration
              </h2>
              <p className="text-xs text-slate-500 font-semibold max-w-xl mx-auto">
                {t('Complete your verification credentials to activate your licensed EHR workspace.', 'أكمل بيانات التوثيق والاعتماد للحصول على ترخيص المنظومة الطبية.')}
              </p>
            </div>

            {/* 3-STEP PROGRESS INDICATOR */}
            <div className="flex items-center justify-between max-w-xl mx-auto px-4">
              {[
                { step: 1, titleEn: 'Personal Details', titleAr: 'البيانات الشخصية' },
                { step: 2, titleEn: 'Credentials', titleAr: 'الاعتماد والترخيص' },
                { step: 3, titleEn: 'Verification', titleAr: 'التوثيق والسيرة' }
              ].map((s, idx) => (
                <React.Fragment key={s.step}>
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => { if (s.step < regStep) setRegStep(s.step as any); }}>
                    <div className={`w-10 h-10 rounded-2xl font-black text-xs flex items-center justify-center transition-all ${
                      regStep === s.step
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 border border-purple-400 scale-105'
                        : regStep > s.step
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {regStep > s.step ? <Check className="w-5 h-5" /> : s.step}
                    </div>
                    <span className={`text-[11px] font-bold ${regStep === s.step ? 'text-[#1E1B4B]' : 'text-slate-500'}`}>
                      {lang === 'ar' ? s.titleAr : s.titleEn}
                    </span>
                  </div>
                  {idx < 2 && <div className={`h-0.5 flex-1 mx-4 rounded-full ${regStep > idx + 1 ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* Error Feedback Banner */}
            {authError && (
              <div className="p-3.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* STEP 1: PERSONAL & CONTACT INFORMATION */}
            {regStep === 1 && (
              <form onSubmit={handleRegStep1Next} className="space-y-5 animate-fade-in">
                <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">
                  Section A: Personal & Contact Information
                </h3>

                {/* Profile Photo Dropzone */}
                <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative">
                    {regProfilePhoto ? (
                      <img src={regProfilePhoto} alt="Avatar Preview" className="w-16 h-16 rounded-2xl object-cover border-2 border-[#7C3AED]" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-purple-400 font-bold text-xs shadow-xs">
                        No Photo
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-1">
                    <p className="text-xs font-black text-[#1E1B4B]">Profile Photo Dropzone</p>
                    <p className="text-[11px] text-slate-500">Upload a professional high-resolution avatar (.jpg, .png)</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                      <label className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-[#7C3AED] border border-purple-200 rounded-xl text-xs font-black cursor-pointer transition-all shadow-xs">
                        <span>{regProfilePhoto ? 'Replace Photo' : 'Upload Photo'}</span>
                        <input type="file" accept="image/jpeg, image/png" onChange={handleProfilePhotoChange} className="hidden" />
                      </label>
                      {regProfilePhoto && (
                        <button type="button" onClick={() => setRegProfilePhoto(null)} className="px-3 py-1.5 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Full Legal Name *</label>
                    <input type="text" required value={regLegalName} onChange={(e) => setRegLegalName(e.target.value)} placeholder="Dr. Mariam Raghep" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Residential Address / City *</label>
                    <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Building 14, West Medical District" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Phone Number (Int. Format) *</label>
                    <input type="tel" required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="+1 (555) 019-2834" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Work Email Address *</label>
                    <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="mariam@clinic.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1 font-bold">Confirm Work Email Address *</label>
                    <input type="email" required value={regConfirmEmail} onChange={(e) => setRegConfirmEmail(e.target.value)} placeholder="mariam@clinic.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                </div>

                {/* Selected Workspace Card Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-[#1E1B4B]">Selected Workspace *</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: 'therapist', titleEn: '👨‍⚕️ Solo Therapist Suite', titleAr: '👨‍⚕️ عيادة مستقلة' },
                      { id: 'school', titleEn: '🏫 Inclusive School Portal', titleAr: '🏫 مدرسة تربية خاصة' },
                      { id: 'clinic', titleEn: '🏥 Multi-Specialty Clinic', titleAr: '🏥 مركز طبي متعدد' }
                    ].map((w) => (
                      <div
                        key={w.id}
                        onClick={() => setRegWorkspace(w.id as any)}
                        className={`p-3.5 rounded-2xl border text-xs font-black cursor-pointer transition-all text-center ${
                          regWorkspace === w.id
                            ? 'bg-purple-50 text-[#7C3AED] border-2 border-[#7C3AED] shadow-sm'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-purple-50/50 hover:text-[#7C3AED]'
                        }`}
                      >
                        {lang === 'ar' ? w.titleAr : w.titleEn}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Password *</label>
                    <div className="relative">
                      <input type={regShowPassword ? 'text' : 'password'} required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 pr-9 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                      <button type="button" onClick={() => setRegShowPassword(!regShowPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                        {regShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Confirm Password *</label>
                    <input type={regShowPassword ? 'text' : 'password'} required value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white font-black text-xs rounded-2xl shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer">
                  Next: Credentials →
                </button>
              </form>
            )}

            {/* STEP 2: EMPLOYMENT & CLINICAL CREDENTIALS */}
            {regStep === 2 && (
              <form onSubmit={handleRegStep2Next} className="space-y-5 animate-fade-in">
                <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">
                  Section B: Employment & Clinical Credentials
                </h3>

                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Current Workplace / Institute / Clinic *</label>
                    <input type="text" required value={regWorkplace} onChange={(e) => setRegWorkplace(e.target.value)} placeholder="Oakridge Academy & Speech Center" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Specialization & Clinical Role *</label>
                    <select value={regSpecialization} onChange={(e) => setRegSpecialization(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-bold focus:bg-white focus:border-[#7C3AED] outline-none">
                      <option value="Speech-Language Pathologist (SLP)">Speech-Language Pathologist (SLP)</option>
                      <option value="Occupational Therapist (OT)">Occupational Therapist (OT)</option>
                      <option value="Physical Therapist (PT)">Physical Therapist (PT)</option>
                      <option value="Board Certified Behavior Analyst (BCBA)">Board Certified Behavior Analyst (BCBA)</option>
                      <option value="Special Educator / Inclusion Specialist">Special Educator / Inclusion Specialist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">License / Registration ID *</label>
                    <input type="text" required value={regLicenseId} onChange={(e) => setRegLicenseId(e.target.value)} placeholder="NPI-994827103" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                  </div>

                  {/* License Document Upload */}
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">License Document Upload (.pdf, .jpg) *</label>
                    <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex items-center justify-between gap-3">
                      <div>
                        {regLicenseFileName ? (
                          <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <FileUp className="w-4 h-4" />
                            <span>{regLicenseFileName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">No file selected</span>
                        )}
                      </div>
                      <label className="px-3 py-1.5 bg-white hover:bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs">
                        <span>{regLicenseFileName ? 'Replace File' : 'Choose File'}</span>
                        <input type="file" accept=".pdf, .jpg, .jpeg" onChange={(e) => handleDocumentChange(e, setRegLicenseFileName)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Clinical Bio */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-slate-300">Professional Clinical Bio</label>
                      <span className="text-[11px] text-slate-500">{regBio.length} / 500 chars</span>
                    </div>
                    <textarea maxLength={500} rows={3} value={regBio} onChange={(e) => setRegBio(e.target.value)} placeholder="Describe your clinical expertise and background..." className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setRegStep(1)} className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer">
                    ← Back
                  </button>
                  <button type="submit" className="w-2/3 py-3 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white font-black text-xs rounded-xl shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer">
                    Next: Identity Verification →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: IDENTITY VERIFICATION & CAREER LINKS */}
            {regStep === 3 && (
              <form onSubmit={handleRegComplete} className="space-y-5 animate-fade-in">
                <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">
                  Section C: Identity Verification & Career Links
                </h3>

                <div className="space-y-4 text-xs font-semibold">
                  {/* National ID Upload */}
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">National ID / Passport Verification Upload (.pdf, .jpg)</label>
                    <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex items-center justify-between gap-3">
                      <div>
                        {regNationalIdFileName ? (
                          <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>{regNationalIdFileName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">Upload National ID or Passport</span>
                        )}
                      </div>
                      <label className="px-3 py-1.5 bg-white hover:bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs">
                        <span>{regNationalIdFileName ? 'Replace' : 'Upload ID'}</span>
                        <input type="file" accept=".pdf, .jpg, .jpeg" onChange={(e) => handleDocumentChange(e, setRegNationalIdFileName)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">CV / Resume File Uploader (.pdf, .docx)</label>
                    <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex items-center justify-between gap-3">
                      <div>
                        {regCvFileName ? (
                          <div className="flex items-center gap-2 text-purple-400 font-bold">
                            <FileUp className="w-4 h-4" />
                            <span>{regCvFileName}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">Upload CV or Resume</span>
                        )}
                      </div>
                      <label className="px-3 py-1.5 bg-white hover:bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs">
                        <span>{regCvFileName ? 'Replace' : 'Upload CV'}</span>
                        <input type="file" accept=".pdf, .docx" onChange={(e) => handleDocumentChange(e, setRegCvFileName)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Optional Links */}
                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">Portfolio / Clinical Work URL (Optional)</label>
                    <input type="url" value={regPortfolioUrl} onChange={(e) => setRegPortfolioUrl(e.target.value)} placeholder="https://mariam-slp-portfolio.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-bold">LinkedIn Profile Link (Optional)</label>
                    <input type="url" value={regLinkedinUrl} onChange={(e) => setRegLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/mariam-raghep" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setRegStep(2)} className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer">
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-2/3 py-3 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white font-black text-xs rounded-xl shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {authSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying & Launching...</span>
                      </>
                    ) : (
                      <span>Complete Registration & Launch Workspace</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Sign In Link */}
            <div className="pt-2 text-center text-xs border-t border-purple-100">
              <span className="text-slate-400">{t('Already registered? ', 'لديك حساب بالفعل؟ ')}</span>
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setProView('signin');
                }}
                className="font-black text-purple-400 hover:text-purple-300"
              >
                {t('Sign In', 'تسجيل الدخول')}
              </button>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-purple-300/60 z-10 py-2">
          {t('Looply Pro Security & HIPAA Encrypted • 2026', 'أمان لوبلي برو وتشفير HIPAA المعتمد • 2026')}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 4. MAIN LOOPLY PRO ENTERPRISE WORKSPACE DASHBOARD                          */
  /* ========================================================================= */
  return (
    <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col font-sans relative ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* TOP PRO HEADER BAR */}
      <header className="bg-white/95 border-b border-purple-100 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        
        {/* Header Left: Branding & Workspace Selector */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setProView('workspace-select')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-purple-600/30">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#1E1B4B] tracking-wide uppercase">
                  LOOPLY PRO
                </span>
                <span className="px-2.5 py-0.5 bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-full text-[10px] font-black uppercase">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 group-hover:text-[#7C3AED] transition-colors">
                {getWorkspaceTitle()}
              </p>
            </div>
          </div>
        </div>

        {/* Header Right: Doctor Profile, Actions, Language */}
        <div className="flex items-center gap-3">
          
          {/* Quick Action: Add Patient */}
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl text-xs font-black transition-all shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:opacity-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('Add Patient', 'إضافة مريض')}</span>
          </button>

          {/* Quick Action: Log SOAP Note */}
          <button
            onClick={() => setShowSoapModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#7C3AED] rounded-xl text-xs font-black transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t('Log SOAP Note', 'تدوين ملاحظة SOAP')}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-purple-50 text-[#7C3AED] rounded-xl text-xs font-bold transition-all border border-purple-200 shadow-xs cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Specialist Avatar / Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-purple-100 rtl:border-r rtl:border-l-0">
            <img
              src={regProfilePhoto || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"}
              alt="Practitioner Profile"
              className="w-8 h-8 rounded-full border border-purple-500/50 object-cover"
            />
            <div className="hidden lg:block text-left rtl:text-right">
              <p className="text-xs font-black text-[#1E1B4B] leading-none">
                {regLegalName || "Dr. Mariam Raghep (SLP-CCC)"}
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 leading-tight mt-0.5">
                ✓ License #{regLicenseId || "NPI-99482"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTENT: SIDEBAR + MAIN PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION (14 CLINICAL MODULES) */}
        <aside className="w-64 bg-white border-r border-slate-100 p-4 space-y-1.5 shrink-0 hidden md:block overflow-y-auto rtl:border-l rtl:border-r-0 shadow-xs">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2">
            {t('CLINICAL SUITE MODULES', 'وحدات المنظومة الطبية')}
          </p>

          {[
            { id: 'overview', label: t('Clinical Overview', 'لوحة التحكم الكلينيكية'), icon: BarChart3 },
            { id: 'patients', label: t('Patients & Students', 'قائمة المرضى والطلاب'), icon: Users, count: patients.length },
            { id: 'appointments', label: t('Appointments & Calendar', 'المواعيد والتقويم'), icon: CalendarIcon, count: sessions.length },
            { id: 'soap-notes', label: t('SOAP Notes & Sessions', 'جلسات وتقرير SOAP'), icon: FileText, count: soapNotes.length },
            { id: 'iep-bank', label: t('IEP Goals Target Bank', 'بنك أهداف خطة IEP'), icon: Target, count: goals.length },
            { id: 'home-programs', label: t('Home Program Builder', 'مُنّشئ البرامج المنزلية'), icon: Home },
            { id: 'telehealth', label: t('Telehealth & Live Gym', 'البث والتأهيل عن بعد'), icon: Video, pulse: true },
            { id: 'trial-data', label: t('ABA Live Trial Data Logger', 'سجل المحاولات المباشرة ABA'), icon: Activity },
            { id: 'treatment-plans', label: t('Treatment Plan Builder', 'مُصمم خطط العلاج'), icon: FileSpreadsheet },
            { id: 'intake-forms', label: t('Patient Intake Wizard', 'معالج الاستقبال الرقمي'), icon: ClipboardList },
            { id: 'waitlist', label: t('Waitlist Manager', 'قائمة الانتظار'), icon: Clock, count: waitlist.length },
            { id: 'analytics-ai', label: t('AI Clinical Analytics', 'التحليلات الذكية والتقارير'), icon: Brain },
            { id: 'billing', label: t('Billing & Claims CPT', 'الفواتير والمطالبات الطبية'), icon: CreditCard, count: invoices.length },
            { id: 'settings', label: t('Staff & Suite Settings', 'إعدادات الفريق والمركز'), icon: Settings }
          ].map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-purple-50 text-[#7C3AED] font-semibold border-r-4 border-[#7C3AED] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#7C3AED]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#7C3AED]' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100/70 text-[10px] font-black text-[#7C3AED]">
                    {item.count}
                  </span>
                )}

                {item.pulse && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}

          {/* Quick Exit to Parent Portal */}
          <div className="pt-6">
            <button
              onClick={() => onBackToPortalSelection && onBackToPortalSelection()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#7C3AED] rounded-xl text-xs font-bold transition-all border border-purple-200 cursor-pointer"
            >
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? '' : 'rotate-180'}`} />
              <span>{t('Switch to Family Portal', 'الانتقال لبوابة العائلة')}</span>
            </button>
          </div>
        </aside>

        {/* MAIN VIEWPORT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-28">
          
          {/* ================================================================ */}
          {/* MODULE 1: CLINICAL OVERVIEW                                      */}
          {/* ================================================================ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-purple-100/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between text-[#7C3AED] mb-2">
                    <span className="text-xs font-bold text-slate-500">{t('Active Patients', 'المرضى النشطون')}</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{patients.length}</span>
                    <span className="text-[10px] font-bold text-emerald-600 block mt-1">↑ +2 {t('this month', 'هذا الشهر')}</span>
                  </div>
                </div>

                <div className="bg-white border border-purple-100/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs font-bold text-slate-500">{t('IEP Goals Mastered', 'أهداف متمكن منها')}</span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">78%</span>
                    <span className="text-[10px] font-bold text-indigo-600 block mt-1">Avg Trajectory Mastery</span>
                  </div>
                </div>

                <div className="bg-white border border-purple-100/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs font-bold text-slate-500">{t('SOAP Sessions Today', 'جلسات اليوم')}</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{sessions.length}</span>
                    <span className="text-[10px] font-bold text-emerald-600 block mt-1">1 {t('In Progress', 'قيد التنفيذ الآن')}</span>
                  </div>
                </div>

                <div className="bg-white border border-purple-100/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between text-amber-600 mb-2">
                    <span className="text-xs font-bold text-slate-500">{t('Pending Invoices', 'الفواتير المتبقية')}</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">${invoices.reduce((acc, i) => acc + (i.status !== 'paid' ? i.amount : 0), 0)}</span>
                    <span className="text-[10px] font-bold text-amber-600 block mt-1">{invoices.filter(i => i.status !== 'paid').length} {t('claims processing', 'مطالبات قيد المعالجة')}</span>
                  </div>
                </div>
              </div>

              {/* Schedule & Telehealth Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-purple-100/80 rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-[#1E1B4B]">
                        {t("Today's Clinical Session Schedule", 'جدول جلسات اليوم الطبية')}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t('Real-time appointment statuses and room allocation', 'حالة الجلسات المباشرة وتوزيع العيادات')}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('telehealth')}
                      className="px-3.5 py-1.5 bg-purple-50 text-[#7C3AED] border border-purple-200 rounded-xl text-xs font-black hover:bg-[#7C3AED] hover:text-white transition-all cursor-pointer"
                    >
                      {t('Virtual Room Launcher', 'غرفة البث المباشر')}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-purple-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black shadow-xs">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-[#1E1B4B]">{sess.patientName}</h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                                sess.status === 'in-progress'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse'
                                  : 'bg-sky-50 text-sky-700 border border-sky-200'
                              }`}>
                                {sess.status === 'in-progress' ? t('Live In-Progress', 'مباشر الآن') : t('Scheduled', 'مجدولة')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              {lang === 'ar' ? sess.serviceTypeAr : sess.serviceType} • {sess.room}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveTelehealthRoom(sess);
                            setShowTelehealthModal(true);
                          }}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-brand-button hover:opacity-95 cursor-pointer"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>{t('Join Video', 'دخول البث')}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Submissions Review */}
                <div className="bg-white border border-purple-100/80 rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-[#1E1B4B]">
                      {t('Home Practice Submissions', 'تدريبات المنزل المرسلة')}
                    </h3>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-black">
                      {homeSubmissions.filter(h => h.status === 'pending').length} Pending
                    </span>
                  </div>

                  <div className="space-y-3">
                    {homeSubmissions.map((sub) => (
                      <div key={sub.id} className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#7C3AED]">{sub.patientName}</span>
                          <span className="text-[10px] text-slate-400">{sub.date}</span>
                        </div>
                        <p className="text-xs font-bold text-[#1E1B4B] leading-snug">
                          {lang === 'ar' ? sub.activityTitleAr : sub.activityTitle}
                        </p>
                        <p className="text-[11px] font-medium text-slate-500 italic">
                          "{sub.notes}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 2: PATIENTS & STUDENTS ROSTER                             */}
          {/* ================================================================ */}
          {activeTab === 'patients' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-purple-100/80 shadow-sm p-4 rounded-2xl">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                  <div className="relative w-full max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('Search by patient name or diagnosis...', 'البحث باسم المريض أو التخصص...')}
                      className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs font-semibold rounded-xl pl-9 pr-3 py-2.5 rtl:pr-9 rtl:pl-3 border border-slate-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Status Tabs Filter */}
                  <div className="bg-slate-50 p-1 rounded-xl flex border border-slate-200 items-center gap-1 border border-slate-200">
                    {(['all', 'active', 'inactive', 'discharged'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setPatientStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                          patientStatusFilter === st ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-[#7C3AED]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowAddPatientModal(true)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('+ Add Patient Profile', '+ إضافة ملف مريض')}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="bg-white border border-purple-100/80 shadow-sm hover:border-purple-500/50 rounded-3xl p-6 space-y-4 transition-all duration-200 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img src={patient.avatar} alt={patient.name} className="w-12 h-12 rounded-2xl object-cover border border-purple-500/40" />
                        <div>
                          <h3 className="text-base font-black text-[#1E1B4B] group-hover:text-[#7C3AED] transition-colors">{lang === 'ar' ? patient.nameAr : patient.name}</h3>
                          <p className="text-xs font-semibold text-slate-400">{patient.age} {t('yrs old', 'سنوات')} • {patient.school}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase">{patient.status}</span>
                    </div>

                    <div className="p-3 bg-purple-50/40 rounded-2xl border border-purple-100 text-xs">
                      <span className="font-bold text-slate-400 block mb-1">Diagnosis:</span>
                      <p className="text-slate-700 font-semibold">{lang === 'ar' ? patient.diagnosesAr.join(', ') : patient.diagnoses.join(', ')}</p>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <p><strong>Guardian:</strong> {patient.guardianName} ({patient.guardianPhone})</p>
                      <p><strong>Specialist:</strong> {patient.primarySpecialist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 3: APPOINTMENTS & SCHEDULING                              */}
          {/* ================================================================ */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between bg-white border border-purple-100/80 shadow-sm p-4 rounded-2xl">
                <div>
                  <h3 className="text-lg font-black text-[#1E1B4B]">{t('Appointments & Calendar', 'تقويم المواعيد والجلسات')}</h3>
                  <p className="text-xs text-slate-400">{t('Interactive calendar grid and appointment manager', 'جدول المواعيد التفاعلي وحجز الجلسات')}</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('Schedule Appointment', 'حجز موعد جديد')}</span>
                </button>
              </div>

              <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-[#7C3AED]"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-sm font-black text-[#1E1B4B]">August 24 – August 30, 2026</span>
                    <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-[#7C3AED]"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="bg-slate-50 p-1 rounded-xl flex border border-slate-200 gap-1 border border-slate-200">
                    <button className="px-3 py-1 bg-purple-600 text-white font-black text-xs rounded-lg">Week View</button>
                    <button className="px-3 py-1 text-slate-400 font-bold text-xs hover:text-white">Month View</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {sessions.map((sess) => (
                    <div key={sess.id} className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-4 flex items-center justify-between hover:border-purple-300 transition-all">
                      <div>
                        <h4 className="text-sm font-black text-[#1E1B4B]">{sess.patientName}</h4>
                        <p className="text-xs text-slate-400">{lang === 'ar' ? sess.serviceTypeAr : sess.serviceType} • {sess.time} ({sess.durationMins} mins) • {sess.room}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black uppercase">{sess.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 4: SOAP NOTES & SESSIONS                                  */}
          {/* ================================================================ */}
          {activeTab === 'soap-notes' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between bg-white border border-purple-100/80 shadow-sm p-4 rounded-2xl">
                <div>
                  <h3 className="text-lg font-black text-[#1E1B4B]">{t('Clinical SOAP Notes & Progress Log', 'سجل تقارير وملاحظات SOAP الطبي')}</h3>
                  <p className="text-xs text-slate-400">{t('Standardized ICD-10 & CPT coded session documentation', 'توثيق الجلسات المعياري وفق كود CPT الطبي')}</p>
                </div>
                <button
                  onClick={() => setShowSoapModal(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('New SOAP Note Entry', 'إضافة SOAP جديدة')}</span>
                </button>
              </div>

              <div className="space-y-4">
                {soapNotes.map((note) => (
                  <div key={note.id} className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                      <div>
                        <h4 className="text-base font-black text-[#1E1B4B]">{note.patientName}</h4>
                        <p className="text-xs text-slate-400">{t('Therapist', 'الأخصائي')}: {note.therapistName} • Date: {note.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-black">{note.cptCode} ({note.durationMins} mins)</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                        <span className="font-black text-purple-400 block mb-1">S - Subjective:</span>
                        <p className="text-slate-600 leading-relaxed">{note.subjective}</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                        <span className="font-black text-indigo-400 block mb-1">O - Objective:</span>
                        <p className="text-slate-600 leading-relaxed">{note.objective}</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                        <span className="font-black text-emerald-400 block mb-1">A - Assessment:</span>
                        <p className="text-slate-600 leading-relaxed">{note.assessment}</p>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                        <span className="font-black text-amber-400 block mb-1">P - Plan:</span>
                        <p className="text-slate-600 leading-relaxed">{note.plan}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 5: IEP GOALS TARGET BANK                                  */}
          {/* ================================================================ */}
          {activeTab === 'iep-bank' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-purple-100/80 shadow-sm p-4 rounded-2xl">
                <div>
                  <h3 className="text-lg font-black text-[#1E1B4B]">{t('Standardized IEP Goal Bank', 'بنك أهداف خطة التربية والتأهيل الفردية')}</h3>
                  <p className="text-xs text-slate-400">{t('Pre-curated target criteria across 8 therapeutic domains', 'معايير مستهدفة عبر مجالات التأهيل')}</p>
                </div>
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('+ Add Goal Template', '+ إضافة قالب هدف')}</span>
                </button>
              </div>

              {/* Domain Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {['all', 'speech', 'motor', 'cognitive', 'behavioral', 'social-emotional', 'academics', 'executive', 'physical', 'daily-living'].map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setGoalDomainFilter(dom)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all border ${
                      goalDomainFilter === dom
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                        : 'bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredGoals.map((g) => (
                  <div key={g.id} className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-black">
                        {lang === 'ar' ? g.domainLabelAr : g.domainLabelEn}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Age: {g.ageRange}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#1E1B4B]">{lang === 'ar' ? g.titleAr : g.title}</h4>
                      <p className="text-xs font-semibold text-slate-300 mt-2 leading-relaxed">{lang === 'ar' ? g.descriptionAr : g.description}</p>
                    </div>

                    <div className="p-3 bg-purple-50/40 rounded-2xl border border-purple-100 text-xs space-y-1">
                      <span className="font-bold text-indigo-400 block">{t('Target Criterion', 'معيار النجاح Target')}:</span>
                      <p className="text-slate-300 font-medium">{g.targetCriteria}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 6: HOME PROGRAM BUILDER                                   */}
          {/* ================================================================ */}
          {activeTab === 'home-programs' && (
            <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('Home Exercise Program Builder', 'مُنّشئ البرامج والتمارين المنزلية')}</h3>
                  <p className="text-xs text-slate-400">{t('Prescribe dynamic exercises for parents with PDF export', 'إسناد تمارين منزلية للأسر وتصدير ملف PDF')}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select value={hpPatientId} onChange={(e) => setHpPatientId(e.target.value)} className="bg-slate-50/80 border border-purple-100/60 text-slate-800 text-xs font-bold rounded-xl px-3 py-2">
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>

                  <button onClick={() => alert('Saved to Parent Portal successfully!')} className="px-3.5 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-black hover:bg-purple-600 hover:text-white transition-all">
                    {t('Save to Parent Portal', 'حفظ لحساب الوالدين')}
                  </button>
                  <button onClick={() => window.print()} className="px-3.5 py-2 bg-purple-600 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/25 flex items-center gap-1.5">
                    <Printer className="w-4 h-4" />
                    <span>{t('Download PDF', 'تحميل PDF')}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-purple-400">{t('Therapist Personal Note to Parents:', 'ملاحظة الأخصائي للوالدين:')}</label>
                <textarea rows={2} value={hpNotes} onChange={(e) => setHpNotes(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-800 rounded-2xl p-3 text-xs font-semibold focus:outline-none" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#1E1B4B]">{t('Prescribed Exercises List', 'قائمة التمارين المسندة')}</h4>
                  <button onClick={() => setHpExercises([...hpExercises, { id: `ex-${Date.now()}`, title: 'New Exercise', instructions: 'Instructions...', frequency: '1x/day', duration: '10 min' }])} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('Add Exercise', 'إضافة تمرين')}</span>
                  </button>
                </div>

                {hpExercises.map((ex, idx) => (
                  <div key={ex.id} className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-purple-400">Exercise #{idx + 1}</span>
                      <button onClick={() => setHpExercises(hpExercises.filter(e => e.id !== ex.id))} className="text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Title</label>
                        <input type="text" value={ex.title} onChange={(e) => { const copy = [...hpExercises]; copy[idx].title = e.target.value; setHpExercises(copy); }} className="w-full bg-white border border-purple-100/80 shadow-sm text-slate-800 rounded-xl p-2 font-bold" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Frequency</label>
                        <select value={ex.frequency} onChange={(e) => { const copy = [...hpExercises]; copy[idx].frequency = e.target.value; setHpExercises(copy); }} className="w-full bg-white border border-purple-100/80 shadow-sm text-slate-800 rounded-xl p-2 font-bold">
                          <option value="1x/day">1x/day</option>
                          <option value="2x/day">2x/day</option>
                          <option value="3x/week">3x/week</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Duration</label>
                        <select value={ex.duration} onChange={(e) => { const copy = [...hpExercises]; copy[idx].duration = e.target.value; setHpExercises(copy); }} className="w-full bg-white border border-purple-100/80 shadow-sm text-slate-800 rounded-xl p-2 font-bold">
                          <option value="5 min">5 min</option>
                          <option value="10 min">10 min</option>
                          <option value="15 min">15 min</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Step-by-Step Instructions</label>
                      <textarea rows={2} value={ex.instructions} onChange={(e) => { const copy = [...hpExercises]; copy[idx].instructions = e.target.value; setHpExercises(copy); }} className="w-full bg-white border border-purple-100/80 shadow-sm text-slate-200 rounded-xl p-2 font-medium" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 7: TELEHEALTH + SIDE-BY-SIDE SOAP                          */}
          {/* ================================================================ */}
          {activeTab === 'telehealth' && (
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
              {/* Left Panel: Telehealth Meeting */}
              <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-base font-black text-[#1E1B4B]">{t('Telehealth Video Gateway', 'بث التأهيل عن بعد')}</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Select Patient:</label>
                    <select value={soapPatientId} onChange={(e) => setSoapPatientId(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-800 font-bold rounded-xl p-2.5 mb-3">
                      {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>

                    <label className="block text-slate-400 font-bold mb-1">Meeting Link (Zoom / Meet / Teams):</label>
                    <input type="text" value={thMeetingLink} onChange={(e) => setThMeetingLink(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-purple-400 font-mono font-bold rounded-xl p-2.5" />
                  </div>

                  <div className="aspect-video bg-purple-50/40 rounded-2xl border border-purple-100 relative overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=800" alt="Video stream" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs font-black text-emerald-400 border border-emerald-500/30">
                      LIVE STREAM • {patients.find(p => p.id === soapPatientId)?.name || 'Liam Miller'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Side-by-Side SOAP Notes */}
              <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#1E1B4B]">{t('Real-Time SOAP Documentation', 'توثيق ملاحظات SOAP الفورية')}</h3>
                  <button onClick={handleAiDraftSoap} className="px-3 py-1.5 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-black hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ AI Draft</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div>
                    <label className="block text-purple-400 font-bold mb-1">Subjective (S)</label>
                    <textarea rows={2} value={soapSubjective} onChange={(e) => setSoapSubjective(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-200 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="block text-indigo-400 font-bold mb-1">Objective (O)</label>
                    <textarea rows={2} value={soapObjective} onChange={(e) => setSoapObjective(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-200 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="block text-emerald-400 font-bold mb-1">Assessment (A)</label>
                    <textarea rows={2} value={soapAssessment} onChange={(e) => setSoapAssessment(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-200 rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="block text-amber-400 font-bold mb-1">Plan (P)</label>
                    <textarea rows={2} value={soapPlan} onChange={(e) => setSoapPlan(e.target.value)} className="w-full bg-slate-50/80 border border-purple-100/60 text-slate-200 rounded-xl p-2.5" />
                  </div>

                  <button onClick={handleSoapSubmit} className="w-full py-2.5 bg-purple-600 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/25">
                    {t('Save Session SOAP Note', 'حفظ التقرير في السجل الطّبي')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 8: ABA LIVE TRIAL DATA LOGGER                             */}
          {/* ================================================================ */}
          {activeTab === 'trial-data' && (
            <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('ABA Live Trial Data Logger', 'مسجل محاولات تعديل السلوك ABA المباشر')}</h3>
                  <p className="text-xs text-slate-400">{t('Discrete trial recording with keyboard shortcuts & accuracy calculator', 'تسجيل المحاولات المباشر وحساب نسبة الدقة تلقائياً')}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select value={trialPatientId} onChange={(e) => setTrialPatientId(e.target.value)} className="bg-slate-50/80 border border-purple-100/60 text-slate-800 text-xs font-bold rounded-xl px-3 py-2">
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>

                  <select value={trialGoalId} onChange={(e) => setTrialGoalId(e.target.value)} className="bg-slate-50/80 border border-purple-100/60 text-slate-800 text-xs font-bold rounded-xl px-3 py-2">
                    {goals.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                  </select>

                  <div className="px-3 py-1.5 bg-slate-50/80 border border-purple-100/60 rounded-xl text-xs font-bold text-slate-300">
                    Trials: <strong className="text-[#1E1B4B]">{totalTrialsCount}</strong>
                  </div>
                  <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-black">
                    Accuracy: {trialAccuracyPct}%
                  </div>
                </div>
              </div>

              {/* 4 Interactive Buttons with Keyboard Bindings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => addTrialEntry('correct')} className="p-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-black shadow-lg shadow-emerald-600/25 transition-all flex flex-col items-center justify-center gap-2 group">
                  <span className="text-3xl font-bold">+</span>
                  <span className="text-base uppercase tracking-wider">Correct</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Shortcut: [+] or [C]</span>
                </button>

                <button onClick={() => addTrialEntry('incorrect')} className="p-6 bg-rose-600 hover:bg-rose-500 text-white rounded-3xl font-black shadow-lg shadow-rose-600/25 transition-all flex flex-col items-center justify-center gap-2 group">
                  <span className="text-3xl font-bold">-</span>
                  <span className="text-base uppercase tracking-wider">Incorrect</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Shortcut: [-] or [I]</span>
                </button>

                <button onClick={() => addTrialEntry('prompted')} className="p-6 bg-amber-500 hover:bg-amber-400 text-white rounded-3xl font-black shadow-lg shadow-amber-500/25 transition-all flex flex-col items-center justify-center gap-2 group">
                  <span className="text-3xl font-bold">P</span>
                  <span className="text-base uppercase tracking-wider">Prompted</span>
                  <span className="text-[10px] font-mono opacity-80 group-hover:opacity-100">Shortcut: [P]</span>
                </button>

                <button onClick={() => addTrialEntry('no-response')} className="p-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-3xl font-black shadow-sm border border-slate-200 transition-all flex flex-col items-center justify-center gap-2 group">
                  <span className="text-3xl font-bold">N</span>
                  <span className="text-base uppercase tracking-wider">No Response</span>
                  <span className="text-[10px] font-mono text-slate-500">Shortcut: [N]</span>
                </button>
              </div>

              {/* Tape Stream */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider">Live Trial Tape Stream</h4>
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50/80 border border-purple-100/60 rounded-2xl min-h-[60px] items-center">
                  {trialTape.length === 0 && <span className="text-xs text-slate-500 italic">No trials logged yet. Click buttons above or press keys.</span>}
                  {trialTape.map((entry) => (
                    <span key={entry.id} className={`px-3 py-1 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 ${
                      entry.result === 'correct' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      entry.result === 'incorrect' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      entry.result === 'prompted' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-100 text-slate-700 border border-slate-700'
                    }`}>
                      <span>{entry.result}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{entry.timestamp}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 9: TREATMENT PLAN BUILDER                                 */}
          {/* ================================================================ */}
          {activeTab === 'treatment-plans' && (
            <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('Treatment Plan Builder', 'مُصمم خطة العلاج الفردية')}</h3>
                  <p className="text-xs text-slate-400">{t('Nested Long-Term & Short-Term Objectives with PDF export', 'الأهداف طويلة وقصيرة المدى وتصدير ملف PDF')}</p>
                </div>
                
                <div className="flex gap-2">
                  <select value={tpPatientId} onChange={(e) => setTpPatientId(e.target.value)} className="bg-slate-50/80 border border-purple-100/60 text-slate-800 text-xs font-bold rounded-xl px-3 py-2">
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>

                  <button onClick={() => window.print()} className="px-4 py-2 bg-purple-600 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-1.5">
                    <Printer className="w-4 h-4" />
                    <span>{t('Export Treatment Plan PDF', 'تصدير التقرير PDF')}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border border-purple-100/60 rounded-2xl grid md:grid-cols-4 gap-4 text-xs font-semibold">
                <div><span className="text-slate-500 block font-bold">Patient:</span><span className="text-white font-bold">{patients.find(p => p.id === tpPatientId)?.name || 'Liam Miller'}</span></div>
                <div><span className="text-slate-500 block font-bold">Therapist:</span><span className="text-white font-bold">Dr. Mariam Raghep (SLP)</span></div>
                <div><span className="text-slate-500 block font-bold">Frequency:</span><span className="text-white font-bold">{tpFrequency}</span></div>
                <div><span className="text-slate-500 block font-bold">Plan Period:</span><span className="text-white font-bold">{tpPeriodStart} – {tpPeriodEnd}</span></div>
              </div>

              {/* Dynamic Goals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-[#1E1B4B]">Long-Term Goals & Objectives</h4>
                  <button
                    onClick={() => {
                      const newLtg: LongTermGoalItem = {
                        id: `ltg-${Date.now()}`,
                        title: `Long-Term Goal #${tpGoals.length + 1}: Target Skill`,
                        domain: 'Speech',
                        targetDate: 'Mar 2027',
                        objectives: [
                          { id: `stg-${Date.now()}`, description: 'STG Objective 1.1: Clinical trial target', targetDate: 'Nov 2026', criteria: '80% accuracy', status: 'in-progress' }
                        ]
                      };
                      setTpGoals([...tpGoals, newLtg]);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Goal</span>
                  </button>
                </div>

                {tpGoals.map((ltg, idx) => (
                  <div key={ltg.id} className="bg-slate-50/80 border border-purple-100/60 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-purple-400">{ltg.title}</h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const copy = [...tpGoals];
                            copy[idx].objectives.push({
                              id: `stg-${Date.now()}`,
                              description: `STG ${idx + 1}.${copy[idx].objectives.length + 1}: New target objective`,
                              targetDate: 'Dec 2026',
                              criteria: '85% mastery',
                              status: 'in-progress'
                            });
                            setTpGoals(copy);
                          }}
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-[#7C3AED] rounded-lg text-[10px] font-bold border border-purple-200 transition-colors"
                        >
                          + Add Objective
                        </button>
                        <button onClick={() => setTpGoals(tpGoals.filter(g => g.id !== ltg.id))} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="pl-4 space-y-2 border-l-2 border-purple-500/40 rtl:border-r-2 rtl:border-l-0">
                      {ltg.objectives.map((stg, objIdx) => (
                        <div key={stg.id} className="bg-white border border-purple-100/80 shadow-sm p-3 rounded-xl text-xs flex justify-between items-center">
                          <span className="text-slate-700 font-semibold">{stg.description}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-black uppercase text-[10px]">{stg.status}</span>
                            <button onClick={() => {
                              const copy = [...tpGoals];
                              copy[idx].objectives = copy[idx].objectives.filter(o => o.id !== stg.id);
                              setTpGoals(copy);
                            }} className="text-slate-500 hover:text-red-400"><X className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 10: PATIENT INTAKE WIZARD                                 */}
          {/* ================================================================ */}
          {activeTab === 'intake-forms' && (
            <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="border-b border-purple-100 pb-4 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-[#1E1B4B]">{t('Patient Intake Wizard (5 Steps)', 'معالج استقبال المرضى والتشخيص الرقمي')}</h3>
                  <p className="text-xs text-slate-400">{t('Standardized consent & background intake pipeline', 'نماذج الاستقبال المعتمدة والموافقة الطبية')}</p>
                </div>

                <div className="flex items-center justify-between max-w-2xl mx-auto pt-2">
                  {[1, 2, 3, 4, 5].map((stepNum) => (
                    <div key={stepNum} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                        intakeStep === stepNum ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' :
                        intakeStep > stepNum ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}>
                        {intakeStep > stepNum ? '✓' : stepNum}
                      </div>
                      {stepNum < 5 && <div className="h-0.5 w-8 bg-purple-100 hidden sm:block" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-xl mx-auto space-y-4 text-xs font-semibold">
                {intakeStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="text-base font-black text-[#1E1B4B]">Step 1: Child Demographics</h4>
                    <div>
                      <label className="block text-slate-400 mb-1">Child Full Name *</label>
                      <input type="text" value={intakeChildName} onChange={(e) => setIntakeChildName(e.target.value)} placeholder="Oliver Taylor" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Date of Birth *</label>
                      <input type="date" value={intakeDob} onChange={(e) => setIntakeDob(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                    </div>
                  </div>
                )}

                {intakeStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="text-base font-black text-[#1E1B4B]">Step 2: Guardian Contacts</h4>
                    <div>
                      <label className="block text-slate-400 mb-1">Guardian Full Name *</label>
                      <input type="text" value={intakeGuardianName} onChange={(e) => setIntakeGuardianName(e.target.value)} placeholder="Sarah Taylor" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Guardian Email *</label>
                      <input type="email" value={intakeGuardianEmail} onChange={(e) => setIntakeGuardianEmail(e.target.value)} placeholder="sarah@example.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                    </div>
                  </div>
                )}

                {intakeStep === 3 && (
                  <div className="space-y-3">
                    <h4 className="text-base font-black text-[#1E1B4B]">Step 3: Medical History</h4>
                    <div>
                      <label className="block text-slate-400 mb-1">Medical Background / Prior Therapy History:</label>
                      <textarea rows={3} value={intakeMedicalHistory} onChange={(e) => setIntakeMedicalHistory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                    </div>
                  </div>
                )}

                {intakeStep === 4 && (
                  <div className="space-y-3">
                    <h4 className="text-base font-black text-[#1E1B4B]">Step 4: Services Requested</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Speech-Language Therapy', 'Occupational Therapy (OT)', 'Behavior Analysis (ABA)', 'Physical Therapy (PT)'].map(srv => (
                        <button key={srv} type="button" onClick={() => setIntakeServices(intakeServices.includes(srv) ? intakeServices.filter(s => s !== srv) : [...intakeServices, srv])} className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          intakeServices.includes(srv) ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {intakeStep === 5 && (
                  <div className="space-y-3">
                    <h4 className="text-base font-black text-[#1E1B4B]">Step 5: Insurance & Consent</h4>
                    <div className="p-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-2xl text-xs">
                      ✓ Clinical Consent & HIPAA Data Disclosure Verified.
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button disabled={intakeStep === 1} onClick={() => setIntakeStep(intakeStep - 1)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold disabled:opacity-40">Previous</button>
                  {intakeStep < 5 ? (
                    <button onClick={() => setIntakeStep(intakeStep + 1)} className="px-5 py-2 bg-purple-600 text-white rounded-xl font-black shadow-lg shadow-purple-600/25">Next Step</button>
                  ) : (
                    <button onClick={handleCompleteIntake} className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-black shadow-lg shadow-emerald-600/25">Complete Intake</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 11: WAITLIST MANAGER                                      */}
          {/* ================================================================ */}
          {activeTab === 'waitlist' && (
            <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-xl font-black text-[#1E1B4B]">{t('Waitlist Management Queue', 'قائمة انتظار المرضى')}</h3>
                <button onClick={() => setShowAddWaitlistModal(true)} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>{t('Add to Waitlist', 'إضافة لقائمة الانتظار')}</span>
                </button>
              </div>

              <div className="space-y-3">
                {waitlist.map((w) => (
                  <div key={w.id} className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-4 flex items-center justify-between hover:border-purple-300 transition-all">
                    <div>
                      <h4 className="text-sm font-black text-[#1E1B4B]">{w.patientName} ({w.age} yrs)</h4>
                      <p className="text-xs text-slate-400">Requested: {w.requestedService} • Phone: {w.contactNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-black uppercase">Priority: {w.priority}</span>
                      <button onClick={() => setWaitlist(waitlist.filter(item => item.id !== w.id))} className="text-slate-500 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 12: AI ANALYTICS                                          */}
          {/* ================================================================ */}
          {activeTab === 'analytics-ai' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-[#1E1B4B] flex items-center gap-2">
                      <Brain className="w-6 h-6 text-purple-400" />
                      <span>{t('AI Clinical Progress Generator', 'مُنّشئ التقارير التراكمية بالذكاء الاصطناعي')}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{t('Synthesizes SOAP notes, home submissions & IEP target velocity', 'تجميع وتلخيص بيانات الجلسات والتمارين في تقرير شامل')}</p>
                  </div>

                  <button onClick={handleGenerateAiReport} disabled={aiGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{aiGenerating ? t('Generating Report...', 'جاري الإنشاء...') : t('Run AI Analysis', 'تشغيل التحليل الذكي')}</span>
                  </button>
                </div>

                {aiReportGenerated && (
                  <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-6 space-y-4 animate-fade-in shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-black text-purple-400 uppercase tracking-wider">✓ AI SYNTHESIZED CLINICAL SUMMARY</span>
                      <span className="text-[10px] text-slate-500">Generated Today at {new Date().toLocaleTimeString()}</span>
                    </div>

                    <div className="space-y-3 text-xs text-slate-700">
                      <p className="leading-relaxed">
                        <strong className="text-[#1E1B4B]">Overall Trajectory:</strong> Patient Liam Miller shows a +14% improvement in Expressive Vocabulary (Goal g1). Spontaneous 3-word phrase production increased during home dinner routines.
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#1E1B4B]">Clinical Recommendation:</strong> Progress target g1 from emerging to intermediate level. Introduce 4-word functional phrases with visual token rewards.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 13: BILLING & SUPERBILLS                                  */}
          {/* ================================================================ */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between bg-white border border-purple-100/80 shadow-sm p-4 rounded-2xl">
                <div>
                  <h3 className="text-lg font-black text-[#1E1B4B]">{t('Insurance Billing & Superbill Claims', 'سجل الفواتير والمطالبات التأمينية')}</h3>
                  <p className="text-xs text-slate-400">{t('Track CPT code billing status and export superbills', 'متابعة المطالبات البرمجية وتصدير الفواتير المعتمده')}</p>
                </div>
              </div>

              <div className="bg-white border border-purple-100/80 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-4">{t('Invoice #', 'رقم الفاتورة')}</th>
                      <th className="p-4">{t('Patient', 'المريض')}</th>
                      <th className="p-4">{t('CPT Code', 'كود CPT')}</th>
                      <th className="p-4">{t('Amount', 'المبلغ')}</th>
                      <th className="p-4">{t('Status', 'الحالة')}</th>
                      <th className="p-4">{t('Action', 'الإجراء')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-purple-50/40 transition-colors">
                        <td className="p-4 font-black text-purple-300">{inv.invoiceNumber}</td>
                        <td className="p-4 font-bold text-[#1E1B4B]">{inv.patientName}</td>
                        <td className="p-4 text-slate-400">{inv.cptCode}</td>
                        <td className="p-4 font-black text-slate-900">${inv.amount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button onClick={() => { setSelectedInvoiceForSuperbill(inv); setShowSuperbillModal(true); }} className="px-3 py-1 bg-purple-50 hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white border border-purple-200 rounded-xl text-[11px] font-black transition-all cursor-pointer">
                            {t('Export Superbill', 'تصدير المطالبة Superbill')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 14: STAFF & SUITE SETTINGS                                */}
          {/* ================================================================ */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-[#1E1B4B]">{t('Suite Staff Directory & Permissions', 'فريق العمل والاعتمادات والصلحيات')}</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {staff.map((st) => (
                    <div key={st.id} className="bg-slate-50/70 border border-purple-100/60 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
                        <div>
                          <h4 className="text-sm font-black text-[#1E1B4B]">{lang === 'ar' ? st.nameAr : st.name}</h4>
                          <p className="text-[10px] text-purple-400 font-bold">{lang === 'ar' ? st.specialtyAr : st.specialty}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Role: <strong className="text-white capitalize">{st.role}</strong></span>
                        <span className="text-emerald-400 font-bold">• Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* PERSISTENT FLOATING SESSION TIMER WIDGET */}
      <ProSessionTimer />

      {/* =================================================================== */}
      {/* MODAL 1: ADD PATIENT MODAL                                          */}
      {/* =================================================================== */}
      {showAddPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-md w-full space-y-4 animate-fade-in text-[#1E1B4B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#1E1B4B]">{t('Add Child Patient Profile', 'إضافة مريض جديد')}</h3>
              <button onClick={() => setShowAddPatientModal(false)} className="text-slate-500 hover:text-[#7C3AED]"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddPatientSubmit} className="space-y-3 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">First Name *</label>
                  <input type="text" required value={newPFirstName} onChange={(e) => setNewPFirstName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Last Name *</label>
                  <input type="text" required value={newPLastName} onChange={(e) => setNewPLastName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Primary Diagnosis</label>
                <input type="text" value={newPDiagnosis} onChange={(e) => setNewPDiagnosis(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Guardian Name</label>
                  <input type="text" value={newPGuardianName} onChange={(e) => setNewPGuardianName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Guardian Phone</label>
                  <input type="text" value={newPGuardianPhone} onChange={(e) => setNewPGuardianPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowAddPatientModal(false)} className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl font-black shadow-brand-button cursor-pointer">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 2: SCHEDULE APPOINTMENT MODAL                                 */}
      {/* =================================================================== */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-md w-full space-y-4 animate-fade-in text-[#1E1B4B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#1E1B4B]">{t('Schedule Appointment', 'حجز موعد جديد')}</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-500 hover:text-[#7C3AED]"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">Select Patient</label>
                <select value={aptPatientId} onChange={(e) => setAptPatientId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none">
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input type="date" value={aptDate} onChange={(e) => setAptDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Time</label>
                  <input type="text" value={aptTime} onChange={(e) => setAptTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl font-black shadow-brand-button cursor-pointer">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 3: ADD GOAL TEMPLATE MODAL                                    */}
      {/* =================================================================== */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-md w-full space-y-4 animate-fade-in text-[#1E1B4B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#1E1B4B]">{t('Add Goal Template', 'إضافة قالب هدف جديد')}</h3>
              <button onClick={() => setShowAddGoalModal(false)} className="text-slate-500 hover:text-[#7C3AED]"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddGoalSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">Domain</label>
                <select value={newGDomain} onChange={(e) => setNewGDomain(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 uppercase focus:bg-white focus:border-[#7C3AED] outline-none">
                  <option value="speech">Speech</option>
                  <option value="motor">Motor</option>
                  <option value="cognitive">Cognitive</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="social-emotional">Social-Emotional</option>
                  <option value="academics">Academics</option>
                  <option value="executive">Executive</option>
                  <option value="physical">Physical</option>
                  <option value="daily-living">Daily Living</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Goal Title *</label>
                <input type="text" required value={newGTitle} onChange={(e) => setNewGTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Criteria</label>
                <input type="text" value={newGCriteria} onChange={(e) => setNewGCriteria(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowAddGoalModal(false)} className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl font-black shadow-brand-button cursor-pointer">Save Template</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 4: ADD WAITLIST MODAL                                         */}
      {/* =================================================================== */}
      {showAddWaitlistModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-md w-full space-y-4 animate-fade-in text-[#1E1B4B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#1E1B4B]">{t('Add to Waitlist Queue', 'إضافة لقائمة الانتظار')}</h3>
              <button onClick={() => setShowAddWaitlistModal(false)} className="text-slate-500 hover:text-[#7C3AED]"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddWaitlistSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">Patient Name *</label>
                <input type="text" required value={newWName} onChange={(e) => setNewWName(e.target.value)} placeholder="Child Name" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Age</label>
                  <input type="number" value={newWAge} onChange={(e) => setNewWAge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Priority</label>
                  <select value={newWPriority} onChange={(e) => setNewWPriority(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 uppercase focus:bg-white focus:border-[#7C3AED] outline-none">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Requested Service</label>
                <input type="text" value={newWService} onChange={(e) => setNewWService(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:bg-white focus:border-[#7C3AED] outline-none" />
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setShowAddWaitlistModal(false)} className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-xl font-black shadow-brand-button cursor-pointer">Add to Waitlist</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 5: SUPERBILL EXPORT MODAL                                     */}
      {/* =================================================================== */}
      {showSuperbillModal && selectedInvoiceForSuperbill && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 max-w-lg w-full space-y-4 animate-fade-in text-[#1E1B4B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#1E1B4B]">Clinical Superbill Claim Document</h3>
              <button onClick={() => setShowSuperbillModal(false)} className="text-slate-500 hover:text-[#7C3AED]"><X className="w-5 h-5" /></button>
            </div>

            <div className="bg-slate-50/80 border border-purple-100/60 p-4 rounded-2xl space-y-3 text-xs">
              <div className="flex justify-between border-b border-purple-100 pb-2">
                <span className="font-bold text-purple-400">Invoice: {selectedInvoiceForSuperbill.invoiceNumber}</span>
                <span className="text-slate-400">Date: {selectedInvoiceForSuperbill.date}</span>
              </div>
              <p><strong>Patient:</strong> {selectedInvoiceForSuperbill.patientName}</p>
              <p><strong>CPT Code:</strong> {selectedInvoiceForSuperbill.cptCode}</p>
              <p><strong>Description:</strong> {selectedInvoiceForSuperbill.description}</p>
              <p><strong>Total Amount:</strong> ${selectedInvoiceForSuperbill.amount}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowSuperbillModal(false)} className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer">Close</button>
              <button onClick={() => window.print()} className="w-1/2 py-2.5 bg-purple-600 text-white font-black rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5">
                <Printer className="w-4 h-4" />
                <span>Print Superbill</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
