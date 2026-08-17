import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import VariableProximity from './ui/VariableProximity';
import MagneticButton from './ui/MagneticButton';

const ROLES = ['Full-Stack Developer', 'Data Engineer', 'System Builder', 'Problem Solver'];

const RoleCarousel: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 'clamp(1.6rem, 3.2vw, 2.6rem)' }}
      aria-label={ROLES[index]}
    >
      {ROLES.map((role, i) => (
        <motion.span
          key={role}
          className="absolute inset-0 flex items-center"
          initial={{ y: '100%', opacity: 0 }}
          animate={{
            y: i === index ? '0%' : i < index || (index === 0 && i === ROLES.length - 1) ? '-100%' : '100%',
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.15rem, 2.6vw, 2rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#4338ca',
          }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const ghostTextX = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const socials = [
    { href: 'https://github.com/BalaNerd', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/s-balaraju/', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'mailto:balaraju1805@gmail.com', icon: Mail, label: 'Email' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[76px] pb-12"
    >
      {/* Ghost text background — subtle editorial brutalist texture */}
      <motion.div
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: bgOpacity, x: ghostTextX }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(7rem, 24vw, 24rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(15, 23, 42, 0.022)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          PORTFOLIO
        </span>
      </motion.div>

      {/* Main content container with full horizontal room for single-line title */}
      <motion.div
        className="container-main relative z-10 py-8 md:py-16"
        style={{ y: contentY }}
      >
        <div className="w-full">
          {/* Top Status Bar with intentional, generous breathing room */}
          <motion.div
            className="mb-8 md:mb-10 flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-text-secondary">
              <span className="inline-block w-8 h-px bg-indigo-500/40" />
              <span className="text-indigo-700 font-bold tracking-widest">CSE</span>
              <span className="text-slate-300 font-bold px-1">·</span>
              <span className="tracking-widest text-text-muted font-medium">BIG DATA ANALYTICS</span>
              <span className="inline-block w-8 h-px bg-indigo-500/40" />
            </div>

            {/* Top Location Badge */}
            <div
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white/80 shadow-xs backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] text-text-secondary font-semibold tracking-wider">
                CHENNAI <span className="text-slate-300 mx-0.5">·</span> INDIA
              </span>
            </div>
          </motion.div>

          {/* Name — Dominant Single-Line Desktop Editorial Statement */}
          <h1 className="hero-title mb-6 md:mb-8 overflow-visible" aria-label="S. Bala Raju">
            <div className="w-full leading-none">
              <VariableProximity
                wordsConfig={[
                  { text: 'S.', className: 'text-text-primary' },
                  { text: 'BALA', className: 'text-text-primary' },
                  { text: 'RAJU', className: 'gradient-text', gradient: true },
                ]}
                containerClassName="flex-wrap sm:flex-nowrap items-baseline tracking-tight w-full"
                initialDelay={0.15}
                radius={240}
                maxShiftX={13}
                maxShiftY={16}
                maxScale={0.12}
                maxRotate={3.2}
              />
            </div>
          </h1>

          {/* Editorial divider rule */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/15 to-transparent" />
            <span className="section-label text-[11px] text-text-muted tracking-widest font-mono">
              DATA × SOFTWARE × EXPERIENCES
            </span>
          </motion.div>

          {/* Role Carousel & Description in balanced editorial layout */}
          <div className="grid md:grid-cols-12 gap-8 items-start mb-12">
            {/* Left: Role carousel */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <span className="section-label text-[10px] text-indigo-600 font-bold block mb-1">CURRENT FOCUS</span>
              <RoleCarousel />
            </motion.div>

            {/* Right: Description */}
            <motion.p
              className="md:col-span-7 text-text-secondary font-normal"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                lineHeight: 1.75,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              Building scalable full-stack applications and data-driven systems.
              Chennai, India — turning complex requirements into clean, high-performance digital products.
            </motion.p>
          </div>

          {/* CTAs and Social Connections */}
          <motion.div
            className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-slate-100"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                as="button"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                id="hero-view-work"
                aria-label="View my projects"
              >
                View Work <ArrowUpRight size={16} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://drive.google.com/file/d/1vXHajmIwRf1-Bo7TGxmV4ZXL63WlD4ev/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-1.5"
                aria-label="View Resume"
              >
                Resume <ArrowUpRight size={14} />
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
                aria-label="Get in touch"
              >
                Get in Touch
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/90 bg-white/80 text-text-secondary hover:text-indigo-600 hover:border-indigo-300 hover:bg-white transition-all shadow-xs"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{ animation: 'bounce-arrow 2.2s ease-in-out infinite' }}
      >
        <span className="section-label text-[10px] tracking-widest">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
};

export default Hero;
