const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

const oldProfile = `        <div className="relative">
          <div className="w-20 h-20 bg-slate-800 rounded-full border-4 border-slate-700 shadow-lg flex items-center justify-center text-4xl overflow-hidden">
            {childAvatar}
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-slate-700 text-white rounded-full border-2 border-slate-800 hover:bg-slate-600 transition-colors">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>`;

const newProfile = `        <div className="relative cursor-pointer group" onClick={() => { playAudioFeedback('tap'); setCurrentView('profile'); }}>
          <div className="w-20 h-20 bg-slate-800 rounded-full border-4 border-slate-700 shadow-lg flex items-center justify-center text-4xl overflow-hidden group-hover:scale-105 transition-transform">
            {childAvatar?.startsWith('data:') ? <img src={childAvatar} className="w-full h-full object-cover"/> : childAvatar}
          </div>
          <button className="absolute bottom-0 right-0 p-1.5 bg-slate-700 text-white rounded-full border-2 border-slate-800 hover:bg-slate-600 transition-colors">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>`;

content = content.replace(oldProfile, newProfile);
fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
console.log("Patched profile in dashboard");
