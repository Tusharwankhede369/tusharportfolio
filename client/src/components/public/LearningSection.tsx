import { motion } from 'framer-motion';
import { BookOpen, Cpu, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/public/SectionHeading';

const cards = [
  {
    title: 'Currently exploring',
    body: 'System design patterns, microservices boundaries, and performance tuning for Node.js APIs at scale.',
    icon: Cpu,
  },
  {
    title: 'Technologies in focus',
    body: 'Edge caching, observability, and pragmatic AI integration (RAG, evaluation, guardrails) where it ships value.',
    icon: BookOpen,
  },
  {
    title: 'Next builds',
    body: 'Deeper healthcare workflow tooling, design systems for admin-heavy products, and polished DX for teams.',
    icon: Rocket,
  },
];

export function LearningSection() {
  return (
    <section id="learning" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Growth"
          title="What I'm learning"
          subtitle="Continuous improvement — shipping is the teacher; depth is the goal."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6"
              data-aos="fade-up"
            >
              <c.icon className="size-8" style={{ color: 'var(--color-primary)' }} />
              <h3 className="mt-4 font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
