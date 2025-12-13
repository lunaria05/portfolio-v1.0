'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';

export default function GestureGuide() {
  const { isEnabled } = useHandTrackingStore();

  return (
    <AnimatePresence>
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-8 bottom-8 z-20 bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-white/20 max-w-xs"
        >
          <h3 className="text-white font-semibold mb-3 text-sm">Hand Gestures</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/40">
                <span className="text-blue-400 text-lg font-bold">☝️</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">Index Finger</p>
                <p className="text-gray-400 text-xs">Control cursor anywhere</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/40">
                <span className="text-purple-400 text-lg font-bold">↑↓</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">Top/Bottom Zones</p>
                <p className="text-gray-400 text-xs">Hover to scroll (15%)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/40">
                <span className="text-green-400 text-lg font-bold">🤏</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-medium">Pinch Gesture</p>
                <p className="text-gray-400 text-xs">Thumb + Index to click</p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-gray-400 text-xs">
              Keep your hand visible to the camera
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
