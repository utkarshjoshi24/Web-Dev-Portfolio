import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS_HEX } from '../utils/constants';

function GlassPanel({ position, rotation = [0, 0, 0], scale = [4, 2.5, 0.05], color = COLORS_HEX.primaryContainer, opacity = 0.12 }) {
  const meshRef = useRef();
  const edgeRef = useRef();
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = initialPos.y + Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Glass body */}
      <mesh>
        <boxGeometry args={scale} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.05}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
          ior={1.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Glowing edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...scale)]} />
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

export default function FloatingPanels({ scrollProgress }) {
  const groupRef = useRef();

  const panels = useMemo(() => [
    // Hero area - large centerpiece
    { position: [0, 0, 24], rotation: [0, 0, 0], scale: [6, 3.5, 0.03], color: COLORS_HEX.primaryContainer, opacity: 0.08 },

    // About area panels
    { position: [4, 1, 9], rotation: [0, -0.3, 0], scale: [3, 2, 0.03], color: COLORS_HEX.primaryContainer, opacity: 0.1 },
    { position: [-4, -0.5, 7], rotation: [0, 0.25, 0.05], scale: [2.5, 3, 0.03], color: COLORS_HEX.secondaryContainer, opacity: 0.08 },

    // Skills area panels
    { position: [-4, 1, -3], rotation: [0, 0.2, 0], scale: [2.8, 2, 0.03], color: COLORS_HEX.primaryContainer, opacity: 0.1 },
    { position: [0, 0, -5], rotation: [0, 0, 0], scale: [2.8, 2, 0.03], color: COLORS_HEX.secondaryContainer, opacity: 0.1 },
    { position: [4, -0.5, -4], rotation: [0, -0.2, 0], scale: [2.8, 2, 0.03], color: COLORS_HEX.tertiary, opacity: 0.1 },

    // Projects area - larger panels
    { position: [-3, 0.5, -15], rotation: [0, 0.15, 0], scale: [3.5, 2.5, 0.03], color: COLORS_HEX.primaryContainer, opacity: 0.08 },
    { position: [3, -0.5, -17], rotation: [0, -0.15, 0], scale: [3.5, 2.5, 0.03], color: COLORS_HEX.secondaryContainer, opacity: 0.08 },

    // Contact area - single elegant panel
    { position: [0, 0, -28], rotation: [0, 0, 0], scale: [5, 3, 0.03], color: COLORS_HEX.primaryContainer, opacity: 0.1 },
  ], []);

  return (
    <group ref={groupRef}>
      {panels.map((panel, i) => (
        <GlassPanel key={i} {...panel} />
      ))}
    </group>
  );
}
