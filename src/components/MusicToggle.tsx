import type { MusicState } from '../lib/music';

/**
 * The wave disc, bottom-left. Music starts with the tap that opens the doors;
 * this is how a guest who would rather have silence turns it off again.
 */
export function MusicToggle({
  state,
  onToggle,
  hidden,
}: {
  state: MusicState;
  onToggle: () => void;
  hidden: boolean;
}) {
  const playing = state === 'playing';
  const label = playing ? 'Pause music' : state === 'finished' ? 'Play music again' : 'Play music';

  return (
    <button
      type="button"
      className={`music ${playing ? 'is-playing' : ''} ${
        state === 'blocked' ? 'is-hint' : ''
      } ${hidden ? 'is-hidden' : ''}`}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={playing}
      title={label}
    >
      <span className="music__ring" aria-hidden="true" />
      <span className={`music__bars ${playing ? 'is-on' : ''}`} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
