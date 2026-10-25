import type { ReactNode } from 'react';
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
