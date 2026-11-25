import React from 'react';
import { LazyMotion, domAnimation, motion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
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

/* ─────────────────────────────────────────────────
   TOP SCROLL-PROGRESS HAIRLINE (2px high-contrast)
───────────────────────────────────────────────── */
const ScrollProgressHairline: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none shadow-xs"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #4f46e5 0%, #0284c7 50%, #0d9488 100%)',
      }}
    />
  );
};

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="min-h-screen text-text-primary relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900"
        style={{ backgroundColor: 'var(--aurora-bg)', color: 'var(--text-primary)' }}
      >
        {/* Top 2px scroll progress hairline */}
        <ScrollProgressHairline />

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
        <Analytics />
      </div>
    </LazyMotion>
  );
}

export default App;
