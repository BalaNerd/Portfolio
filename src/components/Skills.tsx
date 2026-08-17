import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurReveal from './ui/BlurReveal';

interface Skill {
  name: string;
  icon: string;
  color: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           color: '#0284c7', category: 'frontend' },
  { name: 'Next.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',         color: '#0e0f1a', category: 'frontend' },
  { name: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',color: '#06B6D4', category: 'frontend' },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#D97706', category: 'frontend' },
  { name: 'HTML5',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           color: '#E34F26', category: 'frontend' },
  { name: 'CSS3',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',             color: '#1572B6', category: 'frontend' },
  // Backend & APIs
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',        color: '#3776AB', category: 'backend' },
  { name: 'FastAPI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',      color: '#009688', category: 'backend' },
  { name: 'Flask',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',          color: '#0e0f1a', category: 'backend' },
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',        color: '#16a34a', category: 'backend' },
  { name: 'Supabase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',    color: '#059669', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',color: '#336791', category: 'backend' },
  { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',          color: '#4479A1', category: 'backend' },
  // Data & Cloud
  { name: 'AWS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900', category: 'data' },
  { name: 'Pandas',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',        color: '#7c3aed', category: 'data' },
  { name: 'NumPy',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',          color: '#0284c7', category: 'data' },
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',                  color: '#A8B9CC', category: 'data' },
  { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',            color: '#EA2D2E', category: 'data' },
  // Tools
  { name: 'Git',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',    color: '#ea580c', category: 'tools' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#0e0f1a', category: 'tools' },
  { name: 'VS Code',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',  color: '#0284c7', category: 'tools' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',  color: '#0e0f1a', category: 'tools' },
];

const categories = [
  { id: 'frontend', label: 'Frontend',  number: '01', color: '#4f46e5' },
  { id: 'backend',  label: 'Backend',   number: '02', color: '#0284c7' },
  { id: 'data',     label: 'Data',      number: '03', color: '#7c3aed' },
  { id: 'tools',    label: 'Tools',     number: '04', color: '#d97706' },
];

const SkillCard: React.FC<{ skill: Skill; index: number; catColor: string }> = ({ skill, index, catColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-200/80 bg-white/80 cursor-pointer group shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.05 : 1,
        borderColor: isHovered ? `${catColor}50` : 'rgba(15, 23, 42, 0.08)',
        boxShadow: isHovered ? `0 10px 24px -4px ${catColor}20, 0 2px 6px rgba(0,0,0,0.03)` : '0 1px 3px rgba(0,0,0,0.02)',
      }}
      style={{ transformStyle: 'preserve-3d', transition: 'box-shadow 0.25s, border-color 0.25s' }}
    >
      <motion.img
        src={skill.icon}
        alt={skill.name}
        className="w-9 h-9 object-contain"
        animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <span
        className="text-xs font-semibold text-center text-text-secondary group-hover:text-text-primary transition-colors duration-200"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}
      >
        {skill.name}
      </span>

      {/* Glow dot */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
            style={{ background: catColor }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">

        {/* Section header */}
        <BlurReveal delay={0} className="mb-16">
          <span className="section-label block mb-4 text-indigo-600">03 — Skills</span>
          <h2 className="section-title">
            Tools &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl font-normal" style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A curated toolkit built through real projects. Each technology chosen for a specific purpose.
          </p>
        </BlurReveal>

        {/* Category rows */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id}>
                {/* Category label */}
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ fontFamily: 'var(--font-mono)', color: cat.color, letterSpacing: '0.12em' }}
                  >
                    {cat.number}
                  </span>
                  <span
                    className="font-display font-bold text-sm text-text-primary uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {cat.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cat.color}35, transparent)` }} />
                </motion.div>

                {/* Skills grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3.5">
                  {catSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} catColor={cat.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
