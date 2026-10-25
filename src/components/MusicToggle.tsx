import type { MusicState } from '../lib/music';

/**
 * The guest's music switch, bottom-left.
 *
 * The animated disc is the song itself. Beside it sits a small mute bubble —
 * shown whenever the song is off, because the browser refused an auto-start or
 * the guest paused it. Tapping the bubble turns the sound on and the bubble
 * tucks itself back behind the disc.
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
  const unmuted = playing;

  return (
    <div className={`music-dock ${hidden ? 'is-hidden' : ''}`}>
      <button
        type="button"
        className={`music ${playing ? 'is-playing' : ''}`}
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

      <button
        type="button"
        className={`music__mute ${unmuted ? 'is-gone' : ''} ${
          state === 'blocked' && !quiet ? 'is-hint' : ''
        }`}
        onClick={onToggle}
        aria-label="Turn the music on"
        aria-hidden={unmuted}
        tabIndex={unmuted ? -1 : 0}
        title="Turn the music on"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M11 4.8 6.6 8.8H3.2v6.4h3.4L11 19.2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M15.6 9.6 20 14M20 9.6 15.6 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
