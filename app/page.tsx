import { Hero } from "../components/Hero";
import { TheStory } from "../components/TheStory";
import { TheLoop } from "../components/TheLoop";
import { TheJourney } from "../components/TheJourney";
import { TheInspiration } from "../components/TheInspiration";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div id="hero">
        <Hero />
      </div>
      <div id="story">
        <TheStory />
      </div>
      <div id="loop">
        <TheLoop />
      </div>
      <div id="inspiration">
        <TheInspiration />
      </div>
      <div id="journey">
        <TheJourney />
      </div>
      <div id="contact">
        <Contact />
      </div>

      <footer className="py-12 text-center font-mono text-sm text-gray-400">
        <p>© {new Date().getFullYear()} The Iterator Project. Built with failure.</p>
      </footer>
    </main>
  );
}
