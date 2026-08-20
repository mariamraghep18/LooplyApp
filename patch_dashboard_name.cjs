const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

// Change text-white to inherit or text-slate-800
// wait, the user said "غير لون الاسم" which means "change the color of the name"
// let's give it a nice colorful gradient or text color.
content = content.replace('<h1 className="text-5xl font-extrabold text-white">{childName}!</h1>', '<h1 className={`text-5xl font-extrabold ${currentTheme.id === \\'purple\\' ? \\'text-white\\' : \\'text-slate-800\\'}`}>{childName}!</h1>');

fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
