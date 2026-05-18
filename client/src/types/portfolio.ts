export type AboutData = {
  _id?: string;
  name: string;
  title: string;
  tagline?: string;
  bio?: string;
  professionalSummary?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  heroRoles?: string[];
  heroIntro?: string;
  resumeUrl?: string;
  yearsOfExperience?: number;
  projectsCompleted?: number;
  technologiesMastered?: number;
};

export type ProjectItem = {
  _id: string;
  name: string;
  description?: string;
  longDescription?: string;
  technologies?: string[];
  thumbnailUrl?: string;
  images?: string[];
  demoUrl?: string;
  repoUrl?: string;
  features?: string[];
  challenges?: string[];
  impact?: string;
  achievements?: string[];
  featured?: boolean;
  published?: boolean;
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string | null;
};

export type SkillItem = {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  iconUrl?: string;
  iconEmoji?: string;
  order?: number;
};

export type ExperienceItem = {
  _id: string;
  company: string;
  role: string;
  location?: string;
  employmentType?: string;
  description?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string | null;
  responsibilities?: string[];
  metrics?: { label: string; value: string }[];
};

export type AchievementItem = {
  _id: string;
  title: string;
  description?: string;
  organization?: string;
  statHighlight?: string;
  date?: string;
  awardType?: string;
  icon?: string;
};

export type CertificationItem = {
  _id: string;
  name: string;
  issuer?: string;
  issueDate?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  logoUrl?: string;
  description?: string;
};

export type EducationItem = {
  _id: string;
  institution: string;
  degree?: string;
  field?: string;
  grade?: string;
  university?: string;
  location?: string;
  highlights?: string[];
  current?: boolean;
  startDate?: string;
  endDate?: string;
};

export type SiteSettings = {
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string };
  theme?: { primary?: string; accent?: string };
  animationsEnabled?: boolean;
  resumePdfUrl?: string;
  socialLinks?: Record<string, string>;
};
