import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { QuickBar } from './components/QuickBar';
import { Intro } from './components/Intro';
import { SaveTheDate } from './components/SaveTheDate';
import { Invitation } from './components/Invitation';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Blessing } from './components/Blessing';
import { Venue } from './components/Venue';
import { Rsvp } from './components/Rsvp';
import { Footer } from './components/Footer';
import { useIntro } from './components/Reveal';

export default function App() {
  const { ready, hidden } = useIntro();

  return (
    <>
      <Intro opening={ready} hidden={hidden} />
      <a href="#invitation" className="skip-link">
        Skip to invitation
      </a>
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <SaveTheDate />
        <Invitation />
        <Events />
        <Blessing />
        <Gallery />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
      <QuickBar />
    </>
  );
}
