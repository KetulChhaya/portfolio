'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';

const PARTICLE_COUNT = 420; // was 1000 — invisible difference on a phone, ~2.4x cheaper

const COLORS = {
  light: new THREE.Color('#7c3aed'),
  dark: new THREE.Color('#a855f7'),
};

function damp(lambda: number, delta: number) {
  return 1 - Math.exp(-lambda * delta);
}

function ParticleField({
  modeRef,
  reduceMotion,
}: {
  modeRef: React.RefObject<'light' | 'dark'>;
  reduceMotion: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    // Crossfade the colour on theme change instead of remounting the canvas.
    if (matRef.current)
      matRef.current.color.lerp(COLORS[modeRef.current], damp(4, dt));
    if (reduceMotion || !ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={matRef}
        transparent
        color={COLORS[modeRef.current]}
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </points>
  );
}

function GridMesh({
  modeRef,
  reduceMotion,
}: {
  modeRef: React.RefObject<'light' | 'dark'>;
  reduceMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    if (matRef.current)
      matRef.current.color.lerp(COLORS[modeRef.current], damp(4, dt));
    if (reduceMotion || !meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} rotation={[Math.PI / 4, 0, 0]}>
      {/* 12x12 segments instead of 20x20 — same read, fewer lines to raster. */}
      <planeGeometry args={[20, 20, 12, 12]} />
      <meshBasicMaterial
        ref={matRef}
        color={COLORS[modeRef.current]}
        transparent
        opacity={0.05}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}

const BG_CAMERA = { position: [0, 0, 10] as [number, number, number], fov: 60 };
const BG_GL = {
  antialias: false,
  alpha: true,
  powerPreference: 'low-power' as const,
};
const BG_DPR: [number, number] = [1, 1.25];

/** Memoised for the same reason as the hero canvas: keep theme changes from
 *  re-rendering the Canvas and forcing an r3f reconcile. */
const BackgroundCanvas = memo(function BackgroundCanvas({
  modeRef,
  reduceMotion,
  active,
}: {
  modeRef: React.RefObject<'light' | 'dark'>;
  reduceMotion: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      camera={BG_CAMERA}
      gl={BG_GL}
      dpr={BG_DPR}
      frameloop={active ? 'always' : 'never'}
    >
      <Suspense fallback={null}>
        <ParticleField modeRef={modeRef} reduceMotion={reduceMotion} />
        <GridMesh modeRef={modeRef} reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
});

export function ThreeBackground() {
  const { resolvedTheme, theme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const mode: 'light' | 'dark' =
    (resolvedTheme || theme) === 'dark' ? 'dark' : 'light';

  const modeRef = useRef<'light' | 'dark'>(mode);
  modeRef.current = mode;

  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <BackgroundCanvas
        modeRef={modeRef}
        reduceMotion={reduceMotion}
        active={active}
      />
    </div>
  );
}
