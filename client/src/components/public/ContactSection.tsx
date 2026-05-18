import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/public/SectionHeading';
import { SectionSideVisual } from '@/components/public/SectionSideVisual';
import { useAbout } from '@/hooks/queries';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

export function ContactSection() {
  const { data: about } = useAbout();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', subject: '', message: '' } });

  async function onSubmit(values: FormValues) {
    try {
      const { data } = await api.post<{ ok?: boolean; message?: string }>('/api/contact', values);
      toast.success(data?.message ?? "Thank you! I'll get back to you soon.");
      form.reset();
    } catch (e: unknown) {
      const msg =
        typeof e === 'object' && e !== null && 'response' in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      toast.error(msg ?? 'Could not send — please try again or email directly.');
    }
  }

  const err = form.formState.errors;

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle="Share scope, stack, and timeline — I reply personally."
        />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative overflow-hidden rounded-3xl p-8"
            data-aos="fade-right"
          >
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
              style={{ background: 'color-mix(in srgb, var(--color-secondary) 25%, transparent)' }}
            />
            <div className="relative space-y-4 text-sm">
              {about?.email ? (
                <a
                  href={`mailto:${about.email}`}
                  className="flex items-center gap-3 rounded-2xl border p-4 transition hover:border-[var(--color-primary)]"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <Mail className="size-5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span className="break-all">{about.email}</span>
                </a>
              ) : null}
              {about?.phone ? (
                <a
                  href={`tel:${about.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 rounded-2xl border p-4 transition hover:border-[var(--color-primary)]"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <Phone className="size-5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span>{about.phone}</span>
                </a>
              ) : null}
              {about?.location ? (
                <div className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <MapPin className="size-5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span>{about.location}</span>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-2">
                {about?.linkedInUrl ? (
                  <a
                    href={about.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border p-3 transition hover:border-[var(--color-primary)]"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <Linkedin className="size-5" />
                  </a>
                ) : null}
                {about?.githubUrl ? (
                  <a
                    href={about.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border p-3 transition hover:border-[var(--color-primary)]"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <Github className="size-5" />
                  </a>
                ) : null}
              </div>

              <p
                className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Open for opportunities
              </p>
            </div>

            <div className="relative mt-8 h-36 min-h-[9rem]">
              <SectionSideVisual className="h-full w-full" />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="glass rounded-3xl p-8 md:p-10"
            data-aos="fade-left"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Name *
                <input
                  {...form.register('name')}
                  className="mt-1 w-full rounded-2xl border px-4 py-3 text-sm outline-none ring-[var(--color-primary)]/25 focus:ring-2"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                  placeholder="Your name"
                />
                {err.name ? <span className="text-[11px] font-normal normal-case text-rose-500">{err.name.message}</span> : null}
              </label>
              <label className="block space-y-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Email *
                <input
                  {...form.register('email')}
                  type="email"
                  className="mt-1 w-full rounded-2xl border px-4 py-3 text-sm outline-none ring-[var(--color-primary)]/25 focus:ring-2"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                  placeholder="you@example.com"
                />
                {err.email ? <span className="text-[11px] font-normal normal-case text-rose-500">{err.email.message}</span> : null}
              </label>
            </div>

            <label className="mt-5 block space-y-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Subject *
              <input
                {...form.register('subject')}
                className="mt-1 w-full rounded-2xl border px-4 py-3 text-sm outline-none ring-[var(--color-primary)]/25 focus:ring-2"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                placeholder="What is this about?"
              />
              {err.subject ? <span className="text-[11px] font-normal normal-case text-rose-500">{err.subject.message}</span> : null}
            </label>

            <label className="mt-5 block space-y-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Message *
              <textarea
                {...form.register('message')}
                rows={6}
                className="mt-1 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none ring-[var(--color-primary)]/25 focus:ring-2"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                placeholder="Tell me about your project, role, or collaboration idea…"
              />
              {err.message ? <span className="text-[11px] font-normal normal-case text-rose-500">{err.message.message}</span> : null}
            </label>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full rounded-2xl md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              Send message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
