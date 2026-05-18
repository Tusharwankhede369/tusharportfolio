import { cn } from '@/lib/utils';

/** Theme-aware decorative panel (no Lottie / no solid “blue box”). */
export function SectionSideVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-3xl', className)}
      style={{
        border: '1px solid var(--color-border)',
        background:
          'linear-gradient(155deg, color-mix(in srgb, var(--color-primary) 14%, var(--color-surface)) 0%, var(--color-surface) 42%, color-mix(in srgb, var(--color-secondary) 12%, var(--color-surface)) 100%)',
      }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-[10%] size-[min(120%,220px)] rounded-full opacity-[0.22] blur-3xl"
        style={{ background: 'color-mix(in srgb, var(--color-primary) 55%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[5%] size-[min(100%,180px)] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: 'color-mix(in srgb, var(--color-secondary) 50%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-2xl"
        style={{ background: 'color-mix(in srgb, var(--color-accent) 45%, transparent)' }}
      />
    </div>
  );
}
