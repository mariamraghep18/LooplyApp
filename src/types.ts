export type ViewState = 
  | 'welcome'
  | 'portal-selection'
  | 'family-selection'
  | 'login' 
  | 'register' 
  | 'dashboard'
  | 'activity'
  | 'token-boards'
  | 'daily-tasks'
  | 'video-records'
  | 'calendar'
  | 'find-my-child'
  | 'report' // Combined Analytics, Session Report, Performance, Video Records
  | 'plan' // Combined Home Plan and Goals
  | 'community-messages' // Combined Messages and Community
  | 'marketplace'
  | 'billing'
  | 'support'
  | 'settings'
  | 'child-welcome'
  | 'child-portal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent';
}

export interface Child {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
}
