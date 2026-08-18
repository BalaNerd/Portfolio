import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, GraduationCap, Heart, ArrowUpRight } from 'lucide-react';
import BlurReveal from './ui/BlurReveal';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  company?: string;
  type?: string;
  location?: string;
  period: string;
  duration?: string;
  description: string[];
  skills: string[];
  accentColor: string;
  icon: React.ElementType;
  links?: { label: string; href: string; primary?: boolean }[];
}

const experiences: TimelineItem[] = [
  {
    id: '01',
    title: 'Data Scientist & Analyst Intern',
    company: 'Zidio Development',
    type: 'Internship',
    location: 'Remote',
    period: 'Jul 2025 – Sep 2025',
    duration: '3 months',
    description: [
      'Performed data cleaning, analysis, and visualization using Python on real-world datasets.',
      'Applied machine learning concepts through structured training and practical tasks.',
      'Gained hands-on experience in the data science workflow, including preprocessing, model building, and evaluation.',
      'Worked with real-world datasets to extract actionable insights and improve decision-making.',
    ],
    skills: ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Data Visualization', 'Machine Learning'],
    accentColor: '#4f46e5',
    icon: Briefcase,
  },
];

const education: TimelineItem[] = [
  {
    id: '02',
    title: 'Bachelor of Technology in Computer Science',
    subtitle: 'Specialization in Big Data Analytics',
    company: 'SRM Institute of Science and Technology',
    type: 'B.Tech Degree',
    location: 'Ramapuram, Tamil Nadu, India',
    period: 'Aug 2023 – Jun 2027',
    duration: 'CGPA: 8.61',
    description: [
      'B.Tech curriculum focused on Big Data Analytics, machine learning, and scalable systems.',
      'Comprehensive study of data structures, algorithms, database management, and full-stack web engineering.',
      'Hands-on projects building data-intensive applications and high-performance digital systems.',
    ],
    skills: ['Python', 'Data Structures', 'Algorithms', 'Big Data Analytics', 'Machine Learning', 'DBMS', 'MySQL'],
    accentColor: '#0284c7',
    icon: GraduationCap,
  },
];

const hackathons: TimelineItem[] = [
  {
    id: '03',
    title: 'Hackathons & Achievements',
    subtitle: 'Competitions & ML Projects',
    company: 'VIT Chennai & Competitions',
    type: 'Recognition',
    location: 'Chennai, India',
    period: '2024 – 2025',
    description: [
      'Hack the Horizon 2.0 – VIT Chennai: Built CypherGuard, a cybersecurity dashboard using Flask & ML under 24-hour constraints.',
      'NumeroHack 2025: Developed a voice-based sentiment analysis system using ML, MFCC & Fourier Transform.',
      'Mathematical Modeling Competition: Designed a traffic flow simulation using Cellular Automata for real-world modeling.',
    ],
    skills: ['Flask', 'Machine Learning', 'MFCC', 'Fourier Transform', 'Cybersecurity', 'Cellular Automata'],
    accentColor: '#7c3aed',
    icon: Briefcase,
  },
];

const volunteering: TimelineItem[] = [
  {
    id: '04',
    title: 'Student Volunteer',
    company: 'ExNoRa International Foundation',
    type: 'Volunteering',
    location: 'Chennai, India',
    period: 'Jun 2025 – Jul 2025',
    description: [
      'Contributed to urban clean-up drives, plastic segregation campaigns, and community awareness initiatives promoting sustainable living practices in Chennai.',
    ],
    skills: ['Community Outreach', 'Environmental Awareness', 'Urban Sustainability'],
    accentColor: '#059669',
    icon: Heart,
    links: [
      {
        label: 'Featured in The Hindu',
        href: 'https://www.thehindu.com/news/cities/chennai/aadi-pattam-a-spotlight-on-volunteers-from-chennai-who-green-neighbourhoods/article69803636.ece',
        primary: true,
      },
      {
        label: 'View Activity',
        href: 'https://www.instagram.com/p/DMKedqOx1a8/',
        primary: false,
      },
    ],
  },
];

