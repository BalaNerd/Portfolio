import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'about',      label: 'About'      },
  { id: 'projects',   label: 'Work'       },
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
];

const Navbar: React.FC = () => {
  const [isOpen,         setIsOpen]         = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [hoveredItem,    setHoveredItem]    = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 30);
  });

  // IntersectionObserver — track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="transition-all duration-300"
          style={{
            background: isScrolled
              ? 'rgba(251, 251, 254, 0.92)'
              : 'rgba(251, 251, 254, 0.5)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: isScrolled
              ? '1px solid rgba(15, 23, 42, 0.08)'
              : '1px solid transparent',
            boxShadow: isScrolled ? '0 4px 20px -4px rgba(15, 23, 42, 0.04)' : 'none',
          }}
        >
          <div className="container-main">
            <div className="flex items-center justify-between h-[72px]">

              {/* Brand Wordmark */}
              <motion.button
                onClick={() => scrollToSection('home')}
                className="font-display font-800 tracking-widest uppercase text-text-primary hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none"
                whileHover={{ scale: 1.02 }}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.14em', fontSize: '0.85rem' }}
              >
                S. BALA RAJU
              </motion.button>

              {/* Desktop Nav: Generous horizontal spacing & distinct Resume separation */}
              <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main navigation">
                <div className="flex items-center gap-6 lg:gap-8">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className="nav-link px-2 py-1 block cursor-pointer bg-transparent border-none text-xs lg:text-sm font-semibold tracking-wider transition-colors"
                          style={{
                            color: isActive ? '#0e0f1a' : '#475569',
                            fontFamily: 'var(--font-display)',
                          }}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.label}
                        </button>

                        {/* Active / hover indicator */}
                        <AnimatePresence>
                          {(isActive || hoveredItem === item.id) && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full"
                              style={{ background: 'var(--electric)' }}
                              initial={{ opacity: 0, scaleX: 0 }}
                              animate={{ opacity: isActive ? 1 : 0.45, scaleX: 1 }}
                              exit={{ opacity: 0, scaleX: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Subtle vertical divider */}
                <div className="h-4 w-px bg-slate-300/80 mx-1" aria-hidden="true" />

                {/* Separate Resume CTA Button */}
                <MagneticButton
                  as="a"
                  href="https://drive.google.com/file/d/1vXHajmIwRf1-Bo7TGxmV4ZXL63WlD4ev/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-1.5"
                  style={{
                    padding: '0.45rem 1.15rem',
                    fontSize: '0.8rem',
                    fontWeight: 650,
                    borderRadius: '0.625rem',
                    borderColor: 'rgba(99, 102, 241, 0.25)',
                    background: 'rgba(99, 102, 241, 0.06)',
                    color: '#4338ca',
                  } as React.CSSProperties}
                  aria-label="View Resume"
                >
                  Resume <ArrowUpRight size={13} />
                </MagneticButton>
              </nav>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white/80 text-text-primary hover:text-indigo-600 hover:border-indigo-300 transition-all cursor-pointer shadow-xs"
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={19} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen animated drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(251, 251, 254, 0.98)',
              backdropFilter: 'blur(28px)',
            }}
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-4 pt-20 px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.05, duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="block px-6 py-3 text-3xl font-display font-700 text-text-primary hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.25 }}
                className="mt-6"
              >
                <a
                  href="https://drive.google.com/file/d/1vXHajmIwRf1-Bo7TGxmV4ZXL63WlD4ev/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  Resume <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </div>

            {/* Mobile drawer footer */}
            <motion.div
              className="pb-10 flex justify-center gap-8 text-text-muted text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <a href="https://github.com/BalaNerd" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors font-semibold">GitHub</a>
              <a href="https://www.linkedin.com/in/s-balaraju/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors font-semibold">LinkedIn</a>
              <a href="mailto:balaraju1805@gmail.com" className="hover:text-indigo-600 transition-colors font-semibold">Email</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
