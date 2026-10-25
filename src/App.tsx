import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { QuickBar } from './components/QuickBar';
import { Doors, useDoorIntro } from './components/Doors';
import { SaveTheDate } from './components/SaveTheDate';
import { Story } from './components/Story';
import { Events } from './components/Events';
import { Blessing } from './components/Blessing';
import { Venue } from './components/Venue';
import { Rsvp } from './components/Rsvp';
import { Footer } from './components/Footer';
import { LightboxProvider } from './components/Lightbox';
import { MusicToggle } from './components/MusicToggle';
import { usePageMusic } from './lib/music';

export default function App() {
  const { opening, done, ready, openedBy, openNow } = useDoorIntro();
  const music = usePageMusic();
  /** The guest switched the song off on purpose — don't start it behind their back. */
  const [dismissed, setDismissed] = useState(false);

  // Opening the doors is a tap, and a tap is the permission browsers need, so
  // the song starts right there. Silence is one tap away on the wave disc.
  const openWithMusic = () => {
    if (music.hasMusic) void music.requestStart();
    openNow();
  };

  const toggleMusic = () => {
    setDismissed(music.state === 'playing');
    music.toggle();
  };

  // The doors that open on their own (15 s) carry no gesture, so the browser
  // usually refuses sound. Try anyway — the first touch below will retry.
  useEffect(() => {
    if (!opening || openedBy !== 'timer' || !music.hasMusic) return;
    void music.requestStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opening, openedBy]);

  // Fallback: once the cover is gone, the first tap/keypress anywhere starts
  // the song, unless the guest has already turned it off.
  useEffect(() => {
    if (!done || dismissed || !music.hasMusic) return;
    if (music.state === 'playing' || music.state === 'finished') return;

    const types = ['pointerup', 'touchend', 'click', 'keydown'] as const;
    const options: AddEventListenerOptions = { capture: true, passive: true };
    const onGesture = () => {
      void music.requestStart();
    };
    types.forEach((t) => document.addEventListener(t, onGesture, options));
    return () => types.forEach((t) => document.removeEventListener(t, onGesture, options));
  }, [done, dismissed, music.hasMusic, music.state, music.requestStart]);

  return (
    <LightboxProvider>
      <Doors opening={opening} done={done} onOpen={openWithMusic} />

      <a href="#story" className="skip-link">
        Skip to the invitation
      </a>
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <SaveTheDate />
        <Story />
        <Events />
        <Blessing />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
      <QuickBar />
      {music.hasMusic && (
        <MusicToggle state={music.state} onToggle={toggleMusic} hidden={!done} />
      )}
    </LightboxProvider>
  );
}
