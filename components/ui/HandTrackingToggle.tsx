'use client';

import { motion } from 'framer-motion';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';

export default function HandTrackingToggle() {
  const { isEnabled, isTracking, setEnabled } = useHandTrackingStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-8 left-8 z-20"
    >
      <button
        onClick={() => setEnabled(!isEnabled)}
        className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border-2 transition-all duration-300 ${
          isEnabled
            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <div className="relative w-6 h-6">
          <motion.div
            animate={{
              scale: isTracking ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isTracking ? Infinity : 0,
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
          </motion.div>
        </div>
        <span className="font-medium">
          {isEnabled ? (isTracking ? 'Tracking' : 'Hand Control') : 'Enable Hand Control'}
        </span>
      </button>

      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10"
        >
          <p className="text-xs text-gray-300">
            {isTracking ? (
              <>
                <span className="text-green-400">●</span> Camera active
              </>
            ) : (
              <>
                <span className="text-yellow-400">●</span> Allow camera access
              </>
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
