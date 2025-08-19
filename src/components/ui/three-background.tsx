'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { theme, resolvedTheme } = useTheme();
  const mode = resolvedTheme || theme || 'light';

  // Generate random particle positions
  const [positions] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      // Spread particles in a large area
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }

    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const baseColor = mode === 'dark' ? '#a855f7' : '#7c3aed';
  const particleColor = baseColor;

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

function GridMesh() {
  const { theme, resolvedTheme } = useTheme();
  const mode = resolvedTheme || theme || 'light';
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  const baseColor = mode === 'dark' ? '#a855f7' : '#7c3aed';
  const gridColor = baseColor;

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} rotation={[Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial
        color={gridColor}
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
}

export function ThreeBackground() {
  const { resolvedTheme, theme } = useTheme();
  const themeKey = resolvedTheme || theme || 'light';
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        key={themeKey}
        camera={{
          position: [0, 0, 10],
          fov: 60,
        }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]} // Lower DPR for better performance
      >
        <Suspense fallback={null}>
          <ParticleField />
          <GridMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
