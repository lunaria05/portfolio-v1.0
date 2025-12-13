'use client';

import { useRef } from 'react';
import { Mesh } from 'three';

export default function DeskSetup() {
  const monitorRef = useRef<Mesh>(null);

  return (
    <group position={[0, 0, -2]}>
      {/* Desk */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.5} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.8, 0.35, 0.8]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#1a252f" />
      </mesh>
      <mesh position={[1.8, 0.35, 0.8]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#1a252f" />
      </mesh>
      <mesh position={[-1.8, 0.35, -0.8]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#1a252f" />
      </mesh>
      <mesh position={[1.8, 0.35, -0.8]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#1a252f" />
      </mesh>

      {/* Monitor */}
      <group position={[0, 1.5, -0.5]}>
        {/* Monitor Stand */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.1, 0.3, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        {/* Monitor Base */}
        <mesh position={[0, -0.65, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>

        {/* Monitor Frame */}
        <mesh ref={monitorRef} castShadow>
          <boxGeometry args={[1.8, 1, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Monitor Screen */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[1.6, 0.9, 0.01]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive="#4a9eff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Screen Content Glow */}
        <pointLight position={[0, 0, 0.5]} intensity={0.8} color="#4a9eff" distance={2} />
      </group>

      {/* Keyboard */}
      <group position={[0, 0.78, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.05, 0.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Keys (simplified as small cubes) */}
        {Array.from({ length: 8 }).map((_, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <mesh
              key={`${i}-${j}`}
              position={[-0.5 + i * 0.15, 0.03, -0.15 + j * 0.15]}
              castShadow
            >
              <boxGeometry args={[0.1, 0.02, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          ))
        )}
      </group>

      {/* Mouse */}
      <mesh position={[0.8, 0.78, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.2]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Coffee Mug */}
      <group position={[-1.2, 0.85, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.2, 16]} />
          <meshStandardMaterial color="#e94560" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.08, 0.02, 8, 16]} />
          <meshStandardMaterial color="#e94560" />
        </mesh>
      </group>

      {/* Lamp */}
      <group position={[1.5, 0.75, -0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.2, 0.3, 8]} />
          <meshStandardMaterial color="#f9a826" emissive="#f9a826" emissiveIntensity={0.3} />
        </mesh>
        <spotLight
          position={[0, 0.5, 0]}
          angle={0.6}
          penumbra={0.5}
          intensity={0.5}
          color="#f9a826"
          castShadow
        />
      </group>

      {/* Books Stack */}
      <group position={[-1.5, 0.75, 0.5]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.4]} />
          <meshStandardMaterial color="#533483" />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.4]} />
          <meshStandardMaterial color="#16213e" />
        </mesh>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.4]} />
          <meshStandardMaterial color="#0f3460" />
        </mesh>
      </group>

      {/* Office Chair - rotated to face the desk */}
      <group position={[0, 0, 1.5]} rotation={[0, Math.PI, 0]}>
        {/* Chair Base with Wheels */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} />
        </mesh>

        {/* Wheels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.3, 0.05, Math.sin(angle) * 0.3]}
              castShadow
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
          );
        })}

        {/* Chair Cylinder/Piston */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.7} />
        </mesh>

        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.35, 0.1, 16]} />
          <meshStandardMaterial color="#34495e" roughness={0.7} />
        </mesh>

        {/* Backrest */}
        <mesh position={[0, 0.9, -0.25]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.1]} />
          <meshStandardMaterial color="#34495e" roughness={0.7} />
        </mesh>

        {/* Armrests */}
        <mesh position={[0.3, 0.6, 0]} castShadow>
          <boxGeometry args={[0.1, 0.05, 0.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[-0.3, 0.6, 0]} castShadow>
          <boxGeometry args={[0.1, 0.05, 0.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      {/* PC Tower/CPU under desk */}
      <group position={[-1.5, 0.4, 0.5]}>
        {/* Main case */}
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.8, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Front panel accent */}
        <mesh position={[0.21, 0, 0]}>
          <boxGeometry args={[0.01, 0.7, 0.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        {/* RGB light strip */}
        <mesh position={[0.21, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.35]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Power button */}
        <mesh position={[0.21, 0.35, 0.15]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#4a9eff"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Ventilation slots */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.21, -0.2 + i * 0.15, -0.1]}>
            <boxGeometry args={[0.02, 0.08, 0.02]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
        ))}

        {/* Glow from RGB */}
        <pointLight position={[0.3, 0.2, 0]} intensity={0.3} color="#00ff88" distance={1} />
      </group>

      {/* Headphone stand */}
      <group position={[1.2, 0.75, 0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        {/* Headphones */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
}
