'use client';

import { useEffect, useRef, useCallback } from 'react';
import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { useHandTrackingStore } from '@/store/useHandTrackingStore';
import { HAND_TRACKING_CONFIG } from '@/utils/constants';

export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number>();
  const lastHandPositionRef = useRef({ x: 0, y: 0 });
  const previousYRef = useRef<number>(0);

  const {
    isEnabled,
    setTracking,
    setCursorPosition,
    setPinching,
    setScrollGesture,
  } = useHandTrackingStore();

  const calculatePinchDistance = useCallback((landmarks: any[]) => {
    // Calculate distance between thumb tip (4) and index finger tip (8)
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    const dx = thumbTip.x - indexTip.x;
    const dy = thumbTip.y - indexTip.y;
    const dz = thumbTip.z - indexTip.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, []);

  const processHandLandmarks = useCallback(
    (results: HandLandmarkerResult) => {
      if (!results.landmarks || results.landmarks.length === 0) {
        setTracking(false);
        setScrollGesture(0);
        return;
      }

      setTracking(true);
      const landmarks = results.landmarks[0]; // Use first detected hand

      // 1. Get Index Finger Tip (Landmark 8) for Cursor
      const indexTip = landmarks[8];

      // Mirror X axis (like in example) for natural feel
      const x = (1 - indexTip.x) * window.innerWidth;
      const y = indexTip.y * window.innerHeight;

      // Smooth cursor movement with lerp
      const smoothX =
        lastHandPositionRef.current.x +
        (x - lastHandPositionRef.current.x) * HAND_TRACKING_CONFIG.CURSOR_SMOOTHING;
      const smoothY =
        lastHandPositionRef.current.y +
        (y - lastHandPositionRef.current.y) * HAND_TRACKING_CONFIG.CURSOR_SMOOTHING;

      lastHandPositionRef.current = { x: smoothX, y: smoothY };
      setCursorPosition({ x: smoothX, y: smoothY });

      // 2. Gesture Detection: Pinch (Index 8 and Thumb 4)
      const thumbTip = landmarks[4];
      const distance = Math.sqrt(
        Math.pow(indexTip.x - thumbTip.x, 2) +
        Math.pow(indexTip.y - thumbTip.y, 2)
      );

      // Threshold for pinch (click) - same as example
      const isPinching = distance < 0.05;
      setPinching(isPinching);

      // 3. Scroll Logic based on Hand Y Position (Zone-based like example)
      const normalizedY = indexTip.y; // 0 to 1

      if (normalizedY < 0.15) {
        // Top Zone (15%) -> Scroll Up
        setScrollGesture(-HAND_TRACKING_CONFIG.SCROLL_SENSITIVITY);
      } else if (normalizedY > 0.85) {
        // Bottom Zone (15%) -> Scroll Down
        setScrollGesture(HAND_TRACKING_CONFIG.SCROLL_SENSITIVITY);
      } else {
        // Middle Zone -> No Scroll
        setScrollGesture(0);
      }
    },
    [setCursorPosition, setPinching, setScrollGesture, setTracking]
  );

  const predictWebcam = useCallback(async () => {
    if (!handLandmarkerRef.current || !videoRef.current || !isEnabled) {
      return;
    }

    const startTimeMs = performance.now();

    try {
      const results = handLandmarkerRef.current.detectForVideo(
        videoRef.current,
        startTimeMs
      );
      processHandLandmarks(results);
    } catch (error) {
      console.error('Hand tracking error:', error);
    }

    animationFrameRef.current = requestAnimationFrame(predictWebcam);
  }, [isEnabled, processHandLandmarks]);

  const initializeHandTracking = useCallback(async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      // Initialize video stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });

      if (!videoRef.current) {
        videoRef.current = document.createElement('video');
        videoRef.current.id = 'hand-tracking-video';
        videoRef.current.setAttribute('playsinline', 'true');
        document.body.appendChild(videoRef.current);
      }

      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', () => {
        predictWebcam();
      });
      videoRef.current.play();
    } catch (error) {
      console.error('Failed to initialize hand tracking:', error);
      setTracking(false);
    }
  }, [predictWebcam, setTracking]);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      if (videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
      }
      videoRef.current = null;
    }

    handLandmarkerRef.current = null;
    setTracking(false);
  }, [setTracking]);

  useEffect(() => {
    if (isEnabled) {
      initializeHandTracking();
    } else {
      cleanup();
    }

    return cleanup;
  }, [isEnabled, initializeHandTracking, cleanup]);

  return { videoRef };
}
