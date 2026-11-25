import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Cpu,
  Workflow,
  Sparkles,
  X,
} from 'lucide-react';
import { GithubIcon } from './ui/Icons';
import BlurReveal from './ui/BlurReveal';
import { useTechHighlight } from '../context/TechHighlightContext';

/* ─────────────────────────────────────────────
   PROJECT DATA — Verified Repositories
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
   CURSOR SPOTLIGHT HOOK
───────────────────────────────────────────── */
const useSpotlight = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
   STAGGERED VIEWPORT REVEAL
───────────────────────────────────────────── */
const ProjectReveal: React.FC<{ children: React.ReactNode; index: number; className?: string }> = ({
  children,
  index,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   INTERACTIVE ARCHITECTURE FLOW DIAGRAMS
───────────────────────────────────────────── */
interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  detail: string;
}

const ARCHITECTURE_DATA: Record<number, ArchitectureNode[]> = {
  1: [
    {
      id: 'pwa',
      label: 'PWA Client',
      type: 'Service Worker Shell',
      detail: 'Client-side service worker caches app shell & optimistic mutations · Sub-30ms cold start.',
    },
    {
      id: 'queue',
      label: 'Event Queue',
      type: 'Supabase Postgres',
      detail: 'ACID transaction queue state machine prevents duplicate meal ticket reservations.',
    },
    {
      id: 'sync',
      label: 'Sync Engine',
      type: 'WebSocket Dispatch',
      detail: 'Sub-50ms bidirectional subscription bus broadcasts kitchen queue tokens.',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      type: 'Dispatch Analytics',
      detail: 'Aggregates station preparation times and calculates dynamic wait-time estimations.',
    },
  ],
  2: [
    {
      id: 'client',
      label: 'Next.js Client',
      type: 'App Router RSC',
      detail: 'React Server Components stream initial analytical views with zero client hydration weight.',
    },
    {
      id: 'auth',
      label: 'Supabase Auth',
      type: 'JWT + RLS Shield',
      detail: 'Row-Level Security ensures strict multi-tenant isolation directly in PostgreSQL.',
    },
    {
      id: 'sql',
      label: 'Postgres DB',
      type: 'Time-Series Engine',
      detail: 'Materialized summary views compute monthly budget burns and category distributions in 28ms.',
    },
    {
      id: 'charts',
      label: 'Recharts UI',
      type: 'Recharts SVG Vector',
      detail: 'Responsive vector charts render dynamic velocity curves and wealth milestone trajectories.',
    },
  ],
  3: [
    {
      id: 'edge',
      label: 'Next.js 16 Edge',
      type: 'Edge Route Handlers',
      detail: 'Vercel Edge middleware serves responses globally with sub-38ms latency and zero cold starts.',
    },
    {
      id: 'api',
      label: 'GitHub REST API',
      type: 'Octokit Bucket Limiter',
      detail: 'Authenticated rate-limit token bucket manager orchestrates bulk repository inspection.',
    },
    {
      id: 'cache',
      label: 'Memory Cache',
      type: 'In-Memory LRU + SWR',
      detail: 'Stale-While-Revalidate caching layer handles 99.8% of repeat repo analytics requests.',
    },
    {
      id: 'viz',
      label: 'Recharts UI',
      type: 'Editorial Punch Card',
      detail: 'Interactive 52-week SVG activity matrix with dual Technical and Plain language toggling.',
    },
  ],
};

const ArchitectureDiagram: React.FC<{ projectId: number; accentColor: string }> = ({
  projectId,
  accentColor,
}) => {
  const nodes = ARCHITECTURE_DATA[projectId] || ARCHITECTURE_DATA[3];
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0].id);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const activeIndex = nodes.findIndex((n) => n.id === activeNodeId);

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between py-1">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-1.5">
          <Workflow size={13} style={{ color: accentColor }} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-700">
            System Topology Flow
          </span>
        </div>
        <span className="font-mono text-[9px] text-slate-400">Hover or click node</span>
      </div>

      {/* Pipeline Flow Trail */}
      <div className="py-1 px-1 my-auto">
        <div className="flex items-center justify-between px-1 mb-2 font-mono text-[9px] text-slate-400">
          <span>PIPELINE PATH</span>
          <span className="text-slate-600 font-semibold truncate max-w-[200px]">
            {nodes.map((n) => n.label).join(' → ')}
          </span>
        </div>

        {/* 2x2 Interactive Node Grid */}
        <div className="grid grid-cols-2 gap-2 relative">
          {nodes.map((node, i) => {
            const isActive = node.id === activeNodeId;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${isActive
                  ? 'bg-white shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-white/70 hover:bg-white/90 border-slate-200/80'
                  }`}
                style={{
                  borderColor: isActive ? accentColor : 'rgba(226, 232, 240, 0.9)',
                  boxShadow: isActive ? `0 4px 12px ${accentColor}18` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] font-bold text-slate-400">
                    Step 0{i + 1}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ background: isActive ? accentColor : '#cbd5e1' }}
                  />
                </div>
                <p className="font-sans font-bold text-xs text-slate-900 leading-snug truncate">
                  {node.label}
                </p>
                <p className="font-mono text-[9px] text-slate-500 truncate mt-0.5">
                  {node.type}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Callout with 1-Line Engineering Annotation */}
      <div className="p-2.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400">
            {activeNode.label} · Annotation
          </span>
          <span className="font-mono text-[9px] text-slate-400">Step 0{activeIndex + 1} of 04</span>
        </div>
        <p className="font-sans text-[11px] text-slate-300 leading-relaxed font-normal">
          {activeNode.detail}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CANTEENCONNECT PREVIEW FRAME (01)
───────────────────────────────────────────── */
const CanteenConnectPreview: React.FC = () => {
  const [orderCount, setOrderCount] = useState(18);
  const [waitReduction, setWaitReduction] = useState(64);
  const [tokenSeq, setTokenSeq] = useState(142);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const simulateOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSimulating(true);
    setIsSynced(true);
    setOrderCount((c) => c + 1);
    setTokenSeq((t) => t + 1);
    setWaitReduction((w) => (w >= 66 ? 63 : w + 1));
    setTimeout(() => setIsSimulating(false), 700);
    setTimeout(() => setIsSynced(false), 1400);
  };

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-wider text-slate-600 uppercase">
            01 · LIVE QUEUE
          </span>
          <AnimatePresence>
            {isSynced && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-3xs"
              >
                ✓ Synced
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={simulateOrder}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[9.5px] font-semibold bg-indigo-50 border border-indigo-200/80 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-all cursor-pointer shadow-3xs active:scale-95"
          title="Simulate placing a live order mutation"
        >
          <span className="text-[11px] leading-none font-bold">+</span>
          <span>Simulate Order</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-2 my-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Wait Reduction
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-mono text-sm font-bold text-slate-900">-{waitReduction}%</span>
              <span className="font-mono text-[10px] text-emerald-600 font-semibold">Faster</span>
            </div>
            <span className="block font-mono text-[9px] text-slate-500">Queue optimization</span>
          </div>

          <div
            className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs transition-colors"
            style={{ borderColor: isSimulating ? 'rgba(99, 102, 241, 0.6)' : undefined }}
          >
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Active Orders
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <motion.span
                key={orderCount}
                initial={{ scale: 1.25, color: '#4f46e5' }}
                animate={{ scale: 1, color: '#0f172a' }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm font-bold"
              >
                {orderCount}
              </motion.span>
              <span className="font-mono text-[10px] text-indigo-600 font-semibold">Live</span>
            </div>
            <span className="block font-mono text-[9px] text-slate-500">Real-time sync</span>
          </div>
        </div>

        {/* Live Token Broadcast Banner */}
        <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Dispatched Ticket
            </span>
            <span className="font-mono text-[9px] text-indigo-600 font-medium">Sub-50ms sync</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-700">
              #A-{tokenSeq}
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-700">
              {isSimulating ? 'Ingesting order mutation...' : 'Ticket ready for kitchen prep'}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <span className="font-mono text-[9.5px] font-semibold text-indigo-700 tracking-wider">
          QUEUE MANAGEMENT · PWA
        </span>
        <span className="font-mono text-[9.5px] text-slate-400">Supabase State Machine</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SPENDWISE PREVIEW FRAME (02)
   Interactive [Real-Time Sync | Offline Cache] toggle
───────────────────────────────────────────── */
const SpendWisePreview: React.FC = () => {
  const [syncMode, setSyncMode] = useState<'realtime' | 'offline'>('realtime');

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${syncMode === 'realtime' ? 'bg-sky-500 animate-pulse' : 'bg-amber-500'
              }`}
          />
          <span className="font-mono text-[10px] font-bold tracking-wider text-slate-600 uppercase">
            02 · WEALTH INTEL
          </span>
        </div>

        {/* Segmented state toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100/90 border border-slate-200/80">
          <button
            onClick={() => setSyncMode('realtime')}
            className={`px-2 py-0.5 text-[9.5px] font-mono font-semibold rounded transition-all cursor-pointer ${syncMode === 'realtime'
              ? 'bg-white text-sky-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Real-Time Sync
          </button>
          <button
            onClick={() => setSyncMode('offline')}
            className={`px-2 py-0.5 text-[9.5px] font-mono font-semibold rounded transition-all cursor-pointer ${syncMode === 'offline'
              ? 'bg-white text-amber-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Offline Cache
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {syncMode === 'realtime' ? (
          <motion.div
            key="realtime"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex flex-col justify-center space-y-2 my-1"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Monthly Burn
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">$2,410</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">-12.4%</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">Live Postgres Sync</span>
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
              <div className="flex items-center justify-between mb-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Analytics Engine
                </span>
                <span className="font-mono text-[9px] text-sky-600 font-semibold">28ms Query Latency</span>
              </div>
              <span className="block text-xs font-bold text-slate-900">
                Next.js App Router + Supabase RLS
              </span>
              <span className="block text-[10px] text-slate-500">Real-time WebSocket subscription active</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex flex-col justify-center space-y-2 my-1"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-amber-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Cached Records
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">1,248</span>
                  <span className="font-mono text-[10px] text-amber-600 font-semibold">Local</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">IndexedDB Storage</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/85 border border-amber-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Queue Buffer
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">3 Mutations</span>
                  <span className="font-mono text-[10px] text-sky-600 font-semibold">Pending</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">Auto-sync on reconnect</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/85 border border-amber-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Resilience Guarantee
                </span>
                <span className="font-mono text-[9px] text-emerald-600 font-semibold">Zero Data Loss</span>
              </div>
              <span className="block text-xs font-bold text-slate-900">
                Optimistic UI with Background Reconciliation
              </span>
              <span className="block text-[10px] text-slate-500">Instant client response even with network severed</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <span className="font-mono text-[9.5px] font-semibold text-sky-700 tracking-wider">
          {syncMode === 'realtime' ? 'REAL-TIME WEBSOCKET SYNC' : 'OFFLINE-FIRST ARCHITECTURE'}
        </span>
        <span className="font-mono text-[9.5px] text-slate-400">
          {syncMode === 'realtime' ? 'PostgreSQL Active' : 'IndexedDB Cache'}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEVMETRICS INTERACTIVE PREVIEW (03)
───────────────────────────────────────────── */
const activityData = [
  { week: 'Wk 01', height: 42, commits: 38, speed: '44ms', label: 'Initial Core Setup' },
  { week: 'Wk 02', height: 60, commits: 54, speed: '41ms', label: 'Octokit REST Engine' },
  { week: 'Wk 03', height: 35, commits: 29, speed: '40ms', label: 'Rate-Limit Bucket' },
  { week: 'Wk 04', height: 75, commits: 68, speed: '38ms', label: 'Edge Middleware' },
  { week: 'Wk 05', height: 50, commits: 45, speed: '36ms', label: 'Memory LRU Cache' },
  { week: 'Wk 06', height: 85, commits: 76, speed: '35ms', label: 'Punch Card Matrix' },
  { week: 'Wk 07', height: 65, commits: 58, speed: '34ms', label: 'Dual Plain Mode' },
  { week: 'Wk 08', height: 90, commits: 82, speed: '32ms', label: 'Vercel Analytics' },
  { week: 'Wk 09', height: 70, commits: 64, speed: '32ms', label: 'Editorial Type' },
  { week: 'Wk 10', height: 80, commits: 72, speed: '31ms', label: 'Repo Comparison' },
  { week: 'Wk 11', height: 95, commits: 88, speed: '30ms', label: 'Sub-second LCP' },
  { week: 'Wk 12', height: 100, commits: 92, speed: '29ms', label: 'Production v1.0' },
];

const DevMetricsInteractivePreview: React.FC = () => {
  const [mode, setMode] = useState<'technical' | 'plain'>('technical');
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const activeWeekData =
    hoveredWeek !== null ? activityData[hoveredWeek] : activityData[activityData.length - 1];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold tracking-wider text-slate-600 uppercase">
            03 · REPO TELEMETRY
          </span>
        </div>

        {/* Technical vs Plain mini toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100/90 border border-slate-200/80">
          <button
            onClick={() => setMode('technical')}
            className={`px-2 py-0.5 text-[9.5px] font-mono font-semibold rounded transition-all cursor-pointer ${mode === 'technical'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
              }`}
            aria-label="Switch to Technical mode metric preview"
          >
            Technical
          </button>
          <button
            onClick={() => setMode('plain')}
            className={`px-2 py-0.5 text-[9.5px] font-mono font-semibold rounded transition-all cursor-pointer ${mode === 'plain'
              ? 'bg-white text-teal-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
              }`}
            aria-label="Switch to Plain English mode metric preview"
          >
            Plain
          </button>
        </div>
      </div>

      {/* Metric Readout Display */}
      <AnimatePresence mode="wait">
        {mode === 'technical' ? (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center space-y-2 my-1"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Commit Velocity
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono text-sm font-bold text-slate-900">{activeWeekData.commits}</span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">{activeWeekData.speed}</span>
                </div>
                <span className="block font-mono text-[9px] text-slate-500">{activeWeekData.week} · {activeWeekData.label}</span>
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

            {/* Hoverable and Clickable Activity Bars */}
            <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Activity Rhythm
                </span>
                <span className="font-mono text-[9.5px] font-semibold text-teal-700">
                  {activeWeekData.week}: {activeWeekData.commits} commits · {activeWeekData.speed}
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-7 px-0.5 pt-0.5">
                {activityData.map((d, idx) => {
                  const isBarHovered =
                    hoveredWeek === idx || (hoveredWeek === null && idx === activityData.length - 1);
                  return (
                    <div
                      key={d.week}
                      onMouseEnter={() => setHoveredWeek(idx)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      onClick={() => setHoveredWeek(idx)}
                      className="flex-1 rounded-[2px] transition-all cursor-pointer"
                      style={{
                        height: `${d.height}%`,
                        backgroundColor: isBarHovered ? '#0d9488' : '#cbd5e1',
                      }}
                      title={`${d.week}: ${d.commits} commits (${d.label}) - click to inspect`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="plain"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center space-y-2 my-1"
          >
            <div className="p-2.5 rounded-xl bg-white/90 border border-teal-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-teal-700">
                  Executive Verdict
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                Production-Ready for Scale
              </p>
              <p className="text-[10.5px] text-slate-600 mt-0.5 leading-normal">
                High shipping cadence with distributed maintainer resilience and sub-second edge response.
              </p>
            </div>

            {/* Hoverable and Clickable Activity Bars in Plain View */}
            <div className="p-2.5 rounded-xl bg-white/85 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Shipping Cadence
                </span>
                <span className="font-mono text-[9.5px] font-semibold text-teal-700">
                  {activeWeekData.week} · {activeWeekData.label}
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-7 px-0.5 pt-0.5">
                {activityData.map((d, idx) => {
                  const isBarHovered =
                    hoveredWeek === idx || (hoveredWeek === null && idx === activityData.length - 1);
                  return (
                    <div
                      key={d.week}
                      onMouseEnter={() => setHoveredWeek(idx)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      onClick={() => setHoveredWeek(idx)}
                      className="flex-1 rounded-[2px] transition-all cursor-pointer"
                      style={{
                        height: `${d.height}%`,
                        backgroundColor: isBarHovered ? '#0d9488' : '#cbd5e1',
                      }}
                      title={`${d.week}: ${d.label} - click to inspect`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <span className="font-mono text-[9.5px] font-semibold text-teal-700 tracking-wider">
          DUAL-MODE REPORTING
        </span>
        <span className="font-mono text-[9.5px] text-slate-400">
          {mode === 'technical' ? 'Technical View' : 'Plain English View'}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAJOR FEATURED PROJECT CARD (01, 02, 03)
   With [Preview | Architecture] segmented pill switcher
───────────────────────────────────────────── */
const ProjectCard: React.FC<{
  project: FeaturedProject;
  index: number;
  globalViewMode?: 'preview' | 'architecture';
}> = ({ project, index, globalViewMode = 'preview' }) => {
  const { cardRef, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();
  const [viewMode, setViewMode] = useState<'preview' | 'architecture'>(globalViewMode);
  const { openInspectDrawer, selectedTech, setSelectedTech, hoveredTech, isTechMatch } = useTechHighlight();

  useEffect(() => {
    setViewMode(globalViewMode);
  }, [globalViewMode]);

  const isSelectedMatch = selectedTech !== null && isTechMatch(project.tech, selectedTech);
  const isHoveredMatch = hoveredTech !== null && isTechMatch(project.tech, hoveredTech);
  const isDimmed = selectedTech !== null && !isSelectedMatch;

  return (
    <ProjectReveal index={index} className="w-full">
      <div
        id={`project-${project.index}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group project-card relative overflow-hidden rounded-2xl md:rounded-3xl border transition-all duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'
          } ${isSelectedMatch
            ? 'border-indigo-500 ring-2 ring-indigo-500/25 shadow-md'
            : isHoveredMatch
              ? 'border-indigo-400 ring-2 ring-indigo-400/20 shadow-sm'
              : isHovered
                ? 'border-slate-300 shadow-sm'
                : 'border-slate-200/80 shadow-2xs'
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
          {/* Visual Preview / Architecture Panel */}
          <div
            className="md:col-span-5 relative overflow-hidden min-h-[300px] md:min-h-[410px] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}0f 0%, ${project.accentColor}03 100%)`,
            }}
          >
            {/* Abstract SVG Grid */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
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

            {/* Large Index Number Watermark */}
            <span
              className="absolute right-4 bottom-2 font-display pointer-events-none select-none transition-opacity duration-300 tabular-nums"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(4.5rem, 7.5vw, 6.5rem)',
                color: `${project.accentColor}12`,
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              {project.index}
            </span>

            {/* Top Segmented [Preview | Architecture] Switcher */}
            <div className="relative z-20 flex items-center justify-between mb-2">
              <div className="inline-flex items-center p-0.5 rounded-lg bg-white/90 border border-slate-200/90 shadow-3xs">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'preview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                  aria-label="Show Live Interactive Preview"
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('architecture')}
                  className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'architecture'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                  aria-label="Show Interactive Architecture Flow"
                >
                  Architecture
                </button>
              </div>

              <span className="font-mono text-[9px] font-medium text-slate-400">
                Mode: {viewMode === 'preview' ? 'Live Lens' : 'System Flow'}
              </span>
            </div>

            {/* Frame Content: Swaps between Preview and Architecture Mode */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {viewMode === 'preview' ? (
                  <motion.div
                    key="preview-frame"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    {project.id === 3 ? (
                      <DevMetricsInteractivePreview />
                    ) : project.id === 2 ? (
                      <SpendWisePreview />
                    ) : (
                      <CanteenConnectPreview />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="arch-frame"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <ArchitectureDiagram projectId={project.id} accentColor={project.accentColor} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Content Panel */}
          <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between relative z-20">
            <div>
              {/* Category Pill & Quick Links */}
              <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
                <span
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] px-2.5 py-1 rounded-md border leading-snug tabular-nums"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                    background: `${project.accentColor}0a`,
                  }}
                >
                  {project.index} · {project.category}
                </span>

                {/* Quick Icon Links */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} Source Code on GitHub`}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-2xs active:scale-[0.98]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon size={14} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} Live Demo`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-2xs active:scale-[0.98]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Title (Clickable to inspect) */}
              <h3
                onClick={() => openInspectDrawer(project.id)}
                className="font-sans font-bold text-slate-950 text-2xl md:text-[26px] tracking-[-0.02em] leading-snug mb-3 cursor-pointer hover:text-indigo-600 transition-colors"
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-sans font-normal text-[14.5px] leading-[1.6] text-slate-600 mb-5">
                {project.description}
              </p>

              {/* Technology Pills with Interactive Cross-Filtering */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => {
                  const isSelected = selectedTech === t;
                  return (
                    <button
                      key={t}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTech(t);
                      }}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-medium tabular-nums border transition-all cursor-pointer ${isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'border-slate-900/10 bg-slate-900/[0.02] text-slate-600 hover:border-slate-900/20 hover:text-slate-900'
                        }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Source Code for ${project.title}`}
                className="btn-outline inline-flex items-center gap-1.5 py-2 px-4 text-xs font-semibold text-slate-700 hover:text-indigo-600 shadow-2xs active:scale-[0.98] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={14} /> Source Code
                <ArrowUpRight size={13} />
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Live Demo for ${project.title}`}
                  className="btn-primary inline-flex items-center gap-1.5 py-2 px-4 text-xs font-bold text-white shadow-xs active:scale-[0.98] transition-all"
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
                  <ExternalLink size={13} />
                </a>
              )}

              {/* Inspect Details trigger button */}
              <button
                onClick={() => openInspectDrawer(project.id)}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg border border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-mono text-[11px] font-semibold transition-all cursor-pointer shadow-3xs active:scale-[0.98] ml-auto"
              >
                <Cpu size={13} className="text-slate-500" />
                <span>Inspect Architecture</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProjectReveal>
  );
};

/* ─────────────────────────────────────────────
   MINOR COMPACT PROJECT CARD (04, 05, 06)
───────────────────────────────────────────── */
const CompactProjectCard: React.FC<{ project: CompactProject; index: number }> = ({ project, index }) => {
  const { cardRef, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useSpotlight();
  const { openInspectDrawer, selectedTech, setSelectedTech, hoveredTech, isTechMatch } = useTechHighlight();

  const isSelectedMatch = selectedTech !== null && isTechMatch(project.tech, selectedTech);
  const isHoveredMatch = hoveredTech !== null && isTechMatch(project.tech, hoveredTech);
  const isDimmed = selectedTech !== null && !isSelectedMatch;

  return (
    <ProjectReveal index={index} className="w-full h-full">
      <div
        id={`project-${project.index}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full flex flex-col justify-between p-6 rounded-2xl bg-white/95 border transition-all duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'
          } ${isSelectedMatch
            ? 'border-indigo-500 ring-2 ring-indigo-500/25 shadow-md'
            : isHoveredMatch
              ? 'border-indigo-400 ring-2 ring-indigo-400/20 shadow-sm'
              : isHovered
                ? 'border-slate-300 shadow-sm'
                : 'border-slate-200/80 shadow-2xs'
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
              <button
                onClick={() => openInspectDrawer(project.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-3xs active:scale-[0.98] cursor-pointer"
                title="Inspect project details"
              >
                <Cpu size={12} />
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-3xs active:scale-[0.98]"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={13} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Live Demo`}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-3xs active:scale-[0.98]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h4
            onClick={() => openInspectDrawer(project.id)}
            className="font-sans font-bold text-slate-950 text-base mb-2 tracking-tight transition-colors duration-200 cursor-pointer hover:text-indigo-600"
          >
            {project.title}
          </h4>

          {/* Summary */}
          <p className="font-sans font-normal text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer: Top Tech Tags */}
        <div className="pt-3.5 border-t border-slate-100/90 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map((t) => {
              const isSelected = selectedTech === t;
              return (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTech(t);
                  }}
                  className={`font-mono text-[9.5px] font-semibold tracking-wide px-2 py-0.5 rounded-md cursor-pointer transition-all ${isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'hover:opacity-80'
                    }`}
                  style={
                    isSelected
                      ? undefined
                      : {
                        background: `${project.accentColor}0e`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}25`,
                      }
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => openInspectDrawer(project.id)}
            className="font-mono text-[10.5px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-0.5 cursor-pointer"
          >
            Inspect <ArrowUpRight size={11} />
          </button>
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
  const { selectedTech, setSelectedTech, isTechMatch } = useTechHighlight();
  const [globalViewMode, setGlobalViewMode] = useState<'preview' | 'architecture'>('preview');

  const matchingCount =
    selectedTech !== null
      ? [...featuredProjects, ...compactProjects].filter((p) => isTechMatch(p.tech)).length
      : 0;

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">
        {/* Section header with baseline mask slide reveal */}
        <div className="mb-14">
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
              className="section-title text-text-primary"
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

          {/* Master View Mode Switcher + Tech Filter Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-3xs">
              <button
                onClick={() => setGlobalViewMode('preview')}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${globalViewMode === 'preview'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
                  }`}
                aria-label="Set all cards to UI Preview mode"
              >
                UI Preview
              </button>
              <button
                onClick={() => setGlobalViewMode('architecture')}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${globalViewMode === 'architecture'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
                  }`}
                aria-label="Set all cards to System Blueprint mode"
              >
                System Blueprint
              </button>
            </div>

            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-indigo-50/90 border border-indigo-200 text-xs font-mono text-indigo-900 shadow-3xs"
              >
                <Sparkles size={13} className="text-indigo-600" />
                <span>
                  Highlighting {matchingCount} projects matching <strong className="font-semibold text-indigo-950">{selectedTech}</strong>
                </span>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="ml-1 p-0.5 rounded text-indigo-500 hover:text-indigo-900 cursor-pointer"
                  title="Clear filter"
                >
                  <X size={13} />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Major Projects: Positions 01, 02, 03 (Clean flush container without shift) */}
        <div className="space-y-8 mb-4 min-w-0">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              globalViewMode={globalViewMode}
            />
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
