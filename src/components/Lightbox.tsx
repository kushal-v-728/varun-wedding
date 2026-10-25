import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { galleryImages, imageWidths } from '../config';
import { imgSrc } from '../lib/assets';
import { ChevronIcon, CloseIcon } from './Ornaments';

type LightboxApi = { open: (id: string) => void };

const LightboxContext = createContext<LightboxApi>({ open: () => undefined });

/** Any photo on the page can open the full-view dialog. */
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);

  const activeIndex = useMemo(
    () => galleryImages.findIndex((image) => image.id === activeId),
    [activeId],
  );

  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  const step = useCallback((dir: number) => {
    setActiveId((current) => {
      const index = galleryImages.findIndex((image) => image.id === current);
      if (index < 0) return current;
      return galleryImages[(index + dir + galleryImages.length) % galleryImages.length].id;
    });
  }, []);

  useEffect(() => {
    if (!activeId) return;
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
  }, [activeId, close, step]);

  const photo = activeIndex >= 0 ? galleryImages[activeIndex] : null;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {photo && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
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
              key={photo.id}
              src={imgSrc(photo.src, imageWidths[photo.src].slice(-1)[0])}
              alt={photo.alt}
              className="lightbox__img"
            />
            <figcaption className="lightbox__caption">
              {photo.caption}
              <span>
                {activeIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
