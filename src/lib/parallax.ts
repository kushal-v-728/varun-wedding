/**
 * Shared, rAF-driven parallax.
 *
 * One scroll listener and one measurement pass serve every element on the
 * page, and only a CSS custom property (`--parallax`) is written per frame —
 * so the browser never has to re-layout, only re-composite.
 */

type Item = {
  el: HTMLElement;
  strength: number;
  top: number;
  height: number;
};

const items = new Set<Item>();
let scrollFrame = 0;
let measureFrame = 0;

function update() {
  scrollFrame = 0;
  if (!items.size) return;
  const vh = window.innerHeight;
  const y = window.scrollY;

  items.forEach((item) => {
    const center = item.top + item.height / 2;
    // −1 when the element is a screen below the fold, +1 once it has passed.
    const progress = Math.max(-1.2, Math.min(1.2, (y + vh / 2 - center) / (vh + item.height)));
    item.el.style.setProperty('--parallax', `${(progress * item.strength).toFixed(1)}px`);
  });
}

function scheduleFrame() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(update);
}

function measure() {
  measureFrame = 0;
  const y = window.scrollY;
  items.forEach((item) => {
    const rect = item.el.getBoundingClientRect();
    item.top = rect.top + y;
    item.height = rect.height;
  });
  scheduleFrame();
}

function scheduleMeasure() {
  if (!measureFrame) measureFrame = requestAnimationFrame(measure);
}

let resizeObserver: ResizeObserver | null = null;

function subscribe() {
  window.addEventListener('scroll', scheduleFrame, { passive: true });
  window.addEventListener('resize', scheduleMeasure);
  window.addEventListener('load', scheduleMeasure);
  document.fonts?.ready.then(scheduleMeasure).catch(() => undefined);
  if (typeof ResizeObserver !== 'undefined' && !resizeObserver) {
    resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(document.body);
  }
}

function unsubscribe() {
  window.removeEventListener('scroll', scheduleFrame);
  window.removeEventListener('resize', scheduleMeasure);
  window.removeEventListener('load', scheduleMeasure);
  resizeObserver?.disconnect();
  resizeObserver = null;
}

/** Attach parallax to an element; `strength` is the total travel in px. */
export function useParallaxSetup(el: HTMLElement | null, strength: number) {
  if (!el) return () => undefined;
  // Guests who ask for less motion get a perfectly still page.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => undefined;
  const item: Item = { el, strength, top: 0, height: 0 };
  items.add(item);
  if (items.size === 1) subscribe();
  measure();

  return () => {
    items.delete(item);
    el.style.removeProperty('--parallax');
    if (!items.size) unsubscribe();
  };
}
