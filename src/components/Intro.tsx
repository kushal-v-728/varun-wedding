import { wedding } from '../config';
import { Mandala } from './Ornaments';

/**
 * Opening curtain: the monogram draws in, then the two ivory panels
 * part to reveal the invitation. Skipped on repeat visits & reduced motion.
 */
export function Intro({ opening, hidden }: { opening: boolean; hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className={`intro ${opening ? 'is-opening' : ''}`} aria-hidden="true">
      <div className="intro__panel intro__panel--left" />
      <div className="intro__panel intro__panel--right" />
      <div className="intro__mark">
        <Mandala className="intro__mandala" />
        <span className="intro__kicker">The wedding of</span>
        <span className="intro__monogram">{wedding.monogram}</span>
        <span className="intro__names">
          {wedding.groom.shortName} &amp; {wedding.bride.shortName}
        </span>
      </div>
    </div>
  );
}
