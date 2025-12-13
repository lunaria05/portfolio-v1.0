'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import DeskSetup from './DeskSetup';

// Voxel/Low-poly room component
export default function Room() {
  const floorRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Floor - dark tiles */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20, 4, 4]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#16213e" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 10]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[5, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 10]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0a0e27" />
      </mesh>

      {/* Window on back wall */}
      <group position={[0, 2.5, -4.9]}>
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#1e3a5f" emissive="#1e3a5f" emissiveIntensity={0.2} />
        </mesh>
        {/* Window frame */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.1, 2.2, 0.1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      {/* Sofa against back wall */}
      <group position={[-2.5, 0, -4.5]} rotation={[0, 0, 0]}>
        {/* Sofa base/seat */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.4, 0.9]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.8} />
        </mesh>

        {/* Sofa backrest */}
        <mesh position={[0, 0.75, -0.35]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.7, 0.2]} />
          <meshStandardMaterial color="#34495e" roughness={0.8} />
        </mesh>

        {/* Left armrest */}
        <mesh position={[-1, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#34495e" roughness={0.8} />
        </mesh>

        {/* Right armrest */}
        <mesh position={[1, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#34495e" roughness={0.8} />
        </mesh>

        {/* Seat cushions */}
        <mesh position={[-0.55, 0.57, 0.05]} castShadow>
          <boxGeometry args={[0.8, 0.15, 0.75]} />
          <meshStandardMaterial color="#3d5a80" roughness={0.7} />
        </mesh>
        <mesh position={[0.55, 0.57, 0.05]} castShadow>
          <boxGeometry args={[0.8, 0.15, 0.75]} />
          <meshStandardMaterial color="#3d5a80" roughness={0.7} />
        </mesh>

        {/* Back cushions */}
        <mesh position={[-0.55, 0.75, -0.28]} castShadow>
          <boxGeometry args={[0.75, 0.5, 0.15]} />
          <meshStandardMaterial color="#3d5a80" roughness={0.7} />
        </mesh>
        <mesh position={[0.55, 0.75, -0.28]} castShadow>
          <boxGeometry args={[0.75, 0.5, 0.15]} />
          <meshStandardMaterial color="#3d5a80" roughness={0.7} />
        </mesh>

        {/* Throw pillow */}
        <mesh position={[0.4, 0.68, 0.1]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.12]} />
          <meshStandardMaterial color="#e94560" roughness={0.6} />
        </mesh>
      </group>

      {/* Decorative Plant 1 (Corner) */}
      <group position={[3.5, 0, -3.5]}>
        {/* Pot */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.5, 8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 8]} />
          <meshStandardMaterial color="#4a3020" />
        </mesh>
        {/* Leaves - multiple spheres for bushy look */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#2d5016" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.9, 0.1]} castShadow>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#3a6b1f" roughness={0.7} />
        </mesh>
        <mesh position={[-0.1, 0.85, -0.15]} castShadow>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#2d5016" roughness={0.7} />
        </mesh>
      </group>

      {/* Decorative Plant 2 (Small succulent on shelf) */}
      <group position={[-3.5, 1.5, -3.5]}>
        {/* Small pot */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.3, 6]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} />
        </mesh>
        {/* Succulent leaves */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.08, 0.35, Math.sin(angle) * 0.08]}
              rotation={[0, angle, Math.PI / 4]}
              castShadow
            >
              <coneGeometry args={[0.05, 0.15, 4]} />
              <meshStandardMaterial color="#5a8f29" />
            </mesh>
          );
        })}
      </group>

      {/* Floating Shelves on Left Wall */}
      <group position={[-4.8, 1.5, 0]}>
        {/* Shelf 1 */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.05, 1.5]} />
          <meshStandardMaterial color="#3e2723" roughness={0.7} />
        </mesh>
        {/* Small decorative items on shelf */}
        <mesh position={[0.1, 0.08, -0.5]} castShadow>
          <boxGeometry args={[0.1, 0.15, 0.08]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[0.1, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        <mesh position={[0.1, 0.06, 0.5]} castShadow>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffe66d" />
        </mesh>
      </group>

      {/* Shelf 2 (lower) */}
      <group position={[-4.8, 2.5, 1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.05, 1.2]} />
          <meshStandardMaterial color="#3e2723" roughness={0.7} />
        </mesh>
      </group>

      {/* Rug under desk area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.9} />
      </mesh>

      {/* Rug pattern (stripes) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[4.5, 0.3]} />
        <meshStandardMaterial color="#16213e" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 1]}>
        <planeGeometry args={[4.5, 0.3]} />
        <meshStandardMaterial color="#16213e" roughness={0.9} />
      </mesh>

      {/* Wall Posters/Art */}
      <group position={[3, 2, -4.9]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1, 1.4, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Poster content */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.85, 1.25]} />
          <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.1} />
        </mesh>
      </group>

      <group position={[-3, 2.5, -4.9]}>
        <mesh>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.05, 0.65]} />
          <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Small side table next to bean bag */}
      <group position={[-3, 0.3, 2]}>
        {/* Table top */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#5d4037" roughness={0.6} />
        </mesh>
        {/* Legs */}
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.2, -0.15, Math.sin(angle) * 0.2]}
              castShadow
            >
              <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
              <meshStandardMaterial color="#3e2723" />
            </mesh>
          );
        })}
        {/* Book on table */}
        <mesh position={[0.05, 0.05, 0.05]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.05, 0.25]} />
          <meshStandardMaterial color="#8e44ad" />
        </mesh>
      </group>

      {/* Gaming console or decoration */}
      <group position={[3.5, 0.25, 3]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.15, 0.4]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.4} />
        </mesh>
        {/* Power LED */}
        <mesh position={[0.3, 0.08, 0.15]}>
          <cylinderGeometry args={[0.01, 0.01, 0.01, 8]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Desk Setup with Monitor, Keyboard, etc. */}
      <DeskSetup />
    </group>
  );
}
