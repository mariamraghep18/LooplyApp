const fs = require('fs');
let content = fs.readFileSync('src/ChildPortal/ChildPortal.tsx', 'utf-8');

const oldGrid = `          <div className="grid grid-cols-7 gap-1 md:gap-2 bg-slate-50 p-2 md:p-4 rounded-3xl border-2 border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2 text-center text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
            
            {days.map((day, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (day.date) {
                    setSelectedDate(day.date);
                  }
                }}
                className={\`min-h-[80px] md:min-h-[100px] rounded-2xl p-2 transition-all \${day.date ? 'cursor-pointer hover:scale-105 hover:shadow-md' : ''} \${selectedDate === day.date ? 'bg-purple-200 border-2 border-purple-400 scale-105' : day.isToday ? 'bg-purple-100 border-2 border-purple-300' : day.date ? 'bg-white border-2 border-slate-100' : 'bg-transparent'}\`}
              >
                {day.date && (
                  <div className="h-full flex flex-col">
                    <div className={\`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 \${selectedDate === day.date ? 'bg-purple-700 text-white shadow-sm' : day.isToday ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600'}\`}>
                      {day.date}
                    </div>
                    {day.hasSession && (
                      <div className="mt-auto">
                        <div className="px-2 py-1 bg-amber-100 border border-amber-200 rounded-lg text-[10px] md:text-xs font-bold text-amber-700 truncate">
                          ⭐ Mission
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>`;

const newGrid = `          <div className="grid grid-cols-7 gap-1 md:gap-2 bg-slate-50 p-1 sm:p-2 md:p-4 rounded-2xl sm:rounded-3xl border-2 border-slate-100 overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-1 sm:py-2 text-center text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-400 uppercase tracking-wider truncate">
                {day.slice(0,3)}
              </div>
            ))}
            
            {days.map((day, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (day.date) {
                    setSelectedDate(day.date);
                  }
                }}
                className={\`min-h-[55px] sm:min-h-[80px] md:min-h-[100px] rounded-xl sm:rounded-2xl p-1 sm:p-2 transition-all \${day.date ? 'cursor-pointer hover:scale-105 hover:shadow-md' : ''} \${selectedDate === day.date ? 'bg-purple-200 border-2 border-purple-400 scale-105' : day.isToday ? 'bg-purple-100 border-2 border-purple-300' : day.date ? 'bg-white border sm:border-2 border-slate-100' : 'bg-transparent'}\`}
              >
                {day.date && (
                  <div className="h-full flex flex-col items-center sm:items-start">
                    <div className={\`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-bold mb-1 \${selectedDate === day.date ? 'bg-purple-700 text-white shadow-sm' : day.isToday ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600'}\`}>
                      {day.date}
                    </div>
                    {day.hasSession && (
                      <div className="mt-auto w-full flex justify-center sm:block">
                        <div className="px-1 sm:px-2 py-0.5 sm:py-1 bg-amber-100 border border-amber-200 rounded sm:rounded-lg text-[8px] sm:text-[10px] md:text-xs font-bold text-amber-700 truncate w-full text-center sm:text-left">
                          <span className="sm:hidden">⭐</span>
                          <span className="hidden sm:inline">⭐ Mission</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>`;

content = content.replace(oldGrid, newGrid);
fs.writeFileSync('src/ChildPortal/ChildPortal.tsx', content);
console.log("Patched calendar");
