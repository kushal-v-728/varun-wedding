import { wedding, type WeddingEvent, venueOf } from '../config';
import { googleCalendarUrl } from '../lib/calendar';
import { Chapter } from './Chapter';
import {
  CalendarIcon,
  ClockIcon,
  DressIcon,
  MehndiIcon,
  PinIcon,
  RingIcon,
  SparkleIcon,
  SunIcon,
} from './Ornaments';

const ICONS = {
  sun: SunIcon,
  mehandi: MehndiIcon,
  sparkle: SparkleIcon,
  ring: RingIcon,
} as const;

function EventCard({ event }: { event: WeddingEvent }) {
  const day = event.dateISO.slice(-2);
  const Icon = ICONS[event.icon];
  const venue = venueOf(event);

  return (
    <article className={`event event--${event.tone}`}>
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
        <div>
          <dt>
            <PinIcon />
            <span className="sr-only">Venue</span>
          </dt>
          <dd>
            {venue.name}
            {venue.id === 'ashoka' ? ` · ${venue.subtitle}` : ''}
          </dd>
        </div>
      </dl>

      <p className="event__blurb">{event.blurb}</p>

      {event.dressCode && (
        <p className="event__dress">
          <DressIcon />
          <span>
            Dress code <strong>{event.dressCode}</strong>
          </span>
        </p>
      )}

      <div className="event__actions">
        <a className="link-underline" href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
          Add to calendar
        </a>
        <a className="link-underline" href={venue.directionsUrl} target="_blank" rel="noreferrer">
          Directions
        </a>
      </div>
    </article>
  );
}

export function Events() {
  const card = wedding.celebrationCard;

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
        Three days, <em>one promise</em>
      </h2>
      <p className="section-sub">
        Haldi and mehandi under the open sky, then the evening of joy and the sacred morning
        that follows. We would be honoured to have you with us for all of it.
      </p>

      <div className="events__stack">
        {wedding.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <a
        className="events__card"
        href={`${import.meta.env.BASE_URL}images/${card.src}.webp`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/${card.src}.webp`}
          alt={card.alt}
          width={820}
          height={1230}
          loading="lazy"
          decoding="async"
        />
        <span className="events__card-caption">
          {card.caption}
          <em>Tap to open</em>
        </span>
      </a>

      <div className="events__venues">
        <p>
          <PinIcon />
          <span>
            <strong>25 November</strong> — {wedding.venues.ashoka.name} ({wedding.venues.ashoka.subtitle}),{' '}
            {wedding.venues.ashoka.addressLines.join(', ')}
          </span>
        </p>
        <p>
          <PinIcon />
          <span>
            <strong>26 &amp; 27 November</strong> — {wedding.venue.name},{' '}
            {wedding.venue.addressLines.join(', ')}
          </span>
        </p>
        <a href="#venue" className="link-underline">
          View both venues
        </a>
      </div>

    </Chapter>
  );
}
