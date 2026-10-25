import type { MusicState } from '../lib/music';

/**
 * The guest's music switch, bottom-left.
 *
 * When the browser blocked the auto-start it grows into a labelled pill that
 * says "Play music" — a visible, obvious tap target instead of a mystery icon.
 */
export function MusicToggle({
  state,
  onToggle,
  hidden,
  quiet = false,
}: {
  state: MusicState;
  onToggle: () => void;
  hidden: boolean;
  quiet?: boolean;
}) {
  const playing = state === 'playing';
  const label = playing ? 'Pause music' : state === 'finished' ? 'Play music again' : 'Play music';
  // Only nag when the song was blocked — a guest who chose silence stays unbothered.
  const labelled = state === 'blocked' && !quiet;

  return (
    <button
      type="button"
      className={`music ${playing ? 'is-playing' : ''} ${
        state === 'blocked' ? 'is-hint' : ''
      } ${labelled ? 'is-labelled' : ''} ${hidden ? 'is-hidden' : ''}`}
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
      {labelled && <span className="music__label">Play music</span>}
    </button>
  );
}
