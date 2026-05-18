import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import { AboutSection } from '@/components/public/AboutSection';
import { AchievementsSection } from '@/components/public/AchievementsSection';
import { BackToTop } from '@/components/public/BackToTop';
import { CertificationsSection } from '@/components/public/CertificationsSection';
import { ContactSection } from '@/components/public/ContactSection';
import { EducationSection } from '@/components/public/EducationSection';
import { ExperienceSection } from '@/components/public/ExperienceSection';
import { Footer } from '@/components/public/Footer';
import { Hero } from '@/components/public/Hero';
import { LearningSection } from '@/components/public/LearningSection';
import { MouseGlow } from '@/components/public/MouseGlow';
import { Navbar } from '@/components/public/Navbar';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { ScrollProgress } from '@/components/public/ScrollProgress';
import { SkillsSection } from '@/components/public/SkillsSection';
import { usePublicSettings } from '@/hooks/queries';

export function HomePage() {
  const { data: settings } = usePublicSettings();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      easing: 'ease-out-cubic',
      offset: 80,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{settings?.seo?.metaTitle ?? 'Tushar Prabhakar Wankhede · Portfolio'}</title>
        <meta
          name="description"
          content={
            settings?.seo?.metaDescription ??
            'Full Stack Developer — MERN, AI/ML, and production-ready systems.'
          }
        />
        <meta name="keywords" content={settings?.seo?.keywords ?? ''} />
        <meta property="og:type" content="website" />
      </Helmet>

      <MouseGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <LearningSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
