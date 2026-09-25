/**
 * ProSchema.ts — LooplyPro Data Model (Source of Truth)
 *
 * This file defines the structural schema (interfaces and union types) for the
 * LooplyPro subsystem. It is the single authoritative Data Model layer.
 *
 * Architecture:
 *   LooplyPro XML System
 *   ├── ProSchema.ts  ← Data Model  (this file — defines structure/types)
 *   └── ProData.ts    ← Data        (seed data that conforms to this schema)
 *
 * All data in ProData.ts must conform to the types defined here.
 * All LooplyPro components import types from './ProData' (which re-exports
 * these types), so existing imports are never broken.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT / CLIENT RECORDS
// ─────────────────────────────────────────────────────────────────────────────

export interface Patient {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  gender: 'M' | 'F';
  avatar: string;
  diagnoses: string[];
  diagnosesAr: string[];
  iepProgress: number;
  primarySpecialist: string;
  gradeOrGroup: string;
  lastSession: string;
  nextSession: string;
  status: 'active' | 'inactive' | 'discharged';
  dob?: string;
  guardianName?: string;
  guardianPhone?: string;
  school?: string;
  grade?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// IEP GOALS / GOAL BANK
// ─────────────────────────────────────────────────────────────────────────────

export interface IepGoal {
  id: string;
  title: string;
  titleAr: string;
  domain: 'speech' | 'motor' | 'cognitive' | 'behavioral' | 'social-emotional' | 'academics' | 'executive' | 'physical' | 'daily-living';
  domainLabelEn: string;
  domainLabelAr: string;
  description: string;
  descriptionAr: string;
  difficulty: 'beginner' | 'emerging' | 'intermediate' | 'advanced';
  ageRange: string;
  targetCriteria: string;
  measurementType?: 'percentage' | 'duration' | 'frequency' | 'latency';
  exampleTrials?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULING / SESSIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface AppointedSession {
  id: string;
  patientId: string;
  patientName: string;
  therapistName: string;
  serviceType: string;
  serviceTypeAr: string;
  date: string;
  time: string;
  durationMins: number;
  room: string;
  status: 'in-progress' | 'scheduled' | 'completed' | 'cancelled';
  recurrence?: 'none' | 'weekly' | 'bi-weekly' | 'monthly';
  type?: 'individual' | 'group' | 'assessment' | 'consultation';
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────

export interface HomeSubmission {
  id: string;
  patientId: string;
  patientName: string;
  activityTitle: string;
  activityTitleAr: string;
  submittedBy: string;
  date: string;
  notes: string;
  mediaType: 'video' | 'photo';
  status: 'pending' | 'reviewed' | 'approved';
  tokensEarned: number;
}

export interface HomeExerciseItem {
  id: string;
  title: string;
  instructions: string;
  frequency: string;
  duration: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM / STAFF
// ─────────────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  avatar: string;
  role: 'admin' | 'therapist' | 'assistant' | 'staff';
  roleAr: string;
  specialty: string;
  specialtyAr: string;
  caseload: number;
  activeToday: boolean;
  permissions?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// BILLING
// ─────────────────────────────────────────────────────────────────────────────

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  cptCode: string;
  description: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending-claim' | 'draft';
}

// ─────────────────────────────────────────────────────────────────────────────
// CLINICAL DOCUMENTATION
// ─────────────────────────────────────────────────────────────────────────────

export interface SoapNote {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  therapistName: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  cptCode: string;
  durationMins: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSION DATA COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

export interface TrialTapeEntry {
  id: string;
  timestamp: string;
  result: 'correct' | 'incorrect' | 'prompted' | 'no-response';
}

// ─────────────────────────────────────────────────────────────────────────────
// TREATMENT PLANS
// ─────────────────────────────────────────────────────────────────────────────

export interface TreatmentObjective {
  id: string;
  description: string;
  targetDate: string;
  criteria: string;
  status: 'mastered' | 'in-progress' | 'not-started';
}

export interface LongTermGoalItem {
  id: string;
  title: string;
  domain: string;
  targetDate: string;
  objectives: TreatmentObjective[];
}

// ─────────────────────────────────────────────────────────────────────────────
// WAITLIST
// ─────────────────────────────────────────────────────────────────────────────

export interface WaitlistEntry {
  id: string;
  patientName: string;
  age: number;
  requestedService: string;
  priority: 'high' | 'medium' | 'low';
  addedDate: string;
  contactNumber: string;
}
