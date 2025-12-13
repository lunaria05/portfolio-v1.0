'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';
import { useState, useEffect } from 'react';

export default function ScrollZones() {
  const { isEnabled, cursorPosition } = useHandTrackingStore();
  const [activeZone, setActiveZone] = useState<'top' | 'bottom' | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      setActiveZone(null);
      return;
    }

    const screenHeight = window.innerHeight;
    const y = cursorPosition.y;

    // Top 15% of screen
    if (y < screenHeight * 0.15) {
      setActiveZone('top');
    }
    // Bottom 15% of screen
    else if (y > screenHeight * 0.85) {
      setActiveZone('bottom');
    }
    // Middle zone
    else {
      setActiveZone(null);
    }
  }, [cursorPosition, isEnabled]);

  return (
    <AnimatePresence>
      {isEnabled && (
        <>
          {/* Top Scroll Zone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeZone === 'top' ? 1 : 0 }}
            className="fixed top-0 left-0 w-full h-[15%] z-5 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 255, 136, 0.15), transparent)',
            }}
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ y: [-5, 0, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-green-400 text-sm font-medium flex items-center gap-2"
              >
                <span>↑</span> SCROLL UP
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Scroll Zone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeZone === 'bottom' ? 1 : 0 }}
            className="fixed bottom-0 left-0 w-full h-[15%] z-5 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0, 255, 136, 0.15), transparent)',
            }}
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ y: [5, 0, 5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-green-400 text-sm font-medium flex items-center gap-2"
              >
                <span>↓</span> SCROLL DOWN
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
