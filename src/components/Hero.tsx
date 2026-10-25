import { useEffect, useRef } from 'react';
import { wedding } from '../config';
import { useParallaxSetup } from '../lib/parallax';
import { FramedPhoto } from './Chapter';
import { ArrowDownIcon, LotusDivider, Mandala, PetalField } from './Ornaments';

export function Hero({ ready }: { ready: boolean }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => useParallaxSetup(leftRef.current, 72), []);
  useEffect(() => useParallaxSetup(rightRef.current, -54), []);
  useEffect(() => useParallaxSetup(washRef.current, 120), []);

  return (
    <section className={`hero ${ready ? 'is-ready' : ''}`} id="top">
      <div className="hero__wash" aria-hidden="true" ref={washRef}>
        <Mandala className="hero__mandala" />
        <span className="hero__glow hero__glow--one" />
        <span className="hero__glow hero__glow--two" />
      </div>
      <PetalField count={11} />
      <div className="hero__frame" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__side hero__side--left" ref={leftRef}>
          <FramedPhoto id="seated" frame="arch" priority sizes="(max-width: 1100px) 44vw, 320px" />
        </div>

        <div className="hero__center">
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
            <span>25 – 27 November 2026</span>
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

        <div className="hero__side hero__side--right" ref={rightRef}>
          <FramedPhoto id="stand" frame="arch" priority sizes="(max-width: 1100px) 44vw, 320px" />
        </div>
      </div>

      <a href="#save-the-date" className="hero__scroll" aria-label="Scroll to save the date">
        <span>Scroll</span>
        <ArrowDownIcon />
      </a>
    </section>
  );
}
