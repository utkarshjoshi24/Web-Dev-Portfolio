import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS_HEX } from '../utils/constants';

export default function ParticleField({ scrollProgress }) {
  const meshRef = useRef();
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 2500;

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const colorPrimary = new THREE.Color(COLORS_HEX.primaryContainer);
    const colorSecondary = new THREE.Color(COLORS_HEX.secondaryContainer);
    const colorTertiary = new THREE.Color(COLORS_HEX.tertiary);
    const colorParticle = new THREE.Color(COLORS_HEX.particle);
    const colorsArr = [colorPrimary, colorSecondary, colorTertiary, colorParticle];

    for (let i = 0; i < count; i++) {
      // Spread particles along a long corridor z: 40 to -40
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      sz[i] = Math.random() * 0.06 + 0.01;

      const c = colorsArr[Math.floor(Math.random() * colorsArr.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, sz, col];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.015;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
