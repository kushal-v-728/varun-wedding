import { useEffect, useState, type ReactNode } from 'react';
import { useReveal } from '../lib/hooks';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'figure' | 'span' | 'article';
};

/** Fades + lifts content into place when it enters the viewport. */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

/** Fades the page in over the intro curtain. */
export function useIntro(duration = 1750) {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('vk-intro-seen') === '1';
    } catch {
      /* private mode */
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) {
      setDone(true);
      setHidden(true);
      return;
    }
    document.documentElement.classList.add('intro-lock');
    const t1 = window.setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem('vk-intro-seen', '1');
      } catch {
        /* ignore */
      }
    }, duration);
    const t2 = window.setTimeout(() => {
      setHidden(true);
      document.documentElement.classList.remove('intro-lock');
    }, duration + 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.classList.remove('intro-lock');
    };
  }, [duration]);

  return { ready: done, hidden };
}
