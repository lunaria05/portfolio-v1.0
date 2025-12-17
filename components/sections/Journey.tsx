'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaAtom, FaChevronRight, FaTerminal } from 'react-icons/fa';

// --- DATA ---
const journeyData = [
  {
    id: 1,
    year: "2020",
    label: "GENESIS",
    title: "Completed Science Education",
    company: "Higher Secondary",
    description: "Successfully completed high school with Science stream, laying the strong mathematical and analytical foundation for my technical journey.",
    tags: ["Physics", "Maths", "Logic"],
    icon: FaAtom,
    color: "#a855f7" // Purple
  },
  {
    id: 2,
    year: "2024",
    label: "ACADEMIA",
    title: "IT Engineering Degree",
    company: "LD College of Engineering",
    description: "B.Tech in Information Technology. Deep dived into Algorithms, Data Structures, and Software Engineering principles.",
    highlight: "CGPA: 8.68",
    tags: ["Algorithms", "OS", "Networks"],
    icon: FaGraduationCap,
    color: "#3b82f6" // Blue
  },
  {
    id: 3,
    year: "Feb 2024",
    label: "INITIATION",
    title: "SDE Intern",
    company: "Lampros Tech",
    description: "Started professional journey. Gained hands-on experience with production codebases and agile team workflows.",
    highlight: "6 Months",
    tags: ["Frontend", "Team Work", "React"],
    icon: FaLaptopCode,
    color: "#f59e0b" // Amber
  },
  {
    id: 4,
    year: "Present",
    label: "MASTERY",
    title: "Software Development Engineer",
    company: "Lampros Tech",
    description: "Full-time role. Architecting scalable UI, optimizing performance, and working on cutting-edge web technologies.",
    tags: ["Next.js", "Architecture", "Optimization"],
    icon: FaBriefcase,
    color: "#1aa9da" // Cyan (Brand Color)
  },
];

export default function Journey() {
  const [activeId, setActiveId] = useState(journeyData[3].id); // Default to latest
  const activeItem = journeyData.find(item => item.id === activeId);

  return (
    <div className="fixed inset-0 w-full h-[100vh] z-10 pointer-events-none flex flex-col justify-center overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1aa9da] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border border-[#1aa9da]/20 rounded-full border-dashed animate-spin-slow" />
         <div className="absolute bottom-10 right-10 w-96 h-96 border border-[#1aa9da]/10 rounded-full animate-spin-reverse" />
      </div>

      <div className="relative z-10 w-full pointer-events-auto flex flex-col items-center justify-center py-20 px-4 md:px-8">
        {/* --- HEADER --- */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">
            CAREER LOGS
          </h2>
          <p className="text-[#1aa9da] font-mono text-xs tracking-[0.3em] hidden lg:block">
            SELECT A NODE TO DECRYPT DATA
          </p>
        </div>

        {/* --- MAIN INTERFACE CONTAINER --- */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start">
        
        {/* === LEFT: NAVIGATION (The Time Keys) === */}
        <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-3">
           {journeyData.map((item) => {
             const isActive = activeId === item.id;
             return (
               <motion.button
                 key={item.id}
                 onClick={() => setActiveId(item.id)}
                 whileHover={{ x: 10 }}
                 className={`group cursor-pointer relative w-full text-left p-4 rounded-xl border transition-all duration-300 overflow-hidden
                   ${isActive 
                     ? 'bg-[#1aa9da]/10 border-[#1aa9da] shadow-[0_0_20px_rgba(26,169,218,0.2)]' 
                     : 'bg-white/5 border-white/10 hover:border-white/30'
                   }
                 `}
               >
                 {/* Active Indicator Bar */}
                 {isActive && (
                    <motion.div 
                      layoutId="active-bar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#1aa9da]"
                    />
                 )}

                 <div className="relative z-10">
                    {/* Year Row - Full width on mobile, inline on desktop */}
                    <div className="flex items-center justify-between lg:mb-0">
                       <span className={`text-xs font-mono tracking-widest ${isActive ? 'text-[#1aa9da]' : 'text-white lg:text-gray-500'}`}>
                          {item.year}
                       </span>
                    </div>

                    {/* Details Row - Below year on mobile, side-by-side on desktop */}
                    <div className="hidden lg:flex items-center justify-between lg:mt-1">
                       <span className={`text-sm md:text-base font-bold uppercase ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {item.label}
                       </span>
                       {isActive ? (
                          <FaChevronRight className="text-[#1aa9da] animate-pulse" />
                       ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-gray-500" />
                       )}
                    </div>
                 </div>
               </motion.button>
             );
           })}
        </div>

        {/* === RIGHT: THE HOLOGRAPHIC DISPLAY (Content) === */}
        <div className="w-full md:w-2/3 min-h-[400px] relative">
           <AnimatePresence mode="wait">
             {activeItem && (
               <motion.div
                 key={activeItem.id}
                 initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                 transition={{ duration: 0.4, ease: "circOut" }}
                 className="w-full h-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl"
               >
                 {/* Top Bar Decoration */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1aa9da] to-transparent" />
                 <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/10">
                       <FaTerminal />
                       <span>DATA_PACKET_{activeItem.id}</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#1aa9da] tracking-widest">
                       STATUS: VERIFIED
                    </div>
                 </div>

                 {/* Main Content */}
                 <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-5 mb-6">
                       <div
                         className="size-10 lg:size-14 aspect-square rounded-xl flex items-center justify-center text-xl lg:text-2xl shadow-lg border border-white/10"
                         style={{ backgroundColor: `${activeItem.color}20`, color: activeItem.color }}
                       >
                          <activeItem.icon />
                       </div>
                       <div>
                          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-1">
                             {activeItem.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                             <span>{activeItem.company}</span>
                             {activeItem.highlight && (
                               <span className="px-2 py-0.5 rounded bg-[#1aa9da]/20 text-[#1aa9da] text-xs font-bold border border-[#1aa9da]/30">
                                  {activeItem.highlight}
                               </span>
                             )}
                          </div>
                       </div>
                    </div>

                    {/* Description */}
                    <div className="pl-4 border-l-2 border-white/10 ml-7 mb-8">
                       <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {activeItem.description}
                       </p>
                    </div>

                    {/* Footer / Tags */}
                    <div className="flex flex-col gap-3">
                       <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                          Tech & Skills
                       </span>
                       <div className="flex flex-wrap gap-2">
                          {activeItem.tags.map((tag, i) => (
                             <span
                               key={i}
                               className="px-3 py-1.5 bg-black border border-white/10 rounded-md text-xs text-gray-300 font-mono hover:border-[#1aa9da] transition-colors cursor-default"
                             >
                                {tag}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Background Graphic Effect */}
                 <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-tl from-[#1aa9da]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

               </motion.div>
             )}
           </AnimatePresence>
        </div>

        </div>
      </div>
    </div>
  );
}