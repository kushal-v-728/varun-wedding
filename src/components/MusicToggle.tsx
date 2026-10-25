import type { MusicState } from '../lib/music';

/**
 * Small disc in the corner. It is the guest's volume knob and their switch —
 * and it is the only reliable way to start audio, because browsers block
 * sound that begins without a tap.
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
      {state === 'blocked' && <span className="music__tip">Tap for music</span>}
    </button>
  );
}
