import { useEffect, useRef } from 'react';
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
  const musicStarted = useRef(false);

  // The doors are the cue. A tap counts as permission, so the song starts with
  // it; when the doors open by themselves the browser usually refuses sound and
  // the little disc invites a tap instead.
  useEffect(() => {
    if (!opening || !music.hasMusic || musicStarted.current) return;
    musicStarted.current = true;
    if (openedBy === 'timer') void music.requestStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opening, openedBy]);

  const openWithMusic = () => {
    if (music.hasMusic && !musicStarted.current) {
      musicStarted.current = true;
      void music.requestStart();
    }
    openNow();
  };

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
        <MusicToggle state={music.state} onToggle={music.toggle} hidden={!done} />
      )}
    </LightboxProvider>
  );
}
