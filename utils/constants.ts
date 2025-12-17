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
    name: 'journey',
    title: 'Journey',
    description: "My professional timeline",
    waypoint: {
      position: [-2, 1.5, 3], // Previously used for 'projects'
      lookAt: [0, 1, 0],
      section: 'journey',
    },
  },
  {
    id: 2,
    name: 'skills',
    title: 'Skills',
    description: 'My technical expertise',
    waypoint: {
      position: [2, 1, 2], // Kept same (Right side)
      lookAt: [0, 0.5, 0],
      section: 'skills',
    },
  },
  {
    id: 3,
    name: 'projects',
    title: 'Projects',
    description: 'Check out my work',
    waypoint: {
      position: [-2, 1, 2], // NEW: Symmetrical to Skills (Left side close)
      lookAt: [0, 1, 0],
      section: 'projects',
    },
  },
  {
    id: 4,
    name: 'contact',
    title: 'Contact',
    description: "Let's connect",
    waypoint: {
      position: [0, 1.5, 5], // Kept same (Center back)
      lookAt: [0, 1, 0],
      section: 'contact',
    },
  },
];

export const HAND_TRACKING_CONFIG = {
  PINCH_THRESHOLD: 0.05,
  SCROLL_SENSITIVITY: 3,
  CURSOR_SMOOTHING: 0.15,
};