import { useState } from 'react';
import { wedding } from '../config';
import { CheckIcon, CopyIcon, LotusDivider, PinIcon } from './Ornaments';
import { Reveal } from './Reveal';

export function Venue() {
  const [copied, setCopied] = useState('');

  const copyAddress = async (key: string, name: string, address: string) => {
    try {
      await navigator.clipboard.writeText(`${name}, ${address}`);
      setCopied(key);
      window.setTimeout(() => setCopied(''), 2200);
    } catch {
      /* clipboard blocked — the address is visible anyway */
    }
  };

  const ashoka = wedding.venues.ashoka;

  return (
    <section className="venue section" id="venue">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            The venues
            <span className="eyebrow__rule" />
          </p>
          <h2 className="section-title">
            Find your way <em>to us</em>
          </h2>
          <LotusDivider />
        </Reveal>

        <div className="venue__inner">
          <Reveal className="venue__card">
            <span className="venue__icon">
              <PinIcon />
            </span>
            <p className="venue__tag">Reception &amp; Muhurtha</p>
            <h3 className="venue__name">{wedding.venue.name}</h3>
            <p className="venue__address">
              {wedding.venue.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>

            <div className="venue__actions">
              <a
                className="btn btn--solid"
                href={wedding.venue.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
              <button
                type="button"
                className="btn btn--line"
                onClick={() => copyAddress('main', wedding.venue.name, wedding.venue.address)}
              >
                {copied === 'main' ? <CheckIcon /> : <CopyIcon />}
                {copied === 'main' ? 'Address copied' : 'Copy address'}
              </button>
            </div>

            <div className="venue__note">
              <p>
                <strong>Good to know</strong>
                The reception and the muhurtha are held here, in Chitradurga town — about 200 km
                from Bengaluru on NH-48.
              </p>
            </div>
          </Reveal>

          <Reveal className="venue__map" delay={120}>
            <div className="venue__map-frame">
              {/* Sits beneath the map: if the embed is blocked (offline, strict
                  privacy settings, no JS) guests still get a usable panel. */}
              <div className="venue__map-fallback">
                <PinIcon />
                <p>
                  <strong>{wedding.venue.name}</strong>
                  {wedding.venue.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
              <iframe
                title={`Map to ${wedding.venue.name}`}
                src={wedding.venue.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="venue__map-link"
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="venue__extra" delay={80}>
          <div className="venue__extra-text">
            <div className="venue__extra-head">
              <span className="venue__icon">
                <PinIcon />
              </span>
              <p className="venue__tag">Haldi &amp; Mehandi / Sangeeth · 25 November</p>
            </div>
            <h3 className="venue__name">
              {ashoka.name} <span>{ashoka.subtitle}</span>
            </h3>
            <p className="venue__address">
              {ashoka.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
          <div className="venue__actions">
            <a className="btn btn--solid" href={ashoka.directionsUrl} target="_blank" rel="noreferrer">
              Get directions
            </a>
            <button
              type="button"
              className="btn btn--line"
              onClick={() => copyAddress('ashoka', ashoka.name, ashoka.address)}
            >
              {copied === 'ashoka' ? <CheckIcon /> : <CopyIcon />}
              {copied === 'ashoka' ? 'Address copied' : 'Copy address'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
