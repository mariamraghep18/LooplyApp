import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  GraduationCap, 
  Stethoscope, 
  Activity, 
  Package, 
  UserCheck, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';
import { ServicesNavigationSidebar } from './ServicesNavigationSidebar';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface SubCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  groupEn?: string;
  groupAr?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  subcategories: SubCategory[];
}

export interface MarketplaceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryId: string;
  subCategoryId: string;
  groupEn?: string;
  groupAr?: string;
  image: string;
  descriptionEn: string;
  descriptionAr: string;
  fullDescriptionEn?: string;
  fullDescriptionAr?: string;
  rating: number;
  reviewsCount: number;
  locationEn: string;
  locationAr: string;
  priceEn: string;
  priceAr: string;
  badgeEn?: string;
  badgeAr?: string;
  tagsEn: string[];
  tagsAr: string[];
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  verified?: boolean;
}

// ==========================================
// TAXONOMY DATA STRUCTURE
// ==========================================

export const MARKETPLACE_CATEGORIES: Category[] = [
  {
    id: 'education',
    nameEn: 'Education',
    nameAr: 'التعليم',
    icon: GraduationCap,
    color: '#633BE8',
    bgLight: '#ECE8FD',
    subcategories: [
      { id: 'schools', nameEn: 'Schools', nameAr: 'مدارس دمج', groupEn: 'Child', groupAr: 'الطفل' },
      { id: 'nurseries', nameEn: 'Nurseries', nameAr: 'حضانات ورياض أطفال', groupEn: 'Child', groupAr: 'الطفل' },
      { id: 'parent-workshops', nameEn: 'Parents Training / Workshops', nameAr: 'تدريب وورش عمل لأولياء الأمور', groupEn: 'Parent', groupAr: 'أولياء الأمور' },
    ]
  },
  {
    id: 'therapeutic-medical',
    nameEn: 'Therapeutic & Medical',
    nameAr: 'العلاج والصحة الطبية',
    icon: Stethoscope,
    color: '#0284C7',
    bgLight: '#E0F2FE',
    subcategories: [
      { id: 'hospitals', nameEn: 'Hospitals', nameAr: 'مستشفيات تخصصیة' },
      { id: 'clinics', nameEn: 'Clinics', nameAr: 'عيادات طبية' },
      { id: 'therapy-centers', nameEn: 'Therapy Centers', nameAr: 'مراكز تأهيل وعلاج' },
      { id: 'pharmacies', nameEn: 'Pharmacies', nameAr: 'صيدليات تخصصية' },
      { id: 'labs', nameEn: 'Labs', nameAr: 'معامل وتحاليل' },
    ]
  },
  {
    id: 'activities',
    nameEn: 'Activities',
    nameAr: 'الأنشطة والفعاليات',
    icon: Activity,
    color: '#D97706',
    bgLight: '#FEF3C7',
    subcategories: [
      { id: 'camps', nameEn: 'Camps', nameAr: 'معسكرات ورحلات' },
      { id: 'clubs', nameEn: 'Clubs', nameAr: 'أندية رياضية واجتماعية' },
      { id: 'parks', nameEn: 'Parks', nameAr: 'حدائق ومتنزهات مؤهلة' },
      { id: 'academies-sports', nameEn: 'Sports Academies', nameAr: 'أكاديميات رياضية', groupEn: 'Academies', groupAr: 'أكاديميات' },
      { id: 'academies-music', nameEn: 'Music Academies', nameAr: 'أكاديميات موسيقى', groupEn: 'Academies', groupAr: 'أكاديميات' },
      { id: 'academies-art', nameEn: 'Art Academies', nameAr: 'أكاديميات فن ورسم', groupEn: 'Academies', groupAr: 'أكاديميات' },
      { id: 'academies-coding', nameEn: 'Coding / Robotics', nameAr: 'برمجة وروبوتات', groupEn: 'Academies', groupAr: 'أكاديميات' },
    ]
  },
  {
    id: 'equipments-products',
    nameEn: 'Equipments & Products',
    nameAr: 'المعدات والمنتجات',
    icon: Package,
    color: '#059669',
    bgLight: '#D1FAE5',
    subcategories: [
      { id: 'educational-tools', nameEn: 'Educational Tools & Materials (Edu)', nameAr: 'أدوات ووسائل تعليمية (Edu)' },
      { id: 'therapeutic-equipment', nameEn: 'Therapeutic Equipment', nameAr: 'معدات وأدوات علاجية' },
      { id: 'sensory-tools', nameEn: 'Sensory Tools', nameAr: 'أدوات الدعم الحسي' },
      { id: 'assistive-devices', nameEn: 'Assistive Devices & Technology', nameAr: 'أجهزة وتكنولوجيا مساعدة' },
      { id: 'child-products', nameEn: 'Child Products & Essentials', nameAr: 'منتجات ومستلزمات الطفل' },
    ]
  },
  {
    id: 'services-professionals',
    nameEn: 'Services & Professionals',
    nameAr: 'الخدمات والمختصين',
    icon: UserCheck,
    color: '#E11D48',
    bgLight: '#FFE4E6',
    subcategories: [
      { id: 'therapists', nameEn: 'Therapists', nameAr: 'أخصائيين واستشاريين' },
      { id: 'shadow-teachers', nameEn: 'Shadow Teachers', nameAr: 'معلمين ظل (Shadow Teachers)' },
    ]
  }
];

// ==========================================
// MOCK DATA
// ==========================================

