import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './ui/Icons';
import BlurReveal from './ui/BlurReveal';

/* ─────────────────────────────────────────────
   PROJECT DATA — All from verified repositories
───────────────────────────────────────────── */

interface FeaturedProject {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;          // omit if no verified deployment
  accentColor: string;
  stats: string;
  index: string;
}

interface CompactProject {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;          // omit if no verified deployment
  accentColor: string;
  index: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: 'CanteenConnect',
    category: 'Full-Stack Web Application',
    description:
      'Smart canteen management platform built to streamline food ordering, reduce queue wait times, and provide real-time order tracking. Designed with a PWA architecture for reliable offline access and fast load performance.',
    tech: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'PWA'],
    github: 'https://github.com/BalaNerd/Canteen_Connect',
    live: 'https://canteen-connect.onrender.com/home',
    accentColor: '#4f46e5',
    stats: 'Queue Management · PWA',
    index: '01',
  },
  {
    id: 2,
    title: 'SpendWise',
    category: 'Personal Finance Platform',
    description:
      'Personal finance tracking system for monitoring expenses, categorizing transactions, and generating data-driven spending insights. Features interactive charts and analytics powered by Recharts.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/BalaNerd/spendwise',
    live: 'https://spendwise-two-kappa.vercel.app',
    accentColor: '#0284c7',
    stats: 'Financial Analytics · Insights',
    index: '02',
  },
];

