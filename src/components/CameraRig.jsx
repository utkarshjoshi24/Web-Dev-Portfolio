import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_PATH, SECTIONS } from '../utils/constants';

// Smooth interpolation helpers
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function CameraRig({ scrollProgress, mouseX = 0.5, mouseY = 0.5 }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 28));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Refs to store the latest values of props to prevent stale closure inside useFrame
  const scrollProgressRef = useRef(0);
  const mouseXRef = useRef(0.5);
  const mouseYRef = useRef(0.5);

  // Update refs on every render
  scrollProgressRef.current = scrollProgress;
  mouseXRef.current = mouseX;
  mouseYRef.current = mouseY;

  useFrame((state) => {
    const p = scrollProgressRef.current;
    const mX = mouseXRef.current;
    const mY = mouseYRef.current;

    // Dynamically find current segment and interpolate along the Z-corridor
    let segmentIndex = 0;
    for (let i = 0; i < SECTIONS.length - 1; i++) {
      const rangeStart = SECTIONS[i].range[0];
      const rangeEnd = SECTIONS[i + 1].range[0];
      if (p >= rangeStart && p <= rangeEnd) {
        segmentIndex = i;
        break;
      }
    }
    // Cap segment index at length - 2 if we are at/past final range start
    if (p >= SECTIONS[SECTIONS.length - 1].range[0]) {
      segmentIndex = SECTIONS.length - 2;
    }

    const startSec = SECTIONS[segmentIndex];
    const endSec = SECTIONS[segmentIndex + 1];
    const t = smoothstep(startSec.range[0], endSec.range[0], p);

    const startPos = CAMERA_PATH[segmentIndex].position;
    const endPos = CAMERA_PATH[segmentIndex + 1].position;
    const startLook = CAMERA_PATH[segmentIndex].lookAt;
    const endLook = CAMERA_PATH[segmentIndex + 1].lookAt;

    const pos = [
      lerp(startPos[0], endPos[0], t),
      lerp(startPos[1], endPos[1], t),
      lerp(startPos[2], endPos[2], t),
    ];
    const look = [
      lerp(startLook[0], endLook[0], t),
      lerp(startLook[1], endLook[1], t),
      lerp(startLook[2], endLook[2], t),
    ];

    // Subtle mouse parallax
    const mouseOffsetX = (mX - 0.5) * 0.8;
    const mouseOffsetY = (mY - 0.5) * -0.5;

    // Zero-gravity slow drift (cinematic crane camera simulation)
    const time = state.clock.getElapsedTime();
    const driftX = Math.sin(time * 0.4) * 0.15;
    const driftY = Math.cos(time * 0.3) * 0.12;
    const driftZ = Math.sin(time * 0.2) * 0.10;

    // Smooth movement with lerp (low factor for luxurious physical momentum)
    targetPos.current.set(
      pos[0] + mouseOffsetX + driftX,
      pos[1] + mouseOffsetY + driftY,
      pos[2] + driftZ
    );
    targetLookAt.current.set(look[0], look[1], look[2]);

    // Apply translation with low lerp factor (0.02)
    camera.position.lerp(targetPos.current, 0.02);

    // Apply looking direction with low lerp factor (0.02)
    currentLookAt.current.lerp(targetLookAt.current, 0.02);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
