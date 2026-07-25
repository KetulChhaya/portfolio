'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, memo, useEffect, useRef, useState } from 'react';
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
  /**
   * Current theme, passed as a ref rather than a prop on purpose.
   *
   * `mode` used to be a plain prop, which meant every theme toggle re-rendered
   * <Canvas> and made r3f reconcile the whole scene — measured at ~110ms of the
   * ~160ms toggle stall. The material already eases toward its target every
   * frame, so reading the value inside useFrame gets the same cross-fade for
   * zero React work.
   */
  modeRef: React.RefObject<'light' | 'dark'>;
  /** Normalised pointer position, -1..1 on both axes. Mutated by the parent. */
  pointer: React.RefObject<{ x: number; y: number }>;
  /** 0 at the top of the hero, 1 once the hero is fully scrolled past. */
  scrollProgress: React.RefObject<number>;
  reduceMotion: boolean;
}

function FloatingTorus({
  modeRef,
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
    opacity: PALETTES[modeRef.current].opacity,
    emissive: PALETTES[modeRef.current].emissive,
    roughness: PALETTES[modeRef.current].roughness,
    metalness: PALETTES[modeRef.current].metalness,
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
    const target = PALETTES[modeRef.current];
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
        {/* Initial values only — every frame overwrites these from PALETTES. */}
        <meshStandardMaterial
          ref={outerMat}
          transparent
          wireframe
          emissive="#ffffff"
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRef}>
        <torusGeometry args={[3.1, 0.16, 5, 44]} />
        <meshBasicMaterial
          ref={innerMat}
          transparent
          opacity={0.12}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Light intensities per theme, eased in useFrame for the same reason as the
 *  materials: changing them via props would re-render the whole Canvas. */
const LIGHTS = {
  light: { ambient: 0.9, key: 0.4, fill: 0.3, rim: 0.2 },
  dark: { ambient: 0.6, key: 0.8, fill: 0.6, rim: 0.5 },
} as const;

function Scene({
  modeRef,
  pointer,
  scrollProgress,
  reduceMotion,
}: TorusProps) {
  const ambient = useRef<THREE.AmbientLight>(null);
  const key = useRef<THREE.PointLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const k = damp(4, Math.min(delta, 0.1));
    const target = LIGHTS[modeRef.current];
    if (ambient.current)
      ambient.current.intensity +=
        (target.ambient - ambient.current.intensity) * k;
    if (key.current)
      key.current.intensity += (target.key - key.current.intensity) * k;
    if (fill.current)
      fill.current.intensity += (target.fill - fill.current.intensity) * k;
    if (rim.current)
      rim.current.intensity += (target.rim - rim.current.intensity) * k;
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={LIGHTS[modeRef.current].ambient} />
      <pointLight
        ref={key}
        position={[10, 10, 10]}
        intensity={LIGHTS[modeRef.current].key}
      />
      <pointLight
        ref={fill}
        position={[-10, -5, 5]}
        intensity={LIGHTS[modeRef.current].fill}
      />
      <pointLight
        ref={rim}
        position={[0, 0, 10]}
        intensity={LIGHTS[modeRef.current].rim}
      />

      <FloatingTorus
        modeRef={modeRef}
        pointer={pointer}
        scrollProgress={scrollProgress}
        reduceMotion={reduceMotion}
      />
    </>
  );
}

// Hoisted so their identity is stable across renders — r3f re-applies these to
// the renderer/camera whenever it sees a new object.
const CAMERA_PROPS = {
  position: [0, 0, CAMERA_Z_END] as [number, number, number],
  fov: 50,
  near: 0.1,
  far: 1000,
};
const GL_PROPS = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
};
const DPR: [number, number] = [1, 1.75];

interface CanvasShellProps {
  modeRef: React.RefObject<'light' | 'dark'>;
  pointer: React.RefObject<{ x: number; y: number }>;
  scrollProgress: React.RefObject<number>;
  reduceMotion: boolean;
  active: boolean;
}

/**
 * Memoised so a theme change cannot reach it. Every prop is either a ref
 * (stable identity) or a boolean that rarely changes, so React bails out of
 * re-rendering the Canvas entirely when only the theme moved.
 */
const CanvasShell = memo(function CanvasShell({
  modeRef,
  pointer,
  scrollProgress,
  reduceMotion,
  active,
}: CanvasShellProps) {
  return (
    <Canvas
      camera={CAMERA_PROPS}
      gl={GL_PROPS}
      dpr={DPR}
      frameloop={active ? 'always' : 'never'}
      fallback={<ThreeFallback />}
    >
      <Suspense fallback={null}>
        <Scene
          modeRef={modeRef}
          pointer={pointer}
          scrollProgress={scrollProgress}
          reduceMotion={reduceMotion}
        />
      </Suspense>
    </Canvas>
  );
});

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = '' }: ThreeSceneProps) {
  const { resolvedTheme, theme } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const mode: 'light' | 'dark' =
    (resolvedTheme || theme) === 'dark' ? 'dark' : 'light';

  // The theme reaches the scene through this ref, never through props.
  const modeRef = useRef<'light' | 'dark'>(mode);
  modeRef.current = mode;

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

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <CanvasShell
        modeRef={modeRef}
        pointer={pointer}
        scrollProgress={scrollProgress}
        reduceMotion={reduceMotion}
        active={active}
      />
    </div>
  );
}
