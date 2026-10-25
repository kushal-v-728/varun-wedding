import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Page music.
 *
 * Any audio file dropped into `src/assets/audio/` becomes the soundtrack —
 * no code change needed. Delete the file and the player removes itself.
 *
 * Browsers only allow sound to begin inside a real tap or keypress, so the
 * doors ask "open with music?" and the answer is the permission. There is no
 * browser permission dialog for audio — nothing to request, only a gesture.
 */
const files = import.meta.glob('../assets/audio/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const musicSrc: string = Object.values(files)[0] ?? '';

export type MusicState = 'idle' | 'playing' | 'blocked' | 'finished';

/** Half of the device's own volume — a page can never move the device slider. */
const TARGET_VOLUME = 0.5;

/**
 * Safari 16.4+ / iOS 17+ only. Without this, the iPhone ring/silent switch
 * mutes the song. Everywhere else this is silently ignored.
 */
function claimPlaybackSession() {
  try {
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = 'playback';
  } catch {
    /* older Safari has no Audio Session API */
  }
}

export function usePageMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const startingRef = useRef(false);
  const [state, setState] = useState<MusicState>('idle');

  const stopFade = () => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = null;
  };

  const fadeTo = (target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    stopFade();
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.05 : -0.05);
      if (target > audio.volume ? next >= target : next <= target) {
        audio.volume = target;
        stopFade();
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, 60);
  };

  const getAudio = useCallback(() => {
    if (!musicSrc) return null;
    if (!audioRef.current) {
      claimPlaybackSession();
      const audio = new Audio(musicSrc);
      audio.preload = 'auto';
      audio.loop = false;
      audio.volume = 0;
      audio.setAttribute('playsinline', '');
      audio.addEventListener('ended', () => {
        stopFade();
        setState('finished');
      });
      audio.load();
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  /**
   * Start the song. Must be called from inside a tap/keypress the first time,
   * otherwise the browser rejects it and we fall back to the "blocked" state.
   */
  const requestStart = useCallback(async () => {
    const audio = getAudio();
    if (!audio || startingRef.current) return;
    // Already running (a global first-touch handler and the button can both
    // fire for the same tap) — don't restart it from the top.
    if (!audio.paused) {
      setState('playing');
      return;
    }
    startingRef.current = true;
    claimPlaybackSession();
    try {
      // Setting currentTime before metadata arrives throws on Safari.
      if (audio.readyState > 0) {
        try {
          audio.currentTime = 0;
        } catch {
          /* not seekable yet — start from wherever it is */
        }
      }
      audio.volume = 0;
      await audio.play();
      setState('playing');
      fadeTo(TARGET_VOLUME);
    } catch {
      setState('blocked');
    } finally {
      startingRef.current = false;
    }
  }, [getAudio]);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    if (state === 'playing') {
      fadeTo(0);
      window.setTimeout(() => audio.pause(), 320);
      setState('idle');
      return;
    }
    void requestStart();
  }, [getAudio, requestStart, state]);

  /** Warm the file up while the doors are still closed, so the tap is instant. */
  useEffect(() => {
    getAudio();
  }, [getAudio]);

  useEffect(
    () => () => {
      stopFade();
      audioRef.current?.pause();
    },
    [],
  );

  return { hasMusic: Boolean(musicSrc), state, requestStart, toggle };
}
