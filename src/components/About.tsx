import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/variants';

const About = () => {
  const skills = [
    {
      icon: Code,
      title: 'Full Stack Dev',
      description: 'Building scalable web apps with React, Next.js, and Node.js.',
    },
    {
      icon: Database,
      title: 'Data & Backend',
      description: 'Designing efficient APIs and managing complex data workflows.',
    },
    {
      icon: Globe,
      title: 'Problem Solver',
      description: 'Translating business requirements into technical solutions.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">About My Journey</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Bridging the gap between data-driven insights and modern web engineering.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image Area */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative group"
          >
            <div className="relative w-72 h-72 mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-[-20px] bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
              
              <div className="relative glass h-full w-full rounded-full p-2 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <div className="bg-slate-950 rounded-full w-full h-full flex items-center justify-center relative overflow-hidden group">
                  <img
                    src="/profile.png"
                    alt="Bala Raju - Developer Profile"
                    className="w-full h-full object-cover object-top rounded-full"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const icon = document.createElement('span');
                        icon.className = 'text-slate-700 text-[140px] flex items-center justify-center w-full h-full';
                        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                        parent.appendChild(icon);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Who am I?</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                I'm a dedicated <span className="text-blue-400 font-semibold">Computer Science Engineer</span> with a passion for architecting 
                robust, data-centric applications. With a foundation in Big Data Analytics, I bring a unique 
                analytical perspective to every piece of code I write.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">My Mission</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Whether it's building real-time canteen management systems or optimizing financial tracking apps, 
                my goal is always the same: <span className="italic text-slate-300">to create software that is not just 
                functional, but exceptional.</span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <div className="px-4 py-2 glass rounded-xl text-sm font-medium text-slate-300">Backend Architect</div>
              <div className="px-4 py-2 glass rounded-xl text-sm font-medium text-slate-300">Data Analytics</div>
              <div className="px-4 py-2 glass rounded-xl text-sm font-medium text-slate-300">PWA Specialist</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Quick Look */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="skill-card group"
              >
                <div className="w-14 h-14 mb-6 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
