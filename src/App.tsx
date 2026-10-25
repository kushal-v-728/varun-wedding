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

export default function App() {
  const { opening, done, ready, openNow } = useDoorIntro();

  return (
    <LightboxProvider>
      <Doors opening={opening} done={done} onOpen={openNow} />

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
    </LightboxProvider>
  );
}