export const MARKETPLACE_MOCK_ITEMS: MarketplaceItem[] = [
  // Education - Child - Schools
  {
    id: 'item-1',
    titleEn: 'Green Valley Inclusive International School',
    titleAr: 'مدرسة الوادي الأخضر الدولية الدامجة',
    categoryId: 'education',
    subCategoryId: 'schools',
    groupEn: 'Child',
    groupAr: 'الطفل',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Fully equipped inclusive school with specialized IEP plans, shadow teacher support, and sensory classrooms.',
    descriptionAr: 'مدرسة دولية دمج متكاملة توفر خطط تعليمية فردية (IEP) ودعم المعلم المساعد وغرف تكامل حسي حديثة.',
    fullDescriptionEn: 'Green Valley Inclusive International School is dedicated to providing high-quality British & American curriculum education integrated with customized support for students with Autism, ADHD, and Learning Differences.',
    fullDescriptionAr: 'مدرسة الوادي الأخضر الدولية تلتزم بتقديم مناهج بريطانية وأمريكية عالية الجودة مع توفير برنامج دمج متكامل لدعم الأطفال ذوي طيف التوحد وفرط الحركة وصعوبات التعلم.',
    rating: 4.9,
    reviewsCount: 48,
    locationEn: 'New Cairo, Egypt',
    locationAr: 'القاهرة الجديدة، مصر',
    priceEn: 'Tuition on Request',
    priceAr: 'مصاريف حسب المرحلة',
    badgeEn: 'Verified Inclusive',
    badgeAr: 'مدرسة دمج معتمدة',
    tagsEn: ['Inclusive Education', 'IEP Programs', 'Sensory Room'],
    tagsAr: ['دمج تعليمي', 'خطط فردية', 'غرفة حسية'],
    contactPhone: '+20 100 888 7766',
    contactEmail: 'admissions@greenvalley.edu.eg',
    website: 'https://greenvalley.edu.eg',
    verified: true,
  },
  // Education - Child - Nurseries
  {
    id: 'item-2',
    titleEn: 'Little Champions Inclusive Nursery',
    titleAr: 'حضانات الأبطال الصغار التخصصية',
    categoryId: 'education',
    subCategoryId: 'nurseries',
    groupEn: 'Child',
    groupAr: 'الطفل',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Early intervention nursery focusing on speech stimulation, motor skills development, and peer integration.',
    descriptionAr: 'حضانة تدخل مبكر تركز على تحفيز النطق وتطوير المهارات الحركية والدمج الاجتماعي بين الأطفال.',
    rating: 4.8,
    reviewsCount: 32,
    locationEn: 'Sheikh Zayed, Giza',
    locationAr: 'الشيخ زايد، الجيزة',
    priceEn: '$350 / Month',
    priceAr: '350$ / شهرياً',
    badgeEn: 'Early Intervention',
    badgeAr: 'تدخل مبكر',
    tagsEn: ['Speech Stimulation', 'Early Intervention', 'Motor Skills'],
    tagsAr: ['تنمية نطق', 'تدخل مبكر', 'مهارات حركية'],
    contactPhone: '+20 122 333 4455',
    contactEmail: 'info@littlechampions.com',
    verified: true,
  },
  // Education - Parent - Workshops
  {
    id: 'item-3',
    titleEn: 'Positive Behavior Support Workshop for Parents',
    titleAr: 'ورشة عمل دعم السلوك الإيجابي لأولياء الأمور',
    categoryId: 'education',
    subCategoryId: 'parent-workshops',
    groupEn: 'Parent',
    groupAr: 'أولياء الأمور',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Interactive 4-week training program equipping parents with ABA principles and meltdown management techniques.',
    descriptionAr: 'برنامج تدريبي تفاعلي مدته 4 أسابيع يزود الآباء بأساسيات تحليل السلوك التطبيقي (ABA) واستراتيجيات التعامل مع النوبات الحركية.',
    rating: 4.9,
    reviewsCount: 56,
    locationEn: 'Online & On-Site (Maadi)',
    locationAr: 'أونلاين وحضوري (المعادي)',
    priceEn: '$80 / Workshop',
    priceAr: '80$ / للورشة الكاملة',
    badgeEn: 'Parent Certificate',
    badgeAr: 'شهادة حضور للوالدين',
    tagsEn: ['ABA Techniques', 'Parent Coaching', 'Behavioral Support'],
    tagsAr: ['تقنيات ABA', 'تدريب الوالدين', 'دعم سلوكي'],
    contactPhone: '+20 111 222 3344',
    contactEmail: 'workshops@looplyparent.org',
    verified: true,
  },

  // Therapeutic & Medical - Therapy Centers
  {
    id: 'item-4',
    titleEn: 'Sensory & Speech Rehabilitation Center',
    titleAr: 'مركز التكامل الحسي وعلاج التخاطب التخصصي',
    categoryId: 'therapeutic-medical',
    subCategoryId: 'therapy-centers',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Multidisciplinary rehabilitation center offering Speech Therapy, Occupational Therapy (OT), and Psychomotor sessions.',
    descriptionAr: 'مركز تأهيل متكامل يقدم جلسات التخاطب، العلاج الوظيفي (OT)، وتنمية المهارات والحساب والتكامل الحسي.',
    rating: 5.0,
    reviewsCount: 84,
    locationEn: 'Nasr City, Cairo',
    locationAr: 'مدينة نصر، القاهرة',
    priceEn: '$25 / Session',
    priceAr: '25$ / للجلسة',
    badgeEn: 'Top Rated Center',
    badgeAr: 'المركز الأعلى تقييماً',
    tagsEn: ['Speech Therapy', 'Occupational Therapy', 'Sensory Gym'],
    tagsAr: ['تخاطب', 'علاج وظيفي', 'صالة حسية'],
    contactPhone: '+20 109 999 8877',
    contactEmail: 'contact@sensorycenter.eg',
    verified: true,
  },
  // Therapeutic & Medical - Clinics
  {
    id: 'item-5',
    titleEn: 'Pediatric Neurology & Psychiatry Clinic',
    titleAr: 'عيادة طب أعصاب وطب نفسية الأطفال',
    categoryId: 'therapeutic-medical',
    subCategoryId: 'clinics',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Expert pediatric neurologists specializing in EEG assessment, developmental evaluations, and medication management.',
    descriptionAr: 'نخبة من أساتذة طب أعصاب الأطفال للتقييمات الإكلينيكية، رسم المخ (EEG)، ومتابعة النمو التطوري.',
    rating: 4.8,
    reviewsCount: 39,
    locationEn: 'Heliopolis, Cairo',
    locationAr: 'مصر الجديدة، القاهرة',
    priceEn: '$40 Consultation',
    priceAr: '40$ للكشف',
    badgeEn: 'Senior Consultants',
    badgeAr: 'استشاريون كبار',
    tagsEn: ['Pediatric EEG', 'Developmental Checkup', 'ADHD Assessment'],
    tagsAr: ['رسم مخ للأطفال', 'تقييم نمائي', 'فحص ADHD'],
    contactPhone: '+20 100 111 2233',
    verified: true,
  },
  // Therapeutic & Medical - Pharmacies
  {
    id: 'item-6',
    titleEn: 'CarePlus Specialized Pharmacy',
    titleAr: 'صيدلية كير بلس للأدوية والمكملات التخصصية',
    categoryId: 'therapeutic-medical',
    subCategoryId: 'pharmacies',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Specialized pharmacy providing imported dietary supplements, gluten-free items, and neurological prescriptions.',
    descriptionAr: 'صيدلية متخصصة توفر المكملات الغذائية المستوردة، المنتجات الخالية من الجلوتين، وأدوية الأعصاب الدقيقة.',
    rating: 4.7,
    reviewsCount: 22,
    locationEn: 'Dokki, Giza',
    locationAr: 'الدقي، الجيزة',
    priceEn: 'Varies',
    priceAr: 'حسب الصنف',
    badgeEn: 'Gluten-Free & Supplements',
    badgeAr: 'مكملات ومنتجات خالية من الجلوتين',
    tagsEn: ['Supplements', 'Gluten Free', 'Prescription Care'],
    tagsAr: ['مكملات غذائية', 'خالي من الجلوتين', 'أدوية تخصصية'],
    contactPhone: '+20 120 777 6655',
    verified: true,
  },

  // Activities - Academies - Sports
  {
    id: 'item-7',
    titleEn: 'Adaptive Swimming & Sports Academy',
    titleAr: 'أكاديمية السباحة والرياضة المعدلة للأبطال',
    categoryId: 'activities',
    subCategoryId: 'academies-sports',
    groupEn: 'Academies',
    groupAr: 'أكاديميات',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Hydrotherapy and adaptive swimming lessons certified by international adaptive sports coaches.',
    descriptionAr: 'جلسات علاج مائي وأكاديمية سباحة مخصصة للأطفال ذوي الهمم تحت إشراف مدربين معتمدين دولياً.',
    rating: 4.9,
    reviewsCount: 61,
    locationEn: '5th Settlement, New Cairo',
    locationAr: 'التجمع الخامس، القاهرة الجديدة',
    priceEn: '$60 / Month',
    priceAr: '60$ / شهرياً',
    badgeEn: 'Hydrotherapy Pool',
    badgeAr: 'حمام سباحة دافئ مجهز',
    tagsEn: ['Hydrotherapy', 'Adaptive Swimming', 'Physical Health'],
    tagsAr: ['علاج مائي', 'سباحة دمج', 'لياقة بدنية'],
    contactPhone: '+20 100 555 4433',
    verified: true,
  },
  // Activities - Academies - Robotics
  {
    id: 'item-8',
    titleEn: 'Future Tech & Robotics Academy for Champions',
    titleAr: 'أكاديمية تكنولوجيا المستقبل والروبوتات للأطفال',
    categoryId: 'activities',
    subCategoryId: 'academies-coding',
    groupEn: 'Academies',
    groupAr: 'أكاديميات',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Hands-on LEGO robotics and Scratch programming designed specifically for neurodiverse young minds.',
    descriptionAr: 'دورات تفاعلية لتركيب روبوتات LEGO والبرمجة بلغة سكراتش مخصصة لتنمية ذكاء وحل مشكلات الأطفال.',
    rating: 4.8,
    reviewsCount: 29,
    locationEn: 'Rehab City, Cairo',
    locationAr: 'مدينة الرحاب، القاهرة',
    priceEn: '$75 / Course',
    priceAr: '75$ / للكورس',
    badgeEn: 'STEM Certified',
    badgeAr: 'اعتماد STEM العالمي',
    tagsEn: ['STEM', 'Robotics', 'Coding for Kids'],
    tagsAr: ['STEM', 'روبوتات', 'برمجة الأطفال'],
    contactPhone: '+20 115 444 3322',
    verified: true,
  },
  // Activities - Camps
  {
    id: 'item-9',
    titleEn: 'Summer Inclusive Nature & Adventure Camp',
    titleAr: 'معسكر الطبيعة والمغامرات الصيفي الدامج',
    categoryId: 'activities',
    subCategoryId: 'camps',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Outdoor sensory nature camp featuring zip-line, horse riding therapy, and social team games with full medical safety.',
    descriptionAr: 'معسكر صيفي في الطبيعة يشمل علاج بركوب الخيل، أنشطة حركية، وألعاب اجتماعية تحت إشراف فريق طبي ونفسي.',
    rating: 4.9,
    reviewsCount: 45,
    locationEn: 'Fayoum Nature Reserve & Giza',
    locationAr: 'محمية الفيوم والجيزة',
    priceEn: '$120 / Weekend Camp',
    priceAr: '120$ / كامب نهاية الأسبوع',
    badgeEn: 'Outdoor Therapy',
    badgeAr: 'علاج بالطبيعة والخيل',
    tagsEn: ['Equine Therapy', 'Outdoor Fun', 'Teamwork'],
    tagsAr: ['ركوب الخيل التأهيلي', 'أنشطة خارجية', 'عمل جماعي'],
    contactPhone: '+20 102 999 1122',
    verified: true,
  },

  // Equipments & Products - Sensory Tools
  {
    id: 'item-10',
    titleEn: 'Calming Weighted Blanket & Compression Vest Set',
    titleAr: 'طقم البطانية الثقيلة وسترة الضغط المهدئة للأعصاب',
    categoryId: 'equipments-products',
    subCategoryId: 'sensory-tools',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Hypoallergenic premium weighted blanket (4kg) and adjustable compression vest for deep pressure sensory input.',
    descriptionAr: 'بطانية ثقيلة مضادة للحساسية وززن 4 كجم مع سترة ضغط قابلة للتعديل لتوفير مدخلات الضغط العميق والاسترخاء.',
    rating: 4.9,
    reviewsCount: 112,
    locationEn: 'Nationwide Delivery',
    locationAr: 'توصيل لجميع المحافظات',
    priceEn: '$45.00',
    priceAr: '45.00$',
    badgeEn: 'Best Seller',
    badgeAr: 'الأكثر مبيعاً',
    tagsEn: ['Deep Pressure', 'Sensory Regulation', 'Sleep Support'],
    tagsAr: ['ضغط عميق', 'تنظيم حسي', 'تحسين النوم'],
    contactPhone: '+20 101 222 9988',
    verified: true,
  },
  // Equipments & Products - Assistive Technology
  {
    id: 'item-11',
    titleEn: 'AAC Speech Communication Tablet with Eye-Tracking',
    titleAr: 'تابلت التواصل اللفظي البديل (AAC) بتتبع العين',
    categoryId: 'equipments-products',
    subCategoryId: 'assistive-devices',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Augmentative & Alternative Communication device pre-loaded with Arabic/English PECS software and eye-gaze technology.',
    descriptionAr: 'جهاز تواصل معزز وبديل مزود برمجيات التخاطب بالصور (PECS) باللغتين العربية والإنجليزية وتقنية التتبع البصري.',
    rating: 5.0,
    reviewsCount: 18,
    locationEn: 'Online Store & Showroom',
    locationAr: 'المتجر الإلكتروني والمعرض',
    priceEn: '$290.00',
    priceAr: '290.00$',
    badgeEn: 'Assistive Tech Winner',
    badgeAr: 'تكنولوجيا مساعدة متطورة',
    tagsEn: ['AAC Device', 'Eye Tracking', 'Arabic PECS'],
    tagsAr: ['جهاز AAC', 'تتبع بصري', 'تواصل بالصور'],
    contactPhone: '+20 100 000 1199',
    website: 'https://looplyassist.com',
    verified: true,
  },
  // Equipments & Products - Educational Tools
  {
    id: 'item-12',
    titleEn: 'Interactive Montessori Sensory & Math Wooden Kit',
    titleAr: 'حقيبة منتسوري الخشبية للتطوير الحسي والحسابي',
    categoryId: 'equipments-products',
    subCategoryId: 'educational-tools',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'High-quality non-toxic wooden Montessori learning blocks designed for tactile motor skills and cognitive math concepts.',
    descriptionAr: 'مجموعة مكعبات وأشكال منتسوري خشبية آمنة مائة بالمائة لتنمية المهارات الحركية الدقيقة والمفاهيم الرياضية.',
    rating: 4.8,
    reviewsCount: 67,
    locationEn: 'Cairo & Alexandria',
    locationAr: 'القاهرة والإسكندرية',
    priceEn: '$32.00',
    priceAr: '32.00$',
    badgeEn: 'Eco-Friendly Wood',
    badgeAr: 'خشب طبيعي آمن',
    tagsEn: ['Montessori', 'Fine Motor Skills', 'Tactile Learning'],
    tagsAr: ['منتسوري', 'مهارات حركية دقيقة', 'تعلم لمسي'],
    contactPhone: '+20 114 888 3344',
    verified: true,
  },

  // Services & Professionals - Therapists
  {
    id: 'item-13',
    titleEn: 'Dr. Sarah Mansour - Senior Speech & Behavior Consultant',
    titleAr: 'د. سارة منصور - استشاري تخاطب وتعديل سلوك معتمد',
    categoryId: 'services-professionals',
    subCategoryId: 'therapists',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    descriptionEn: '12+ years experience in Speech-Language Pathology, Verbal Behavior (VB-MAPP) assessments, and home plans.',
    descriptionAr: 'أكثر من 12 عاماً خبرة في اضطرابات اللسان والتخاطب، تقييمات VB-MAPP، وإعداد الخطط التأهيلية المنزلية.',
    rating: 5.0,
    reviewsCount: 94,
    locationEn: 'Maadi Clinic & Online Consultations',
    locationAr: 'عيادة المعادي واستشارات أونلاين',
    priceEn: '$35 / Consultation',
    priceAr: '35$ / الجلسة الاستشارية',
    badgeEn: 'Board Certified SLP',
    badgeAr: 'استشاري معتمد تخاطب',
    tagsEn: ['Speech Pathology', 'VB-MAPP', 'Behavior Analysis'],
    tagsAr: ['أمراض نطق وتخاطب', 'VB-MAPP', 'تحليل سلوك'],
    contactPhone: '+20 109 111 2244',
    contactEmail: 'dr.sarah@looplyspecialist.com',
    verified: true,
  },
  // Services & Professionals - Shadow Teachers
  {
    id: 'item-14',
    titleEn: 'Eng. Kareem Hassan - Certified Special Needs Shadow Teacher',
    titleAr: 'أ. كريم حسن - معلم ظل (Shadow Teacher) معتمد للدمج',
    categoryId: 'services-professionals',
    subCategoryId: 'shadow-teachers',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Certified shadow teacher specialized in supporting children with Autism and ADHD inside private and international schools.',
    descriptionAr: 'معلم مرافقة (Shadow Teacher) معتمد متخصص في دمج ومرافقة الأطفال داخل المدارس الخاصة والدولية ومتابعة الأداء الأكاديمي والسلوكي.',
    rating: 4.9,
    reviewsCount: 41,
    locationEn: 'New Cairo & 6th of October',
    locationAr: 'القاهرة الجديدة و6 أكتوبر',
    priceEn: 'Monthly Rate on Request',
    priceAr: 'راتب شهري حسب الساعات',
    badgeEn: 'School Shadow Certified',
    badgeAr: 'معلم ظل معتمد للمدارس',
    tagsEn: ['Shadow Teacher', 'Classroom Integration', 'ADHD Support'],
    tagsAr: ['معلم ظل', 'دمج في الفصل', 'دعم فرط الحركة'],
    contactPhone: '+20 122 888 1100',
    verified: true,
  },

  // Therapeutic & Medical - Hospitals
  {
    id: 'item-15',
    titleEn: 'Hope Children & Rehabilitation Hospital',
    titleAr: 'مستشفى الأمل التخصصي لأعصاب وتأهيل الأطفال',
    categoryId: 'therapeutic-medical',
    subCategoryId: 'hospitals',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'State-of-the-art specialized hospital providing 24/7 pediatric emergency, inpatient neuro-rehabilitation, and hydro-therapy wards.',
    descriptionAr: 'مستشفى تخصصي متكامل يقدم طوارئ الأطفال على مدار الساعة، أقسام إعادة التأهيل العصبي، وأجنحة العلاج المائي.',
    rating: 4.9,
    reviewsCount: 78,
    locationEn: 'New Cairo, Egypt',
    locationAr: 'القاهرة الجديدة، مصر',
    priceEn: 'Inpatient & Outpatient Care',
    priceAr: 'رعاية داخلية وعيادات خارجية',
    badgeEn: '24/7 Specialized Care',
    badgeAr: 'طوارئ ورعاية 24/7',
    tagsEn: ['Pediatric Hospital', 'Neuro Rehab', 'Emergency Care'],
    tagsAr: ['مستشفى أطفال', 'تأهيل عصبي', 'رعاية طوارئ'],
    contactPhone: '+20 100 999 0000',
    verified: true,
  },

  // Therapeutic & Medical - Labs
  {
    id: 'item-16',
    titleEn: 'BioGenetics & Development Diagnostics Lab',
    titleAr: 'معمل بيوجينيتكس للتحاليل الجينية والنمائية للأطفال',
    categoryId: 'therapeutic-medical',
    subCategoryId: 'labs',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Advanced lab specialized in metabolic screening, genetic micro-array testing, and heavy metal allergy panels.',
    descriptionAr: 'معمل متطور متخصص في تحاليل التمثيل الغذائي، الفحوصات الجينية الدقيقة، وفحوصات الحساسية والمعادن الثقيلة.',
    rating: 4.8,
    reviewsCount: 52,
    locationEn: 'Heliopolis & Dokki',
    locationAr: 'مصر الجديدة والدقي',
    priceEn: 'Test Package Discounts',
    priceAr: 'خصومات باقات التحاليل',
    badgeEn: 'Genetic Certified',
    badgeAr: 'معتمد للفحوصات الجينية',
    tagsEn: ['Genetic Testing', 'Metabolic Panel', 'Allergy Test'],
    tagsAr: ['فحوصات جينات', 'تحاليل تمثيل غذائي', 'تحاليل حساسية'],
    contactPhone: '+20 111 888 2211',
    verified: true,
  },

  // Activities - Clubs
  {
    id: 'item-17',
    titleEn: 'Champions Inclusive Family Sports Club',
    titleAr: 'نادي الأبطال الدامج للرياضة والأنشطة العائلية',
    categoryId: 'activities',
    subCategoryId: 'clubs',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Fully accessible sports club with sensory-safe play zones, Special Olympics training courts, and family swimming pools.',
    descriptionAr: 'نادي رياضي دامج ومجهز بالكامل بملاعب الأولمبياد الخاص، منطقة ألعاب حسية آمنة، وحمامات سباحة عائلية.',
    rating: 4.9,
    reviewsCount: 88,
    locationEn: '6th of October City',
    locationAr: 'مدينة السادس من أكتوبر',
    priceEn: 'Annual Membership',
    priceAr: 'اشتراك سنوي للعائلة',
    badgeEn: 'Special Olympics Partner',
    badgeAr: 'شريك الأولمبياد الخاص',
    tagsEn: ['Accessible Sports', 'Family Club', 'Special Olympics'],
    tagsAr: ['رياضة دمج', 'نادي عائلي', 'أولمبياد خاص'],
    contactPhone: '+20 102 777 5544',
    verified: true,
  },

  // Activities - Parks
  {
    id: 'item-18',
    titleEn: 'Sensory Harmony Inclusive Public Park',
    titleAr: 'حديقة النغم الحسي العامة والدامجة للأطفال',
    categoryId: 'activities',
    subCategoryId: 'parks',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Public park designed with wheelchair swings, tactile sensory gardens, quiet zones, and trained safety staff.',
    descriptionAr: 'حديقة متنزه عامة مصممة بأراجيح كراسي متحركة، حدائق زهور لمسية، مناطق هدوء حسية، وأطقم أمن ومدربين.',
    rating: 4.7,
    reviewsCount: 65,
    locationEn: 'Zamalk & Al-Azhar Park Area',
    locationAr: 'الزمالك ومنطقة حديقة الأزهر',
    priceEn: 'Free Entry / Nominal',
    priceAr: 'دخول مجاني / رمزي',
    badgeEn: 'Sensory Park',
    badgeAr: 'حديقة حسية آمنة',
    tagsEn: ['Wheelchair Swings', 'Sensory Garden', 'Quiet Zone'],
    tagsAr: ['أراجيح دمج', 'حديقة حسية', 'منطقة هدوء'],
    contactPhone: '+20 100 444 3311',
    verified: true,
  },

  // Activities - Academies - Music
  {
    id: 'item-19',
    titleEn: 'Rhythm & Harmony Music Therapy Academy',
    titleAr: 'أكاديمية الإيقاع والنغم للعلاج والتعليم الموسيقي',
    categoryId: 'activities',
    subCategoryId: 'academies-music',
    groupEn: 'Academies',
    groupAr: 'أكاديميات',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Interactive music education & therapy sessions using piano, drums, and vocal techniques to improve focus and speech.',
    descriptionAr: 'دروس وتأهيل بالآلات الموسيقية (البيانو والطبول والنغم) لتعزيز التركيز، النطق، والتعبير الانفعالي السليم.',
    rating: 4.9,
    reviewsCount: 37,
    locationEn: 'Maadi, Cairo',
    locationAr: 'المعادي، القاهرة',
    priceEn: '$40 / Month',
    priceAr: '40$ / شهرياً',
    badgeEn: 'Music Therapy',
    badgeAr: 'علاج بالموسيقى',
    tagsEn: ['Music Therapy', 'Piano & Drums', 'Focus Building'],
    tagsAr: ['علاج بالموسيقى', 'بيانو وطبول', 'بناء التركيز'],
    contactPhone: '+20 112 555 6677',
    verified: true,
  },

  // Activities - Academies - Art
  {
    id: 'item-20',
    titleEn: 'Creative Colors Art Therapy Studio',
    titleAr: 'استوديو الألوان المبدعة للعلاج بالفن والرسم',
    categoryId: 'activities',
    subCategoryId: 'academies-art',
    groupEn: 'Academies',
    groupAr: 'أكاديميات',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Therapeutic art studio exploring pottery, tactile painting, and color expression for motor skills and emotional release.',
    descriptionAr: 'استوديو فني تأهيلي لتعليم الفخار، الرسم اللمسي باليدين، والتعبير بالألوان لتنمية مهارات الأصابع والتنفيس الانفعالي.',
    rating: 4.8,
    reviewsCount: 31,
    locationEn: 'Heliopolis, Cairo',
    locationAr: 'مصر الجديدة، القاهرة',
    priceEn: '$35 / Month',
    priceAr: '35$ / شهرياً',
    badgeEn: 'Art Therapy',
    badgeAr: 'علاج بالفن والرسم',
    tagsEn: ['Art Therapy', 'Pottery & Colors', 'Fine Motor'],
    tagsAr: ['علاج بالفن', 'فخار وألوان', 'حركة دقيقة'],
    contactPhone: '+20 101 444 8899',
    verified: true,
  },

  // Equipments & Products - Therapeutic Equipment
  {
    id: 'item-21',
    titleEn: 'Balance & Posture Hydro/Motor Therapy Board',
    titleAr: 'لوح التوازن والتأهيل الحركي والاتزان الجسدي',
    categoryId: 'equipments-products',
    subCategoryId: 'therapeutic-equipment',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Professional vestibular balance board with adjustable non-slip handles for physical therapy and coordination exercises.',
    descriptionAr: 'لوح اتزان حركي مخصص لتمارين الدهليز ومقابض غير قابلة للانزلاق لتدريبات العلاج الطبيعي والتنسيق الحركي.',
    rating: 4.9,
    reviewsCount: 44,
    locationEn: 'Nationwide Delivery',
    locationAr: 'توصيل لجميع المحافظات',
    priceEn: '$55.00',
    priceAr: '55.00$',
    badgeEn: 'Physical Therapy Quality',
    badgeAr: 'جودة علاج طبيعي معتمدة',
    tagsEn: ['Vestibular Board', 'Motor Therapy', 'Balance'],
    tagsAr: ['لوح اتزان', 'تأهيل حركي', 'تنسيق قوام'],
    contactPhone: '+20 109 333 2211',
    verified: true,
  },

  // Equipments & Products - Medical Supplies
  {
    id: 'item-22',
    titleEn: 'Portable Silent Mesh Nebulizer & O2 Monitor Kit',
    titleAr: 'جهاز النيبولايزر الصامت المحمول ومقياس الأكسجين',
    categoryId: 'equipments-products',
    subCategoryId: 'medical-supplies',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Ultra-silent handheld USB rechargeable mesh nebulizer with pediatric masks and pulse oximeter for home & travel.',
    descriptionAr: 'جهاز جلسات تنفس صامت محمول يعمل بالشحن ومزود بأقنعة أطفال ومقياس أكسجين بالدم للمنزل والسفر.',
    rating: 4.8,
    reviewsCount: 98,
    locationEn: 'Online Store',
    locationAr: 'المتجر الإلكتروني',
    priceEn: '$38.00',
    priceAr: '38.00$',
    badgeEn: 'Ultra Silent Tech',
    badgeAr: 'تقنية صامتة تماماً للأطفال',
    tagsEn: ['Silent Nebulizer', 'Pediatric Care', 'Travel Kit'],
    tagsAr: ['نيبولايزر صامت', 'جلسات تنفس', 'جهاز محمول'],
    contactPhone: '+20 120 444 5566',
    verified: true,
  },

  // Equipments & Products - Child Products
  {
    id: 'item-23',
    titleEn: 'Ergonomic Adaptive Seat Support Cushion & Harness',
    titleAr: 'وسادة ومقعد الدعم الأرجونومي للأطفال في الدراسة والسيارة',
    categoryId: 'equipments-products',
    subCategoryId: 'child-products',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Memory foam adaptive posture cushion with safety 5-point harness suitable for study chairs, wheelchairs, and car seats.',
    descriptionAr: 'وسادة رغوة ميموري فوم لدعم العمود الفقري والجلسة الصحيحة مع حزام أمان خماسي للمقاعد والكراسي المتحركة.',
    rating: 4.9,
    reviewsCount: 73,
    locationEn: 'Cairo & Giza Showrooms',
    locationAr: 'معارض القاهرة والجيزة',
    priceEn: '$48.00',
    priceAr: '48.00$',
    badgeEn: 'Posture Support',
    badgeAr: 'دعم القوام والظهر',
    tagsEn: ['Posture Cushion', 'Adaptive Seating', 'Ergonomic'],
    tagsAr: ['وسادة قوام', 'مقعد مريح', 'دعم الظهر'],
  }
];

