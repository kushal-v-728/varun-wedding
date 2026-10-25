import { wedding, type WeddingEvent } from '../config';
import { googleCalendarUrl } from '../lib/calendar';
import { Chapter } from './Chapter';
import { CalendarIcon, ClockIcon, PinIcon, RingIcon, SparkleIcon } from './Ornaments';

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const day = event.dateISO.slice(-2);
  const Icon = event.icon === 'ring' ? RingIcon : SparkleIcon;

  return (
    <article className={`event event--${index % 2 === 0 ? 'rose' : 'sage'}`}>
      <span className="event__day" aria-hidden="true">
        {day}
      </span>
      <div className="event__top">
        <span className="event__icon">
          <Icon />
        </span>
        <div>
          <p className="event__kicker">{event.kicker}</p>
          <h3 className="event__title">{event.title}</h3>
        </div>
      </div>

      <dl className="event__meta">
        <div>
          <dt>
            <CalendarIcon />
            <span className="sr-only">Date</span>
          </dt>
          <dd>{event.dateLabel}</dd>
        </div>
        <div>
          <dt>
            <ClockIcon />
            <span className="sr-only">Time</span>
          </dt>
          <dd>{event.timeLabel}</dd>
        </div>
      </dl>

      <p className="event__blurb">{event.blurb}</p>

      <div className="event__actions">
        <a className="link-underline" href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
          Add to calendar
        </a>
        <a className="link-underline" href={wedding.venue.directionsUrl} target="_blank" rel="noreferrer">
          Directions
        </a>
      </div>
    </article>
  );
}

export function Events() {
  return (
    <Chapter
      id="events"
      left={{ id: 'seated', frame: 'pill', drift: 52, caption: 'The proposal' }}
      right={{ id: 'embrace', frame: 'oval', drift: -40 }}
    >
      <p className="eyebrow">
        <span className="eyebrow__rule" />
        The celebrations
        <span className="eyebrow__rule" />
      </p>
      <h2 className="section-title">
        Two days, <em>one promise</em>
      </h2>
      <p className="section-sub">
        We would be honoured to have you with us for both the evening of joy and the
        sacred morning that follows.
      </p>

      <div className="events__stack">
        {wedding.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>

      <p className="events__venue">
        <PinIcon />
        <span>
          Both ceremonies take place at <strong>{wedding.venue.name}</strong>,{' '}
          {wedding.venue.addressLines.join(', ')}
        </span>
        <a href="#venue" className="link-underline">
          View venue
        </a>
      </p>
    </Chapter>
  );
}
