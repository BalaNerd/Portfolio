import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code2, Database, Globe, Zap, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import BlurReveal from './ui/BlurReveal';
import BentoCard from './ui/BentoCard';

const About: React.FC = () => {
  const capabilities = [
    {
      icon: Code2,
      title: 'Full-Stack Dev',
      desc: 'React, Next.js, Node.js — end-to-end product engineering with precision.',
      color: '#4f46e5',
      bgColor: 'rgba(79, 70, 229, 0.08)',
    },
    {
      icon: Database,
      title: 'Data & Backend',
      desc: 'Designing efficient APIs, scalable schemas, and high-throughput pipelines.',
      color: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.08)',
    },
    {
      icon: Globe,
      title: 'Problem Solver',
      desc: 'Translating complex real-world requirements into clean, performant software.',
      color: '#7c3aed',
      bgColor: 'rgba(124, 58, 237, 0.08)',
    },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main">

        {/* Section header */}
        <BlurReveal delay={0} className="mb-16">
          <span className="section-label block mb-4 text-indigo-600">01 — About</span>
          <h2 className="section-title text-text-primary">
            The person<br />
            <span className="gradient-text">behind the code.</span>
          </h2>
        </BlurReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

          {/* Hero statement — large card */}
          <div className="md:col-span-8">
            <BentoCard className="p-8 h-full min-h-[220px] flex flex-col justify-between" delay={0.05} glowColor="rgba(99,102,241,0.12)">
              <p
                className="text-text-primary leading-relaxed font-semibold"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.55,
                }}
              >
                I build full-stack applications, data-driven systems and interactive digital
                experiences — bridging the gap between complex data and beautiful interfaces.
              </p>
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
                <motion.a
                  href="https://github.com/BalaNerd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <GithubIcon size={15} /> BalaNerd
                </motion.a>
                <span className="text-slate-300">·</span>
                <motion.a
                  href="https://www.linkedin.com/in/s-balaraju/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-indigo-600 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <LinkedinIcon size={15} /> s-balaraju
                </motion.a>
              </div>
            </BentoCard>
          </div>

          {/* Location card */}
          <div className="md:col-span-4">
            <BentoCard className="p-6 h-full min-h-[180px] flex flex-col justify-between" delay={0.1} glowColor="rgba(2,132,199,0.1)">
              <div className="flex items-center gap-2 text-cyan-600 mb-3">
                <MapPin size={16} />
                <span className="section-label text-[10px] text-cyan-600 font-bold">Location</span>
              </div>
              <div>
                <p className="text-text-primary font-display font-700 text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  Chennai
                </p>
                <p className="text-text-muted text-sm font-medium">Tamil Nadu, India</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-text-muted font-medium">Open to remote opportunities</span>
              </div>
            </BentoCard>
          </div>

          {/* Education card */}
          <div className="md:col-span-5">
            <BentoCard className="p-6 sm:p-7 h-full flex flex-col justify-between" delay={0.15} glowColor="rgba(124,58,237,0.12)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50 border border-purple-100">
                      <GraduationCap size={16} className="text-purple-600" />
                    </div>
                    <span className="section-label text-[10px] text-purple-600 font-bold tracking-widest uppercase">DEGREE</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    CGPA 8.61
                  </span>
                </div>

                <h3 className="text-text-primary font-display font-700 text-xl leading-snug mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  Bachelor of Technology <br />
                  <span className="text-indigo-600 font-semibold text-base">in Computer Science</span>
                </h3>

                <p className="text-text-secondary text-sm font-medium mt-2 mb-0.5">
                  SRM Institute of Science and Technology
                </p>
                <p className="text-text-muted text-xs">
                  Ramapuram, Tamil Nadu, India
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-text-muted block text-[10px] uppercase tracking-wider font-semibold">Specialization</span>
                  <span className="text-purple-700 font-bold">Big Data Analytics</span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted block text-[10px] uppercase tracking-wider font-semibold">Timeline</span>
                  <span className="text-text-primary font-bold">2023 — 2027</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Currently Building card */}
          <div className="md:col-span-7">
            <BentoCard className="p-6 h-full" delay={0.2} glowColor="rgba(99,102,241,0.12)">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 border border-indigo-100">
                    <Zap size={16} className="text-indigo-600" />
                  </div>
                  <span className="section-label text-[10px] text-indigo-600 font-bold">Currently Building</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-text-primary font-display font-700 text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Mission Control OS
              </p>
              <p className="text-text-muted text-sm mb-4 leading-relaxed">
                A unified intelligence layer for real-time data orchestration — combining event-driven architecture with interactive mission dashboards.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Redis', 'WebSockets', 'TypeScript'].map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Capabilities row */}
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="md:col-span-4">
                <BentoCard
                  className="p-6 h-full"
                  delay={0.25 + i * 0.07}
                  glowColor={`${cap.color}15`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                    style={{ background: cap.bgColor, borderColor: `${cap.color}25` }}
                  >
                    <Icon size={18} style={{ color: cap.color }} />
                  </div>
                  <p className="text-text-primary font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {cap.title}
                  </p>
                  <p className="text-text-muted text-xs leading-relaxed font-normal">{cap.desc}</p>
                </BentoCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
