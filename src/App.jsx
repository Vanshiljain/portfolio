import { useState } from "react";
import Preloader from "./components/Preloader";
import BackgroundFX from "./components/BackgroundFX";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import SectionDots from "./components/SectionDots";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <div className="film-grain bg-noise" aria-hidden="true" />
      <BackgroundFX />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SectionDots />
      <main className={`relative z-[1] transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
