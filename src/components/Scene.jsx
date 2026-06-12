import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS_HEX } from '../utils/constants';
import Starfield from './Starfield';
import Planets from './Planets';
import Asteroids from './Asteroids';
import CameraRig from './CameraRig';
import PostEffects from './PostEffects';

export default function Scene({ scrollProgress, mouseX, mouseY, onLoad }) {
  const pointLight1Ref = useRef();
  const pointLight2Ref = useRef();
  const pointLight3Ref = useRef();

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // Animate lights based on time to add dynamic space glow
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = Math.sin(t * 0.3) * 8;
      pointLight1Ref.current.position.y = Math.cos(t * 0.2) * 4 + 3;
    }
    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.cos(t * 0.25) * 6;
      pointLight2Ref.current.position.z = Math.sin(t * 0.15) * 10 - 10;
    }
    if (pointLight3Ref.current) {
      pointLight3Ref.current.position.z = Math.cos(t * 0.2) * 8 - 20;
      pointLight3Ref.current.position.y = Math.sin(t * 0.3) * 3;
    }
  });

  return (
    <>
      {/* Camera choreography */}
      <CameraRig scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.05} color="#aec6ff" />

      {/* Soft color washes representing local nebula glow (blue, purple, cyan) */}
      <pointLight
        ref={pointLight1Ref}
        position={[5, 5, 15]}
        intensity={2}
        color={COLORS_HEX.primaryContainer}
        distance={40}
        decay={2}
      />
      <pointLight
        ref={pointLight2Ref}
        position={[-5, 3, 0]}
        intensity={1.5}
        color={COLORS_HEX.secondaryContainer}
        distance={35}
        decay={2}
      />
      <pointLight
        ref={pointLight3Ref}
        position={[0, -2, -20]}
        intensity={2.0}
        color={COLORS_HEX.tertiary}
        distance={35}
        decay={2}
      />

      {/* Directional space sun light positioned to create high-contrast crescent shadows */}
      <directionalLight
        position={[-30, 15, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Pure black fog for space depth */}
      <fog attach="fog" args={[0x000000, 20, 65]} />

      {/* Cosmic 3D Components */}
      <Starfield scrollProgress={scrollProgress} />
      <Planets scrollProgress={scrollProgress} />
      <Asteroids />

      {/* Post-processing effects */}
      <PostEffects />
    </>
  );
}
