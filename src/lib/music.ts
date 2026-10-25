import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Page music.
 *
 * Any audio file dropped into `src/assets/audio/` becomes the soundtrack —
 * no code change needed. Delete the file and the player removes itself.
 */
const files = import.meta.glob('../assets/audio/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const musicSrc: string = Object.values(files)[0] ?? '';

export type MusicState = 'idle' | 'playing' | 'blocked' | 'finished';

const TARGET_VOLUME = 0.55;
/** Never let a long file drift on forever — stop shortly after the couple's clip. */
const HARD_CAP_SECONDS = 40;

export function usePageMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const capRef = useRef<number | null>(null);
  const [state, setState] = useState<MusicState>('idle');

  const clearTimers = () => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    if (capRef.current) window.clearTimeout(capRef.current);
    fadeRef.current = null;
    capRef.current = null;
  };

  const fadeTo = (target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.05 : -0.05);
      if (target > audio.volume ? next >= target : next <= target) {
        audio.volume = target;
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, 60);
  };

  const getAudio = useCallback(() => {
    if (!musicSrc) return null;
    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = musicSrc;
      audio.preload = 'auto';
      audio.volume = 0;
      audio.loop = false;
      audio.addEventListener('ended', () => {
        clearTimers();
        setState('finished');
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  /** Try to start — browsers may refuse until the guest interacts. */
  const requestStart = useCallback(async () => {
    const audio = getAudio();
    if (!audio) return;
    try {
      audio.currentTime = 0;
      await audio.play();
      setState('playing');
      fadeTo(TARGET_VOLUME);
      clearTimers();
      capRef.current = window.setTimeout(() => {
        audio.pause();
        setState('finished');
      }, HARD_CAP_SECONDS * 1000);
    } catch {
      setState('blocked');
    }
  }, [getAudio]);

  const toggle = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    if (state === 'playing') {
      fadeTo(0);
      window.setTimeout(() => audio.pause(), 300);
      clearTimers();
      setState('idle');
      return;
    }
    void requestStart();
  }, [getAudio, requestStart, state]);

  useEffect(
    () => () => {
      clearTimers();
      audioRef.current?.pause();
    },
    [],
  );

  return { hasMusic: Boolean(musicSrc), state, requestStart, toggle };
}
