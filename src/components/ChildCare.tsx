import { useState, FormEvent } from 'react';
import { CheckCircle2, Home, Clock, ListTodo, Plus, Target, Check, Play, Activity as ActivityIcon, Video, Brain, Heart, Zap, X, Trophy, Star } from 'lucide-react';
import { useSharedData, Goal } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

export function Plan() {
  const { goals, children } = useSharedData() as any;
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home' | 'therapeutics'>('home');
  const [statusFilter, setStatusFilter] = useState<'inprogress' | 'achieved'>('inprogress');

  return (
    <div className="space-y-6 animate-fade-in font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      <div className="flex justify-between items-center border-b border-[#ECE8FD] pb-4">
        <h2 className="text-2xl font-black text-[#2A2B47]">
          {lang === 'ar' ? 'مهام الطفل والتحصيل (Tasks)' : "Child's Tasks & Goals"}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex bg-white rounded-2xl p-1 shadow-xs border border-[#ECE8FD] inline-flex">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all ${activeTab === 'home' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            {lang === 'ar' ? 'الأهداف المنزلية' : 'Home Goals'}
          </button>
          <button 
            onClick={() => setActiveTab('therapeutics')}
            className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all ${activeTab === 'therapeutics' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            {lang === 'ar' ? 'أهداف التأهيل والعلاج' : 'Therapy & Rehab Goals'}
          </button>
        </div>

        <div className="flex bg-white rounded-2xl p-1 shadow-xs border border-[#ECE8FD] inline-flex">
          <button 
            onClick={() => setStatusFilter('inprogress')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all ${statusFilter === 'inprogress' ? 'bg-[#ECE8FD] text-[#633BE8]' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            {lang === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
          </button>
          <button 
            onClick={() => setStatusFilter('achieved')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all ${statusFilter === 'achieved' ? 'bg-[#70E4BE]/30 text-[#2A2B47]' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            {lang === 'ar' ? 'تم إنجازه' : 'Achieved'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.filter(g => {
          const matchesTab = activeTab === 'home' ? g.goalType !== 'therapeutics' : g.goalType === 'therapeutics';
          const isAchieved = g.progress >= g.target || g.status === 'mastered';
          const matchesStatus = statusFilter === 'achieved' ? isAchieved : !isAchieved;
          return matchesTab && matchesStatus;
        }).map(goal => (
          <div key={goal.id} className="bg-white rounded-3xl p-6 shadow-xs border border-[#ECE8FD] hover:border-[#633BE8] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-black text-[#633BE8] bg-[#ECE8FD] px-3 py-1 rounded-full mb-2 inline-block border border-[#633BE8]/20">{goal.category}</span>
                <h3 className="font-black text-[#2A2B47] text-lg">{goal.title}</h3>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs font-extrabold mb-1.5">
                <span className="text-[#73758C]">Progress</span>
                <span className="text-[#2A2B47] font-black">{goal.progress} / {goal.target}</span>
              </div>
              <div className="w-full bg-[#ECE8FD] rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#633BE8] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (goal.progress / goal.target) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenBoards() {
  const { tokenBoards, addTokenBoard, children, activeChildId } = useSharedData();
  const { lang } = useLanguage();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [targetTokens, setTargetTokens] = useState(5);
  const [tokenSymbol, setTokenSymbol] = useState('⭐');
  const [rewardText, setRewardText] = useState('');
  const [rewardSymbol, setRewardSymbol] = useState('🎮');
  const [boardTime, setBoardTime] = useState('10:00');
  const [childId, setChildId] = useState('');

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!childId && children.length > 0) {
      setChildId(children[0].id);
    }

    const [hoursStr, minutesStr] = boardTime.split(':');
    let hours = parseInt(hoursStr || '10', 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutesStr || '00'} ${ampm}`;

    addTokenBoard({
      childId: childId || (children[0]?.id || ''),
      name,
      targetTokens,
      tokenSymbol,
      rewardText,
      rewardSymbol,
      time: formattedTime
    });
    setShowAdd(false);
    setName(''); setTargetTokens(5); setRewardText(''); setBoardTime('10:00');
  };

  const currentBoards = tokenBoards.filter(b => b.childId === (activeChildId || children[0]?.id));

  return (
    <div className="space-y-6 animate-fade-in font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE8FD] pb-4">
        <h2 className="text-2xl font-black text-[#2A2B47] flex items-center gap-2">
          <Star className="w-6 h-6 text-[#FFA660] fill-current" />
          {lang === 'ar' ? 'لوحات التعزيز والمكافآت (Token Boards)' : 'Token Boards & Rewards'}
        </h2>
        <button 
          onClick={() => setShowAdd(true)}
          className="px-5 py-2.5 bg-[#633BE8] text-white rounded-2xl font-black hover:bg-[#9C7AF2] transition-colors flex items-center justify-center gap-2 shadow-xs text-xs"
        >
          <Plus className="w-4 h-4" /> {lang === 'ar' ? 'إنشاء لوحة تعزيز جديدة' : 'New Token Board'}
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#ECE8FD]">
            <div className="p-6 bg-[#ECE8FD] border-b border-[#9C7AF2]/20 flex justify-between items-center">
              <h3 className="text-lg font-black text-[#2A2B47] flex items-center gap-2"><Trophy className="w-5 h-5 text-[#FFA660]" /> {lang === 'ar' ? 'إنشاء لوحة تعزيز جديدة' : 'New Token Board'}</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 text-[#73758C] hover:text-[#2A2B47] rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-5">
              {children.length > 0 && (
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'اختر الطفل' : 'Select Child'}</label>
                  <select value={childId} onChange={e => setChildId(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-xs font-bold text-[#2A2B47]">
                     <option value="" disabled>Select a child...</option>
                    {children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'اسم اللوحة' : 'Board Name'}</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-xs font-semibold text-[#2A2B47]" placeholder="e.g. Morning Routine" />
              </div>
              
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                  ⏰ {lang === 'ar' ? 'الوقت' : 'Scheduled Time'}
                </label>
                <input 
                  required 
                  type="time" 
                  value={boardTime} 
                  onChange={e => setBoardTime(e.target.value)} 
                  className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-extrabold" 
                />
              </div>

              <div className="bg-[#ECE8FD]/60 p-2.5 rounded-xl border border-[#633BE8]/20 flex items-center justify-between text-xs font-extrabold text-[#633BE8]">
                <span>⏰ {lang === 'ar' ? 'الوقت المحدد للوحة:' : 'Selected Time:'}</span>
                <span className="bg-white px-2.5 py-0.5 rounded-lg shadow-xs">{boardTime}</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">{lang === 'ar' ? `عدد النجوم المطلوبة (${targetTokens})` : `Tokens to Earn (${targetTokens})`}</label>
                <input type="range" min="2" max="10" value={targetTokens} onChange={e => setTargetTokens(parseInt(e.target.value))} className="w-full accent-[#633BE8]" />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">{lang === 'ar' ? 'رمز النجم التفاعلي' : 'Token Symbol'}</label>
                <div className="flex gap-2 flex-wrap">
                  {['🌟', '⭐', '🏆', '❤️', '🎯', '🎪', '🌈', '🦄', '🐲', '🚀'].map(sym => (
                    <button type="button" key={sym} onClick={() => setTokenSymbol(sym)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${tokenSymbol === sym ? 'bg-[#ECE8FD] border-2 border-[#633BE8] scale-110' : 'bg-[#FAFAFD] border border-[#ECE8FD]'}`}>
                      {sym}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'المكافأة المكتسبة' : 'Reward Text'}</label>
                <input required type="text" value={rewardText} onChange={e => setRewardText(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-xs font-semibold text-[#2A2B47]" placeholder="e.g. Extra game time" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-slate-100 text-[#73758C] font-bold rounded-xl text-xs">
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#633BE8] text-white font-extrabold rounded-xl shadow-xs text-xs hover:bg-[#9C7AF2]">
                  {lang === 'ar' ? 'إنشاء اللوحة' : 'Create Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {currentBoards.length === 0 ? (
        <div className="text-center py-12 text-[#73758C] bg-white rounded-3xl border border-dashed border-[#ECE8FD] font-semibold text-xs">
          {lang === 'ar' ? 'لا توجد لوحة تعزيز نشطة حالياً. أنشئ واحدة لتشجيع طفلك!' : 'No active token boards. Create one to motivate your child!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentBoards.map((board) => (
            <div key={board.id} className="bg-white rounded-3xl p-6 shadow-xs border border-[#ECE8FD] hover:border-[#633BE8] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-[#2A2B47] text-lg mb-1">{board.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#73758C]">
                    <span className="flex items-center gap-1 bg-[#FFF7ED] text-[#D97706] px-3 py-1 rounded-full font-bold border border-[#FDE68A]">
                      {board.rewardSymbol} {board.rewardText}
                    </span>
                    <span className="flex items-center gap-1 bg-[#ECE8FD] text-[#633BE8] px-3 py-1 rounded-full font-bold border border-[#633BE8]/20">
                      ⏰ {board.time || '10:00 AM'}
                    </span>
                  </div>
                </div>
                <div className="font-black text-[#633BE8] bg-[#ECE8FD] px-3 py-1.5 rounded-xl text-xs">
                  {board.currentTokens} / {board.targetTokens}
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-4 bg-[#FAFAFD] p-4 rounded-2xl border border-[#ECE8FD] justify-center">
                {[...Array(board.targetTokens)].map((_, i) => (
                  <div key={i} className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs border-2 transition-all ${i < board.currentTokens ? 'bg-white border-[#FFA660]' : 'bg-[#ECE8FD]/40 border-dashed border-[#ECE8FD] opacity-50'}`}>
                    {i < board.currentTokens ? board.tokenSymbol : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
