import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useAchievements } from '@/hooks/queries';
import { formatDate } from '@/lib/utils';

export function AchievementsSection() {
  const { data: items } = useAchievements();

  return (
    <section id="achievements" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Recognition"
          title="Achievements & Awards"
          subtitle="Hackathons, academic honors, and competitive validation."
        />


        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: '1400px' }}>
          {items?.map((a, idx) => (
            <motion.div
              key={a._id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group h-[320px] [transform-style:preserve-3d]"
              data-aos="flip-up"
            >
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div
                  className="absolute inset-0 flex flex-col rounded-3xl border p-7 [backface-visibility:hidden]"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-4xl leading-none">{a.icon || '🏅'}</span>
                    {a.statHighlight ? (
                      <span className="rounded-full border px-2.5 py-1 text-[10px] font-bold" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                        {a.statHighlight}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-6 font-display text-lg font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                    {a.title}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {a.organization}
                  </p>
                  <p className="mt-auto text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatDate(a.date)}
                    {a.awardType ? ` · ${a.awardType}` : ''}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col rounded-3xl border p-7 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: `linear-gradient(145deg, color-mix(in srgb, var(--color-primary) 12%, var(--color-surface)), var(--color-surface))`,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                    Details
                  </p>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {a.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
