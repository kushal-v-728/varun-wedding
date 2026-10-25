import type { SVGProps } from 'react';

/* ── Decorative artwork ─────────────────────────────────────── */

/** Slim lotus flourish used between sections. */
export function LotusDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`lotus-divider ${className}`} aria-hidden="true">
      <span className="lotus-divider__rule" />
      <svg viewBox="0 0 120 44" className="lotus-divider__mark" focusable="false">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          transform="translate(60 34)"
        >
          {[-58, -29, 0, 29, 58].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <path d="M0 0C5.5-6 5.5-17 0-24 -5.5-17 -5.5-6 0 0Z" />
            </g>
          ))}
          <path d="M-15 1C-11 5 11 5 15 1" />
          <circle cx="0" cy="-11" r="1.4" fill="currentColor" stroke="none" />
        </g>
        <path d="M4 34h34" stroke="currentColor" strokeWidth="1" opacity=".55" />
        <path d="M82 34h34" stroke="currentColor" strokeWidth="1" opacity=".55" />
        <circle cx="42" cy="34" r="1.6" fill="currentColor" opacity=".7" />
        <circle cx="78" cy="34" r="1.6" fill="currentColor" opacity=".7" />
      </svg>
      <span className="lotus-divider__rule" />
    </div>
  );
}

/** Large, slowly rotating mandala backdrop. */
export function Mandala({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      viewBox="0 0 400 400"
      className={`mandala ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="200" cy="200" r="196" opacity=".45" />
        <circle cx="200" cy="200" r="176" opacity=".7" />
        <circle cx="200" cy="200" r="128" opacity=".5" />
        <circle cx="200" cy="200" r="120" opacity=".9" strokeDasharray="1 7" />
        <circle cx="200" cy="200" r="64" opacity=".7" />
        <circle cx="200" cy="200" r="40" opacity=".5" />
        {petals.map((angle) => (
          <g key={angle} transform={`rotate(${angle} 200 200)`}>
            <path d="M200 30C210 62 210 96 200 124 190 96 190 62 200 30Z" opacity=".65" />
            <path d="M200 84v34" opacity=".5" />
          </g>
        ))}
        {Array.from({ length: 12 }, (_, i) => i * 30).map((angle) => (
          <g key={`inner-${angle}`} transform={`rotate(${angle} 200 200)`}>
            <path d="M200 132C207 152 207 168 200 184 193 168 193 152 200 132Z" opacity=".8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Filigree corner used on framed cards. */
export function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`corner-flourish ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M2 2h26M2 2v26" />
        <path d="M2 36c10 0 18-8 18-18" opacity=".7" />
        <path d="M36 2c0 10-8 18-18 18" opacity=".7" />
        <path d="M12 2c0 6 4 10 10 10" opacity=".55" />
        <path d="M2 12c6 0 10 4 10 10" opacity=".55" />
        <circle cx="2" cy="2" r="1.8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Soft floating marigold petals for the hero. */
export function PetalField({ count = 14 }: { count?: number }) {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="petals__petal"
          style={{
            left: `${(i * 97) % 100}%`,
            animationDelay: `${(i * 1.7) % 16}s`,
            animationDuration: `${16 + ((i * 5) % 12)}s`,
            ['--petal-w' as string]: `${8 + ((i * 3) % 9)}px`,
            ['--petal-drift' as string]: `${((i % 2 === 0 ? 1 : -1) * (20 + ((i * 9) % 70)))}px`,
            opacity: 0.28 + ((i % 4) * 0.12),
          }}
        />
      ))}
    </div>
  );
}

/* ── Icons (stroke, inherit colour) ─────────────────────────── */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l1.9 5.1L19 10.5l-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </svg>
  );
}

export function RingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M9 6.2l3-2.7 3 2.7-1.5 2.4h-3L9 6.2Z" />
      <path d="M10.5 6.2h3" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3.5V6M16 3.5V6M8 14h2M14 14h2M8 17h2M14 17h2" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7.2-4.4-7.2-9.4A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.2 3C19.2 15.6 12 20 12 20Z" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v14M6.5 13l5.5 5.5L17.5 13" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.84 9.84 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2Zm5.75 14.06c-.24.68-1.4 1.3-1.93 1.34-.53.05-1.02.24-3.44-.72-2.92-1.15-4.75-4.15-4.9-4.34-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07 1-2.36.26-.29.58-.36.77-.36.2 0 .39.01.56.02.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.13.07.75-.17 1.43Z" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 6.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="6" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="18" r="2.6" />
      <path d="M8.4 10.8l7.2-3.5M8.4 13.2l7.2 3.5" />
    </svg>
  );
}
