'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { useReducedMotion } from 'framer-motion';
import { ThreeFallback } from './three-fallback';

/** Frame-rate independent lerp factor. */
function damp(lambda: number, delta: number) {
  return 1 - Math.exp(-lambda * delta);
}

const CAMERA_Z_START = 11;
const CAMERA_Z_END = 8;

interface ThemePalette {
  color: THREE.Color;
  opacity: number;
  emissive: number;
  roughness: number;
  metalness: number;
}

const PALETTES: Record<'light' | 'dark', ThemePalette> = {
  light: {
    color: new THREE.Color('#8b8790'),
    opacity: 0.3,
    emissive: 0.03,
    roughness: 0.2,
    metalness: 0.3,
  },
  dark: {
    color: new THREE.Color('#f5f0f2'),
    opacity: 0.32,
    emissive: 0.18,
    roughness: 0.1,
    metalness: 0.6,
  },
};

interface TorusProps {
  mode: 'light' | 'dark';
  /** Normalised pointer position, -1..1 on both axes. Mutated by the parent. */
  pointer: React.RefObject<{ x: number; y: number }>;
  /** 0 at the top of the hero, 1 once the hero is fully scrolled past. */
  scrollProgress: React.RefObject<number>;
  reduceMotion: boolean;
}

function FloatingTorus({
  mode,
  pointer,
  scrollProgress,
  reduceMotion,
}: TorusProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerMat = useRef<THREE.MeshStandardMaterial>(null);
  const innerMat = useRef<THREE.MeshBasicMaterial>(null);
  // 0 -> 1 over the opening dolly-in.
  const intro = useRef(0);

  // Live values we ease toward, so a theme switch crossfades instead of
  // remounting the canvas (which used to cause a visible flash).
  const current = useRef({
    opacity: PALETTES[mode].opacity,
    emissive: PALETTES[mode].emissive,
    roughness: PALETTES[mode].roughness,
    metalness: PALETTES[mode].metalness,
  });

  useFrame((state, delta) => {
    // Clamp delta so a backgrounded tab doesn't produce one giant jump.
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;

    // --- Camera dolly-in ----------------------------------------------------
    // Driven from a ref rather than an effect + `useThree`: the Canvas `camera`
    // prop is an object literal, so it is re-applied on every re-render and
    // would stomp any camera position written from an effect.
    if (reduceMotion) {
      state.camera.position.z = CAMERA_Z_END;
    } else if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + dt / 1.5);
      const eased = 1 - Math.pow(1 - intro.current, 3);
      state.camera.position.z =
        CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * eased;
    } else {
      state.camera.position.z = CAMERA_Z_END;
    }
    const target = PALETTES[mode];
    const group = groupRef.current;

    // --- Material crossfade -------------------------------------------------
    if (outerMat.current) {
      const mat = outerMat.current;
      const k = damp(4, dt);
      mat.color.lerp(target.color, k);
      current.current.opacity +=
        (target.opacity - current.current.opacity) * k;
      current.current.emissive +=
        (target.emissive - current.current.emissive) * k;
      current.current.roughness +=
        (target.roughness - current.current.roughness) * k;
      current.current.metalness +=
        (target.metalness - current.current.metalness) * k;
      mat.opacity = current.current.opacity;
      mat.emissiveIntensity = current.current.emissive;
      mat.roughness = current.current.roughness;
      mat.metalness = current.current.metalness;
    }
    if (innerMat.current) {
      innerMat.current.color.lerp(target.color, damp(4, dt));
    }

    if (!group) return;

    const scroll = scrollProgress.current ?? 0;

    if (reduceMotion) {
      // Static, centred, no drift — but keep the scroll fade so the hero still
      // hands off cleanly to the next section.
      group.rotation.set(Math.PI, 0, 0);
      group.position.set(-3.25, 0, -2);
      if (outerMat.current) {
        outerMat.current.opacity = current.current.opacity * (1 - scroll);
      }
      if (innerMat.current) innerMat.current.opacity = 0.12 * (1 - scroll);
      return;
    }

    // --- Pointer parallax ---------------------------------------------------
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    const k = damp(2.5, dt);

    // Base pose + a gentle wobble, tilted toward the cursor.
    const targetX = Math.PI + Math.sin(t * 0.25) * 0.08 + py * 0.22;
    const targetY = Math.sin(t * 0.18) * 0.12 + px * 0.3;

    group.rotation.x += (targetX - group.rotation.x) * k;
    group.rotation.y += (targetY - group.rotation.y) * k;

    // The wheel spin, slowed as the hero scrolls away.
    group.rotation.z = t * 0.05 + scroll * 0.6;

    // --- Float + scroll drift ----------------------------------------------
    const bobY = Math.sin(t * 0.4) * 0.22;
    const targetPos = {
      x: -3.25 + px * 0.35,
      y: bobY - py * 0.25 + scroll * 1.5,
      z: -2 - scroll * 3,
    };
    group.position.x += (targetPos.x - group.position.x) * k;
    group.position.y += (targetPos.y - group.position.y) * k;
    group.position.z += (targetPos.z - group.position.z) * k;

    // Fade out as the hero leaves, so the torus never fights the next section.
    const fade = 1 - scroll;
    if (outerMat.current) {
      outerMat.current.opacity = current.current.opacity * fade;
    }
    if (innerMat.current) {
      innerMat.current.opacity = 0.12 * fade;
    }

    // Counter-rotating inner ring for depth.
    if (innerRef.current) {
      innerRef.current.rotation.z = -t * 0.09;
      innerRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (outerRef.current) {
      const breathe = 1 + Math.sin(t * 0.35) * 0.012;
      outerRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef} position={[-3.25, 0, -2]} rotation={[Math.PI, 0, 0]}>
      <mesh ref={outerRef}>
        {/* Sparser than before (was 16x32). A wireframe torus triangulates into
            ~3 lines per quad, so raising the segment count turns it into visual
            noise behind the hero copy — fewer, longer lines read as a cleaner
            ring and cost less fill. */}
        <torusGeometry args={[5.0, 1.4, 10, 40]} />
        <meshStandardMaterial
          ref={outerMat}
          color={PALETTES[mode].color}
          transparent
          opacity={PALETTES[mode].opacity}
          wireframe
          roughness={PALETTES[mode].roughness}
          metalness={PALETTES[mode].metalness}
          emissive="#ffffff"
          emissiveIntensity={PALETTES[mode].emissive}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRef}>
        <torusGeometry args={[3.1, 0.16, 5, 44]} />
        <meshBasicMaterial
          ref={innerMat}
          color={PALETTES[mode].color}
          transparent
          opacity={0.12}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene({
  mode,
  pointer,
  scrollProgress,
  reduceMotion,
}: TorusProps) {
  return (
    <>
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

      <FloatingTorus
        mode={mode}
        pointer={pointer}
        scrollProgress={scrollProgress}
        reduceMotion={reduceMotion}
      />
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = '' }: ThreeSceneProps) {
  const { resolvedTheme, theme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const mode: 'light' | 'dark' =
    (resolvedTheme || theme) === 'dark' ? 'dark' : 'light';

  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [active, setActive] = useState(true);

  // Pointer parallax is driven from the window, not the canvas: the hero copy
  // sits above the canvas and would otherwise swallow every pointer event.
  useEffect(() => {
    if (reduceMotion) return;
    const onPointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [reduceMotion]);

  // Scroll progress through the hero, written to a ref so scrolling never
  // triggers a React render.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = window.innerHeight || 1;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / h));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop rendering entirely once the hero scrolls off-screen — otherwise the
  // GPU keeps drawing a torus nobody can see for the whole rest of the page.
  // Hidden tabs need no special case: the browser already parks rAF for them.
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

  // Cap DPR: above 2x the extra pixels buy nothing on a wireframe but cost a
  // lot of fill rate on high-density displays.
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);

  return (
    <div
      ref={containerRef}
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
        dpr={dpr}
        frameloop={active ? 'always' : 'never'}
        fallback={<ThreeFallback />}
      >
        <Suspense fallback={null}>
          <Scene
            mode={mode}
            pointer={pointer}
            scrollProgress={scrollProgress}
            reduceMotion={reduceMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
