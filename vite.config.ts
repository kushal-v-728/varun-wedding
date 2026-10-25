import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Relative base so the build works from any URL — a domain root
 * (Netlify/Vercel) or a GitHub Pages project sub-path
 * (https://user.github.io/repo/). Absolute "/assets/..." URLs break
 * the moment the site isn't hosted at the domain root.
 */
const BASE = './';

/**
 * Preload the two text fonts. Their filenames are hashed at build time,
 * so the tags have to be injected after the bundle is known.
 */
function preloadFonts(): Plugin {
  const wanted = ['cormorant-garamond-latin-wght-normal', 'jost-latin-wght-normal'];
  return {
    name: 'preload-fonts',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const tags = Object.keys(ctx.bundle)
          .filter((file) => file.endsWith('.woff2') && wanted.some((w) => file.includes(w)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `${BASE}${file}`,
              crossorigin: '',
            },
            injectTo: 'head-prepend' as const,
          }));
        return { html, tags };
      },
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), preloadFonts()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // The Arena preview proxy serves the app from a *.e2b.app host.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
});
