/** Image helpers so the build works on any base path (root, sub-folder, GitHub Pages). */
const BASE = import.meta.env.BASE_URL || '/';

export function imgSrc(name: string, width: number) {
  return `${BASE}images/${name}-${width}.webp`;
}

export function imgSrcSet(name: string, widths: readonly number[]) {
  return widths.map((w) => `${imgSrc(name, w)} ${w}w`).join(', ');
}

export function blurUrl(base64: string) {
  return `url("data:image/webp;base64,${base64}")`;
}
