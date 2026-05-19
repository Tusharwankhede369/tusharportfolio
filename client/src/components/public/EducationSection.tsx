import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useEducation } from '@/hooks/queries';
import { formatDate } from '@/lib/utils';

export function EducationSection() {
  const { data: items } = useEducation();

  return (
    <section id="education" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Academic journey"
          title="Education"
          subtitle="Formal training in engineering and sciences — foundation for building reliable systems."
        />

        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative mx-auto hidden h-56 max-w-xs overflow-hidden rounded-3xl lg:block lg:h-72"
            data-aos="fade-right"
          >
            <DotLottieReact
              src="https://lottie.host/9b9ff664-a5fa-4981-85ee-2c6ea5b85575/5TgRbNXE7P.lottie"
              loop
              autoplay
              className="h-full w-full"
            />
          </motion.div>

          <div className="relative">
            <div
              className="absolute left-[22px] top-4 bottom-4 w-px md:left-[26px]"
              style={{ background: `linear-gradient(to bottom, var(--color-primary), var(--color-secondary))` }}
              aria-hidden
            />

            <div className="space-y-10">
              {items?.map((e, idx) => (
                <motion.article
                  key={e._id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-14 md:pl-16"
                  data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
                >
                  <span
                    className="absolute left-[14px] top-5 flex size-9 items-center justify-center rounded-full md:left-[17px]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '2px solid var(--color-primary)',
                    }}
                  >
                    <GraduationCap className="size-4" style={{ color: 'var(--color-primary)' }} />
                  </span>

                  <div className="glass rounded-3xl p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                          {e.institution}
                        </h3>
                        {e.university ? (
                          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {e.university}
                          </p>
                        ) : null}
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-muted)' }}
                      >
                        {formatDate(e.startDate)} —{' '}
                        {e.endDate ? formatDate(e.endDate) : 'Present'}
                      </span>
                    </div>
                    <p className="mt-3 font-medium" style={{ color: 'var(--color-text)' }}>
                      {e.degree}
                      {e.field ? ` · ${e.field}` : ''}
                    </p>
                    <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {e.grade}
                    </p>
                    {e.location ? (
                      <p className="mt-2 flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        <MapPin className="size-4 shrink-0" /> {e.location}
                      </p>
                    ) : null}
                    {e.highlights?.length ? (
                      <ul className="mt-4 space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {e.highlights.map((h) => (
                          <li key={h} className="flex gap-2">
                            <span style={{ color: 'var(--color-accent)' }}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
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
