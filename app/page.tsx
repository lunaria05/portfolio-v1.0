'use client';

import Scene from '@/components/scene/Scene';
import SectionOverlay from '@/components/ui/SectionOverlay';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { SECTIONS } from '@/utils/constants';

export default function Home() {
  useScrollHandler();

  return (
    <main className="relative">
      {/* Loading Screen */}
      <LoadingScreen />
      {/* 3D Scene Background */}
      <Scene />

      {/* UI Overlays */}
      <SectionOverlay />
      <ScrollIndicator />

      {/* Scroll Container - creates scrollable space */}
      <div
        style={{
          height: `${SECTIONS.length * 100}vh`,
          position: 'relative',
          pointerEvents: 'none',
        }}
      />

      {/* Instructions overlay for first-time users */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <p className="text-white text-sm font-medium">
            Scroll to explore
          </p>
        </div>
      </div>
    </main>
  );
}
