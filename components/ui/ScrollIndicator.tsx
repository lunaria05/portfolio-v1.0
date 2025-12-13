'use client';

import { motion } from 'framer-motion';
import { useScrollStore } from '@/store/useScrollStore';
import { SECTIONS } from '@/utils/constants';

export default function ScrollIndicator() {
  const { scrollProgress, currentSection } = useScrollStore();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
      {SECTIONS.map((section, index) => (
        <motion.div
          key={section.id}
          className="relative flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span
            className={`text-sm font-medium transition-all duration-300 ${
              currentSection === index
                ? 'text-white opacity-100'
                : 'text-gray-500 opacity-0 group-hover:opacity-100'
            }`}
          >
            {section.name}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-white border-white scale-125'
                : 'bg-transparent border-gray-500 hover:border-white'
            }`}
          />
        </motion.div>
      ))}

      <div className="mt-4 w-1 h-20 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 to-purple-500"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
}
