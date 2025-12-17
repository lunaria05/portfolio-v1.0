'use client';

import { useState, useEffect } from 'react';

export default function ScrollHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Logic is now contained entirely inside this component
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-12 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 xl:left-1/2 xl:-translate-x-1/2 z-20 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        
        {/* --- REACTOR CORE DESIGN --- */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          
          {/* 1. Outer Static Glow */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>

          {/* 2. Rotating Segmented Ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
          </div>

          {/* 3. Inner Counter-Rotating Ring */}
          <div className="absolute inset-3 border-l border-r border-white/40 rounded-full animate-spin-reverse"></div>

          {/* 4. The Core (Pulsing Pill) */}
          <div className="w-1 h-6 bg-gradient-to-b from-white to-transparent rounded-full animate-pulse-core"></div>
        </div>

        {/* --- TEXT --- */}
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
          Scroll to Start
        </span>
      </div>

      {/* --- ANIMATIONS --- */}
      <style jsx>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulse-core {
          0%, 100% { height: 12px; opacity: 0.5; box-shadow: 0 0 10px rgba(255,255,255,0.2); }
          50% { height: 24px; opacity: 1; box-shadow: 0 0 20px rgba(255,255,255,0.6); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 5s linear infinite;
        }
        .animate-pulse-core {
          animation: pulse-core 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}