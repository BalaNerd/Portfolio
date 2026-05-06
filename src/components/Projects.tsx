import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch as GitHub, ExternalLink} from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/variants';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Canteen_Connect',
      description: 'A high-performance PWA designed for streamlined canteen management. Features multi-role authentication (Admin/Staff), real-time order tracking, and dynamic digital receipts.',
      tech: ['React', 'Tailwind CSS', 'Supabase', 'PWA'],
      github: 'https://github.com/BalaNerd/Canteen_Connect',
      live: 'https://canteen-connect.onrender.com',
      category: 'web',
      image: 'canteen',
      featured: true,
      stats: '150+ Users'
    },
    {
      id: 2,
      title: 'SpendWise',
      description: 'Sophisticated financial management platform with interactive data visualization. Personalised expense tracking, budget forecasting, and real-time category analysis.',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'],
      github: 'https://github.com/BalaNerd/spendwise',
      live: null,
      category: 'data',
      image: 'spendwise',
      featured: true,
      stats: 'Beta'
    },
    {
      id: 3,
      title: 'Social-Media-Usage-Analytics',
      description: 'Data-intensive analytics engine for tracking social media patterns. Leverages Redis and BullMQ for high-throughput background processing and real-time data ingestion.',
      tech: ['Next.js', 'Node.js', 'Redis', 'BullMQ', 'MongoDB'],
      github: 'https://github.com/BalaNerd/Social-Media-Usage-Analytics',
      live: null,
      category: 'data',
      image: 'analytics',
      featured: true,
      stats: 'Scaleable'
    },
    {
      id: 4,
      title: 'CityPulse',
      description: 'Live Urban Activity Intelligence Engine. Real-time data processing system analyzing urban mobility and activity patterns with interactive dashboards and predictive insights.',
      tech: ['Python', 'React', 'Next.js', 'Tailwind CSS', 'WebSockets'],
      github: 'https://github.com/BalaNerd/City-pulse',
      live: null,
      category: 'data',
      image: 'citypulse',
      featured: true,
      stats: 'Real-time'
    },
  ];

  const filters = [
    { id: 'all', name: 'All Work' },
    { id: 'web', name: 'Web Apps' },
    { id: 'data', name: 'Data Systems' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-4 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-4 glass rounded-full"
          >
            <span className="text-sm font-medium text-pink-400">Portfolio</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Featured Innovations</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A selective showcase of zero-to-one products and engineering solutions.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              variants={itemVariants}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 border ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'glass border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="project-card group flex flex-col glass rounded-2xl border border-slate-800/60 hover:border-indigo-500/50 hover:bg-slate-900/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500"
            >
              {/* Project Content */}
              <div className="p-8 flex flex-col flex-grow relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="mb-6 flex-grow relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="glass px-3 py-1 rounded-lg text-xs font-bold text-indigo-400 border-indigo-500/20 whitespace-nowrap ml-4">
                      {project.stats}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 group-hover:text-slate-300 transition-colors">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-[10px] uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg font-bold border border-indigo-500/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-800/50 mt-auto">
                  {/* Source Code Button */}
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-xl text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 text-sm font-bold"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitHub size={16} />
                    Source Code
                  </motion.a>

                  {/* Live Demo Button */}
                  {project.live ? (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  ) : (
                    <div className="flex-1 relative group/tooltip">
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-xl text-slate-600 border border-slate-800/50 cursor-not-allowed text-sm font-bold"
                        aria-label="Live Demo - Coming Soon"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-medium whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        Coming Soon
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">
            Want to see more projects?
          </p>
          <motion.a
            href="https://github.com/BalaNerd"
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GitHub size={20} />
            Visit My GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
