import { useEffect, useRef } from 'react';
import { wedding } from '../config';
import { useParallaxSetup } from '../lib/parallax';
import { imageWidths } from '../config';
import { imgSrc, imgSrcSet } from '../lib/assets';
import { Reveal } from './Reveal';

/**
 * Full-bleed photograph with the blessing laid over it. The image drifts
 * more slowly than the page, the classic parallax window.
 */
export function Blessing() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const widths = imageWidths.hills;

  useEffect(() => useParallaxSetup(mediaRef.current, 120), []);
  useEffect(() => useParallaxSetup(textRef.current, -46), []);

  return (
    <section className="band" aria-label="Blessing">
      <div className="band__media" ref={mediaRef} aria-hidden="true">
        <img
          src={imgSrc('hills', widths[1])}
          srcSet={imgSrcSet('hills', widths)}
          sizes="100vw"
          width={1448}
          height={1086}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="band__veil" aria-hidden="true" />
      <span className="band__grain" aria-hidden="true" />

      <div className="container band__inner" ref={textRef}>
        <Reveal>
          <p className="band__kannada" lang="kn">
            {wedding.kannada.blessing}
          </p>
          <p className="band__translation">{wedding.blessingTranslation}</p>
          <p className="band__credit">On the way to Chitradurga · 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
