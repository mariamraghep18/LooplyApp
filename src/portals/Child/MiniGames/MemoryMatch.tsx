import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../shared/LanguageContext';
import { playAudioFeedback, speakVoice } from '../../../shared/audio';
import confetti from 'canvas-confetti';

const EMOJIS = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻'];

export default function MemoryMatch({ onBack, onComplete }: { onBack: () => void, onComplete: (score: number) => void }) {
  const { lang } = useLanguage();
  const [cards, setCards] = useState<{id: number, emoji: string, isFlipped: boolean, isMatched: boolean}[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  
  useEffect(() => {
    // Initialize cards
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false, isMatched: false }));
    setCards(deck);
  }, []);

  const MESSAGE_MAP: Record<'match' | 'mismatch', Record<string, string>> = {
    match: { en: 'Match!', ar: 'تطابق!' },
    mismatch: { en: 'Try again', ar: 'حاول مرة أخرى' }
  };
  const AUDIO_MAP: Record<'match' | 'mismatch', string> = {
    match: 'success',
    mismatch: 'error'
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playAudioFeedback('click');
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIdx, secondIdx] = newFlippedIndices;
      const isMatch = cards[firstIdx].emoji === cards[secondIdx].emoji;
      setTimeout(() => {
        const key = isMatch ? 'match' : 'mismatch';
        playAudioFeedback(AUDIO_MAP[key]);
        speakVoice(MESSAGE_MAP[key][lang], lang);
        const updatedCards = [...newCards];
        if (isMatch) {
          updatedCards[firstIdx].isMatched = true;
          updatedCards[secondIdx].isMatched = true;
        } else {
          updatedCards[firstIdx].isFlipped = false;
          updatedCards[secondIdx].isFlipped = false;
        }
        setCards(updatedCards);
        setFlippedIndices([]);
        if (isMatch && updatedCards.every(c => c.isMatched)) {
          confetti({ particleCount: 100, spread: 70 });
          onComplete(updatedCards.length / 2);
        }
      }, 1000);
    }
  };
             setTimeout(() => onComplete(100), 2000);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[60vh] bg-purple-50 rounded-3xl  p-6 text-center font-['Fredoka']">
      <button onClick={onBack} className="self-start p-2 text-slate-500 hover:text-slate-800 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        {lang === 'en' ? 'Back' : 'رجوع'}
      </button>
      
      <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
        {lang === 'en' ? 'Memory Match' : 'لعبة الذاكرة'}
      </h2>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {cards.map((card, idx) => (
            <div 
              key={card.id} 
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 transform perspective-1000 ${
                card.isFlipped || card.isMatched ? 'bg-white shadow-md border-2 border-purple-200 rotate-y-180' : 'bg-purple-300 shadow-sm hover:scale-105'
              }`}
            >
               <div className={`transition-opacity duration-300 ${(card.isFlipped || card.isMatched) ? 'opacity-100' : 'opacity-0'}`}>
                 {card.emoji}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
