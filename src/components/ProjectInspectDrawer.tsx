import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './ui/Icons';
import { useTechHighlight } from '../context/TechHighlightContext';

interface ProjectDetailData {
  id: number;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string; detail: string }[];
  architectureNotes: string[];
  constraintsSolved: string[];
  tech: string[];
  github: string;
  live?: string;
  accentColor: string;
}

export const PROJECT_DETAILS: Record<number, ProjectDetailData> = {
  1: {
    id: 1,
    index: '01',
    title: 'CanteenConnect',
    subtitle: 'Campus Live Queue & Digital Dining PWA',
    description:
      'A progressive web application designed to eliminate physical queue congestion in university dining halls through sub-50ms live order dispatch, automated slot scheduling, and real-time kitchen telemetry.',
    metrics: [
      { label: 'Wait Time Reduction', value: '-64%', detail: 'Average queue drop' },
      { label: 'Live Orders Handled', value: '18/min', detail: 'Peak dispatch rate' },
      { label: 'Offline Resilience', value: '100%', detail: 'PWA Cache coverage' },
    ],
    architectureNotes: [
      'PWA Client with Service Worker cache-first asset loading and background order sync.',
      'Supabase PostgreSQL event-driven state machine managing ACID order transactions.',
      'Real-time WebSocket subscriptions updating customer tokens with sub-50ms latency.',
      'Kitchen telemetry engine projecting estimated meal ready times from active tickets.',
    ],
    constraintsSolved: [
      'Eliminated dining rush bottleneck by batching orders into dynamic 5-minute prep windows.',
      'Maintained transaction idempotency across spotty campus Wi-Fi networks using client optimistic caching.',
    ],
    tech: ['React 18', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'PWA'],
    github: 'https://github.com/BalaNerd/CanteenConnect',
    live: 'https://canteen-connect.vercel.app',
    accentColor: '#4f46e5',
  },
  2: {
    id: 2,
    index: '02',
    title: 'SpendWise',
    subtitle: 'AI Financial Copilot & Wealth Telemetry Engine',
    description:
      'An intelligent personal finance SaaS platform with dynamic expense categorization, burn velocity projection, and high-density Recharts data visualization.',
    metrics: [
      { label: 'Monthly Burn Analyzed', value: '$2,410', detail: 'Average budget tracked' },
      { label: 'Savings Target Met', value: '88.5%', detail: 'Automated projection' },
      { label: 'Query Response', value: '28ms', detail: 'Indexed SQL views' },
    ],
    architectureNotes: [
      'Next.js App Router with React Server Components for zero-bundle analytical pages.',
      'Supabase JWT authentication paired with granular Row-Level Security (RLS) policies.',
      'Normalized relational PostgreSQL database schema with time-series indexed partitions.',
      'Recharts SVG financial analytics engine with responsive viewport scaling.',
    ],
    constraintsSolved: [
      'Prevented floating-point currency drift by using decimal integer cents across SQL calculations.',
      'Built sub-second monthly summary aggregation using PostgreSQL materialized views.',
    ],
    tech: ['Next.js', 'React 18', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts'],
    github: 'https://github.com/BalaNerd/SpendWise',
    live: 'https://spendwise-alpha.vercel.app',
    accentColor: '#0284c7',
  },
  3: {
    id: 3,
    index: '03',
    title: 'DevMetrics',
    subtitle: 'GitHub Repository & Vercel Deployment Intelligence Dashboard',
    description:
      'An engineering analytics web application that inspects, visualizes, and compares GitHub repositories and live Vercel deployments with dual Technical and Plain English modes.',
    metrics: [
      { label: 'Commit Velocity', value: '42.8/wk', detail: 'Rolling median frequency' },
      { label: 'Edge TTFB', value: '38ms', detail: 'Vercel Edge cache hit' },
      { label: 'Bus Factor Index', value: '0.32', detail: 'Gini coefficient resilience' },
      { label: 'Core Web Vitals', value: '0.6s', detail: 'Sub-second LCP score' },
    ],
    architectureNotes: [
      'Next.js 16 Edge runtime handling GitHub REST API telemetry with zero server cold starts.',
      'Multi-tier caching layer combining In-Memory LRU with HTTP Stale-While-Revalidate headers.',
      'Dual Reporting Mode switching seamlessly between raw engineering metrics and Plain English summaries.',
      'Side-by-side punch card activity matrix benchmarking repository velocity.',
    ],
    constraintsSolved: [
      'Mitigated GitHub API 60 req/hr unauthenticated rate-limit via intelligent in-memory cache buffering.',
      'Rendered responsive 52-week SVG commit heatmaps with zero layout shift on mobile viewports.',
    ],
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vercel Analytics'],
    github: 'https://github.com/BalaNerd/devmetrics',
    live: 'https://devmetrics-eta.vercel.app',
    accentColor: '#0d9488',
  },
  4: {
    id: 4,
    index: '04',
    title: 'Social Media Usage Analytics',
    subtitle: 'Privacy-Focused Behavioral Analytics Platform',
    description:
      'Digital habits analytics suite offering behavioral risk scoring (0–100), screen-time trend breakdowns, and predictive fatigue modeling.',
    metrics: [
      { label: 'Risk Score Accuracy', value: '94.2%', detail: 'Behavioral clustering' },
      { label: 'Data Processing', value: '<15ms', detail: 'Client aggregation' },
    ],
    architectureNotes: [
      'React 18 frontend with Recharts visualization and custom SVG gauge controls.',
      'Node.js & Express RESTful API with stateless JWT session validation.',
      'MongoDB time-series collection storing structured timestamped usage sessions.',
    ],
    constraintsSolved: [
      'Secured user activity logs through end-to-end client hashing before database ingestion.',
    ],
    tech: ['React 18', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    github: 'https://github.com/BalaNerd/Social-Media-Usage-Analytics',
    accentColor: '#7c3aed',
  },
  5: {
    id: 5,
    index: '05',
    title: 'Aegis Sentinel',
    subtitle: 'AI Disaster & Emergency Intelligence Platform',
    description:
      'Global early-warning disaster intelligence engine streaming USGS seismic feeds and NASA satellite telemetry with XGBoost risk inference.',
    metrics: [
      { label: 'Telemetry Ingestion', value: '1.2k/s', detail: 'Stream throughput' },
      { label: 'Alert Latency', value: '<800ms', detail: 'Sub-second dispatch' },
    ],
    architectureNotes: [
      'FastAPI asynchronous event ingestion microservices with PostGIS geospatial queries.',
      'Pre-trained XGBoost classification pipeline scoring disaster severity index.',
      'LangChain summarization agent delivering plain-language situation briefings.',
    ],
    constraintsSolved: [
      'Handled concurrent seismic telemetry spikes using async Python coroutines and geo-indexed spatial caching.',
    ],
    tech: ['Next.js', 'FastAPI', 'PostGIS', 'XGBoost', 'LangChain'],
    github: 'https://github.com/BalaNerd/aegis-sentinel',
    accentColor: '#dc2626',
  },
  6: {
    id: 6,
    index: '06',
    title: 'City Pulse',
    subtitle: 'Real-Time Urban Activity Signal Engine',
    description:
      'Real-time urban telemetry dashboard aggregating air quality (AQI), weather patterns, and municipal transit signals into an instant City Activity Score.',
    metrics: [
      { label: 'Feed Aggregations', value: '4 Feeds', detail: 'AQI, transit, weather' },
      { label: 'State Sync', value: 'Convex', detail: 'Reactive live data sync' },
    ],
    architectureNotes: [
      'Next.js 16 frontend with reactive Convex backend subscriptions.',
      'Framer Motion animated telemetry bars with spring interpolation.',
      'Tailwind CSS v4 utility layout with mobile-first responsiveness.',
    ],
    constraintsSolved: [
      'Normalized asynchronous external municipal weather and transport API schemas into a unified signal score.',
    ],
    tech: ['Next.js 16', 'Convex', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/BalaNerd/City-pulse',
    accentColor: '#059669',
  },
};

const ProjectInspectDrawer: React.FC = () => {
  const { activeInspectProjectId, closeInspectDrawer, selectedTech, setSelectedTech } = useTechHighlight();

  const project = activeInspectProjectId ? PROJECT_DETAILS[activeInspectProjectId] : null;

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeInspectProjectId !== null) {
        closeInspectDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeInspectProjectId, closeInspectDrawer]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (activeInspectProjectId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeInspectProjectId]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[9995] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeInspectDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Surface */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white border-l border-slate-200/90 shadow-2xl z-10 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}30`,
                      background: `${project.accentColor}0a`,
                    }}
                  >
                    {project.index} · ARCHITECTURAL INSPECT
                  </span>
                </div>
                <h2 className="font-sans font-bold text-2xl text-slate-950 tracking-[-0.02em]">
                  {project.title}
                </h2>
                <p className="font-sans text-xs text-slate-500 mt-1 font-normal">
                  {project.subtitle}
                </p>
              </div>

              <button
                onClick={closeInspectDrawer}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Executive Overview */}
              <div>
                <h3 className="font-mono text-[11px] uppercase font-semibold tracking-wider text-slate-400 mb-2">
                  System Overview
                </h3>
                <p className="font-sans text-sm text-slate-700 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div>
                <h3 className="font-mono text-[11px] uppercase font-semibold tracking-wider text-slate-400 mb-2.5">
                  Engineering Telemetry & Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col justify-between"
                    >
                      <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wide">
                        {m.label}
                      </span>
                      <p className="font-mono text-lg font-bold text-slate-900 mt-1 tabular-nums">
                        {m.value}
                      </p>
                      <span className="font-sans text-[11px] text-slate-500 font-normal mt-0.5">
                        {m.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h3 className="font-mono text-[11px] uppercase font-semibold tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Cpu size={13} className="text-indigo-600" />
                  Key Architectural Decisions
                </h3>
                <ul className="space-y-2">
                  {project.architectureNotes.map((note, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed p-2.5 rounded-lg border border-slate-100 bg-white"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Constraints Solved */}
              <div>
                <h3 className="font-mono text-[11px] uppercase font-semibold tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  Engineering Constraints Solved
                </h3>
                <ul className="space-y-2">
                  {project.constraintsSolved.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed p-2.5 rounded-lg border border-slate-100 bg-white"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills (Clickable cross-highlighter) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                    Technology Stack
                  </h3>
                  <span className="font-mono text-[10px] text-slate-400">Click tag to cross-filter</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const isSelected = selectedTech === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTech(t)}
                        className={`px-2.5 py-1 rounded-md font-mono text-xs font-medium tabular-nums border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'border-slate-200/90 bg-slate-50 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/90 flex items-center justify-between gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-800 hover:text-indigo-600 active:scale-[0.98]"
              >
                <GithubIcon size={14} /> View Source Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white shadow-xs active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)' }}
                >
                  <ExternalLink size={14} /> Open Live Demo
                </a>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectInspectDrawer;
