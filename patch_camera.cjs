const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

// Add motion import
if (!content.includes("import { motion }")) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { motion } from 'motion/react';");
}

const oldCamera = `      {/* Draggable / Minimizable Camera Widget */}
      {isRecording && (
        <div className={\`fixed \${isCameraMinimized ? 'bottom-[120px] right-4' : 'bottom-[120px] right-4'} z-50 transition-all duration-300 ease-in-out\`}>`;

const newCamera = `      {/* Draggable / Minimizable Camera Widget */}
      {isRecording && (
        <motion.div 
          drag 
          dragMomentum={false}
          dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
          style={{ position: 'fixed', bottom: '120px', right: '16px', zIndex: 50 }}
          className={\`transition-all duration-300 ease-in-out cursor-grab active:cursor-grabbing\`}
        >`;

const oldEnd = `            </div>
          )}
        </div>
      )}

      {/* Floating Tab Bar */}`;

const newEnd = `            </div>
          )}
        </motion.div>
      )}

      {/* Floating Tab Bar */}`;

content = content.replace(oldCamera, newCamera);
content = content.replace(oldEnd, newEnd);
fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
console.log("Patched camera");
