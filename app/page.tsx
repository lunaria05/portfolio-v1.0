'use client';

import Scene from '@/components/scene/Scene';
import SectionOverlay from '@/components/ui/SectionOverlay';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { SECTIONS } from '@/utils/constants';
import Header from '@/components/ui/Header';

export default function Home() {
  useScrollHandler();

  return (
    <main className="relative">
      {/* Loading Screen */}
      <LoadingScreen />
      {/* 3D Scene Background */}
      <Scene />

      {/* UI Overlays */}
      <Header /> 
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
        <div className="backdrop-blur-sm border-2 rounded-full border-white/20 py-2! px-4!"
        style={{ borderColor: "rgba(26, 169, 218, 0.3)" }}
        >
          <p className="text-white text-sm font-medium">
            Scroll to explore
          </p>
        </div>
      </div>
    </main>
  );
}
