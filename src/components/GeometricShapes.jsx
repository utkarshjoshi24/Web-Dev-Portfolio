import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS_HEX } from '../utils/constants';

function FloatingShape({ geometry, position, rotation, scale, color, speed = 1, mouseX = 0, mouseY = 0 }) {
  const meshRef = useRef();
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle rotation
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.005 * speed;

    // Floating bob
    meshRef.current.position.y = initialPos.y + Math.sin(t * 0.5 * speed) * 0.3;
    meshRef.current.position.x = initialPos.x + Math.cos(t * 0.3 * speed) * 0.15;

    // Subtle mouse reactivity
    meshRef.current.rotation.z += (mouseX - 0.5) * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.3, 8, 16]} />}
      {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
      <meshPhysicalMaterial
        color={color}
        wireframe
        transparent
        opacity={0.35}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

export default function GeometricShapes({ scrollProgress, mouseX = 0.5, mouseY = 0.5 }) {
  const shapes = useMemo(() => [
    // Hero area shapes
    { geometry: 'icosahedron', position: [5, 3, 20], rotation: [0.5, 0.3, 0], scale: 0.8, color: COLORS_HEX.primaryContainer, speed: 0.8 },
    { geometry: 'octahedron', position: [-6, -2, 22], rotation: [1, 0.5, 0], scale: 0.6, color: COLORS_HEX.secondaryContainer, speed: 1.2 },
    { geometry: 'torus', position: [3, -4, 18], rotation: [0.2, 1.5, 0], scale: 0.5, color: COLORS_HEX.tertiary, speed: 0.6 },

    // About area shapes
    { geometry: 'torusKnot', position: [-8, 2, 8], rotation: [0, 0.5, 0.3], scale: 0.4, color: COLORS_HEX.primaryContainer, speed: 0.7 },
    { geometry: 'dodecahedron', position: [7, -1, 6], rotation: [1.2, 0, 0.5], scale: 0.55, color: COLORS_HEX.secondaryContainer, speed: 1 },

    // Skills area shapes
    { geometry: 'icosahedron', position: [-5, 3, -3], rotation: [0.8, 1, 0], scale: 0.7, color: COLORS_HEX.tertiary, speed: 0.9 },
    { geometry: 'torus', position: [6, -3, -5], rotation: [0.5, 0.5, 1], scale: 0.45, color: COLORS_HEX.primaryContainer, speed: 1.1 },
    { geometry: 'octahedron', position: [0, 4, -8], rotation: [0, 1.5, 0.3], scale: 0.5, color: COLORS_HEX.particle, speed: 0.5 },

    // Projects area
    { geometry: 'torusKnot', position: [5, 2, -16], rotation: [0.3, 0.8, 0], scale: 0.5, color: COLORS_HEX.secondaryContainer, speed: 0.8 },
    { geometry: 'dodecahedron', position: [-7, -2, -18], rotation: [1, 0, 0.5], scale: 0.6, color: COLORS_HEX.tertiary, speed: 1.3 },

    // Contact area
    { geometry: 'icosahedron', position: [4, -1, -28], rotation: [0.5, 1.2, 0], scale: 0.5, color: COLORS_HEX.primaryContainer, speed: 0.6 },
    { geometry: 'torus', position: [-5, 3, -30], rotation: [1, 0.5, 0.8], scale: 0.4, color: COLORS_HEX.secondaryContainer, speed: 1 },
  ], []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </group>
  );
}
