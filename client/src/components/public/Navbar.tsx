import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/brand/SiteLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Awards' },
  { href: '#certifications', label: 'Certs' },
  { href: '#learning', label: 'Learning' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8', scrolled && 'pt-3')}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500',
          scrolled
            ? 'glass shadow-[0_4px_14px_rgba(0,0,0,0.18)]'
            : 'border-transparent bg-transparent'
        )}
        style={scrolled ? { borderColor: 'var(--border-color)' } : undefined}
      >
        <a href="#hero" className="transition-opacity hover:opacity-90">
          <SiteLogo compact />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link group relative px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <span className="relative z-10">{l.label}</span>
              <span
                className="absolute inset-x-2 -bottom-0.5 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
                }}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl"
            style={{ border: '1px solid var(--border-color)' }}
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden rounded-xl font-semibold md:inline-flex">
            <Link to="/admin/login" style={{ color: 'var(--color-text)' }}>
              Admin
            </Link>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Menu />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-3 max-w-6xl rounded-2xl p-4 lg:hidden"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm transition-colors"
                  style={{ color: 'var(--color-text)' }}
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/admin/login"
                className="mt-2 rounded-xl px-3 py-2 text-sm font-medium"
                style={{ color: 'var(--color-primary)' }}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
