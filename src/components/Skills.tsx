import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/variants';

interface Skill {
  name: string;
  icon: string;
  color: string;
  category: string;
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills: Skill[] = [
    // Frontend
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', category: 'frontend' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#FFFFFF', category: 'frontend' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6', category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4', category: 'frontend' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E', category: 'frontend' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26', category: 'frontend' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6', category: 'frontend' },
    // Backend
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933', category: 'backend' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB', category: 'backend' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: '#092E20', category: 'backend' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248', category: 'backend' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', color: '#3ECF8E', category: 'backend' },
    // Data Science
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: '#150458', category: 'data' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: '#013243', category: 'data' },
    { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: '#F37626', category: 'data' },
    { name: 'scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', color: '#F7931E', category: 'data' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479A1', category: 'data' },
    // Tools
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032', category: 'tools' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#FFFFFF', category: 'tools' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007ACC', category: 'tools' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED', category: 'tools' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#FCC624', category: 'tools' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E', category: 'tools' },
  ];

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'data', name: 'Data Science' },
    { id: 'tools', name: 'Tools' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-4 glass rounded-full"
          >
            <span className="text-sm font-medium text-purple-400">Expertise</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Technical Arsenal</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical proficiency and toolset.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                  : 'glass border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Premium Cinematic Animation */}
        <AnimatePresence>
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02 }
              },
              exit: {
                opacity: 0,
                transition: { staggerChildren: 0.01, duration: 0.2 }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  },
                  exit: { 
                    opacity: 0, 
                    y: -10, 
                    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="relative group flex flex-col items-center justify-center gap-4 p-5 glass rounded-2xl cursor-default border border-slate-800/50 md:hover:border-indigo-500/50 transition-colors transition-shadow duration-300 h-full w-full md:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] will-change-transform"
                style={{ transform: 'translateZ(0)' }}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 md:group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />
                <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-slate-900/80 group-hover:bg-slate-800/80 transition-colors duration-500 p-2.5 shadow-inner">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain drop-shadow-md"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-indigo-400 font-bold text-lg';
                        fallback.textContent = skill.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors duration-500 text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Learning Note */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-[2rem] text-center border border-dashed border-indigo-500/20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-300 font-bold tracking-wide">CURRENTLY EXPLORING</span>
          </div>
          <p className="text-slate-400 text-lg">
            Post-graduate level <span className="text-white font-bold">Deep Learning architectures</span> and{' '}
            <span className="text-white font-bold">Event-driven Microservices</span> with Kafka.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
