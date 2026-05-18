import { useLottie } from 'lottie-react';
import { useEffect, useState } from 'react';

export const LOTTIE_DEFAULT = '/lottie/default.json';
export const LOTTIE_HERO = '/lottie/hero-coding.json';
export const LOTTIE_ABOUT = '/lottie/about-developer.json';
export const LOTTIE_SKILLS = '/lottie/skills-tech.json';
export const LOTTIE_PROJECTS = '/lottie/projects-rocket.json';
export const LOTTIE_ACHIEVEMENTS = '/lottie/achievements-trophy.json';
export const LOTTIE_EDUCATION = '/lottie/education-graduation.json';
export const LOTTIE_CERTS = '/lottie/certifications-learning.json';
export const LOTTIE_CONTACT = '/lottie/contact-email.json';

type InnerProps = {
  animationData: object;
  className?: string;
  loop: boolean;
};

function LottieInner({ animationData, className, loop }: InnerProps) {
  const { View } = useLottie({
    animationData,
    loop,
    className,
    autoplay: true,
  });
  return View;
}

export function LottieHost({
  src,
  className,
  loop = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
}) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!data) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          minHeight: '4rem',
          background:
            'radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--color-primary, #6b8f71) 25%, transparent), transparent 62%), radial-gradient(circle at 70% 60%, color-mix(in srgb, var(--color-secondary, #9b7b9a) 20%, transparent), transparent 55%)',
        }}
      />
    );
  }

  return <LottieInner animationData={data} className={className} loop={loop} />;
}
