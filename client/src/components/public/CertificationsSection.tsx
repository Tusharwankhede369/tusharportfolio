import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { SectionHeading } from '@/components/public/SectionHeading';
import { useCertifications } from '@/hooks/queries';
import type { CertificationItem } from '@/types/portfolio';

export function CertificationsSection() {
  const { data: certs } = useCertifications();
  const [preview, setPreview] = useState<CertificationItem | null>(null);

  function downloadPdf(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noreferrer';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <section id="certifications" className="scroll-mt-28 px-4 py-24 md:px-8" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Learning"
          title="Certifications"
          subtitle="Formal courses and virtual programs — view or download credentials."
        />

        <div className="mb-10">
          <p className="text-center text-sm leading-relaxed lg:text-left" style={{ color: 'var(--color-text-muted)' }}>
            PDFs are served from <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 font-mono text-xs">/uploads/certificates/</code>.
            Upload or replace files anytime from the admin panel.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs?.map((c, idx) => (
            <motion.article
              key={c._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass flex flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
              data-aos="fade-up"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                    {c.name}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {c.issuer}
                  </p>
                </div>
                {c.logoUrl ? (
                  <img src={c.logoUrl} alt="" className="size-11 shrink-0 rounded-xl object-contain" loading="lazy" />
                ) : (
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
                    <FileText className="size-5" style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                )}
              </div>

              <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {c.issueDate ? format(new Date(c.issueDate), 'MMM yyyy') : ''}
              </p>

              {c.description ? (
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {c.description}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2">
                {c.pdfUrl ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreview(c)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:opacity-90 sm:flex-none"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      <FileText className="size-4" /> View
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadPdf(c.pdfUrl!, `${c.name.replace(/\s+/g, '_')}.pdf`)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white transition hover:opacity-95 btn-primary sm:flex-none"
                    >
                      <Download className="size-4" /> Download
                    </button>
                  </>
                ) : null}
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:opacity-90 sm:flex-none"
                    style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                  >
                    <ExternalLink className="size-4" /> Verify
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Dialog.Root open={Boolean(preview)} onOpenChange={(o) => !o && setPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/65 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-[90] flex h-[min(88vh,900px)] w-[min(94vw,920px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
          >
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: 'var(--color-border)' }}>
              <Dialog.Title className="pr-4 font-medium" style={{ color: 'var(--color-text)' }}>
                {preview?.name}
              </Dialog.Title>
              <Dialog.Close
                className="rounded-xl border p-2 transition hover:opacity-90"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                aria-label="Close"
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>
            {preview?.pdfUrl ? (
              <iframe title="Certificate PDF" src={preview.pdfUrl} className="min-h-0 min-w-0 flex-1 bg-white" />
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
