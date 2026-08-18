import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundMotion from './components/BackgroundMotion';
import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="min-h-screen text-text-primary relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900"
        style={{ backgroundColor: 'var(--aurora-bg)', color: 'var(--text-primary)' }}
      >
        {/* Custom cursor — desktop only, auto-disabled on touch */}
        <CustomCursor />

        {/* Aurora atmosphere — fixed, behind everything */}
        <BackgroundMotion />

        {/* Content — scrollable, above background */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LazyMotion>
  );
}

export default App;
