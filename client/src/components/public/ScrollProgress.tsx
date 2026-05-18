import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-emerald-500 via-emerald-600 to-violet-600"
      style={{ scaleX }}
    />
  );
}
