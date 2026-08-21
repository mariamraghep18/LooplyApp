import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ParentProfile {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  faceAuthEnabled?: boolean;
  idCardPhoto?: string;
  childAttachments?: { name: string; url: string; type: string; size?: string }[];
  determinationType?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  nickname?: string;
  age: string;
  grade: string;
  school: string;
  schoolType?: string;
  avatar: string;
  photo?: string;
  pin?: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  streak: number;
  themeColor: string;
  determinationType?: string;
  childAttachments?: { name: string; url: string; type: string; size?: string }[];
}

export interface Goal {
  id: string;
  childId: string;
  title: string;
  titleAr: string;
  description?: string;
  category: string;
  goalType?: 'home' | 'therapeutics'; // Added goalType
  difficulty?: string;
  status: 'not_started' | 'in_progress' | 'achieved';
  progress: number;
  target: number;
  reward: number;
  deadline?: string;
  icon: string;
}

export interface SessionRecord {
  id: string;
  childId: string;
  date: string;
  endDate?: string;
  duration: number;
  type: string;
  status: 'completed' | 'scheduled' | 'recording';
  gamesPlayed?: string[];
  goalsCompleted?: number;
  starsEarned?: number;
  videoUrl?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  price: number;
  icon: string;
  owned: boolean;
}

export interface TokenBoard {
  id: string;
  childId: string;
  name: string;
  targetTokens: number;
  currentTokens: number;
  tokenSymbol: string;
  rewardText: string;
  rewardSymbol: string;
  time?: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  endDate?: string;
  time: string;
  title: string;
  content: string;
  specialistName?: string;
}

interface SharedDataContextType {
  parentProfile: ParentProfile | null;
  setParentProfile: (profile: ParentProfile | null) => void;
  children: ChildProfile[];
  addChild: (child: Omit<ChildProfile, 'id' | 'level' | 'xp' | 'coins' | 'gems' | 'streak' | 'themeColor'>) => string;
  updateChild: (id: string, updates: Partial<ChildProfile>) => void;
  activeChildId: string | null;
  setActiveChildId: (id: string | null) => void;
  
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  
  sessions: SessionRecord[];
  addSession: (session: Omit<SessionRecord, 'id'>) => void;
  
  rewards: RewardItem[];
  buyReward: (childId: string, rewardId: string) => void;
  
