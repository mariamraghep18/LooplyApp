const SOUND_URLS = {
  win: 'https://actions.google.com/sounds/v1/cartoon/ta_da.ogg',
  lose: 'https://actions.google.com/sounds/v1/cartoon/slide_whistle_down.ogg',
  success: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
  magic: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
  error: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
  click: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
  tap: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
  pop: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
  welcome: 'https://actions.google.com/sounds/v1/cartoon/ta_da.ogg'
};

let isMutedGlobal = false;

export const toggleAudioMute = () => {
  isMutedGlobal = !isMutedGlobal;
  if (isMutedGlobal && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  return isMutedGlobal;
};

export const getAudioMuted = () => isMutedGlobal;

export const playAudioFeedback = (type: keyof typeof SOUND_URLS) => {
  if (isMutedGlobal) return;
  try {
    const url = SOUND_URLS[type];
    if (!url) return;
    
    // Create new audio element to allow overlapping sounds
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed:", e));
  } catch (e) {
    console.error("Audio API not supported", e);
  }
};

export const speakVoice = (text: string, lang: 'en' | 'ar' = 'en') => {
  if (isMutedGlobal) return;
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  try { 
    const utterance = new SpeechSynthesisUtterance(text);
    // Set language
    if (lang === 'ar') {
      utterance.lang = 'ar-SA';
    } else {
      utterance.lang = 'en-US';
    }
    // Make it sound cheerful for kids
    utterance.pitch = 2.0; 
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch(e) {
    console.error("Speech API Error", e);
  }
};
