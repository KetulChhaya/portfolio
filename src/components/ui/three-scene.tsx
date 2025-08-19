'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { ThreeFallback } from './three-fallback';

function BigFloatingTorus({ mode }: { mode: string }) {
  const torusRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (torusRef.current) {
      // Spin like a wheel on its own axis
      torusRef.current.rotation.y = 0;

      // Keep X and Z rotations fixed
      torusRef.current.rotation.x = Math.PI; // Fixed rotation
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.05; // Reduced speed
    }
  });

  const torusColor = mode === 'dark' ? '#f5f0f2' : '#f5f0f2'; // Higher-contrast violet in light mode
  const torusOpacity = mode === 'dark' ? 0.5 : 0.5;
  const emissiveColor = '#ffffff';

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }
  }, [mode]);

  return (
    <mesh
      key={`torus-${mode}`}
      ref={torusRef}
      position={[-3.25, 0, -2]}
      rotation={[Math.PI, Math.PI, Math.PI]} // Fixed rotation
    >
      <torusGeometry args={[5.0, 1.5, 16, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color={torusColor}
        transparent
        opacity={torusOpacity}
        wireframe
        roughness={mode === 'light' ? 0.2 : 0.1}
        metalness={mode === 'light' ? 0.3 : 0.6}
        emissive={emissiveColor}
        emissiveIntensity={mode === 'light' ? 0.03 : 0.15}
      />
    </mesh>
  );
}

function Scene({ mode }: { mode: string }) {

  return (
    <>
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={mode === 'dark' ? 0.6 : 0.9} />
      <pointLight
        position={[10, 10, 10]}
        intensity={mode === 'light' ? 0.4 : 0.8}
      />
      <pointLight
        position={[-10, -5, 5]}
        intensity={mode === 'light' ? 0.3 : 0.6}
      />
      <pointLight
        position={[0, 0, 10]}
        intensity={mode === 'light' ? 0.2 : 0.5}
      />

      {/* Main big floating torus */}
      <BigFloatingTorus mode={mode} />
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = '' }: ThreeSceneProps) {
  const { resolvedTheme, theme } = useTheme();
  const themeKey = resolvedTheme || theme || 'light';
  const mode = themeKey;
  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <Canvas
        key={themeKey}
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
          <Scene key={`scene-${mode}`} mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
