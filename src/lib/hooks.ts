import { useEffect, useRef, useState } from 'react';

/**
 * Reveals children once they scroll into view.
 * Pure IntersectionObserver + a CSS transition — no animation library.
 */
export function useReveal<T extends HTMLElement>(options?: { once?: boolean; threshold?: number }) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (options?.once !== false) io.unobserve(entry.target);
          } else if (options?.once === false) {
            setShown(false);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: options?.threshold ?? 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options?.once, options?.threshold]);

  return { ref, shown };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        setScrolled(window.scrollY > 60);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { progress, scrolled };
}

export function useCountdown(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const compute = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      total: diff,
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(compute);

  useEffect(() => {
    const id = window.setInterval(() => setTime(compute()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}
