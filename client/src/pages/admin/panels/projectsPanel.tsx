import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminField, AdminRowActions, AdminTextarea, EditDialog } from '@/components/admin/adminUi';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

type Row = Record<string, unknown>;

function toList(v: unknown): string {
  if (Array.isArray(v)) return v.join(', ');
  return String(v ?? '');
}

function parseList(s: string) {
  return s
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function ProjectsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);

  const list = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/projects');
      return data as Row[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-projects'] });
    void qc.invalidateQueries({ queryKey: ['projects'] });
  };

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/projects/${id}`),
    onSuccess: () => {
      toast.success('Project deleted');
      invalidate();
    },
  });

  const create = useMutation({
    mutationFn: async (fd: FormData) => {
      await api.post('/api/admin/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      toast.success('Project created');
      invalidate();
    },
    onError: () => toast.error('Could not create'),
  });

  const update = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: FormData }) => {
      await api.put(`/api/admin/projects/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => {
      toast.success('Project updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Update failed'),
  });

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('technologies', JSON.stringify(parseList(String(fd.get('technologies') ?? ''))));
    fd.set('features', JSON.stringify(parseList(String(fd.get('features') ?? ''))));
    create.mutate(fd);
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    fd.set('technologies', JSON.stringify(parseList(String(fd.get('technologies') ?? ''))));
    fd.set('features', JSON.stringify(parseList(String(fd.get('features') ?? ''))));
    update.mutate({ id: String(editing._id), fd });
  }

  const editId = editing ? `edit-project-${String(editing._id)}` : '';

  return (
    <div className="space-y-10">
      <form onSubmit={onCreate} className="glass max-w-4xl space-y-4 rounded-4xl p-8">
        <p className="font-display text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
          New project
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Category" name="category" defaultValue="Full Stack" />
        </div>
        <AdminTextarea label="Description" name="description" rows={4} />
        <AdminField label="Technologies (comma-separated)" name="technologies" />
        <AdminTextarea label="Features (comma or line-separated)" name="features" rows={4} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="Demo URL" name="demoUrl" />
          <AdminField label="Repo URL" name="repoUrl" />
        </div>
        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
          <input type="checkbox" name="featured" value="true" /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
          <input type="checkbox" name="published" value="true" defaultChecked /> Published
        </label>
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          Thumbnail
          <input name="thumbnail" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
        </label>
        <Button type="submit" className="rounded-2xl" disabled={create.isPending}>
          Create project
        </Button>
      </form>

      <div className="glass overflow-hidden rounded-4xl">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b text-[11px] uppercase tracking-[0.22em]" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.data?.map((p) => (
              <tr key={String(p._id)} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <td className="px-6 py-4" style={{ color: 'var(--color-text)' }}>
                  {String(p.name)}
                </td>
                <td className="px-6 py-4" style={{ color: 'var(--color-text-muted)' }}>
                  {String(p.category ?? '')}
                </td>
                <td className="px-6 py-4">
                  <AdminRowActions
                    onEdit={() => setEditing(p)}
                    onDelete={() => {
                      if (confirm('Delete this project?')) remove.mutate(String(p._id));
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditDialog
        open={Boolean(editing)}
        title="Edit project"
        onClose={() => setEditing(null)}
        formId={editId}
        saving={update.isPending}
      >
        {editing ? (
          <form id={editId} onSubmit={onEdit} className="space-y-4">
            <AdminField label="Name" name="name" defaultValue={String(editing.name ?? '')} required />
            <AdminField label="Category" name="category" defaultValue={String(editing.category ?? '')} />
            <AdminTextarea label="Description" name="description" defaultValue={String(editing.description ?? '')} rows={4} />
            <AdminField label="Technologies" name="technologies" defaultValue={toList(editing.technologies)} />
            <AdminTextarea label="Features" name="features" defaultValue={toList(editing.features)} rows={4} />
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Demo URL" name="demoUrl" defaultValue={String(editing.demoUrl ?? '')} />
              <AdminField label="Repo URL" name="repoUrl" defaultValue={String(editing.repoUrl ?? '')} />
            </div>
            <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
              New thumbnail (optional)
              <input name="thumbnail" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
            </label>
          </form>
        ) : null}
      </EditDialog>
    </div>
  );
}
