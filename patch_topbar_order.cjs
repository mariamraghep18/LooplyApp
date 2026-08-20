const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

const rewardsCode = `          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('rewards'); }}
            className="flex items-center justify-center p-2 rounded-full font-bold transition-all bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/20 group"
          >
            <Gift className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>`;

const profileCode = `          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('profile'); }}
            className="flex items-center gap-2 pr-4 pl-1 py-1 rounded-full font-bold transition-all bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden bg-white border-2 border-slate-200">
                  {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-slate-700 rounded-full p-0.5 border-2 border-white shadow-sm flex items-center justify-center">
                 <SettingsIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start leading-none ml-1">
                <span className="text-sm font-extrabold text-indigo-700">{childName}</span>
                <span className="text-[10px] text-purple-600 font-black uppercase mt-1">Lvl {childLevel} <span className="text-amber-500">{Math.round((childXp % 500) / 500 * 100)}%</span></span>
            </div>
          </button>`;

const oldSection = rewardsCode + '\\n\\n' + profileCode;
const newSection = profileCode + '\\n\\n' + rewardsCode;

if (content.includes(rewardsCode) && content.includes(profileCode)) {
  // Replace manually based on finding them both
  content = content.replace(rewardsCode, '%%REWARDS%%');
  content = content.replace(profileCode, '%%PROFILE%%');
  
  content = content.replace('%%REWARDS%%', profileCode);
  content = content.replace('%%PROFILE%%', rewardsCode);
  
  fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
  console.log("Swapped profile and rewards buttons");
} else {
  console.log("Could not find blocks to swap");
}
