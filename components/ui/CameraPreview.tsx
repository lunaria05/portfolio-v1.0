'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';
import { useEffect, useRef, useState } from 'react';

export default function CameraPreview() {
  const { isEnabled, isTracking } = useHandTrackingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const video = document.getElementById('hand-tracking-video') as HTMLVideoElement;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const drawVideoFrame = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Mirror the video horizontally for natural interaction
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      animationId = requestAnimationFrame(drawVideoFrame);
    };

    drawVideoFrame();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isEnabled, isTracking]);

  return (
    <AnimatePresence>
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-5 right-5 z-30"
        >
          <div className="relative rounded-xl overflow-hidden border-2 border-green-500/30 shadow-2xl">
            <canvas
              ref={canvasRef}
              className="w-40 h-[120px] object-cover"
              style={{ transform: 'scaleX(1)' }}
            />

            {/* Status indicator */}
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-green-400 text-xs font-bold" style={{ textShadow: '0 0 5px rgba(0,255,136,0.8)' }}>
                {isTracking ? 'TRACKING' : 'READY'}
              </span>
            </div>

            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="absolute top-2 right-2 w-5 h-5 bg-black/60 hover:bg-black/80 rounded text-white/70 hover:text-white text-xs flex items-center justify-center transition-colors"
            >
              {isMinimized ? '□' : '–'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
