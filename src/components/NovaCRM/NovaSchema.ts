/**
 * NovaSchema.ts — NovaCRM Data Model (Source of Truth)
 *
 * This file defines the structural schema (interfaces and union types) for the
 * NovaCRM subsystem. It is the single authoritative Data Model layer.
 *
 * Architecture:
 *   NovaCRM XML System
 *   ├── NovaSchema.ts  ← Data Model  (this file — defines structure/types)
 *   └── NovaData.ts    ← Data        (seed data that conforms to this schema)
 *
 * All data in NovaData.ts must conform to the types defined here.
 * All NovaCRM components import types from './NovaData' (which re-exports
 * these types), so existing imports are never broken.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT / CLIENT RECORDS
// ─────────────────────────────────────────────────────────────────────────────

export interface PatientRecord {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Inactive' | 'Discharged';
  primaryDiagnosis: string;
  guardianName: string;
  guardianPhone: string;
  school: string;
  grade: string;
  avatar: string;
  therapistAssigned: string;
  lastSessionDate: string;
  iepCompletionPct: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULING / APPOINTMENTS
// ─────────────────────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  durationMins: number;
  type: 'Individual' | 'Group' | 'Assessment' | 'Consultation';
  location: string;
  recurrence: 'None' | 'Weekly' | 'Bi-Weekly' | 'Monthly';
  therapistName: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'In-Progress';
}

// ─────────────────────────────────────────────────────────────────────────────
// GOAL BANK / TREATMENT OBJECTIVES
// ─────────────────────────────────────────────────────────────────────────────

export interface GoalTemplate {
  id: string;
  domain: 'Speech' | 'Occupational' | 'Social-Emotional' | 'Academics' | 'Executive' | 'Physical' | 'Daily Living';
  measurementType: 'Percentage' | 'Duration' | 'Frequency' | 'Latency';
  title: string;
  description: string;
  targetCriteria: string;
  exampleTrials: string;
}

export interface HomeExercise {
  id: string;
  title: string;
  instructions: string;
  frequency: string;
  duration: string;
}

export interface TreatmentObjective {
  id: string;
  title: string;
  targetDate: string;
  status: 'Mastered' | 'In-Progress' | 'Not Started';
}

export interface LongTermGoal {
  id: string;
  title: string;
  domain: string;
  targetDate: string;
  objectives: TreatmentObjective[];
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  therapistName: string;
  serviceFrequency: string;
  planPeriodStart: string;
  planPeriodEnd: string;
  goals: LongTermGoal[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSION DATA COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

export interface TrialTapeEntry {
  id: string;
  timestamp: string;
  result: 'Correct' | 'Incorrect' | 'Prompted' | 'No Response';
}

// ─────────────────────────────────────────────────────────────────────────────
// INTAKE / WAITLIST
// ─────────────────────────────────────────────────────────────────────────────

export interface IntakeSubmission {
  id: string;
  childName: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  dob: string;
  servicesRequested: string[];
  presentingConcerns: string;
  insuranceProvider: string;
  policyNumber: string;
  submissionDate: string;
  status: 'Pending Review' | 'Accepted' | 'Waitlisted';
}

export interface WaitlistEntry {
  id: string;
  patientName: string;
  age: number;
  requestedService: string;
  priority: 'High' | 'Medium' | 'Low';
  addedDate: string;
  contactNumber: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM / STAFF
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  email: string;
  phone: string;
  activeCaseload: number;
  avatar: string;
}
