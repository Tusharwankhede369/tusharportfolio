import { cn } from '@/lib/utils';

type SiteLogoProps = {
  className?: string;
  /** Compact mark for tight headers */
  compact?: boolean;
};

export function SiteLogo({ className, compact }: SiteLogoProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-2.5 font-display font-semibold tracking-tight', className)}
      aria-label="Tushar Wankhede — portfolio home"
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
        style={{ background: 'var(--gradient-primary)' }}
        aria-hidden
      >
        TW
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-[15px]" style={{ color: 'var(--color-text)' }}>
            Tushar Wankhede
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
            Portfolio
          </span>
        </span>
      ) : null}
    </span>
  );
}
