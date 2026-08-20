const fs = require('fs');

const audioTs = `
export const playAudioFeedback = (type: 'success' | 'error' | 'click' | 'welcome' | 'win' | 'lose' | 'tap' | 'pop' | 'magic') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    
    switch (type) {
      case 'win':
        [400, 500, 600, 800, 1000].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.connect(g);
          g.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.value = freq;
          const startTime = audioCtx.currentTime + (i * 0.1);
          g.gain.setValueAtTime(0, startTime);
          g.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
          g.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
        break;
      case 'lose':
        const oscLose = audioCtx.createOscillator();
        oscLose.connect(gainNode);
        oscLose.type = 'sawtooth';
        oscLose.frequency.setValueAtTime(200, audioCtx.currentTime);
        oscLose.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        oscLose.start(audioCtx.currentTime);
        oscLose.stop(audioCtx.currentTime + 0.8);
        break;
      case 'success':
      case 'magic':
        // A magical chime
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.connect(g);
          g.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.value = freq;
          const startTime = audioCtx.currentTime + (i * 0.08);
          g.gain.setValueAtTime(0, startTime);
          g.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
          g.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
        break;
      case 'error':
        const oscErr = audioCtx.createOscillator();
        oscErr.connect(gainNode);
        oscErr.type = 'square';
        oscErr.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscErr.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        oscErr.start(audioCtx.currentTime);
        oscErr.stop(audioCtx.currentTime + 0.2);
        break;
      case 'click':
      case 'tap':
      case 'pop':
        // Cute bubble pop
        const oscPop = audioCtx.createOscillator();
        oscPop.connect(gainNode);
        oscPop.type = 'sine';
        oscPop.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscPop.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscPop.start(audioCtx.currentTime);
        oscPop.stop(audioCtx.currentTime + 0.1);
        break;
      case 'welcome':
        [300, 400, 500, 600, 800].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          osc.connect(g);
          g.connect(audioCtx.destination);
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const startTime = audioCtx.currentTime + (i * 0.1);
          g.gain.setValueAtTime(0, startTime);
          g.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
          g.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
          osc.start(startTime);
          osc.stop(startTime + 0.5);
        });
        break;
    }
  } catch (e) {
    console.error("Audio API not supported", e);
  }
};

export const speakVoice = (text: string, lang: 'en' | 'ar' = 'en') => {
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
    // Make it sound a bit more cheerful for kids
    utterance.pitch = 2.0; // Cuter voice
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch(e) {
    console.error("Speech API Error", e);
  }
};
`;

fs.writeFileSync('src/shared/audio.ts', audioTs);
console.log("Audio updated");
