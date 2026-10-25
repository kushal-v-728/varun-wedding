import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryImages, imageWidths, type GalleryImage } from '../config';
import { blurData } from '../lib/blur';
import { blurUrl, imgSrc, imgSrcSet } from '../lib/assets';
import { ChevronIcon, CloseIcon, LotusDivider } from './Ornaments';
import { Reveal } from './Reveal';

function Photo({
  image,
  className,
  onOpen,
  priority = false,
}: {
  image: GalleryImage;
  className?: string;
  onOpen: () => void;
  priority?: boolean;
}) {
  const widths = imageWidths[image.src] ?? [760];

  return (
    <figure className={`photo ${className ?? ''}`}>
      <button
        type="button"
        className="photo__btn"
        onClick={onOpen}
        aria-label={`Open photo: ${image.caption}`}
        style={{ backgroundImage: blurUrl(blurData[image.src]) }}
      >
        <img
          src={imgSrc(image.src, widths[Math.min(1, widths.length - 1)])}
          srcSet={imgSrcSet(image.src, widths)}
          sizes={className?.includes('banner') ? '100vw' : '(max-width: 700px) 47vw, 24vw'}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="photo__img"
          style={{ objectPosition: image.focal }}
        />
        <span className="photo__veil" aria-hidden="true" />
        <figcaption className="photo__caption">
          <span>{image.caption}</span>
          <em>{image.id === 'hills' ? 'somewhere in the hills' : '2026'}</em>
        </figcaption>
      </button>
    </figure>
  );
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((dir: number) => {
    setActive((cur) => (cur === null ? cur : (cur + dir + galleryImages.length) % galleryImages.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    document.documentElement.classList.add('menu-lock');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-lock');
    };
  }, [active, close, step]);

  const current = active === null ? null : galleryImages[active];

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            Moments
            <span className="eyebrow__rule" />
          </p>
          <h2 className="section-title">
            A little of <em>us</em>
          </h2>
          <LotusDivider />
        </Reveal>

        <Reveal className="gallery__banner" delay={60}>
          <Photo
            image={galleryImages[2]}
            className="photo--banner"
            onOpen={() => setActive(2)}
            priority
          />
        </Reveal>

        <div className="gallery__grid">
          {[galleryImages[0], galleryImages[3], galleryImages[1], galleryImages[4]].map((image, i) => (
            <Reveal key={image.id} delay={i * 80}>
              <Photo image={image} onOpen={() => setActive(galleryImages.indexOf(image))} />
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          tabIndex={-1}
          ref={dialogRef}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
            <CloseIcon />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronIcon />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <ChevronIcon />
          </button>

          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img
              key={current.id}
              src={imgSrc(current.src, imageWidths[current.src].slice(-1)[0])}
              alt={current.alt}
              className="lightbox__img"
            />
            <figcaption className="lightbox__caption">
              {current.caption}
              <span>
                {(active ?? 0) + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
