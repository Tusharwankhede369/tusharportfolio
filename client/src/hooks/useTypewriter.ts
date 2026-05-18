import { useEffect, useState } from 'react';

export function useTypewriter(lines: string[], typingSpeed = 55, pauseBetween = 1800) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    if (!lines.length) return;
    const line = lines[lineIndex % lines.length];
    let t: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (charIndex < line.length) {
        t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
      } else {
        t = setTimeout(() => setPhase('deleting'), pauseBetween);
      }
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        t = setTimeout(() => setCharIndex((c) => c - 1), typingSpeed / 2);
      } else {
        t = setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length);
          setPhase('typing');
        }, 0);
      }
    }

    return () => clearTimeout(t);
  }, [charIndex, phase, lineIndex, lines, typingSpeed, pauseBetween]);

  const current = lines[lineIndex % lines.length] ?? '';
  return current.slice(0, charIndex);
}