const compactProjects: CompactProject[] = [
  {
    id: 3,
    title: 'Social Media Usage Analytics',
    category: 'Full-Stack Analytics Platform',
    description:
      'Privacy-focused web app that helps users track social media usage time, analyze behavioral patterns, and receive personalized insights. Includes behavioral risk scoring (0–100), interactive dashboards, and JWT-authenticated REST API.',
    tech: ['React 18', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'JWT'],
    github: 'https://github.com/BalaNerd/Social-Media-Usage-Analytics',
    accentColor: '#7c3aed',
    index: '03',
  },
  {
    id: 4,
    title: 'Aegis Sentinel',
    category: 'AI · Emergency Intelligence Platform',
    description:
      'Enterprise-grade global disaster monitoring system integrating real-time telemetry from USGS, NASA FIRMS, and Open-Meteo. Features GIS spatial analytics, AI risk scoring with Explainable AI (SHAP), RAG-powered FEMA guidelines, and sub-second alert delivery.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'PostGIS', 'XGBoost', 'LangChain', 'Redis', 'Docker'],
    github: 'https://github.com/BalaNerd/aegis-sentinel',
    accentColor: '#dc2626',
    index: '04',
  },
  {
    id: 5,
    title: 'City Pulse',
    category: 'Real-Time City Intelligence Dashboard',
    description:
      'Full-stack dashboard that aggregates weather, AQI, events, and transport signals into a composite City Activity Score. Features animated circular gauge, 24-hour trend charts, heat map visualization, and a smart 15-minute caching layer via Convex.',
    tech: ['Next.js 16', 'TypeScript', 'Convex', 'Framer Motion', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/BalaNerd/City-pulse',
    accentColor: '#059669',
    index: '05',
  },
];

/* ─────────────────────────────────────────────
   SPATIAL TILT CARD
───────────────────────────────────────────── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; intensity?: number }> = ({
  children,
  className = '',
  intensity = 3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   FEATURED PROJECT CARD (CanteenConnect / SpendWise)
───────────────────────────────────────────── */
const ProjectCard: React.FC<{ project: FeaturedProject; delay?: number }> = ({ project, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlurReveal delay={delay} className="w-full">
      <TiltCard
        className="project-card overflow-hidden cursor-default border border-slate-200/80 bg-white/90 shadow-sm"
        intensity={3}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="transition-colors duration-300"
        >
          <div className="grid md:grid-cols-12 gap-0">
            {/* Visual Panel */}
            <div
              className="md:col-span-5 relative overflow-hidden min-h-[220px] md:min-h-[340px] flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}12 0%, ${project.accentColor}04 100%)`,
              }}
            >
              {/* Abstract grid */}
              <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`proj-grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke={project.accentColor} strokeWidth="0.75" opacity="0.25"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#proj-grid-${project.id})`} />
                </svg>
              </div>

              {/* Radial glow */}
              <motion.div
                className="absolute w-56 h-56 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.accentColor}28 0%, transparent 70%)` }}
                animate={{ scale: isHovered ? 1.35 : 1, opacity: isHovered ? 1 : 0.65 }}
                transition={{ duration: 0.5 }}
              />

              {/* Large Index Number */}
              <span
                className="relative z-10 font-display pointer-events-none select-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(5.5rem, 10vw, 8.5rem)',
                  color: `${project.accentColor}28`,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {project.index}
              </span>

              {/* Hover stats label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span
                      className="font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg"
                      style={{
                        background: `${project.accentColor}18`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                      }}
                    >
                      {project.stats}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Panel */}
            <div className="md:col-span-7 p-7 sm:p-10 flex flex-col justify-between relative z-20">
              <div>
                {/* Category & Quick Links */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="section-label text-[11px] font-bold px-3 py-1 rounded-md border tracking-wider uppercase"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}30`,
                      background: `${project.accentColor}0a`,
                    }}
                  >
                    {project.index} · {project.category}
                  </span>

                  {/* Quick Links */}
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Source Code on GitHub`}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon size={16} />
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} Live Demo`}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-xs"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight size={16} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3
                  className="text-text-primary mb-4 font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-text-secondary text-sm leading-relaxed mb-6 font-normal"
                  style={{ fontFamily: 'var(--font-body)', lineHeight: 1.78 }}
                >
                  {project.description}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Source Code for ${project.title}`}
                  className="btn-outline inline-flex items-center gap-2 py-2.5 px-5 text-sm font-semibold text-text-primary hover:text-indigo-600 shadow-xs"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon size={15} /> Source Code <ArrowUpRight size={14} />
                </motion.a>

                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View Live Demo for ${project.title}`}
                    className="btn-primary inline-flex items-center gap-2 py-2.5 px-5 text-sm font-bold shadow-sm"
                    style={project.id === 2 ? { background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' } : undefined}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </BlurReveal>
  );
};

/* ─────────────────────────────────────────────
   COMPACT PROJECT CARD (Additional Projects)
───────────────────────────────────────────── */
const CompactProjectCard: React.FC<{ project: CompactProject; delay?: number }> = ({ project, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlurReveal delay={delay} className="w-full h-full">
      <motion.div
        className="compact-project-card h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -4 : 0,
          boxShadow: isHovered
            ? `0 12px 32px -8px ${project.accentColor}22, 0 4px 12px rgba(0,0,0,0.03)`
            : '0 2px 8px -2px rgba(15,23,42,0.04), 0 1px 3px rgba(0,0,0,0.02)',
          borderColor: isHovered ? `${project.accentColor}45` : 'rgba(15, 23, 42, 0.08)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Accent top bar */}
        <motion.div
          className="h-0.5 w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}60, ${project.accentColor}20)` }}
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Index & quick github link */}
          <div className="flex items-center justify-between mb-4">
            <motion.span
              className="font-mono font-bold tracking-widest"
              style={{
                fontSize: '0.7rem',
                color: project.accentColor,
                letterSpacing: '0.2em',
              }}
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.index}
            </motion.span>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-text-muted hover:text-indigo-600 hover:border-indigo-300 transition-all"
              whileHover={{ scale: 1.12, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={14} />
            </motion.a>
          </div>

          {/* Category */}
          <p className="section-label text-[10px] text-text-muted mb-2 tracking-wider">{project.category}</p>

          {/* Title */}
          <motion.h3
            className="font-bold text-text-primary mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.25,
            }}
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.25, delay: 0.02 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p
            className="text-text-secondary text-xs leading-relaxed mb-4 flex-1"
            style={{ fontFamily: 'var(--font-body)', lineHeight: 1.72 }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="font-mono text-[9.5px] font-semibold tracking-wide px-2 py-0.5 rounded-full"
                style={{
                  background: `${project.accentColor}0d`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}22`,
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="font-mono text-[9.5px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-text-muted border border-slate-200">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{
                fontFamily: 'var(--font-display)',
                color: project.accentColor,
                letterSpacing: '0.01em',
              }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              Source Code <ArrowUpRight size={12} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </BlurReveal>
  );
};

/* ─────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────── */
const SectionBridge: React.FC = () => (
  <BlurReveal delay={0.2} className="py-12 md:py-16">
    <div className="flex items-center gap-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="flex items-center gap-3">
        <span
          className="section-label text-[10px] tracking-[0.25em] text-text-muted"
        >
          MORE WORK
        </span>
        <span className="w-1 h-1 rounded-full bg-indigo-400/60" />
        <span className="section-label text-[10px] tracking-[0.2em] text-text-muted">03–05</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  </BlurReveal>
);

/* ─────────────────────────────────────────────
   MAIN PROJECTS SECTION
───────────────────────────────────────────── */
const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">

        {/* ── Section header ── */}
        <BlurReveal delay={0} className="mb-16">
          <span className="section-label block mb-4 text-indigo-600">02 — Work</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p
            className="text-text-secondary mt-4 max-w-xl font-normal"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            Full-stack and data engineering projects built with real-world constraints — performance, clean architecture, and user-first design.
          </p>
        </BlurReveal>

        {/* ── SELECTED WORK — Featured large cards ── */}
        <div className="space-y-8 mb-4">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* ── Bridge / Divider to additional projects ── */}
        <SectionBridge />

        {/* ── ADDITIONAL PROJECTS — Compact editorial grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {compactProjects.map((project, i) => (
            <CompactProjectCard key={project.id} project={project} delay={0.05 + i * 0.08} />
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <BlurReveal delay={0.3} className="flex justify-center">
          <motion.a
            href="https://github.com/BalaNerd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={16} /> View all repositories on GitHub <ArrowUpRight size={14} />
          </motion.a>
        </BlurReveal>
      </div>
    </section>
  );
};

export default Projects;
