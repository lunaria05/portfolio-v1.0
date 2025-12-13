import { create } from 'zustand';
import type { HandTrackingState } from '@/types';

export const useHandTrackingStore = create<HandTrackingState>((set) => ({
  isEnabled: false,
  isTracking: false,
  cursorPosition: { x: 0, y: 0 },
  isPinching: false,
  scrollGesture: 0,
  setEnabled: (enabled) => set({ isEnabled: enabled }),
  setTracking: (tracking) => set({ isTracking: tracking }),
  setCursorPosition: (position) => set({ cursorPosition: position }),
  setPinching: (pinching) => set({ isPinching: pinching }),
  setScrollGesture: (scroll) => set({ scrollGesture: scroll }),
}));
