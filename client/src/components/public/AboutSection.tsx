import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserRound } from 'lucide-react';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useAbout } from '@/hooks/queries';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Full Stack Development (MERN)', body: 'End-to-end product delivery with React, Node, Express, and MongoDB.' },
  { title: 'AI/ML Integration', body: 'Practical AI: RAG, OCR pipelines, and intelligent UX where accuracy matters.' },
  { title: 'System Design & Architecture', body: 'RBAC, JWT, service boundaries, and data models tuned for growth.' },
  { title: 'RESTful API Development', body: 'Clear contracts, validation, and performance-minded backends.' },
];

export function AboutSection() {
  const { data: about } = useAbout();
  const [photoBroken, setPhotoBroken] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const summary = about?.professionalSummary || about?.bio || '';
  const photoSrc = (about?.photoUrl ?? '').trim();
  const showPhoto = Boolean(photoSrc) && !photoBroken;

  useEffect(() => {
    setPhotoBroken(false);
  }, [photoSrc]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-stat]'), {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const facts = [
    {
      icon: '📧',
      label: 'Email',
      value: about?.email,
      href: about?.email ? `mailto:${about.email}` : undefined,
    },
    {
      icon: '📱',
      label: 'Phone',
      value: about?.phone,
      href: about?.phone ? `tel:${about.phone.replace(/\s/g, '')}` : undefined,
    },
    {
      icon: '📍',
      label: 'Location',
      value: about?.location,
    },
    {
      icon: '🎓',
      label: 'Education',
      value: 'B.Tech Computer Engg.',
    },
    {
      icon: '💼',
      label: 'Current',
      value: 'Software Developer Intern',
    },
  ];

  return (
    <section id="about" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Profile"
          title="About Me"
          subtitle="Engineering-first mindset with a product eye — from schema to screen."
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
            }}
            data-aos="fade-up"
          >
            <h3 className="font-display text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              Who I am
            </h3>
            <p className="mt-4 text-sm leading-relaxed md:text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
              {summary}
            </p>
            {about?.bio && about.bio !== summary ? (
              <p className="mt-4 text-sm leading-relaxed md:text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
                {about.bio}
              </p>
            ) : null}

            <div
              ref={statsRef}
              className="mt-10 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"
            >
              {facts.map((row) => (
                <div
                  key={row.label}
                  data-stat
                  className="flex gap-3 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <span className="text-2xl leading-none" aria-hidden>
                    {row.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-1 block break-all text-sm font-semibold leading-snug transition-colors hover:underline"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
                        {row.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
              }}
              data-aos="fade-left"
            >
              <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:items-center md:justify-center md:gap-10">
                <div className="relative shrink-0">
                  {showPhoto ? (
                    <img
                      src={photoSrc}
                      alt={about?.name ? `Portrait of ${about.name}` : 'Profile photo'}
                      className="size-[220px] rounded-[22px] object-cover md:size-[260px]"
                      style={{
                        border: '3px solid color-mix(in srgb, var(--color-primary) 65%, transparent)',
                        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.16)',
                      }}
                      loading="lazy"
                      onError={() => setPhotoBroken(true)}
                    />
                  ) : (
                    <div
                      className="flex size-[220px] flex-col items-center justify-center gap-3 rounded-[22px] md:size-[260px]"
                      style={{
                        border: '2px dashed var(--color-border)',
                        background: 'var(--color-bg)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <UserRound className="size-14 opacity-50" aria-hidden />
                      <p className="max-w-[12rem] px-4 text-center text-xs leading-relaxed">
                        Add a profile photo from the admin Profile tab — it appears here and in the hero.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.06)',
                  }}
                  data-aos="zoom-in"
                >
                  <p className="font-display text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {s.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
