import { wedding } from '../config';
import { HeartIcon, LotusDivider, Mandala } from './Ornaments';

export function Footer() {
  return (
    <footer className="footer">
      <Mandala className="footer__mandala" />
      <div className="container footer__inner">
        <p className="footer__kannada" lang="kn">
          {wedding.kannada.welcome}
        </p>
        <div className="footer__monogram">{wedding.monogram}</div>
        <p className="footer__names">
          {wedding.groom.shortName} &amp; {wedding.bride.shortName}
        </p>
        <LotusDivider />
        <p className="footer__date">25 – 27 November 2026 · Chitradurga, Karnataka</p>
        <p className="footer__hash">{wedding.hashtag}</p>
        <p className="footer__made">
          Made with <HeartIcon /> for our people
        </p>
      </div>
    </footer>
  );
}
