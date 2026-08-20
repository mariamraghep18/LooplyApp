import React from "react";
import { useState } from 'react';
import { Calendar as CalIcon, ShoppingBag, CreditCard, Shield, LifeBuoy, Search, MessageSquare, Phone, BookOpen, AlertTriangle, Download, Lock, ChevronLeft, ChevronRight, X, MapPin, User, Clock, Edit2, Check } from 'lucide-react';
import { useSharedData } from "../shared/SharedData";
import { useLanguage } from "../shared/LanguageContext";


export function Calendar() {
  const { calendarEvents, addCalendarEvent, updateCalendarEvent } = useSharedData();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [specialistName, setSpecialistName] = useState('');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const handleOpenModal = (event?: any) => {
    if (event) {
      setEditingEventId(event.id);
      setEventDate(event.date);
      setEventEndDate(event.endDate || event.date);
      setEventTime(event.time);
      setEventTitle(event.title);
      setEventContent(event.content);
      setSpecialistName(event.specialistName || '');
    } else {
      setEditingEventId(null);
      setEventDate(selectedDate || new Date().toISOString().split('T')[0]);
      setEventEndDate(selectedDate || new Date().toISOString().split('T')[0]);
      setEventTime('10:00');
      setEventTitle('');
      setEventContent('');
      setSpecialistName('');
    }
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      updateCalendarEvent(editingEventId, { date: eventDate, endDate: eventEndDate, time: eventTime, title: eventTitle, content: eventContent, specialistName });
    } else {
      addCalendarEvent({ date: eventDate, endDate: eventEndDate, time: eventTime, title: eventTitle, content: eventContent, specialistName });
    }
    setShowEventModal(false);
  };

  return (
    <div className="relative h-full flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Schedule</h2>
            <p className="text-slate-500">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>
          
          <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-colors">
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-slate-50 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
          
          {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-slate-50/50 min-h-[100px] p-2"></div>
          ))}
          
          {days.map(day => {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = calendarEvents.filter(e => e.date === dateStr);
            const isSelected = selectedDate === dateStr;
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <div 
                key={day} 
                onClick={() => handleDateClick(day)}
                className={`bg-white min-h-[100px] p-2 transition-colors cursor-pointer hover:bg-sky-50 group ${isSelected ? 'ring-2 ring-sky-500 ring-inset relative z-10' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${isToday ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 group-hover:text-sky-600'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.map((evt, i) => (
                    <div key={i} className="text-[10px] leading-tight font-medium p-1 rounded bg-indigo-50 text-indigo-700 truncate">
                      {evt.time} - {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hidden md:block">
        <h3 className="font-bold text-slate-800 mb-4">
          Events for {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Selected Date'}
        </h3>
        <div className="space-y-4">
          {calendarEvents.filter(e => e.date === selectedDate).length > 0 ? (
            calendarEvents.filter(e => e.date === selectedDate).map((evt) => (
              <div key={evt.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
                <button onClick={() => handleOpenModal(evt)} className="absolute top-2 right-2 text-slate-400 hover:text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                <h4 className="font-bold text-slate-800 text-sm">{evt.title}</h4>
                <p className="text-xs text-sky-600 font-medium mb-2">{evt.time}</p>
                <p className="text-xs text-slate-600">{evt.content}</p>
                {evt.specialistName && <p className="text-xs text-indigo-600 mt-2 font-medium">Specialist: {evt.specialistName}</p>}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No events for this date.</p>
          )}
        </div>
      </div>

      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 bg-sky-50 border-b border-sky-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">{editingEventId ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setShowEventModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">From Date</label>
                  <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">To Date</label>
                  <input type="date" required value={eventEndDate} onChange={e => setEventEndDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <input type="time" required value={eventTime} onChange={e => setEventTime(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                <input type="text" required value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" placeholder="e.g. Speech Therapy" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Specialist / Training Name (Optional)</label>
                <input type="text" value={specialistName} onChange={e => setSpecialistName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" placeholder="e.g. Dr. Ahmed" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Details</label>
                <textarea rows={3} required value={eventContent} onChange={e => setEventContent(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-sky-500" placeholder="Add some notes..." />
              </div>
              <button type="submit" className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-colors">
                Save Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function Marketplace() {
  const filters = [
    'Accessible Restaurants & Cafes',
    'Adaptive Clothing',
    'Clinics & Rehabilitation Centers',
    'Exclusive Discounts'
  ];

  const items = [
    { title: 'Sensory Friendly Cafe', type: 'Restaurant', discount: '15% Off', location: 'Downtown', icon: 'ShoppingBag' },
    { title: 'Weighted Blankets Premium', type: 'Product', discount: '20% Off', location: 'Online Delivery', icon: 'ShoppingBag' },
    { title: 'Sunshine Therapy Center', type: 'Clinic', discount: 'Free Assessment', location: 'Westside', icon: 'ShoppingBag' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Marketplace & Directory</h2>
      
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search services, products, or centers..." 
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter, i) => (
          <button key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50">
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <div className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-300">
               <ShoppingBag className="w-8 h-8 opacity-50" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{item.type}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{item.discount}</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{item.location}</p>
            <button className="w-full py-2 bg-slate-50 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-100">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Billing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        Billing & Payments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-400 mb-2">Current Month Paid</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">2,450 EGP</h3>
          <p className="text-sm text-emerald-400 font-medium">8 Sessions completed</p>
        </div>

        <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden">
          <p className="text-sm font-medium text-slate-500 mb-2">Next Scheduled Payment</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">850 EGP</h3>
          <p className="text-sm text-slate-500 mb-4">Due on Oct 25, 2023</p>
          <button className="self-start px-6 py-2 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors shadow-sm">
            Pay Now
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Invoice History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm">
                <th className="p-4 sm:p-6 font-medium">Invoice #</th>
                <th className="p-4 sm:p-6 font-medium">Date</th>
                <th className="p-4 sm:p-6 font-medium">Amount</th>
                <th className="p-4 sm:p-6 font-medium">Status</th>
                <th className="p-4 sm:p-6 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {[
                { id: 'INV-2023-010', date: 'Oct 01, 2023', amount: '2,450 EGP', status: 'Paid' },
                { id: 'INV-2023-009', date: 'Sep 01, 2023', amount: '3,200 EGP', status: 'Paid' },
                { id: 'INV-2023-008', date: 'Aug 01, 2023', amount: '3,200 EGP', status: 'Paid' },
              ].map((inv) => (
                <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 sm:p-6 font-medium">{inv.id}</td>
                  <td className="p-4 sm:p-6 text-slate-500">{inv.date}</td>
                  <td className="p-4 sm:p-6 font-semibold">{inv.amount}</td>
                  <td className="p-4 sm:p-6">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-medium rounded-full text-xs">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 sm:p-6">
                    <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
                      <Download className="w-4 h-4" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Support() {
  const supportChannels = [
    { title: 'Live Chat', desc: 'Chat with our support team', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Call Center', desc: 'Available 24/7 for urgent issues', icon: Phone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Help Center', desc: 'Guides and FAQs', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Report Issue', desc: 'Submit a ticket', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">How can we help?</h2>
        <p className="text-slate-300 max-w-lg">Choose a support channel below or search our help center for quick answers.</p>
        
        <div className="mt-6 relative max-w-xl">
          <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
          <input type="text" placeholder="Search for help..." className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportChannels.map((channel, i) => {
          const Icon = channel.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${channel.bg}`}>
                <Icon className={`w-6 h-6 ${channel.color}`} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{channel.title}</h3>
              <p className="text-sm text-slate-500">{channel.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Settings() {
  const { parentProfile, setParentProfile, children, updateChild, activeChildId } = useSharedData() as any;
  const { lang } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    id: parentProfile?.id || 'parent1',
    fullName: parentProfile?.fullName || (lang === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali'),
    email: parentProfile?.email || 'parent@example.com',
    phone: parentProfile?.phone || '+20 100 123 4567',
    occupation: parentProfile?.occupation || (lang === 'ar' ? 'مهندس كمبيوتر' : 'Software Engineer'),
    city: parentProfile?.city || (lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'),
    address: parentProfile?.address || (lang === 'ar' ? 'التجمع الخامس، شارع التسعين' : '90th Street, New Cairo'),
    profilePhoto: parentProfile?.profilePhoto || ''
  });

  const handleSave = () => {
    setParentProfile({ ...parentProfile, ...profileData });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in font-sans">
      {/* Profile Header Banner */}
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
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">{profileData.fullName}</h1>
              <p className="text-white/90 text-xs sm:text-sm font-medium mt-1">
                💼 {profileData.occupation}
              </p>
              <p className="text-white/80 text-xs font-medium mt-0.5">
                🏠 {profileData.city}
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

      {/* Main Profile Fields */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE8FD] shadow-xs space-y-6">
        <h2 className="text-xl font-extrabold text-[#2A2B47] flex items-center gap-2 border-b border-[#ECE8FD] pb-4">
          <User className="w-6 h-6 text-[#633BE8]" />
          {lang === 'ar' ? 'بيانات ولي الأمر الوظيفية ومكان السكن' : 'Parent Profile & Contact Information'}
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
  );
}
