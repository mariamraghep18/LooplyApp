/**
 * ProData.ts — LooplyPro Data Layer
 *
 * This file is the Data layer of the LooplyPro XML System.
 * All types/interfaces are imported from ProSchema.ts (the Data Model),
 * which is the single authoritative source of truth for data structure.
 *
 * Architecture:
 *   LooplyPro XML System
 *   ├── ProSchema.ts  ← Data Model  (all interfaces — source of truth)
 *   └── ProData.ts    ← Data        (this file — seed data + re-exports)
 *
 * Types are re-exported from this file so all existing component imports
 * (e.g. `import { Patient } from './ProData'`) continue to work
 * without any changes.
 */

// ── Data Model import & re-export (preserves all existing consumer imports) ──
export type {
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
} from './ProSchema';

// ── Direct imports needed to type the seed-data arrays below ─────────────────
import type {
  Patient,
  IepGoal,
  AppointedSession,
  HomeSubmission,
  StaffMember,
  BillingInvoice,
  SoapNote,
  WaitlistEntry,
} from './ProSchema';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Liam Miller",
    nameAr: "ليام ميلر",
    age: 5,
    gender: "M",
    avatar: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150",
    diagnoses: ["Autism Spectrum (Level 1)", "Speech Delay"],
    diagnosesAr: ["طيف التوحد (المستوى 1)", "تأخر في النطق"],
    iepProgress: 72,
    primarySpecialist: "Dr. Mariam Raghep (SLP)",
    gradeOrGroup: "Kindergarten A",
    lastSession: "2026-08-22",
    nextSession: "Today, 10:30 AM",
    status: "active",
    dob: "2019-04-12",
    guardianName: "Rachel Miller",
    guardianPhone: "(555) 234-5678",
    school: "Lincoln Elementary",
    grade: "Kindergarten"
  },
  {
    id: "p2",
    name: "Sofia Al-Mansoor",
    nameAr: "صوفيا المنصور",
    age: 7,
    gender: "F",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    diagnoses: ["Sensory Processing Disorder", "ADHD"],
    diagnosesAr: ["اضطراب المعالجة الحسية", "فرط الحركة ونقص الانتباه"],
    iepProgress: 64,
    primarySpecialist: "Sarah Jenkins (OTR/L)",
    gradeOrGroup: "Grade 2 Integration",
    lastSession: "2026-08-21",
    nextSession: "Today, 02:00 PM",
    status: "active",
    dob: "2017-09-25",
    guardianName: "Mona Al-Mansoor",
    guardianPhone: "(555) 876-5432",
    school: "Oakridge Academy",
    grade: "2nd Grade"
  },
  {
    id: "p3",
    name: "Youssef Hassan",
    nameAr: "يوسف حسن",
    age: 8,
    gender: "M",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    diagnoses: ["Behavioral Challenges", "Social Communication"],
    diagnosesAr: ["تحديات سلوكية", "التواصل الاجتماعي"],
    iepProgress: 90,
    primarySpecialist: "Omar Farooq (BCBA)",
    gradeOrGroup: "Grade 3 Resource",
    lastSession: "2026-08-20",
    nextSession: "Today, 03:30 PM",
    status: "active",
    dob: "2016-01-15",
    guardianName: "Tariq Hassan",
    guardianPhone: "(555) 345-6789",
    school: "Westside Prep",
    grade: "3rd Grade"
  },
  {
    id: "p4",
    name: "Emma Watson",
    nameAr: "إيما واتسون",
    age: 6,
    gender: "F",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    diagnoses: ["Dyspraxia", "Speech Articulation"],
    diagnosesAr: ["عسر التنسيق الحركي", "مخارج الحروف"],
    iepProgress: 85,
    primarySpecialist: "Dr. Mariam Raghep (SLP)",
    gradeOrGroup: "Grade 1 - Early Learning",
    lastSession: "2026-08-18",
    nextSession: "Aug 24, 09:00 AM",
    status: "active",
    dob: "2018-11-03",
    guardianName: "David Watson",
    guardianPhone: "(555) 987-6543",
    school: "St. Jude Early Learning",
    grade: "1st Grade"
  }
];

