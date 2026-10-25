import { wedding } from '../config';
import { Mandala } from './Ornaments';
import { Reveal } from './Reveal';

/** Slim band of blessing between the celebrations and the photographs. */
export function Blessing() {
  return (
    <section className="blessing" aria-label="Blessing">
      <Mandala className="blessing__mandala" />
      <div className="container blessing__inner">
        <Reveal>
          <p className="blessing__kannada" lang="kn">
            {wedding.kannada.blessing}
          </p>
          <p className="blessing__translation">{wedding.blessingTranslation}</p>
        </Reveal>
      </div>
    </section>
  );
}
