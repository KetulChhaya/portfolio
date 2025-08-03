'use client';

import { motion } from 'framer-motion';

interface CircularMotionProps {
  size?: number;
  duration?: number;
  delay?: number;
  opacity?: number;
  className?: string;
}

export function CircularMotion({
  size = 100,
  duration = 20,
  delay = 0,
  opacity = 0.1,
  className = '',
}: CircularMotionProps) {
  return (
    <motion.div
      className={`absolute rounded-full border border-current ${className}`}
      style={{
        width: size,
        height: size,
        opacity: opacity,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export function CircularMotionGroup() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large slow circle */}
      <div className="absolute top-1/4 left-1/4">
        <CircularMotion
          size={200}
          duration={30}
          delay={0}
          opacity={0.05}
          className="text-foreground"
        />
      </div>

      {/* Medium circle */}
      <div className="absolute top-1/2 right-1/3">
        <CircularMotion
          size={120}
          duration={25}
          delay={5}
          opacity={0.08}
          className="text-muted-foreground"
        />
      </div>

      {/* Small fast circle */}
      <div className="absolute bottom-1/3 left-1/2">
        <CircularMotion
          size={80}
          duration={20}
          delay={10}
          opacity={0.06}
          className="text-foreground"
        />
      </div>

      {/* Extra small circle */}
      <div className="absolute top-2/3 right-1/4">
        <CircularMotion
          size={50}
          duration={15}
          delay={15}
          opacity={0.04}
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
}
