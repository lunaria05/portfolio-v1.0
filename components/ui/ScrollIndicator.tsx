'use client';

import { motion } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { SECTIONS } from '@/utils/constants';

export default function ScrollIndicator() {
  const { currentSection } = useScrollStore();

  return (
    <div className="hidden fixed right-8 top-1/2 -translate-y-1/2 z-20 lg:flex flex-col gap-4">
      {SECTIONS.map((section, index) => (
        <motion.div
          key={section.id}
          // Added 'group' here so the hover effect on text works
          className="group relative flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span
            className={`text-sm font-medium transition-all duration-300 ${
              currentSection === index
                ? 'text-[#1aa9da] opacity-100' // Active text color
                : 'text-gray-500 opacity-0 group-hover:opacity-100'
            }`}
          >
            {section.name}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-[#1aa9da] border-[#1aa9da] scale-125 shadow-[0_0_10px_#1aa9da]' // Active dot color + glow
                : 'bg-transparent border-gray-500 hover:border-[#1aa9da]' // Hover border color
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}