  tokenBoards: TokenBoard[];
  addTokenBoard: (board: Omit<TokenBoard, 'id' | 'currentTokens'>) => void;
  updateTokenBoard: (boardId: string, tokens: number) => void;
  
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  appThemeColor: string;
  setAppThemeColor: (color: string) => void;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export function SharedDataProvider({ children: reactChildren }: { children: ReactNode }) {
  const [parentProfile, setParentProfile] = useState<ParentProfile | null>(null);
  const [appThemeColor, setAppThemeColor] = useState<string>('bg-slate-50');
  const [children, setChildren] = useState<ChildProfile[]>([
    {
      id: 'c1',
      name: 'Adam',
      nickname: 'Adam Superstar 🌟',
      age: '7',
      grade: 'Grade 2',
      school: 'Looply Academy',
      avatar: '👦',
      level: 3,
      xp: 350,
      coins: 120,
      gems: 15,
      streak: 3,
      themeColor: 'purple'
    }
  ]);
  const [activeChildId, setActiveChildId] = useState<string | null>('c1');
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [tokenBoards, setTokenBoards] = useState<TokenBoard[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  
  const [rewards, setRewards] = useState<RewardItem[]>([
    // Avatars Category
    { id: '1', title: 'Astronaut Avatar', titleAr: 'صورة رائد فضاء', category: 'avatars', price: 150, icon: '👨‍🚀', owned: false },
    { id: '2', title: 'Super Hero Avatar', titleAr: 'صورة بطل خارق', category: 'avatars', price: 120, icon: '🦸‍♂️', owned: false },
    { id: '3', title: 'Smart Cat Avatar', titleAr: 'صورة قطة ذكية', category: 'avatars', price: 80, icon: '🐱', owned: false },
    { id: '4', title: 'Magic Unicorn Avatar', titleAr: 'وحيد القرن السحري', category: 'avatars', price: 100, icon: '🦄', owned: false },
    { id: '5', title: 'Friendly Robot Avatar', titleAr: 'صورة روبوت صديق', category: 'avatars', price: 130, icon: '🤖', owned: false },
    { id: '6', title: 'Dragon Champion Avatar', titleAr: 'صورة التنين البطل', category: 'avatars', price: 200, icon: '🐲', owned: false },

    // Outfits Category
    { id: '7', title: 'Golden Superhero Cape', titleAr: 'عباءة البطل الذهبية', category: 'outfits', price: 180, icon: '🦸‍♀️', owned: false },
    { id: '8', title: 'Royal Crown & Suit', titleAr: 'تاج وبدلة ملكية', category: 'outfits', price: 250, icon: '👑', owned: false },
    { id: '9', title: 'Ninja Training Costume', titleAr: 'زي النينجا الخارق', category: 'outfits', price: 160, icon: '🥷', owned: false },

    // Themes Category
    { id: '10', title: 'Cosmic Galaxy Theme', titleAr: 'سمة المجرة الكونية', category: 'themes', price: 220, icon: '🌌', owned: false },
    { id: '11', title: 'Rainbow Paradise Theme', titleAr: 'سمة قوس قزح السحرية', category: 'themes', price: 190, icon: '🌈', owned: false },
    { id: '12', title: 'Underwater Ocean Theme', titleAr: 'سمة المحيط الهادئ', category: 'themes', price: 170, icon: '🌊', owned: false },

    // Accessories Category
    { id: '13', title: 'Cool Cyber Sunglasses', titleAr: 'نظارات السايبر الذكية', category: 'accessories', price: 90, icon: '🕶️', owned: false },
    { id: '14', title: 'Sparkle Wizard Wand', titleAr: 'عصا السحر البراقة', category: 'accessories', price: 110, icon: '🪄', owned: false },
    { id: '15', title: 'Golden Victory Medal', titleAr: 'ميدالية الفوز الذهبية', category: 'accessories', price: 140, icon: '🏅', owned: false },

    // Power-Ups Category
    { id: '16', title: 'Double XP Booster (2X)', titleAr: 'مضاعف النقاط 2X', category: 'powerups', price: 200, icon: '⚡', owned: false },
    { id: '17', title: 'Super Streak Saver', titleAr: 'حامي الأيام المتتالية', category: 'powerups', price: 150, icon: '🔥', owned: false },
  ]);

  const addChild = (childData: Omit<ChildProfile, 'id' | 'level' | 'xp' | 'coins' | 'gems' | 'streak' | 'themeColor'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newChild: ChildProfile = {
      ...childData,
      id: newId,
      level: 1,
      xp: 0,
      coins: 0,
      gems: 0,
      streak: 0,
      themeColor: 'blue'
    };
    setChildren(prev => [...prev, newChild]);
    if (!activeChildId) setActiveChildId(newId);
    return newId;
  };

  const updateChild = (id: string, updates: Partial<ChildProfile>) => {
    setChildren(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const newProgress = Math.min(progress, g.target);
        return {
          ...g,
          progress: newProgress,
          status: newProgress >= g.target ? 'achieved' : 'in_progress'
        };
      }
      return g;
    }));
  };

  const addSession = (sessionData: Omit<SessionRecord, 'id'>) => {
    const newSession: SessionRecord = {
      ...sessionData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setSessions(prev => [...prev, newSession]);
  };

  const buyReward = (childId: string, rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.owned) return;

    setChildren(prev => prev.map(c => {
      if (c.id === childId && c.coins >= reward.price) {
        setRewards(rPrev => rPrev.map(r => r.id === rewardId ? { ...r, owned: true } : r));
        return { ...c, coins: c.coins - reward.price };
      }
      return c;
    }));
  };

  const addTokenBoard = (boardData: Omit<TokenBoard, 'id' | 'currentTokens'>) => {
    const newBoard: TokenBoard = {
      ...boardData,
      id: Math.random().toString(36).substr(2, 9),
      currentTokens: 0
    };
    setTokenBoards(prev => [...prev, newBoard]);
  };

  const updateTokenBoard = (boardId: string, tokens: number) => {
    setTokenBoards(prev => prev.map(b => {
      if (b.id === boardId) {
        return { ...b, currentTokens: Math.min(tokens, b.targetTokens) };
      }
      return b;
    }));
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents(prev => [...prev, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setCalendarEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  return (
    <SharedDataContext.Provider value={{
      parentProfile, setParentProfile,
      children, addChild, updateChild, activeChildId, setActiveChildId,
      goals, addGoal, updateGoalProgress,
      sessions, addSession,
      rewards, buyReward,
      tokenBoards, addTokenBoard, updateTokenBoard,
      calendarEvents, addCalendarEvent, updateCalendarEvent,
      appThemeColor, setAppThemeColor
    }}>
      {reactChildren}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  const context = useContext(SharedDataContext);
  if (!context) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
}
