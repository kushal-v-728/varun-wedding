import { venueOf, wedding, type WeddingEvent } from '../config';

/** RFC5545 date string in the couple's timezone (IST). */
function toICSDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  // Convert to Asia/Kolkata (UTC+5:30) explicitly so the file is stable everywhere.
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  return (
    `${ist.getUTCFullYear()}${pad(ist.getUTCMonth() + 1)}${pad(ist.getUTCDate())}` +
    `T${pad(ist.getUTCHours())}${pad(ist.getUTCMinutes())}00`
  );
}

function escapeICS(text: string) {
  return text.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
}

/** Fold long lines the way calendar apps expect. */
function fold(line: string) {
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    chunks.push(rest.slice(0, 74));
    rest = ' ' + rest.slice(74);
  }
  chunks.push(rest);
  return chunks.join('\r\n');
}

export function buildICS(events: readonly WeddingEvent[]) {
  const stamp = toICSDate(new Date().toISOString());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Varun & Kavya//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const ev of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-varun-kavya-2026@wedding`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Asia/Kolkata:${toICSDate(ev.start)}`,
      `DTEND;TZID=Asia/Kolkata:${toICSDate(ev.end)}`,
      fold(`SUMMARY:${escapeICS(`${ev.title} — Varun & Kavya`)}`),
      fold(`LOCATION:${escapeICS(venueOf(ev).address)}`),
      fold(
        `DESCRIPTION:${escapeICS(
          `${ev.kicker} ${ev.title}. ${ev.dateLabel}, ${ev.timeLabel}. ${wedding.hashtag}`,
        )}`,
      ),
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeICS(ev.title + ' today')}`,
      'END:VALARM',
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadICS(events: readonly WeddingEvent[], filename = 'varun-kavya-wedding.ics') {
  const blob = new Blob([buildICS(events)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Google wants UTC stamps (trailing Z); `ctz` handles the display timezone. */
function toGoogleDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

export function googleCalendarUrl(ev: WeddingEvent) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.title} — Varun & Kavya`,
    dates: `${toGoogleDate(ev.start)}/${toGoogleDate(ev.end)}`,
    ctz: 'Asia/Kolkata',
    details: `${ev.kicker} ${ev.title}. ${wedding.hashtag}`,
    location: venueOf(ev).address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
