const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

const oldProfileHeader = `          <h3 className="text-3xl font-bold text-slate-800 mb-2">{childName}</h3>
          <div className="flex items-center gap-2 text-slate-500 font-bold mb-8">
            <Star className={\`w-5 h-5 \${currentTheme.class.replace('bg-', 'text-')}\`} /> {lang === 'en' ? \`Level \${childLevel}\` : \`المستوى \${childLevel}\`}
          </div>
          
          <div className="w-full max-w-2xl bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
            <h4 className="font-bold text-slate-700 text-left mb-4">{lang === 'en' ? 'My Theme Color' : 'لوني المفضل'}</h4>`;

const newProfileHeader = `          <h3 className="text-3xl font-bold text-slate-800 mb-2">{childName}</h3>
          <div className="flex items-center gap-2 text-slate-500 font-bold mb-8">
            <Star className={\`w-5 h-5 \${currentTheme.class.replace('bg-', 'text-')}\`} /> {lang === 'en' ? \`Level \${childLevel}\` : \`المستوى \${childLevel}\`}
          </div>

          <div className="w-full max-w-2xl bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6 flex flex-col gap-3">
             <h4 className="font-bold text-slate-700 text-left">{lang === 'en' ? 'My Nickname' : 'اللقب'}</h4>
             <input
               type="text"
               value={activeChild?.nickname || ''}
               onChange={(e) => {
                  if (activeChildId) {
                    updateChild(activeChildId, { nickname: e.target.value });
                  }
               }}
               placeholder={lang === 'en' ? 'Choose a cool nickname!' : 'اختر لقباً مميزاً!'}
               className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:border-purple-400 outline-none transition-all text-left"
               dir={lang === 'ar' ? 'rtl' : 'ltr'}
             />
          </div>
          
          <div className="w-full max-w-2xl bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
            <h4 className="font-bold text-slate-700 text-left mb-4">{lang === 'en' ? 'My Theme Color' : 'لوني المفضل'}</h4>`;

content = content.replace(oldProfileHeader, newProfileHeader);
fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
console.log("Patched nickname");
