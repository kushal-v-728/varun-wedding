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
| Opening doors | Two ivory panelled doors swing open in 3-D on every page load and dissolve into the hero. Opens by itself after 15 s, or instantly on a tap. Skipped for reduced-motion guests |
| Hero | Names centred, the proposal portrait to the left and the couple to the right |
| Save the date | Live countdown, **Add to calendar** (.ics with both events) and **Share** |
| Our story | Note, printable-looking invitation card, photo each side |
| Events | Reception & Muhurtha cards, portraits flanking them |
| Blessing band | Full-bleed parallax window over the hills photo, Kannada shloka with translation |
| Venue | Address, copy-address, Google Maps directions and embedded map |
| RSVP | Name, which days, number of guests, note → opens WhatsApp pre-filled, portraits each side |
| Footer | Monogram, hashtag, Kannada *swagatha* |

Photographs are never a separate gallery: each one sits in its own frame on the
left or right of a section, drifting slowly as you scroll, and opens in a
full-view lightbox when tapped. On phones the two photos of a section dock side
by side beneath the text.

Phones get a thumb-friendly floating bar (**Directions · Save the date · RSVP**)
once you scroll past the cover.

---

## Adding the music

Drop **one** audio file into `src/assets/audio/` (mp3, m4a, ogg or wav) — it is
picked up automatically, no code change. It starts as the doors swing open,
fades in, and stops when the track ends. A small disc in the bottom-left corner
lets guests pause or replay it.

Two browser facts worth knowing: sound that starts **without a tap** is blocked
by mobile Safari and Chrome, so when the doors open on their own the music may
wait for the guest — the disc then pulses with a "Tap for music" hint. When a
guest taps the doors, the music starts immediately because that tap is
permission. Keep the clip around 30–40 seconds and under ~1 MB.

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
- Parallax is one shared `requestAnimationFrame` loop that only writes a CSS
  custom property — no layout thrash, no scroll libraries.
- Animations are transform/opacity only, and everything (doors, parallax,
  reveals, petals) collapses under `prefers-reduced-motion: reduce`.

## Deploying

`npm run build` produces a static `dist/` folder. Vite is configured with
`base: './'`, so every asset URL is **relative** and the same build works from a
domain root *and* from a GitHub Pages project sub-path
(`https://<user>.github.io/<repo>/`).

### GitHub Pages (already set up)

`.github/workflows/deploy.yml` builds the site on every push to `main` or
`arena/6b825038-varun-wedding` and publishes `dist/` to Pages.

Two things to know, because they are the usual cause of "the page is stuck on a
logo and nothing works":

1. **Pages must deploy the build, not the source.** In
   *Settings → Pages → Build and deployment*, **Source** has to be
   **GitHub Actions**. If it is left on *Deploy from a branch*, GitHub publishes
   the raw repo (the `index.html` that loads `/src/main.tsx`) and browsers show a
   blank monogram screen — exactly what a `base: '/'` build plus an unbundled
   entry looks like.
2. **Push the workflow file before/with your changes**, then check the
   *Actions* tab for a green "Deploy to GitHub Pages" run.

If a deploy ever fails to load the bundle, the page now falls back to a plain
text invitation (names, both timings, address, directions button) after 6
seconds instead of leaving guests on the splash screen.

### Netlify / Vercel / Cloudflare Pages

Build command `npm run build`, publish directory `dist`. Works at the domain
root and in a sub-path without changes.
