/**
 * NovaData.ts — NovaCRM Data Layer
 *
 * This file is the Data layer of the NovaCRM XML System.
 * All types/interfaces are imported from NovaSchema.ts (the Data Model),
 * which is the single authoritative source of truth for data structure.
 *
 * Architecture:
 *   NovaCRM XML System
 *   ├── NovaSchema.ts  ← Data Model  (all interfaces — source of truth)
 *   └── NovaData.ts    ← Data        (this file — seed data + re-exports)
 *
 * Types are re-exported from this file so all existing component imports
 * (e.g. `import { PatientRecord } from './NovaData'`) continue to work
 * without any changes.
 */

// ── Data Model import & re-export (preserves all existing consumer imports) ──
export type {
  PatientRecord,
  Appointment,
  GoalTemplate,
  HomeExercise,
  TreatmentObjective,
  LongTermGoal,
  TreatmentPlan,
  TrialTapeEntry,
  IntakeSubmission,
  WaitlistEntry,
  TeamMember,
} from './NovaSchema';

// ── Direct imports needed to type the seed-data arrays below ─────────────────
import type {
  PatientRecord,
  Appointment,
  GoalTemplate,
  WaitlistEntry,
  TeamMember,
} from './NovaSchema';

export const INITIAL_NOVA_PATIENTS: PatientRecord[] = [
  {
    id: "p-101",
    firstName: "Liam",
    lastName: "Miller",
    dob: "2019-04-12",
    age: 5,
    gender: "Male",
    status: "Active",
    primaryDiagnosis: "Autism Spectrum Disorder, Level 1",
    guardianName: "Rachel Miller",
    guardianPhone: "(555) 234-5678",
    school: "Lincoln Elementary",
    grade: "Kindergarten",
    avatar: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=150",
    therapistAssigned: "Dr. Mariam Raghep (SLP)",
    lastSessionDate: "2026-08-22",
    iepCompletionPct: 75
  },
  {
    id: "p-102",
    firstName: "Sofia",
    lastName: "Al-Mansoor",
    dob: "2017-09-25",
    age: 7,
    gender: "Female",
    status: "Active",
    primaryDiagnosis: "Sensory Processing Disorder & ADHD",
    guardianName: "Mona Al-Mansoor",
    guardianPhone: "(555) 876-5432",
    school: "Oakridge Academy",
    grade: "2nd Grade",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    therapistAssigned: "Sarah Jenkins (OTR/L)",
    lastSessionDate: "2026-08-21",
    iepCompletionPct: 62
  },
  {
    id: "p-103",
    firstName: "Youssef",
    lastName: "Hassan",
    dob: "2016-01-15",
    age: 8,
    gender: "Male",
    status: "Active",
    primaryDiagnosis: "Receptive-Expressive Language Delay",
    guardianName: "Tariq Hassan",
    guardianPhone: "(555) 345-6789",
    school: "Westside Prep",
    grade: "3rd Grade",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    therapistAssigned: "Omar Farooq (BCBA)",
    lastSessionDate: "2026-08-20",
    iepCompletionPct: 88
  },
  {
    id: "p-104",
    firstName: "Emma",
    lastName: "Watson",
    dob: "2018-11-03",
    age: 6,
    gender: "Female",
    status: "Active",
    primaryDiagnosis: "Developmental Coordination Disorder (Dyspraxia)",
    guardianName: "David Watson",
    guardianPhone: "(555) 987-6543",
    school: "St. Jude Early Learning",
    grade: "1st Grade",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    therapistAssigned: "Dr. Mariam Raghep (SLP)",
    lastSessionDate: "2026-08-18",
    iepCompletionPct: 82
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    patientId: "p-101",
    patientName: "Liam Miller",
    date: "2026-08-28",
    time: "09:00 AM",
    durationMins: 45,
    type: "Individual",
    location: "Room 104 (Speech Suite)",
    recurrence: "Weekly",
    therapistName: "Dr. Mariam Raghep",
    status: "Confirmed"
  },
  {
    id: "apt-2",
    patientId: "p-102",
    patientName: "Sofia Al-Mansoor",
    date: "2026-08-28",
    time: "10:30 AM",
    durationMins: 45,
    type: "Individual",
    location: "Sensory Gym B",
    recurrence: "Weekly",
    therapistName: "Sarah Jenkins",
    status: "Confirmed"
  },
  {
    id: "apt-3",
    patientId: "p-103",
    patientName: "Youssef Hassan",
    date: "2026-08-28",
    time: "01:30 PM",
    durationMins: 60,
    type: "Assessment",
    location: "Behavioral Room 201",
    recurrence: "Bi-Weekly",
    therapistName: "Omar Farooq",
    status: "Confirmed"
  }
];

export const INITIAL_GOALS: GoalTemplate[] = [
  {
    id: "g-1",
    domain: "Speech",
    measurementType: "Percentage",
    title: "Expressive 3-Word Sentence Expansion",
    description: "Student will spontaneously produce functional 3-word sentences during structured play without prompts.",
    targetCriteria: "80% accuracy across 3 consecutive sessions",
    exampleTrials: "10 trials per session using AAC board or picture cards."
  },
  {
    id: "g-2",
    domain: "Occupational",
    measurementType: "Duration",
    title: "Dynamic Tripod Pencil Grip & Line Tracing",
    description: "Student will maintain a functional tripod pencil grip while tracing pre-writing shapes without fatigue.",
    targetCriteria: "10 minutes continuous task engagement with 85% line accuracy",
    exampleTrials: "Pre-writing maze worksheets, slant board usage."
  },
  {
    id: "g-3",
    domain: "Social-Emotional",
    measurementType: "Frequency",
    title: "Self-Initiated Emotion Break Card Request",
    description: "Student will independently present a sensory break visual card when experiencing sensory overload.",
    targetCriteria: "4 out of 5 opportunities during classroom transitions",
    exampleTrials: "Roleplay visual card exchange during high-noise activities."
  },
  {
    id: "g-4",
    domain: "Executive",
    measurementType: "Percentage",
    title: "Multi-Step Visual Task Sequencing",
    description: "Student will arrange 4-part picture cards in logical chronological order and explain sequence.",
    targetCriteria: "90% correct ordering on first attempt over 4 sessions",
    exampleTrials: "Morning routine, baking, wash hands picture cards."
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Dr. Mariam Raghep",
    role: "Lead Speech Pathologist (CCC-SLP)",
    specialty: "Pediatric Speech & AAC",
    email: "mariam.raghep@novacrm.com",
    phone: "(555) 101-2020",
    activeCaseload: 18,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "tm-2",
    name: "Sarah Jenkins",
    role: "Occupational Therapist (OTR/L)",
    specialty: "Sensory Integration & Fine Motor",
    email: "sarah.j@novacrm.com",
    phone: "(555) 303-4040",
    activeCaseload: 14,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "tm-3",
    name: "Omar Farooq",
    role: "Behavior Analyst (BCBA)",
    specialty: "Applied Behavior Analysis & ABA",
    email: "omar.f@novacrm.com",
    phone: "(555) 505-6060",
    activeCaseload: 12,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: "w-1",
    patientName: "Lucas Vance",
    age: 4,
    requestedService: "Speech-Language Evaluation",
    priority: "High",
    addedDate: "2026-08-15",
    contactNumber: "(555) 777-8899"
  },
  {
    id: "w-2",
    patientName: "Maya Lin",
    age: 6,
    requestedService: "Sensory OT Assessment",
    priority: "Medium",
    addedDate: "2026-08-18",
    contactNumber: "(555) 444-3322"
  }
];
