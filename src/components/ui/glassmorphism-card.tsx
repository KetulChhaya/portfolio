'use client';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export function GlassmorphismCard({ children }: GlassmorphismCardProps) {
  return <div className="relative z-10">{children}</div>;
}
