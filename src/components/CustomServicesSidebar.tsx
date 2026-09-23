import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCw, 
  Sparkles, 
  GraduationCap, 
  Stethoscope, 
  Activity, 
  Package, 
  UserCheck, 
  ChevronDown, 
  Check,
  ChevronRight,
  Folder,
  FolderOpen,
  Users,
  Home,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../shared/LanguageContext';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface NavItem {
  id: string;
  nameEn: string;
  nameAr: string;
  count?: number;
}

export interface NavGroup {
  id: string;
  nameEn: string;
  nameAr: string;
  count?: number;
  items: NavItem[];
}

export interface MultiLevelCategory {
  id: string;
  num: string;
  nameEn: string;
  nameAr: string;
  countEn: string;
  countAr: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  items?: NavItem[];
  subGroups?: NavGroup[];
}

export interface CustomServicesSidebarProps {
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubCategory: (categoryId: string, subCategoryId: string) => void;
  onResetFilters: () => void;
}

// ==========================================
// MULTI-LEVEL TREE DATA STRUCTURE
// ==========================================

export const MULTI_LEVEL_NAV_CATEGORIES: MultiLevelCategory[] = [
  {
    id: 'education',
    num: '①',
    nameEn: 'Education',
    nameAr: 'التعليم والمدارس',
    countEn: '81 available',
    countAr: '81 متاح',
    icon: GraduationCap,
    iconBg: 'bg-purple-100 text-purple-600',
    subGroups: [
      {
        id: 'child-group',
        nameEn: 'Child',
        nameAr: 'الطفل',
        count: 61,
        items: [
          { id: 'schools', nameEn: 'Schools', nameAr: 'مدارس دمج', count: 28 },
          { id: 'nurseries', nameEn: 'Nurseries', nameAr: 'حضانات ورياض أطفال', count: 18 },
          { id: 'early-intervention', nameEn: 'Early Intervention', nameAr: 'التدخل المبكر', count: 15 }
        ]
      },
      {
        id: 'parent-group',
        nameEn: 'Parent',
        nameAr: 'أولياء الأمور',
        count: 20,
        items: [
          { id: 'parent-workshops', nameEn: 'Parents Training / Workshops', nameAr: 'تدريب وورش عمل لأولياء الأمور', count: 12 },
          { id: 'support-groups', nameEn: 'Support Groups', nameAr: 'مجموعات الدعم الأسري', count: 8 }
        ]
      }
    ]
  },
  {
    id: 'therapeutic-medical',
    num: '②',
    nameEn: 'Therapeutic & Medical',
    nameAr: 'العلاج والصحة الطبية',
    countEn: '122 available',
    countAr: '122 متاح',
    icon: Stethoscope,
    iconBg: 'bg-sky-100 text-sky-600',
    items: [
      { id: 'hospitals', nameEn: 'Hospitals', nameAr: 'مستشفيات تخصصية', count: 14 },
      { id: 'clinics', nameEn: 'Clinics', nameAr: 'عيادات تخصصية', count: 32 },
      { id: 'therapy-centers', nameEn: 'Therapy Centers', nameAr: 'مراكز تأهيل وعلاج', count: 40 },
      { id: 'pharmacies', nameEn: 'Pharmacies', nameAr: 'صيدليات تخصصية', count: 12 },
      { id: 'labs', nameEn: 'Labs', nameAr: 'معامل وتحاليل', count: 10 },
      { id: 'consultants', nameEn: 'Consultants', nameAr: 'استشاريون كبار', count: 16 }
    ]
  },
  {
    id: 'activities',
    num: '③',
    nameEn: 'Activities',
    nameAr: 'الأنشطة والفعاليات',
    countEn: '103 available',
    countAr: '103 متاح',
    icon: Activity,
    iconBg: 'bg-amber-100 text-amber-600',
    items: [
      { id: 'camps', nameEn: 'Camps', nameAr: 'معسكرات ورحلات', count: 15 },
      { id: 'clubs', nameEn: 'Clubs', nameAr: 'أندية رياضية واجتماعية', count: 22 },
      { id: 'parks', nameEn: 'Parks', nameAr: 'حدائق ومتنزهات مؤهلة', count: 18 }
    ],
    subGroups: [
      {
        id: 'academies-group',
        nameEn: 'Academies',
        nameAr: 'أكاديميات تخصصية',
        count: 48,
        items: [
          { id: 'academies-sports', nameEn: 'Sports Academies', nameAr: 'أكاديميات رياضية', count: 16 },
          { id: 'academies-music', nameEn: 'Music Academies', nameAr: 'أكاديميات موسيقى', count: 8 },
          { id: 'academies-art', nameEn: 'Art Academies', nameAr: 'أكاديميات فن ورسم', count: 10 },
          { id: 'academies-coding', nameEn: 'Coding / Robotics', nameAr: 'برمجة وروبوتات', count: 14 }
        ]
      }
    ]
  },
  {
    id: 'equipments-products',
    num: '④',
    nameEn: 'Equipments & Products',
    nameAr: 'المعدات والمنتجات',
    countEn: '122 available',
    countAr: '122 متاح',
    icon: Package,
    iconBg: 'bg-emerald-100 text-emerald-600',
    items: [
      { id: 'educational-tools', nameEn: 'Educational Tools & Materials (Edu)', nameAr: 'أدوات تعليمية ومواد دمج (Edu)', count: 35 },
      { id: 'therapeutic-equipment', nameEn: 'Therapeutic Equipment', nameAr: 'معدات وأدوات علاجية', count: 24 },
      { id: 'sensory-tools', nameEn: 'Sensory Tools', nameAr: 'أدوات الدعم الحسي', count: 28 },
      { id: 'assistive-devices', nameEn: 'Assistive Technology', nameAr: 'أجهزة وتكنولوجيا مساعدة', count: 15 },
      { id: 'child-products', nameEn: 'Child Products & Essentials', nameAr: 'منتجات ومستلزمات الطفل', count: 20 }
    ]
  },
  {
    id: 'services-professionals',
    num: '⑤',
    nameEn: 'Services & Professionals',
    nameAr: 'الخدمات والمختصين',
    countEn: '102 available',
    countAr: '102 متاح',
    icon: UserCheck,
    iconBg: 'bg-rose-100 text-rose-600',
    items: [
      { id: 'therapists', nameEn: 'Therapists', nameAr: 'أخصائيين واستشاريين معتمدين', count: 54 },
      { id: 'shadow-teachers', nameEn: 'Shadow Teachers', nameAr: 'معلمين ظل (Shadow Teachers)', count: 48 }
    ]
  }
];

