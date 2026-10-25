/**
 * ─────────────────────────────────────────────────────────────
 *  Everything about the wedding lives here.
 *  Change a value in this file and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */

const VENUE_ADDRESS =
  'Kammareddy Samudaya Bhavana, Turuvanuru Road, NH Service Rd, Bank Colony, Chitradurga, Karnataka 577501';

export const wedding = {
  hashtag: '#VarunWedsKavya',
  monogram: 'V&K',

  groom: {
    shortName: 'Varun',
    fullName: 'Varun T K',
    role: 'Groom',
  },
  bride: {
    shortName: 'Kavya',
    fullName: 'Kavya M',
    role: 'Bride',
  },

  /** Kannada blessings shown around the site */
  kannada: {
    bless: 'ಶುಭ ವಿವಾಹ',
    welcome: 'ಸ್ವಾಗತ',
    blessing: 'ಸರ್ವೇ ಜನಾಃ ಸುಖಿನೋ ಭವಂತು',
  },

  blessingTranslation: 'May all beings be happy',

  venue: {
    name: 'Kammareddy Samudaya Bhavana',
    addressLines: [
      'Turuvanuru Road, NH Service Rd, Bank Colony',
      'Chitradurga, Karnataka 577501',
    ],
    address: VENUE_ADDRESS,
    // Built from the address so the buttons always land on the right pin.
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(VENUE_ADDRESS),
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(VENUE_ADDRESS),
    embedUrl:
      'https://maps.google.com/maps?q=' +
      encodeURIComponent(VENUE_ADDRESS) +
      '&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },

  events: [
    {
      id: 'reception',
      kicker: 'Join us for an evening of',
      title: 'Reception',
      dateLabel: 'Thursday, 26 November 2026',
      dateISO: '2026-11-26',
      timeLabel: '7:15 PM onwards',
      start: '2026-11-26T19:15:00+05:30',
      end: '2026-11-26T23:00:00+05:30',
      blurb: 'A night of laughter, music and good food before the big day.',
      icon: 'sparkle' as const,
    },
    {
      id: 'muhurtha',
      kicker: 'The sacred vows',
      title: 'Muhurtha',
      dateLabel: 'Friday, 27 November 2026',
      dateISO: '2026-11-27',
      timeLabel: '9:20 AM – 10:00 AM',
      start: '2026-11-27T09:20:00+05:30',
      end: '2026-11-27T10:00:00+05:30',
      blurb: 'The moment we tie the knot, surrounded by the people we love.',
      icon: 'ring' as const,
    },
  ],

  /** Countdown target — the muhurtha moment. */
  countdownTo: '2026-11-27T09:20:00+05:30',

  /**
   * Optional: put a WhatsApp number here (country code, digits only,
   * e.g. '919876543210') to send RSVPs straight to the family.
   * Leave it empty and guests simply pick a contact in WhatsApp.
   */
  rsvpWhatsApp: '',

  story: {
    eyebrow: 'Our story',
    title: 'Two hearts, one journey',
    body:
      'What began as a quiet friendship slowly turned into a thousand little moments we could not imagine living without. Somewhere between shared cups of coffee and long conversations that never felt long enough, we found home in each other. Now, with the blessings of our families, we are taking the step we have been waiting for — together, forever.',
    signature: 'With love, Varun & Kavya',
  },
} as const;

export type WeddingEvent = (typeof wedding.events)[number];

export const galleryImages = [
  {
    id: 'seated',
    src: 'seated',
    focal: '50% 30%',
    alt: 'Varun kneeling before Kavya with a flower garland on a decorated wedding stage',
    caption: 'The proposal',
    width: 1024,
    height: 1536,
  },
  {
    id: 'embrace',
    src: 'embrace',
    focal: '50% 34%',
    alt: 'Kavya and Varun looking at each other in a warm embrace',
    caption: 'Two of a kind',
    width: 773,
    height: 1024,
  },
  {
    id: 'hills',
    src: 'hills',
    focal: '50% 42%',
    alt: 'Varun and Kavya standing together with green hills behind them',
    caption: 'Our kind of day',
    width: 1448,
    height: 1086,
  },
  {
    id: 'stand',
    src: 'stand',
    focal: '50% 26%',
    alt: 'Varun and Kavya in wedding attire beside a floral backdrop',
    caption: 'Sakhi & Sakha',
    width: 1024,
    height: 1536,
  },
  {
    id: 'pose',
    src: 'pose',
    focal: '50% 30%',
    alt: 'Up close with Varun and Kavya, Kavya resting her head on his shoulder',
    caption: 'Always you',
    width: 766,
    height: 1024,
  },
] as const;

export type GalleryImage = (typeof galleryImages)[number];

/** Look a photo up by id — every section references photos this way. */
export function photoById(id: string): GalleryImage {
  return galleryImages.find((image) => image.id === id) ?? galleryImages[0];
}

/** Widths generated for every image in /images. */
export const imageWidths: Record<string, number[]> = {
  seated: [420, 760, 1024],
  stand: [420, 760, 1024],
  embrace: [420, 773],
  pose: [420, 766],
  hills: [760, 1200, 1448],
};
