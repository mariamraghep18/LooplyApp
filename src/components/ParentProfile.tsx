import React, { useState } from 'react';
import { useSharedData } from '../shared/SharedData';
import { User, ArrowLeft, Check, Lock, Briefcase, Home } from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';

export function ParentProfile({ onBack }: { onBack: () => void }) {
  const { parentProfile, setParentProfile, children: _children, updateChild, activeChildId } = useSharedData() as any;
  const { lang } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');

  // Parent Profile Fields
  const [profileData, setProfileData] = useState({
    id: parentProfile?.id || 'parent1',
    fullName: parentProfile?.fullName || (lang === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali'),
    email: parentProfile?.email || 'parent@example.com',
    phone: parentProfile?.phone || '+20 100 123 4567',
    occupation: parentProfile?.occupation || (lang === 'ar' ? 'مهندس كمبيوتر' : 'Software Engineer'),
    city: parentProfile?.city || (lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'),
    address: parentProfile?.address || (lang === 'ar' ? 'التجمع الخامس، الحي الأول' : '1st District, New Cairo'),
    profilePhoto: parentProfile?.profilePhoto || ''
  });

  const handleSave = () => {
    setParentProfile({ ...parentProfile, ...profileData });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileData({ ...profileData, profilePhoto: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFD] text-[#2A2B47] p-4 sm:p-8 pt-safe pb-28 animate-fade-in font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Back Button */}
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-2 text-[#73758C] hover:text-[#633BE8] font-bold text-xs sm:text-sm bg-white px-4 py-2 rounded-xl border border-[#ECE8FD] shadow-xs transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'ar' ? 'العودة للوحة التحكم الرئيسية' : 'Back to Dashboard'}
        </button>

        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-[#633BE8] via-[#9C7AF2] to-[#FF6086] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 overflow-hidden flex items-center justify-center text-3xl shrink-0 shadow-lg relative group">
                {profileData.profilePhoto ? (
                  <img src={profileData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold text-white">
                  {lang === 'ar' ? 'تغيير' : 'Upload'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black">{profileData.fullName}</h1>
                <p className="text-white/90 text-xs sm:text-sm font-medium mt-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {profileData.occupation}
                </p>
                <p className="text-white/80 text-xs font-medium mt-0.5 flex items-center gap-2">
                  <Home className="w-4 h-4" /> {profileData.city}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-[#633BE8] hover:bg-[#ECE8FD] px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all shrink-0"
            >
              {isEditing ? (lang === 'ar' ? 'إلغاء التعديل' : 'Cancel Editing') : (lang === 'ar' ? 'تعديل البروفايل' : 'Edit Profile')}
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="bg-[#70E4BE]/20 border-2 border-[#70E4BE] text-[#2A2B47] px-6 py-4 rounded-2xl font-bold flex items-center gap-3 animate-fade-in shadow-sm">
            <Check className="w-6 h-6 text-emerald-600" />
            <span>{lang === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Profile changes saved successfully!'}</span>
          </div>
        )}

        {/* Profile Main Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE8FD] shadow-xs space-y-6">
          <h2 className="text-xl font-extrabold text-[#2A2B47] flex items-center gap-2 border-b border-[#ECE8FD] pb-4">
            <User className="w-6 h-6 text-[#633BE8]" />
            {lang === 'ar' ? 'بيانات ولي الأمر الشخصية ومكان السكن' : 'Parent Profile & Address Details'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.fullName}
                onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={profileData.email}
                onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'رقم الهاتف المحمول' : 'Phone Number'}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.phone}
                onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'الوظيفة / المسمى الوظيفي' : 'Occupation / Job Title'}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.occupation}
                onChange={e => setProfileData({ ...profileData, occupation: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
                placeholder={lang === 'ar' ? 'مثال: مهندس كمبيوتر / معلم' : 'e.g. Software Engineer / Teacher'}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'السكن / المدينة' : 'Residence / City'}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.city}
                onChange={e => setProfileData({ ...profileData, city: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
                placeholder={lang === 'ar' ? 'مثال: القاهرة، مصر' : 'e.g. Cairo, Egypt'}
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#2A2B47] mb-2">
                {lang === 'ar' ? 'العنوان التفصيلي' : 'Detailed Address'}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.address}
                onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full p-3.5 border border-slate-200 rounded-2xl bg-[#FAFAFD] text-sm font-semibold focus:border-[#633BE8] focus:bg-white transition-all disabled:opacity-85"
                placeholder={lang === 'ar' ? 'مثال: التجمع الخامس، شارع التسعين' : 'e.g. 90th Street, New Cairo'}
              />
            </div>
          </div>

          {/* Child Security Section */}
          <div className="p-5 bg-[#ECE8FD]/50 rounded-2xl border border-[#9C7AF2]/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div>
              <h3 className="font-bold text-[#2A2B47] text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#633BE8]" />
                {lang === 'ar' ? 'أمان حساب الطفل (رمز PIN المكون من 4 أرقام)' : 'Child Portal Security (4-Digit PIN)'}
              </h3>
              <p className="text-xs text-[#73758C] mt-0.5">
                {lang === 'ar' ? 'تعديل وتحديث الرمز السري الخاص بدخول الطفل إلى بورتال الألعاب' : 'Update the 4-digit PIN code used for child portal access.'}
              </p>
            </div>
            <button
              onClick={() => setShowPinModal(true)}
              className="px-5 py-2.5 bg-[#633BE8] text-white font-extrabold text-xs rounded-xl hover:bg-[#9C7AF2] transition-colors shrink-0"
            >
              {lang === 'ar' ? 'تحديث رمز PIN' : 'Update Child PIN'}
            </button>
          </div>

          {isEditing && (
            <div className="pt-4 border-t border-[#ECE8FD] flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-2xl bg-slate-100 text-[#73758C] font-bold text-sm hover:bg-slate-200"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-2xl bg-[#633BE8] text-white font-black text-sm shadow-md hover:bg-[#9C7AF2] transition-colors"
              >
                {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Child PIN Update Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative border border-[#ECE8FD]">
            <h3 className="text-xl font-black text-[#2A2B47] mb-2">{lang === 'en' ? 'Change Child PIN' : 'تحديث رمز دخول الطفل (PIN)'}</h3>
            <p className="text-xs text-[#73758C] mb-6">{lang === 'en' ? 'Enter a new 4-digit PIN for your child.' : 'أدخل رمزاً جديداً مكوناً من 4 أرقام.'}</p>
            <input 
              type="text" 
              maxLength={4} 
              value={newPin} 
              onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))} 
              className="w-full text-center text-3xl font-extrabold tracking-[1em] p-4 border-2 border-[#ECE8FD] rounded-2xl mb-6 focus:border-[#633BE8] focus:outline-none" 
              placeholder="••••"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPinModal(false)} 
                className="flex-1 py-3 bg-slate-100 text-[#73758C] font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                {lang === 'en' ? 'Cancel' : 'إلغاء'}
              </button>
              <button 
                onClick={() => {
                  if (newPin.length === 4 && activeChildId) {
                    updateChild(activeChildId, { pin: newPin });
                    setShowPinModal(false);
                    setNewPin('');
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }
                }} 
                className="flex-1 py-3 bg-[#633BE8] text-white font-black rounded-xl hover:bg-[#9C7AF2] transition-colors"
              >
                {lang === 'en' ? 'Save PIN' : 'حفظ الرمز'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
