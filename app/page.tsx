'use client';

import Scene from '@/components/scene/Scene';
import SectionOverlay from '@/components/ui/SectionOverlay';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useScrollHandler } from '@/hooks/useScrollHandler';
import { SECTIONS } from '@/utils/constants';
import Header from '@/components/ui/Header';
import ScrollHint from '@/components/ui/ScrollHint';

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
      <ScrollHint />
    </main>
  );
}
