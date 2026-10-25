import { wedding } from '../config';
import { blurData } from '../lib/blur';
import { blurUrl, imgSrc, imgSrcSet } from '../lib/assets';
import { ArrowDownIcon, LotusDivider, Mandala, PetalField } from './Ornaments';

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="top">
      <div className="hero__wash" aria-hidden="true">
        <Mandala className="hero__mandala" />
        <span className="hero__glow hero__glow--one" />
        <span className="hero__glow hero__glow--two" />
      </div>
      <PetalField count={12} />

      <div className="hero__frame" aria-hidden="true" />

      <div className="container hero__inner">
        <figure className="hero__figure">
          <span className="hero__halo" aria-hidden="true" />
          <div
            className="arch arch--hero"
            style={{ backgroundImage: blurUrl(blurData.stand) }}
          >
            <img
              src={imgSrc('stand', 760)}
              srcSet={imgSrcSet('stand', [420, 760, 1024])}
              sizes="(max-width: 880px) 88vw, 44vw"
              width={1024}
              height={1536}
              alt="Varun and Kavya in traditional wedding attire against a floral backdrop"
              fetchPriority="high"
              decoding="async"
              className="arch__img"
              style={{ objectPosition: '50% 20%' }}
            />
            <span className="arch__sheen" aria-hidden="true" />
          </div>
          <figcaption className="hero__datebadge">
            <span className="hero__datebadge-label">Save the date</span>
            <span className="hero__datebadge-date">
              27<em>.11</em>.2026
            </span>
          </figcaption>
        </figure>

        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="eyebrow__rule" />
            The wedding of
            <span className="eyebrow__rule" />
          </p>

          <h1 className="hero__names">
            <span className="hero__name">{wedding.groom.shortName}</span>
            <span className="hero__amp">&amp;</span>
            <span className="hero__name">{wedding.bride.shortName}</span>
          </h1>

          <p className="hero__kannada" lang="kn">
            {wedding.kannada.bless}
          </p>

          <LotusDivider className="hero__divider" />

          <p className="hero__meta">
            <span>26 &amp; 27 November 2026</span>
            <span className="hero__meta-dot" aria-hidden="true" />
            <span>Chitradurga, Karnataka</span>
          </p>

          <div className="hero__actions">
            <a href="#events" className="btn btn--solid">
              Wedding events
            </a>
            <a href="#venue" className="btn btn--line">
              Get directions
            </a>
          </div>

          <p className="hero__fullnames">
            {wedding.groom.fullName} <span aria-hidden="true">·</span> {wedding.bride.fullName}
          </p>
        </div>
      </div>

      <a href="#save-the-date" className="hero__scroll" aria-label="Scroll to save the date">
        <span>Scroll</span>
        <ArrowDownIcon />
      </a>
    </section>
  );
}
