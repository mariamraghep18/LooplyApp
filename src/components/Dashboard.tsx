import React, { useState } from 'react';
import { ViewState } from '../types';
import { ArrowRight, Plus, Target, Star, TrendingUp, X, Download } from 'lucide-react';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { children, activeChildId, setActiveChildId, goals, parentProfile, addChild } = useSharedData() as any;
  const { lang } = useLanguage();
  const activeChild = children.find((c: any) => c.id === activeChildId) || children[0];
  
  const messages = {
    emptyFields: {
      ar: "يرجى ملء جميع الحقول المطلوبة",
      en: "Please fill all required fields"
    },
    determinationType: {
      ar: 'طيف التوحد (Autism)',
      en: 'Autism Spectrum'
    }
  };

  const [showAddChild, setShowAddChild] = useState(false);
  
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [newChildGrade, setNewChildGrade] = useState('');
  const [newChildSchool, setNewChildSchool] = useState('');
  const [newChildSchoolType, setNewChildSchoolType] = useState('International');
  const [newChildPin, setNewChildPin] = useState('');
  const [newChildDetermination, setNewChildDetermination] = useState(
    messages.determinationType[lang] || messages.determinationType.en
  );

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName || !newChildAge || !newChildGrade || !newChildSchool) {
      alert(messages.emptyFields[lang] || messages.emptyFields.en);
      return;
    }
    const newId = addChild({
      name: newChildName,
      nickname: newChildName.split(' ')[0],
      age: newChildAge,
      grade: newChildGrade,
      school: newChildSchool,
      schoolType: newChildSchoolType,
      determinationType: newChildDetermination,
      avatar: '👧',
      pin: newChildPin,
    });
    setActiveChildId(newId);
    setShowAddChild(false);
    setNewChildName('');
    setNewChildAge('');
    setNewChildGrade('');
    setNewChildSchool('');
    setNewChildSchoolType('International');
    setNewChildPin('');
    setNewChildDetermination(
      messages.determinationType[lang] || messages.determinationType.en
    );
  };
  
  const activeGoalsCount = goals.filter((g: any) => g.childId === activeChild?.id && g.status !== 'mastered').length;
  const masteredSkillsCount = goals.filter((g: any) => g.childId === activeChild?.id && g.progress >= g.target).length;
  const totalGoals = Math.max(1, goals.filter((g: any) => g.childId === activeChild?.id).length);
  const avgProgress = Math.round(goals.filter((g: any) => g.childId === activeChild?.id).reduce((acc: number, g: any) => acc + (g.progress / g.target), 0) / totalGoals * 100);

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string; size: string }>>([
    { name: 'Medical_Assessment_2026.pdf', type: 'Medical Assessment', size: '1.2 MB' },
    { name: 'Dr_Consultation_Report.pdf', type: 'Doctor Consultation', size: '850 KB' }
  ]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      {/* Hero Banner with Primary Purple & Gradient */}
      <div className="rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #633BE8 0%, #9C7AF2 60%, #FF6086 100%)' }}>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">
            {lang === 'ar' 
              ? `صباح الخير، ${parentProfile?.fullName?.split(' ')[0] || 'ولي الأمر'}!`
              : `Good morning, ${parentProfile?.fullName?.split(' ')[0] || 'Parent'}!`}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[#ECE8FD] text-xs font-bold">
              {lang === 'ar' ? 'الطفل الحالي:' : 'Viewing child:'}
            </span>
            <select 
              value={activeChildId || ''} 
              onChange={(e) => setActiveChildId(e.target.value)}
              className="bg-white/20 border border-white/30 text-white text-xs font-extrabold rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              {children.length === 0 && <option value="" disabled className="text-[#2A2B47]">{lang === 'ar' ? 'لا يوجد أطفال' : 'No children yet'}</option>}
              {children.map((c: any) => (
                <option key={c.id} value={c.id} className="text-[#2A2B47]">{c.name}</option>
              ))}
            </select>
          </div>
          <p className="text-[#ECE8FD] max-w-lg mt-3 text-xs font-medium">
            {lang === 'ar' ? 'إدارة ملفات الأطفال وتتبع تقدمهم والمهام اليومية.' : 'Manage child profiles and track overall progress.'}
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <button onClick={() => setShowAddChild(true)} className="bg-white hover:bg-[#ECE8FD] transition-colors text-[#633BE8] px-5 py-2.5 rounded-2xl font-black flex items-center gap-2 text-xs shadow-md">
            <Plus className="w-4 h-4" /> {lang === 'ar' ? 'إضافة طفل جديد' : 'Add New Child'}
          </button>
        </div>
        
        {/* Decorative Light Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      </div>

      {/* Stats Cards in Brand Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Active Goals */}
        <div className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs flex items-center gap-4 hover:border-[#633BE8] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#ECE8FD] text-[#633BE8] flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#73758C]">
              {lang === 'ar' ? 'الأهداف النشطة' : 'Active Goals'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#2A2B47]">{activeGoalsCount}</p>
          </div>
        </div>

        {/* Card 2: Mastered Skills */}
        <div className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs flex items-center gap-4 hover:border-[#FFA660] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#FFA660] flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-current text-[#FFA660]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#73758C]">
              {lang === 'ar' ? 'المهارات المتقنة' : 'Mastered Skills'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#2A2B47]">{masteredSkillsCount}</p>
          </div>
        </div>

        {/* Card 3: Avg Progress */}
        <div className="bg-white rounded-3xl p-5 border border-[#ECE8FD] shadow-xs flex items-center gap-4 hover:border-[#70E4BE] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#70E4BE]/20 text-[#2A2B47] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-[#633BE8]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#73758C]">
              {lang === 'ar' ? 'متوسط التقدم' : 'Avg Progress'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#2A2B47]">+{avgProgress}%</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE8FD] shadow-xs">
          <div className="flex items-center justify-between mb-6 border-b border-[#ECE8FD] pb-4">
            <h3 className="text-lg font-black text-[#2A2B47]">
              {lang === 'ar' ? 'النشاط والتفاعل الأخير' : 'Recent Activity Log'}
            </h3>
            <button onClick={() => onNavigate('plan')} className="text-xs font-extrabold text-[#633BE8] flex items-center gap-1 hover:text-[#9C7AF2] transition-colors">
              {lang === 'ar' ? 'عرض خطة المهام' : 'View Task Plan'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 shrink-0 w-3.5 h-3.5 rounded-full bg-[#633BE8] ring-4 ring-[#ECE8FD]"></div>
              <div>
                <h4 className="font-extrabold text-[#2A2B47] text-sm">
                  {lang === 'ar' ? 'جلسة علاج وتأهيل' : 'Therapy & Rehabilitation Session'}
                </h4>
                <p className="text-xs text-[#73758C] mt-0.5 mb-1">{lang === 'ar' ? 'اليوم، 10:00 صباحاً' : 'Today, 10:00 AM'}</p>
                <p className="text-xs font-semibold text-[#2A2B47]">
                  {lang === 'ar' ? 'نجح الطفل في التعرف على 5 مجسمات جديدة بنجاح.' : 'The child successfully identified 5 new objects.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 shrink-0 w-3.5 h-3.5 rounded-full bg-[#70E4BE] ring-4 ring-[#70E4BE]/20"></div>
              <div>
                <h4 className="font-extrabold text-[#2A2B47] text-sm">
                  {lang === 'ar' ? 'إنجاز مهمة يومية' : 'Daily Task Completed'}
                </h4>
                <p className="text-xs text-[#73758C] mt-0.5 mb-1">{lang === 'ar' ? 'اليوم، 8:30 صباحاً' : 'Today, 8:30 AM'}</p>
                <p className="text-xs font-semibold text-[#2A2B47]">
                  {lang === 'ar' ? 'تم إنهاء الروتين الصباحي بشكل مستقل.' : 'Morning routine finished independently.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 shrink-0 w-3.5 h-3.5 rounded-full bg-[#FF6086] ring-4 ring-[#FF6086]/20"></div>
              <div>
                <h4 className="font-extrabold text-[#2A2B47] text-sm">
                  {lang === 'ar' ? 'إضافة هدف جديد' : 'New Goal Added'}
                </h4>
                <p className="text-xs text-[#73758C] mt-0.5 mb-1">{lang === 'ar' ? 'أمس' : 'Yesterday'}</p>
                <p className="text-xs font-semibold text-[#2A2B47]">
                  {lang === 'ar' ? 'تمت إضافة هدف "طلب الأشياء بكلمتين".' : 'New goal "Requesting items with 2 words" was added.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Child Modal */}
      {showAddChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#ECE8FD] my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-[#ECE8FD] border-b border-[#9C7AF2]/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#633BE8] text-white flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-[#2A2B47]">{lang === 'ar' ? 'إضافة طفل جديد وتوثيق المستندات' : 'Add New Child & Attach Documents'}</h3>
              </div>
              <button onClick={() => setShowAddChild(false)} className="p-2 text-[#73758C] hover:text-[#2A2B47] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChild} className="p-6 space-y-4 text-left overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
                <input required type="text" value={newChildName} onChange={e => setNewChildName(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold" placeholder="e.g. Sarah Smith" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'العمر' : 'Age'}</label>
                  <input required type="text" value={newChildAge} onChange={e => setNewChildAge(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold" placeholder="e.g. 7" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'الصف الدراسي' : 'Grade'}</label>
                  <input required type="text" value={newChildGrade} onChange={e => setNewChildGrade(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold" placeholder="e.g. 2nd" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'المدرسة / المركز' : 'School / Center'}</label>
                  <input required type="text" value={newChildSchool} onChange={e => setNewChildSchool(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold" placeholder="e.g. Sunshine Academy" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'نوع المدرسة' : 'School Type'}</label>
                  <select required value={newChildSchoolType} onChange={e => setNewChildSchoolType(e.target.value)} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-[#FAFAFD] text-[#2A2B47] text-xs font-semibold">
                    <option value="International">International</option>
                    <option value="National">National</option>
                    <option value="Language School">Language School</option>
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              {/* Child Diagnosis / Special Needs Select List */}
              <div className="bg-[#ECE8FD]/50 p-4 rounded-xl border border-[#9C7AF2]/30">
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">
                  ❤️ {lang === 'ar' ? 'تشخيص الطفل / نوع الهمم' : "Child's Diagnosis / Special Needs"}
                </label>
                <select 
                  required 
                  value={newChildDetermination} 
                  onChange={e => setNewChildDetermination(e.target.value)}
                  className="w-full p-3 border border-[#9C7AF2]/30 rounded-xl bg-white text-[#2A2B47] font-semibold text-xs focus:ring-2 focus:ring-[#633BE8]"
                >
                  <option value="Autism Spectrum / طيف التوحد">Autism Spectrum / طيف التوحد</option>
                  <option value="ADHD / فرط الحركة وتشتت الانتباه">ADHD / فرط الحركة وتشتت الانتباه</option>
                  <option value="Speech Delay / تأخر الكلام والتواصل">Speech Delay / تأخر الكلام والتواصل</option>
                  <option value="Down Syndrome / متلازمة داون">Down Syndrome / متلازمة داون</option>
                  <option value="Learning Difficulties / صعوبات التعلم">Learning Difficulties / صعوبات التعلم</option>
                  <option value="Cerebral Palsy / شلل دماغي">Cerebral Palsy / شلل دماغي</option>
                  <option value="Sensory Processing / اضطراب المعالجة الحسية">Sensory Processing / اضطراب المعالجة الحسية</option>
                  <option value="Hearing Impairment / إعاقة سمعية">Hearing Impairment / إعاقة سمعية</option>
                  <option value="Visual Impairment / إعاقة بصرية">Visual Impairment / إعاقة بصرية</option>
                  <option value="Other / أخرى">Other / أخرى</option>
                </select>
              </div>

              {/* Attachment / Upload Section for Medical & Assessment Documents */}
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-black text-[#2A2B47]">
                    📎 {lang === 'ar' ? 'المستندات والتقارير الطبية (Attachments)' : 'Medical & Assessment Attachments'}
                  </label>
                  <span className="text-[10px] bg-purple-100 text-[#633BE8] font-bold px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'مرفق خياري' : 'Optional'}
                  </span>
                </div>
                <p className="text-[11px] text-[#73758C]">
                  {lang === 'ar' 
                    ? 'إرفاق التقارير الطبية، استشارات الأطباء، التقييمات، والروشتات المتعلقة بحالة الطفل.' 
                    : 'Upload Medical Reports, Doctor Consultations, Assessments & Prescriptions.'}
                </p>

                {/* Document Type Selector & Upload Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select 
                    id="docTypeSelect"
                    className="p-2.5 border border-[#ECE8FD] rounded-xl bg-white text-[#2A2B47] font-extrabold text-xs"
                  >
                    <option value="Medical Report">{lang === 'ar' ? 'تقرير طبي (Medical Report)' : 'Medical Report'}</option>
                    <option value="Doctor Consultation">{lang === 'ar' ? 'استشارة طبيب (Doctor Consultation)' : 'Doctor Consultation'}</option>
                    <option value="Medical Assessment">{lang === 'ar' ? 'تقييم طبي (Medical Assessment)' : 'Medical Assessment'}</option>
                    <option value="Prescription">{lang === 'ar' ? 'روشتة علاجية (Prescription)' : 'Prescription'}</option>
                    <option value="Diagnosis Document">{lang === 'ar' ? 'مستند تشخيص (Diagnosis Doc)' : 'Diagnosis Document'}</option>
                    <option value="Other Document">{lang === 'ar' ? 'مستند آخر (Other Document)' : 'Other Document'}</option>
                  </select>

                  <label className="flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-[#633BE8]/40 rounded-xl bg-white text-[#633BE8] font-extrabold text-xs cursor-pointer hover:bg-[#ECE8FD]/40 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرفاق ملف' : 'Upload File'}</span>
                    <input 
                      type="file" 
                      onChange={(e) => {
                        const selectEl = document.getElementById('docTypeSelect') as HTMLSelectElement;
                        const docType = selectEl ? selectEl.value : 'Medical Document';
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          setUploadedFiles(prev => [...prev, {
                            name: file.name,
                            type: docType,
                            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
                          }]);
                        }
                      }} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.jpg,.png" 
                    />
                  </label>
                </div>

                {/* Attached Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold shadow-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">📄</span>
                          <div className="truncate">
                            <p className="text-[#2A2B47] font-bold truncate">{file.name}</p>
                            <p className="text-[10px] text-[#633BE8] font-extrabold">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(idx)} className="text-rose-500 hover:text-rose-700 p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Integrated Download Report Section inside Add Child Flow */}
              <div className="bg-[#FFF7ED] p-3.5 rounded-2xl border border-[#FDE68A] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#D97706]" />
                  <span className="text-xs font-extrabold text-[#92400E]">
                    {lang === 'ar' ? 'تحميل التقرير الطبي الشامل' : 'Download Complete Child Report'}
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowAddChild(false);
                    onNavigate('report');
                  }}
                  className="bg-[#D97706] text-white text-[11px] font-black px-3.5 py-1.5 rounded-xl hover:bg-[#B45309] transition-colors shadow-xs"
                >
                  {lang === 'ar' ? 'تحميل الآن' : 'Download'}
                </button>
              </div>

              <div className="bg-[#FAFAFD] p-4 rounded-xl border border-[#ECE8FD]">
                <label className="block text-xs font-extrabold text-[#2A2B47] mb-1">{lang === 'ar' ? 'رمز الطفل (4 أرقام PIN)' : '4-Digit Child PIN'}</label>
                <input required type="password" maxLength={4} pattern="\d{4}" value={newChildPin} onChange={e => setNewChildPin(e.target.value.replace(/\D/g, ''))} className="w-full p-3 border border-[#ECE8FD] rounded-xl bg-white text-[#2A2B47] text-center tracking-widest font-mono text-lg font-black" placeholder="••••" />
              </div>

              <button type="submit" className="w-full py-3 bg-[#633BE8] text-white rounded-xl font-extrabold text-xs hover:bg-[#9C7AF2] transition-colors mt-2 shadow-md">
                {lang === 'ar' ? 'حفظ وإضافة الطفل' : 'Save & Add Child'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
