import { wedding, type WeddingEvent } from '../config';
import { googleCalendarUrl } from '../lib/calendar';
import { CalendarIcon, ClockIcon, PinIcon, RingIcon, SparkleIcon } from './Ornaments';
import { Reveal } from './Reveal';

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const day = event.dateISO.slice(-2);
  const Icon = event.icon === 'ring' ? RingIcon : SparkleIcon;

  return (
    <Reveal as="article" className={`event event--${index % 2 === 0 ? 'rose' : 'sage'}`} delay={index * 110}>
      <span className="event__day" aria-hidden="true">
        {day}
      </span>
      <div className="event__top">
        <span className="event__icon">
          <Icon />
        </span>
        <p className="event__kicker">{event.kicker}</p>
        <h3 className="event__title">{event.title}</h3>
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
        <a
          className="link-underline"
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noreferrer"
        >
          Add to calendar
        </a>
        <a className="link-underline" href={wedding.venue.directionsUrl} target="_blank" rel="noreferrer">
          Directions
        </a>
      </div>
    </Reveal>
  );
}

export function Events() {
  return (
    <section className="events section" id="events">
      <div className="container">
        <Reveal className="section-head">
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
        </Reveal>

        <div className="events__grid">
          {wedding.events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        <Reveal className="events__venue" delay={80}>
          <PinIcon />
          <span>
            Both ceremonies take place at <strong>{wedding.venue.name}</strong>,{' '}
            {wedding.venue.addressLines.join(', ')}
          </span>
          <a href="#venue" className="link-underline">
            View venue
          </a>
        </Reveal>
      </div>
    </section>
  );
}
