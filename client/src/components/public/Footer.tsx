import { Github, Linkedin, Mail } from 'lucide-react';
import { useAbout } from '@/hooks/queries';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const { data: about } = useAbout();

  return (
    <footer className="border-t px-4 py-14 md:px-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-gradient">{about?.name ?? 'Tushar Prabhakar Wankhede'}</p>
          <p className="mt-2 max-w-md text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {about?.tagline ?? 'Full Stack Developer — MERN, AI/ML, and production-ready systems.'}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium" aria-label="Footer">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:[color:var(--color-primary)]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4" style={{ color: 'var(--color-text-muted)' }}>
          {about?.linkedInUrl ? (
            <a
              className="transition-colors hover:[color:var(--color-primary)]"
              href={about.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
          ) : null}
          {about?.githubUrl ? (
            <a
              className="transition-colors hover:[color:var(--color-primary)]"
              href={about.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
          ) : null}
          {about?.email ? (
            <a className="transition-colors hover:[color:var(--color-primary)]" href={`mailto:${about.email}`} aria-label="Email">
              <Mail className="size-5" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t pt-8 text-center text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
        <p>© 2026 Tushar Wankhede. All rights reserved.</p>
        <p className="mt-2">Built with care using the MERN stack.</p>
      </div>
    </footer>
  );
}
