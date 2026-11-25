import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Code2, Database, Globe, Zap, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';

/* ─────────────────────────────────────────────────
   MINIMALIST TRANSLUCENT TAPE STRIP (w-8 h-5 -top-2.5)
   Frosted masking tape matching the minimal monochrome palette
───────────────────────────────────────────────── */
const TapeStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-5 backdrop-blur-[2px] rounded-[1px] pointer-events-none z-30 transition-transform ${className}`}
    style={{
      backgroundColor: 'rgba(241, 245, 249, 0.85)',
      border: '1px solid rgba(148, 163, 184, 0.28)',
      boxShadow:
        '0 1px 3px rgba(15, 23, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.85)',
    }}
    aria-hidden="true"
  />
);

/* ─────────────────────────────────────────────────
   REALISTIC 3D CURLED WHITE STICKY NOTE COMPONENT
   Crisp matte white paper + directional lighting + pseudo-element curl shadows
───────────────────────────────────────────────── */
interface StickyNoteProps {
  children: React.ReactNode;
  tilt: number;
  curlCorner?: 'left' | 'right' | 'both';
  className?: string;
  delay?: number;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  tilt,
  curlCorner = 'right',
  className = '',
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.38,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full h-full"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          rotate: isHovered ? 0 : tilt,
          y: isHovered ? -5 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`curled-paper-note relative ${className}`}
      >
        {/* Minimalist frosted tape strip centered at top edge */}
        <TapeStrip />

        {/* Paper card surface (relative z-10 over the ::before/::after curl drop shadows) */}
        <div
          className={`relative z-10 w-full h-full p-6 border border-slate-900/8 transition-shadow duration-280 bg-white ${
            curlCorner === 'left'
              ? 'rounded-[4px] rounded-bl-[14px]'
              : curlCorner === 'right'
              ? 'rounded-[4px] rounded-br-[14px]'
              : 'rounded-[4px] rounded-b-[10px]'
          }`}
          style={{
            boxShadow: isHovered
              ? '0 10px 24px -4px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)'
              : '0 4px 14px -3px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* Subtle directional paper lighting gradient */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[3px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.6) 60%, rgba(15,23,42,0.04) 100%)',
            }}
          />

          {/* Top subtle adhesive band shadow */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-slate-900/[0.03] to-transparent pointer-events-none rounded-t-[3px]" />

          {/* Card Body with Work Card System Typography */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────
   PORTRAIT PHOTO PRINT — Matte pinned photograph with frosted tape
───────────────────────────────────────────────── */
const PortraitPhotoPrint: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 6,
    });
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{
          rotate: hovered ? 0 : 0.4,
          y: hovered ? -5 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="curled-paper-note relative"
      >
        {/* Frosted masking tape strip pinning the photo print */}
        <TapeStrip />

        {/* Outer matte photo frame */}
        <div
          className="relative z-10 rounded-[4px] rounded-br-[12px] border border-slate-900/10 p-2.5 bg-white w-full transition-shadow duration-280"
          style={{
            boxShadow: hovered
              ? '0 14px 28px -6px rgba(15, 23, 42, 0.16), 0 3px 8px -2px rgba(15, 23, 42, 0.06)'
              : '0 6px 18px -6px rgba(15, 23, 42, 0.10), 0 1px 3px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* Inner photo container */}
          <div className="relative overflow-hidden rounded-[2px] bg-slate-100 min-h-[380px] lg:min-h-[400px]">
            <motion.div
              style={{ y: imgY }}
              animate={
                hovered
                  ? { rotateY: mousePos.x * 0.4, rotateX: -mousePos.y * 0.3, scale: 1.02 }
                  : { rotateY: 0, rotateX: 0, scale: 1 }
              }
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="w-full h-full absolute inset-0"
            >
              <img
                src="/profile.png"
                alt="S. Balaraju — Full Stack Developer"
                draggable={false}
                style={{
                  width: '100%',
                  height: '110%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            </motion.div>

            {/* Vignette overlay for text legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.3) 24%, transparent 48%)',
              }}
            />

            {/* Bottom caption plate stamped on print */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-4 flex items-end justify-between">
              <div>
                <p
                  className="font-display font-bold text-white text-base leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  S. Balaraju
                </p>
                <p className="font-mono text-[10px] font-semibold tracking-wider text-slate-300 uppercase mt-0.5">
                  Full-Stack Developer
                </p>
              </div>

              {/* Pulsing Availability indicator */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-xs border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-emerald-300">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────
   ABOUT SECTION — White 3D Curled Sticky-Note Bento Layout
───────────────────────────────────────────────── */
const About: React.FC = () => {
  const capabilities = [
    {
      icon: Code2,
      label: '01 · ARCHITECTURE',
      title: 'Full-Stack Dev',
      desc: 'React, Next.js, Node.js — end-to-end product engineering with precision.',
      tilt: -1.2,
      curlCorner: 'left' as const,
    },
    {
      icon: Database,
      label: '02 · DATA SYSTEMS',
      title: 'Data & Backend',
      desc: 'Designing efficient APIs, scalable schemas, and high-throughput pipelines.',
      tilt: 0.9,
      curlCorner: 'right' as const,
    },
    {
      icon: Globe,
      label: '03 · RESOLUTION',
      title: 'Problem Solver',
      desc: 'Translating complex real-world requirements into clean, performant software.',
      tilt: -0.7,
      curlCorner: 'right' as const,
    },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main">
        {/* Section header with baseline mask slide reveal — UNTOUCHED */}
        <div className="mb-16">
          <div className="overflow-hidden mb-3">
            <motion.span
              className="section-label block text-indigo-600 font-mono tracking-widest uppercase text-xs font-bold"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              01 — About
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="section-title text-text-primary"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              The person
              <br />
              <span className="gradient-text">behind the code.</span>
            </motion.h2>
          </div>
        </div>

        {/* ── 2-COLUMN BENTO GRID (FLUSH EDGES, ZERO DEAD SPACE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* ── LEFT COLUMN (lg:col-span-4, sticky top-24): Portrait + Location Note ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-7">
            {/* Pinned Portrait Photo Print with Frosted Tape */}
            <PortraitPhotoPrint />

            {/* Location Sticky Note (Crisp White #FFFFFF, -1.2deg tilt) */}
            <StickyNote
              tilt={-1.2}
              curlCorner="left"
              delay={0.08}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Eyebrow Label: matching CanteenConnect pill style */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                    <MapPin size={12} className="text-slate-500" />
                    LOCATION
                  </span>
                </div>

                {/* Card Title: font-sans font-bold tracking-[-0.02em] text-slate-950 */}
                <h3 className="font-sans font-bold tracking-[-0.02em] text-slate-950 text-[20px] md:text-[21px] leading-snug mb-1">
                  Kanyakumari / Chennai
                </h3>
                {/* Body Description: font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 */}
                <p className="font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600">
                  Tamil Nadu, India
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-3.5 border-t border-slate-900/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-sans font-normal text-[14px] text-slate-600">
                  Open to remote opportunities
                </span>
              </div>
            </StickyNote>
          </div>

          {/* ── RIGHT COLUMN (lg:col-span-8): Bio Wide Note + Row 2 (2-Col) + Row 3 (3-Col) ── */}
          <div className="lg:col-span-8 flex flex-col gap-7">
            {/* Row 1 — Bio Intro Wide Note (Crisp White #FFFFFF, 0.5deg tilt) */}
            <StickyNote
              tilt={0.5}
              curlCorner="right"
              delay={0.04}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Eyebrow Label */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                    01 · PROFILE
                  </span>
                </div>

                {/* Bio statement: font-sans font-semibold tracking-[-0.02em] text-slate-950 */}
                <p
                  className="font-sans font-semibold tracking-[-0.02em] text-slate-950 leading-[1.5]"
                  style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)' }}
                >
                  “I build full-stack applications, data-driven systems and interactive digital experiences
                  — bridging the gap between complex data and beautiful interfaces.”
                </p>
              </div>

              {/* Action Links: font-mono text-[11px]-[12px] font-medium text-slate-600 */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-900/10 flex-wrap">
                <motion.a
                  href="https://github.com/BalaNerd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-900/10 bg-slate-900/[0.02] hover:bg-slate-900/[0.05] hover:border-slate-900/20 text-slate-600 hover:text-slate-950 transition-all font-mono text-[12px] font-medium tabular-nums shadow-2xs active:scale-[0.98]"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GithubIcon size={14} /> BalaNerd
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/s-balaraju/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-900/10 bg-slate-900/[0.02] hover:bg-slate-900/[0.05] hover:border-slate-900/20 text-slate-600 hover:text-slate-950 transition-all font-mono text-[12px] font-medium tabular-nums shadow-2xs active:scale-[0.98]"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LinkedinIcon size={14} /> s-balaraju
                </motion.a>
              </div>
            </StickyNote>

            {/* Row 2 — Equal 2-Column Split: Degree Note & Currently Building Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
              {/* Degree Note (Crisp White #FFFFFF, -1deg tilt) */}
              <StickyNote
                tilt={-1}
                curlCorner="left"
                delay={0.1}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Eyebrow Label: matching CanteenConnect pill style */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                      <GraduationCap size={13} className="text-slate-500" />
                      DEGREE
                    </span>
                    {/* Micro-Metrics / Stats: font-mono text-[11px]–[12px] font-medium tabular-nums text-slate-600 */}
                    <span className="px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11.5px] font-medium tabular-nums text-slate-700">
                      CGPA 8.67
                    </span>
                  </div>

                  {/* Card Title: font-sans font-bold tracking-[-0.02em] text-slate-950 */}
                  <h3 className="font-sans font-bold tracking-[-0.02em] text-slate-950 text-[20px] md:text-[21px] leading-snug mb-1">
                    Bachelor of Technology <br />
                    <span className="text-[15px] font-medium text-slate-600 tracking-normal">in Computer Science</span>
                  </h3>

                  {/* Body Description: font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 */}
                  <p className="font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 mt-2 mb-0.5">
                    SRM Institute of Science and Technology
                  </p>
                  <p className="font-sans font-normal text-[13px] text-slate-500">
                    Ramapuram, Tamil Nadu, India
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-900/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase font-medium tracking-[0.08em] text-slate-500 block mb-0.5">
                      Specialization
                    </span>
                    <span className="font-sans font-semibold text-[14px] text-slate-900">
                      Big Data Analytics
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[11px] uppercase font-medium tracking-[0.08em] text-slate-500 block mb-0.5">
                      Timeline
                    </span>
                    <span className="font-mono text-[12px] font-medium tabular-nums text-slate-700">
                      2023 — 2027
                    </span>
                  </div>
                </div>
              </StickyNote>

              {/* Currently Building Note (Crisp White #FFFFFF, 1.1deg tilt) */}
              <StickyNote
                tilt={1.1}
                curlCorner="right"
                delay={0.14}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Eyebrow Label: matching CanteenConnect pill style */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                      <Zap size={12} className="text-slate-500" />
                      CURRENTLY BUILDING
                    </span>
                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/60 font-mono text-[11px] font-medium text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>

                  {/* Card Title: font-sans font-bold tracking-[-0.02em] text-slate-950 */}
                  <h3 className="font-sans font-bold tracking-[-0.02em] text-slate-950 text-[20px] md:text-[21px] leading-snug mb-2">
                    Mission Control OS
                  </h3>

                  {/* Body Description: font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 */}
                  <p className="font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 mb-4">
                    A unified intelligence layer for real-time data orchestration — combining event-driven architecture
                    with interactive mission dashboards.
                  </p>
                </div>

                {/* Tech Pills: font-mono text-[11px]–[12px] font-medium tabular-nums text-slate-600 */}
                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-900/10">
                  {['Next.js', 'Redis', 'WebSockets', 'TypeScript'].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium tabular-nums text-slate-600 hover:border-slate-900/20 hover:text-slate-900 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </StickyNote>
            </div>

            {/* Row 3 — Equal 3-Column Pillar Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <StickyNote
                    key={cap.title}
                    tilt={cap.tilt}
                    curlCorner={cap.curlCorner}
                    delay={0.18 + i * 0.05}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Eyebrow / Category Pill */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-900/10 bg-slate-900/[0.02] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                          <Icon size={12} className="text-slate-500" />
                          {cap.label}
                        </span>
                      </div>

                      {/* Card Title: font-sans font-bold tracking-[-0.02em] text-slate-950, 17px-18px */}
                      <h4 className="font-sans font-bold tracking-[-0.02em] text-slate-950 text-[17px] md:text-[18px] leading-snug mb-2">
                        {cap.title}
                      </h4>
                      {/* Body Description: font-sans font-normal text-[14px] leading-[1.6] text-slate-600 */}
                      <p className="font-sans font-normal text-[14px] leading-[1.6] text-slate-600">
                        {cap.desc}
                      </p>
                    </div>
                  </StickyNote>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
