import { useState } from 'react';
import { Send, Search, Users, MessageSquare, HelpCircle, X, Plus } from 'lucide-react';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

export function CommunityMessages() {
  const { children } = useSharedData() as any;
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'community' | 'help' | 'messages'>('community');
  const [activeChatIndex, setActiveChatIndex] = useState(0);

  // New Talking Port Form State
  const [showNewPortModal, setShowNewPortModal] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState(lang === 'ar' ? 'الكلام والتواصل' : 'Speech & Language');
  const [newPortTime, setNewPortTime] = useState('10:30');
  const [newPortSnippet, setNewPortSnippet] = useState('');

  const [talkingPortsList, setTalkingPortsList] = useState([
    {
      id: '1',
      title: lang === 'ar' ? 'تجربة ناجحة في تطوير مهارات الكلام اليومية' : 'Successful Milestones in Developing Daily Speech & Vocabulary Skills',
      author: lang === 'ar' ? 'أبو يوسف' : 'Abu Youssef',
      role: lang === 'ar' ? 'ولي أمر متميز 🌟' : 'Speech Support Parent 🌟',
      snippet: lang === 'ar' ? 'بدأنا في استخدام روتين الجمل المكونة من 3 كلمات خلال وجبة الإفطار ولاحظنا تحسناً كبيراً في التعبير الشفهي!' : 'We started using 3-word sentence routines during breakfast and saw incredible improvement in expressive speech!',
      category: lang === 'ar' ? 'الكلام والتواصل' : 'Speech & Language',
      time: '10:30 AM',
      replies: 14,
      likes: 32
    },
    {
      id: '2',
      title: lang === 'ar' ? 'كيفية استخدام لوحة النجوم التفاعلية في البيت' : 'How to Effectively Use Home Token Boards for Morning Routines',
      author: lang === 'ar' ? 'أم سارة' : 'Om Sarah',
      role: lang === 'ar' ? 'ولي أمر متميز 🌟' : 'Behavioral Support Parent 🌟',
      snippet: lang === 'ar' ? 'تجميع 5 نجوم للحصول على وقت اللعب الإضافي قلل من زمن التحضير الصباحي إلى النصف. ننصح بها بشدة!' : 'Pairing 5 star slots with immediate visual rewards cut our morning transition time by half. Highly recommend!',
      category: lang === 'ar' ? 'لوحات التعزيز' : 'Token Boards & Behavior',
      time: '02:15 PM',
      replies: 8,
      likes: 25
    },
    {
      id: '3',
      title: lang === 'ar' ? 'تمارين الاستجابة الحسية والتركيز قبل النوم' : 'Sensory Processing Home Activities for Focus & Calmness',
      author: lang === 'ar' ? 'أحمد كمال' : 'David Miller',
      role: lang === 'ar' ? 'ولي أمر متميز 🌟' : 'Occupational Support Parent 🌟',
      snippet: lang === 'ar' ? 'تطبيق تمارين الضغط الفائق قبل النوم ساعد كثيراً على استقرار نوم طفلي وزيادة تركيزه صباحاً.' : 'Deep pressure tactile exercises before bedtime worked wonders for sleep consistency and morning focus this week.',
      category: lang === 'ar' ? 'التمارين المنزلية' : 'Home Exercises',
      time: '08:45 PM',
      replies: 19,
      likes: 47
    }
  ]);

  const handleCreateTalkingPort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle || !newPortTime) return;

    const [hoursStr, minutesStr] = newPortTime.split(':');
    let hours = parseInt(hoursStr || '10', 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutesStr || '00'} ${ampm}`;

    const newPort = {
      id: Date.now().toString(),
      title: newPortTitle,
      author: lang === 'ar' ? 'ولي الأمر' : 'Parent',
      role: lang === 'ar' ? 'ولي أمر متميز 🌟' : 'Parent 🌟',
      snippet: newPortSnippet || (lang === 'ar' ? 'موضوع تواصل ومحاكاة جديد.' : 'New Talking Port discussion created.'),
      category: newPortCategory,
      time: formattedTime,
      replies: 0,
      likes: 1
    };

    setTalkingPortsList([newPort, ...talkingPortsList]);
    setShowNewPortModal(false);
    setNewPortTitle('');
    setNewPortSnippet('');
    setNewPortTime('10:30');
  };

  const faqItems = lang === 'ar' ? [
    {
      q: 'كيف يمكنني متابعة تقدم طفلي في الأهداف والمهام؟',
      a: 'يمكنك التوجه إلى قسم "Tasks / المهام" لتصفح الأهداف المنزلية والأهداف العلاجية المخصصة لطفلك ومتابعة نسبة الإنجاز والمهارات المحققة.'
    },
    {
      q: 'كيف يمكنني التواصل المباشر مع الأخصائي المعالج؟',
      a: 'من خلال تبويب "Messages / الرسائل" اختر اسم الأخصائي المتابع لحالة طفلك لإرسال الرسائل المباشرة أو الاستفسارات الطبية.'
    },
    {
      q: 'كيف أستفيد من لوحات التعزيز (Token Boards)؟',
      a: 'تساعد لوحات التعزيز على تحفيز الطفل لإنجاز السلوكيات الإيجابية والمهام عند تجميع عدد معين من النجوم أو الرموز للحصول على المكافأة.'
    },
    {
      q: 'كيف يتم تحديث بيانات البطاقات والمستندات المرفقة؟',
      a: 'يمكنك الدخول على الملف الشخصي للأهل (Parent Profile) لتحديث صورة البطاقة أو رفع مستندات طبية وتقارير جديدة في أي وقت.'
    }
  ] : [
    {
      q: 'How can I track my child\'s task progress?',
      a: 'Navigate to the "Tasks" section to view home goals and specialized therapy goals tailored for your child.'
    },
    {
      q: 'How can I contact the therapist directly?',
      a: 'Use the "Messages" sub-tab to send direct messages and medical inquiries to your assigned specialist.'
    },
    {
      q: 'How do Token Boards work?',
      a: 'Token boards help motivate children by earning stars/tokens for positive behaviors and completing daily tasks.'
    },
    {
      q: 'How do I update uploaded documents or ID photos?',
      a: 'You can update your ID card photo and child diagnostic documents anytime under Parent Profile.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE8FD] pb-4">
        <div>
          <h2 className="text-2xl font-black text-[#2A2B47]">
            {lang === 'ar' ? 'المجتمع والتواصل' : 'Community & Communication'}
          </h2>
          <p className="text-xs text-[#73758C] font-semibold mt-1">
            {lang === 'ar' 
              ? 'مناقشات المجتمع، مركز المساعدة، والمراسلات المباشرة مع الأخصائيين' 
              : 'Community discussions, Help center, and direct messaging with specialists'}
          </p>
        </div>

        {/* Top Sub-Navigation Tabs inside Community */}
        <div className="flex bg-white rounded-2xl p-1 shadow-xs border border-[#ECE8FD] inline-flex flex-wrap gap-1">
          <button 
            onClick={() => setActiveTab('community')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'community' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            <Users className="w-4 h-4" /> {lang === 'ar' ? 'المجتمع' : 'Community'}
          </button>

          <button 
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'help' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            <HelpCircle className="w-4 h-4" /> {lang === 'ar' ? 'المساعدة' : 'Help'}
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'messages' ? 'bg-[#633BE8] text-white shadow-xs' : 'text-[#73758C] hover:bg-[#ECE8FD]'}`}
          >
            <MessageSquare className="w-4 h-4" /> {lang === 'ar' ? 'المراسلات والتواصل' : 'Communication & Messages'}
          </button>
        </div>
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] flex overflow-hidden min-h-[65vh]">
          <div className="w-80 border-r border-[#ECE8FD] flex flex-col hidden md:flex">
            <div className="p-4 border-b border-[#ECE8FD]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#73758C]" />
                <input type="text" placeholder={lang === 'ar' ? 'ابحث في الرسائل...' : 'Search messages...'} className="w-full bg-[#FAFAFD] rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#633BE8]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {[
                { name: 'Dr. Sarah Smith', role: 'Speech Therapist', status: 'online', time: '10:30 AM' },
                { name: 'Dr. Ahmed Hassan', role: 'Occupational Therapist', status: 'offline', time: 'Yesterday' },
                { name: 'Support Team', role: 'Looply Care', status: 'online', time: '2 days ago' },
              ].map((chat, idx) => (
                <div key={idx} onClick={() => setActiveChatIndex(idx)} className={`p-4 border-b border-[#ECE8FD] cursor-pointer hover:bg-[#ECE8FD]/40 transition-colors ${activeChatIndex === idx ? 'bg-[#ECE8FD]' : ''}`}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-[#2A2B47] text-xs">{chat.name}</h4>
                    <span className="text-[10px] text-[#73758C] font-semibold">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-[#73758C] mt-0.5">{chat.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between p-6">
            <div className="border-b border-[#ECE8FD] pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-black text-[#2A2B47] text-sm">Dr. Sarah Smith</h3>
                <p className="text-xs text-[#70E4BE] font-bold">● Active Now</p>
              </div>
            </div>
            
            <div className="py-6 space-y-4">
              <div className="bg-[#ECE8FD] text-[#2A2B47] p-4 rounded-2xl max-w-md text-xs font-semibold">
                {lang === 'ar' ? 'أهلاً بك! لقد أظهر طفلك نجاحاً ممتعاً في جلسة اليوم بالتحدث واستخدام مجسمات الكلمات.' : 'Hello! Your child showed great progress in today’s speech session.'}
              </div>
            </div>

            <div className="flex gap-2 border-t border-[#ECE8FD] pt-4">
              <input type="text" placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message...'} className="flex-1 bg-[#FAFAFD] border border-[#ECE8FD] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#633BE8]" />
              <button className="bg-[#633BE8] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#9C7AF2] transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE8FD] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#ECE8FD] pb-4">
              <div>
                <h3 className="text-xl font-black text-[#2A2B47] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#633BE8]" />
                  {lang === 'ar' ? 'نقاشات وتجارب أسر الهمم' : 'Parent Discussions & Community Feed'}
                </h3>
                <p className="text-xs text-[#73758C] font-semibold mt-1">
                  {lang === 'ar' 
                    ? 'تواصل مع أسر الهمم، شارك القصص الناجحة واستفد من التجارب اليومية' 
                    : 'Connect with experienced parents, share milestone stories, and exchange daily therapy tips.'}
                </p>
              </div>
              
              <button 
                onClick={() => setShowNewPortModal(true)}
                className="px-5 py-2.5 bg-[#633BE8] text-white rounded-2xl font-black text-xs hover:bg-[#9C7AF2] transition-colors flex items-center gap-2 shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                {lang === 'ar' ? '+ New Talking Port' : '+ New Talking Port'}
              </button>
            </div>

            {/* Category Tags */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
              {[
                lang === 'ar' ? 'الكل' : 'All Discussions',
                lang === 'ar' ? 'الكلام والتواصل' : 'Speech & Language',
                lang === 'ar' ? 'لوحات التعزيز والسلوك' : 'Token Boards & Behavior',
                lang === 'ar' ? 'التمارين المنزلية' : 'Home Exercises',
                lang === 'ar' ? 'قصص النجاح' : 'Success Stories',
              ].map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${idx === 0 ? 'bg-[#633BE8] text-white shadow-xs' : 'bg-[#FAFAFD] text-[#73758C] border border-[#ECE8FD] hover:bg-[#ECE8FD]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts / Talking Ports List */}
          <div className="space-y-4">
            {talkingPortsList.map((post, i) => (
              <div key={post.id || i} className="bg-white rounded-3xl p-6 border border-[#ECE8FD] shadow-xs hover:border-[#633BE8] transition-all space-y-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#ECE8FD] text-[#633BE8] font-black flex items-center justify-center text-sm shadow-xs border border-[#633BE8]/20">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-[#2A2B47] text-sm flex items-center gap-2">
                        {post.author}
                        <span className="text-[10px] bg-[#ECE8FD] text-[#633BE8] px-2.5 py-0.5 rounded-full font-bold">
                          {post.role}
                        </span>
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#73758C] font-semibold flex items-center gap-1">
                          ⏰ {post.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#633BE8] bg-[#FAFAFD] border border-[#ECE8FD] px-3 py-1 rounded-full self-start sm:self-auto">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-black text-[#2A2B47] text-base hover:text-[#633BE8] transition-colors cursor-pointer pt-1">
                  {post.title}
                </h3>

                <p className="text-xs text-[#73758C] font-semibold leading-relaxed">
                  {post.snippet}
                </p>

                <div className="flex items-center gap-4 text-xs font-extrabold text-[#73758C] pt-3 border-t border-[#ECE8FD]">
                  <button className="flex items-center gap-1.5 hover:text-[#FF6086] transition-colors bg-[#FAFAFD] px-3 py-1.5 rounded-xl border border-[#ECE8FD]">
                    ❤️ {post.likes} {lang === 'ar' ? 'إعجاب' : 'Likes'}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#633BE8] transition-colors bg-[#FAFAFD] px-3 py-1.5 rounded-xl border border-[#ECE8FD]">
                    💬 {post.replies} {lang === 'ar' ? 'رد' : 'Replies'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Talking Port Creation Modal with Time Field */}
      {showNewPortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#ECE8FD] animate-fade-in">
            <div className="p-5 bg-[#ECE8FD] border-b border-[#9C7AF2]/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#633BE8] text-white flex items-center justify-center font-bold">
                  🎙️
                </div>
                <h3 className="text-base font-black text-[#2A2B47]">
                  {lang === 'ar' ? 'إنشاء New Talking Port' : 'Create New Talking Port'}
                </h3>
              </div>
              <button onClick={() => setShowNewPortModal(false)} className="p-2 text-[#73758C] hover:text-[#2A2B47] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTalkingPort} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                  {lang === 'ar' ? 'عنوان موضوع التواصل (Title)' : 'Talking Port Title'}
                </label>
                <input 
                  required 
                  type="text" 
                  value={newPortTitle} 
                  onChange={e => setNewPortTitle(e.target.value)} 
                  className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold" 
                  placeholder={lang === 'ar' ? 'مثال: روتين الجمل اليومية وتطوير النطق' : 'e.g. Daily Speech & Vocabulary Routine'} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                    {lang === 'ar' ? 'التصنيف (Category)' : 'Category'}
                  </label>
                  <select 
                    value={newPortCategory} 
                    onChange={e => setNewPortCategory(e.target.value)}
                    className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold"
                  >
                    <option value={lang === 'ar' ? 'الكلام والتواصل' : 'Speech & Language'}>{lang === 'ar' ? 'الكلام والتواصل' : 'Speech & Language'}</option>
                    <option value={lang === 'ar' ? 'لوحات التعزيز' : 'Token Boards & Behavior'}>{lang === 'ar' ? 'لوحات التعزيز' : 'Token Boards'}</option>
                    <option value={lang === 'ar' ? 'التمارين المنزلية' : 'Home Exercises'}>{lang === 'ar' ? 'التمارين المنزلية' : 'Home Exercises'}</option>
                    <option value={lang === 'ar' ? 'قصص النجاح' : 'Success Stories'}>{lang === 'ar' ? 'قصص النجاح' : 'Success Stories'}</option>
                  </select>
                </div>

                {/* Explicit Time Field for New Talking Port */}
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                    ⏰ {lang === 'ar' ? 'الوقت (Time)' : 'Time'}
                  </label>
                  <input 
                    required 
                    type="time" 
                    value={newPortTime} 
                    onChange={e => setNewPortTime(e.target.value)} 
                    className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-extrabold" 
                  />
                </div>
              </div>

              {/* Time Preview */}
              <div className="bg-[#ECE8FD]/60 p-3 rounded-xl border border-[#633BE8]/20 flex items-center justify-between text-xs font-extrabold text-[#633BE8]">
                <span>⏰ {lang === 'ar' ? 'الوقت المحدد للـ Talking Port:' : 'Selected Talking Port Time:'}</span>
                <span className="bg-white px-2.5 py-1 rounded-lg shadow-xs">{newPortTime}</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                  {lang === 'ar' ? 'تفاصيل الموضوع (Snippet / Details)' : 'Details & Notes'}
                </label>
                <textarea 
                  value={newPortSnippet} 
                  onChange={e => setNewPortSnippet(e.target.value)} 
                  className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold min-h-[80px]" 
                  placeholder={lang === 'ar' ? 'اكتب باختصار محتوى هذا الـ Talking Port...' : 'Enter details about this Talking Port...'}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowNewPortModal(false)} 
                  className="flex-1 py-3 bg-[#FAFAFD] border border-[#ECE8FD] text-[#73758C] font-black rounded-xl text-xs"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#633BE8] text-white font-black rounded-xl text-xs hover:bg-[#9C7AF2] transition-colors shadow-md"
                >
                  {lang === 'ar' ? 'حفظ الـ Talking Port' : 'Save Talking Port'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help & Support Tab */}
      {activeTab === 'help' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE8FD] shadow-xs space-y-4">
            <h3 className="text-lg font-black text-[#2A2B47] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#633BE8]" />
              {lang === 'ar' ? 'مركز الأسئلة الشائعة والدعم الفني' : 'Help & Frequently Asked Questions'}
            </h3>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="p-4 bg-[#FAFAFD] border border-[#ECE8FD] rounded-2xl space-y-1.5">
                  <h4 className="font-extrabold text-[#2A2B47] text-xs flex items-center gap-2">
                    ❓ {item.q}
                  </h4>
                  <p className="text-xs text-[#73758C] font-semibold pr-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