// ==========================================
// COMPONENT IMPLEMENTATION
// ==========================================

export function CustomServicesSidebar({
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
  onResetFilters
}: CustomServicesSidebarProps) {
  const { lang } = useLanguage();

  // Track Level 1 Category Accordions
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    education: true,
    activities: true,
  });

  // Track Level 2 Sub-Group Accordions (e.g. child-group, parent-group, academies-group)
  const [expandedSubGroups, setExpandedSubGroups] = useState<Record<string, boolean>>({
    'child-group': true,
    'parent-group': false,
    'academies-group': true,
  });

  const toggleCategory = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const toggleSubGroup = (subGroupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubGroups(prev => ({
      ...prev,
      [subGroupId]: !prev[subGroupId]
    }));
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 font-sans animate-fade-in">
      {/* Outer Card Container */}
      <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-100 space-y-4 relative overflow-hidden">
        
        {/* 1. Header Area */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 px-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#633BE8] flex items-center justify-center shrink-0 shadow-xs border border-purple-200/50">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {lang === 'ar' ? 'تصفح القطاعات والخدمات' : 'SERVICES NAVIGATION'}
              </h2>
              <p className="text-[11px] font-semibold text-slate-400">
                {lang === 'ar' ? 'استكشف التصنيفات والفلاتر' : 'Explore Categories & Filters'}
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-purple-100 text-slate-400 hover:text-[#633BE8] flex items-center justify-center transition-all border border-slate-100 group"
            title={lang === 'ar' ? 'إعادة ضبط كافّة الفلاتر' : 'Reset All Filters'}
          >
            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* 2. Global Action Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between font-extrabold text-xs transition-all shadow-md duration-200 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-[#633BE8] to-[#805AD5] text-white shadow-purple-500/20 scale-[1.01]'
              : 'bg-[#FAFAFD] text-slate-700 hover:bg-purple-50 border border-slate-200/60'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className={`w-4 h-4 ${selectedCategory === 'all' ? 'text-amber-300' : 'text-[#633BE8]'}`} />
            <span>{lang === 'ar' ? 'جميع الخدمات والمنتجات' : 'All Services & Products'}</span>
          </div>

          {selectedCategory === 'all' && (
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Check className="w-3.5 h-3.5" />
            </div>
          )}
        </button>

        {/* 3. Multi-Level Category Cards Tree */}
        <div className="space-y-3 pt-1">
          {MULTI_LEVEL_NAV_CATEGORIES.map(cat => {
            const IconComp = cat.icon;
            const isCatActive = selectedCategory === cat.id;
            const isExpanded = !!expandedCategories[cat.id] || isCatActive;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                  isCatActive
                    ? 'border-[#633BE8] shadow-md shadow-purple-500/10 ring-2 ring-[#633BE8]/20'
                    : 'border-slate-100 hover:border-purple-200 shadow-xs'
                }`}
              >
                {/* Level 1 Category Header Bar */}
                <div
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setExpandedCategories(prev => ({ ...prev, [cat.id]: true }));
                  }}
                  className="p-3.5 flex items-center justify-between cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-slate-400 shrink-0 font-mono">
                      {cat.num}
                    </span>

                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs border border-white/50 ${cat.iconBg}`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs font-black text-slate-800 truncate group-hover:text-[#633BE8] transition-colors">
                        {lang === 'ar' ? cat.nameAr : cat.nameEn}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                        {lang === 'ar' ? cat.countAr : cat.countEn}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleCategory(cat.id, e)}
                    className="p-1.5 text-slate-400 hover:text-[#633BE8] rounded-xl hover:bg-purple-50 transition-colors shrink-0"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#633BE8]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Level 1 Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden bg-[#FAFAFD] border-t border-slate-100"
                    >
                      <div className="p-3 space-y-2">
                        
                        {/* Direct Leaf Items (if any, e.g. Camps, Clubs, Parks) */}
                        {cat.items && cat.items.map(item => {
                          const isItemActive = selectedCategory === cat.id && selectedSubCategory === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectSubCategory(cat.id, item.id);
                              }}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all duration-200 ${
                                isItemActive
                                  ? 'bg-[#633BE8] text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-purple-100/60 hover:text-[#633BE8]'
                              }`}
                            >
                              <span className="truncate">{lang === 'ar' ? item.nameAr : item.nameEn}</span>
                              <div className="flex items-center gap-1 shrink-0">
                                {item.count !== undefined && (
                                  <span className={`text-[10px] font-mono font-bold ${
                                    isItemActive ? 'text-white/80' : 'text-slate-400'
                                  }`}>
                                    ({item.count})
                                  </span>
                                )}
                                <ChevronRight className={`w-3.5 h-3.5 rtl:rotate-180 ${
                                  isItemActive ? 'text-white' : 'text-slate-300'
                                }`} />
                              </div>
                            </button>
                          );
                        })}

                        {/* Level 2 Sub-Group Accordions (e.g. 📁 Child, 📁 Parent, 📁 Academies) */}
                        {cat.subGroups && cat.subGroups.map(group => {
                          const isSubGroupExpanded = !!expandedSubGroups[group.id];

                          return (
                            <div key={group.id} className="rounded-xl border border-purple-100 bg-white overflow-hidden shadow-2xs">
                              {/* Sub-Group Header */}
                              <div
                                onClick={(e) => toggleSubGroup(group.id, e)}
                                className="py-2.5 px-3 flex items-center justify-between cursor-pointer bg-purple-50/50 hover:bg-purple-100/60 transition-colors select-none"
                              >
                                <div className="flex items-center gap-2 text-xs font-black text-[#633BE8]">
                                  {isSubGroupExpanded ? (
                                    <FolderOpen className="w-4 h-4 text-[#633BE8]" />
                                  ) : (
                                    <Folder className="w-4 h-4 text-[#633BE8]/70" />
                                  )}
                                  <span>{lang === 'ar' ? group.nameAr : group.nameEn}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  {group.count !== undefined && (
                                    <span className="text-[10px] bg-purple-200 text-[#633BE8] px-2 py-0.5 rounded-full font-bold">
                                      {group.count}
                                    </span>
                                  )}
                                  <ChevronDown className={`w-3.5 h-3.5 text-[#633BE8] transition-transform duration-300 ${
                                    isSubGroupExpanded ? 'rotate-180' : ''
                                  }`} />
                                </div>
                              </div>

                              {/* Sub-Group Collapsible Items Drawer */}
                              <AnimatePresence initial={false}>
                                {isSubGroupExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="p-2 space-y-1 bg-white border-t border-purple-100"
                                  >
                                    {group.items.map(subItem => {
                                      const isSubItemActive = selectedCategory === cat.id && selectedSubCategory === subItem.id;

                                      return (
                                        <button
                                          key={subItem.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectSubCategory(cat.id, subItem.id);
                                          }}
                                          className={`w-full py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-between transition-all duration-200 ${
                                            isSubItemActive
                                              ? 'bg-[#633BE8] text-white shadow-sm'
                                              : 'text-slate-600 hover:bg-purple-50 hover:text-[#633BE8]'
                                          }`}
                                        >
                                          <span className="truncate pl-2 rtl:pr-2 rtl:pl-0">{lang === 'ar' ? subItem.nameAr : subItem.nameEn}</span>
                                          <div className="flex items-center gap-1 shrink-0">
                                            {subItem.count !== undefined && (
                                              <span className={`text-[10px] font-mono font-bold ${
                                                isSubItemActive ? 'text-white/80' : 'text-slate-400'
                                              }`}>
                                                ({subItem.count})
                                              </span>
                                            )}
                                            <ChevronRight className={`w-3 h-3 rtl:rotate-180 ${
                                              isSubItemActive ? 'text-white' : 'text-slate-300'
                                            }`} />
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Section inside Left Sidebar */}
        <div className="pt-3 border-t border-slate-100 mt-2 space-y-1.5">
          <div className="px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'التنقل السريع' : 'Quick Navigation'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#FAFAFD] p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => onSelectCategory('community')}
              className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-slate-600 hover:text-[#633BE8] hover:bg-purple-50 transition-all"
            >
              <Users className="w-4 h-4 text-[#633BE8]" />
              <span className="text-[9px] font-bold">{lang === 'ar' ? 'المجتمع' : 'Community'}</span>
            </button>

            <button
              onClick={() => onSelectCategory('all')}
              className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-slate-600 hover:text-[#633BE8] hover:bg-purple-50 transition-all"
            >
              <Home className="w-4 h-4 text-[#633BE8]" />
              <span className="text-[9px] font-bold">{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </button>

            <button
              onClick={() => onSelectCategory('all')}
              className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-slate-600 hover:text-[#633BE8] hover:bg-purple-50 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#633BE8]" />
              <span className="text-[9px] font-bold">{lang === 'ar' ? 'المتجر' : 'Market Place'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
