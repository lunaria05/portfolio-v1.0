'use client';

import { useEffect, useCallback } from 'react';
import { useScrollStore } from '@/store/useScrollStore';

export function useScrollHandler() {
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setScrollProgress(progress);
  }, [setScrollProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
