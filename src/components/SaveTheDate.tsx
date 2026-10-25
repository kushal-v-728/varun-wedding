import { eventById, wedding } from '../config';
import { useCountdown } from '../lib/hooks';
import { downloadICS } from '../lib/calendar';
import { CalendarIcon, Mandala, ShareIcon } from './Ornaments';
import { Reveal } from './Reveal';
import { useState } from 'react';

const labels = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const;

export function SaveTheDate() {
  const time = useCountdown(wedding.countdownTo);
  const muhurtha = eventById('muhurtha');
  const [shared, setShared] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: `${wedding.groom.shortName} & ${wedding.bride.shortName} — Wedding`,
      text: `We're getting married! Join us from 25–27 November 2026 in Chitradurga. ${wedding.hashtag}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${data.text} ${url}`);
      setShared(true);
      window.setTimeout(() => setShared(false), 2400);
    } catch {
      /* dismissed */
    }
  };

  return (
    <section className="save" id="save-the-date">
      <Mandala className="save__mandala" />
      <div className="container save__inner">
        <Reveal className="save__head">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__rule" />
            Save the date
            <span className="eyebrow__rule" />
          </p>
          <h2 className="section-title section-title--light">
            Counting down to <em>forever</em>
          </h2>
          <p className="save__sub">
            {muhurtha.dateLabel} · {muhurtha.timeLabel}
          </p>
        </Reveal>

        <Reveal className="countdown" delay={90}>
          {labels.map(({ key, label }) => (
            <div className="countdown__cell" key={key}>
              <span className="countdown__value">
                {String(time[key]).padStart(2, '0')}
              </span>
              <span className="countdown__label">{label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="save__actions" delay={160}>
          <button type="button" className="btn btn--gold" onClick={() => downloadICS(wedding.events)}>
            <CalendarIcon />
            Add to calendar
          </button>
          <button type="button" className="btn btn--ghost-light" onClick={share}>
            <ShareIcon />
            {shared ? 'Link copied' : 'Share invitation'}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
