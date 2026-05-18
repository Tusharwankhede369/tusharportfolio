import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export const inputClass =
  'mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/30';

export const inputStyle = {
  borderColor: 'var(--color-border)',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
} as const;

export function AdminField({
  label,
  name,
  defaultValue = '',
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
        style={inputStyle}
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  name,
  defaultValue = '',
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={inputClass}
        style={inputStyle}
      />
    </label>
  );
}

export function EditDialog({
  open,
  title,
  onClose,
  children,
  formId,
  saving,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  formId: string;
  saving?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[110] flex max-h-[min(90vh,720px)] w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border shadow-2xl outline-none"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
            <Dialog.Title className="font-display text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" className="rounded-lg p-2" style={{ color: 'var(--color-text-muted)' }} aria-label="Close">
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          <div className="flex justify-end gap-3 border-t px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
            <Button type="button" variant="outline" className="rounded-2xl" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form={formId} className="rounded-2xl" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function AdminRowActions({
  onEdit,
  onDelete,
  deleteLabel = 'Delete',
}: {
  onEdit: () => void;
  onDelete: () => void;
  deleteLabel?: string;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={onEdit}>
        Edit
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="rounded-xl"
        style={{ color: 'var(--accent-danger)' }}
        onClick={onDelete}
      >
        {deleteLabel}
      </Button>
    </div>
  );
}
