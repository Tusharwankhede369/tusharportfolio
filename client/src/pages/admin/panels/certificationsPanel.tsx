import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminField, AdminRowActions, AdminTextarea, EditDialog } from '@/components/admin/adminUi';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

type Row = Record<string, unknown>;

function dateInput(v: unknown) {
  if (!v) return '';
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export function CertificationsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);

  const list = useQuery({
    queryKey: ['admin-certifications'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/certifications');
      return data as Row[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-certifications'] });
    void qc.invalidateQueries({ queryKey: ['certifications'] });
  };

  const create = useMutation({
    mutationFn: async (fd: FormData) => {
      await api.post('/api/admin/certifications', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      toast.success('Certification added');
      invalidate();
    },
    onError: () => toast.error('Could not save'),
  });

  const update = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: FormData }) => {
      await api.put(`/api/admin/certifications/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      toast.success('Certification updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Update failed'),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/certifications/${id}`),
    onSuccess: () => {
      toast.success('Deleted');
      invalidate();
    },
  });

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    create.mutate(new FormData(e.currentTarget));
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    update.mutate({ id: String(editing._id), fd: new FormData(e.currentTarget) });
  }

  const editId = editing ? `edit-cert-${String(editing._id)}` : '';

  return (
    <div className="space-y-10">
      <form onSubmit={onCreate} className="glass max-w-3xl space-y-4 rounded-4xl p-8">
        <p className="font-display text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
          Add certification
        </p>
        <AdminField label="Name" name="name" required />
        <AdminField label="Issuer" name="issuer" />
        <AdminField label="Issue date (YYYY-MM-DD)" name="issueDate" type="date" />
        <AdminField label="Credential URL" name="credentialUrl" />
        <AdminTextarea label="Description" name="description" rows={3} />
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          PDF
          <input name="pdf" type="file" accept="application/pdf" className="mt-2 block w-full text-sm" />
        </label>
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          Issuer logo
          <input name="logo" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
        </label>
        <Button type="submit" className="rounded-2xl" disabled={create.isPending}>
          Save certification
        </Button>
      </form>

      <div className="glass divide-y rounded-4xl" style={{ borderColor: 'var(--color-border)' }}>
        {list.data?.map((c) => (
          <div
            key={String(c._id)}
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                {String(c.name)}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {String(c.issuer ?? '')}
              </p>
            </div>
            <AdminRowActions
              onEdit={() => setEditing(c)}
              onDelete={() => {
                if (confirm('Delete this certification?')) remove.mutate(String(c._id));
              }}
            />
          </div>
        ))}
      </div>

      <EditDialog
        open={Boolean(editing)}
        title="Edit certification"
        onClose={() => setEditing(null)}
        formId={editId}
        saving={update.isPending}
      >
        {editing ? (
          <form id={editId} onSubmit={onEdit} className="space-y-4">
            <AdminField label="Name" name="name" defaultValue={String(editing.name ?? '')} required />
            <AdminField label="Issuer" name="issuer" defaultValue={String(editing.issuer ?? '')} />
            <AdminField label="Issue date" name="issueDate" type="date" defaultValue={dateInput(editing.issueDate)} />
            <AdminField label="Credential URL" name="credentialUrl" defaultValue={String(editing.credentialUrl ?? '')} />
            <AdminTextarea label="Description" name="description" defaultValue={String(editing.description ?? '')} rows={3} />
            <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
              Replace PDF (optional)
              <input name="pdf" type="file" accept="application/pdf" className="mt-2 block w-full text-sm" />
            </label>
            <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
              Replace logo (optional)
              <input name="logo" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
            </label>
          </form>
        ) : null}
      </EditDialog>
    </div>
  );
}
