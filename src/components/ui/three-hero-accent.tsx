'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function FloatingIcon({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const iconColor = theme === 'dark' ? '#6366f1' : '#4f46e5';

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial
          color={iconColor}
          transparent
          opacity={0.15}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </Float>
  );
}

function DevSymbol({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const symbolColor = theme === 'dark' ? '#8b5cf6' : '#7c3aed';

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        {/* Brackets < > */}
        <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.1, 1, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>
        <mesh position={[-0.6, -0.3, 0]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>

        <mesh position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.1, 1, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>
        <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>
        <mesh position={[0.6, -0.3, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial color={symbolColor} transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function AccentScene() {
  return (
    <>
      {/* Soft lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      {/* Floating development symbols */}
      <FloatingIcon position={[-3, 2, -2]} />
      <FloatingIcon position={[4, -1, -3]} rotation={[0, Math.PI / 4, 0]} />
      <FloatingIcon position={[-2, -3, -4]} rotation={[Math.PI / 6, 0, 0]} />
      <FloatingIcon position={[3, 3, -5]} rotation={[0, 0, Math.PI / 3]} />

      {/* Developer symbol */}
      <DevSymbol position={[5, 0, -6]} />
    </>
  );
}

export function ThreeHeroAccent() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <AccentScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
