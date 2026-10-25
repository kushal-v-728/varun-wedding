import { useEffect, useRef, type ReactNode } from 'react';
import { imageWidths, photoById } from '../config';
import { imgSrc, imgSrcSet, blurUrl } from '../lib/assets';
import { blurData } from '../lib/blur';
import { useParallaxSetup } from '../lib/parallax';
import { useLightbox } from './Lightbox';
import { Reveal } from './Reveal';

export type Frame = 'arch' | 'oval' | 'pill' | 'square';

type FramedPhotoProps = {
  id: string;
  frame?: Frame;
  caption?: string;
  sizes?: string;
  priority?: boolean;
};

/** A photo in a shaped frame; clicking it opens the lightbox. */
export function FramedPhoto({
  id,
  frame = 'arch',
  caption,
  sizes = '(max-width: 1100px) 42vw, 220px',
  priority = false,
}: FramedPhotoProps) {
  const photo = photoById(id);
  const { open } = useLightbox();
  const widths = imageWidths[photo.src] ?? [760];
  const label = caption ?? photo.caption;

  return (
    <button
      type="button"
      className={`framed frame--${frame}`}
      onClick={() => open(photo.id)}
      aria-label={`View photo — ${label}`}
    >
      <span
        className="framed__media"
        style={{ backgroundImage: blurUrl(blurData[photo.src]) }}
      >
        <img
          src={imgSrc(photo.src, widths[Math.min(1, widths.length - 1)])}
          srcSet={imgSrcSet(photo.src, widths)}
          sizes={sizes}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="framed__img"
          style={{ objectPosition: photo.focal }}
        />
      </span>
      <span className="framed__caption">{label}</span>
    </button>
  );
}

/** One flanking photo that drifts as the page scrolls. */
function Rail({
  id,
  side,
  frame,
  drift,
  caption,
}: {
  id: string;
  side: 'left' | 'right';
  frame?: Frame;
  drift: number;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => useParallaxSetup(ref.current, drift), [drift]);

  return (
    <div ref={ref} className={`chapter__rail chapter__rail--${side}`}>
      <FramedPhoto id={id} frame={frame} caption={caption} />
    </div>
  );
}

type ChapterProps = {
  id?: string;
  /** photo id from config */
  left?: { id: string; frame?: Frame; drift?: number; caption?: string };
  right?: { id: string; frame?: Frame; drift?: number; caption?: string };
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Centred content with a photo floating on each side (phones get the two
 * photos as a pair beneath the content instead).
 */
export function Chapter({ id, left, right, wide = false, className = '', children }: ChapterProps) {
  const refLeft = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);
  useEffect(() => useParallaxSetup(refLeft.current, left?.drift ?? 34), [left?.drift]);
  useEffect(() => useParallaxSetup(refRight.current, right?.drift ?? -28), [right?.drift]);

  return (
    <section id={id} className={`chapter section ${className}`}>
      <div className={`container chapter__grid ${wide ? 'chapter__grid--wide' : ''}`}>
        {left ? (
          <div ref={refLeft} className="chapter__rail chapter__rail--left">
            <FramedPhoto id={left.id} frame={left.frame} caption={left.caption} />
          </div>
        ) : null}

        <div className="chapter__body">
          <Reveal>{children}</Reveal>
        </div>

        {right ? (
          <div ref={refRight} className="chapter__rail chapter__rail--right">
            <FramedPhoto id={right.id} frame={right.frame} caption={right.caption} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export { Rail };
