import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Shield, Phone, Upload, Check, Globe, Eye, EyeOff, ChevronLeft, CreditCard } from 'lucide-react';
import { ViewState } from '../types';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';
import { LooplyLogo } from './LooplyLogo';

interface AuthProps {
  onLogin: () => void;
  onNavigate: (view: ViewState) => void;
}

export function Login({ onLogin, onNavigate }: AuthProps) {
  const { lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';
  const [loginMode, setLoginMode] = useState<'email' | 'forgot'>('email');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setLoginMode('email');
    }, 2500);
  };

  return (
    <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-x-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Top Bar with Back Arrow and Logo Header */}
      <div className="w-full max-w-md flex justify-between items-center z-10 pt-2">
        <button 
          onClick={() => onNavigate('portal-selection')}
          className="p-2.5 rounded-2xl bg-white/90 border border-purple-100/80 text-[#7C3AED] hover:bg-white transition-all shadow-xs cursor-pointer"
          title={lang === 'ar' ? 'الرجوع' : 'Back'}
        >
          {isRTL ? <ChevronLeft className="w-5 h-5 rotate-180" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Brand Logo Centered */}
        <div className="flex justify-center transform hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('portal-selection')}>
          <LooplyLogo size="sm" />
        </div>

        {/* Language Toggle */}
        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 border border-purple-100/80 text-[#7C3AED] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-[#7C3AED]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-md relative z-10 animate-fade-in space-y-6 my-auto py-4">
        
        {/* ================= EMAIL & PASSWORD LOGIN (Parent Portal) ================= */}
        {loginMode === 'email' && (
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Waving Purple Mascot Header */}
            <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_12px_32px_rgba(124,58,237,0.15)] border-2 border-purple-100 flex items-center justify-center overflow-hidden">
              <img 
                src="/mascot_waving.png" 
                alt="Waving Purple Mascot" 
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
              />
            </div>

            {/* Title Header */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-[#1E1B4B]">
                {lang === 'ar' ? 'أهلاً بعودتك' : 'Welcome Back'}
              </h1>
              <p className="text-sm font-semibold text-slate-500">
                {lang === 'ar' ? 'سجل الدخول لمتابعة رحلة طفلك' : 'Log in to continue your journey.'}
              </p>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 text-left rtl:text-right space-y-4 shadow-[0_12px_32px_-4px_rgba(124,58,237,0.08)]">
              <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                      className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                    />
                    <Mail className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                    {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      className="w-full h-14 pl-11 pr-11 rtl:pr-11 rtl:pl-11 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                    />
                    <Lock className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 rtl:left-3.5 rtl:right-auto top-4.5 text-slate-400 hover:text-[#7C3AED] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end items-center text-xs font-bold pt-1">
                  <button
                    type="button"
                    onClick={() => setLoginMode('forgot')}
                    className="text-[#7C3AED] hover:text-[#5B21B6] hover:underline cursor-pointer"
                  >
                    {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-2xl text-base font-bold shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Log In'}</span>
                </button>
              </form>
            </div>

            {/* Register Link */}
            <div className="pt-1">
              <p className="text-sm font-medium text-slate-500">
                {lang === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
                <button
                  onClick={() => onNavigate('register')}
                  className="font-bold text-[#7C3AED] hover:underline cursor-pointer"
                >
                  {lang === 'ar' ? 'إنشاء حساب جديد' : 'Sign up'}
                </button>
              </p>
            </div>

          </div>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {loginMode === 'forgot' && (
          <div className="flex flex-col items-center text-center space-y-6">
            
            <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_12px_32px_rgba(124,58,237,0.15)] border-2 border-purple-100 flex items-center justify-center overflow-hidden">
              <img 
                src="/mascot_angry.jpg" 
                alt="Purple Mascot" 
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-[#1E1B4B]">
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
              </h1>
              <p className="text-sm font-semibold text-slate-500 max-w-xs mx-auto leading-relaxed">
                {lang === 'ar' 
                  ? 'لا تقلق! أدخل بريدك الإلكتروني أدناه وسنرسل لك رابط إعادة تعيين كلمة المرور.' 
                  : "Don't worry! Enter your email address below and we'll send you a link to reset it."}
              </p>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white rounded-3xl p-6 shadow-xl border border-purple-100 text-left rtl:text-right space-y-5 shadow-[0_12px_32px_-4px_rgba(124,58,237,0.08)]">
              {resetSent ? (
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 bg-[#7C3AED] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1E1B4B] text-sm">
                    {lang === 'ar' ? 'تم إرسال رابط إعادة التعيين!' : 'Reset Link Sent!'}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'ar' ? 'يرجى التحقق من بريدك الإلكتروني وتتبع التعليمات.' : 'Check your inbox for further instructions.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                      />
                      <Mail className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white rounded-2xl text-base font-bold shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'إرسال رابط التعيين' : 'Send Reset Link'}</span>
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </form>
              )}
            </div>

            <button
              onClick={() => setLoginMode('email')}
              className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
            >
              {lang === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to Login'}
            </button>

          </div>
        )}

      </div>

      <footer className="w-full text-center relative z-20 pb-3 pt-2">
        <p className="text-xs text-purple-900/60 font-medium">
          {lang === 'ar' ? 'منصة لوبلي • حماية وخصوصية تامة' : 'Looply Platform • Safe & Private'}
        </p>
      </footer>
    </div>
  );
}

export function CreateAccount({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { setParentProfile } = useSharedData() as any;
  const { lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePhoto: '',
    faceAuthEnabled: false,
    idCardPhoto: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, idCardPhoto: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [authError, setAuthError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAuthError(lang === 'ar' ? "كلمة المرور غير متطابقة" : "Passwords do not match");
      return;
    }
    setAuthError('');

    setParentProfile({
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      profilePhoto: formData.profilePhoto,
      faceAuthEnabled: formData.faceAuthEnabled,
      idCardPhoto: formData.idCardPhoto,
    });
    
    onNavigate('login');
  };

  return (
    <div className={`min-h-screen bg-pastel-canvas text-[#1E1B4B] flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-x-hidden font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Ambient Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="w-full max-w-lg flex justify-between items-center z-10 pt-2">
        <button 
          onClick={() => onNavigate('login')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 border border-purple-100/80 text-xs font-bold text-[#7C3AED] hover:bg-white transition-all shadow-xs cursor-pointer"
        >
          {isRTL ? <ChevronLeft className="w-4 h-4 rotate-180" /> : <ChevronLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
        </button>

        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/90 border border-purple-100/80 text-[#7C3AED] font-extrabold text-xs shadow-xs hover:bg-purple-50 transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-[#7C3AED]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Form Box */}
      <div className="w-full max-w-lg relative z-10 animate-fade-in space-y-6 my-auto py-4">
        
        {/* Waving Mascot Image Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_12px_32px_rgba(124,58,237,0.15)] border-2 border-purple-100 flex items-center justify-center overflow-hidden mb-2">
            <img 
              src="/mascot_waving.png" 
              alt="Purple Mascot" 
              className="w-full h-full object-contain"
              onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
            />
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold text-[#1E1B4B]">
            {lang === 'ar' ? 'إنشاء حساب جديد' : 'Create an Account'}
          </h1>
          <p className="text-sm font-medium text-slate-500">
            {lang === 'ar' ? 'انضم إلى مجتمعنا الداعم اليوم.' : 'Join our supportive community today.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 space-y-6 shadow-[0_12px_32px_-4px_rgba(124,58,237,0.08)] text-left rtl:text-right">
          <form onSubmit={handleSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-extrabold flex items-center gap-2">
                ⚠️ <span>{authError}</span>
              </div>
            )}
            
            {/* Input: Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Adam Smith"
                  className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                />
                <UserIcon className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
              </div>
            </div>

            {/* Input: Email Address */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="adam@example.com"
                  className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                />
                <Mail className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
              </div>
            </div>

            {/* Grid Inputs: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full h-14 pl-4 pr-10 rtl:pr-4 rtl:pl-10 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 rtl:left-3.5 rtl:right-auto top-4.5 text-slate-400 hover:text-[#7C3AED] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                  {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                  />
                  <Lock className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] mb-1.5">
                {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <div className="relative">
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-14 pl-11 pr-4 rtl:pr-11 rtl:pl-4 rounded-2xl bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100 focus:bg-white transition-all outline-none placeholder-slate-400"
                />
                <Phone className="w-5 h-5 text-purple-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-4.5" />
              </div>
            </div>

            {/* National ID Upload */}
            <div className="p-4 rounded-2xl border space-y-3 bg-purple-50/40 border-purple-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#7C3AED]" />
                <label className="block text-xs font-bold text-[#1E1B4B]">
                  {lang === 'ar' ? 'صورة البطاقة الشخصية' : 'National ID Card Photo'}
                </label>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex-1 border-2 border-dashed border-purple-200 rounded-2xl p-4 bg-white text-center cursor-pointer hover:bg-purple-50 transition-colors flex flex-col items-center justify-center gap-1">
                  <Upload className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-xs font-extrabold text-[#7C3AED]">
                    {lang === 'ar' ? 'رفع صورة البطاقة' : 'Upload ID Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleIdCardUpload} />
                </label>

                {formData.idCardPhoto && (
                  <div className="relative w-16 h-16 rounded-2xl border border-purple-300 overflow-hidden shrink-0 shadow-xs">
                    <img src={formData.idCardPhoto} alt="ID Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Face Recognition Feature Setup */}
            <div className="p-4 rounded-2xl border space-y-2 bg-purple-50/40 border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#7C3AED]" />
                  <label className="block text-xs font-bold text-[#1E1B4B]">
                    👤 {lang === 'ar' ? 'تفعيل بصمة الوجه (Face Recognition)' : 'Face Recognition Security'}
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.faceAuthEnabled} 
                    onChange={(e) => setFormData(prev => ({ ...prev, faceAuthEnabled: e.target.checked }))} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                </label>
              </div>
            </div>

            {/* Primary Action Button */}
            <button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#06B6D4] text-white font-bold rounded-2xl text-lg shadow-[0_10px_25px_-5px_rgba(99,102,241,0.35)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer mt-2"
            >
              <span>{lang === 'ar' ? 'تسجيل الحساب' : 'Register'}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Bottom Switch Footer */}
          <div className="text-center pt-2">
            <p className="text-sm font-normal text-slate-500">
              {lang === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
              <button 
                onClick={() => onNavigate('login')} 
                className="font-bold text-[#7C3AED] hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full text-center relative z-20 pb-3 pt-2">
        <p className="text-xs text-purple-900/60 font-medium">
          {lang === 'ar' ? 'منصة لوبلي • حماية وخصوصية تامة' : 'Looply Platform • Safe & Private'}
        </p>
      </footer>
    </div>
  );
}
