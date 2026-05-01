import { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

/**
 * Lightweight CSS-only floating particle field. Pure decorative, no JS loop.
 * Particles drift via CSS keyframes. Hidden when prefers-reduced-motion.
 */
export const ParticleField = ({ count = 18, className = '' }: ParticleFieldProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 2 + Math.random() * 4;
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          delay: Math.random() * -12,
          duration: 10 + Math.random() * 14,
          tone: i % 3 === 0 ? 'accent' : 'cyan',
          opacity: 0.25 + Math.random() * 0.45,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-particle-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background:
              p.tone === 'accent'
                ? `hsl(var(--accent) / ${p.opacity})`
                : `hsl(var(--cyan) / ${p.opacity})`,
            boxShadow:
              p.tone === 'accent'
                ? `0 0 ${p.size * 3}px hsl(var(--accent) / 0.6)`
                : `0 0 ${p.size * 3}px hsl(var(--cyan) / 0.6)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
