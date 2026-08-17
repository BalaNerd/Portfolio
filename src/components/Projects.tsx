import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './ui/Icons';
import BlurReveal from './ui/BlurReveal';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  accentColor: string;
  stats: string;
  index: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CanteenConnect',
    category: 'Full-Stack Web Application',
    description:
      'Smart canteen management system designed to streamline food ordering, reduce wait times, and provide real-time order tracking with efficient queue handling and responsive UI.',
    tech: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'PWA'],
    github: 'https://github.com/BalaNerd/Canteen_Connect',
    live: 'https://canteen-connect.onrender.com/home',
    accentColor: '#4f46e5',
    stats: 'Queue Management & PWA',
    index: '01',
  },
  {
    id: 2,
    title: 'SpendWise',
    category: 'Personal Finance Platform',
    description:
      'Personal finance tracking system for monitoring expenses, analyzing spending patterns, and generating data-driven insights with transaction categorization and spending visualization.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/BalaNerd/spendwise',
    live: 'https://spendwise-two-kappa.vercel.app',
    accentColor: '#0284c7',
    stats: 'Financial Analytics & Insights',
    index: '02',
  },
];

// Spatial tilt card wrapper
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; intensity?: number }> = ({
  children,
  className = '',
  intensity = 4,
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

// Featured Project Card Component
const ProjectCard: React.FC<{ project: Project; delay?: number }> = ({ project, delay = 0 }) => {
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
          style={{
            borderColor: isHovered ? `${project.accentColor}50` : 'rgba(15, 23, 42, 0.08)',
          }}
        >
          <div className="grid md:grid-cols-12 gap-0">
            {/* Visual Panel */}
            <div
              className="md:col-span-5 relative overflow-hidden min-h-[220px] md:min-h-[320px] flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100"
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
                className="absolute w-44 h-44 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${project.accentColor}25 0%, transparent 70%)` }}
                animate={{ scale: isHovered ? 1.25 : 1, opacity: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.5 }}
              />

              {/* Large Index Number */}
              <span
                className="relative z-10 font-display font-800 pointer-events-none select-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(5rem, 9vw, 7rem)',
                  color: `${project.accentColor}28`,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {project.index}
              </span>
            </div>

            {/* Content Panel */}
            <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between relative z-20">
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between mb-4">
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

                  {/* Top-Right Quick Links */}
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Source Code on GitHub`}
                      title="View Source Code on GitHub"
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon size={16} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} Live Demo`}
                      title="View Live Demo"
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50/50 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 transition-all shadow-xs"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={16} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Title */}
                <h3
                  className="text-text-primary mb-3 font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                </h3>

                {/* Resume-backed Description */}
                <p
                  className="text-text-secondary text-sm leading-relaxed mb-6 font-normal"
                  style={{ fontFamily: 'var(--font-body)' }}
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

              {/* Verified Action Buttons */}
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

                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Live Demo for ${project.title}`}
                  className="btn-primary inline-flex items-center gap-2 py-2.5 px-5 text-sm font-bold shadow-sm"
                  style={{
                    background: project.id === 2 ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : undefined,
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo <ArrowUpRight size={15} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </BlurReveal>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">
        {/* Section header */}
        <BlurReveal delay={0} className="mb-16">
          <span className="section-label block mb-4 text-indigo-600">02 — Work</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p
            className="text-text-secondary mt-4 max-w-xl font-normal"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            Verified full-stack and data projects built with real-world constraints — performance, responsive design, and clean user experience.
          </p>
        </BlurReveal>

        {/* Verified Project Cards */}
        <div className="space-y-8 mb-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* GitHub CTA */}
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
