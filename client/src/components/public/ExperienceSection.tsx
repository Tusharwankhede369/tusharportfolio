import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useExperience } from '@/hooks/queries';
import { cn } from '@/lib/utils';

function formatType(t?: string) {
  if (!t) return '';
  return t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ExperienceSection() {
  const { data: jobs } = useExperience();

  return (
    <section id="experience" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Career"
          title="Professional Experience"
          subtitle="Hands-on production work — auth, data modeling, APIs, and deployment."
        />

        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative mx-auto h-64 max-w-md overflow-hidden rounded-3xl lg:sticky lg:top-28 lg:mx-0 lg:h-[34rem]"
            data-aos="fade-right"
          >
            <DotLottieReact
              src="https://lottie.host/a896605f-3bd7-45a0-8b4e-a3fc026f5339/5BsWlh51Pb.lottie"
              loop
              autoplay
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/90 via-transparent to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <Briefcase className="size-8" style={{ color: 'var(--color-primary)' }} />
              <p className="mt-3 font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Building in the open
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Internship delivery with measurable scope: catalog scale, RBAC, and cloud ops.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <div
              className="absolute bottom-3 left-[18px] top-3 w-px md:left-[22px]"
              style={{
                background: `linear-gradient(to bottom, var(--color-primary), var(--color-secondary), color-mix(in srgb, var(--color-accent) 70%, transparent))`,
              }}
            />

            <div className="space-y-8">
              {jobs?.map((job, idx) => (
                <motion.article
                  key={job._id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 md:pl-16"
                  data-aos={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
                >
                  <span
                    className="absolute left-[11px] top-5 flex size-4 items-center justify-center rounded-full border-2 md:left-[15px]"
                    style={{ borderColor: 'var(--color-primary)', background: 'var(--color-bg)' }}
                  >
                    <span className="size-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                  </span>

                  <div className="glass rounded-3xl p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                          {job.company}
                        </p>
                        <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                          {job.role}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                          {job.location}
                          {job.employmentType ? ` · ${formatType(job.employmentType)}` : ''}
                        </p>
                      </div>
                      <p
                        className="rounded-full border px-3 py-1 text-[11px] font-medium whitespace-nowrap"
                        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        {job.startDate ? format(new Date(job.startDate), 'MMM yyyy') : ''} —{' '}
                        {job.endDate ? format(new Date(job.endDate), 'MMM yyyy') : 'Present'}
                      </p>
                    </div>

                    {job.description ? (
                      <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {job.description}
                      </p>
                    ) : null}

                    {job.technologies?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {job.metrics?.length ? (
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {job.metrics.map((m) => (
                          <div key={m.label} className="rounded-2xl border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
                            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                              {m.label}
                            </p>
                            <p className="mt-2 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <details className="group mt-6">
                      <summary
                        className={cn(
                          'cursor-pointer list-none text-sm font-semibold',
                          '[&::-webkit-details-marker]:hidden'
                        )}
                        style={{ color: 'var(--color-text)' }}
                      >
                        <span className="inline-flex items-center gap-2">
                          Responsibilities
                          <span className="text-xs font-normal group-open:hidden" style={{ color: 'var(--color-text-muted)' }}>
                            Show more
                          </span>
                          <span className="hidden text-xs font-normal group-open:inline" style={{ color: 'var(--color-text-muted)' }}>
                            Show less
                          </span>
                        </span>
                      </summary>
                      <ul className="mt-4 space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {job.responsibilities?.map((r) => (
                          <li key={r} className="flex gap-3">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--color-secondary)' }} />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
