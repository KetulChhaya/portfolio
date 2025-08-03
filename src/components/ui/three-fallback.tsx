'use client';

// Fallback component for when Three.js fails to load or on low-end devices
export function ThreeFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated gradient background as fallback */}
      <div className="via-muted/5 absolute inset-0 animate-pulse bg-gradient-to-br from-transparent to-transparent" />

      {/* Subtle geometric shapes using CSS */}
      <div
        className="border-muted-foreground/10 absolute top-1/4 left-1/4 h-12 w-12 rotate-45 animate-pulse border"
        style={{ animationDelay: '0s', animationDuration: '3s' }}
      />

      <div
        className="border-muted-foreground/10 absolute top-2/3 right-1/3 h-8 w-8 animate-pulse rounded-full border"
        style={{ animationDelay: '1s', animationDuration: '4s' }}
      />

      <div
        className="border-muted-foreground/10 absolute bottom-1/3 left-1/2 h-10 w-10 rotate-12 animate-pulse rounded-lg border"
        style={{ animationDelay: '2s', animationDuration: '5s' }}
      />

      <div
        className="border-muted-foreground/10 absolute top-1/2 right-1/4 h-6 w-6 rotate-45 animate-pulse border"
        style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}
      />
    </div>
  );
}
