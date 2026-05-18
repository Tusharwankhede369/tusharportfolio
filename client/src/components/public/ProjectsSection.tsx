import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Eye, Github, Sparkles, X } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useProjects } from '@/hooks/queries';
import type { ProjectItem } from '@/types/portfolio';
import { cn } from '@/lib/utils';

const FILTERS = ['All', 'Full Stack', 'AI/ML'] as const;

function badgeClass(t: string) {
  const x = t.toLowerCase();
  if (x.includes('react') || x.includes('redux')) return 'border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-text)]';
  if (x.includes('node') || x.includes('express')) return 'border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)] text-[var(--color-text)]';
  if (x.includes('mongo')) return 'border-emerald-500/30 bg-emerald-500/10 text-[var(--color-text)]';
  if (x.includes('python') || x.includes('fast') || x.includes('tensor') || x.includes('rag') || x.includes('faiss') || x.includes('opencv'))
    return 'border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[var(--color-text)]';
  return 'border-[var(--color-border)] bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]';
}

function ProjectCard({
  p,
  onOpen,
}: {
  p: ProjectItem;
  onOpen: (project: ProjectItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 280, damping: 26 });
  const rotateY = useSpring(tiltY, { stiffness: 280, damping: 26 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
      tiltY.set(px * 12);
      tiltX.set(-py * 12);
    },
    [mx, my, tiltX, tiltY]
  );

  const onLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 55%)`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative aspect-[16/10] overflow-hidden">
          {p.thumbnailUrl ? (
            <img
              src={p.thumbnailUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-secondary) 15%, transparent))`,
              }}
            >
              <Sparkles className="size-10 opacity-80" style={{ color: 'var(--color-primary)' }} />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent opacity-95" />
          {p.featured ? (
            <span className="absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ borderColor: 'var(--color-accent)', background: 'color-mix(in srgb, var(--color-accent) 85%, black)' }}>
              Featured
            </span>
          ) : null}
        </div>

        <div className="relative flex flex-1 flex-col p-5 pt-4">
          <p className="font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {p.name}
          </p>
          <p className="mt-2 line-clamp-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {p.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(p.technologies ?? []).slice(0, 5).map((t) => (
              <span key={t} className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium', badgeClass(t))}>
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
            {p.demoUrl ? (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 min-w-[7rem] items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:opacity-90"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                <ExternalLink className="size-3.5 shrink-0" /> Live
              </a>
            ) : null}
            {p.repoUrl ? (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 min-w-[7rem] items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:opacity-90"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Github className="size-3.5 shrink-0" /> GitHub
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => onOpen(p)}
              className="inline-flex flex-1 min-w-[7rem] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition hover:opacity-95 btn-primary"
            >
              <Eye className="size-3.5 shrink-0" /> Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const { data: projects, isLoading } = useProjects(filter);
  const [active, setActive] = useState<ProjectItem | null>(null);

  const list = useMemo(() => projects ?? [], [projects]);

  return (
    <section id="projects" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Production-grade builds across MERN, AI integrations, and cloud deployment."
        />

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition',
                  filter === f
                    ? 'border-transparent text-white btn-primary'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass h-[420px] animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <ProjectCard key={p._id} p={p} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Dialog.Root open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="fixed left-1/2 top-1/2 z-[90] flex max-h-[min(88vh,900px)] w-[min(94vw,860px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <div className="max-h-[88vh] overflow-y-auto">
              <div className="relative aspect-[21/9] max-h-56 w-full overflow-hidden sm:aspect-[2/1]">
                {active?.thumbnailUrl ? (
                  <img src={active.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center" style={{ background: 'var(--color-surface-hover)' }}>
                    <Sparkles className="size-12" style={{ color: 'var(--color-primary)' }} />
                  </div>
                )}
                <Dialog.Close
                  className="absolute right-3 top-3 rounded-xl border p-2 transition hover:opacity-90"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                  aria-label="Close"
                >
                  <X className="size-5" />
                </Dialog.Close>
              </div>

              <div className="p-6 md:p-8">
                <Dialog.Title className="font-display text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  {active?.name}
                </Dialog.Title>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {active?.longDescription || active?.description}
                </p>

                {active?.features?.length ? (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                      Features
                    </p>
                    <ul className="mt-3 space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {active.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--color-primary)' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {active?.challenges?.length ? (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-secondary)' }}>
                      Challenges
                    </p>
                    <ul className="mt-3 space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {active.challenges.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--color-secondary)' }} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {active?.impact ? (
                  <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    <span className="font-semibold">Impact: </span>
                    {active.impact}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  {(active?.technologies ?? []).map((t) => (
                    <span key={t} className={cn('rounded-full border px-3 py-1 text-xs font-medium', badgeClass(t))}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {active?.demoUrl ? (
                    <a
                      href={active.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white btn-primary"
                    >
                      <ExternalLink className="size-4" /> Live demo
                    </a>
                  ) : null}
                  {active?.repoUrl ? (
                    <a
                      href={active.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:opacity-90"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      <Github className="size-4" /> GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
