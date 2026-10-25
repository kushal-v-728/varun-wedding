import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '../config';
import { CalendarIcon, HeartIcon, PinIcon } from './Ornaments';

type BarKey = 'date' | 'venue' | 'rsvp';

/**
 * Sections that own a button in the bar, in page order. The button for the
 * last section you have scrolled past is the one that lights up — so the
 * venue section (directions) highlights just like the other two.
 */
const ANCHORS: { key: BarKey; id: string }[] = [
  { key: 'date', id: 'save-the-date' },
  { key: 'venue', id: 'venue' },
  { key: 'rsvp', id: 'rsvp' },
];

/** How long a tap keeps its own highlight while the page scrolls to it. */
const TAP_LOCK_MS = 1100;

/**
 * Compact floating shortcut for phones — thumb-reachable directions & RSVP
 * once the guest has scrolled past the invitation cover. The section you are
 * actually looking at is highlighted, in both scroll directions.
 */
export function QuickBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<BarKey | ''>('');
  const lockedUntil = useRef(0);
  const lockedKey = useRef<BarKey | ''>('');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      // Visibly on screen only once the cover has been scrolled past.
      setVisible(window.scrollY > window.innerHeight * 0.9);

      if (performance.now() < lockedUntil.current) {
        setActive(lockedKey.current);
        return;
      }

      const marker = window.innerHeight * 0.55;
      let key: BarKey | '' = '';

      // The last section whose top has crossed the marker wins. Recomputed
      // from scratch every frame, so scrolling up clears the highlight again
      // instead of leaving a stale one behind.
      for (const anchor of ANCHORS) {
        const el = document.getElementById(anchor.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) key = anchor.key;
      }

      // Sitting at the very bottom of the page means the last section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) key = 'rsvp';

      setActive(key);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    document.fonts?.ready.then(onScroll).catch(() => undefined);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /** Light the tapped button straight away, even before the scroll finishes. */
  const hold = useCallback((key: BarKey) => {
    lockedKey.current = key;
    lockedUntil.current = performance.now() + TAP_LOCK_MS;
    setActive(key);
  }, []);

  const current = (key: BarKey) => (active === key ? 'location' : undefined);

  return (
    <div className={`quickbar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a
        className="quickbar__item"
        href={wedding.venue.directionsUrl}
        target="_blank"
        rel="noreferrer"
        aria-current={current('venue')}
        onClick={() => hold('venue')}
        tabIndex={visible ? 0 : -1}
      >
        <PinIcon />
        <span>Directions</span>
      </a>
      <a
        className="quickbar__item"
        href="#save-the-date"
        aria-current={current('date')}
        onClick={() => hold('date')}
        tabIndex={visible ? 0 : -1}
      >
        <CalendarIcon />
        <span>Save the date</span>
      </a>
      <a
        className="quickbar__item"
        href="#rsvp"
        aria-current={current('rsvp')}
        onClick={() => hold('rsvp')}
        tabIndex={visible ? 0 : -1}
      >
        <HeartIcon />
        <span>RSVP</span>
      </a>
    </div>
  );
}
