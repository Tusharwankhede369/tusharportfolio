import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--x', `${e.clientX}px`);
      el.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.22] mix-blend-screen dark:opacity-35 dark:mix-blend-screen"
      style={{
        background:
          'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 48%)',
      }}
    />
  );
}
