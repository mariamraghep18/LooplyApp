import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { childData } from './childData';
import { 
  Star, Flame, Trophy, Coins, Play, CheckCircle, 
  Map, Target, Calendar, Gamepad2, Gift, LayoutDashboard,
  LogOut, MessageCircle, Bell, Settings as SettingsIcon, Menu, X, Check,
  ChevronLeft, ChevronRight, Speaker, Loader, Zap, Lock, Globe, Plus, User, Camera, ListTodo, Volume2, VolumeX
} from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';
import { useSharedData } from '../shared/SharedData';
import { playAudioFeedback, speakVoice, toggleAudioMute, getAudioMuted } from '../shared/audio';

import HandWashingGame from '../portals/Child/Games/HandWashingGame';
import GameWinModal from '../portals/Child/MiniGames/GameWinModal';
import LetterAdventure from '../portals/Child/MiniGames/LetterAdventure';
import MemoryMatch from '../portals/Child/MiniGames/MemoryMatch';
import ColorMatch from '../portals/Child/MiniGames/ColorMatch';
import EmotionMirror from '../portals/Child/MiniGames/EmotionMirror';
import MorningRoutine from '../portals/Child/MiniGames/MorningRoutine';
import MathCounting from '../portals/Child/MiniGames/MathCounting';


interface ChildPortalProps {
  onLogout: () => void;
}

type View = 'dashboard' | 'games' | 'goals' | 'achievements' | 'schedule' | 'rewards' | 'tokenboard' | 'messages' | 'challenges' | 'homeplan' | 'progress' | 'profile' | 'feel-good' | 'achieved';

