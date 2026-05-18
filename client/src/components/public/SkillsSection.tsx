import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useSkills } from '@/hooks/queries';
import type { SkillItem } from '@/types/portfolio';

const CATEGORY_ORDER = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Databases',
  'AI/ML',
  'Tools',
  'Concepts',
];

export function SkillsSection() {
  const { data: skills } = useSkills();
  const categories = useMemo(() => {
    const set = new Set(skills?.map((s) => s.category) ?? []);
    return CATEGORY_ORDER.filter((c) => set.has(c)).concat([...set].filter((c) => !CATEGORY_ORDER.includes(c)));
  }, [skills]);

  const [tab, setTab] = useState(categories[0] ?? 'Frontend');

  useEffect(() => {
    if (categories.length && !categories.includes(tab)) {
      setTab(categories[0]);
    }
  }, [categories, tab]);

  const grouped = useMemo(() => {
    const m = new Map<string, SkillItem[]>();
    skills?.forEach((s) => {
      const arr = m.get(s.category) ?? [];
      arr.push(s);
      m.set(s.category, arr);
    });
    m.forEach((arr) => arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    return m;
  }, [skills]);

  return (
    <section id="skills" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Stack"
          title="Skills & Technologies"
          subtitle="Depth across the MERN stack, data, AI tooling, and shipping discipline."
        />

        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative mx-auto h-80 max-w-lg overflow-hidden rounded-3xl lg:mx-0 lg:h-[32rem]"
            data-aos="fade-right"
          >
            <DotLottieReact
              src="https://lottie.host/30332688-d9b4-405f-849b-f6da7310801e/TkOnS4lulY.lottie"
              loop
              autoplay
              className="h-full w-full"
            />
          </motion.div>

          <Tabs.Root value={tab} onValueChange={setTab} className="w-full">
            <Tabs.List className="mb-6 flex flex-wrap gap-2" aria-label="Skill categories">
              {categories.map((c) => (
                <Tabs.Trigger
                  key={c}
                  value={c}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-xs font-semibold text-[var(--color-text-muted)] transition data-[state=active]:border-transparent data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white"
                >
                  {c}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {categories.map((c) => (
              <Tabs.Content key={c} value={c} className="outline-none">
                <div className="grid gap-4 sm:grid-cols-2">
                  {(grouped.get(c) ?? []).map((s, idx) => (
                    <motion.div
                      key={s._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="glass rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ boxShadow: '0 8px 30px rgba(99, 102, 241, 0.12)' }}
                      data-aos="fade-up"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{s.iconEmoji || '◆'}</span>
                          <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                          {s.proficiency}%
                        </span>
                      </div>
                      <div
                        className="mt-3 h-2 overflow-hidden rounded-full"
                        style={{ background: 'var(--color-surface-hover)' }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
}
