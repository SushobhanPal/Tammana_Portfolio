import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? savedTheme === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', isLightTheme);
    document.body.classList.toggle('theme-light', isLightTheme);
    localStorage.setItem('portfolio-theme', isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return (
    <div className={`min-h-screen bg-[#050505] text-zinc-300 font-sans antialiased selection:bg-cyan-500/30 selection:text-white ${isLightTheme ? 'theme-light' : ''}`}>
      <Navbar isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((current) => !current)} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
