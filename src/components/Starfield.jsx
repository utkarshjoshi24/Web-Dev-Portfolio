import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Starfield({ scrollProgress }) {
  const distantRef = useRef();
  const foregroundRef = useRef();

  const distantCount = 3000;
  const foregroundCount = 800;

  // 1. Distant stars: static background sphere/box
  const distantPositions = useMemo(() => {
    const pos = new Float32Array(distantCount * 3);
    for (let i = 0; i < distantCount; i++) {
      // Distant stars are far away (radius 60 to 100)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 60 + Math.random() * 40;

      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = dist * Math.cos(phi);
    }
    return pos;
  }, []);

  // 2. Foreground stars: distributed along the camera path corridor (Z: 35 to -35)
  const [fgPositions, fgSizes, fgColors] = useMemo(() => {
    const pos = new Float32Array(foregroundCount * 3);
    const sizes = new Float32Array(foregroundCount);
    const colors = new Float32Array(foregroundCount * 3);

    // Deep space palettes
    const palette = [
      new THREE.Color('#aec6ff'), // primary cyan-blue
      new THREE.Color('#dbb8ff'), // secondary purple
      new THREE.Color('#00ddd6'), // tertiary cyan
      new THREE.Color('#ffffff'), // pure white
      new THREE.Color('#ffe6c2'), // warm yellow/white
    ];

    for (let i = 0; i < foregroundCount; i++) {
      // Spread in a corridor along the Z axis
      pos[i * 3] = (Math.random() - 0.5) * 45;       // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;   // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 90;   // Z (covers camera path from 35 to -35)

      // Random sizes
      sizes[i] = Math.random() * 0.12 + 0.03;

      // Random space color
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [pos, sizes, colors];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Distant background stars drift very slowly
    if (distantRef.current) {
      distantRef.current.rotation.y = t * 0.002;
      distantRef.current.rotation.x = Math.sin(t * 0.001) * 0.02;
    }

    // Foreground stars drift and twinkle slightly
    if (foregroundRef.current) {
      foregroundRef.current.rotation.y = -t * 0.005;
      
      // Twinkle effect by modulating the points size/opacity
      const material = foregroundRef.current.material;
      if (material) {
        material.opacity = 0.5 + Math.sin(t * 1.5) * 0.25;
      }
    }
  });

  return (
    <group>
      {/* Distant Static Stars */}
      <points ref={distantRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={distantPositions}
            count={distantCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#ffffff"
          transparent
          opacity={0.7}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* Foreground Parallax Stars */}
      <points ref={foregroundRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={fgPositions}
            count={foregroundCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={fgColors}
            count={foregroundCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
