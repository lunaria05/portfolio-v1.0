'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingTexts = [
  "Initializing Environment...",
  "Loading 3D Assets...",
  "Compiling Shaders...",
  "Connecting to Network...",
  "System Ready."
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // 1. Text Cycling Logic
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    // 2. Progress Logic
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(textInterval);
          setTimeout(() => setIsLoading(false), 800); // Small delay at 100%
          return 100;
        }
        // Randomize speed to feel natural
        const increment = Math.random() * 2.5; 
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050505] text-white overflow-hidden"
          // THE EXIT ANIMATION: Slide Up like a curtain
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          
          {/* Top Decorative Line */}
          <div className="w-full h-1 bg-white/5 relative">
             <motion.div 
                className="h-full bg-[#1aa9da] shadow-[0_0_15px_#1aa9da]"
                style={{ width: `${progress}%` }}
             />
          </div>

          {/* MAIN CENTER CONTENT */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            
            {/* The Huge Counter */}
            <div className="relative">
              <span className="text-[12vw] md:text-[150px] font-black font-mono tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 px-4">
                {Math.round(progress)}
              </span>
              <span className="text-2xl md:text-4xl font-bold text-[#1aa9da] absolute top-4 md:top-8 -right-6 md:-right-10">
                %
              </span>
            </div>

            {/* Dynamic Status Text */}
            <motion.div 
               className="h-8 mt-4 overflow-hidden flex flex-col items-center"
            >
                <AnimatePresence mode="popLayout">
                    <motion.p 
                        key={textIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm md:text-base font-mono text-gray-400 uppercase tracking-widest"
                    >
                        {loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]}
                    </motion.p>
                </AnimatePresence>
            </motion.div>

          </div>

          {/* FOOTER METADATA */}
          <div className="w-full p-8 flex justify-between items-end text-[10px] md:text-xs font-mono text-gray-600 uppercase">
             <div className="flex flex-col gap-1">
                <span>Memory: 1024MB OK</span>
                <span>GPU: Accelerated</span>
             </div>
             <div className="flex flex-col gap-1 text-right">
                <span>{new Date().getFullYear()} © Portfolio</span>
                <span className="text-[#1aa9da]">v2.0.0 (Stable)</span>
             </div>
          </div>

          {/* Background Grid Pattern (Subtle) */}
          <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`, 
                 backgroundSize: '40px 40px' 
               }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}