import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type {
  AboutData,
  AchievementItem,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SiteSettings,
  SkillItem,
} from '@/types/portfolio';

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data } = await api.get<AboutData>('/api/about');
      return data;
    },
  });
}

export function useProjects(tag?: string) {
  return useQuery({
    queryKey: ['projects', tag],
    queryFn: async () => {
      const { data } = await api.get<ProjectItem[]>('/api/projects', {
        params: tag && tag !== 'All' ? { tag } : undefined,
      });
      return data;
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get<SkillItem[]>('/api/skills');
      return data;
    },
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data } = await api.get<ExperienceItem[]>('/api/experience');
      return data;
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data } = await api.get<AchievementItem[]>('/api/achievements');
      return data;
    },
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data } = await api.get<CertificationItem[]>('/api/certifications');
      return data;
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data } = await api.get<EducationItem[]>('/api/education');
      return data;
    },
  });
}

export function usePublicSettings() {
  return useQuery({
    queryKey: ['settings-public'],
    queryFn: async () => {
      const { data } = await api.get<SiteSettings>('/api/settings');
      return data;
    },
  });
}
