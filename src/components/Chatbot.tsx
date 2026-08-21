import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../shared/LanguageContext';
import { useSharedData } from '../shared/SharedData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export function Chatbot() {
  const { lang } = useLanguage();
  const { children, activeChildId } = useSharedData() as any;
  const activeChild = children.find((c: any) => c.id === activeChildId) || children[0];
  const childName = activeChild?.name || (lang === 'ar' ? 'طفلك' : 'your child');

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'bot',
      text: lang === 'ar' 
        ? `أهلاً بك! أنا مساعد Looply الذكي للتأهيل والرعاية. كيف يمكنني مساعدتك اليوم بخصوص خطة ${childName}؟`
        : `Hello! I am your Looply AI Therapy Assistant. How can I support you today regarding ${childName}'s development & goals?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = lang === 'ar' ? [
    '💡 تمارين لتأخر الكلام والتواصل',
    '⭐ نصائح لوحة النجوم والمكافآت',
    '🧘 أنشطة الاستجابة الحسية والهدوء',
    '📅 تنظيم الروتين الصباحي واليومي'
  ] : [
    '💡 Speech Delay & Language Exercises',
    '⭐ Token Board Motivation Tips',
    '🧘 Calming & Sensory Techniques',
    '📅 Morning & Daily Routine Schedule'
  ];

  const getAiResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('speech') || q.includes('language') || q.includes('كلام') || q.includes('تواصل')) {
      return lang === 'ar'
        ? `لتطوير مهارات الكلام لدى ${childName}:\n1. استخدم جمل قصيرة ومحددة من 2-3 كلمات.\n2. كرّر الكلمات أثناء الأنشطة اليومية مثل الإفطار واللعب.\n3. امنح الطفل 5 ثوانٍ للاستجابة قبل التكرار.`
        : `To enhance ${childName}'s speech & language skills:\n1. Use clear 2-3 word sentences during daily routines.\n2. Repeat key action words during mealtime and play.\n3. Give ${childName} at least 5 seconds to process and respond.`;
    }
    
    if (q.includes('token') || q.includes('star') || q.includes('نجم') || q.includes('تعزيز') || q.includes('مكافأ')) {
      return lang === 'ar'
        ? 'نصائح نجاح لوحة التعزيز:\n1. حدد هدفاً واضحاً ومباشراً (مثل: ترتيب الألعاب).\n2. امنح النجمة فور وقوع السلوك الإيجابي مباشرة.\n3. اجعل المكافأة المكتسبة مرئية ومشجعة للطفل.'
        : 'Token Board success tips:\n1. Define a single, positive action target (e.g. packing up toys).\n2. Award the star immediately following the positive behavior.\n3. Keep the visual reward clear and reachable!';
    }
    
    if (q.includes('calm') || q.includes('sensory') || q.includes('هدوء') || q.includes('حسي')) {
      return lang === 'ar'
        ? 'تقنيات الاستجابة الحسية والاسترخاء:\n1. تمارين الضغط اللطيف على الكتفين والذراعين.\n2. الاستماع لأصوات الطبيعة الهادئة في بيئة قليلة المشتتات.\n3. استخدام الألعاب الحسية ذات الملمس الناعم.'
        : `Sensory calming techniques for ${childName}:\n1. Try gentle deep-pressure shoulder compresses.\n2. Use a low-distraction quiet corner with soft ambient sounds.\n3. Provide textured sensory toys for tactile grounding.`;
    }

    if (q.includes('routine') || q.includes('schedule') || q.includes('روتين') || q.includes('جدول')) {
      return lang === 'ar'
        ? 'لتنظيم الروتين الصباحي:\n1. استخدم الجداول البصرية المصورة بالترتيب.\n2. حدد أوقات ثابته للاستيقاظ والأنشطة.\n3. عزز الطفل بعد كل خطوة منجزة بنجاح.'
        : 'For structured daily routines:\n1. Utilize a visual schedule with clear sequential pictures.\n2. Set consistent wake-up, meal, and exercise times.\n3. Offer praise after each successfully completed step.';
    }

    return lang === 'ar'
      ? `شكراً لاستفسارك! أعمل باستمرار على تحليل أهداف ${childName} ومساعدة أسرتك بالأفكار والتمارين المخصصة. هل تحب استكشاف تمارين جديدة في خطة المهام اليومية؟`
      : `Thank you for asking! I am actively tracking ${childName}'s development goals to offer tailored advice. Would you like to check specific exercise tips in the Tasks plan?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botReplyText = getAiResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating AI Trigger Button (Positioned safely above bottom navbar) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:right-8 z-50 p-3.5 sm:p-4 rounded-full shadow-2xl bg-gradient-to-r from-[#633BE8] to-[#9C7AF2] text-white flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 group border-2 border-white/40"
        style={{ boxShadow: '0 10px 30px rgba(99, 59, 232, 0.45)' }}
        title={lang === 'ar' ? 'مساعد Looply الذكي' : 'Looply AI Therapy Assistant'}
      >
        <div className="relative">
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#70E4BE] rounded-full border-2 border-white"></span>
        </div>
        <span className="font-extrabold text-xs hidden sm:inline pr-1">
          {lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
        </span>
      </button>

      {/* Chatbot Window Popup (Floating above trigger button & bottom navbar) */}
      {isOpen && (
        <div 
          className="fixed bottom-40 right-4 sm:right-8 z-50 w-[92vw] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-[#ECE8FD] flex flex-col overflow-hidden animate-fade-in font-sans"
          style={{ boxShadow: '0 20px 50px rgba(42, 43, 71, 0.25)' }}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#633BE8] via-[#9C7AF2] to-[#FF6086] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5">
                  Looply AI Assistant <Sparkles className="w-3.5 h-3.5 text-[#FFD066]" />
                </h3>
                <p className="text-[10px] text-white/80 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#70E4BE]"></span>
                  {lang === 'ar' ? 'متصل وجاهز للمساعدة' : 'Online & Ready'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="bg-[#FAFAFD] p-3 border-b border-[#ECE8FD] flex gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 bg-white border border-[#ECE8FD] hover:border-[#633BE8] text-[#2A2B47] text-[11px] font-extrabold rounded-xl whitespace-nowrap shadow-2xs transition-all hover:bg-[#ECE8FD]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAFAFD]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-[#633BE8] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#633BE8] text-white rounded-br-none'
                      : 'bg-white text-[#2A2B47] border border-[#ECE8FD] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#73758C]'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-[#9C7AF2] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    👤
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-xl bg-[#633BE8] text-white flex items-center justify-center text-xs font-bold">
                  🤖
                </div>
                <div className="bg-white border border-[#ECE8FD] p-3 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#633BE8] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#9C7AF2] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-[#FF6086] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-white border-t border-[#ECE8FD] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={lang === 'ar' ? 'اسأل مساعد Looply عن تمارين أو نصائح...' : 'Ask AI Assistant about therapy tips or goals...'}
              className="flex-1 p-3 bg-[#FAFAFD] border border-[#ECE8FD] rounded-2xl text-xs font-semibold text-[#2A2B47] focus:outline-none focus:ring-2 focus:ring-[#633BE8]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-3 bg-[#633BE8] text-white rounded-2xl font-bold hover:bg-[#9C7AF2] transition-colors disabled:opacity-50 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
