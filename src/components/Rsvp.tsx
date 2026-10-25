import { useState, type FormEvent } from 'react';
import { wedding } from '../config';
import { ArrowRightIcon, CheckIcon, HeartIcon, WhatsappIcon } from './Ornaments';
import { Reveal } from './Reveal';

const guestOptions = ['1 guest', '2 guests', '3 guests', '4 guests', '5 or more'];

export function Rsvp() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(guestOptions[0]);
  const [attending, setAttending] = useState<string[]>(['Reception', 'Muhurtha']);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const toggle = (value: string) =>
    setAttending((cur) => (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Namaskara! This is ${name.trim() || 'a guest'}.`,
      `I would love to attend: ${attending.length ? attending.join(' & ') : 'the celebrations'}.`,
      `Number of guests: ${guests}.`,
      note.trim() ? `Note: ${note.trim()}` : '',
      `— RSVP for ${wedding.groom.shortName} & ${wedding.bride.shortName}'s wedding (Nov 2026)`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const url = wedding.rsvpWhatsApp
      ? `https://wa.me/${wedding.rsvpWhatsApp}?text=${text}`
      : `https://wa.me/?text=${text}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section className="rsvp" id="rsvp">
      <div className="rsvp__texture" aria-hidden="true" />
      <div className="container rsvp__inner">
        <Reveal className="rsvp__copy">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__rule" />
            RSVP
          </p>
          <h2 className="section-title section-title--light">
            Will you be <em>there?</em>
          </h2>
          <p className="rsvp__body">
            Nothing would make us happier than celebrating with you. Let us know you're coming
            and we'll keep a seat — and a plate — ready for you.
          </p>
          <ul className="rsvp__list">
            <li>
              <CheckIcon />
              Reception · 26 Nov, 7:15 PM
            </li>
            <li>
              <CheckIcon />
              Muhurtha · 27 Nov, 9:20 AM
            </li>
          </ul>
          <p className="rsvp__hashtag">{wedding.hashtag}</p>
        </Reveal>

        <Reveal className="rsvp__card" delay={100}>
          {sent ? (
            <div className="rsvp__done">
              <span className="rsvp__done-icon">
                <HeartIcon />
              </span>
              <h3>Almost there!</h3>
              <p>
                WhatsApp should have opened with your RSVP ready to go. Just press{' '}
                <strong>send</strong> and we'll have your message.
              </p>
              <button type="button" className="btn btn--line" onClick={() => setSent(false)}>
                Edit my RSVP
              </button>
            </div>
          ) : (
            <form className="rsvp__form" onSubmit={submit}>
              <h3 className="rsvp__form-title">Send your RSVP</h3>

              <label className="field">
                <span className="field__label">Your name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Rao"
                  autoComplete="name"
                  required
                />
              </label>

              <fieldset className="field field--fieldset">
                <legend className="field__label">Which celebrations?</legend>
                <div className="chips">
                  {['Reception', 'Muhurtha'].map((ev) => (
                    <label key={ev} className={`chip ${attending.includes(ev) ? 'is-on' : ''}`}>
                      <input
                        type="checkbox"
                        checked={attending.includes(ev)}
                        onChange={() => toggle(ev)}
                      />
                      <span className="chip__dot" aria-hidden="true" />
                      {ev}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field-row">
                <label className="field">
                  <span className="field__label">Guests</span>
                  <div className="select-wrap">
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      {guestOptions.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <label className="field">
                <span className="field__label">A note for us (optional)</span>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Blessings, dietary preferences, or a song request…"
                />
              </label>

              <button type="submit" className="btn btn--solid btn--block">
                <WhatsappIcon />
                Send RSVP on WhatsApp
                <ArrowRightIcon />
              </button>
              <p className="rsvp__hint">
                This opens WhatsApp with your message ready — nothing is sent automatically.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
