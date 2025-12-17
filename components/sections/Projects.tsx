'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '@/utils/projectsData';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaPlay } from 'react-icons/fa';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate data for smooth infinite scrolling
  const marqueeProjects = [...projectsData, ...projectsData, ...projectsData, ...projectsData];

  // --- LOGIC ---
  const handleMouseEnter = (project: Project) => {
    setIsHoveringCarousel(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredProject(project);
  };

  const handleMouseLeave = () => {
    setIsHoveringCarousel(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
    }, 150);
  };

  const handleModalEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="fixed inset-0 w-full h-[100vh] z-10 pointer-events-none flex flex-col justify-between overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1aa9da] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* --- 1. NEW HEADER (Tactical Data Grid) --- */}
      {/* pt-32 ensures it starts BELOW your global "HIRAL VALA" header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full pt-32 px-6 md:px-12 z-20 pointer-events-auto flex flex-col items-center"
      >

        {/* Decorative Top Bar & Stats */}
        <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-between items-end border-b border-white/10 pb-4 mb-6">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#1aa9da] font-mono tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1aa9da] rounded-full animate-pulse" />
                    PROJECT_DATABASE_V2
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    INDEX
                </h2>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-gray-500 font-mono">
                    [{projectsData.length} NODES FOUND]
                </p>
            </div>
        </div>

        {/* The Grid of Interactive Chips */}
        <div className="flex flex-wrap gap-2 md:gap-3 w-full max-w-4xl xl:max-w-6xl justify-center">
            {projectsData.map((project, index) => {
                const isHovered = hoveredProject?.id === project.id;
                
                return (
                    <motion.div
                        key={project.id}
                        onMouseEnter={() => handleMouseEnter(project)}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            group relative cursor-pointer overflow-hidden rounded-md border transition-all duration-300
                            h-10 md:h-12 flex items-center px-4 gap-3
                            ${isHovered 
                                ? 'bg-[#1aa9da] border-[#1aa9da] shadow-[0_0_25px_rgba(26,169,218,0.4)]' 
                                : 'bg-black/60 border-white/10 hover:border-[#1aa9da]/50 hover:bg-white/10'
                            }
                        `}
                    >
                        {/* Number */}
                        <span className={`text-[10px] font-mono font-bold transition-colors ${isHovered ? 'text-black' : 'text-[#1aa9da]'}`}>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>

                        {/* Divider */}
                        <div className={`h-3 w-[1px] transition-colors ${isHovered ? 'bg-black/20' : 'bg-white/20'}`} />

                        {/* Name */}
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide truncate transition-colors ${isHovered ? 'text-black' : 'text-gray-300 group-hover:text-white'}`}>
                            {project.name}
                        </span>
                        
                        {/* Scanline Effect (Only when NOT hovered) */}
                        {!isHovered && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                        )}
                    </motion.div>
                );
            })}
        </div>
      </motion.div>


      {/* --- 2. GLASSMORPHISM MODAL (Center) - UNCHANGED --- */}
      <AnimatePresence mode="wait">
        {hoveredProject && (
          <motion.div
            key={hoveredProject.id}
            initial={{ opacity: 0, scale: 0.85, y: 40, filter: "blur(20px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, type: "spring", damping: 20, stiffness: 250 }
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 40,
              filter: "blur(20px)",
              transition: { duration: 0.25, ease: "easeInOut" }
            }}
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[480px] z-50 pointer-events-auto"
          >
            <motion.div
              initial={{ borderColor: "rgba(255,255,255,0.1)" }}
              animate={{
                borderColor: ["rgba(255,255,255,0.1)", "rgba(26,169,218,0.3)", "rgba(255,255,255,0.1)"],
                boxShadow: ["0 0 80px rgba(0,0,0,0.8)", "0 0 100px rgba(26,169,218,0.3)", "0 0 80px rgba(0,0,0,0.8)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-6 bg-[#0a0a0a]/90 backdrop-blur-3xl border rounded-[32px] overflow-hidden group"
            >
              <motion.div className="absolute top-0 right-0 w-64 h-64 bg-[#1aa9da] blur-[80px] rounded-full pointer-events-none opacity-20" />

              <motion.div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                <Image src={hoveredProject.image} alt={hoveredProject.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Live Preview</span>
                </div>
              </motion.div>

              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-none">{hoveredProject.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{hoveredProject.description}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Built With</span>
                  <div className="flex flex-wrap gap-2">
                    {hoveredProject.techStack.map((tech, idx) => (
                      <div key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-gray-300 font-mono flex items-center gap-1.5 hover:bg-white/10 hover:border-[#1aa9da]/30 transition-colors cursor-default">
                        <span className="w-1 h-1 rounded-full bg-[#1aa9da]" />
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <a href={hoveredProject.viewLink} target="_blank" rel="noopener noreferrer" className="relative group/btn flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1aa9da] text-black font-bold text-sm overflow-hidden shadow-[0_0_20px_rgba(26,169,218,0.3)] transition-transform active:scale-95">
                    <span className="relative z-10 flex items-center gap-2"><FaPlay size={10} /> Launch App</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  </a>
                  <a href={hoveredProject.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black border border-white/20 text-white font-mono text-xs hover:bg-white/5 hover:border-white/50 transition-all active:scale-95 group/code">
                    <FaCodeBranch className="text-gray-500 group-hover/code:text-[#1aa9da] transition-colors" />
                    <span>source_code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- 3. CAROUSEL (Bottom) - UNCHANGED --- */}
      <div className="relative w-full pb-8 pt-4 pointer-events-auto z-40 mt-auto">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden group py-4">
          <div 
            className="flex gap-6 animate-marquee"
            style={{ 
              animationPlayState: isHoveringCarousel ? 'paused' : 'running',
              width: 'max-content' 
            }}
          >
            {marqueeProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="relative shrink-0 w-[250px] h-[160px] sm:w-[280px] md:w-[320px] sm:h-[180px] md:h-[200px] cursor-pointer"
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black/40 border border-white/10 transition-all duration-300 shadow-lg">
                  <Image src={project.image} alt={project.name} fill className="object-cover transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  <motion.div className="absolute bottom-0 left-0 w-full p-5" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <h4 className="text-white font-bold text-lg hover:text-[#1aa9da] transition-colors">{project.name}</h4>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center mt-4 opacity-50">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest animate-pulse">
            Hover to Preview
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default Projects;