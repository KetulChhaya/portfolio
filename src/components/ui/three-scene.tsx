'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { ThreeFallback } from './three-fallback';

function BigFloatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (torusRef.current) {
      // Spin like a wheel on its own axis
      torusRef.current.rotation.y = 0;

      // Keep X and Z rotations fixed
      torusRef.current.rotation.x = Math.PI; // Fixed rotation
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.05; // Reduced speed
    }
  });

  const torusColor = theme === 'dark' ? '#a855f7' : '#4f46e5'; // Purple in dark mode
  const torusOpacity = theme === 'dark' ? 0.5 : 0.25;
  const emissiveColor = theme === 'dark' ? '#ffffff' : torusColor; // White emissive in dark mode

  return (
    <mesh
      ref={torusRef}
      position={[-3.25, 0, -2]}
      rotation={[Math.PI, 0, Math.PI]} // Fixed rotation
    >
      <torusGeometry args={[5.0, 1.5, 16, 32]} />
      <meshStandardMaterial
        color={torusColor}
        transparent
        opacity={torusOpacity}
        wireframe
        roughness={theme === 'light' ? 0.2 : 0.1}
        metalness={theme === 'light' ? 0.3 : 0.6}
        emissive={emissiveColor}
        emissiveIntensity={theme === 'light' ? 0.05 : 0.15}
      />
    </mesh>
  );
}

function Scene() {
  const { theme } = useTheme();

  return (
    <>
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={theme === 'dark' ? 0.6 : 0.9} />
      <pointLight
        position={[10, 10, 10]}
        intensity={theme === 'light' ? 0.4 : 0.8}
      />
      <pointLight
        position={[-10, -5, 5]}
        intensity={theme === 'light' ? 0.3 : 0.6}
      />
      <pointLight
        position={[0, 0, 10]}
        intensity={theme === 'light' ? 0.2 : 0.5}
      />

      {/* Main big floating torus */}
      <BigFloatingTorus />
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = '' }: ThreeSceneProps) {
  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        fallback={<ThreeFallback />}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
