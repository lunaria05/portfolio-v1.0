import type { Section } from '@/types';

export const SECTIONS: Section[] = [
  {
    id: 0,
    name: 'intro',
    title: 'Hiral Vala',
    description: 'Frontend Developer & Web3 Content Creator',
    waypoint: {
      position: [0, 2, 8],
      lookAt: [0, 1, 0],
      section: 'intro',
    },
  },
  {
    id: 1,
    name: 'projects',
    title: 'Projects',
    description: 'Check out my work',
    waypoint: {
      position: [-2, 1.5, 3],
      lookAt: [0, 1, 0],
      section: 'projects',
    },
  },
  {
    id: 2,
    name: 'skills',
    title: 'Skills',
    description: 'My technical expertise',
    waypoint: {
      position: [2, 1, 2],
      lookAt: [0, 0.5, 0],
      section: 'skills',
    },
  },
  {
    id: 3,
    name: 'contact',
    title: 'Contact',
    description: "Let's connect",
    waypoint: {
      position: [0, 1.5, 5],
      lookAt: [0, 1, 0],
      section: 'contact',
    },
  },
];

export const HAND_TRACKING_CONFIG = {
  PINCH_THRESHOLD: 0.05,  // Same as HTML example - distance for pinch detection
  SCROLL_SENSITIVITY: 3,   // Pixels per frame (at 60fps = 180px/sec)
  CURSOR_SMOOTHING: 0.15,  // Same as HTML example - lerp smoothing (0.15 = good balance)
};
