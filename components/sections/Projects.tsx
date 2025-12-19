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
    <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex flex-col justify-between overflow-hidden">

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
                            ${!isHovered 
                                ? 'bg-[#1aa9da] border-[#1aa9da] shadow-[0_0_25px_rgba(26,169,218,0.4)]' 
                                : 'bg-[#1aa9da]/20 border-white/10 hover:border-[#1aa9da]/50 hover:bg-white/10'
                            }
                        `}
                    >
                        {/* Number */}
                        <span className={`text-[10px] font-mono font-bold transition-colors ${!isHovered ? 'text-black' : 'text-[#1aa9da]'}`}>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>

                        {/* Divider */}
                        <div className={`h-3 w-px transition-colors ${!isHovered ? 'bg-black/20' : 'bg-white/20'}`} />

                        {/* Name */}
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide truncate transition-colors ${!isHovered ? 'text-black' : 'text-gray-300 group-hover:text-white'}`}>
                            {project.name}
                        </span>
                        
                        {/* Scanline Effect (Only when NOT hovered) */}
                        {!isHovered && (
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-[420px] sm:max-w-[480px] md:max-w-[520px] z-50 pointer-events-auto"
          >
            {/* Modern Card Design */}
            <motion.div
              className="relative bg-linear-to-br from-zinc-900/95 via-black/95 to-zinc-950/95 backdrop-blur-2xl border border-white/8 rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
            >
              {/* Subtle gradient glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-[#1aa9da]/10 via-transparent to-purple-500/5 pointer-events-none" />

              {/* Accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#1aa9da]/50 to-transparent" />

              {/* Content Container */}
              <div className="relative">
                {/* Image Section */}
                <div className="relative w-full aspect-video overflow-hidden group/img">
                  <Image
                    src={hoveredProject.image}
                    alt={hoveredProject.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover/img:scale-105"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-br from-[#1aa9da]/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />

                  {/* Status badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-full"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                    </span>
                    <span className="text-[10px] font-medium text-green-100 uppercase tracking-wider">Live</span>
                  </motion.div>
                </div>

                {/* Info Section */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight"
                    >
                      {hoveredProject.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-sm sm:text-[15px] text-gray-400 leading-relaxed line-clamp-2"
                    >
                      {hoveredProject.description}
                    </motion.p>
                  </div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 bg-linear-to-r from-[#1aa9da] to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold">Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hoveredProject.techStack.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + idx * 0.03 }}
                          className="px-2.5 py-1 bg-white/3 hover:bg-white/8 border border-white/8 hover:border-[#1aa9da]/30 rounded-lg text-[11px] sm:text-xs text-gray-300 font-medium transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 pt-2"
                  >
                    {/* Launch Button */}
                    <a
                      href={hoveredProject.viewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 group/launch relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-linear-to-r from-[#1aa9da] to-[#1aa9da]/90 hover:from-[#1aa9da]/90 hover:to-[#1aa9da] rounded-xl font-semibold text-sm text-black transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#1aa9da]/25"
                    >
                      <FaExternalLinkAlt className="text-[11px]" />
                      <span>View Project</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/launch:translate-y-0 transition-transform duration-300" />
                    </a>

                    {/* Code Button */}
                    <a
                      href={hoveredProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/code flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-white/3 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-xl font-medium text-sm text-gray-300 hover:text-white transition-all duration-200 active:scale-[0.98]"
                    >
                      <FaGithub className="text-base group-hover/code:text-[#1aa9da] transition-colors" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#1aa9da]/30 to-transparent" />
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