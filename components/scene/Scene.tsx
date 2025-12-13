'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import CameraController from './CameraController';
import Room from './Room';

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="!fixed inset-0 -z-10"
    >
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 5, 15]} />

      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#ffffff"
      />

      {/* Accent lights for atmosphere */}
      <pointLight position={[-3, 2, -3]} intensity={0.8} color="#4a9eff" distance={10} />
      <pointLight position={[3, 1.5, 2]} intensity={0.6} color="#9d4edd" distance={8} />
      <pointLight position={[0, 4, -4]} intensity={0.5} color="#f72585" distance={6} />

      {/* Rim light for depth */}
      <spotLight
        position={[-5, 3, 3]}
        angle={0.6}
        penumbra={1}
        intensity={0.5}
        color="#4cc9f0"
        castShadow
      />

      <Suspense fallback={null}>
        <Room />
      </Suspense>

      <CameraController />

      {/* Development helper - remove in production */}
      {process.env.NODE_ENV === 'development' && <OrbitControls />}
    </Canvas>
  );
}
