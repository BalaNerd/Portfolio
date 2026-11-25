import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  live?: string;
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
  live?: string;
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
  {
    id: 3,
    title: 'DevMetrics',
    category: 'GitHub Repository & Vercel Deployment Intelligence Dashboard',
    description:
      'An engineering analytics web application that inspects, visualizes, and compares GitHub repositories and live Vercel deployments. Features dual Technical and Plain English reporting modes, interactive commit timeline scrubbing, punch-card activity matrices, side-by-side repository comparison, and Luxury Editorial typography.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vercel Analytics'],
    github: 'https://github.com/BalaNerd/devmetrics',
    live: 'https://devmetrics-eta.vercel.app',
    accentColor: '#0d9488',
    stats: 'Repository Intel · Deployment Analytics',
    index: '03',
  },
];

const compactProjects: CompactProject[] = [
  {
    id: 4,
    title: 'Social Media Usage Analytics',
    category: 'Full-Stack Analytics Platform',
    description:
      'Privacy-focused analytics web app tracking digital habits, behavioral risk scoring (0–100), and interactive Recharts dashboards.',
    tech: ['React 18', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    github: 'https://github.com/BalaNerd/Social-Media-Usage-Analytics',
    accentColor: '#7c3aed',
    index: '04',
  },
  {
    id: 5,
    title: 'Aegis Sentinel',
    category: 'AI · Emergency Intelligence Platform',
    description:
      'Global disaster intelligence system integrating USGS and NASA telemetry with AI risk scoring (SHAP) and sub-second alerts.',
    tech: ['Next.js', 'FastAPI', 'PostGIS', 'XGBoost', 'LangChain'],
    github: 'https://github.com/BalaNerd/aegis-sentinel',
    accentColor: '#dc2626',
    index: '05',
  },
  {
    id: 6,
    title: 'City Pulse',
    category: 'Real-Time City Intelligence Dashboard',
    description:
      'Real-time dashboard aggregating weather, AQI, and transit signals into a composite City Activity Score with Convex caching.',
    tech: ['Next.js 16', 'Convex', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/BalaNerd/City-pulse',
    accentColor: '#059669',
    index: '06',
  },
];

/* ─────────────────────────────────────────────
   STAGGERED VIEWPORT REVEAL
   translateY(12px) -> 0, opacity: 0 -> 1, 350ms cubic-bezier(0.16, 1, 0.3, 1)
───────────────────────────────────────────── */
const ProjectReveal: React.FC<{ children: React.ReactNode; index: number; className?: string }> = ({
  children,
  index,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CURSOR-TRACKED BORDER SPOTLIGHT HOOK
───────────────────────────────────────────── */
const useSpotlight = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return { cardRef, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave };
};

/* ─────────────────────────────────────────────
   DEVMETRICS PREVIEW FRAME WITH [TECHNICAL | PLAIN] TOGGLE
───────────────────────────────────────────── */
const DevMetricsInteractivePreview: React.FC = () => {
  const [mode, setMode] = useState<'technical' | 'plain'>('technical');

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      {/* Top control bar: Monospace indicator + [Technical | Plain] toggle */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="font-mono text-[11px] font-bold tracking-wider text-slate-600 uppercase">
            03 · TELEMETRY
          </span>
        </div>

        {/* Interactive Mode pill toggle */}
        <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-900/5 border border-slate-200/90 shadow-2xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode('technical');
            }}
            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all cursor-pointer active:scale-[0.98] ${
              mode === 'technical'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Switch to Technical mode metric preview"
          >
            Technical
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode('plain');
            }}
            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all cursor-pointer active:scale-[0.98] ${
              mode === 'plain'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Switch to Plain English mode metric preview"
          >
            Plain
          </button>
        </div>
      </div>

      {/* Metric Readout Display with smooth swap */}
      <AnimatePresence mode="wait">
        {mode === 'technical' ? (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center space-y-2.5 my-2"
          >
            {/* Row 1: Velocity & Bus Factor */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Commit Velocity
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">42.8</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">+18%</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">commits / wk</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Pareto Bus Factor
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">0.32</span>
                  <span className="font-mono text-[10px] text-teal-600 font-semibold">Gini</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">Low Risk · Resilient</span>
              </div>
            </div>

            {/* Row 2: Vercel Edge TTFB & Core Web Vitals */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Edge Response
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">38ms</span>
                  <span className="font-mono text-[10px] text-teal-600 font-semibold">TTFB</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">99.8% Cache Hit</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Web Vitals
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">0.6s</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">LCP</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">CLS 0.00 · FID 12ms</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="plain"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center space-y-2 my-2"
          >
            {/* Verdict Card */}
            <div className="p-3 rounded-xl bg-white/90 border border-teal-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Executive Verdict
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                Ready for Visitors & Recruiters
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
                High shipping velocity with distributed maintainer resilience and zero dependency blocks.
              </p>
            </div>

            {/* Plain points */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Visitor Experience
                </span>
                <span className="block text-xs font-bold text-slate-900 mt-0.5">Sub-Second Load</span>
                <span className="block text-[10px] text-slate-500">Instant on mobile</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Shipping Rhythm
                </span>
                <span className="block text-xs font-bold text-slate-900 mt-0.5">Active Daily</span>
                <span className="block text-[10px] text-slate-500">Regular release tags</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom telemetry badge */}
      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold text-teal-700 tracking-wider">
          DUAL-MODE REPORTING
        </span>
        <span className="font-mono text-[10px] text-slate-400">
          {mode === 'technical' ? 'Technical View' : 'Plain English View'}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CANTEENCONNECT PREVIEW FRAME (01)
───────────────────────────────────────────── */
const CanteenConnectPreview: React.FC = () => (
  <div className="relative z-10 w-full h-full flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="font-mono text-[11px] font-bold tracking-wider text-slate-600 uppercase">
          01 · LIVE QUEUE
        </span>
      </div>
      <span className="font-mono text-[10px] font-semibold text-indigo-600 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200/60">
        PWA Online
      </span>
    </div>

    <div className="flex-1 flex flex-col justify-center space-y-2.5 my-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Wait Reduction
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono text-sm font-bold text-slate-900">-64%</span>
            <span className="font-mono text-[10px] text-emerald-600 font-semibold">Faster</span>
          </div>
          <span className="block font-mono text-[9px] text-slate-500">Queue optimization</span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Active Orders
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono text-sm font-bold text-slate-900">18</span>
            <span className="font-mono text-[10px] text-indigo-600 font-semibold">Live</span>
          </div>
          <span className="block font-mono text-[9px] text-slate-500">Real-time sync</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
          Architecture
        </span>
        <span className="block text-xs font-bold text-slate-900 mt-0.5">
          Supabase PostgreSQL + PWA Cache
        </span>
        <span className="block text-[10px] text-slate-500">Offline resilient transaction flow</span>
      </div>
    </div>

    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
      <span className="font-mono text-[10px] font-semibold text-indigo-700 tracking-wider">
        QUEUE MANAGEMENT · PWA
      </span>
      <span className="font-mono text-[10px] text-slate-400">Realtime Dispatch</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SPENDWISE PREVIEW FRAME (02)
───────────────────────────────────────────── */
const SpendWisePreview: React.FC = () => (
  <div className="relative z-10 w-full h-full flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
        <span className="font-mono text-[11px] font-bold tracking-wider text-slate-600 uppercase">
          02 · WEALTH INTEL
        </span>
      </div>
      <span className="font-mono text-[10px] font-semibold text-sky-600 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200/60">
        Recharts Live
      </span>
    </div>

    <div className="flex-1 flex flex-col justify-center space-y-2.5 my-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Monthly Burn
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono text-sm font-bold text-slate-900">$2,410</span>
            <span className="font-mono text-[10px] text-emerald-600 font-semibold">-12.4%</span>
          </div>
          <span className="block font-mono text-[9px] text-slate-500">Categorized automated</span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
            Savings Target
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-mono text-sm font-bold text-slate-900">88.5%</span>
            <span className="font-mono text-[10px] text-sky-600 font-semibold">On Track</span>
          </div>
          <span className="block font-mono text-[9px] text-slate-500">Dynamic projection</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
          Analytics Engine
        </span>
        <span className="block text-xs font-bold text-slate-900 mt-0.5">
          Next.js App Router + Supabase DB
        </span>
        <span className="block text-[10px] text-slate-500">Interactive financial charts & telemetry</span>
      </div>
    </div>

    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
      <span className="font-mono text-[10px] font-semibold text-sky-700 tracking-wider">
        FINANCIAL ANALYTICS · INSIGHTS
      </span>
      <span className="font-mono text-[10px] text-slate-400">SaaS Dashboard</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAJOR FEATURED PROJECT CARD (01, 02, 03)
───────────────────────────────────────────── */
const ProjectCard: React.FC<{ project: FeaturedProject; index: number }> = ({ project, index }) => {
  const { cardRef, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return (
    <ProjectReveal index={index} className="w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group project-card relative overflow-hidden rounded-2xl md:rounded-3xl border transition-colors duration-200 ${
          isHovered ? 'border-slate-300 shadow-sm' : 'border-slate-200/80 shadow-2xs'
        } bg-white/95 cursor-default`}
      >
        {/* 1px Cursor-Tracked Radial Border Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(450px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${project.accentColor}45, transparent 65%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            zIndex: 25,
          }}
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-12 gap-0">
          {/* Visual Preview Panel */}
          <div
            className="md:col-span-5 relative overflow-hidden min-h-[260px] md:min-h-[380px] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}0f 0%, ${project.accentColor}03 100%)`,
            }}
          >
            {/* Abstract SVG Grid */}
            <div className="absolute inset-0 opacity-35 pointer-events-none" aria-hidden="true">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`proj-grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke={project.accentColor}
                      strokeWidth="0.75"
                      opacity="0.25"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#proj-grid-${project.id})`} />
              </svg>
            </div>

            {/* Radial glow */}
            <div
              className="absolute w-64 h-64 rounded-full pointer-events-none transition-transform duration-500 ease-out"
              style={{
                background: `radial-gradient(circle, ${project.accentColor}25 0%, transparent 70%)`,
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                opacity: isHovered ? 1 : 0.6,
              }}
            />

            {/* Large Index Number Watermark */}
            <span
              className="absolute right-4 bottom-2 font-display pointer-events-none select-none transition-opacity duration-300 tabular-nums"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(5rem, 8vw, 7.5rem)',
                color: `${project.accentColor}14`,
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              {project.index}
            </span>

            {/* Preview Frame with smooth scale(1.02) on hover */}
            <div
              className="relative z-10 w-full h-full flex flex-col justify-between transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
            >
              {project.id === 3 ? (
                <DevMetricsInteractivePreview />
              ) : project.id === 2 ? (
                <SpendWisePreview />
              ) : (
                <CanteenConnectPreview />
              )}
            </div>
          </div>

          {/* Content Panel */}
          <div className="md:col-span-7 p-7 sm:p-10 flex flex-col justify-between relative z-20">
            <div>
              {/* Category & Quick Links */}
              <div className="flex items-start sm:items-center justify-between gap-3 mb-5">
                <span
                  className="section-label text-[11px] font-bold px-3 py-1 rounded-md border tracking-wider uppercase leading-snug tabular-nums"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                    background: `${project.accentColor}0a`,
                  }}
                >
                  {project.index} · {project.category}
                </span>

                {/* Quick Links with diagonal arrow micro-interaction */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} Source Code on GitHub`}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs active:scale-[0.98]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon size={16} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} Live Demo`}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-2xs active:scale-[0.98]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
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
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons with diagonal arrow hover */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Source Code for ${project.title}`}
                className="btn-outline inline-flex items-center gap-2 py-2.5 px-5 text-sm font-semibold text-text-primary hover:text-indigo-600 shadow-2xs group/btn active:scale-[0.98] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={15} /> Source Code
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Live Demo for ${project.title}`}
                  className="btn-primary inline-flex items-center gap-2 py-2.5 px-5 text-sm font-bold shadow-xs group/btn active:scale-[0.98] transition-all"
                  style={
                    project.id === 2
                      ? { background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }
                      : project.id === 3
                      ? { background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)' }
                      : undefined
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProjectReveal>
  );
};

/* ─────────────────────────────────────────────
   MINOR COMPACT PROJECT CARD (04, 05, 06)
   Dense, text-focused, no preview screenshots
───────────────────────────────────────────── */
const CompactProjectCard: React.FC<{ project: CompactProject; index: number }> = ({ project, index }) => {
  const { cardRef, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return (
    <ProjectReveal index={index} className="w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full flex flex-col justify-between p-6 rounded-2xl bg-white/95 border transition-all duration-200 ${
          isHovered ? 'border-slate-300 shadow-sm' : 'border-slate-200/80 shadow-2xs'
        } overflow-hidden cursor-default`}
      >
        {/* 1px Cursor-Tracked Radial Border Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(320px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${project.accentColor}40, transparent 65%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            zIndex: 25,
          }}
          aria-hidden="true"
        />

        {/* Accent top line highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}80, ${project.accentColor}20)`,
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        <div>
          {/* Header: Monospace Index + Action Links */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-mono text-xs font-bold tracking-widest transition-colors duration-200 tabular-nums"
              style={{ color: isHovered ? project.accentColor : '#94a3b8' }}
            >
              {project.index}
            </span>

            {/* Icon links */}
            <div className="flex items-center gap-1.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs active:scale-[0.98]"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={14} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Live Demo`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-2xs active:scale-[0.98]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-bold text-text-primary text-base mb-2 tracking-tight transition-colors duration-200"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h3>

          {/* Concise 1-2 line summary */}
          <p
            className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Footer: Top 3 Tech Tags & Source link with diagonal arrow */}
        <div className="pt-4 border-t border-slate-100/90 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[9.5px] font-semibold tracking-wide px-2 py-0.5 rounded-md"
                style={{
                  background: `${project.accentColor}0e`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}25`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.title}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors active:scale-[0.98]"
            style={{
              fontFamily: 'var(--font-display)',
              color: project.accentColor,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span>Code</span>
            <ArrowUpRight
              size={12}
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </ProjectReveal>
  );
};

/* ─────────────────────────────────────────────
   SECTION DIVIDER BRIDGE
───────────────────────────────────────────── */
const SectionBridge: React.FC = () => (
  <BlurReveal delay={0.15} className="py-12 md:py-16">
    <div className="flex items-center gap-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="flex items-center gap-3">
        <span className="section-label text-[10px] tracking-[0.25em] text-text-muted">MORE WORK</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted tabular-nums">04–06</span>
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
        {/* Section header with baseline mask slide */}
        <div className="mb-16">
          <div className="overflow-hidden mb-3">
            <motion.span
              className="section-label block text-indigo-600 font-mono tracking-widest uppercase text-xs font-bold tabular-nums"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              02 — Work
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="section-title"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              Selected <span className="gradient-text">Work</span>
            </motion.h2>
          </div>
          <p
            className="text-text-secondary mt-4 max-w-xl font-normal"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            Full-stack and data engineering projects built with real-world constraints — performance, clean architecture, and user-first design.
          </p>
        </div>

        {/* Major Projects: Positions 01, 02, 03 */}
        <div className="space-y-8 mb-4">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bridge Divider */}
        <SectionBridge />

        {/* Minor Projects: Positions 04, 05, 06 in 3-column compact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {compactProjects.map((project, i) => (
            <CompactProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <BlurReveal delay={0.25} className="flex justify-center">
          <motion.a
            href="https://github.com/BalaNerd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 group/all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={16} /> View all repositories on GitHub
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 ease-out group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
            />
          </motion.a>
        </BlurReveal>
      </div>
    </section>
  );
};

export default Projects;
