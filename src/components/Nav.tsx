import { useEffect, useState } from 'react';
import { wedding } from '../config';
import { useScrollProgress } from '../lib/hooks';
import { CloseIcon, MenuIcon } from './Ornaments';

const links = [
  { href: '#save-the-date', label: 'Save the date' },
  { href: '#story', label: 'Our story' },
  { href: '#events', label: 'Events' },
  { href: '#venue', label: 'Venue' },
  { href: '#rsvp', label: 'RSVP' },
];

export function Nav() {
  const { progress, scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-lock', open);
    return () => document.documentElement.classList.remove('menu-lock');
  }, [open]);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span className="progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#top" className="nav__brand" aria-label="Back to top">
            <span className="nav__monogram">{wedding.monogram}</span>
            <span className="nav__brandtext">
              {wedding.groom.shortName} &amp; {wedding.bride.shortName}
              <em>25 – 27 · 11 · 2026</em>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="nav__toggle"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal={open} aria-label="Menu">
        <div className="menu__glow" aria-hidden="true" />
        <div className="menu__head">
          <span className="nav__monogram">{wedding.monogram}</span>
          <button type="button" className="menu__close" onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="menu__links" aria-label="Sections">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="menu__link"
              style={{ transitionDelay: `${120 + i * 55}ms` }}
            >
              <span className="menu__num">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <p>{wedding.venue.name}</p>
          <p>Chitradurga, Karnataka</p>
        </div>
      </div>
    </>
  );
}