export default function ChildPortal({ onLogout }: ChildPortalProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [tasksSubTab, setTasksSubTab] = useState<'daily' | 'achieved'>('daily');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodComment, setMoodComment] = useState<string>('');
  const [moodSaved, setMoodSaved] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(getAudioMuted());
  const { lang, setLang, t: tGlobal } = useLanguage();
  const { children, activeChildId, goals, updateGoalProgress, buyReward, updateChild, addTokenBoard, tokenBoards, addSession, sessions, rewards } = useSharedData() as any;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [winStats, setWinStats] = useState({ xp: 0, coins: 0, gems: 0 });

  const [dailyTasksList, setDailyTasksList] = useState([
    { id: 1, title: 'Morning Stretching', titleAr: 'تمارين الإطالة الصباحية', type: 'Physical', duration: '10 min', reward: 20, icon: '🏃‍♂️', completed: true },
    { id: 2, title: 'Color Sorting Game', titleAr: 'لعبة ترتيب الألوان', type: 'Cognitive', duration: '15 min', reward: 20, icon: '🎨', completed: true },
    { id: 3, title: 'Read a short story', titleAr: 'قراءة قصة قصيرة', type: 'Reading', duration: '20 min', reward: 25, icon: '📚', completed: false },
    { id: 4, title: 'Sensory play time', titleAr: 'وقت اللعب الحسي', type: 'Sensory', duration: '15 min', reward: 20, icon: '🫧', completed: false },
    { id: 5, title: 'Speech Practice', titleAr: 'تمارين التخاطب اليومية', type: 'SLT', duration: '10 min', reward: 25, icon: '🗣️', completed: false },
  ]);

  
  const [gameCategory, setGameCategory] = useState('all');
  const [playingGame, setPlayingGame] = useState<any>(null);
  const [gameStep, setGameStep] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [rewardCategory, setRewardCategory] = useState('avatars');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showNewTokenBoardModal, setShowNewTokenBoardModal] = useState(false);
  const [newTokenBoard, setNewTokenBoard] = useState({
    name: '',
    targetTokens: 5,
    tokenSymbol: '⭐',
    rewardText: '',
    rewardSymbol: '🎮'
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [customNickname, setCustomNickname] = useState<string | null>(null);

  const activeChild = children.find((c: any) => c.id === activeChildId) || children[0];
  const childName = customNickname !== null ? customNickname : (activeChild?.nickname || activeChild?.name || sessionStorage.getItem('childName') || childData.profile.name);
  const childLevel = activeChild?.level || childData.profile.level;
  const childXp = activeChild?.xp || childData.profile.xp;
  const childCoins = activeChild?.coins || childData.profile.coins;
  const childGems = activeChild?.gems || 0;
  const childStreak = activeChild?.streak || childData.profile.streak;
  const childAvatar = selectedAvatar !== null ? selectedAvatar : (activeChild?.photo || activeChild?.avatar || childData.profile.avatar);

  const childGoals = goals.filter((g: any) => g.childId === activeChildId);
  const inProgressGoals = childGoals.filter((g: any) => g.status === 'in_progress' || g.status === 'not_started');
  const achievedGoals = childGoals.filter((g: any) => g.status === 'achieved');

  const d = childData;
  const isRTL = lang === 'ar';

  const themeColors = [
    { id: 'purple', name: 'Purple', hex: '#633BE8', class: 'bg-[#633BE8]', text: 'text-[#633BE8]', border: 'border-[#633BE8]', softBg: 'bg-[#ECE8FD]', ring: 'ring-[#633BE8]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6', class: 'bg-[#3B82F6]', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]', softBg: 'bg-blue-100/60', ring: 'ring-[#3B82F6]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
    { id: 'green', name: 'Green', hex: '#10B981', class: 'bg-[#10B981]', text: 'text-[#10B981]', border: 'border-[#10B981]', softBg: 'bg-emerald-100/60', ring: 'ring-[#10B981]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
    { id: 'pink', name: 'Pink', hex: '#FF6086', class: 'bg-[#FF6086]', text: 'text-[#FF6086]', border: 'border-[#FF6086]', softBg: 'bg-pink-100/60', ring: 'ring-[#FF6086]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
    { id: 'amber', name: 'Amber', hex: '#FFA660', class: 'bg-[#FFA660]', text: 'text-[#FFA660]', border: 'border-[#FFA660]', softBg: 'bg-amber-100/60', ring: 'ring-[#FFA660]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
    { id: 'teal', name: 'Teal', hex: '#70E4BE', class: 'bg-[#70E4BE]', text: 'text-[#0D9488]', border: 'border-[#70E4BE]', softBg: 'bg-teal-100/60', ring: 'ring-[#70E4BE]', bgOuter: 'bg-[#FAFAFD] text-[#2A2B47]' },
  ];
  const currentTheme = themeColors.find(c => c.id === (selectedThemeId || activeChild?.themeColor)) || themeColors[0];

  const [isRecording, setIsRecording] = useState(false);
  const [isCameraMinimized, setIsCameraMinimized] = useState(false);
  const [recordingTime, setRecordingTime] = useState(1200); // 20 minutes
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Start camera recording session immediately upon entering Child Portal!
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        let mediaRecorder;
        try {
          mediaRecorder = new MediaRecorder(stream);
        } catch(e) {
          console.error("MediaRecorder error", e);
          return;
        }
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        
        mediaRecorder.onstop = () => {
          let blob;
          try {
            blob = new Blob(chunksRef.current, { type: 'video/webm' });
          } catch(e) {
            console.error(e);
            return;
          }
          const videoUrl = URL.createObjectURL(blob);
          
          if (activeChildId) {
            addSession({
              childId: activeChildId,
              date: new Date().toISOString().split('T')[0],
              duration: 20,
              type: 'Session Recording',
              status: 'completed',
              videoUrl
            });
          }
          
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start(1000);
        setIsRecording(true);
      } catch (err) {
        console.error("Camera access denied or error:", err);
      }
    };
    
    startRecording();
    
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeChildId]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev <= 0) {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();
              setIsRecording(false);
            }
            if (!isSessionEnded) {
               setIsSessionEnded(true);
               setPlayingGame(null);
               setCurrentView('dashboard');
               alert(lang === 'en' ? "Time's up for today! Your session is locked." : "انتهى وقت اليوم! تم قفل الجلسة.");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isSessionEnded]);
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const t = {
    welcome: lang === 'en' ? 'Welcome back' : 'مرحباً بعودتك',
    ready: lang === 'en' ? 'Ready for today\'s adventure?' : 'مستعد لمغامرة اليوم؟',
    missions: lang === 'en' ? 'Today\'s Missions' : 'مهام اليوم',
    progress: lang === 'en' ? 'Today\'s Progress' : 'تقدم اليوم',
    streak: lang === 'en' ? 'Day Streak' : 'أيام متتالية',
    keepGoing: lang === 'en' ? 'Keep going!' : 'استمر يا بطل!',
    xp: lang === 'en' ? 'XP' : 'نقاط',
    level: lang === 'en' ? 'Level' : 'مستوى',
    play: lang === 'en' ? 'PLAY' : 'العب',
    completed: lang === 'en' ? 'Completed' : 'مكتمل',
    dashboard: lang === 'en' ? 'Home' : 'الرئيسية',
    games: lang === 'en' ? 'Games' : 'الألعاب',
    goals: lang === 'en' ? 'My Goals' : 'أهدافي',
    calendar: lang === 'en' ? 'Calendar' : 'التقويم',
    achievements: lang === 'en' ? 'Achievements' : 'إنجازاتي',
    rewards: lang === 'en' ? 'Rewards' : 'المكافآت',
    messages: lang === 'en' ? 'Messages' : 'الرسائل',
    logout: lang === 'en' ? 'Logout' : 'تسجيل الخروج',
  };

  const handleCompleteMission = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderGames = () => {
    if (playingGame) {
      const handleGameComplete = () => {
         setPlayingGame(null);
         if (activeChildId) {
           updateChild(activeChildId, {
             xp: childXp + (playingGame.reward || 10),
             coins: childCoins + 20
           });
         }
         setShowToast(true);
         setTimeout(() => setShowToast(false), 3000);
      };
      
      const handleBack = () => setPlayingGame(null);

      switch (playingGame.id) {
        case 'game7':
          return <HandWashingGame onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game8':
          return <MorningRoutine onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game1':
          return <MemoryMatch onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game2':
          return <LetterAdventure onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game3':
          return <ColorMatch onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game4':
          return <EmotionMirror onBack={handleBack} onComplete={handleGameComplete} />;
        case 'game5':
          return <MathCounting onBack={handleBack} onComplete={handleGameComplete} />;
        default:
          return <HandWashingGame onBack={handleBack} onComplete={handleGameComplete} />; // fallback
      }
    }

    const categories = [
      { id: 'all', label: lang === 'en' ? '🎮 All Games' : '🎮 كل الألعاب' },
      { id: 'slt', label: lang === 'en' ? '🗣️ SLT' : '🗣️ التخاطب' },
      { id: 'ot', label: lang === 'en' ? '👐 OT' : '👐 الوظيفي' },
      { id: 'sel', label: lang === 'en' ? '❤️ SEL' : '❤️ العاطفي' },
      { id: 'academics', label: lang === 'en' ? '📚 Academics' : '📚 الأكاديمي' },
      { id: 'cognitive', label: lang === 'en' ? '🧠 Cognitive' : '🧠 الإدراك' },
      { id: 'daily', label: lang === 'en' ? '🏠 Daily Life' : '🏠 الحياة اليومية' },
    ];
    
    const filteredGames = gameCategory === 'all' ? d.games : d.games.filter(g => g.category === gameCategory);

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans">
        {/* Header with Yellow Star Mascot */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#ECE8FD] shadow-xs">
          <div>
            <h2 className="text-2xl font-black text-[#2A2B47]">
              {lang === 'ar' ? 'الألعاب والتمارين التعليمية' : 'Games & Missions'}
            </h2>
            <p className="text-xs font-semibold text-[#73758C] mt-0.5">
              {lang === 'ar' ? 'العب. تعلم. انمُ.' : 'Play. Learn. Grow.'}
            </p>
          </div>
          
          <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-[#FFD066] flex items-center justify-center text-3xl shadow-xs">
            ⭐
          </div>
        </div>

        {/* Horizontal Category Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setGameCategory(cat.id); playAudioFeedback('click'); }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${gameCategory === cat.id ? 'bg-[#633BE8] text-white shadow-xs' : 'bg-white text-[#73758C] border border-[#ECE8FD] hover:bg-[#ECE8FD]'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* All Playable Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGames.length > 0 ? filteredGames.map((game) => (
            <div 
              key={game.id} 
              onClick={() => { setPlayingGame(game); setGameStep('intro'); playAudioFeedback('click'); }}
              className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs hover:border-[#633BE8] transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-full h-28 bg-[#FAFAFD] rounded-2xl mb-3 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform border border-[#ECE8FD]">
                  {game.icon}
                </div>
                <div className="text-[10px] font-black text-[#633BE8] uppercase tracking-wider mb-1">{game.category}</div>
                <h3 className="font-black text-[#2A2B47] text-base mb-1 group-hover:text-[#633BE8] transition-colors">{game.title}</h3>
                <div className="flex justify-between items-center text-xs font-bold text-[#73758C] mb-3">
                  <span>⭐ {'⭐'.repeat(game.difficulty)}</span>
                  <span>{game.duration} min</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ECE8FD] flex items-center justify-between">
                <span className="text-xs font-black text-[#FFA660]">+{game.reward} XP</span>
                <button className="px-4 py-2 bg-[#633BE8] text-white rounded-xl text-xs font-black group-hover:bg-[#9C7AF2] transition-colors">
                  {lang === 'ar' ? 'العب' : 'PLAY'}
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-[#73758C] font-semibold bg-white rounded-3xl border border-dashed border-[#ECE8FD] text-xs">
              🎮 {lang === 'ar' ? 'سيتم إضافة المزيد من الألعاب قريباً!' : 'New games are coming soon!'}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGoals = () => {
    const toggleTaskCompleted = (taskId: number) => {
      setDailyTasksList(prev => prev.map(t => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) playAudioFeedback('success');
          return { ...t, completed: nextState };
        }
        return t;
      }));
    };

    const completedTasksCount = dailyTasksList.filter(t => t.completed).length;

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#70E4BE]/20 p-6 rounded-3xl border border-[#70E4BE]/40 shadow-xs">
          <div>
            <h2 className="text-2xl font-black text-[#2A2B47]">
              {lang === 'ar' ? 'مهام وتأهيل الطفل (Tasks)' : "Child Tasks"}
            </h2>
            <p className="text-xs font-semibold text-[#73758C] mt-0.5">
              {lang === 'ar' ? 'الخطة التفاعلية والأنشطة اليومية الهادفة.' : 'Smart tools for daily tasks and goals.'}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white border border-[#70E4BE] flex items-center justify-center text-3xl shadow-xs">
            📋
          </div>
        </div>

        {/* Action Header Tabs (Tasks & Achieve Tasks Button directly inside Tasks) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-[#ECE8FD]">
          <button
            onClick={() => setTasksSubTab('daily')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all ${tasksSubTab === 'daily' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            📋 {lang === 'ar' ? 'مهام اليوم' : 'Daily Tasks'}
          </button>
          <button
            onClick={() => setTasksSubTab('achieved')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all ${tasksSubTab === 'achieved' ? 'bg-[#70E4BE] text-[#2A2B47] shadow-xs font-black' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            🏆 {lang === 'ar' ? 'إنجاز المهام (Achieve Tasks)' : 'Achieve Tasks'}
          </button>
        </div>

        {tasksSubTab === 'achieved' ? (
          renderAchieved()
        ) : (
          /* Tasks List */
          <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#ECE8FD] pb-3">
              <div>
                <h3 className="font-black text-[#2A2B47] text-base flex items-center gap-2">
                  📋 {lang === 'ar' ? 'قائمة مهام اليوم' : "Today's Task List"}
                </h3>
                <p className="text-xs text-[#73758C] font-semibold mt-0.5">
                  {lang === 'ar' ? 'أكمل المهام للحصول على المكافآت والعملات!' : 'Complete tasks to earn coins & XP rewards!'}
                </p>
              </div>
              <span className="text-xs font-black text-[#633BE8] bg-[#ECE8FD] px-3 py-1 rounded-full border border-[#633BE8]/20">
                {completedTasksCount} / {dailyTasksList.length} {lang === 'ar' ? 'مكتمل' : 'Completed'}
              </span>
            </div>

            <div className="space-y-3">
              {dailyTasksList.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTaskCompleted(task.id)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${task.completed ? 'bg-[#FAFAFD] border-[#70E4BE]' : 'bg-white border-[#ECE8FD] hover:border-[#633BE8]'}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${task.completed ? 'bg-[#70E4BE] text-white' : 'border-2 border-[#ECE8FD] bg-white'}`}>
                      {task.completed && <Check className="w-4 h-4 text-[#2A2B47]" />}
                    </div>
                    <div>
                      <h4 className={`font-black text-sm ${task.completed ? 'line-through text-[#73758C]' : 'text-[#2A2B47]'}`}>
                        {task.icon} {lang === 'ar' ? task.titleAr : task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-semibold text-[#73758C]">
                        <span className="bg-[#ECE8FD] text-[#633BE8] px-2 py-0.5 rounded-full font-bold">{task.type}</span>
                        <span>⏱️ {task.duration}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#FFA660] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FFA660]/20 shrink-0">
                    +{task.reward} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFeelGoodCorner = () => {
    const moods = [
      { id: 'happy', emoji: '😊', title: 'Happy', titleAr: 'سعيد' },
      { id: 'excited', emoji: '😄', title: 'Excited', titleAr: 'متحمس' },
      { id: 'neutral', emoji: '😐', title: 'Okay / Neutral', titleAr: 'عادي / محايد' },
      { id: 'sad', emoji: '😢', title: 'Sad', titleAr: 'حزين' },
      { id: 'angry', emoji: '😡', title: 'Angry', titleAr: 'غاضب' },
      { id: 'worried', emoji: '😟', title: 'Worried', titleAr: 'قلق' },
      { id: 'tired', emoji: '😴', title: 'Tired', titleAr: 'متعب' },
      { id: 'scared', emoji: '😨', title: 'Scared', titleAr: 'خائف' },
    ];

    const handleSaveMood = () => {
      if (!selectedMood) return;
      setMoodSaved(true);
      playAudioFeedback('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-[#FF6086] via-[#9C7AF2] to-[#633BE8] p-6 rounded-3xl text-white shadow-md">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2">
              💖 {lang === 'ar' ? 'ركن الشعور الجميل (Feel Good Corner)' : 'Feel Good Corner'}
            </h2>
            <p className="text-xs font-semibold text-white/90 mt-1">
              {lang === 'ar' ? 'كيف تشعر الآن يا بطل؟ أخبرنا بمشاعرك!' : 'How are you feeling right now? Let us know!'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-xs">
            🌈
          </div>
        </div>

        {/* Mood Check-In Emojis */}
        <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs space-y-4">
          <h3 className="font-black text-[#2A2B47] text-base flex items-center gap-2">
            😊 {lang === 'ar' ? 'اختر شعورك الحالي (Mood Check-In)' : 'Choose your current mood'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {moods.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMood(m.id);
                    setMoodSaved(false);
                    playAudioFeedback('tap');
                    speakVoice(lang === 'ar' ? m.titleAr : m.title, lang);
                  }}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#633BE8] bg-[#ECE8FD] scale-105 shadow-md ring-4 ring-[#633BE8]/20'
                      : 'border-slate-100 bg-[#FAFAFD] hover:border-[#9C7AF2] hover:scale-102'
                  }`}
                >
                  <span className="text-4xl animate-bounce-short">{m.emoji}</span>
                  <span className="font-extrabold text-xs text-[#2A2B47]">
                    {lang === 'ar' ? m.titleAr : m.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Add a Comment Section */}
          <div className="pt-4 border-t border-[#ECE8FD] space-y-2">
            <label className="block text-xs font-black text-[#2A2B47]">
              💬 {lang === 'ar' ? 'إضافة تعليق (اختياري)' : 'Add a Comment (Optional)'}
            </label>
            <textarea
              value={moodComment}
              onChange={(e) => setMoodComment(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'أخبرنا المزيد عن شعورك ولماذا تشعر بهذا الشعور...'
                  : 'Tell us more about how you feel...'
              }
              className="w-full p-4 border border-[#ECE8FD] rounded-2xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#633BE8] min-h-[90px]"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
              selectedMood
                ? 'bg-[#633BE8] text-white hover:bg-[#9C7AF2] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {moodSaved ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'ar' ? 'تم تسجيل شعورك بنجاح! ⭐' : 'Mood Recorded Successfully! ⭐'}</span>
              </>
            ) : (
              <>
                <Star className="w-4 h-4 text-amber-300 fill-current" />
                <span>{lang === 'ar' ? 'حفظ وإرسال الشعور' : 'Save My Feeling'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderAchieved = () => {
    const achievedList = [
      { id: 1, title: 'Identify Colors Game', titleAr: 'لعبة التعرف على الألوان', status: 'Completed', statusAr: 'مكتملة', date: 'August 12, 2026', time: '10:35 AM', reward: 25, icon: '🎨' },
      { id: 2, title: 'Morning Stretching', titleAr: 'تمارين الإطالة الصباحية', status: 'Completed', statusAr: 'مكتملة', date: 'August 12, 2026', time: '09:00 AM', reward: 20, icon: '🏃‍♂️' },
      { id: 3, title: 'Color Sorting Game', titleAr: 'لعبة ترتيب الألوان', status: 'Completed', statusAr: 'مكتملة', date: 'August 11, 2026', time: '04:15 PM', reward: 20, icon: '🫧' },
      { id: 4, title: 'Speech Practice Session', titleAr: 'جلسة التخاطب اليومية', status: 'Completed', statusAr: 'مكتملة', date: 'August 10, 2026', time: '11:20 AM', reward: 30, icon: '🗣️' },
      { id: 5, title: 'Hand Washing Routine', titleAr: 'روتين غسيل اليدين', status: 'Completed', statusAr: 'مكتملة', date: 'August 09, 2026', time: '08:45 AM', reward: 15, icon: '🧼' },
    ];

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-[#70E4BE] to-[#633BE8] p-6 rounded-3xl text-white shadow-md">
          <div>
            <span className="text-[10px] font-black uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-white inline-block mb-1">
              🏆 {lang === 'ar' ? 'سجل المهام المنجزة' : 'Achieved History'}
            </span>
            <h2 className="text-2xl font-black">
              {lang === 'ar' ? 'المهام المنجزة بنجاح (Achieved)' : 'Achieved Tasks'}
            </h2>
            <p className="text-xs font-semibold text-white/90 mt-1">
              {lang === 'ar' ? '5 / 10 مهام تم إنجازها بنجاح' : '5 / 10 Tasks Achieved'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-xs">
            🏅
          </div>
        </div>

        {/* Total Stat Banner */}
        <div className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#70E4BE]/20 text-[#2A2B47] flex items-center justify-center text-2xl font-black">
              ⭐
            </div>
            <div>
              <h3 className="font-black text-[#2A2B47] text-base">
                5 / 10 {lang === 'ar' ? 'مهام منجزة' : 'Tasks Achieved'}
              </h3>
              <p className="text-xs text-[#73758C] font-semibold">
                {lang === 'ar' ? 'استمر في التفوق لإكمال بقية الخطة!' : 'Great job completing your tasks!'}
              </p>
            </div>
          </div>
          <span className="bg-[#70E4BE] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs">
            50% {lang === 'ar' ? 'إنجاز' : 'Done'}
          </span>
        </div>

        {/* Achievement Cards List */}
        <div className="space-y-3">
          {achievedList.map((task) => (
            <div key={task.id} className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs hover:border-[#70E4BE] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ECE8FD] text-[#633BE8] flex items-center justify-center text-2xl shrink-0 border border-[#633BE8]/20">
                  {task.icon}
                </div>
                <div>
                  <h4 className="font-black text-[#2A2B47] text-base">
                    {lang === 'ar' ? task.titleAr : task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-bold text-[#73758C]">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1 border border-emerald-200">
                      ✓ {lang === 'ar' ? task.statusAr : task.status}
                    </span>
                    <span>📅 {task.date}</span>
                    <span>⏰ {task.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ECE8FD]">
                <span className="text-xs font-black text-[#FFA660] bg-[#FFF7ED] px-3.5 py-1.5 rounded-xl border border-[#FFA660]/20">
                  +{task.reward} XP 🌟
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSchedule = () => {
    const todayDate = new Date().getDate();
    const currentMonthName = new Date().toLocaleString(lang === 'ar' ? 'ar' : 'en', { month: 'long', year: 'numeric' });

    const scheduledEvents: Record<number, Array<{
      id: string;
      title: string;
      titleAr: string;
      time: string;
      doctor?: string;
      location?: string;
      type: string;
      typeAr: string;
      icon: string;
      notes?: string;
      notesAr?: string;
    }>> = {
      12: [
        {
          id: 'ev1',
          title: 'Doctor Session',
          titleAr: 'جلسة طبيب وتأهيل',
          time: '2:00 PM',
          doctor: 'Dr. Ahmed',
          location: 'Therapy Room 3',
          type: 'Doctor Session',
          typeAr: 'جلسة طبيب',
          icon: '👨‍⚕️',
          notes: 'Speech & Behavior assessment and progress check.',
          notesAr: 'تقييم النطق والسلوك ومتابعة التطور.'
        },
        {
          id: 'ev2',
          title: 'Speech Practice Task',
          titleAr: 'تمرين التخاطب اليومي',
          time: '11:00 AM',
          doctor: 'Dr. Sara',
          location: 'Speech Lab 1',
          type: 'Speech Therapy',
          typeAr: 'جلسة تخاطب',
          icon: '🗣️',
          notes: 'Word pronunciation and communication exercises.',
          notesAr: 'تمارين نطق الكلمات والتواصل.'
        },
        {
          id: 'ev3',
          title: 'Sensory Play Activity',
          titleAr: 'نشاط اللعب الحسي',
          time: '04:30 PM',
          location: 'Sensory Room',
          type: 'Activity',
          typeAr: 'نشاط حسي',
          icon: '🫧',
          notes: 'Fine motor & tactile stimulation activity.',
          notesAr: 'تحفيز مهارات اللمس والحركة الدقيقة.'
        }
      ],
      15: [
        {
          id: 'ev4',
          title: 'Pediatric Consultation',
          titleAr: 'استشارة طبيب الأطفال',
          time: '10:00 AM',
          doctor: 'Dr. Mona',
          location: 'Clinic 2',
          type: 'Consultation',
          typeAr: 'استشارة طبيب',
          icon: '🩺'
        }
      ]
    };

    const days = Array.from({ length: 31 }, (_, i) => {
      const date = i + 1;
      const isToday = date === todayDate;
      const hasEvents = !!scheduledEvents[date];
      return { date, isToday, hasEvents };
    });

    const activeDay = selectedDate || todayDate;
    const activeEvents = scheduledEvents[activeDay] || [
      {
        id: 'default_ev',
        title: 'Daily Rehabilitation Task',
        titleAr: 'مهمة التأهيل والروتين اليومي',
        time: '10:00 AM',
        doctor: 'Dr. Therapy Team',
        location: 'Home / Clinic',
        type: 'Routine Activity',
        typeAr: 'نشاط روتيني',
        icon: '⭐',
        notes: 'Interactive learning and motor skill development.',
        notesAr: 'تعلم تفاعلي وتطوير المهارات الحركية.'
      }
    ];

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#633BE8] p-6 rounded-3xl text-white shadow-md">
          <div>
            <span className="text-[10px] font-black uppercase bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-white inline-block mb-1">
              📅 {currentMonthName}
            </span>
            <h2 className="text-2xl font-black">
              {lang === 'ar' ? 'التقويم والأحداث المجدولة (Calendar)' : 'Schedule & Calendar'}
            </h2>
            <p className="text-xs font-semibold text-[#ECE8FD] mt-1">
              {lang === 'ar' ? 'حدد أي يوم لمعرفة الجلسات والأنشطة المجدولة!' : 'Click any date to see scheduled sessions & activities!'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-xs">
            📆
          </div>
        </div>

        {/* Monthly Calendar Grid */}
        <div className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-[#2A2B47] text-base">
              📅 {currentMonthName}
            </h3>
            <span className="text-xs font-extrabold text-[#633BE8] bg-[#ECE8FD] px-3 py-1 rounded-full">
              {lang === 'ar' ? 'أغسطس 2026' : 'August 2026'}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-1.5 text-[11px] font-black text-[#73758C] uppercase">
                {day}
              </div>
            ))}

            {days.map((day) => {
              const isSelected = activeDay === day.date;
              return (
                <button
                  key={day.date}
                  onClick={() => {
                    setSelectedDate(day.date);
                    playAudioFeedback('click');
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#633BE8] text-white font-black shadow-md scale-105'
                      : day.isToday
                      ? 'bg-[#ECE8FD] text-[#633BE8] font-black border border-[#633BE8]/30'
                      : 'bg-[#FAFAFD] text-[#2A2B47] hover:bg-[#ECE8FD]/60 font-bold border border-[#ECE8FD]'
                  }`}
                >
                  <span className="text-xs">{day.date}</span>
                  {day.hasEvents && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Schedule Cards for Selected Day */}
        <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#ECE8FD] pb-3">
            <div>
              <h3 className="font-black text-[#2A2B47] text-base flex items-center gap-2">
                ⏰ {lang === 'ar' ? `جدول يوم ${activeDay} أغسطس` : `Schedule for ${activeDay} August`}
              </h3>
              <p className="text-xs text-[#73758C] font-semibold mt-0.5">
                {lang === 'ar' ? 'جلسات الأطباء، الأنشطة، والمهام المحددة' : 'Doctor sessions, activities & scheduled events'}
              </p>
            </div>
            <span className="text-xs font-black text-[#633BE8] bg-[#ECE8FD] px-3 py-1 rounded-full">
              {activeEvents.length} {lang === 'ar' ? 'أحداث' : 'Events'}
            </span>
          </div>

          <div className="space-y-3">
            {activeEvents.map((ev) => (
              <div key={ev.id} className="p-4 rounded-2xl border border-[#ECE8FD] bg-[#FAFAFD] hover:border-[#633BE8] transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#ECE8FD] flex items-center justify-center text-xl shadow-xs">
                      {ev.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-[#2A2B47] text-sm">
                        {lang === 'ar' ? ev.titleAr : ev.title}
                      </h4>
                      <span className="text-[10px] font-bold text-[#633BE8] bg-[#ECE8FD] px-2 py-0.5 rounded-full">
                        {lang === 'ar' ? ev.typeAr : ev.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#92400E] bg-[#FFF7ED] px-3 py-1 rounded-xl border border-[#FDE68A]">
                    ⏰ {ev.time}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#73758C] pt-1">
                  {ev.doctor && (
                    <span className="flex items-center gap-1 text-[#2A2B47] font-bold">
                      👨‍⚕️ {lang === 'ar' ? 'الطبيب:' : 'Doctor:'} {ev.doctor}
                    </span>
                  )}
                  {ev.location && (
                    <span className="flex items-center gap-1">
                      📍 {lang === 'ar' ? 'المكان:' : 'Location:'} {ev.location}
                    </span>
                  )}
                </div>

                {(ev.notes || ev.notesAr) && (
                  <p className="text-[11px] text-[#73758C] font-medium bg-white p-2.5 rounded-xl border border-[#ECE8FD]">
                    💡 {lang === 'ar' ? ev.notesAr : ev.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-slate-800">{t.achievements} 🏆</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {d.achievements.map((ach) => (
          <div key={ach.id} className={`bg-white rounded-3xl p-4 sm:p-6 border-2 flex items-center gap-4 ${ach.locked ? 'border-slate-100 opacity-50' : 'border-amber-200 shadow-md'}`}>
            <div className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-3xl ${ach.locked ? 'bg-slate-100' : 'bg-amber-100 border-[3px] border-amber-200'}`}>
              {ach.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug break-words">
                {lang === 'en' ? ach.title : ach.titleAr}
              </h3>
              {ach.locked && <div className="mt-1 text-xs text-slate-400 font-bold flex items-center gap-1">🔒 Locked</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const [localBoards, setLocalBoards] = useState<any[]>([
    {
      id: 'default_tb_1',
      childId: activeChildId,
      name: 'لوحة إنجاز المهام اليومية (Daily Tasks Board)',
      targetTokens: 5,
      currentTokens: 3,
      tokenSymbol: '⭐',
      rewardText: 'وقت لعب إضافي (30 دقيقة ألعاب)',
      rewardSymbol: '🎮'
    },
    {
      id: 'default_tb_2',
      childId: activeChildId,
      name: 'لوحة السلوك الإيجابي (Super Star Board)',
      targetTokens: 5,
      currentTokens: 2,
      tokenSymbol: '🌟',
      rewardText: 'هدية ومفاجأة مميزة من الوالدين',
      rewardSymbol: '🎁'
    }
  ]);

  const renderTokenBoards = () => {
    const activeBoards = tokenBoards.filter((b: any) => b.childId === activeChildId);
    const displayBoards = activeBoards.length > 0 ? activeBoards : localBoards;

    const toggleSlot = (boardId: string, index: number) => {
      setLocalBoards(prev => prev.map(b => {
        if (b.id === boardId) {
          const nextCount = index < b.currentTokens ? index : index + 1;
          if (nextCount > b.currentTokens) {
            playAudioFeedback('success');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }
          return { ...b, currentTokens: nextCount };
        }
        return b;
      }));
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
              🌟 {lang === 'en' ? 'My Token Boards' : 'لوحة التعزيز (Token Board)'}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              {lang === 'en' 
                ? 'Click on slots to add tokens from your daily achievements and unlock rewards!' 
                : 'اضغط على النجوم لإضافة الرموز التعبيرية وإكمال لوحة المكافآت!'}
            </p>
          </div>
          <div className="bg-amber-100 text-amber-800 px-5 py-2.5 rounded-full font-bold flex items-center gap-2 text-base shadow-sm shrink-0">
            ⭐ {lang === 'en' ? 'Interactive Board' : 'لوحة النجوم التفاعلية'}
          </div>
        </div>

        <div className="space-y-6">
          {displayBoards.map((board: any) => {
            const isCompleted = board.currentTokens >= board.targetTokens;
            return (
              <div key={board.id} className={`bg-white rounded-[2rem] p-6 sm:p-8 shadow-md border-4 transition-all ${isCompleted ? 'border-emerald-300 ring-4 ring-emerald-100' : 'border-amber-100'} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-extrabold mb-2">
                      🌟 {lang === 'ar' ? 'لوحة تجميع النجوم' : 'Token Achievement'}
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{board.name}</h3>
                    <p className="text-slate-600 font-medium text-sm sm:text-base mb-4">
                      {lang === 'en' 
                        ? `Earn ${board.targetTokens} ${board.tokenSymbol} to unlock: ${board.rewardText}` 
                        : `اجمع ${board.targetTokens} ${board.tokenSymbol} للحصول على: ${board.rewardText}`}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                      <div className="text-4xl font-extrabold text-amber-500">
                        {board.currentTokens}<span className="text-2xl text-slate-400">/{board.targetTokens}</span>
                      </div>
                      {!isCompleted ? (
                        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-xl font-extrabold text-sm">
                          {board.targetTokens - board.currentTokens} {lang === 'en' ? 'more to go!' : 'متبقية لإكمال اللوحة!'}
                        </div>
                      ) : (
                        <div className="bg-emerald-500 text-white px-5 py-2 rounded-xl font-extrabold text-sm shadow-md animate-bounce">
                          🎉 {lang === 'en' ? 'Board Complete! Reward Unlocked!' : 'تم إكمال اللوحة واقتناء المكافأة! 🎉'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 rounded-3xl flex flex-col items-center justify-center text-6xl shadow-inner border-4 border-white shrink-0 relative group">
                    <span>{board.rewardSymbol}</span>
                    <span className="text-[11px] font-bold text-amber-800 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full mt-2 shadow-xs">
                      {lang === 'ar' ? 'المكافأة المستهدفة' : 'Target Reward'}
                    </span>
                  </div>
                </div>
                
                {/* Slots Grid */}
                <div className="relative z-10 mt-6 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-4 text-center uppercase tracking-wider">
                    {lang === 'ar' ? 'اضغط على الخانات لإضافة النجوم ⭐' : 'Tap slots to fill tokens ⭐'}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {[...Array(board.targetTokens)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => toggleSlot(board.id, i)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-sm border-3 transition-all duration-300 transform active:scale-90 ${i < board.currentTokens ? 'bg-gradient-to-br from-amber-100 to-yellow-200 border-amber-400 scale-105 shadow-amber-200/50' : 'bg-white border-dashed border-slate-300 hover:border-amber-300 scale-95 opacity-60 hover:opacity-100'}`}
                      >
                        {i < board.currentTokens ? board.tokenSymbol : <span className="text-slate-300 text-xl font-bold">{i + 1}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRewards = () => {
    const categories = [
      { id: 'avatars', label: '🧑 Avatars', labelAr: '🧑 الصور الشخصية' },
      { id: 'outfits', label: '👕 Outfits', labelAr: '👕 الملابس' },
      { id: 'themes', label: '🎨 Themes', labelAr: '🎨 السمات' },
      { id: 'accessories', label: '✨ Accessories', labelAr: '✨ الملحقات' },
      { id: 'powerups', label: '⚡ Power-Ups', labelAr: '⚡ مقويات' },
    ];
    
    const filteredRewards = rewards.filter((r: any) => r.category === rewardCategory);

    const handleBuyReward = () => {
      if (!selectedReward) return;
      if (childCoins >= selectedReward.price && !selectedReward.owned) {
        buyReward(activeChildId, selectedReward.id);
        setShowRewardModal(false);
      } else {
        alert(lang === 'en' ? 'Not enough coins!' : 'لا تملك عملات كافية!');
      }
    };

    return (
      <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans animate-fade-in">
        {/* Header & Balance Card */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#ECE8FD] shadow-xs">
          <div>
            <h2 className="text-2xl font-black text-[#2A2B47]">
              {lang === 'ar' ? 'متجر المكافآت والشعارات' : 'Rewards Store'} 🛍️
            </h2>
            <p className="text-xs font-semibold text-[#73758C] mt-0.5">
              {lang === 'ar' ? 'استبدل عملاتك ونجومك بأجمل المكافآت!' : 'Unlock awesome avatars, outfits, and power-ups!'}
            </p>
          </div>
          
          <div className="bg-[#FFF7ED] text-[#FFA660] border border-[#FFA660]/30 px-5 py-2.5 rounded-2xl font-black flex items-center gap-2 text-base shadow-xs">
            🪙 {childCoins} <span className="text-xs text-[#73758C]">{lang === 'ar' ? 'عملة' : 'Coins'}</span>
          </div>
        </div>
        
        {/* Horizontal Category Filter Pills */}
        <div className="flex overflow-x-auto gap-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setRewardCategory(cat.id);
                speakVoice(lang === 'en' ? cat.label.replace(/[^\w\s]/gi, '') : cat.labelAr.replace(/[^\w\s\u0600-\u06FF]/gi, ''), lang);
              }}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-black text-xs transition-all ${rewardCategory === cat.id ? 'bg-[#633BE8] text-white shadow-xs' : 'bg-white text-[#73758C] border border-[#ECE8FD] hover:bg-[#ECE8FD]'}`}
            >
              {lang === 'en' ? cat.label : cat.labelAr}
            </button>
          ))}
        </div>

        {/* Rewards Items Grid (17 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredRewards.length > 0 ? filteredRewards.map((reward: any) => (
            <div 
              key={reward.id} 
              onClick={() => { setSelectedReward(reward); setShowRewardModal(true); playAudioFeedback('click'); }}
              className="bg-white rounded-3xl p-4 text-center border border-[#ECE8FD] shadow-xs cursor-pointer hover:border-[#633BE8] hover:scale-105 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-full h-24 rounded-2xl flex items-center justify-center text-5xl mb-3 border border-[#ECE8FD] group-hover:scale-105 transition-transform ${reward.rarity === 'legendary' ? 'bg-gradient-to-br from-[#FFD066]/30 to-[#FFA660]/40' : reward.rarity === 'epic' ? 'bg-gradient-to-br from-[#9C7AF2]/20 to-[#FF6086]/30' : reward.rarity === 'rare' ? 'bg-gradient-to-br from-[#70E4BE]/20 to-[#633BE8]/20' : 'bg-[#FAFAFD]'}`}>
                  {reward.icon}
                </div>
                <h3 className="font-black text-[#2A2B47] text-sm mb-2 truncate">
                  {lang === 'ar' ? (reward.titleAr || reward.title) : reward.title}
                </h3>
              </div>

              {reward.owned ? (
                <button className="w-full mt-auto py-2 bg-[#70E4BE]/20 text-[#2A2B47] font-black text-xs rounded-xl border border-[#70E4BE]/40">
                  ✓ {lang === 'ar' ? 'تم الشراء' : 'Owned'}
                </button>
              ) : (
                <button className="w-full mt-auto py-2 bg-[#633BE8] hover:bg-[#9C7AF2] text-white font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs">
                  <span>{reward.price}</span>
                  <span>🪙</span>
                </button>
              )}
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-[#73758C] font-semibold bg-white rounded-3xl border border-dashed border-[#ECE8FD] text-xs">
              🛍️ {lang === 'ar' ? 'لا توجد مكافآت في هذا التصنيف حالياً.' : 'No rewards found in this category.'}
            </div>
          )}
        </div>

        {/* Reward Modal */}
        {showRewardModal && selectedReward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowRewardModal(false)}></div>
            <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl relative z-10 animate-bounce-in">
              <button 
                onClick={() => setShowRewardModal(false)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 bg-black/10 text-slate-800 rounded-full hover:bg-black/20 z-20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className={`h-48 w-full flex items-center justify-center text-8xl ${selectedReward.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-200 to-amber-400' : selectedReward.rarity === 'epic' ? 'bg-gradient-to-br from-purple-200 to-pink-300' : selectedReward.rarity === 'rare' ? 'bg-gradient-to-br from-blue-200 to-cyan-300' : 'bg-slate-100'}`}>
                {selectedReward.icon}
              </div>
              
              <div className="p-6 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{selectedReward.rarity}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{lang === 'en' ? selectedReward.title : (selectedReward.titleAr || selectedReward.title)}</h3>
                <p className="text-slate-500 mb-6">Unlock this awesome item for your collection!</p>
                
                {selectedReward.owned ? (
                  <button 
                    onClick={() => setShowRewardModal(false)}
                    className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                ) : (
                  <button 
                    onClick={handleBuyReward}
                    className={`w-full py-4 font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 ${childCoins >= selectedReward.price ? 'bg-amber-400 hover:bg-amber-500 text-amber-900' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    {childCoins >= selectedReward.price ? `Buy for ${selectedReward.price} 🪙` : `Need ${selectedReward.price - childCoins} more 🪙`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMessages = () => (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-slate-800">{t.messages} 💬</h2>
      </div>
      
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex overflow-hidden">
        {/* Contact List */}
        <div className="w-1/3 border-r border-slate-100 p-4 hidden md:flex flex-col gap-2">
          <div className="bg-purple-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-purple-200 shadow-sm">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">👩</div>
            <div>
              <div className="font-bold text-slate-800">Mom</div>
              <div className="text-sm text-slate-500 truncate">Great job today!</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">👨⚕️</div>
            <div>
              <div className="font-bold text-slate-800">Dr. Sarah</div>
              <div className="text-sm text-slate-500 truncate">Ready for our session?</div>
            </div>
          </div>
        </div>

        {/* Active Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50 flex-shrink-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">👩</div>
            <div>
              <div className="font-bold text-slate-800">Mom</div>
              <div className="text-xs text-green-500 font-medium">Online</div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
            <div className="flex flex-col items-center my-4">
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today</span>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">👩</div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-sm text-slate-800 max-w-[80%]">
                Hi {childName}! How was your speech mission today? 🌟
              </div>
            </div>
            
            <div className="flex items-end gap-2 justify-end">
              <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-br-sm max-w-[80%]">
                It was fun! I learned new words.
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">👩</div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-sm text-slate-800 max-w-[80%]">
                I'm so proud of you! Keep up the good work! ❤️
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex-shrink-0">
            <div className="flex gap-2 overflow-x-auto pb-3 mb-3 border-b border-slate-200">
              <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all">❤️ Thank you</button>
              <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all">👍 Okay!</button>
              <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all">😊 I'm happy!</button>
              <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all">🎉 I did it!</button>
              <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all">❓ I need help</button>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
                📷
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans">
      {/* 1. Top Greeting & Settings Header */}
      <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-[#ECE8FD] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ECE8FD] border border-[#633BE8]/20 flex items-center justify-center text-2xl overflow-hidden shadow-xs">
            {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar || '👦'}
          </div>
          <div>
            <h1 className="text-lg font-black text-[#2A2B47]">
              {lang === 'ar' ? `أهلاً بعودتك، ${childName}! 👋` : `Welcome back, ${childName}! 👋`}
            </h1>
            <p className="text-xs font-semibold text-[#73758C]">
              {lang === 'ar' ? 'جاهز لمغامرة اليوم؟' : 'Ready for today\'s adventure?'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); playAudioFeedback('click'); }}
            className="p-2.5 bg-[#FAFAFD] text-[#633BE8] rounded-2xl border border-[#ECE8FD] hover:bg-[#ECE8FD] transition-colors"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { const m = toggleAudioMute(); setIsMuted(m); }}
            className="p-2.5 bg-[#FAFAFD] text-[#633BE8] rounded-2xl border border-[#ECE8FD] hover:bg-[#ECE8FD] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button onClick={() => onLogout()} className="p-2.5 bg-[#FAFAFD] text-[#FF6086] rounded-2xl border border-[#ECE8FD] hover:bg-[#ECE8FD] transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Today's Mission Banner */}
      <div className="bg-[#ECE8FD] rounded-3xl p-6 sm:p-7 relative overflow-hidden border border-[#9C7AF2]/20 flex justify-between items-center shadow-xs">
        <div className="relative z-10 max-w-[65%] space-y-2">
          <span className="text-[11px] font-black uppercase text-[#633BE8] tracking-wider bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full inline-block border border-[#633BE8]/20">
            {lang === 'ar' ? 'مهمة اليوم المميزة' : "Today's Mission"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2A2B47] leading-tight">
            {lang === 'ar' ? 'طوّر تركيزك اليوم!' : 'Build your focus!'}
          </h2>
          <button 
            onClick={() => {
              setPlayingGame({ id: 'game1', title: 'Memory Match', category: 'cognitive', difficulty: 1, duration: 2, reward: 20, score: 0, icon: '🧠' });
              setCurrentView('games');
            }}
            className="mt-2 px-5 py-2.5 bg-[#633BE8] hover:bg-[#9C7AF2] text-white rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-xs group"
          >
            <span>{lang === 'ar' ? 'بدء اللعبة' : 'Start Game'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-[#70E4BE] to-[#9C7AF2] rounded-3xl flex items-center justify-center text-5xl shadow-md border-4 border-white transform rotate-3">
          🧙‍♂️
        </div>
      </div>

      {/* 3. Level & XP Progress Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#633BE8] text-white flex items-center justify-center text-xl shadow-xs font-black">
              ⚡
            </div>
            <div>
              <h3 className="font-black text-[#2A2B47] text-base">
                {lang === 'ar' ? `المستوى ${childLevel}` : `Level ${childLevel}`}
              </h3>
              <p className="text-xs font-bold text-[#633BE8]">👑 {lang === 'ar' ? 'مبتدئ كوني' : 'Cosmic Rookie'}</p>
            </div>
          </div>
          <span className="text-xs font-black text-[#2A2B47] bg-[#FAFAFD] px-3 py-1 rounded-full border border-[#ECE8FD]">
            {childXp} / 500 XP
          </span>
        </div>
        <div className="w-full bg-[#ECE8FD] h-3 rounded-full overflow-hidden shadow-inner mb-2">
          <div className="bg-gradient-to-r from-[#633BE8] via-[#9C7AF2] to-[#FF6086] h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((childXp / 500) * 100, 100)}%` }}></div>
        </div>
        <p className="text-[11px] font-bold text-[#73758C]">
          {Math.max(500 - childXp, 0)} {lang === 'ar' ? 'نقطة للوصول للمستوى التالي' : 'XP to next level'}
        </p>
      </div>

      {/* 4. Gamified Currency Metrics (Coins, Gems, Progress) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#ECE8FD] rounded-3xl p-4 text-center shadow-xs hover:border-[#FFA660] transition-all">
          <div className="text-3xl mb-1">🪙</div>
          <div className="text-2xl font-black text-[#2A2B47]">{childCoins}</div>
          <div className="text-[11px] font-bold text-[#FFA660]">{lang === 'ar' ? 'عملات' : 'Coins'}</div>
        </div>

        <div className="bg-white border border-[#ECE8FD] rounded-3xl p-4 text-center shadow-xs hover:border-[#633BE8] transition-all">
          <div className="text-3xl mb-1">💎</div>
          <div className="text-2xl font-black text-[#2A2B47]">{childGems}</div>
          <div className="text-[11px] font-bold text-[#633BE8]">{lang === 'ar' ? 'جواهر' : 'Gems'}</div>
        </div>

        <div 
          onClick={() => setCurrentView('progress')}
          className="bg-white border border-[#ECE8FD] rounded-3xl p-4 text-center shadow-xs cursor-pointer hover:border-[#70E4BE] transition-all group"
        >
          <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🚀</div>
          <div className="text-2xl font-black text-[#2A2B47]">85%</div>
          <div className="text-[11px] font-bold text-[#70E4BE]">{lang === 'ar' ? 'التقدم' : 'Progress'}</div>
        </div>
      </div>

      {/* 4. Play Now Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-black text-[#2A2B47] flex items-center gap-2">
            🎮 {lang === 'ar' ? 'العب الآن' : 'Play Now'}
          </h3>
          <button onClick={() => setCurrentView('games')} className="text-xs font-black text-[#633BE8] hover:underline">
            {lang === 'ar' ? 'عرض الكل' : 'See all'}
          </button>
        </div>

        {/* Featured Game */}
        <div 
          onClick={() => {
            setPlayingGame({ id: 'game7', title: 'Hand Washing', category: 'daily', difficulty: 1, duration: 2, reward: 20, score: 0, icon: '🫧' });
            setCurrentView('games');
          }}
          className="bg-[#633BE8] rounded-3xl p-6 text-white shadow-xs relative overflow-hidden flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform"
        >
          <div className="relative z-10 max-w-[65%] space-y-2">
            <span className="text-[10px] font-black uppercase text-white/80 bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
              Daily Life
            </span>
            <h4 className="text-2xl font-black">Hand Washing</h4>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              Learn the steps to keep your hands clean and healthy!
            </p>
            <div className="flex gap-2 pt-1">
              <span className="bg-[#70E4BE]/30 text-white px-3 py-1 rounded-full text-xs font-bold">+20 XP</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">2 min</span>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <div className="w-14 h-14 bg-white text-[#633BE8] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Secondary Games Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => {
              setPlayingGame(d.games.find(g => g.category === 'sel'));
              setCurrentView('games');
            }}
            className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs cursor-pointer hover:border-[#FF6086] transition-all"
          >
            <div className="text-3xl mb-2">🧘</div>
            <span className="text-[10px] font-black text-[#FF6086] uppercase">Breathing</span>
            <h4 className="font-black text-[#2A2B47] text-base">Calm Corner</h4>
          </div>

          <div 
            onClick={() => {
              setPlayingGame(d.games.find(g => g.category === 'cognitive'));
              setCurrentView('games');
            }}
            className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs cursor-pointer hover:border-[#FFA660] transition-all"
          >
            <div className="text-3xl mb-2">📖</div>
            <span className="text-[10px] font-black text-[#FFA660] uppercase">Read & Learn</span>
            <h4 className="font-black text-[#2A2B47] text-base">Stories</h4>
          </div>
        </div>
      </div>

      {/* 5. Feel-Good Corner */}
      <div 
        onClick={() => {
          playAudioFeedback('click');
          setCurrentView('feel-good');
        }}
        className="bg-gradient-to-r from-[#FF6086] to-[#9C7AF2] rounded-3xl p-6 text-white cursor-pointer hover:scale-[1.01] transition-all shadow-xs flex items-center justify-between"
      >
        <div>
          <h4 className="text-xl font-black mb-1">{lang === 'en' ? 'Feel-Good Corner' : 'ركن الشعور الجميل'} 💖</h4>
          <p className="text-xs text-white/90 font-medium">
            {lang === 'en' ? 'Breathing, Stories & Mood Tracker' : 'التنفس، القصص، ومتتبع المشاعر'}
          </p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-xs border border-white/30">
          ✨
        </div>
      </div>

      {/* 6. Daily Goal Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-black text-[#2A2B47] text-base flex items-center gap-2">🎯 {lang === 'en' ? 'Daily Goal' : 'هدف اليوم'}</h4>
          <span className="text-[#633BE8] font-black text-xs">1 / 3</span>
        </div>
        <div className="w-full bg-[#ECE8FD] h-3 rounded-full overflow-hidden">
          <div className="bg-[#633BE8] h-full rounded-full" style={{ width: '33%' }}></div>
        </div>
      </div>

      {/* 7. Overall Progress Spotlight Banner (Moved to Very Bottom of Dashboard) */}
      <div 
        onClick={() => setCurrentView('progress')}
        className="bg-gradient-to-r from-[#633BE8] via-[#9C7AF2] to-[#FF6086] rounded-3xl p-6 text-white shadow-xs relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-all group"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shrink-0">
              📈
            </div>
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-xs px-3 py-0.5 rounded-full text-[10px] font-black mb-1">
                ⭐ {lang === 'ar' ? 'مستوى المهارات والتقدم الإجمالي' : 'Overall Skill Mastery & Progress'}
              </span>
              <h3 className="text-xl font-black text-white">
                {lang === 'ar' ? '85% نسبة نمو المهارات والتقدم' : '85% Overall Skill Progress'} 🚀
              </h3>
            </div>
          </div>
          <div className="bg-white/20 hover:bg-white hover:text-[#633BE8] backdrop-blur-xs border border-white/30 px-4 py-2 rounded-2xl text-xs font-black transition-colors flex items-center gap-1 shrink-0">
            <span>{lang === 'ar' ? 'عرض التطور' : 'View Progress'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
const renderProgress = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-slate-800">My Progress 🚀</h2>
        <div className="bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 text-lg shadow-sm">
          Level {d.profile.level} Explorer
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border-4 border-sky-100 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto bg-sky-100 rounded-full flex items-center justify-center text-3xl mb-4">🎯</div>
          <h3 className="text-4xl font-extrabold text-slate-800 mb-1">12</h3>
          <p className="font-bold text-slate-500">Missions Completed</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border-4 border-amber-100 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-4">⭐</div>
          <h3 className="text-4xl font-extrabold text-slate-800 mb-1">450</h3>
          <p className="font-bold text-slate-500">Total XP Earned</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border-4 border-purple-100 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-3xl mb-4">⭐</div>
          <h3 className="text-4xl font-extrabold text-slate-800 mb-1">5</h3>
          <p className="font-bold text-slate-500">{lang === 'ar' ? 'الألعاب المفضلة' : 'Favorite Games'}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border-4 border-slate-100">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Skill Growth 📈</h3>
        <div className="space-y-6">
          {[
            { name: 'Speech & Language', value: 85, color: 'bg-sky-500', bg: 'bg-sky-100', icon: '🗣️' },
            { name: 'Motor Skills', value: 65, color: 'bg-emerald-500', bg: 'bg-emerald-100', icon: '🏃‍♂️' },
            { name: 'Focus & Attention', value: 90, color: 'bg-purple-500', bg: 'bg-purple-100', icon: '🧠' },
            { name: 'Social Skills', value: 70, color: 'bg-amber-500', bg: 'bg-amber-100', icon: '🤝' },
          ].map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-xl">{skill.icon}</span> {skill.name}
                </span>
                <span className="font-extrabold text-slate-800">{skill.value}%</span>
              </div>
              <div className={`h-4 w-full ${skill.bg} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${skill.color} rounded-full`}
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="text-8xl">🏆</div>
          <div>
            <h3 className="text-3xl font-extrabold mb-2">You're doing amazing!</h3>
            <p className="text-purple-100 font-medium text-lg mb-4">
              Your parents and therapists are so proud of you. Keep playing, learning, and growing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (sessionComplete) {
    return (
      <div className={`min-h-screen bg-slate-50 flex items-center justify-center p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg text-center shadow-2xl border-4 border-green-100 animate-bounce-in relative overflow-hidden">
          <div className="absolute inset-0 bg-green-50 opacity-50"></div>
          <div className="relative z-10">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
              {lang === 'en' ? 'Great job!' : 'أحسنت يا بطل!'}
            </h1>
            <p className="text-lg text-slate-500 mb-8 font-medium">
              {lang === 'en' ? 'Your adventure is complete for today!' : 'انتهت مغامرتك لهذا اليوم!'}
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 font-bold">XP Earned</span>
                <span className="text-xl font-extrabold text-amber-500">⭐ +150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Time</span>
                <span className="text-xl font-extrabold text-sky-600">20 min</span>
              </div>
            </div>
            
            <button 
              onClick={onLogout}
              className="w-full py-5 font-extrabold text-white bg-green-500 rounded-2xl hover:bg-green-400 shadow-lg shadow-green-200 transition-colors text-xl"
            >
              {lang === 'en' ? 'See you next time!' : 'أراك في المرة القادمة!'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const targetChildId = activeChild?.id || activeChildId || (children && children[0]?.id) || 'c1';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetChildId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgUrl = event.target.result as string;
          setSelectedAvatar(imgUrl);
          updateChild(targetChildId, { avatar: imgUrl });
          playAudioFeedback('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfile = () => (
    <div className="space-y-6 max-w-3xl mx-auto pt-4 pb-28 font-sans animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs text-center relative overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-3xl bg-[#ECE8FD] border-4 border-white shadow-md mb-3 flex items-center justify-center text-5xl overflow-hidden group">
            {childAvatar?.startsWith('data:') ? (
              <img src={childAvatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              childAvatar || '👦'
            )}
            
            <label className="absolute inset-0 bg-[#633BE8]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <span className="text-white text-xs font-black">{lang === 'en' ? 'Upload' : 'رفع صورة'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <h3 className="text-2xl font-black text-[#2A2B47] mb-1">{childName}</h3>
          
          <div className="flex items-center gap-2 mb-4">
            <span className={`${currentTheme.class} text-white px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-xs`}>
              ⚡ {lang === 'en' ? `Level ${childLevel}` : `المستوى ${childLevel}`}
            </span>
            <span className="bg-[#FFF7ED] text-[#FFA660] border border-[#FFA660]/30 px-3.5 py-1 rounded-full text-xs font-black">
              🪙 {childCoins} Coins
            </span>
          </div>

          {/* Nickname Input Card */}
          <div className="w-full bg-[#FAFAFD] p-5 rounded-2xl border border-[#ECE8FD] mb-4 text-left">
            <label className="block text-xs font-black text-[#2A2B47] mb-2">{lang === 'en' ? 'My Nickname' : 'اللقب المميز'}</label>
            <input
              type="text"
              value={customNickname !== null ? customNickname : (activeChild?.nickname || '')}
              onChange={(e) => {
                const val = e.target.value;
                setCustomNickname(val);
                if (targetChildId) {
                  updateChild(targetChildId, { nickname: val });
                }
              }}
              placeholder={lang === 'en' ? 'Choose a cool nickname!' : 'اختر لقباً مميزاً!'}
              className={`w-full bg-white border border-[#ECE8FD] rounded-xl px-4 py-2.5 font-bold text-sm text-[#2A2B47] focus:${currentTheme.border} outline-none transition-all`}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Theme Selector */}
          <div className="w-full bg-[#FAFAFD] p-5 rounded-2xl border border-[#ECE8FD] mb-4 text-left">
            <h4 className="font-black text-[#2A2B47] text-xs mb-3">{lang === 'en' ? 'My Theme Color' : 'لوني المفضل'}</h4>
            <div className="flex flex-wrap gap-3">
              {themeColors.map((color) => {
                const isSelectedTheme = (selectedThemeId || activeChild?.themeColor || 'purple') === color.id;
                return (
                  <button 
                    key={color.id}
                    onClick={() => {
                      setSelectedThemeId(color.id);
                      if (targetChildId) {
                        updateChild(targetChildId, { themeColor: color.id });
                        playAudioFeedback('click');
                      }
                    }}
                    className={`w-10 h-10 rounded-2xl ${color.class} ${isSelectedTheme ? `ring-4 ${color.ring} ring-offset-2 scale-110 shadow-lg` : 'hover:scale-105 opacity-70'} transition-all`}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Avatars & Outfits Selector */}
          <div className="w-full bg-[#FAFAFD] p-5 rounded-2xl border border-[#ECE8FD] mb-4 text-left">
            <h4 className="font-black text-[#2A2B47] text-xs mb-3">{lang === 'en' ? 'My Outfits & Avatars' : 'شخصياتي المتاحة'}</h4>
            <div className="grid grid-cols-6 gap-2.5">
              {['🧑', '👧', '👨‍🚀', '🦸‍♀️', '🦁', '🐱'].map((emoji, i) => {
                const isSelectedAvatar = childAvatar === emoji;
                return (
                  <button 
                    key={i}
                    onClick={() => {
                      setSelectedAvatar(emoji);
                      if (targetChildId) {
                        updateChild(targetChildId, { avatar: emoji });
                        playAudioFeedback('click');
                      }
                    }}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${isSelectedAvatar ? `bg-white border-2 ${currentTheme.border} shadow-md scale-110 ring-2 ${currentTheme.ring}/20` : 'bg-white border border-[#ECE8FD] hover:bg-[#ECE8FD] hover:scale-105'}`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <button 
                onClick={() => { playAudioFeedback('click'); setCurrentView('rewards'); }} 
                className={`text-xs font-black ${currentTheme.text} hover:underline flex items-center gap-1`}
              >
                <span>{lang === 'en' ? 'Get more in the Rewards Store' : 'احصل على المزيد من المتجر'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trophies & Achievements Section */}
          <div className="w-full bg-[#FFF7ED] p-5 rounded-2xl border border-[#FFA660]/30 text-left mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-[#FFA660]" />
              <h4 className="font-black text-[#2A2B47] text-sm">
                {lang === 'ar' ? 'الكؤوس والإنجازات (Trophies)' : 'My Trophies & Achievements'}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {d.achievements.map((ach) => (
                <div key={ach.id} className={`bg-white p-3 rounded-xl border flex items-center gap-3 ${ach.locked ? 'opacity-60 border-[#ECE8FD]' : 'border-[#FFA660]/30 shadow-xs'}`}>
                  <span className="text-2xl">{ach.icon}</span>
                  <div>
                    <p className="font-black text-xs text-[#2A2B47]">{lang === 'ar' ? ach.titleAr : ach.title}</p>
                    <p className="text-[10px] text-[#73758C] font-semibold">{ach.locked ? (lang === 'ar' ? '🔒 غير مكتمل' : '🔒 Locked') : (lang === 'ar' ? '🏆 مكتمل' : '🏆 Unlocked')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div className="w-full">
            <button 
              onClick={() => { playAudioFeedback('click'); onLogout(); }}
              className="w-full py-3.5 bg-[#FF6086] hover:bg-[#FF6086]/90 text-white font-black rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تسجيل الخروج من الحساب (Logout)' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-slate-800">{lang === 'en' ? 'Weekly Challenges' : 'تحديات الأسبوع'} 🔥</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Super Speaker', titleAr: 'المتحدث الخارق', desc: 'Complete 5 speech games', progress: 3, total: 5, reward: 100, icon: '🗣️', color: 'text-blue-500' },
          { title: 'Morning Hero', titleAr: 'بطل الصباح', desc: 'Finish morning routine 3 days in a row', progress: 1, total: 3, reward: 50, icon: '☀️', color: 'text-amber-500' },
          { title: 'Focus Master', titleAr: 'سيد التركيز', desc: 'Play matching games for 20 minutes', progress: 15, total: 20, reward: 75, icon: '🧠', color: 'text-purple-500' }
        ].map((challenge, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-sm ${challenge.progress === challenge.total ? 'bg-green-100' : 'bg-slate-100'}`}>
                {challenge.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">{lang === 'en' ? challenge.title : challenge.titleAr}</h3>
                <p className="text-sm text-slate-500">{challenge.desc}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-1">
                <span>{challenge.progress} / {challenge.total}</span>
                <span className="text-amber-500">⭐ +{challenge.reward} XP</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}></div>
              </div>
            </div>
            {challenge.progress < challenge.total ? (
              <button 
                onClick={() => { setCurrentView('games');  }}
                className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                {lang === 'en' ? 'Go to Games' : 'اذهب للألعاب'}
              </button>
            ) : (
              <button className="w-full py-3 bg-green-100 text-green-700 font-bold rounded-xl cursor-default">
                {lang === 'en' ? 'Completed!' : 'مكتمل!'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderHomePlan = () => {
    const completedCount = dailyTasksList.filter(t => t.completed).length;
    const progressPercent = Math.round((completedCount / dailyTasksList.length) * 100);

    const toggleTask = (id: number) => {
      setDailyTasksList(prev => prev.map(t => {
        if (t.id === id) {
          const nextVal = !t.completed;
          if (nextVal) {
            playAudioFeedback('success');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            if (activeChildId) {
              updateChild(activeChildId, { xp: childXp + t.reward, coins: childCoins + 10 });
            }
          }
          return { ...t, completed: nextVal };
        }
        return t;
      }));
    };

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-6 sm:p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl -mt-10 -mr-10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {lang === 'en' ? "Today's Daily Tasks" : 'المهام اليومية (Daily Tasks)'} 📝
            </h2>
            <p className="text-emerald-50 font-medium text-sm sm:text-base">
              {lang === 'en' ? 'Complete your daily checklist to earn XP & Coins!' : 'أنجز مهامك اليومية واكسب النقاط والعملات!'}
            </p>
          </div>
          <div className="relative z-10 text-right bg-white/20 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-xs font-bold mb-1 uppercase tracking-wider">
              {lang === 'en' ? 'Tasks Done' : 'المهام المنجزة'}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">{completedCount}</span>
              <span className="text-lg opacity-80">/ {dailyTasksList.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
          <span className="text-xs font-bold text-slate-600 shrink-0">
            {lang === 'en' ? 'Daily Progress' : 'التقدم اليومي'} ({progressPercent}%)
          </span>
          <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Interactive Task Checklist */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-emerald-500" /> 
            {lang === 'en' ? 'Your Daily Checklist' : 'قائمة المهام اليومية'}
          </h3>
          <div className="space-y-3">
            {dailyTasksList.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${task.completed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow-xs'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' : 'border-slate-300 bg-slate-50 text-transparent'}`}>
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-base sm:text-lg ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                      {task.icon} {lang === 'en' ? task.title : task.titleAr}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{task.type}</span>
                      <span className="text-[11px] font-bold text-slate-400">⏱️ {task.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                    + {task.reward} XP ⭐
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-[100dvh] overflow-hidden ${currentTheme.bgOuter} flex justify-center`}>
      <div style={{fontFamily: "\"Fredoka\", sans-serif"}} className={`w-full max-w-4xl h-full flex flex-col relative child-portal-root ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Bar & Session HUD */}
      <header className="fixed top-0 w-full max-w-4xl bg-white/95 backdrop-blur-md border-b-4 border-slate-100 px-4 py-3 z-50 shadow-sm flex flex-col gap-2 pt-safe">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 text-indigo-600 font-extrabold text-xl sm:text-2xl tracking-tight">
          <Zap className="w-8 h-8 fill-current drop-shadow-md text-amber-400" />
          <span className="hidden sm:inline bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Looply Play</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('profile'); }}
            className="flex items-center gap-2 pr-4 pl-1 py-1 rounded-full font-bold transition-all bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden bg-white border-2 border-slate-200">
                  {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-slate-700 rounded-full p-0.5 border-2 border-white shadow-sm flex items-center justify-center">
                 <SettingsIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start leading-none ml-1">
                <span className="text-sm font-extrabold text-indigo-700">{childName}</span>
                <span className="text-[10px] text-purple-600 font-black uppercase mt-1">Lvl {childLevel} <span className="text-amber-500">{Math.round((childXp % 500) / 500 * 100)}%</span></span>
            </div>
          </button>
          
          {/* Sound Mute Toggle Button */}
          <button
            onClick={() => {
              const nextMute = toggleAudioMute();
              setIsMuted(nextMute);
            }}
            className={`p-2.5 rounded-full font-bold transition-all shadow-md ${isMuted ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-sky-100 text-sky-700 border border-sky-200 hover:bg-sky-200'}`}
            title={isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute Sound') : (lang === 'ar' ? 'كتم الصوت' : 'Mute Sound')}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('rewards'); }}
            className="flex items-center justify-center p-2 rounded-full font-bold transition-all bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/20 group"
          >
            <Gift className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
        </div>

        {/* HUD Displayed across all views during active 20-minute child session */}
        {isRecording && (
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between bg-slate-950 text-white rounded-2xl p-2.5 px-4 shadow-md border border-slate-800 animate-fade-in">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-red-400 text-xs font-black tracking-wider">{lang === 'en' ? 'REC' : 'جاري التسجيل'}</span>
             </div>
             
             <div className="text-red-400 font-mono font-black text-base sm:text-lg tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                ⏱️ {formatTime(recordingTime)}
             </div>

             <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/40">
                <span className="text-emerald-400 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">{lang === 'en' ? '20 MIN SESSION' : 'جلسة ألعاب (20 دقيقة)'}</span>
             </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 transition-all duration-300 overflow-y-auto relative z-10" style={{ paddingTop: "150px", paddingBottom: "150px" }}>
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'games' && renderGames()}
        {currentView === 'goals' && renderGoals()}
        {currentView === 'schedule' && renderSchedule()}
        {currentView === 'achievements' && renderAchievements()}
        {currentView === 'rewards' && renderRewards()}
        {currentView === 'tokenboard' && renderTokenBoards()}
        {currentView === 'messages' && renderMessages()}
        {currentView === 'progress' && renderProgress()}
        {currentView === 'profile' && renderProfile()}
        {currentView === 'challenges' && renderChallenges()}
        {currentView === 'homeplan' && renderHomePlan()}
        {currentView === 'feel-good' && renderFeelGoodCorner()}
        {currentView === 'achieved' && renderAchieved()}
      
      {showWinModal && (
        <GameWinModal 
           score={100} 
           xp={winStats.xp} 
           coins={winStats.coins} 
           gems={winStats.gems}
           onHome={() => {
              setShowWinModal(false);
              setPlayingGame(null);
              setCurrentView('dashboard');
           }}
        />
      )}

</main>

      {/* Draggable / Minimizable Camera Widget */}
      {isRecording && (
        <motion.div 
          drag 
          dragMomentum={false}
          dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
          style={{ position: 'fixed', bottom: '120px', right: '16px', zIndex: 50 }}
          className={`transition-all duration-300 ease-in-out cursor-grab active:cursor-grabbing`}
        >
          {isCameraMinimized ? (
            <button 
              onClick={() => setIsCameraMinimized(false)}
              className="bg-slate-800 text-white rounded-full p-2 pr-4 flex items-center gap-2 shadow-xl border-2 border-slate-700 hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              </div>
              <span className="font-bold text-sm">{formatTime(recordingTime)}</span>
            </button>
          ) : (
            <div className="w-32 sm:w-40 rounded-2xl overflow-hidden border-[3px] border-white shadow-2xl bg-slate-800 flex flex-col group cursor-move">
              <div className="relative h-24 sm:h-28 w-full bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transform -scale-x-100" 
                />
                <button 
                  onClick={() => setIsCameraMinimized(true)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  {formatTime(recordingTime)}
                </div>
              </div>
              <div className="p-1.5 sm:p-2 bg-[#2A2E35] flex items-center justify-center border-t border-slate-700">
                <div className="text-emerald-400 text-[9px] uppercase font-bold flex items-center gap-1 w-full justify-center">
                  <Camera className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Game REC' : 'تسجيل اللعبة'}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Fixed Child Bottom Navigation Bar (Including Games 🎮) */}
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-[96%] sm:max-w-xl z-40">
        <nav className="bg-white/95 backdrop-blur-md rounded-3xl px-2 sm:px-4 py-2.5 shadow-[0_10px_35px_rgba(99,59,232,0.15)] border border-[#ECE8FD] flex justify-between items-center overflow-x-auto no-scrollbar gap-1">
          {[
            { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />, label: lang === 'en' ? 'Dashboard' : 'الرئيسية' },
            { id: 'games', icon: <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#633BE8]" />, label: lang === 'en' ? 'Games' : 'الألعاب' },
            { id: 'goals', icon: <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />, label: lang === 'en' ? 'Tasks' : 'المهام' },
            { id: 'schedule', icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, label: lang === 'en' ? 'Calendar' : 'التقويم' },
            { id: 'progress', icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />, label: lang === 'en' ? 'Progress' : 'التقدم' },
            { id: 'profile', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, label: lang === 'en' ? 'Profile' : 'الملف' },
          ].map((item) => {
            const isActive = currentView === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  playAudioFeedback('click');
                  speakVoice(item.label, lang);
                }}
                className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2.5 sm:px-3 py-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-[#633BE8] text-white shadow-xs scale-105' : 'text-[#73758C] hover:bg-[#ECE8FD] hover:scale-105'}`}
              >
                <div className={`${isActive ? 'text-white' : 'text-[#73758C]'} transition-colors`}>
                  {item.icon}
                </div>
                <span className={`text-[9px] sm:text-[10px] font-black whitespace-nowrap ${isActive ? 'text-white' : 'text-[#73758C]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-in z-50">
          <div className="bg-white text-green-500 rounded-full p-1">
            <Check className="w-5 h-5" />
          </div>
          <span className="font-bold">{lang === 'en' ? 'Awesome job! Keep it up!' : 'عمل رائع! استمر!'}</span>
        </div>
      )}
      </div>
    </div>
  );
}
