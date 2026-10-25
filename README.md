# Varun & Kavya — Wedding Invitation

A single-page wedding invitation for **Varun T K** & **Kavya M** — Reception on
**26 Nov 2026** and Muhurtha on **27 Nov 2026** at Kammareddy Samudaya Bhavana,
Chitradurga.

Built with **React 19 + Vite + TypeScript**. No UI framework, no animation
library — just hand-written CSS, SVG ornaments and the Intersection Observer API,
so the whole page stays around **270 KB including photos** and paints in well
under a second on mobile data.

---

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

---

## What's inside

| Section | What it does |
| --- | --- |
| Opening curtain | Ivory panels part to reveal the monogram (once per session, skipped for reduced-motion users) |
| Hero | Arched Ghibli-style portrait, names, Kannada blessing, date badge |
| Save the date | Live countdown, **Add to calendar** (.ics with both events) and **Share** |
| Our story | Short note + a printable-looking invitation card |
| Events | Reception & Muhurtha cards, each with its own Google Calendar link |
| Blessing band | Kannada shloka with English translation |
| Gallery | Banner + 4-up grid, keyboard/swipe lightbox |
| Venue | Address, copy-address, Google Maps directions and embedded map |
| RSVP | Name, which days, number of guests, note → opens WhatsApp with the message pre-filled |
| Footer | Monogram, hashtag, Kannada *swagatha* |

Phones get a thumb-friendly floating bar (**Directions · Save the date · RSVP**)
once you scroll past the cover.

---

## Making it yours — `src/config.ts`

Everything written in words lives in one file: names, dates, times, venue,
hashtag, the story paragraph, gallery captions and Kannada text. Times are
ISO strings with the `+05:30` offset, so the countdown and calendar files are
correct regardless of the guest's timezone.

### Turn on direct WhatsApp RSVPs

Open `src/config.ts` and set:

```ts
rsvpWhatsApp: '919876543210',   // country code + number, digits only
```

Leave it empty (the current default) and the button simply opens WhatsApp with
the message ready, letting the guest pick who to send it to. Nothing is sent
automatically either way, and no data leaves the page.

---

## Performance notes

- Photos are pre-resized to WebP at 2–3 widths each and served with `srcset`;
  the hero image is preloaded, everything else is lazy-loaded.
- Each photo has an inline ~1 KB blurred placeholder, so nothing pops in blank.
- Fonts are self-hosted (Cormorant Garamond, Jost, Noto Sans Kannada),
  preloaded, with `font-display: swap` — no request ever leaves for a font CDN.
- Measured on a throttled slow-4G mobile profile: **FCP ≈ 0.7 s**, 269 KB total.
- Animations are transform/opacity only, and all of them collapse under
  `prefers-reduced-motion: reduce`.

## Deploying

`npm run build` produces a static `dist/` folder — drop it on Netlify, Vercel,
Cloudflare Pages or GitHub Pages. Because Vite is configured with `base: '/'`,
deploy at a domain root. For a sub-path (e.g. `user.github.io/wedding/`), set
`base: '/wedding/'` in `vite.config.ts` and rebuild.
