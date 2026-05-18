import { useEffect } from 'react';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 1200);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg, #1a1816)' }}
    >
      <div
        className="size-14 rounded-full border-2 border-transparent border-t-[color:var(--color-primary,#6b8f71)] border-l-[color:var(--color-primary,#6b8f71)] animate-spin"
        aria-hidden
      />
      <p className="mt-6 text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--color-text-muted, #a39e98)' }}>
        Loading
      </p>
    </div>
  );
}
