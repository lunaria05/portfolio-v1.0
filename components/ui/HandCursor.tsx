'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';

export default function HandCursor() {
  const { isEnabled, isTracking, cursorPosition, isPinching } = useHandTrackingStore();

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      {isTracking && (
        <div
          style={{
            position: 'fixed',
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'none', // No CSS transition, we handle smoothing in JS
          }}
        >
          <div className="relative">
            {/* Main cursor circle - green like example */}
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                isPinching ? 'bg-green-400 border-green-400' : 'border-green-400 bg-transparent'
              }`}
              style={{
                boxShadow: isPinching
                  ? '0 0 15px rgba(0, 255, 136, 0.8)'
                  : '0 0 10px rgba(0, 255, 136, 0.5)',
                transition: 'background-color 0.1s ease, transform 0.1s ease',
                transform: isPinching ? 'scale(0.8)' : 'scale(1)',
              }}
            />

            {/* Pinch indicator text */}
            {isPinching && (
              <div
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
                style={{
                  animation: 'fadeIn 0.15s ease',
                }}
              >
                <span className="text-green-400 text-xs font-bold" style={{ textShadow: '0 0 5px rgba(0,255,136,0.8)' }}>
                  CLICKING
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
