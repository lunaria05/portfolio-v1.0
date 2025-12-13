# 3D Developer Portfolio with Hand Tracking

An immersive 3D portfolio experience featuring scroll-based camera navigation through a virtual developer room, with optional hand gesture controls powered by MediaPipe.

## Features

- **3D Voxel/Low-Poly Environment**: Navigate through a beautifully styled 3D developer room
- **Scroll-Based Camera Movement**: Smooth camera transitions between different portfolio sections
- **Hand Gesture Controls**: Optional webcam-based hand tracking for navigation
  - Index finger controls cursor position
  - Pinch gesture for clicking
  - Vertical hand movement for scrolling
- **Responsive Design**: Works on desktop and tablet devices
- **Four Portfolio Sections**:
  1. Welcome/Intro
  2. Projects showcase
  3. Skills display
  4. Contact information

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **MediaPipe** - Hand tracking and gesture recognition
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Modern web browser with WebGL support
- Webcam (optional, for hand tracking feature)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles
├── components/
│   ├── scene/              # 3D scene components
│   │   ├── Scene.tsx       # Main Canvas setup
│   │   ├── Room.tsx        # 3D room geometry
│   │   ├── DeskSetup.tsx   # Desk and objects
│   │   └── CameraController.tsx  # Scroll-based camera
│   └── ui/                 # UI overlay components
│       ├── SectionOverlay.tsx    # Content sections
│       ├── ScrollIndicator.tsx   # Navigation dots
│       ├── HandTrackingToggle.tsx # Hand tracking toggle
│       ├── HandCursor.tsx        # Virtual cursor
│       └── LoadingScreen.tsx     # Loading screen
├── hooks/
│   ├── useScrollHandler.ts      # Scroll event handler
│   └── useHandTracking.ts       # MediaPipe integration
├── store/
│   ├── useScrollStore.ts        # Scroll state management
│   └── useHandTrackingStore.ts  # Hand tracking state
├── types/
│   └── index.ts                 # TypeScript definitions
└── utils/
    └── constants.ts             # Config and sections
```

## Customization Guide

### 1. Modify Portfolio Content

Edit `utils/constants.ts` to change section content and camera positions:

```typescript
export const SECTIONS: Section[] = [
  {
    id: 0,
    name: 'intro',
    title: 'Your Name',
    description: 'Your tagline',
    waypoint: {
      position: [x, y, z],  // Camera position
      lookAt: [x, y, z],    // Camera target
      section: 'intro',
    },
  },
  // Add more sections...
];
```

### 2. Customize 3D Room

Modify `components/scene/Room.tsx` and `DeskSetup.tsx` to:
- Change colors (update `color` props)
- Add new objects (add `<mesh>` components)
- Adjust positions (modify `position` arrays)

### 3. Update Section Content

Edit `components/ui/SectionOverlay.tsx` to customize:
- Project cards
- Skills list
- Contact links
- Section descriptions

### 4. Adjust Hand Tracking Sensitivity

Modify `utils/constants.ts`:

```typescript
export const HAND_TRACKING_CONFIG = {
  PINCH_THRESHOLD: 0.1,        // Lower = easier to trigger
  SCROLL_SENSITIVITY: 0.5,     // Higher = faster scroll
  CURSOR_SMOOTHING: 0.15,      // Lower = more responsive
};
```

### 5. Lighting and Colors

Edit `components/scene/Scene.tsx` to adjust:
- Light positions and intensities
- Color scheme (change `color` props)
- Fog density and color

## Hand Tracking Usage

1. Click "Enable Hand Control" button in top-left
2. Allow camera access when prompted
3. Wait for "Tracking" indicator
4. A camera preview will appear in bottom-right showing your hand

### Gestures (Same as HTML Example):

- **Index Finger (☝️)**: Point with your index finger to control the cursor anywhere on screen
- **Scroll Zones**:
  - Move cursor to **top 15% of screen** → Scroll Up (green zone appears)
  - Move cursor to **bottom 15% of screen** → Scroll Down (green zone appears)
  - Keep cursor in middle → No scrolling
- **Pinch (🤏)**: Touch thumb and index finger tips together to click

### Visual Feedback:
- **Camera preview** (bottom-right) - Mirrored view of your hand
- **Green scroll zones** - Appear when hovering top/bottom
- **Custom cursor** - Follows your index finger
- **Gesture guide** (bottom-right) - Quick reference card

## Performance Optimization

The app includes several optimizations:
- Lazy loading with React Suspense
- Dynamic resolution scaling (`dpr={[1, 2]}`)
- Optimized shadow maps
- Efficient state management with Zustand

For slower devices, you can:
- Reduce shadow map size in `Scene.tsx`
- Lower the number of objects in `Room.tsx`
- Disable fog or reduce light count

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may need HTTPS for camera)
- Mobile: Scroll works, hand tracking not recommended

## Troubleshooting

### 3D scene not appearing
- Check browser console for WebGL errors
- Ensure browser supports WebGL 2.0
- Try clearing browser cache

### Hand tracking not working
- Grant camera permissions
- Ensure good lighting conditions
- Check that camera is not used by another app
- Try Chrome/Edge for best MediaPipe support

### Performance issues
- Close other tabs/applications
- Reduce browser zoom to 100%
- Check GPU acceleration is enabled
- Consider disabling hand tracking

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the app and deploy the `.next` folder:

```bash
npm run build
```

Deploy to: Netlify, Cloudflare Pages, or any Node.js hosting.

## License

MIT License - feel free to use this for your own portfolio!

## Credits

- Built with [Next.js](https://nextjs.org/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Hand tracking by [MediaPipe](https://mediapipe.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

## Support

For issues or questions, please open an issue on GitHub.

---

Made with passion for creating immersive web experiences.
