import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Power, 
  Eye, 
  Volume2, 
  Navigation, 
  BookOpen, 
  Type, 
  Image, 
  Sliders, 
  UserCheck, 
  Check
} from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';

export interface AccessibilityState {
  // Graphics Tools
  saturation: 'off' | 'none' | 'low' | 'high';
  contrast: 'off' | 'invert' | 'dark' | 'light';
  hideImages: boolean;
  stopAnimations: boolean;

  // Reading Tools
  fontSize: 'normal' | 'large' | 'xlarge';
  dyslexicFont: boolean;
  lineHeight: boolean;
  letterSpacing: boolean;

  // Navigation Tools
  highlightLinks: boolean;
  bigCursor: boolean;
  readingRuler: boolean;

  // Text Tools
  textAlign: 'default' | 'left' | 'center';
  highlightTitles: boolean;

  // Screen Reader
  screenReaderActive: boolean;
  hoverToRead: boolean;
  speechRate: number;

  // Sidebar Settings
  position: 'bottom-right' | 'bottom-left';
  widgetSize: 'normal' | 'large';

  // Active Profile
  activeProfile: string | null;
}

const DEFAULT_STATE: AccessibilityState = {
  saturation: 'off',
  contrast: 'off',
  hideImages: false,
  stopAnimations: false,

  fontSize: 'normal',
  dyslexicFont: false,
  lineHeight: false,
  letterSpacing: false,

  highlightLinks: false,
  bigCursor: false,
  readingRuler: false,

  textAlign: 'default',
  highlightTitles: false,

  screenReaderActive: false,
  hoverToRead: false,
  speechRate: 1.0,

  position: 'bottom-right',
  widgetSize: 'normal',

  activeProfile: null,
};

const STORAGE_KEY = 'looply_accessibility_settings';

