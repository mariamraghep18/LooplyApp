const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

const oldProfileCode = `          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('profile'); }}
            className="flex items-center gap-2 pr-4 pl-1 py-1 rounded-full font-bold transition-all bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden bg-white border-2 border-slate-200">
                {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar}
            </div>
            <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-bold text-slate-800">{childName}</span>
                <span className="text-[10px] text-purple-600 font-black uppercase mt-1">Lvl {childLevel} <span className="text-amber-500">{(childXp/500)*100}%</span></span>
            </div>
          </button>`;

const newProfileCode = `          <button
            onClick={() => { playAudioFeedback('tap'); setCurrentView('profile'); }}
            className="flex items-center gap-2 pr-4 pl-1 py-1 rounded-full font-bold transition-all bg-slate-100 hover:bg-slate-200 border-2 border-slate-200"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden bg-white border-2 border-slate-200">
                  {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-slate-700 rounded-full p-1 border-2 border-white shadow-sm flex items-center justify-center">
                 <SettingsIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start leading-none ml-1">
                <span className="text-sm font-extrabold text-slate-900">{childName}</span>
                <span className="text-[10px] text-purple-600 font-black uppercase mt-1">Lvl {childLevel} <span className="text-amber-500">{(childXp/500)*100}%</span></span>
            </div>
          </button>`;

if(content.includes('onClick={() => { playAudioFeedback(\\'tap\\'); setCurrentView(\\'profile\\'); }}')) {
  // It's in the file, let's do a substring replacement to be safe about spacing
  const oldCodeCompact = oldProfileCode.replace(/\\s+/g, '');
  const contentCompact = content.replace(/\\s+/g, '');
  if (contentCompact.includes(oldCodeCompact)) {
    console.log("Found profile button using compact search");
  } else {
    console.log("Could not find profile button");
  }
}