export const INITIAL_IEP_GOALS: IepGoal[] = [
  {
    id: "g1",
    title: "Expressive Vocabulary Expansion",
    titleAr: "توسيع الحصيلة اللغوية التعبيرية",
    domain: "speech",
    domainLabelEn: "Speech & Language",
    domainLabelAr: "النطق والتخاطب",
    description: "Student will produce 3-word functional phrases in 8 out of 10 opportunities during structured play.",
    descriptionAr: "سينتج الطالب عبارات وظيفية من 3 كلمات في 8 من 10 محاولات أثناء اللعب الموجه.",
    difficulty: "intermediate",
    ageRange: "4-8 yrs",
    targetCriteria: "80% accuracy over 3 consecutive sessions",
    measurementType: "percentage",
    exampleTrials: "10 trials per session using picture cards."
  },
  {
    id: "g2",
    title: "Tripod Pencil Grip & Line Control",
    titleAr: "المسكة الثلاثية للقلم والتحكم بالخطوط",
    domain: "motor",
    domainLabelEn: "Motor Skills",
    domainLabelAr: "العلاج الوظائفي والحركي",
    description: "Demonstrates functional dynamic tripod grip while tracing pre-writing shapes for 5 minutes without fatigue.",
    descriptionAr: "يظهر مسكة ثلاثية ديناميكية أثناء تتبع الأشكال قبل الكتابة لمدة 5 دقائق دون إجهاد.",
    difficulty: "emerging",
    ageRange: "5-9 yrs",
    targetCriteria: "5 mins sustained grip with 90% path accuracy",
    measurementType: "duration",
    exampleTrials: "Pre-writing shape maze worksheets."
  },
  {
    id: "g3",
    title: "Visual Problem Solving & Sequencing",
    titleAr: "حل المشكلات البصرية وتسلسل الأحداث",
    domain: "cognitive",
    domainLabelEn: "Cognitive",
    domainLabelAr: "المهارات الإدراكية والتنفيذية",
    description: "Correctly orders 4-step picture story cards and explains the logical sequence using transition words.",
    descriptionAr: "يرتب بطاقات القصة البصرية من 4 خطوات بشكل صحيح ويوضح التسلسل المنطقي.",
    difficulty: "intermediate",
    ageRange: "6-10 yrs",
    targetCriteria: "4/5 trials correct without prompt",
    measurementType: "frequency",
    exampleTrials: "4-step picture story cards."
  },
  {
    id: "g4",
    title: "Self-Regulation via Emotion Cards",
    titleAr: "التنظيم الذاتي باستخدام بطاقات المشاعر",
    domain: "behavioral",
    domainLabelEn: "Behavioral & Social",
    domainLabelAr: "السلوك والمهارات الاجتماعية",
    description: "Uses sensory break visual card when feeling overwhelmed instead of vocal frustration in 90% of instances.",
    descriptionAr: "يستخدم بطاقة الاستراحة الحسية عند الشعور بالانزعاج بدلاً من الصراخ بنسبة 90٪.",
    difficulty: "advanced",
    ageRange: "5-12 yrs",
    targetCriteria: "90% independence rate in classroom",
    measurementType: "percentage",
    exampleTrials: "Visual card exchange during sensory overload."
  }
];

export const INITIAL_SESSIONS: AppointedSession[] = [
  {
    id: "ap1",
    patientId: "p1",
    patientName: "Liam Miller",
    therapistName: "Dr. Mariam Raghep",
    serviceType: "Speech & AAC Intervention",
    serviceTypeAr: "جلسة تخاطب واستخدام أجهزة AAC",
    date: "2026-08-28",
    time: "10:30 AM - 11:15 AM",
    durationMins: 45,
    room: "Room 204 (Speech Suite)",
    status: "in-progress",
    type: "individual",
    recurrence: "weekly"
  },
  {
    id: "ap2",
    patientId: "p2",
    patientName: "Sofia Al-Mansoor",
    therapistName: "Sarah Jenkins",
    serviceType: "Sensory Integration Therapy",
    serviceTypeAr: "جلسة تكامل حسي وعلاج وظائفي",
    date: "2026-08-28",
    time: "02:00 PM - 02:45 PM",
    durationMins: 45,
    room: "Sensory Gym B",
    status: "scheduled",
    type: "individual",
    recurrence: "weekly"
  },
  {
    id: "ap3",
    patientId: "p3",
    patientName: "Youssef Hassan",
    therapistName: "Omar Farooq",
    serviceType: "Behavior Analysis (ABA)",
    serviceTypeAr: "جلسة تعديل سلوك وتحليل تطبيقي",
    date: "2026-08-28",
    time: "03:30 PM - 04:30 PM",
    durationMins: 60,
    room: "Behavioral Room 101",
    status: "scheduled",
    type: "assessment",
    recurrence: "bi-weekly"
  }
];

