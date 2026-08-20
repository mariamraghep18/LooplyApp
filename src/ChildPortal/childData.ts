export const childData = {
  profile: {
    id: 'child_1',
    name: 'Child',
    age: 7,
    level: 5,
    xp: 1250,
    xpToNextLevel: 1500,
    coins: 350,
    streak: 7,
    avatar: '🧑🚀',
    theme: 'galaxy'
  },
  missions: [
    {
      id: 'm1',
      title: 'Speech Mission',
      titleAr: 'مهمة التخاطب',
      category: 'speech',
      icon: '🗣️',
      progress: 2,
      total: 3,
      reward: 50,
      completed: false
    },
    {
      id: 'm2',
      title: 'Memory Game',
      titleAr: 'لعبة الذاكرة',
      category: 'cognitive',
      icon: '🧠',
      progress: 0,
      total: 1,
      reward: 40,
      completed: false
    },
    {
      id: 'm3',
      title: 'Movement Activity',
      titleAr: 'النشاط الحركي',
      category: 'pt',
      icon: '🏃',
      progress: 1,
      total: 1,
      reward: 30,
      completed: true
    }
  ],
  goals: [
    { id: 'g1', title: 'Talking', titleAr: 'التحدث', progress: 100, status: 'achieved', icon: '🗣️' },
    { id: 'g2', title: 'Memory', titleAr: 'الذاكرة', progress: 70, status: 'in-progress', icon: '🧠' },
    { id: 'g3', title: 'Movement', titleAr: 'الحركة', progress: 0, status: 'upcoming', icon: '🏃' }
  ],
  achievements: [
    { id: 'a1', title: '7-Day Streak', titleAr: 'استمرار 7 أيام', icon: '🔥', locked: false },
    { id: 'a2', title: 'First Mission', titleAr: 'أول مهمة', icon: '⭐', locked: false },
    { id: 'a3', title: 'Memory Master', titleAr: 'بطل الذاكرة', icon: '🧠', locked: true }
  ],
  schedule: [
    { time: '09:00', title: 'Cognitive Game', titleAr: 'لعبة الإدراك', icon: '🧠', status: 'completed' },
    { time: '10:30', title: 'Speech Session', titleAr: 'جلسة التخاطب', icon: '🗣️', status: 'now' },
    { time: '12:00', title: 'Break', titleAr: 'استراحة', icon: '🍎', status: 'upcoming' }
  ],
  games: [
    { id: 'game7', title: 'Hand Washing', titleAr: 'غسل اليدين', category: 'daily', difficulty: 1, duration: 2, reward: 20, score: 0, icon: '🫧' },
    { id: 'game8', title: 'Morning Routine', titleAr: 'الروتين الصباحي', category: 'daily', difficulty: 1, duration: 3, reward: 20, score: 0, icon: '🌅' },
    { id: 'game1', title: 'Memory Match', titleAr: 'لعبة الذاكرة', category: 'cognitive', difficulty: 2, duration: 5, reward: 50, score: 92, icon: '🧠' },
    { id: 'game2', title: 'Letter Adventure', titleAr: 'مغامرة الحروف', category: 'slt', difficulty: 1, duration: 3, reward: 30, score: 85, icon: '🗣️' },
    { id: 'game3', title: 'Color Match', titleAr: 'تطابق الألوان', category: 'ot', difficulty: 2, duration: 5, reward: 40, score: 100, icon: '🧩' },
    { id: 'game4', title: 'Emotion Mirror', titleAr: 'مرآة المشاعر', category: 'sel', difficulty: 1, duration: 4, reward: 35, score: 70, icon: '❤️' },
    { id: 'game5', title: 'Math Counting', titleAr: 'عد الأرقام', category: 'academics', difficulty: 3, duration: 10, reward: 100, score: 60, icon: '📚' },
  ],
  rewards: [
    { id: '1', title: 'Astronaut Avatar', titleAr: 'صورة رائد فضاء', category: 'avatars', price: 150, icon: '👨‍🚀', rarity: 'epic', locked: false, owned: false },
    { id: '2', title: 'Super Hero Avatar', titleAr: 'صورة بطل خارق', category: 'avatars', price: 120, icon: '🦸‍♂️', rarity: 'rare', locked: false, owned: false },
    { id: '3', title: 'Smart Cat Avatar', titleAr: 'صورة قطة ذكية', category: 'avatars', price: 80, icon: '🐱', rarity: 'common', locked: false, owned: false },
    { id: '4', title: 'Magic Unicorn Avatar', titleAr: 'وحيد القرن السحري', category: 'avatars', price: 100, icon: '🦄', rarity: 'epic', locked: false, owned: false },
    { id: '5', title: 'Friendly Robot Avatar', titleAr: 'صورة روبوت صديق', category: 'avatars', price: 130, icon: '🤖', rarity: 'rare', locked: false, owned: false },
    { id: '6', title: 'Dragon Champion Avatar', titleAr: 'صورة التنين البطل', category: 'avatars', price: 200, icon: '🐲', rarity: 'legendary', locked: false, owned: false },

    { id: '7', title: 'Golden Superhero Cape', titleAr: 'عباءة البطل الذهبية', category: 'outfits', price: 180, icon: '🦸‍♀️', rarity: 'epic', locked: false, owned: false },
    { id: '8', title: 'Royal Crown & Suit', titleAr: 'تاج وبدلة ملكية', category: 'outfits', price: 250, icon: '👑', rarity: 'legendary', locked: false, owned: false },
    { id: '9', title: 'Ninja Training Costume', titleAr: 'زي النينجا الخارق', category: 'outfits', price: 160, icon: '🥷', rarity: 'rare', locked: false, owned: false },

    { id: '10', title: 'Cosmic Galaxy Theme', titleAr: 'سمة المجرة الكونية', category: 'themes', price: 220, icon: '🌌', rarity: 'epic', locked: false, owned: false },
    { id: '11', title: 'Rainbow Paradise Theme', titleAr: 'سمة قوس قزح السحرية', category: 'themes', price: 190, icon: '🌈', rarity: 'rare', locked: false, owned: false },
    { id: '12', title: 'Underwater Ocean Theme', titleAr: 'سمة المحيط الهادئ', category: 'themes', price: 170, icon: '🌊', rarity: 'common', locked: false, owned: false },

    { id: '13', title: 'Cool Cyber Sunglasses', titleAr: 'نظارات السايبر الذكية', category: 'accessories', price: 90, icon: '🕶️', rarity: 'common', locked: false, owned: false },
    { id: '14', title: 'Sparkle Wizard Wand', titleAr: 'عصا السحر البراقة', category: 'accessories', price: 110, icon: '🪄', rarity: 'rare', locked: false, owned: false },
    { id: '15', title: 'Golden Victory Medal', titleAr: 'ميدالية الفوز الذهبية', category: 'accessories', price: 140, icon: '🏅', rarity: 'epic', locked: false, owned: false },

    { id: '16', title: 'Double XP Booster (2X)', titleAr: 'مضاعف النقاط 2X', category: 'powerups', price: 200, icon: '⚡', rarity: 'legendary', locked: false, owned: false },
    { id: '17', title: 'Super Streak Saver', titleAr: 'حامي الأيام المتتالية', category: 'powerups', price: 150, icon: '🔥', rarity: 'rare', locked: false, owned: false },
  ]
};
