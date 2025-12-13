import { create } from 'zustand';
import type { ScrollState } from '@/types';

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  currentSection: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCurrentSection: (section) => set({ currentSection: section }),
}));
