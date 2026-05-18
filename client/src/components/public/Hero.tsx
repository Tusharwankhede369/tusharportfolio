import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, UserRound } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAbout, usePublicSettings } from '@/hooks/queries';
import { useTypewriter } from '@/hooks/useTypewriter';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const { data: about } = useAbout();
  const { data: settings } = usePublicSettings();
  const [photoBroken, setPhotoBroken] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const roles = useMemo(
    () =>
      about?.heroRoles?.length
        ? about.heroRoles
        : ['Full Stack Developer', 'MERN Specialist', 'AI/ML Enthusiast'],
    [about?.heroRoles]
  );
  const typed = useTypewriter(roles, 52, 2000);

  const intro =
    about?.heroIntro ?? `Hi, I'm ${about?.name?.split(' ')[0] ?? 'Tushar'} Prabhakar Wankhede`;

  const resumeHref =
    settings?.resumePdfUrl || about?.resumeUrl || '/uploads/resume.pdf';

  const photoSrc = (about?.photoUrl ?? '').trim();
  const showPhoto = Boolean(photoSrc) && !photoBroken;

  useEffect(() => {
    setPhotoBroken(false);
  }, [photoSrc]);

  const stats = [
    { icon: '💼', number: '6', label: 'Months Experience' },
    { icon: '🚀', number: '5', label: 'Completed Projects' },
    { icon: '⚡', number: '32', label: 'Technologies' },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-4 pb-20 pt-28 md:px-8"
      style={{ background: 'var(--hero-gradient)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 80% 55% at 15% 20%, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 55%)',
              'radial-gradient(ellipse 70% 50% at 85% 10%, color-mix(in srgb, var(--color-secondary) 18%, transparent), transparent 50%)',
              'radial-gradient(ellipse 60% 45% at 70% 75%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%)',
            ].join(', '),
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 60%, transparent) 0%, var(--color-bg) 100%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {intro}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: 'var(--color-text)' }}
          >
            {about?.name ?? 'Tushar Prabhakar Wankhede'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5 min-h-[2.75rem] text-xl font-medium md:text-2xl"
          >
            <span className="text-gradient">{typed}</span>
            <span
              className="ml-1 inline-block h-7 w-0.5 align-middle"
              style={{ background: 'var(--color-primary)' }}
              aria-hidden
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-4 max-w-xl text-base"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {about?.tagline ?? 'Building intelligent web solutions with modern technologies'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button type="button" className="btn-primary px-6 py-3" onClick={() => scrollToId('projects')}>
              View Projects
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border px-6 py-3"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              asChild
            >
              <a href={resumeHref} download="Tushar_Wankhede_Resume.pdf" target="_blank" rel="noreferrer">
                <Download className="size-4" /> Download Resume
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border px-6 py-3"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              onClick={() => scrollToId('contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-5 py-4"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                }}
              >
                <p className="text-lg leading-none" aria-hidden>
                  {s.icon}
                </p>
                <p className="mt-2 text-2xl font-bold tabular-nums" style={{ color: 'var(--color-text)' }}>
                  {s.number}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center gap-3"
          >
            {about?.linkedInUrl ? (
              <motion.a
                whileHover={{ y: -4 }}
                href={about.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="flex size-11 items-center justify-center rounded-xl"
                style={{
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </motion.a>
            ) : null}
            {about?.githubUrl ? (
              <motion.a
                whileHover={{ y: -4 }}
                href={about.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex size-11 items-center justify-center rounded-xl"
                style={{
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                }}
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </motion.a>
            ) : null}
            {about?.email ? (
              <motion.a
                whileHover={{ y: -4 }}
                href={`mailto:${about.email}`}
                className="flex size-11 items-center justify-center rounded-xl"
                style={{
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                }}
                aria-label="Email"
              >
                <Mail className="size-5" />
              </motion.a>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mx-auto flex max-w-sm justify-center lg:max-w-none"
        >
          <div className="hero-image-shell">
            <div className="hero-image-glow" aria-hidden />
            <div className="hero-image-ring" aria-hidden />
            <div className="hero-image-inner">
              {showPhoto ? (
                <img
                  src={photoSrc}
                  alt={about?.name ? `Portrait of ${about.name}` : 'Profile photo'}
                  className="hero-profile-img"
                  loading="eager"
                  decoding="async"
                  onError={() => setPhotoBroken(true)}
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center"
                  style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}
                >
                  <UserRound className="size-12 opacity-40" aria-hidden />
                  <p className="text-xs leading-relaxed">Upload a photo in Admin → Profile.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={() => scrollToId('about')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Scroll to about"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown className="size-5" style={{ color: 'var(--color-primary)' }} />
        </motion.span>
      </button>
    </section>
  );
}
