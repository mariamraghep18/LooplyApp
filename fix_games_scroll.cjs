const fs = require('fs');
const path = require('path');

const dir = 'src/portals/Child/MiniGames/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'GameWinModal.tsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace('className="flex flex-col h-full', 'className="flex flex-col min-h-[60vh]');
  content = content.replace('overflow-hidden', '');
  fs.writeFileSync(filePath, content);
}

// HandWashingGame is in another directory
const hwFile = 'src/portals/Child/Games/HandWashingGame.tsx';
if (fs.existsSync(hwFile)) {
  let content = fs.readFileSync(hwFile, 'utf-8');
  content = content.replace('className="flex flex-col h-full', 'className="flex flex-col min-h-[60vh]');
  content = content.replace('overflow-hidden', '');
  fs.writeFileSync(hwFile, content);
}

console.log("Fixed games scroll");
