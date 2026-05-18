import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Form = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const form = useForm<Form>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Form) {
    try {
      await login(values.email, values.password);
      toast.success('Welcome back');
      nav('/admin/dashboard', { replace: true });
    } catch {
      toast.error('Invalid credentials');
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-16"
      style={{ background: 'var(--color-bg)' }}
    >
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative w-full max-w-md overflow-hidden rounded-[2rem] p-10"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div
        className="pointer-events-none absolute -right-28 -top-28 h-56 w-56 rounded-full blur-3xl"
        style={{ background: 'color-mix(in srgb, var(--color-primary) 18%, transparent)' }}
      />
      <div className="relative mb-8 flex items-center gap-3">
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Sparkles className="size-5" />
        </motion.div>
        <motion.div>
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--color-text-muted)' }}>
            Secure area
          </p>
          <p className="font-display text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
            Admin console
          </p>
        </motion.div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-5">
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          Email
          <input
            type="email"
            {...form.register('email')}
            className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
            autoComplete="username"
          />
        </label>
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          Password
          <input
            type="password"
            {...form.register('password')}
            className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
            autoComplete="current-password"
          />
        </label>

        <Button type="submit" size="lg" className="mt-4 w-full rounded-2xl" disabled={form.formState.isSubmitting}>
          <Lock className="size-4" /> Sign in
        </Button>
      </form>

      <div className="relative mt-8 flex flex-col items-center gap-4">
        <Button variant="outline" size="sm" className="rounded-2xl" asChild>
          <Link to="/">
            <ArrowLeft className="size-4" /> Back to portfolio
          </Link>
        </Button>
        <p className="text-center text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          JWT access + refresh · rate limited login
        </p>
      </div>
    </motion.div>
    </div>
  );
}
