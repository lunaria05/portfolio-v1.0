export interface ScrollState {
  scrollProgress: number;
  currentSection: number;
  setScrollProgress: (progress: number) => void;
  setCurrentSection: (section: number) => void;
}

export interface HandTrackingState {
  isEnabled: boolean;
  isTracking: boolean;
  cursorPosition: { x: number; y: number };
  isPinching: boolean;
  scrollGesture: number;
  setEnabled: (enabled: boolean) => void;
  setTracking: (tracking: boolean) => void;
  setCursorPosition: (position: { x: number; y: number }) => void;
  setPinching: (pinching: boolean) => void;
  setScrollGesture: (scroll: number) => void;
}

export interface CameraWaypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  section: string;
}

export interface Section {
  id: number;
  name: string;
  title: string;
  description: string;
  waypoint: CameraWaypoint;
}
