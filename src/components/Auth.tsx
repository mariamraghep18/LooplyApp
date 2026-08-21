import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Shield, Phone, Upload, Paperclip, CreditCard, Heart, Check, Globe, Eye, EyeOff, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8F1FE] text-[#1D1A23] flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans">
      {/* Ambient Decorative Background Glows */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#E9DDFF] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#C9E6FF] rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* Top Bar with Back Arrow and Logo Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 relative z-10">
        <button 
          onClick={() => onNavigate('portal-selection')}
          className="p-2.5 rounded-full bg-white/80 border border-[#6B38D4]/15 text-[#6B38D4] hover:bg-white transition-all shadow-xs"
          title={lang === 'ar' ? 'الرجوع' : 'Back'}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Brand Logo Centered */}
        <div className="flex justify-center transform hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('portal-selection')}>
          <LooplyLogo size="sm" />
        </div>

        {/* Language Toggle */}
        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-[#6B38D4]/20 text-[#6B38D4] font-extrabold text-xs shadow-xs hover:bg-[#F3EBF8] transition-all"
        >
          <Globe className="w-4 h-4 text-[#6B38D4]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-md relative z-10 animate-fade-in space-y-6">
        
        {/* ================= EMAIL & PASSWORD LOGIN (Parent Portal) ================= */}
        {loginMode === 'email' && (
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Waving Purple Mascot Header */}
            <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_8px_20px_rgba(107,56,212,0.15)] border-2 border-white flex items-center justify-center overflow-hidden">
              <img 
                src="/mascot_waving.png" 
                alt="Waving Purple Mascot" 
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
              />
            </div>

            {/* Title Header */}
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-[#1D1A23]">
                {lang === 'ar' ? 'أهلاً بعودتك' : 'Welcome Back'}
              </h1>
              <p className="text-sm font-semibold text-[#494454]">
                {lang === 'ar' ? 'سجل الدخول لمتابعة رحلتك' : 'Log in to continue your journey.'}
              </p>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_12px_32px_rgba(107,56,212,0.12)] border border-[#E9DDFF] text-left space-y-4">
              <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1D1A23] mb-1.5">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                      className="w-full h-14 pl-10 pr-4 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-sm font-semibold border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none"
                    />
                    <Mail className="w-5 h-5 text-[#CBC3D7] absolute left-3.5 top-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D1A23] mb-1.5">
                    {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      className="w-full h-14 pl-10 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-sm font-semibold border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none"
                    />
                    <Lock className="w-5 h-5 text-[#CBC3D7] absolute left-3.5 top-4" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-4 text-[#CBC3D7] hover:text-[#6B38D4]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end items-center text-xs font-bold pt-1">
                  <button
                    type="button"
                    onClick={() => setLoginMode('forgot')}
                    className="text-[#00C4CC] hover:underline"
                  >
                    {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-[#6B38D4] to-[#8B5CF6] text-white rounded-2xl text-base font-bold shadow-[0_8px_20px_rgba(107,56,212,0.24)] hover:shadow-lg hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Log In'}</span>
                </button>
              </form>
            </div>

            {/* Register Link */}
            <div className="pt-1">
              <p className="text-sm font-medium text-[#494454]">
                {lang === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
                <button
                  onClick={() => onNavigate('register')}
                  className="font-bold text-[#6B38D4] hover:underline"
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
            
            {/* Angry / Determined Purple Mascot Header */}
            <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_8px_20px_rgba(107,56,212,0.15)] border-2 border-white flex items-center justify-center overflow-hidden">
              <img 
                src="/mascot_angry.jpg" 
                alt="Angry Purple Mascot" 
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).setAttribute('src', '/mascot.png'); }}
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-black text-[#1D1A23]">
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
              </h1>
              <p className="text-sm font-semibold text-[#494454] max-w-xs mx-auto leading-relaxed">
                {lang === 'ar' 
                  ? 'لا تقلق! أدخل بريدك الإلكتروني أدناه وسنرسل لك رابط إعادة تعيين كلمة المرور.' 
                  : "Don't worry! Enter your email address below and we'll send you a little magic link to reset it."}
              </p>
            </div>

            {/* Form Card */}
            <div className="w-full bg-white rounded-[28px] p-6 shadow-[0_12px_32px_rgba(107,56,212,0.08)] border border-[#E9DDFF] text-left space-y-5">
              {resetSent ? (
                <div className="bg-[#E9DDFF]/60 border border-[#6B38D4]/30 p-4 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 bg-[#6B38D4] text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1D1A23] text-sm">
                    {lang === 'ar' ? 'تم إرسال رابط إعادة التعيين!' : 'Reset Link Sent!'}
                  </h4>
                  <p className="text-xs text-[#494454] font-semibold">
                    {lang === 'ar' ? 'يرجى التحقق من بريدك الإلكتروني وتتبع التعليمات.' : 'Check your inbox for further instructions.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1D1A23] mb-1.5">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full h-14 pl-10 pr-4 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-sm font-semibold border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none"
                      />
                      <Mail className="w-5 h-5 text-[#CBC3D7] absolute left-3.5 top-4" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#6B38D4] to-[#8B5CF6] text-white rounded-2xl text-base font-bold shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'إرسال رابط التعيين' : 'Send Reset Link'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            <button
              onClick={() => setLoginMode('email')}
              className="text-xs font-bold text-[#6B38D4] hover:underline"
            >
              {lang === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to Login'}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export function CreateAccount({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const { setParentProfile } = useSharedData() as any;
  const { lang, setLang } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePhoto: '',
    faceAuthEnabled: false,
    idCardPhoto: '',
    determinationType: 'طيف التوحد / Autism Spectrum',
    customDetermination: '',
    childAttachments: [] as { name: string; url: string; type: string; size: string }[]
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

  const handleDocumentAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validations = [
      {
        condition: formData.email !== formData.confirmEmail,
        message: lang === 'ar'
          ? "البريد الإلكتروني وتأكيد البريد غير متطابقين"
          : "Email addresses do not match"
      },
      {
        condition: formData.password !== formData.confirmPassword,
        message: lang === 'ar'
          ? "كلمة المرور غير متطابقة"
          : "Passwords do not match"
      }
    ];
    for (const { condition, message } of validations) {
      if (condition) {
        alert(message);
        return;
      }
    }

    const determinationMap: Record<string, string> = {
      Other: formData.customDetermination || 'Custom Special Need',
      'أخرى': formData.customDetermination || 'Custom Special Need'
    };
    const finalDetermination = determinationMap[formData.determinationType] || formData.determinationType;

    setParentProfile({
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      email: formData.email,
      phone: formData.phone,
      profilePhoto: formData.profilePhoto,
      faceAuthEnabled: formData.faceAuthEnabled,
      idCardPhoto: formData.idCardPhoto,
      determinationType: finalDetermination,
      childAttachments: formData.childAttachments,
    });
  };
    });
    
    onNavigate('login');
  };

  const determinationOptions = [
    { id: 'autism', label: lang === 'ar' ? 'طيف التوحد' : 'Autism Spectrum' },
    { id: 'adhd', label: lang === 'ar' ? 'فرط الحركة وتشتت الانتباه (ADHD)' : 'ADHD (Attention Deficit)' },
    { id: 'speech', label: lang === 'ar' ? 'اضطرابات النطق والكلام' : 'Speech & Language Delay' },
    { id: 'down', label: lang === 'ar' ? 'متلازمة داون' : 'Down Syndrome' },
    { id: 'cp', label: lang === 'ar' ? 'الشلل الدماغي' : 'Cerebral Palsy' },
    { id: 'learning', label: lang === 'ar' ? 'صعوبات التعلم' : 'Learning Difficulties' },
    { id: 'sensory', label: lang === 'ar' ? 'اضطراب المعالجة الحسية' : 'Sensory Processing' },
    { id: 'other', label: lang === 'ar' ? 'أخرى' : 'Other' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F1FE] text-[#1D1A23] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden font-sans">
      {/* Ambient Decorative Glows */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-[#E9DDFF] rounded-full blur-2xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[5%] w-80 h-80 bg-[#C9E6FF] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4 relative z-10">
        <button 
          onClick={() => onNavigate('login')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 border border-[#6B38D4]/10 text-xs font-bold text-[#6B38D4] hover:bg-white transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
        </button>

        <button 
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white border border-[#6B38D4]/20 text-[#6B38D4] font-extrabold text-xs shadow-xs hover:bg-[#F3EBF8] transition-all"
        >
          <Globe className="w-4 h-4 text-[#6B38D4]" />
          <span>{lang === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Main Form Box */}
      <div className="w-full max-w-lg relative z-10 animate-fade-in space-y-6">
        
        {/* Waving Mascot Image Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full p-2 bg-white shadow-[0_8px_20px_rgba(107,56,212,0.15)] border-2 border-white flex items-center justify-center overflow-hidden mb-2">
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
          <h1 className="text-3xl font-black text-[#1D1A23]">
            {lang === 'ar' ? 'إنشاء حساب جديد' : 'Create an Account'}
          </h1>
          <p className="text-base font-normal text-[#494454]">
            {lang === 'ar' ? 'انضم إلى مجتمعنا الداعم اليوم.' : 'Join our supportive community today.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_20px_rgba(107,56,212,0.12)] border border-[#E9DDFF] space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input: Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#494454] mb-1">
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Adam Smith"
                  className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-base font-medium border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none placeholder-[#CBC3D7]"
                />
                <UserIcon className="w-5 h-5 text-[#CBC3D7] absolute right-3.5 top-4" />
              </div>
            </div>

            {/* Grid Inputs: Email Address & Confirm Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="adam@example.com"
                    className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-base font-medium border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none placeholder-[#CBC3D7]"
                  />
                  <Mail className="w-5 h-5 text-[#CBC3D7] absolute right-3.5 top-4" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'تأكيد البريد الإلكتروني' : 'Confirm Email'}
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={formData.confirmEmail}
                    onChange={e => setFormData({...formData, confirmEmail: e.target.value})}
                    placeholder="adam@example.com"
                    className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-base font-medium border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none placeholder-[#CBC3D7]"
                  />
                  <Mail className="w-5 h-5 text-[#CBC3D7] absolute right-3.5 top-4" />
                </div>
              </div>
            </div>

            {/* Grid Inputs: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-base font-medium border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none placeholder-[#CBC3D7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-4 text-[#CBC3D7] hover:text-[#6B38D4]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-base font-medium border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none placeholder-[#CBC3D7]"
                  />
                  <Lock className="w-5 h-5 text-[#CBC3D7] absolute right-3.5 top-4" />
                </div>
              </div>
            </div>

            {/* Birth Date & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'تاريخ الميلاد' : 'Birth Date'}
                </label>
                <input
                  required
                  type="date"
                  value={formData.birthDate}
                  onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  className="w-full h-14 px-4 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-sm font-semibold border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#494454] mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-14 pl-4 pr-10 rounded-2xl bg-[#F3EBF8] text-[#1D1A23] text-sm font-semibold border border-transparent focus:border-[#6B38D4] focus:bg-white transition-all outline-none"
                  />
                  <Phone className="w-5 h-5 text-[#CBC3D7] absolute right-3.5 top-4" />
                </div>
              </div>
            </div>

            {/* National ID Upload */}
            <div className="p-4 rounded-2xl border space-y-3 bg-[#F8F1FE]/50 border-[#E9DDFF]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#6B38D4]" />
                <label className="block text-xs font-bold text-[#1D1A23]">
                  {lang === 'ar' ? 'صورة البطاقة الشخصية' : 'National ID Card Photo'}
                </label>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex-1 border-2 border-dashed border-[#6B38D4]/30 rounded-2xl p-4 bg-white text-center cursor-pointer hover:bg-[#F3EBF8] transition-colors flex flex-col items-center justify-center gap-1">
                  <Upload className="w-5 h-5 text-[#6B38D4]" />
                  <span className="text-xs font-extrabold text-[#6B38D4]">
                    {lang === 'ar' ? 'رفع صورة البطاقة' : 'Upload ID Image'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleIdCardUpload} />
                </label>

                {formData.idCardPhoto && (
                  <div className="relative w-16 h-16 rounded-2xl border border-[#6B38D4] overflow-hidden shrink-0 shadow-xs">
                    <img src={formData.idCardPhoto} alt="ID Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Face Recognition Feature Setup */}
            <div className="p-4 rounded-2xl border space-y-2 bg-[#F8F1FE]/50 border-[#E9DDFF]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#6B38D4]" />
                  <label className="block text-xs font-bold text-[#1D1A23]">
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
                  <div className="w-11 h-6 bg-[#CBC3D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B38D4]"></div>
                </label>
              </div>
            </div>

            {/* Child Special Needs Diagnosis Selection */}
            <div className="p-4 rounded-2xl border space-y-2 bg-[#F8F1FE]/50 border-[#E9DDFF]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#6B38D4]" />
                <label className="block text-xs font-bold text-[#1D1A23]">
                  ❤️ {lang === 'ar' ? 'تحديد نوع الهمم لدى الطفل' : "Child's Diagnosis / Special Needs Category"}
                </label>
              </div>
              <select
                value={formData.determinationType}
                onChange={e => setFormData({ ...formData, determinationType: e.target.value })}
                className="w-full p-3 border rounded-2xl bg-white text-xs font-bold text-[#1D1A23] border-[#ECE8FD]"
              >
                {determinationOptions.map(opt => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Attachments Section */}
            <div className="p-4 rounded-2xl border space-y-2 bg-[#F8F1FE]/50 border-[#E9DDFF]">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#6B38D4]" />
                <label className="block text-xs font-bold text-[#1D1A23]">
                  {lang === 'ar' ? 'إرفاق مستندات أو تقارير عن الطفل' : 'Child Attachments & Reports'}
                </label>
              </div>
              <label className="flex border-2 border-dashed border-[#E9DDFF] rounded-2xl p-3 bg-white text-center cursor-pointer hover:bg-[#F3EBF8] transition-colors items-center justify-center gap-2">
                <Paperclip className="w-4 h-4 text-[#6B38D4]" />
                <span className="text-xs font-bold text-[#6B38D4]">
                  {lang === 'ar' ? 'إرفاق تقارير جديدة' : 'Upload Files'}
                </span>
                <input type="file" multiple className="hidden" onChange={handleDocumentAttach} />
              </label>
            </div>

            {/* Primary Action Button */}
            <button 
              type="submit"
              className="w-full h-16 bg-[#6B38D4] text-white font-bold rounded-2xl text-xl shadow-[0_8px_20px_rgba(107,56,212,0.24)] hover:bg-[#582cb5] active:scale-98 transition-all flex items-center justify-center gap-3"
            >
              <span>{lang === 'ar' ? 'تسجيل الحساب' : 'Register'}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          {/* Bottom Switch Footer */}
          <div className="text-center pt-2">
            <p className="text-base font-normal text-[#494454]">
              {lang === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
              <button 
                onClick={() => onNavigate('login')} 
                className="font-bold text-[#6B38D4] hover:underline"
              >
                {lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