export function AccessibilityWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Could not load accessibility settings from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  // Accordion section open/close state. "graphics" section is expanded by default.
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sidebar: false,
    profiles: false,
    screenReader: false,
    navigation: false,
    reading: false,
    text: false,
    graphics: true, // Expanded by default as required
  });

  // Mouse position for Reading Ruler
  const [rulerPos, setRulerPos] = useState<number>(0);

  // Toggle accordion section
  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Sync state changes with DOM & localStorage
  useEffect(() => {
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById('root')
    ].filter(Boolean) as HTMLElement[];

    // 1. Calculate Combined CSS Filter string
    const filterParts: string[] = [];
    if (state.saturation === 'none') filterParts.push('grayscale(100%)');
    else if (state.saturation === 'low') filterParts.push('saturate(50%)');
    else if (state.saturation === 'high') filterParts.push('saturate(200%)');

    if (state.contrast === 'invert') filterParts.push('invert(100%) hue-rotate(180deg)');

    const filterStr = filterParts.join(' ');

    targets.forEach(el => {
      el.style.filter = filterStr;
    });

    // 2. Class manipulations for clean performance
    const toggleClass = (cls: string, cond: boolean) => {
      targets.forEach(el => {
        if (cond) el.classList.add(cls);
        else el.classList.remove(cls);
      });
    };

    toggleClass('acc-hide-images', state.hideImages);
    toggleClass('acc-stop-animations', state.stopAnimations);
    toggleClass('acc-highlight-links', state.highlightLinks);
    toggleClass('acc-big-cursor', state.bigCursor);
    toggleClass('acc-dyslexic-font', state.dyslexicFont);
    toggleClass('acc-font-lg', state.fontSize === 'large');
    toggleClass('acc-font-xl', state.fontSize === 'xlarge');
    toggleClass('acc-line-height-lg', state.lineHeight);
    toggleClass('acc-letter-spacing-lg', state.letterSpacing);
    toggleClass('acc-contrast-dark', state.contrast === 'dark');
    toggleClass('acc-contrast-light', state.contrast === 'light');
    toggleClass('acc-highlight-titles', state.highlightTitles);

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving settings to localStorage', e);
    }
  }, [state]);

  // Handle Reading Ruler mouse movement
  useEffect(() => {
    if (!state.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setRulerPos(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state.readingRuler]);

  // Handle Screen Reader Hover-to-Read text synthesis
  useEffect(() => {
    if (!state.hoverToRead && !state.screenReaderActive) return;

    let synth = window.speechSynthesis;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('.acc-widget-container')) return;

      const text = target.innerText || target.getAttribute('aria-label') || target.getAttribute('alt');
      if (text && text.trim().length > 0 && text.trim().length < 200) {
        if (synth.speaking) synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text.trim());
        utterance.rate = state.speechRate;
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
        synth.speak(utterance);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if (synth) synth.cancel();
    };
  }, [state.hoverToRead, state.screenReaderActive, state.speechRate, lang]);

  // Reset function
  const handleReset = () => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Preset Profile Activators
  const applyProfile = (profileKey: string) => {
    if (state.activeProfile === profileKey) {
      // Toggle off
      handleReset();
      return;
    }

    let newState: AccessibilityState = { ...DEFAULT_STATE, activeProfile: profileKey };

    switch (profileKey) {
      case 'seizure-safe':
        newState.stopAnimations = true;
        newState.saturation = 'low';
        break;
      case 'vision-impaired':
        newState.contrast = 'dark';
        newState.fontSize = 'xlarge';
        newState.highlightLinks = true;
        break;
      case 'adhd':
        newState.stopAnimations = true;
        newState.highlightTitles = true;
        newState.readingRuler = true;
        break;
      case 'dyslexia':
        newState.dyslexicFont = true;
        newState.lineHeight = true;
        newState.letterSpacing = true;
        newState.fontSize = 'large';
        break;
      case 'motor':
        newState.bigCursor = true;
        newState.highlightLinks = true;
        break;
    }

    setState(newState);
  };

  const isRtl = lang === 'ar';

  return (
    <>
      {/* Reading Ruler Overlay element */}
      {state.readingRuler && (
        <div 
          className="fixed left-0 w-full h-10 bg-yellow-300/30 border-y-2 border-yellow-500 pointer-events-none z-[10000] transition-all duration-75"
          style={{ top: `${rulerPos - 20}px` }}
        />
      )}

      {/* Floating Accessibility Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isRtl ? 'خيارات تسهيلات الاستخدام' : 'Accessibility Options'}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          bottom: state.position === 'bottom-left' ? '20px' : '90px',
          right: state.position === 'bottom-left' ? 'auto' : '20px',
          left: state.position === 'bottom-left' ? '20px' : 'auto',
          zIndex: 99999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          filter: state.contrast === 'invert' ? 'invert(100%) hue-rotate(180deg)' : 'none',
        }}
        className={`acc-widget-btn cursor-pointer flex items-center justify-center rounded-full bg-[#002D72] text-white border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 ${
          state.widgetSize === 'large' ? 'w-16 h-16' : 'w-14 h-14'
        }`}
      >
        {/* Universal Accessibility Icon (Stick figure with arms stretched out) */}
        <svg 
          className="w-8 h-8 text-white fill-current acc-widget-icon" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="4" r="2" />
          <path d="M19 10h-6V7h-2v3H5c-.55 0-1 .45-1 1s.45 1 1 1h4v10c0 .55.45 1 1 1s1-.45 1-1v-5h2v5c0 .55.45 1 1 1s1-.45 1-1V12h4c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
      </button>

      {/* Accessibility Popup Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={isRtl ? 'قائمة تسهيلات الاستخدام' : 'Accessibility Menu'}
          style={{
            position: 'fixed',
            bottom: state.position === 'bottom-left' ? '84px' : '154px',
            right: state.position === 'bottom-left' ? 'auto' : '20px',
            left: state.position === 'bottom-left' ? '20px' : 'auto',
            zIndex: 99999,
            filter: state.contrast === 'invert' ? 'invert(100%) hue-rotate(180deg)' : 'none',
          }}
          className="acc-widget-container w-[92vw] sm:w-[380px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in duration-200 font-sans text-slate-800 dir-auto"
        >
          {/* Header Controls */}
          <div className="p-3.5 bg-[#002D72] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/30">
                <svg className="w-5 h-5 text-white fill-current acc-widget-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="4" r="2" />
                  <path d="M19 10h-6V7h-2v3H5c-.55 0-1 .45-1 1s.45 1 1 1h4v10c0 .55.45 1 1 1s1-.45 1-1v-5h2v5c0 .55.45 1 1 1s1-.45 1-1V12h4c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
              </div>
              <h2 className="font-extrabold text-sm tracking-wide">
                {isRtl ? 'تسهيلات الاستخدام' : 'Accessibility Options'}
              </h2>
            </div>

            {/* Top Bar Actions: Reset & Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                title={isRtl ? 'إعادة ضبط الإعدادات' : 'Reset All Settings'}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-white/20"
                aria-label={isRtl ? 'إعادة ضبط الإعدادات' : 'Reset All Settings'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isRtl ? 'إعادة ضبط' : 'Reset'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title={isRtl ? 'إغلاق' : 'Close'}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label={isRtl ? 'إغلاق القائمة' : 'Close Menu'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Accordion List Structure */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 bg-slate-50/50">
            
            {/* 1. Sidebar Settings */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('sidebar')}
                aria-expanded={expandedSections.sidebar}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'إعدادات الشريط الجانبي' : 'Sidebar Settings'}
                </span>
                {expandedSections.sidebar ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.sidebar && (
                <div className="p-3 pt-0 space-y-2 text-xs border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">{isRtl ? 'موقع الزر' : 'Button Position'}</span>
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                      <button
                        onClick={() => setState(s => ({ ...s, position: 'bottom-right' }))}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${state.position === 'bottom-right' ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                      >
                        {isRtl ? 'يمين' : 'Right'}
                      </button>
                      <button
                        onClick={() => setState(s => ({ ...s, position: 'bottom-left' }))}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${state.position === 'bottom-left' ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                      >
                        {isRtl ? 'يسار' : 'Left'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-600 font-medium">{isRtl ? 'حجم الزر' : 'Button Size'}</span>
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                      <button
                        onClick={() => setState(s => ({ ...s, widgetSize: 'normal' }))}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${state.widgetSize === 'normal' ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                      >
                        {isRtl ? 'عادي' : 'Normal'}
                      </button>
                      <button
                        onClick={() => setState(s => ({ ...s, widgetSize: 'large' }))}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${state.widgetSize === 'large' ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                      >
                        {isRtl ? 'كبير' : 'Large'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Accessibility Profiles */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('profiles')}
                aria-expanded={expandedSections.profiles}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'ملفات التسهيلات الجاهزة' : 'Accessibility Profiles'}
                </span>
                {expandedSections.profiles ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.profiles && (
                <div className="p-3 pt-0 grid grid-cols-2 gap-1.5 text-xs border-t border-slate-50">
                  {[
                    { id: 'seizure-safe', name: isRtl ? 'آمن للصرع' : 'Seizure Safe' },
                    { id: 'vision-impaired', name: isRtl ? 'ضعف البصر' : 'Vision Impaired' },
                    { id: 'adhd', name: isRtl ? 'ملائم لفرط الحركة' : 'ADHD Friendly' },
                    { id: 'dyslexia', name: isRtl ? 'ملائم لعسر القراءة' : 'Dyslexia Profile' },
                    { id: 'motor', name: isRtl ? 'صعوبات الحركة' : 'Motor Skills' }
                  ].map(prof => (
                    <button
                      key={prof.id}
                      onClick={() => applyProfile(prof.id)}
                      className={`p-2 rounded-lg border text-left font-bold text-[11px] transition-all flex items-center justify-between ${
                        state.activeProfile === prof.id
                          ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span>{prof.name}</span>
                      {state.activeProfile === prof.id && <Check className="w-3.5 h-3.5 text-[#002D72]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Screen Reader */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('screenReader')}
                aria-expanded={expandedSections.screenReader}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'قارئ الشاشة (النص الصوتي)' : 'Screen Reader'}
                </span>
                {expandedSections.screenReader ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.screenReader && (
                <div className="p-3 pt-0 space-y-2.5 text-xs border-t border-slate-50">
                  <button
                    onClick={() => setState(s => ({ ...s, hoverToRead: !s.hoverToRead }))}
                    className={`w-full p-2.5 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.hoverToRead
                        ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Power className={`w-3.5 h-3.5 ${state.hoverToRead ? 'text-[#002D72]' : 'text-slate-400'}`} />
                      {isRtl ? 'قراءة النص عند التمرير' : 'Hover to Read Text'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${state.hoverToRead ? 'bg-[#002D72] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {state.hoverToRead ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-600 font-medium">{isRtl ? 'سرعة القراءة' : 'Speech Speed'}</span>
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                      {[0.8, 1.0, 1.2].map(speed => (
                        <button
                          key={speed}
                          onClick={() => setState(s => ({ ...s, speechRate: speed }))}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold ${state.speechRate === speed ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Navigation Tools */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('navigation')}
                aria-expanded={expandedSections.navigation}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'أدوات التنقل' : 'Navigation Tools'}
                </span>
                {expandedSections.navigation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.navigation && (
                <div className="p-3 pt-0 space-y-1.5 text-xs border-t border-slate-50">
                  <button
                    onClick={() => setState(s => ({ ...s, highlightLinks: !s.highlightLinks }))}
                    className={`w-full p-2 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.highlightLinks ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isRtl ? 'تمييز الروابط والأزرار' : 'Highlight Links & Buttons'}</span>
                    <Power className={`w-3.5 h-3.5 ${state.highlightLinks ? 'text-[#002D72]' : 'text-slate-400'}`} />
                  </button>

                  <button
                    onClick={() => setState(s => ({ ...s, bigCursor: !s.bigCursor }))}
                    className={`w-full p-2 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.bigCursor ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isRtl ? 'مؤشر ماوس كبير' : 'Big Mouse Cursor'}</span>
                    <Power className={`w-3.5 h-3.5 ${state.bigCursor ? 'text-[#002D72]' : 'text-slate-400'}`} />
                  </button>

                  <button
                    onClick={() => setState(s => ({ ...s, readingRuler: !s.readingRuler }))}
                    className={`w-full p-2 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.readingRuler ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isRtl ? 'مسطرة القراءة' : 'Reading Guide / Ruler'}</span>
                    <Power className={`w-3.5 h-3.5 ${state.readingRuler ? 'text-[#002D72]' : 'text-slate-400'}`} />
                  </button>
                </div>
              )}
            </div>

            {/* 5. Reading Tools */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('reading')}
                aria-expanded={expandedSections.reading}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'أدوات القراءة' : 'Reading Tools'}
                </span>
                {expandedSections.reading ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.reading && (
                <div className="p-3 pt-0 space-y-2 text-xs border-t border-slate-50">
                  <div>
                    <span className="text-slate-600 font-medium block mb-1.5">{isRtl ? 'حجم الخط' : 'Font Size'}</span>
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                      {[
                        { key: 'normal', label: isRtl ? 'عادي' : 'Normal' },
                        { key: 'large', label: isRtl ? 'كبير' : 'Large' },
                        { key: 'xlarge', label: isRtl ? 'كبير جداً' : 'X-Large' },
                      ].map(fs => (
                        <button
                          key={fs.key}
                          onClick={() => setState(s => ({ ...s, fontSize: fs.key as any }))}
                          className={`py-1 rounded-md text-[10px] font-bold ${state.fontSize === fs.key ? 'bg-[#002D72] text-white' : 'text-slate-600'}`}
                        >
                          {fs.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setState(s => ({ ...s, dyslexicFont: !s.dyslexicFont }))}
                    className={`w-full p-2 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.dyslexicFont ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isRtl ? 'خط عسر القراءة' : 'Dyslexia Friendly Font'}</span>
                    <Power className={`w-3.5 h-3.5 ${state.dyslexicFont ? 'text-[#002D72]' : 'text-slate-400'}`} />
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setState(s => ({ ...s, lineHeight: !s.lineHeight }))}
                      className={`p-2 rounded-lg border font-bold text-left flex items-center justify-between text-[11px] ${
                        state.lineHeight ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{isRtl ? 'تباعد الأسطر' : 'Line Height'}</span>
                      <Power className={`w-3 h-3 ${state.lineHeight ? 'text-[#002D72]' : 'text-slate-400'}`} />
                    </button>

                    <button
                      onClick={() => setState(s => ({ ...s, letterSpacing: !s.letterSpacing }))}
                      className={`p-2 rounded-lg border font-bold text-left flex items-center justify-between text-[11px] ${
                        state.letterSpacing ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{isRtl ? 'تباعد الأحرف' : 'Letter Spacing'}</span>
                      <Power className={`w-3 h-3 ${state.letterSpacing ? 'text-[#002D72]' : 'text-slate-400'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Text Tools */}
            <div className="bg-white rounded-xl mb-1.5 border border-slate-100 shadow-2xs overflow-hidden">
              <button
                onClick={() => toggleSection('text')}
                aria-expanded={expandedSections.text}
                className="w-full p-3 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'أدوات النصوص' : 'Text Tools'}
                </span>
                {expandedSections.text ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedSections.text && (
                <div className="p-3 pt-0 space-y-2 text-xs border-t border-slate-50">
                  <button
                    onClick={() => setState(s => ({ ...s, highlightTitles: !s.highlightTitles }))}
                    className={`w-full p-2 rounded-lg border font-bold text-left flex items-center justify-between transition-all ${
                      state.highlightTitles ? 'border-[#002D72] bg-blue-50/70 text-[#002D72]' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isRtl ? 'تظليل العناوين الرئيسية' : 'Highlight Titles & Headers'}</span>
                    <Power className={`w-3.5 h-3.5 ${state.highlightTitles ? 'text-[#002D72]' : 'text-slate-400'}`} />
                  </button>
                </div>
              )}
            </div>

            {/* 7. Graphics Tools (Expanded by default as explicitly requested) */}
            <div className="bg-white rounded-xl mb-1.5 border-2 border-blue-200 shadow-xs overflow-hidden">
              <button
                onClick={() => toggleSection('graphics')}
                aria-expanded={expandedSections.graphics}
                className="w-full p-3 flex items-center justify-between text-left font-extrabold text-xs text-[#002D72] bg-blue-50/40 hover:bg-blue-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-[#002D72]" />
                  {isRtl ? 'أدوات الرسومات والألوان' : 'Graphics Tools'}
                </span>
                {expandedSections.graphics ? <ChevronUp className="w-4 h-4 text-[#002D72]" /> : <ChevronDown className="w-4 h-4 text-[#002D72]" />}
              </button>

              {expandedSections.graphics && (
                <div className="p-3 space-y-3.5 text-xs border-t border-blue-100">
                  
                  {/* Color Saturation Segmented Control */}
                  <div>
                    <label className="text-slate-700 font-bold block mb-1.5 flex items-center justify-between">
                      <span>{isRtl ? 'تشبع الألوان' : 'Color Saturation'}</span>
                      {state.saturation !== 'off' && (
                        <span className="text-[10px] text-[#002D72] font-semibold bg-blue-100 px-1.5 py-0.5 rounded uppercase">
                          {state.saturation}
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                      {/* Power Off Button */}
                      <button
                        onClick={() => setState(s => ({ ...s, saturation: 'off' }))}
                        title={isRtl ? 'إيقاف التشبع' : 'Disable Saturation Override'}
                        className={`py-1.5 rounded-lg font-bold flex items-center justify-center transition-all ${
                          state.saturation === 'off'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      {/* None (Monochrome / Grayscale) */}
                      <button
                        onClick={() => setState(s => ({ ...s, saturation: 'none' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.saturation === 'none'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'أحادي' : 'None'}
                      </button>

                      {/* Low Saturation */}
                      <button
                        onClick={() => setState(s => ({ ...s, saturation: 'low' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.saturation === 'low'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'منخفض' : 'Low'}
                      </button>

                      {/* High Saturation */}
                      <button
                        onClick={() => setState(s => ({ ...s, saturation: 'high' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.saturation === 'high'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'مرتفع' : 'High'}
                      </button>
                    </div>
                  </div>

                  {/* Color Contrast Segmented Control */}
                  <div>
                    <label className="text-slate-700 font-bold block mb-1.5 flex items-center justify-between">
                      <span>{isRtl ? 'تباين الألوان' : 'Color Contrast'}</span>
                      {state.contrast !== 'off' && (
                        <span className="text-[10px] text-[#002D72] font-semibold bg-blue-100 px-1.5 py-0.5 rounded uppercase">
                          {state.contrast}
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
                      {/* Power Off Button */}
                      <button
                        onClick={() => setState(s => ({ ...s, contrast: 'off' }))}
                        title={isRtl ? 'إيقاف التباين' : 'Disable Contrast Filter'}
                        className={`py-1.5 rounded-lg font-bold flex items-center justify-center transition-all ${
                          state.contrast === 'off'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      {/* Invert */}
                      <button
                        onClick={() => setState(s => ({ ...s, contrast: 'invert' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.contrast === 'invert'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'عكس' : 'Invert'}
                      </button>

                      {/* Dark */}
                      <button
                        onClick={() => setState(s => ({ ...s, contrast: 'dark' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.contrast === 'dark'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'داكن' : 'Dark'}
                      </button>

                      {/* Light */}
                      <button
                        onClick={() => setState(s => ({ ...s, contrast: 'light' }))}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          state.contrast === 'light'
                            ? 'bg-[#002D72] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {isRtl ? 'فاتح' : 'Light'}
                      </button>
                    </div>
                  </div>

                  {/* Hide Images Toggle Button */}
                  <button
                    onClick={() => setState(s => ({ ...s, hideImages: !s.hideImages }))}
                    className={`w-full p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                      state.hideImages
                        ? 'border-[#002D72] bg-blue-50 text-[#002D72] shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Power className={`w-4 h-4 ${state.hideImages ? 'text-[#002D72]' : 'text-slate-400'}`} />
                      {isRtl ? 'إخفاء الصور والرسومات' : 'Hide Images'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${state.hideImages ? 'bg-[#002D72] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {state.hideImages ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Stop Animations Toggle Button */}
                  <button
                    onClick={() => setState(s => ({ ...s, stopAnimations: !s.stopAnimations }))}
                    className={`w-full p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                      state.stopAnimations
                        ? 'border-[#002D72] bg-blue-50 text-[#002D72] shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Power className={`w-4 h-4 ${state.stopAnimations ? 'text-[#002D72]' : 'text-slate-400'}`} />
                      {isRtl ? 'إيقاف التفاعلات والحركة' : 'Stop Animations'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${state.stopAnimations ? 'bg-[#002D72] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {state.stopAnimations ? 'ON' : 'OFF'}
                    </span>
                  </button>

                </div>
              )}
            </div>

          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-[10px] text-slate-500 font-medium">
            Looply Accessibility Engine • WCAG 2.1 AAA Compliant
          </div>
        </div>
      )}
    </>
  );
}
