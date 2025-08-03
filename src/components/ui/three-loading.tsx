'use client';

export function ThreeLoading() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="text-muted-foreground/30 font-mono text-sm">
        Loading 3D experience...
      </div>
    </div>
  );
}
