import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '../config';
import { Mandala } from './Ornaments';

/**
 * Opening double doors. Each leaf swings outward in 3-D, revealing the
 * invitation behind; tapping anywhere (or the button) opens immediately.
 */
export function Doors({
  opening,
  done,
  onOpen,
}: {
  opening: boolean;
  done: boolean;
  onOpen: () => void;
}) {
  if (done) return null;

  return (
    <div
      className={`doors ${opening ? 'is-open' : ''}`}
      aria-hidden={opening}
      onClick={onOpen}
    >
      <div className="doors__glow" aria-hidden="true" />

      <div className="doors__stage" aria-hidden="true">
        <div className="doors__leaf doors__leaf--left">
          <Mandala className="doors__mandala" />
          <span className="doors__moulding doors__moulding--outer" />
          <span className="doors__moulding doors__moulding--inner" />
          <span className="doors__handle" />
        </div>
        <div className="doors__leaf doors__leaf--right">
          <Mandala className="doors__mandala" />
          <span className="doors__moulding doors__moulding--outer" />
          <span className="doors__moulding doors__moulding--inner" />
          <span className="doors__handle" />
        </div>
      </div>

      <div className="doors__emblem">
        <p className="doors__kicker">The wedding of</p>
        <p className="doors__monogram">{wedding.monogram}</p>
        <p className="doors__names">
          {wedding.groom.shortName} &amp; {wedding.bride.shortName}
        </p>
        <button type="button" className="doors__open" onClick={onOpen}>
          Open the invitation
        </button>
      </div>
    </div>
  );
}

/**
 * Sequencing for the door reveal. Skipped entirely on repeat visits within a
 * session and for guests who ask for reduced motion.
 */
export function useDoorIntro(autoOpenAfter = 2400, swingTime = 1500) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const timers = useRef<number[]>([]);

  const unlock = () => document.documentElement.classList.remove('intro-lock');

  const begin = useCallback(() => {
    setOpening(true);
    setReady(true);
    timers.current.push(
      window.setTimeout(() => {
        setDone(true);
        unlock();
      }, swingTime),
    );
    try {
      sessionStorage.setItem('vk-doors-seen', '1');
    } catch {
      /* private mode */
    }
  }, [swingTime]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('vk-doors-seen') === '1';
    } catch {
      /* private mode */
    }

    if (reduced || seen) {
      setOpening(true);
      setReady(true);
      setDone(true);
      return;
    }

    document.documentElement.classList.add('intro-lock');
    const timer = window.setTimeout(begin, autoOpenAfter);
    const local = timers.current;
    return () => {
      window.clearTimeout(timer);
      local.forEach((id) => window.clearTimeout(id));
      unlock();
    };
  }, [autoOpenAfter, begin]);

  const openNow = useCallback(() => {
    if (opening) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    begin();
  }, [begin, opening]);

  return { opening, done, ready, openNow };
}
