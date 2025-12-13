'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { useScrollStore } from '@/store/useScrollStore';
import { SECTIONS } from '@/utils/constants';

export default function CameraController() {
  const { camera } = useThree();
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const setCurrentSection = useScrollStore((state) => state.setCurrentSection);

  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3(0, 1, 0));

  useFrame((state, delta) => {
    // Calculate which section we're in based on scroll progress
    const sectionIndex = Math.min(
      Math.floor(scrollProgress * SECTIONS.length),
      SECTIONS.length - 1
    );

    // Calculate progress within current section
    const sectionProgress = (scrollProgress * SECTIONS.length) % 1;

    // Get current and next waypoint
    const currentWaypoint = SECTIONS[sectionIndex].waypoint;
    const nextWaypoint = SECTIONS[Math.min(sectionIndex + 1, SECTIONS.length - 1)].waypoint;

    // Interpolate between waypoints
    targetPosition.current.fromArray(currentWaypoint.position);
    targetLookAt.current.fromArray(currentWaypoint.lookAt);

    if (sectionIndex < SECTIONS.length - 1) {
      const nextPos = new Vector3().fromArray(nextWaypoint.position);
      const nextLook = new Vector3().fromArray(nextWaypoint.lookAt);

      targetPosition.current.lerp(nextPos, sectionProgress);
      targetLookAt.current.lerp(nextLook, sectionProgress);
    }

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, delta * 2);
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);

    // Update current section
    setCurrentSection(sectionIndex);
  });

  return null;
}
