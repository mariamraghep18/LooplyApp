import { PlayCircle, MapPin, Navigation, Video } from 'lucide-react';
import { useSharedData } from '../shared/SharedData';
import { useLanguage } from '../shared/LanguageContext';

export function VideoRecords() {
  const { sessions, children, activeChildId } = useSharedData();
  const { lang } = useLanguage();
  const childSessions = sessions.filter(s => s.status === 'completed' && s.videoUrl);

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-6 sm:p-8 min-h-[60vh] font-sans" style={{ backgroundColor: '#FAFAFD' }}>
      <div className="flex items-center justify-between mb-6 border-b border-[#ECE8FD] pb-4">
        <h2 className="text-2xl font-black text-[#2A2B47]">
          {lang === 'ar' ? 'تسجيلات فيديو الجلسات والأنشطة' : 'Child Activity & Session Recordings'}
        </h2>
      </div>
      
      {childSessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-[#73758C]">
          <Video className="w-16 h-16 mb-4 text-[#633BE8]/40" />
          <p className="font-extrabold text-sm text-[#2A2B47]">{lang === 'ar' ? 'لا توجد تسجيلات حتى الآن.' : 'No recorded sessions yet.'}</p>
          <p className="text-xs mt-1 text-[#73758C] font-semibold">{lang === 'ar' ? 'يتم حفظ فيديو الجلسة تلقائياً عند دخول الطفل لبورتال الألعاب.' : 'Sessions are recorded when a child launches the Child Portal.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {childSessions.map((session, i) => {
            const child = children.find(c => c.id === session.childId);
            return (
              <div key={session.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#ECE8FD] shadow-xs hover:border-[#633BE8] transition-all">
                <div className="aspect-video bg-black relative flex items-center justify-center">
                  <video src={session.videoUrl} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" controls />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-[#2A2B47] text-base">{child?.nickname || child?.name || 'Child'}</h3>
                    <span className="bg-[#70E4BE]/20 text-[#2A2B47] px-2.5 py-1 rounded-full text-xs font-black">Completed</span>
                  </div>
                  <div className="text-xs text-[#73758C] mb-4 space-y-1 font-semibold">
                    <p><span className="font-bold text-[#2A2B47]">Date:</span> {session.date}</p>
                    <p><span className="font-bold text-[#2A2B47]">Duration:</span> {session.duration} Minutes</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#ECE8FD]">
                    <a href={session.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#633BE8] text-white rounded-2xl font-black text-xs hover:bg-[#9C7AF2] transition-colors">
                      <PlayCircle className="w-4 h-4" /> View Recording
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FindMyChild() {
  const { lang } = useLanguage();
  return (
    <div className="bg-white rounded-3xl shadow-xs border border-[#ECE8FD] p-0 min-h-[70vh] flex flex-col overflow-hidden relative font-sans">
      <div className="p-6 border-b border-[#ECE8FD] relative z-10 bg-white/90 backdrop-blur-md">
        <h2 className="text-2xl font-black text-[#2A2B47] mb-1">
          📍 {lang === 'ar' ? 'تتبع موقع الطفل (Find My Child)' : 'Find My Child (GPS Tracker)'}
        </h2>
        <p className="text-[#73758C] text-xs font-semibold">
          {lang === 'ar' ? 'تتبع لحظي لموقع الطفل أثناء تواجده في المراكز أو المدرسة.' : 'Real-time GPS status during center visits or school transit.'}
        </p>
      </div>
      
      {/* Mock Map Container */}
      <div className="flex-1 bg-[#FAFAFD] relative w-full h-full min-h-[400px]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#9C7AF2 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Child Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white px-4 py-2 rounded-2xl shadow-lg mb-2 text-xs font-black text-[#2A2B47] flex items-center gap-2 border border-[#ECE8FD]">
            <span>📍 Center A (Speech Therapy)</span>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#633BE8] rounded-full animate-ping opacity-75"></div>
            <div className="relative w-12 h-12 bg-[#633BE8] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Floating Control */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
          <button className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-[#633BE8] hover:bg-[#ECE8FD] transition-colors border border-[#ECE8FD]">
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
