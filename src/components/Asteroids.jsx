import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Asteroid({ position, scale, speed, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Slow drift & tumble
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];

    // Subtle floating displacement
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4 * speed) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#3a3835"
        roughness={0.95}
        metalness={0.05}
        bumpScale={0.05}
      />
    </mesh>
  );
}

export default function Asteroids() {
  const asteroidCount = 50;

  const asteroidsData = useMemo(() => {
    const data = [];

    // 1. Generate background/midground scattered asteroids
    for (let i = 0; i < asteroidCount; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = (4 + Math.random() * 14) * side;
      const y = (Math.random() - 0.5) * 12;
      // Distribute from Z = 30 to Z = -45
      const z = 30 - Math.random() * 75;

      const scaleX = 0.2 + Math.random() * 0.5;
      const scaleY = 0.2 + Math.random() * 0.5;
      const scaleZ = 0.2 + Math.random() * 0.5;
      const scale = [scaleX, scaleY, scaleZ];

      const speed = 0.5 + Math.random() * 1.5;
      const rotationSpeed = [
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005,
      ];

      data.push({
        position: [x, y, z],
        scale,
        speed,
        rotationSpeed,
      });
    }

    // 2. Explicitly inject near-field fly-by asteroids (extremely close to camera path)
    // Camera path travels: [0, 2, 28] -> [5, 1, 18] -> [-4, 0.5, 8] -> [4, 1, -2] -> [-3, 0.5, -12] -> [3, 1, -24] -> [0, -0.5, -32]
    const nearFieldAsteroids = [
      { position: [1.2, 1.6, 24], scale: [0.15, 0.22, 0.18] },
      { position: [2.5, 0.8, 14], scale: [0.22, 0.18, 0.25] },
      { position: [-1.2, 0.4, 4], scale: [0.18, 0.24, 0.20] },
      { position: [1.0, 0.8, -6], scale: [0.20, 0.20, 0.20] },
      { position: [-1.0, 0.6, -18], scale: [0.18, 0.22, 0.16] },
      { position: [0.5, -1.2, -34], scale: [0.15, 0.15, 0.18] },
    ];

    nearFieldAsteroids.forEach((ast) => {
      data.push({
        position: ast.position,
        scale: ast.scale,
        speed: 0.8 + Math.random() * 0.8,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.012,
        ],
      });
    });

    return data;
  }, []);

  return (
    <group>
      {asteroidsData.map((asteroid, i) => (
        <Asteroid key={i} {...asteroid} />
      ))}
    </group>
  );
}
