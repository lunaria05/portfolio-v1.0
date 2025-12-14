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
    <div className="fixed inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-end overflow-hidden bg-linear-to-b from-black/20 via-transparent to-black/80">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1aa9da] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* --- 1. HEADER (Positioned above carousel) --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full pb-16 flex flex-col items-center justify-center z-20 pointer-events-auto"
      >
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-[#1aa9da] to-white tracking-tighter drop-shadow-[0_0_15px_rgba(26,169,218,0.3)]">
          WORK
        </h2>
        <div className="flex items-center gap-2 mt-2 text-[#1aa9da] text-xs font-mono tracking-[0.3em] uppercase opacity-80">
          <span className="w-1.5 h-1.5 bg-[#1aa9da] rounded-full animate-pulse" />
          Selected Projects
        </div>
      </motion.div>


      {/* --- 2. NEW MODERN MODAL --- */}
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
              transition: {
                duration: 0.4,
                type: "spring",
                damping: 20,
                stiffness: 250
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 40,
              filter: "blur(20px)",
              transition: {
                duration: 0.25,
                ease: "easeInOut"
              }
            }}
            onMouseEnter={handleModalEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[480px] z-50 pointer-events-auto"
          >
            {/* Main Glass Container */}
            <motion.div
              initial={{ borderColor: "rgba(255,255,255,0.1)" }}
              animate={{
                borderColor: ["rgba(255,255,255,0.1)", "rgba(26,169,218,0.3)", "rgba(255,255,255,0.1)"],
                boxShadow: [
                  "0 0 80px rgba(0,0,0,0.8)",
                  "0 0 100px rgba(26,169,218,0.3)",
                  "0 0 80px rgba(0,0,0,0.8)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-3xl border rounded-[32px] overflow-hidden group"
            >

              {/* Internal Glow */}
              <motion.div
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-64 h-64 bg-[#1aa9da] blur-[80px] rounded-full pointer-events-none"
              />

              {/* 1. Rounded Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/5 shadow-inner"
              >
                <Image
                  src={hoveredProject.image}
                  alt={hoveredProject.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-3 left-4 flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Live Preview</span>
                </motion.div>
              </motion.div>

              {/* 2. Details Section (Gap-6) */}
              <div className="mt-6 flex flex-col gap-6">

                {/* Title & Desc */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2 leading-none">
                    {hoveredProject.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {hoveredProject.description}
                  </p>
                </motion.div>

                {/* Tech Stack (Tab Design) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Built With</span>
                  <div className="flex flex-wrap gap-2">
                    {hoveredProject.techStack.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05, duration: 0.2 }}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-gray-300 font-mono flex items-center gap-1.5 hover:bg-white/10 hover:border-[#1aa9da]/30 transition-colors cursor-default"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#1aa9da]" />
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 3. Unique Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  {/* Live Demo Button (Glowing) */}
                  <a
                    href={hoveredProject.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group/btn flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1aa9da] text-black font-bold text-sm overflow-hidden shadow-[0_0_20px_rgba(26,169,218,0.3)] transition-transform active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FaPlay size={10} /> Launch App
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  </a>

                  {/* Code Button (Terminal Style) */}
                  <a
                    href={hoveredProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black border border-white/20 text-white font-mono text-xs hover:bg-white/5 hover:border-white/50 transition-all active:scale-95 group/code"
                  >
                    <FaCodeBranch className="text-gray-500 group-hover/code:text-[#1aa9da] transition-colors" />
                    <span>source_code</span>
                  </a>
                </motion.div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- 3. CAROUSEL (Bottom) --- */}
      <div className="relative w-full pb-8 pt-4 pointer-events-auto z-40">
        
        {/* linear Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

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
                className="relative shrink-0 w-[280px] md:w-[320px] h-[180px] md:h-[200px] cursor-pointer"
                onMouseEnter={() => handleMouseEnter(project)}
                onMouseLeave={handleMouseLeave}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, type: "spring", stiffness: 200 }
                }}
              >
                <motion.div
                  whileHover={{
                    borderColor: "rgba(26, 169, 218, 0.6)",
                    boxShadow: "0 0 40px rgba(26, 169, 218, 0.4)"
                  }}
                  className="w-full h-full rounded-2xl overflow-hidden relative bg-black/40 border border-white/10 transition-all duration-300 shadow-lg"
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full p-5"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="text-white font-bold text-lg hover:text-[#1aa9da] transition-colors">
                      {project.name}
                    </h4>
                  </motion.div>
                </motion.div>
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