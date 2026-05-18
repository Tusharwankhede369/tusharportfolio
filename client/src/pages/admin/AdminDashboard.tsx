import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings2,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { AboutPanel } from '@/pages/admin/panels/aboutPanel';
import { ProjectsPanel } from '@/pages/admin/panels/projectsPanel';
import { CertificationsPanel } from '@/pages/admin/panels/certificationsPanel';
import { cn } from '@/lib/utils';

type TabKey =
  | 'overview'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'achievements'
  | 'certifications'
  | 'education'
  | 'settings'
  | 'media';

const NAV: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'about', label: 'Profile', icon: UserRound },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'skills', label: 'Skills', icon: Sparkles },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'achievements', label: 'Achievements', icon: Award },
  { key: 'certifications', label: 'Certifications', icon: Medal },
  { key: 'education', label: 'Education', icon: BookOpen },
  { key: 'settings', label: 'Settings', icon: Settings2 },
  { key: 'media', label: 'Media', icon: ImageIcon },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<TabKey>('overview');
  const { logout } = useAuth();
  const nav = useNavigate();

  const dashboard = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/dashboard');
      return data as {
        counts: Record<string, number>;
        activityLog: { action: string; resource: string; at: string }[];
      };
    },
  });

  const skills = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/skills');
      return data as {
        _id: string;
        name: string;
        category: string;
        proficiency: number;
      }[];
    },
    enabled: tab === 'overview' || tab === 'skills',
  });

  const chartData = useMemo(() => {
    const map = new Map<string, { cat: string; avg: number; n: number }>();
    skills.data?.forEach((s) => {
      const prev = map.get(s.category) ?? { cat: s.category, avg: 0, n: 0 };
      prev.avg += s.proficiency;
      prev.n += 1;
      map.set(s.category, prev);
    });
    return [...map.values()].map((x) => ({
      cat: x.cat,
      avg: Math.round(x.avg / Math.max(1, x.n)),
    }));
  }, [skills.data]);

  async function handleLogout() {
    await logout();
    nav('/admin/login', { replace: true });
  }

  return (
    <div
      id="admin-dashboard"
      className="flex min-h-screen"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <aside
        className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r px-5 py-8 backdrop-blur-xl md:flex"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-600">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Portfolio</p>
            <p className="font-display text-sm font-semibold text-white">Control center</p>
          </div>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition',
                tab === item.key
                  ? 'border border-emerald-500/25 bg-gradient-to-r from-emerald-500/15 to-violet-600/10 text-white shadow-[0_20px_50px_-36px_rgba(0,0,0,0.45)]'
                  : 'text-slate-400 hover:bg-white/[0.04]'
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <Button variant="outline" className="mb-3 mt-auto rounded-2xl" asChild>
          <Link to="/">← View portfolio</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl"
          onClick={() => void handleLogout()}
        >
          <LogOut className="size-4" /> Sign out
        </Button>
      </aside>

      <main className="flex-1 px-4 py-10 md:px-10">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 md:hidden">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Admin</p>
            <p className="font-display text-xl font-semibold text-white">{NAV.find((n) => n.key === tab)?.label}</p>
          </div>
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value as TabKey)}
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm"
          >
            {NAV.map((n) => (
              <option key={n.key} value={n.key}>
                {n.label}
              </option>
            ))}
          </select>
        </header>

        {tab === 'overview' && (
          <section className="space-y-8">
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(dashboard.data?.counts ?? {}).map(([k, v]) => (
                <div key={k} className="glass rounded-3xl p-6">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{k}</p>
                  <p className="mt-3 font-display text-3xl font-semibold text-white">{v}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="glass rounded-3xl p-6">
                <p className="text-sm font-semibold text-white">Skill proficiency by category</p>
                <div className="mt-6 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="cat" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          background: '#0b0d14',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          color: '#e2e8f0',
                        }}
                      />
                      <Bar dataKey="avg" fill="url(#barGrad)" radius={[10, 10, 0, 0]} />
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Activity className="size-4 text-emerald-300" /> Recent activity
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  {dashboard.data?.activityLog?.length ? (
                    dashboard.data.activityLog.map((a, i) => (
                      <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <p className="text-slate-200">
                          <span className="font-medium text-emerald-200">{a.action}</span>{' '}
                          <span className="text-slate-500">·</span> {a.resource}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          {new Date(a.at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No activity yet.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'about' && <AboutPanel />}
        {tab === 'projects' && <ProjectsPanel />}
        {tab === 'skills' && <SkillsPanel />}
        {tab === 'experience' && <ExperiencePanel />}
        {tab === 'achievements' && <AchievementsPanel />}
        {tab === 'certifications' && <CertificationsPanel />}
        {tab === 'education' && <EducationPanel />}
        {tab === 'settings' && <SettingsPanel />}
        {tab === 'media' && <MediaPanel />}

      </main>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
      />
    </label>
  );
}


function SkillsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const list = useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/skills');
      return data as Record<string, unknown>[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-skills'] });
    void qc.invalidateQueries({ queryKey: ['skills'] });
  };

  const create = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => api.post('/api/admin/skills', payload),
    onSuccess: () => {
      toast.success('Skill added');
      invalidate();
    },
    onError: () => toast.error('Could not add skill'),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.put(`/api/admin/skills/${id}`, payload),
    onSuccess: () => {
      toast.success('Skill updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Could not update skill'),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/skills/${id}`),
    onSuccess: () => {
      toast.success('Skill removed');
      invalidate();
    },
    onError: () => toast.error('Could not remove skill'),
  });

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    create.mutate({
      name: String(fd.get('name') ?? ''),
      category: String(fd.get('category') ?? ''),
      proficiency: Number(fd.get('proficiency') ?? 0),
      iconUrl: String(fd.get('iconUrl') ?? ''),
      iconEmoji: String(fd.get('iconEmoji') ?? ''),
    });
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    update.mutate({
      id: String(editing._id),
      payload: {
        name: String(fd.get('name') ?? ''),
        category: String(fd.get('category') ?? ''),
        proficiency: Number(fd.get('proficiency') ?? 0),
        iconUrl: String(fd.get('iconUrl') ?? ''),
        iconEmoji: String(fd.get('iconEmoji') ?? ''),
      },
    });
  }

  const editId = editing ? `edit-skill-${String(editing._id)}` : '';

  return (
    <div className="space-y-8">
      <form onSubmit={onCreate} className="glass rounded-[2rem] p-8">
        <p className="font-display text-lg font-semibold text-white">Add new skill</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" name="name" defaultValue="" />
          <Field label="Category" name="category" defaultValue="Frontend" />
          <Field label="Proficiency (%)" name="proficiency" defaultValue="80" type="number" />
          <Field label="Icon emoji" name="iconEmoji" defaultValue="" />
        </div>
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Icon URL
          <input
            name="iconUrl"
            placeholder="https://..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <Button type="submit" className="rounded-2xl mt-3">
          Add skill
        </Button>
      </form>

      {editing ? (
        <form id={editId} onSubmit={onEdit} className="glass rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold text-white">Edit skill</p>
            <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" defaultValue={String(editing?.name ?? '')} />
            <Field label="Category" name="category" defaultValue={String(editing?.category ?? '')} />
            <Field label="Proficiency (%)" name="proficiency" type="number" defaultValue={String(editing?.proficiency ?? '80')} />
            <Field label="Icon emoji" name="iconEmoji" defaultValue={String(editing?.iconEmoji ?? '')} />
          </div>
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Icon URL
            <input
              name="iconUrl"
              defaultValue={String(editing?.iconUrl ?? '')}
              placeholder="https://..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <Button type="submit" className="rounded-2xl mt-3" disabled={update.isPending}>
            Save changes
          </Button>
        </form>
      ) : null}

      <div className="glass divide-y divide-white/10 rounded-[2rem]">
        {list.data?.map((s) => (
          <div key={String(s._id)} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/20">
                {String(s.iconUrl || '').trim() ? (
                  <img src={String(s.iconUrl)} alt={String(s.name ?? 'skill icon')} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-lg text-white">{String(s.iconEmoji ?? '◆')}</span>
                )}
              </div>
              <div>
                <p className="font-medium text-white">{String(s.name)}</p>
                <p className="text-xs text-slate-400">
                  {String(s.category ?? '')} · {String(s.proficiency ?? '')}%
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(s)}>
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-rose-300"
                onClick={() => {
                  if (confirm('Delete this skill?')) remove.mutate(String(s._id));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperiencePanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const list = useQuery({
    queryKey: ['admin-experience'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/experience');
      return data as Record<string, unknown>[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-experience'] });
    void qc.invalidateQueries({ queryKey: ['experience'] });
  };

  const create = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => api.post('/api/admin/experience', payload),
    onSuccess: () => {
      toast.success('Experience added');
      invalidate();
    },
    onError: () => toast.error('Could not add experience'),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.put(`/api/admin/experience/${id}`, payload),
    onSuccess: () => {
      toast.success('Experience updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Could not update experience'),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/experience/${id}`),
    onSuccess: () => {
      toast.success('Experience removed');
      invalidate();
    },
    onError: () => toast.error('Could not remove experience'),
  });

  function buildResponsibilities(value: unknown) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return String(value)
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    create.mutate({
      company: String(fd.get('company') ?? ''),
      role: String(fd.get('role') ?? ''),
      location: String(fd.get('location') ?? ''),
      employmentType: String(fd.get('employmentType') ?? ''),
      startDate: String(fd.get('startDate') ?? ''),
      endDate: String(fd.get('endDate') ?? '') || null,
      description: String(fd.get('description') ?? ''),
      technologies: String(fd.get('technologies') ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: buildResponsibilities(fd.get('responsibilities')),
      logoUrl: String(fd.get('logoUrl') ?? ''),
      published: true,
    });
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    update.mutate({
      id: String(editing._id),
      payload: {
        company: String(fd.get('company') ?? ''),
        role: String(fd.get('role') ?? ''),
        location: String(fd.get('location') ?? ''),
        employmentType: String(fd.get('employmentType') ?? ''),
        startDate: String(fd.get('startDate') ?? ''),
        endDate: String(fd.get('endDate') ?? '') || null,
        description: String(fd.get('description') ?? ''),
        technologies: String(fd.get('technologies') ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        responsibilities: buildResponsibilities(fd.get('responsibilities')),
        logoUrl: String(fd.get('logoUrl') ?? ''),
        published: true,
      },
    });
  }

  const editId = editing ? `edit-exp-${String(editing._id)}` : '';

  return (
    <div className="space-y-8">
      <form onSubmit={onCreate} className="glass rounded-[2rem] p-8">
        <p className="font-display text-lg font-semibold text-white">Add experience</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Company" name="company" defaultValue="" />
          <Field label="Role" name="role" defaultValue="" />
          <Field label="Location" name="location" defaultValue="" />
          <Field label="Logo URL" name="logoUrl" defaultValue="" />
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Type
            <select
              name="employmentType"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
              defaultValue="onsite"
            >
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </label>
          <Field label="Start date" name="startDate" type="date" defaultValue="" />
          <Field label="End date" name="endDate" type="date" defaultValue="" />
        </div>
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Description
          <textarea
            name="description"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Technologies (comma-separated)
          <input
            name="technologies"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Responsibilities (one per line)
          <textarea
            name="responsibilities"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <Button type="submit" className="rounded-2xl">
          Add experience
        </Button>
      </form>

      {editing ? (
        <form id={editId} onSubmit={onEdit} className="glass rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold text-white">Edit experience</p>
            <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company" name="company" defaultValue={String(editing.company ?? '')} />
            <Field label="Role" name="role" defaultValue={String(editing.role ?? '')} />
            <Field label="Location" name="location" defaultValue={String(editing.location ?? '')} />
            <Field label="Logo URL" name="logoUrl" defaultValue={String(editing.logoUrl ?? '')} />
            <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
              Type
              <select
                name="employmentType"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
                defaultValue={String(editing.employmentType ?? 'onsite')}
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </label>
            <Field label="Start date" name="startDate" type="date" defaultValue={String(editing.startDate ?? '')} />
            <Field label="End date" name="endDate" type="date" defaultValue={String(editing.endDate ?? '')} />
          </div>
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Description
            <textarea
              name="description"
              defaultValue={String(editing.description ?? '')}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Technologies (comma-separated)
            <input
              name="technologies"
              defaultValue={String((editing.technologies as string[] | undefined)?.join(', ') ?? '')}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Responsibilities (one per line)
            <textarea
              name="responsibilities"
              defaultValue={String((editing.responsibilities as string[] | undefined)?.join('\n') ?? '')}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <Button type="submit" className="rounded-2xl">
            Save experience
          </Button>
        </form>
      ) : null}

      <div className="glass divide-y divide-white/10 rounded-[2rem]">
        {list.data?.map((x) => (
          <div key={String(x._id)} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="font-medium text-white">{String(x.company)}</p>
              <p className="text-xs text-slate-400">{String(x.role)}</p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(x)}>
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-rose-300"
                onClick={() => {
                  if (confirm('Delete this experience entry?')) remove.mutate(String(x._id));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const list = useQuery({
    queryKey: ['admin-achievements'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/achievements');
      return data as Record<string, unknown>[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-achievements'] });
    void qc.invalidateQueries({ queryKey: ['achievements'] });
  };

  const create = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => api.post('/api/admin/achievements', payload),
    onSuccess: () => {
      toast.success('Achievement added');
      invalidate();
    },
    onError: () => toast.error('Could not add achievement'),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.put(`/api/admin/achievements/${id}`, payload),
    onSuccess: () => {
      toast.success('Achievement updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Could not update achievement'),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/achievements/${id}`),
    onSuccess: () => {
      toast.success('Achievement removed');
      invalidate();
    },
    onError: () => toast.error('Could not remove achievement'),
  });

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    create.mutate({
      title: String(fd.get('title') ?? ''),
      description: String(fd.get('description') ?? ''),
      organization: String(fd.get('organization') ?? ''),
      statHighlight: String(fd.get('statHighlight') ?? ''),
      published: true,
    });
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    update.mutate({
      id: String(editing._id),
      payload: {
        title: String(fd.get('title') ?? ''),
        description: String(fd.get('description') ?? ''),
        organization: String(fd.get('organization') ?? ''),
        statHighlight: String(fd.get('statHighlight') ?? ''),
        published: true,
      },
    });
  }

  const editId = editing ? `edit-achievement-${String(editing._id)}` : '';

  return (
    <div className="space-y-8">
      <form onSubmit={onCreate} className="glass rounded-[2rem] p-8">
        <p className="font-display text-lg font-semibold text-white">Add achievement</p>
        <Field label="Title" name="title" defaultValue="" />
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Description
          <textarea
            name="description"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Organization" name="organization" defaultValue="" />
          <Field label="Highlight badge" name="statHighlight" defaultValue="" />
        </div>
        <Button type="submit" className="rounded-2xl">
          Add achievement
        </Button>
      </form>

      {editing ? (
        <form id={editId} onSubmit={onEdit} className="glass rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold text-white">Edit achievement</p>
            <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
          <Field label="Title" name="title" defaultValue={String(editing.title ?? '')} />
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Description
            <textarea
              name="description"
              defaultValue={String(editing.description ?? '')}
              rows={4}
              className="mt-2 w-full rounded-2rem border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Organization" name="organization" defaultValue={String(editing.organization ?? '')} />
            <Field label="Highlight badge" name="statHighlight" defaultValue={String(editing.statHighlight ?? '')} />
          </div>
          <Button type="submit" className="rounded-2xl">
            Save achievement
          </Button>
        </form>
      ) : null}

      <div className="glass divide-y divide-white/10 rounded-[2rem]">
        {list.data?.map((item) => (
          <div key={String(item._id)} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="font-medium text-white">{String(item.title)}</p>
              <p className="text-xs text-slate-400">{String(item.organization ?? '')}</p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(item)}>
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-rose-300"
                onClick={() => {
                  if (confirm('Delete this achievement?')) remove.mutate(String(item._id));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function EducationPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const list = useQuery({
    queryKey: ['admin-education'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/education');
      return data as Record<string, unknown>[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ['admin-education'] });
    void qc.invalidateQueries({ queryKey: ['education'] });
  };

  const create = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => api.post('/api/admin/education', payload),
    onSuccess: () => {
      toast.success('Education entry added');
      invalidate();
    },
    onError: () => toast.error('Could not add education'),
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.put(`/api/admin/education/${id}`, payload),
    onSuccess: () => {
      toast.success('Education updated');
      setEditing(null);
      invalidate();
    },
    onError: () => toast.error('Could not update education'),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/education/${id}`),
    onSuccess: () => {
      toast.success('Education entry removed');
      invalidate();
    },
    onError: () => toast.error('Could not remove education'),
  });

  function buildHighlights(value: unknown) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return String(value)
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    create.mutate({
      institution: String(fd.get('institution') ?? ''),
      degree: String(fd.get('degree') ?? ''),
      field: String(fd.get('field') ?? ''),
      grade: String(fd.get('grade') ?? ''),
      university: String(fd.get('university') ?? ''),
      location: String(fd.get('location') ?? ''),
      highlights: buildHighlights(fd.get('highlights')),
      startDate: String(fd.get('startDate') ?? ''),
      endDate: String(fd.get('endDate') ?? ''),
    });
    e.currentTarget.reset();
  }

  function onEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData(e.currentTarget);
    update.mutate({
      id: String(editing._id),
      payload: {
        institution: String(fd.get('institution') ?? ''),
        degree: String(fd.get('degree') ?? ''),
        field: String(fd.get('field') ?? ''),
        grade: String(fd.get('grade') ?? ''),
        university: String(fd.get('university') ?? ''),
        location: String(fd.get('location') ?? ''),
        highlights: buildHighlights(fd.get('highlights')),
        startDate: String(fd.get('startDate') ?? ''),
        endDate: String(fd.get('endDate') ?? ''),
      },
    });
  }

  const editId = editing ? `edit-education-${String(editing._id)}` : '';

  return (
    <div className="space-y-8">
      <form onSubmit={onCreate} className="glass rounded-[2rem] p-8">
        <p className="font-display text-lg font-semibold text-white">Add education</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Institution" name="institution" defaultValue="" />
          <Field label="Degree" name="degree" defaultValue="" />
          <Field label="Field" name="field" defaultValue="" />
          <Field label="Grade / CGPA" name="grade" defaultValue="" />
          <Field label="University" name="university" defaultValue="" />
          <Field label="Location" name="location" defaultValue="" />
        </div>
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Highlights (one per line)
          <textarea
            name="highlights"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Start date" name="startDate" type="date" defaultValue="" />
          <Field label="End date" name="endDate" type="date" defaultValue="" />
        </div>
        <Button type="submit" className="rounded-2xl">
          Add education
        </Button>
      </form>

      {editing ? (
        <form id={editId} onSubmit={onEdit} className="glass rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold text-white">Edit education</p>
            <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Institution" name="institution" defaultValue={String(editing.institution ?? '')} />
            <Field label="Degree" name="degree" defaultValue={String(editing.degree ?? '')} />
            <Field label="Field" name="field" defaultValue={String(editing.field ?? '')} />
            <Field label="Grade / CGPA" name="grade" defaultValue={String(editing.grade ?? '')} />
            <Field label="University" name="university" defaultValue={String(editing.university ?? '')} />
            <Field label="Location" name="location" defaultValue={String(editing.location ?? '')} />
          </div>
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
            Highlights (one per line)
            <textarea
              name="highlights"
              defaultValue={String((editing.highlights as string[] | undefined)?.join('\n') ?? '')}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Start date" name="startDate" type="date" defaultValue={String(editing.startDate ?? '')} />
            <Field label="End date" name="endDate" type="date" defaultValue={String(editing.endDate ?? '')} />
          </div>
          <Button type="submit" className="rounded-2xl">
            Save education
          </Button>
        </form>
      ) : null}

      <div className="glass divide-y divide-white/10 rounded-[2rem]">
        {list.data?.map((item) => (
          <div key={String(item._id)} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="font-medium text-white">{String(item.institution)}</p>
              <p className="text-xs text-slate-400">
                {String(item.degree ?? '')} {item.field ? `· ${String(item.field)}` : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditing(item)}>
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-rose-300"
                onClick={() => {
                  if (confirm('Delete this education entry?')) remove.mutate(String(item._id));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const qc = useQueryClient();
  const settings = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data } = await api.get('/api/admin/settings');
      return data as Record<string, unknown>;
    },
  });

  const save = useMutation({
    mutationFn: async (payload: { seo: Record<string, string>; socialLinks: Record<string, string> }) => {
      await api.put('/api/admin/settings', payload);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['settings-public'] });
      toast.success('Settings saved');
    },
  });

  const uploadResume = useMutation({
    mutationFn: async (fd: FormData) => {
      await api.post('/api/admin/settings/resume', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['settings-public'] });
      toast.success('Resume uploaded');
    },
    onError: () => toast.error('Upload failed'),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    save.mutate({
      seo: {
        metaTitle: String(fd.get('metaTitle') ?? ''),
        metaDescription: String(fd.get('metaDescription') ?? ''),
        keywords: String(fd.get('keywords') ?? ''),
      },
      socialLinks: {
        linkedIn: String(fd.get('linkedIn') ?? ''),
        github: String(fd.get('github') ?? ''),
      },
    });
  }

  function onResume(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    uploadResume.mutate(new FormData(e.currentTarget));
    e.currentTarget.reset();
  }

  const s = settings.data ?? {};
  const seo = (s.seo as Record<string, string>) ?? {};
  const social = (s.socialLinks as Record<string, string>) ?? {};

  return settings.isLoading ? (
    <p className="text-sm text-slate-400">Loading…</p>
  ) : (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="glass max-w-3xl space-y-4 rounded-[2rem] p-8">
        <Field label="Meta title" name="metaTitle" defaultValue={seo.metaTitle ?? ''} />
        <label className="block text-xs uppercase tracking-[0.22em] text-slate-500">
          Meta description
          <textarea
            name="metaDescription"
            defaultValue={seo.metaDescription ?? ''}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/40"
          />
        </label>
        <Field label="Keywords" name="keywords" defaultValue={seo.keywords ?? ''} />

        <Field label="LinkedIn" name="linkedIn" defaultValue={social.linkedIn ?? ''} />
        <Field label="GitHub" name="github" defaultValue={social.github ?? ''} />

        <Button type="submit" className="rounded-2xl" disabled={save.isPending}>
          Save SEO & social links
        </Button>
      </form>

      <form onSubmit={onResume} className="glass max-w-3xl space-y-4 rounded-[2rem] p-8">
        <p className="text-sm font-semibold text-white">Resume PDF</p>
        <input name="resume" type="file" accept="application/pdf" required className="block w-full text-sm text-slate-300" />
        <Button type="submit" className="rounded-2xl" disabled={uploadResume.isPending}>
          Upload resume
        </Button>
      </form>
    </div>
  );
}

function MediaPanel() {
  const qc = useQueryClient();
  const upload = useMutation({
    mutationFn: async (fd: FormData) => {
      const { data } = await api.post<{ url: string }>('/api/admin/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.url;
    },
    onSuccess: (url) => {
      toast.success('Uploaded');
      void navigator.clipboard.writeText(url);
      void qc.invalidateQueries();
      toast.message(url);
    },
    onError: () => toast.error('Upload failed'),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    upload.mutate(fd);
  }

  return (
    <form onSubmit={onSubmit} className="glass max-w-xl space-y-4 rounded-[2rem] p-8">
      <p className="text-sm text-slate-400">
        Upload images or documents. The returned URL is copied to your clipboard for use in content modules.
      </p>
      <input name="file" type="file" required className="block w-full text-sm text-slate-300" />
      <Button type="submit" className="rounded-2xl" disabled={upload.isPending}>
        Upload to library
      </Button>
    </form>
  );
}
