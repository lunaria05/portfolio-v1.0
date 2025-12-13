'use client';

import { useHandTrackingStore } from '@/store/useHandTrackingStore';

export default function HandTrackingDebug() {
  const { isEnabled, isTracking, cursorPosition, isPinching, scrollGesture } = useHandTrackingStore();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;
  if (!isEnabled) return null;

  return (
    <div className="fixed top-20 right-8 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-green-500/30 text-xs font-mono">
      <div className="text-green-400 font-bold mb-2">Debug Info:</div>
      <div className="space-y-1 text-white/70">
        <div>Enabled: <span className="text-green-400">{isEnabled ? 'YES' : 'NO'}</span></div>
        <div>Tracking: <span className={isTracking ? 'text-green-400' : 'text-yellow-400'}>{isTracking ? 'YES' : 'NO'}</span></div>
        <div>Cursor: <span className="text-blue-400">{Math.round(cursorPosition.x)}, {Math.round(cursorPosition.y)}</span></div>
        <div>Pinching: <span className={isPinching ? 'text-green-400' : 'text-gray-400'}>{isPinching ? 'YES' : 'NO'}</span></div>
        <div>Scroll: <span className="text-purple-400">{scrollGesture.toFixed(2)}</span></div>
      </div>
    </div>
  );
}
