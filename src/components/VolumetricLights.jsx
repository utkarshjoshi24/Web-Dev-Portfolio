import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS_HEX } from '../utils/constants';

function LightBeam({ position, rotation = [0, 0, 0], color, height = 15, radius = 1.5, opacity = 0.04 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.material.opacity = opacity + Math.sin(t * 0.5) * 0.015;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <coneGeometry args={[radius, height, 16, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function VolumetricLights({ scrollProgress }) {
  const beams = useMemo(() => [
    // Hero area beams
    { position: [0, 10, 25], rotation: [0, 0, 0], color: COLORS_HEX.primaryContainer, height: 20, radius: 3, opacity: 0.03 },
    { position: [8, 12, 20], rotation: [0, 0, 0.3], color: COLORS_HEX.secondaryContainer, height: 18, radius: 2, opacity: 0.025 },
    { position: [-7, 11, 22], rotation: [0, 0, -0.2], color: COLORS_HEX.tertiary, height: 16, radius: 2, opacity: 0.02 },

    // Mid section beams
    { position: [5, 10, 5], rotation: [0, 0, 0.15], color: COLORS_HEX.secondaryContainer, height: 18, radius: 2.5, opacity: 0.025 },
    { position: [-6, 12, -5], rotation: [0, 0, -0.1], color: COLORS_HEX.primaryContainer, height: 20, radius: 2, opacity: 0.02 },

    // Deep area beams
    { position: [0, 10, -15], rotation: [0, 0, 0], color: COLORS_HEX.tertiary, height: 18, radius: 3, opacity: 0.025 },
    { position: [-5, 11, -25], rotation: [0, 0, -0.2], color: COLORS_HEX.primaryContainer, height: 16, radius: 2, opacity: 0.03 },
    { position: [4, 12, -30], rotation: [0, 0, 0.15], color: COLORS_HEX.secondaryContainer, height: 14, radius: 2, opacity: 0.02 },
  ], []);

  return (
    <group>
      {beams.map((beam, i) => (
        <LightBeam key={i} {...beam} />
      ))}
    </group>
  );
}
