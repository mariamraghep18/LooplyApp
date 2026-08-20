import { useState } from 'react';
import { BarChart3, FileText, PieChart as PieChartIcon, TrendingUp, Download, Award, Target, Calendar, UserIcon, Clock, Video, PlayCircle } from 'lucide-react';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

export function Report() {
  const { children, sessions } = useSharedData();
  const { lang } = useLanguage();
  const firstChildName = children[0]?.name || (lang === 'ar' ? 'الطفل' : 'the child');
  const [specialistType, setSpecialistType] = useState('All');

  const specialists = ['All', 'Speech Therapist', 'Occupational Therapist', 'Behavioral Analyst (ABA)', 'Special Education Teacher'];

  return (
    <div className="space-y-10 animate-fade-in pb-10 font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE8FD] pb-4">
        <h2 className="text-2xl font-black text-[#2A2B47]">
          {lang === 'ar' ? 'التقارير والتحليلات الشاملة' : 'Comprehensive Reports'}
        </h2>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-xs border border-[#ECE8FD]">
          <select value={specialistType} onChange={e => setSpecialistType(e.target.value)} className="text-xs border-none bg-[#FAFAFD] rounded-xl py-2 px-3 text-[#2A2B47] font-extrabold focus:ring-2 focus:ring-[#633BE8]">
            {specialists.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Analytics Overview Section */}
      <section className="space-y-6">
        <h3 className="text-lg font-black text-[#2A2B47] flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-[#633BE8]"/> 
          {lang === 'ar' ? 'ملخص تحليلات الأداء' : 'Analytics Overview'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-5 hover:border-[#633BE8] transition-all">
            <div className="w-10 h-10 bg-[#70E4BE]/20 rounded-2xl flex items-center justify-center mb-3 text-[#2A2B47]">
              <TrendingUp className="w-5 h-5 text-[#633BE8]" />
            </div>
            <p className="text-xs text-[#73758C] font-bold">{lang === 'ar' ? 'معدل الإنجاز العام' : 'Overall Progress'}</p>
            <p className="text-2xl font-black text-[#2A2B47] mt-1">78%</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-5 hover:border-[#633BE8] transition-all">
            <div className="w-10 h-10 bg-[#ECE8FD] rounded-2xl flex items-center justify-center mb-3 text-[#633BE8]">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs text-[#73758C] font-bold">{lang === 'ar' ? 'إجمالي الجلسات' : 'Total Sessions'}</p>
            <p className="text-2xl font-black text-[#2A2B47] mt-1">42</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-5 hover:border-[#FFA660] transition-all">
            <div className="w-10 h-10 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mb-3 text-[#FFA660]">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-xs text-[#73758C] font-bold">{lang === 'ar' ? 'الإنجازات المكتسبة' : 'Achievements'}</p>
            <p className="text-2xl font-black text-[#2A2B47] mt-1">15</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-5 hover:border-[#FF6086] transition-all">
            <div className="w-10 h-10 bg-[#FF6086]/15 rounded-2xl flex items-center justify-center mb-3 text-[#FF6086]">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-xs text-[#73758C] font-bold">{lang === 'ar' ? 'مستوى الاستمرارية' : 'Current Streak'}</p>
            <p className="text-2xl font-black text-[#2A2B47] mt-1">12 Days</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-6 sm:p-8">
          <h3 className="font-black text-[#2A2B47] mb-4 text-base">{lang === 'ar' ? `التقرير التراكمي الشامل (${specialistType})` : `Cumulative Summary (${specialistType})`}</h3>
          <div className="space-y-4 text-xs font-semibold text-[#73758C]">
            <p className="text-[#2A2B47] leading-relaxed">
              {lang === 'ar'
                ? `خلال الفترة المحددة، أظهر ${firstChildName} تحسناً كبيراً في التواصل اللغوي والتعبير المستقل وتوسيع حصيلة المفردات اليومية بنجاح.`
                : `Over the selected period, ${firstChildName} has shown remarkable improvement in expressive language, successfully expanding vocabulary and independently requesting items.`}
            </p>
            <div className="mt-6 p-5 bg-[#FAFAFD] rounded-2xl border border-[#ECE8FD]">
              <h4 className="font-black text-[#2A2B47] mb-2">{lang === 'ar' ? 'مجالات التركيز المستهدفة للفترة القادمة:' : 'Key Areas for Next Period:'}</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-[#2A2B47] font-semibold">
                <li>{lang === 'ar' ? 'التركيز على التفاعل الاجتماعي والتشارك مع الأقران.' : 'Focusing on peer-to-peer social interaction and sharing.'}</li>
                <li>{lang === 'ar' ? 'تقديم تعليمات مركية متعددة الخطوات خلال الأنشطة اليومية.' : 'Introducing complex multi-step instructions during daily routines.'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="space-y-6">
        <h3 className="text-lg font-black text-[#2A2B47] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#70E4BE]"/> {lang === 'ar' ? 'منحنى النمو والتطور' : 'Performance Metrics'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-black text-[#2A2B47]">{lang === 'ar' ? 'معدل النمو الأسبوعي' : 'Growth Curve'}</h4>
              <span className="px-3.5 py-1 bg-[#70E4BE]/20 text-[#2A2B47] text-xs font-black rounded-full flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#633BE8]" /> +12.5%
              </span>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-[#ECE8FD] pb-2 pl-2">
              {[40, 45, 42, 50, 55, 60, 58, 65, 70, 75, 80, 85].map((val, i) => (
                <div key={i} className="w-full bg-[#ECE8FD] hover:bg-[#633BE8] rounded-t-lg transition-colors relative group" style={{ height: `${val}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#2A2B47] text-white text-[10px] py-1 px-2 rounded-lg hidden group-hover:block whitespace-nowrap z-10 font-bold">
                    Score: {val}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-[#73758C] font-extrabold">
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-6 sm:p-8">
            <h4 className="font-black text-[#2A2B47] mb-6">{lang === 'ar' ? 'تفاصيل توزيع التقييم' : 'Score Breakdown'}</h4>
            <div className="space-y-6">
              {[
                { label: lang === 'ar' ? 'التواصل اللغوي' : 'Language & Speech', score: 85, color: '#633BE8' },
                { label: lang === 'ar' ? 'المهارات الحركية' : 'Motor Skills', score: 72, color: '#FF6086' },
                { label: lang === 'ar' ? 'التفاعل الاجتماعي' : 'Social Interaction', score: 68, color: '#70E4BE' },
                { label: lang === 'ar' ? 'الاستجابة الحسية' : 'Sensory Response', score: 90, color: '#FFA660' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-1.5 text-[#2A2B47]">
                    <span>{item.label}</span>
                    <span className="font-black">{item.score}%</span>
                  </div>
                  <div className="w-full bg-[#ECE8FD] rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${item.score}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
