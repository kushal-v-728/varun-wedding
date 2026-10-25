import { wedding } from '../config';
import { Chapter } from './Chapter';
import { CornerFlourish, LotusDivider } from './Ornaments';

export function Story() {
  return (
    <Chapter
      id="story"
      left={{ id: 'pose', frame: 'oval', drift: 44 }}
      right={{ id: 'embrace', frame: 'arch', drift: -34 }}
    >
      <p className="eyebrow">
        <span className="eyebrow__rule" />
        {wedding.story.eyebrow}
        <span className="eyebrow__rule" />
      </p>
      <h2 className="section-title">
        Two hearts,
        <br />
        <em>one journey</em>
      </h2>

      <LotusDivider />

      <p className="story__body">{wedding.story.body}</p>
      <p className="story__signature">{wedding.story.signature}</p>

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
          25 <span>·</span> 26 <span>·</span> 27 November <span>·</span> 2026
        </p>
        <p className="invite-card__venue">
          {wedding.venue.name}
          <br />
          {wedding.venue.addressLines.join(', ')}
        </p>

        <p className="invite-card__hashtag">{wedding.hashtag}</p>
      </article>
    </Chapter>
  );
}
