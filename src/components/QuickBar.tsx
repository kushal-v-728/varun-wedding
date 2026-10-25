import { useEffect, useState } from 'react';
import { wedding } from '../config';
import { CalendarIcon, HeartIcon, PinIcon } from './Ornaments';

const TRACKED = ['save-the-date', 'rsvp'];

/**
 * Compact floating shortcut for phones — thumb-reachable directions & RSVP
 * once the guest has scrolled past the invitation cover. Whichever section is
 * in the middle of the screen lights up, so a tap always shows where you are.
 */
export function QuickBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = TRACKED.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      // Only the section crossing the middle of the viewport counts.
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = (href: string) => (active === href ? 'location' : undefined);

  return (
    <div className={`quickbar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a
        className="quickbar__item"
        href={wedding.venue.directionsUrl}
        target="_blank"
        rel="noreferrer"
        tabIndex={visible ? 0 : -1}
      >
        <PinIcon />
        <span>Directions</span>
      </a>
      <a
        className="quickbar__item"
        href="#save-the-date"
        aria-current={current('#save-the-date')}
        tabIndex={visible ? 0 : -1}
      >
        <CalendarIcon />
        <span>Save the date</span>
      </a>
      <a
        className="quickbar__item"
        href="#rsvp"
        aria-current={current('#rsvp')}
        tabIndex={visible ? 0 : -1}
      >
        <HeartIcon />
        <span>RSVP</span>
      </a>
    </div>
  );
}