export const INITIAL_HOME_SUBMISSIONS: HomeSubmission[] = [
  {
    id: "hs1",
    patientId: "p1",
    patientName: "Liam Miller",
    activityTitle: "3-Word Sentence Cards at Dinner",
    activityTitleAr: "تطبيق بطاقات الجمل الثلاثية على طعام العشاء",
    submittedBy: "Parent (Rachel Miller)",
    date: "Today, 08:15 AM",
    notes: 'Liam requested "want more juice" twice without prompting! Video attached.',
    mediaType: "video",
    status: "pending",
    tokensEarned: 15
  },
  {
    id: "hs2",
    patientId: "p2",
    patientName: "Sofia Al-Mansoor",
    activityTitle: "Playdough Pinch & Roll Exercise",
    activityTitleAr: "تمرين الضغط والتشكيل بالصلصال",
    submittedBy: "Parent (Mona Al-Mansoor)",
    date: "Yesterday, 07:30 PM",
    notes: "Sofia completed 10 minutes of dough pinching before bed.",
    mediaType: "photo",
    status: "pending",
    tokensEarned: 10
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "tm1",
    name: "Dr. Mariam Raghep",
    nameAr: "د. مريم راغب",
    email: "mariamraghep18@gmail.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    role: "admin",
    roleAr: "مدير سريري ومطور",
    specialty: "Lead Speech Pathologist (SLP-CCC)",
    specialtyAr: "كبير أخصائيي النطق والتخاطب",
    caseload: 18,
    activeToday: true,
    permissions: ["full_access", "billing_admin", "soap_approval"]
  },
  {
    id: "tm2",
    name: "Sarah Jenkins",
    nameAr: "سارة جينكينز",
    email: "sarah.j@looplypro.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    role: "therapist",
    roleAr: "أخصائي أول علاج وظائفي",
    specialty: "Occupational Therapist (OTR/L)",
    specialtyAr: "أخصائي علاج وظائفي ومسارات حسية",
    caseload: 14,
    activeToday: true,
    permissions: ["soap_entry", "iep_edit"]
  },
  {
    id: "tm3",
    name: "Omar Farooq",
    nameAr: "عمر فاروق",
    email: "omar.f@looplypro.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    role: "therapist",
    roleAr: "محلل سلوكي مالي (BCBA)",
    specialty: "Board Certified Behavior Analyst",
    specialtyAr: "محلل سلوك معتمد (BCBA)",
    caseload: 11,
    activeToday: false,
    permissions: ["aba_logger", "soap_entry"]
  }
];

export const INITIAL_INVOICES: BillingInvoice[] = [
  {
    id: "inv-101",
    invoiceNumber: "INV-2026-089",
    patientName: "Liam Miller",
    cptCode: "CPT-92507 (Speech Tx)",
    description: "Individual Speech-Language Therapy (4 Sessions)",
    amount: 520,
    date: "2026-08-15",
    dueDate: "2026-08-30",
    status: "paid"
  },
  {
    id: "inv-102",
    invoiceNumber: "INV-2026-090",
    patientName: "Sofia Al-Mansoor",
    cptCode: "CPT-97530 (OT Tx)",
    description: "Occupational Therapy & Sensory Integration",
    amount: 480,
    date: "2026-08-18",
    dueDate: "2026-09-02",
    status: "pending-claim"
  },
  {
    id: "inv-103",
    invoiceNumber: "INV-2026-091",
    patientName: "Youssef Hassan",
    cptCode: "CPT-97153 (ABA Tx)",
    description: "Adaptive Behavior Treatment & Social Skills",
    amount: 650,
    date: "2026-08-20",
    dueDate: "2026-09-05",
    status: "draft"
  }
];

export const INITIAL_SOAP_NOTES: SoapNote[] = [
  {
    id: "sn-1",
    patientId: "p1",
    patientName: "Liam Miller",
    date: "2026-08-22",
    therapistName: "Dr. Mariam Raghep",
    subjective: "Client arrived in good spirits. Mother reported Liam used 3-word phrase at breakfast.",
    objective: "Engaged in 45-minute Speech & AAC session. Produced 12 spontaneous 3-word functional requests.",
    assessment: "Expressive vocabulary goal g1 is at 72% mastery (+10% increase from baseline).",
    plan: "Continue 3-word sentence expansion with sensory reward cards in next session.",
    cptCode: "CPT-92507",
    durationMins: 45
  },
  {
    id: "sn-2",
    patientId: "p2",
    patientName: "Sofia Al-Mansoor",
    date: "2026-08-21",
    therapistName: "Sarah Jenkins",
    subjective: "Sofia showed mild sensory overload upon entering sensory gym.",
    objective: "Used deep pressure weighted blanket for 5 mins prior to fine motor tripod grip tracing.",
    assessment: "Sensory regulation goal g4 achieved 80% self-initiated break card usage.",
    plan: "Integrate tactile dough exercises at start of next OT session.",
    cptCode: "CPT-97530",
    durationMins: 45
  }
];

export const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: "w1",
    patientName: "Lucas Vance",
    age: 4,
    requestedService: "Speech-Language Evaluation",
    priority: "high",
    addedDate: "2026-08-15",
    contactNumber: "(555) 777-8899"
  },
  {
    id: "w2",
    patientName: "Maya Lin",
    age: 6,
    requestedService: "Sensory OT Assessment",
    priority: "medium",
    addedDate: "2026-08-18",
    contactNumber: "(555) 444-3322"
  }
];
