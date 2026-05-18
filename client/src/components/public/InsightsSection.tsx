import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/public/SectionHeading';

export function InsightsSection() {
  return (
    <section id="insights" className="relative scroll-mt-28 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Insights"
          title="Writing, experiments, and deep dives — arriving soon."
          subtitle="A premium editorial layer for architecture notes, ML journals, and shipping retrospectives."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-[2rem] p-10 md:p-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500/25 via-violet-600/20 to-fuchsia-500/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                The blog module is wired for expansion.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Connect a headless CMS or Markdown pipeline when you&apos;re ready — the interface is already
                structured like a modern SaaS editorial surface.
              </p>
            </div>
            <a
              href="https://github.com/Tusharwankhede369"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-medium text-slate-100 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              Follow builds <ArrowUpRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
