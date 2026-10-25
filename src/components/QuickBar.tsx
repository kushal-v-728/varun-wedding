import { useEffect, useState } from 'react';
import { wedding } from '../config';
import { CalendarIcon, HeartIcon, PinIcon } from './Ornaments';

/**
 * Compact floating shortcut for phones — thumb-reachable directions & RSVP
 * once the guest has scrolled past the invitation cover.
 */
export function QuickBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`quickbar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a className="quickbar__item" href={wedding.venue.directionsUrl} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1}>
        <PinIcon />
        <span>Directions</span>
      </a>
      <a
        className="quickbar__item quickbar__item--date"
        href="#save-the-date"
        tabIndex={visible ? 0 : -1}
      >
        <CalendarIcon />
        <span>Save the date</span>
      </a>
      <a className="quickbar__item" href="#rsvp" tabIndex={visible ? 0 : -1}>
        <HeartIcon />
        <span>RSVP</span>
      </a>
    </div>
  );
}
