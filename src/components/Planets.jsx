import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function Atmosphere({ radius, color }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.15, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function SaturnRings({ radius, ringTexture }) {
  const ringsRef = useRef();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={ringsRef} rotation={[1.2, 0.4, 0]}>
      <mesh>
        <ringGeometry args={[radius * 1.3, radius * 2.3, 64]} />
        <meshStandardMaterial
          map={ringTexture}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

function UranusRings({ radius, color }) {
  const ringsRef = useRef();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.getElapsedTime() * -0.02;
    }
  });

  // Uranus is tilted almost 90 degrees, so its rings are nearly vertical
  return (
    <group ref={ringsRef} rotation={[0.2, 1.4, 0]}>
      <mesh>
        <ringGeometry args={[radius * 1.4, radius * 2.0, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Planets({ scrollProgress }) {
  // Rotate planets references
  const p1Ref = useRef(); // Earth
  const p2Ref = useRef(); // Mars
  const p3Ref = useRef(); // Jupiter
  const p4Ref = useRef(); // Saturn
  const p5Ref = useRef(); // Uranus
  const p6Ref = useRef(); // Neptune
  const p7Ref = useRef(); // Moon

  // jsDelivr texture CDN paths (threex.planets curated from PlanetPixelEmporium)
  const [
    earthMap, earthBump,
    marsMap, marsBump,
    jupiterMap,
    saturnMap, saturnRing,
    uranusMap,
    neptuneMap,
    moonMap, moonBump
  ] = useLoader(THREE.TextureLoader, [
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/earthmap1k.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/earthbump1k.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/marsmap1k.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/marsbump1k.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/jupitermap.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/saturnmap.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/saturnringpattern.gif',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/uranusmap.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/neptunemap.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/moonmap1k.jpg',
    'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/moonbump1k.jpg',
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate planets at varying speeds
    if (p1Ref.current) p1Ref.current.rotation.y = t * 0.05;
    if (p2Ref.current) p2Ref.current.rotation.y = t * 0.04;
    if (p3Ref.current) p3Ref.current.rotation.y = t * 0.08; // Jupiter spins very fast
    if (p4Ref.current) p4Ref.current.rotation.y = t * 0.03;
    if (p5Ref.current) p5Ref.current.rotation.y = -t * 0.025; // Uranus tilts backward
    if (p6Ref.current) p6Ref.current.rotation.y = t * 0.02;
    if (p7Ref.current) p7Ref.current.rotation.y = t * 0.01;
  });

  return (
    <group>
      {/* 1. EARTH (Hero - Violet/Blue Atmosphere) */}
      <group position={[-6, -1, 10]}>
        <mesh ref={p1Ref}>
          <sphereGeometry args={[3.0, 32, 32]} />
          <meshStandardMaterial
            map={earthMap}
            bumpMap={earthBump}
            bumpScale={0.06}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        <Atmosphere radius={3.0} color="#0099ff" />
      </group>

      {/* 2. MARS (About - Orange Red) */}
      <group position={[6, -1.5, 3]}>
        <mesh ref={p2Ref}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshStandardMaterial
            map={marsMap}
            bumpMap={marsBump}
            bumpScale={0.05}
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
        <Atmosphere radius={2.2} color="#ff3300" />
      </group>

      {/* 3. JUPITER (Skills - Striped Gas Giant) */}
      <group position={[-6.5, 2.0, -5]}>
        <mesh ref={p3Ref}>
          <sphereGeometry args={[3.6, 32, 32]} />
          <meshStandardMaterial
            map={jupiterMap}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        <Atmosphere radius={3.6} color="#dfa655" />
      </group>

      {/* 4. SATURN (Experience - Ringed Lord) */}
      <group position={[6.0, -1.8, -13]}>
        <mesh ref={p4Ref}>
          <sphereGeometry args={[2.4, 32, 32]} />
          <meshStandardMaterial
            map={saturnMap}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        <SaturnRings radius={2.4} ringTexture={saturnRing} />
        <Atmosphere radius={2.4} color="#dfcaaa" />
      </group>

      {/* 5. URANUS (Projects - Tilted Pale Cyan) */}
      <group position={[-5.5, 1.5, -20]}>
        <mesh ref={p5Ref}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshStandardMaterial
            map={uranusMap}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        <UranusRings radius={2.2} color="#8bfbff" />
        <Atmosphere radius={2.2} color="#8bfbff" />
      </group>

      {/* 6. NEPTUNE (Services - Deep Azure Winds) */}
      <group position={[5.5, -1.5, -28]}>
        <mesh ref={p6Ref}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshStandardMaterial
            map={neptuneMap}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        <Atmosphere radius={2.2} color="#2b55ff" />
      </group>

      {/* 7. MOON (Contact - Rugged Surface) */}
      <group position={[0, -2.5, -37]}>
        <mesh ref={p7Ref}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial
            map={moonMap}
            bumpMap={moonBump}
            bumpScale={0.06}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        <Atmosphere radius={1.8} color="#8b90a0" />
      </group>
    </group>
  );
}
