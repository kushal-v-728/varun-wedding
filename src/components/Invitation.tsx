import { wedding } from '../config';
import { CornerFlourish, LotusDivider } from './Ornaments';
import { Reveal } from './Reveal';

export function Invitation() {
  return (
    <section className="invite section" id="invitation">
      <div className="container invite__inner">
        <Reveal className="invite__copy">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            {wedding.story.eyebrow}
          </p>
          <h2 className="section-title">
            Two hearts,
            <br />
            <em>one journey</em>
          </h2>
          <p className="invite__body">{wedding.story.body}</p>
          <p className="invite__signature">{wedding.story.signature}</p>
          <div className="invite__facts">
            <div>
              <span className="invite__fact-label">The groom</span>
              <span className="invite__fact-value">{wedding.groom.fullName}</span>
            </div>
            <span className="invite__fact-divider" aria-hidden="true" />
            <div>
              <span className="invite__fact-label">The bride</span>
              <span className="invite__fact-value">{wedding.bride.fullName}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="invite__card-wrap" delay={120}>
          <article className="invite-card">
            <CornerFlourish className="corner corner--tl" />
            <CornerFlourish className="corner corner--tr" />
            <CornerFlourish className="corner corner--bl" />
            <CornerFlourish className="corner corner--br" />

            <p className="invite-card__kicker">Together with our families</p>
            <p className="invite-card__kannada" lang="kn">
              {wedding.kannada.bless}
            </p>

            <p className="invite-card__request">we invite you to celebrate the wedding of</p>

            <h3 className="invite-card__names">
              <span>{wedding.groom.shortName}</span>
              <em>&amp;</em>
              <span>{wedding.bride.shortName}</span>
            </h3>
            <p className="invite-card__full">
              {wedding.groom.fullName} &amp; {wedding.bride.fullName}
            </p>

            <LotusDivider className="invite-card__divider" />

            <p className="invite-card__date">
              26 <span>·</span> 27 November <span>·</span> 2026
            </p>
            <p className="invite-card__venue">
              {wedding.venue.name}
              <br />
              {wedding.venue.addressLines.join(', ')}
            </p>

            <p className="invite-card__hashtag">{wedding.hashtag}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