// ==========================================
// MAIN MARKETPLACE COMPONENT
// ==========================================

export function Marketplace() {
  const { lang } = useLanguage();
  
  // Filtering States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  
  // Selected Item Modal State
  const [activeItemModal, setActiveItemModal] = useState<MarketplaceItem | null>(null);
  const [bookingSuccessModal, setBookingSuccessModal] = useState<boolean>(false);

  // Active Category Object
  const currentCategoryObj = useMemo(() => {
    return MARKETPLACE_CATEGORIES.find(c => c.id === selectedCategory);
  }, [selectedCategory]);

  // Extract unique locations for filtering
  const availableLocations = useMemo(() => {
    const locsSet = new Set<string>();
    MARKETPLACE_MOCK_ITEMS.forEach(item => {
      locsSet.add(lang === 'ar' ? item.locationAr : item.locationEn);
    });
    return Array.from(locsSet);
  }, [lang]);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return MARKETPLACE_MOCK_ITEMS.filter(item => {
      // Category Filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }
      // Subcategory Filter
      if (selectedSubCategory !== 'all' && item.subCategoryId !== selectedSubCategory) {
        return false;
      }
      // Rating Filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }
      // Verified Filter
      if (onlyVerified && !item.verified) {
        return false;
      }
      // Location Filter
      if (selectedLocation !== 'all') {
        const itemLoc = lang === 'ar' ? item.locationAr : item.locationEn;
        if (itemLoc !== selectedLocation) return false;
      }
      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleMatch = item.titleEn.toLowerCase().includes(q) || item.titleAr.toLowerCase().includes(q);
        const descMatch = item.descriptionEn.toLowerCase().includes(q) || item.descriptionAr.toLowerCase().includes(q);
        const tagMatch = item.tagsEn.some(t => t.toLowerCase().includes(q)) || item.tagsAr.some(t => t.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSubCategory, minRating, onlyVerified, selectedLocation, searchQuery, lang]);

  return (
    <div className="space-y-6 font-sans pb-16 animate-fade-in">
      
      {/* 🌟 HERO BANNER */}
      <div 
        className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg"
        style={{ background: 'linear-gradient(135deg, #633BE8 0%, #9C7AF2 50%, #0284C7 100%)' }}
      >
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ar' ? 'سوق خدمات ومنتجات الأهل' : 'Parents Portal Marketplace'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            {lang === 'ar' 
              ? 'دليلك الشامل للمدارس والمراكز والمنتجات التخصصية'
              : 'Discover Trusted Schools, Therapy Centers & Assistive Tools'}
          </h1>
          
          <p className="text-sm text-[#ECE8FD] font-medium leading-relaxed">
            {lang === 'ar'
              ? 'استكشف المدارس المعتمدة للدمج، مراكز التأهيل، الأخصائيين الموثوقين، والأدوات الحسية والتكنولوجية المخصصة لطرق نمو طفلك.'
              : 'Browse verified inclusive schools, therapy centers, expert specialists, sensory equipment, and assistive tech tailored for your child.'}
          </p>

          {/* Search Input Bar inside Hero */}
          <div className="pt-2">
            <div className="relative max-w-2xl">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-4 rtl:left-auto" />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث باسم المركز، المدرسة، الأخصائي، أو الأدوات الحسية...' : 'Search by school, clinic, therapist name, or sensory tool...'}
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-semibold rounded-2xl pl-12 pr-4 py-3.5 rtl:pr-12 rtl:pl-4 focus:outline-none focus:ring-4 focus:ring-white/40 shadow-xl transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 rtl:left-4 rtl:right-auto"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/3 w-48 h-48 bg-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* 🌟 TWO-COLUMN LAYOUT: Left Floating Services Sidebar + Right Viewport */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column: Standalone Services Navigation Sidebar */}
        <ServicesNavigationSidebar
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setSelectedSubCategory('all');
          }}
          onSelectSubCategory={(catId, subId) => {
            setSelectedCategory(catId);
            setSelectedSubCategory(subId);
          }}
          onResetFilters={() => {
            setSelectedCategory('all');
            setSelectedSubCategory('all');
            setSearchQuery('');
            setMinRating(0);
            setSelectedLocation('all');
            setOnlyVerified(false);
          }}
        />

        {/* Right Column: Viewport & Results */}
        <div className="flex-1 w-full space-y-6">

      {/* 🎛️ FILTERS & SEARCH SUMMARY TOOLBAR */}
      <div className="bg-white rounded-3xl p-4 border border-[#ECE8FD] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Location Selector */}
          <div className="flex items-center gap-1.5 bg-[#FAFAFD] border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#633BE8]" />
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="bg-transparent text-[#2A2B47] font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">{lang === 'ar' ? 'جميع المناطق' : 'All Locations'}</option>
              {availableLocations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-1.5 bg-[#FAFAFD] border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="bg-transparent text-[#2A2B47] font-bold focus:outline-none cursor-pointer"
            >
              <option value={0}>{lang === 'ar' ? 'جميع التقييمات' : 'All Ratings'}</option>
              <option value={4.5}>{lang === 'ar' ? '4.5+ نجوم ⭐' : '4.5+ Stars ⭐'}</option>
              <option value={4.8}>{lang === 'ar' ? '4.8+ ممتازة ⭐' : '4.8+ Top Rated ⭐'}</option>
            </select>
          </div>

          {/* Verified Only Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer bg-[#FAFAFD] border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-extrabold text-[#2A2B47] hover:bg-slate-100 transition-colors">
            <input 
              type="checkbox"
              checked={onlyVerified}
              onChange={e => setOnlyVerified(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#633BE8] focus:ring-[#633BE8]"
            />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'ar' ? 'المعتمدون فقط (Verified)' : 'Verified Only'}</span>
          </label>
        </div>

        {/* Count Summary */}
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#73758C] self-end md:self-auto">
          <span>{lang === 'ar' ? 'تم العثور على:' : 'Found:'}</span>
          <span className="bg-[#ECE8FD] text-[#633BE8] px-2.5 py-1 rounded-xl text-xs font-black">
            {filteredItems.length} {lang === 'ar' ? 'نتيجة' : 'results'}
          </span>
        </div>
      </div>

      {/* 📦 MARKETPLACE LISTINGS GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const catObj = MARKETPLACE_CATEGORIES.find(c => c.id === item.categoryId);

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-[#ECE8FD] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#633BE8]/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={lang === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-black text-[#2A2B47] shadow-xs">
                    {catObj && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catObj.color }}></span>
                    )}
                    <span>{catObj ? (lang === 'ar' ? catObj.nameAr : catObj.nameEn) : ''}</span>
                  </div>

                  {/* Verified Badge */}
                  {item.verified && (
                    <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'معتمد' : 'Verified'}</span>
                    </div>
                  )}

                  {/* Optional Custom Badge at Bottom Left */}
                  {item.badgeEn && (
                    <div className="absolute bottom-3 left-3 rtl:right-3 rtl:left-auto bg-[#633BE8] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                      {lang === 'ar' ? item.badgeAr : item.badgeEn}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Title & Group tag */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base font-black text-[#2A2B47] leading-snug group-hover:text-[#633BE8] transition-colors">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </h3>
                      {item.groupEn && (
                        <span className="shrink-0 text-[10px] font-extrabold bg-purple-100 text-[#633BE8] px-2 py-0.5 rounded-md">
                          {lang === 'ar' ? item.groupAr : item.groupEn}
                        </span>
                      )}
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center text-amber-500 font-black">
                        <Star className="w-4 h-4 fill-amber-500 mr-1 rtl:ml-1" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-400 font-semibold">({item.reviewsCount} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#73758C] font-medium line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(lang === 'ar' ? item.tagsAr : item.tagsEn).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-[#FAFAFD] text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Info & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <MapPin className="w-3 h-3 text-[#633BE8]" />
                        <span className="truncate max-w-[120px]">{lang === 'ar' ? item.locationAr : item.locationEn}</span>
                      </div>
                      <p className="text-xs font-black text-[#633BE8] mt-0.5">
                        {lang === 'ar' ? item.priceAr : item.priceEn}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveItemModal(item)}
                      className="bg-[#633BE8] hover:bg-[#9C7AF2] text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{lang === 'ar' ? 'التفاصيل والحجز' : 'View Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-[#ECE8FD] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-[#ECE8FD] text-[#633BE8] flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-lg font-black text-[#2A2B47]">
            {lang === 'ar' ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No Marketplace Listings Found'}
          </h3>
          <p className="text-xs font-semibold text-[#73758C] max-w-md mx-auto">
            {lang === 'ar' 
              ? 'جرب تغيير كلمة البحث، أو اختر تصنيف مختلف، أو قم بإلغاء بعض الفلاتر.'
              : 'Try clearing some filters or searching for another keyword.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedSubCategory('all');
              setMinRating(0);
              setSelectedLocation('all');
              setOnlyVerified(false);
            }}
            className="px-5 py-2.5 bg-[#633BE8] text-white rounded-2xl text-xs font-extrabold hover:bg-[#9C7AF2] transition-colors"
          >
            {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}
          </button>
        </div>
      )}

        </div>
      </div>

      {/* 🔍 ITEM DETAILS MODAL */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#ECE8FD] my-8 flex flex-col max-h-[90vh]">
            
            {/* Modal Header Banner */}
            <div className="relative h-56 sm:h-64 w-full bg-slate-100 shrink-0">
              <img 
                src={activeItemModal.image} 
                alt={lang === 'ar' ? activeItemModal.titleAr : activeItemModal.titleEn}
                className="w-full h-full object-cover" 
              />
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 rtl:left-4 rtl:right-auto w-9 h-9 rounded-full bg-white/90 text-slate-700 flex items-center justify-center font-bold shadow-md hover:bg-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {activeItemModal.verified && (
                <div className="absolute bottom-4 left-4 rtl:right-4 rtl:left-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'مزود خدمة معتمد' : 'Verified Partner'}</span>
                </div>
              )}
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-left">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#2A2B47]">
                    {lang === 'ar' ? activeItemModal.titleAr : activeItemModal.titleEn}
                  </h2>
                  <div className="flex items-center text-amber-500 font-black text-sm bg-amber-50 px-2.5 py-1 rounded-xl">
                    <Star className="w-4 h-4 fill-amber-500 mr-1 rtl:ml-1" />
                    <span>{activeItemModal.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-[#73758C]">
                  <span className="flex items-center gap-1 text-[#633BE8]">
                    <MapPin className="w-3.5 h-3.5" />
                    {lang === 'ar' ? activeItemModal.locationAr : activeItemModal.locationEn}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-extrabold">
                    {lang === 'ar' ? activeItemModal.priceAr : activeItemModal.priceEn}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 bg-[#FAFAFD] p-4 rounded-2xl border border-slate-100">
                <h3 className="text-xs font-black text-[#2A2B47] uppercase tracking-wider">
                  {lang === 'ar' ? 'عن الخدمة / المركز / المنتج:' : 'About this Listing:'}
                </h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {lang === 'ar' 
                    ? (activeItemModal.fullDescriptionAr || activeItemModal.descriptionAr)
                    : (activeItemModal.fullDescriptionEn || activeItemModal.descriptionEn)}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-[#2A2B47]">
                  {lang === 'ar' ? 'التصنيفات المميزة:' : 'Tags:'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'ar' ? activeItemModal.tagsAr : activeItemModal.tagsEn).map((t, idx) => (
                    <span key={idx} className="text-xs font-extrabold bg-[#ECE8FD] text-[#633BE8] px-3 py-1 rounded-xl">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info Box */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs font-semibold">
                <h3 className="font-black text-[#633BE8]">
                  {lang === 'ar' ? 'معلومات التواصل والحجز المباشر:' : 'Direct Contact Info:'}
                </h3>
                {activeItemModal.contactPhone && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-[#633BE8]" />
                    <span>{activeItemModal.contactPhone}</span>
                  </div>
                )}
                {activeItemModal.contactEmail && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-[#633BE8]" />
                    <span>{activeItemModal.contactEmail}</span>
                  </div>
                )}
                {activeItemModal.website && (
                  <div className="flex items-center gap-2 text-[#633BE8]">
                    <Globe className="w-4 h-4" />
                    <a href={activeItemModal.website} target="_blank" rel="noreferrer" className="underline font-bold">
                      {activeItemModal.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setActiveItemModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-100"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>

              <button
                onClick={() => {
                  setActiveItemModal(null);
                  setBookingSuccessModal(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#633BE8] hover:bg-[#9C7AF2] text-white font-black text-xs transition-colors shadow-md flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'طلب الخدمة / حجز موعد' : 'Request / Book Now'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 BOOKING SUCCESS MODAL */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-[#ECE8FD]">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black">
              ✓
            </div>
            <h3 className="text-lg font-black text-[#2A2B47]">
              {lang === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Request Sent Successfully!'}
            </h3>
            <p className="text-xs text-[#73758C] font-semibold leading-relaxed">
              {lang === 'ar'
                ? 'تم استلام طلبك ومشاركته مع المزود المعتمد. سيقوم فريق خدمة العملاء للتواصل معك في أقرب وقت عبر رقم الهاتف أو البريد المسجل.'
                : 'Your inquiry has been submitted. The representative will reach out to you shortly via phone or email.'}
            </p>
            <button
              onClick={() => setBookingSuccessModal(false)}
              className="w-full py-3 bg-[#633BE8] text-white font-extrabold text-xs rounded-xl hover:bg-[#9C7AF2] transition-colors shadow-md"
            >
              {lang === 'ar' ? 'ممتاز، حسناً' : 'Great, Got it!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
