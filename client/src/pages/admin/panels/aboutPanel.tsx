import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminField, AdminTextarea, inputClass, inputStyle } from '@/components/admin/adminUi';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

export function AboutPanel() {
  const qc = useQueryClient();
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const about = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data } = await api.get('/api/about');
      return data as Record<string, unknown>;
    },
  });

  const save = useMutation({
    mutationFn: async (fd: FormData) => {
      await api.put('/api/admin/about', fd);
    },
    onSuccess: () => {
      toast.success('Profile updated');
      void qc.invalidateQueries({ queryKey: ['about'] });
      setPhotoFile(null);
    },
    onError: () => toast.error('Update failed'),
  });

  const clearPhoto = useMutation({
    mutationFn: async () => api.delete('/api/admin/about/photo'),
    onSuccess: () => {
      toast.success('Profile photo removed');
      void qc.invalidateQueries({ queryKey: ['about'] });
    },
    onError: () => toast.error('Could not remove photo'),
  });

  if (!about.data) return <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>;

  const d = about.data;
  const photo = String(d.photoUrl ?? '');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (photoFile) fd.set('photo', photoFile);
    save.mutate(fd);
  }

  function onPhotoOnly(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!photoFile) {
      toast.error('Choose an image first');
      return;
    }
    const fd = new FormData();
    fd.set('photo', photoFile);
    save.mutate(fd);
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="glass rounded-[2rem] p-8">
        <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
          Profile photo
        </h3>
        <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          JPG / PNG / WebP · shown in hero and about section
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-6">
          <div
            className="flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
          >
            {photo ? (
              <img src={photo} alt="Current profile" className="size-full object-cover" />
            ) : (
              <span className="px-3 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                No photo yet
              </span>
            )}
          </div>
          <form onSubmit={onPhotoOnly} className="flex min-w-[220px] flex-1 flex-col gap-3">
            <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
              Choose image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="mt-2 block w-full text-sm"
                onChange={(ev) => setPhotoFile(ev.target.files?.[0] ?? null)}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" className="rounded-2xl" disabled={save.isPending || !photoFile}>
                Upload profile photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl"
                disabled={!photo || clearPhoto.isPending}
                onClick={() => clearPhoto.mutate()}
              >
                Remove photo
              </Button>
            </div>
          </form>
        </div>
      </div>

      <form key={String(d._id ?? 'about')} onSubmit={onSubmit} className="glass space-y-5 rounded-[2rem] p-8">
        <AdminField label="Name" name="name" defaultValue={String(d.name ?? '')} />
        <AdminField label="Title" name="title" defaultValue={String(d.title ?? '')} />
        <AdminField label="Tagline" name="tagline" defaultValue={String(d.tagline ?? '')} />
        <AdminTextarea label="Professional summary" name="professionalSummary" defaultValue={String(d.professionalSummary ?? '')} rows={6} />
        <AdminTextarea label="Short bio (optional)" name="bio" defaultValue={String(d.bio ?? '')} rows={4} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="Email" name="email" defaultValue={String(d.email ?? '')} />
          <AdminField label="Phone" name="phone" defaultValue={String(d.phone ?? '')} />
        </div>
        <AdminField label="Location" name="location" defaultValue={String(d.location ?? '')} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={String(d.linkedInUrl ?? '')} />
          <AdminField label="GitHub URL" name="githubUrl" defaultValue={String(d.githubUrl ?? '')} />
        </div>
        <label className="block text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
          Hero roles (comma-separated)
          <input
            name="heroRoles"
            defaultValue={(d.heroRoles as string[] | undefined)?.join(', ') ?? ''}
            className={inputClass}
            style={inputStyle}
          />
        </label>
        <Button type="submit" className="rounded-2xl" disabled={save.isPending}>
          Save profile details
        </Button>
      </form>
    </div>
  );
}