const TimelineEntry: React.FC<{ item: TimelineItem; delay?: number }> = ({ item, delay = 0 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative grid md:grid-cols-12 gap-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Left — index/meta */}
      <div className="md:col-span-4 flex md:justify-end md:pr-12 pb-6 md:pb-0">
        <div className="flex flex-row md:flex-col items-start md:items-end gap-4 md:gap-3 pt-1">
          {/* Index number */}
          <span
            className="font-display font-800"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '3.2rem',
              lineHeight: 1,
              color: `${item.accentColor}30`,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            {item.id}
          </span>
          <div className="flex flex-col md:items-end gap-1 mt-1">
            <div className="flex items-center gap-1.5 text-text-muted font-medium" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
              <Calendar size={13} className="text-slate-400" />
              <span>{item.period}</span>
            </div>
            {item.location && (
              <div className="flex items-center gap-1.5 text-text-muted font-medium" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
                <MapPin size={13} className="text-slate-400" />
                <span>{item.location}</span>
              </div>
            )}
            {item.duration && (
              <span className="tech-pill text-[10px] mt-1">{item.duration}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center — animated line + icon */}
      <div className="hidden md:flex md:col-span-1 flex-col items-center">
        {/* Icon bubble */}
        <motion.div
          className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white border shadow-sm"
          style={{ borderColor: `${item.accentColor}35` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.35, delay: delay + 0.1, type: 'spring', stiffness: 300 }}
        >
          <Icon size={17} style={{ color: item.accentColor }} />
        </motion.div>
        {/* Vertical line */}
        <motion.div
          className="w-px flex-1 mt-3 min-h-[3rem]"
          style={{ background: `linear-gradient(to bottom, ${item.accentColor}40, transparent)`, transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>

      {/* Right — content card */}
      <div className="md:col-span-7 md:pl-10 pb-16">
        <div className="p-7 rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm">
          {/* Type badge */}
          {item.type && (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border mb-4 section-label"
              style={{ borderColor: `${item.accentColor}35`, color: item.accentColor, background: `${item.accentColor}08` }}
            >
              {item.type}
            </span>
          )}

          {/* Title */}
          <h3
            className="text-text-primary mb-1 font-bold"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)', letterSpacing: '-0.015em' }}
          >
            {item.title}
          </h3>

          {/* Company / Subtitle */}
          <p
            className="mb-5 font-semibold"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: item.accentColor }}
          >
            {item.company}
            {item.subtitle && (
              <span className="text-text-muted font-normal ml-2">— {item.subtitle}</span>
            )}
          </p>

          {/* Description */}
          <ul className="space-y-2.5 mb-6">
            {item.description.map((point, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-text-secondary text-sm leading-relaxed font-normal"
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.35, delay: delay + 0.15 + i * 0.07 }}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.accentColor }} />
                {point}
              </motion.li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="tech-pill">{skill}</span>
            ))}
          </div>

          {/* External links (e.g. press coverage, activity links) */}
          {item.links && item.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-slate-100">
              <span
                className="section-label text-[10px] tracking-widest"
                style={{ color: item.accentColor }}
              >
                COVERED BY
              </span>
              {item.links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: link.primary ? item.accentColor : 'var(--text-muted)',
                    letterSpacing: '0.005em',
                  }}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  {link.label} <ArrowUpRight size={13} />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">

        {/* Section header */}
        <BlurReveal delay={0} className="mb-20">
          <span className="section-label block mb-4 text-indigo-600">04 — Journey</span>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Education</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl font-normal" style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A timeline of professional growth, technical contribution, and academic foundation.
          </p>
        </BlurReveal>

        {/* Experience entries */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineEntry key={exp.id} item={exp} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* Education entries */}
        <div>
          {education.map((edu, i) => (
            <TimelineEntry key={edu.id} item={edu} delay={0.2 + i * 0.1} />
          ))}
        </div>

        {/* Hackathons entries */}
        <div>
          {hackathons.map((hack, i) => (
            <TimelineEntry key={hack.id} item={hack} delay={0.3 + i * 0.1} />
          ))}
        </div>

        {/* Volunteering — editorial sub-divider + entries */}
        <BlurReveal delay={0.1} className="mt-4 mb-12">
          <div className="flex items-center gap-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
            <span className="section-label text-[10px] tracking-[0.25em] text-emerald-600">VOLUNTEERING</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
          </div>
        </BlurReveal>
        <div>
          {volunteering.map((vol, i) => (
            <TimelineEntry key={vol.id} item={vol} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
