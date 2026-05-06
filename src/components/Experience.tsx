import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Wifi } from 'lucide-react';
import { containerVariants, slideInVariants } from '../utils/variants';

const Experience = () => {
  const experiences = [
    {
      title: 'Data Scientist and Analyst',
      company: 'Zidio Development',
      type: 'Internship',
      location: 'Remote',
      period: 'Jul 2025 – Sep 2025',
      duration: '3 months',
      description: [
        'Gained hands-on experience in data cleaning, analysis, and visualization using Python.',
        'Participated in structured training sessions on machine learning techniques.',
        'Developed understanding of the end-to-end data science workflow including model building.',
      ],
      skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning', 'SQL'],
      color: 'from-indigo-500/20 to-purple-500/20',
      accent: 'indigo',
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 bg-[#020617]/50 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-24"
        >
          <motion.div
            variants={slideInVariants}
            className="inline-block px-4 py-1.5 mb-4 glass rounded-full"
          >
            <span className="text-sm font-medium text-blue-400">Career History</span>
          </motion.div>

          <motion.h2
            variants={slideInVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Professional Journey</span>
          </motion.h2>
          <motion.p
            variants={slideInVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A timeline of my professional growth and technical contributions.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/70 via-purple-500/40 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={slideInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative flex items-start gap-8 ml-14 md:ml-0 md:justify-center"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-2.125rem] md:left-1/2 md:-translate-x-1/2 top-8 w-5 h-5 bg-indigo-500 rounded-full border-4 border-[#030712] shadow-[0_0_16px_rgba(79,70,229,0.6)] z-20" />

              {/* Experience Card */}
              <motion.div
                className="w-full md:w-[56%] glass p-8 rounded-3xl border border-slate-800/60 hover:border-indigo-500/40 transition-all duration-500 group relative overflow-hidden"
                whileHover={{ y: -4 }}
              >
                {/* Background accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Header */}
                <div className="relative z-10 mb-6">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-indigo-500/15 text-indigo-400 rounded-full border border-indigo-500/20">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                      <Wifi size={10} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Period */}
                  <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase">
                    {exp.period} · <span className="text-slate-500">{exp.duration}</span>
                  </span>

                  {/* Role */}
                  <h3 className="text-2xl font-bold text-white mt-2 mb-1 group-hover:text-indigo-300 transition-colors duration-300">
                    {exp.title}
                  </h3>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <Building size={16} className="text-slate-500" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative z-10 w-full h-[1px] bg-slate-800/60 mb-6" />

                {/* Responsibilities */}
                <ul className="relative z-10 space-y-3 mb-8">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-400 text-sm flex items-start gap-3 group-hover:text-slate-300 transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={slideInVariants}
          initial="hidden"
          whileInView="visible"
          className="text-center mt-24"
        >
          <motion.a
            href="#contact"
            className="glass px-10 py-4 rounded-2xl font-bold text-white hover:bg-indigo-600/20 transition-all duration-300 inline-flex items-center gap-3 group"
          >
            <Briefcase size={20} className="group-hover:rotate-12 transition-transform" />
            Discuss a Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
