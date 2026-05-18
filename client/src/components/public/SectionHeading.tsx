import { motion } from 'framer-motion';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="text-xs font-semibold uppercase tracking-[0.35em]"
        style={{ color: 'var(--color-primary)' }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.08 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-sm md:text-base"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
