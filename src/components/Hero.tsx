import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, GitBranch as GitHub, ExternalLink, Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { containerVariants, itemVariants } from '../utils/variants';

const LinkedinIcon = FaLinkedin as React.ElementType;

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = useMemo(() => [
    'Software Engineer',
    'Full Stack Developer',
    'Data Analyst',
    'Machine Learning Enthusiast',
  ], []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 120);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="floating-blob w-[500px] h-[500px] bg-blue-600 top-[-10%] left-[-10%] blur-[120px]" />
        <div className="floating-blob w-[500px] h-[500px] bg-purple-600 bottom-[-10%] right-[-10%] blur-[120px]" style={{ animationDelay: '2s' }} />
        <div className="floating-blob w-[400px] h-[400px] bg-indigo-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[120px]" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block px-4 py-1.5 mb-6 glass rounded-full"
        >
          <span className="text-sm font-medium text-blue-400">Available for Opportunities</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
        >
          <span className="block text-white opacity-90">Hi, I'm</span>
          <span className="gradient-text drop-shadow-2xl">S Bala Raju</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-10 h-12"
        >
          <span className="text-slate-300">I'm a </span>
          <span className="gradient-text">{text}</span>
          <span className="text-blue-500 animate-pulse ml-1">|</span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Computer Science student specializing in building high-performance 
          web applications and data-driven solutions. Turning complex logic into 
          seamless user experiences.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="https://drive.google.com/file/d/1qNZHPkj3VvLY_dGBbZPz-wRfxEyIIMc2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[center_right_1rem] rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Download Resume</span>
            <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 glass rounded-xl border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Projects</span>
            <ExternalLink size={20} className="ml-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </motion.a>

          <div className="flex gap-4">
            <motion.a
              href="https://github.com/BalaNerd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
              className="glass p-3 rounded-xl text-slate-400 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHub size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/s-balaraju/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
              className="glass p-3 rounded-xl text-slate-400 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedinIcon size={24} />
            </motion.a>
            <motion.a
              href="mailto:balaraju1805@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send Email"
              className="glass p-3 rounded-xl text-slate-400 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-[-10vh] left-1/2 transform -translate-x-1/2 lg:block hidden"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a
            href="#about"
            className="text-slate-500 hover:text-white transition-colors duration-200"
            aria-label="Scroll down"
          >
            <ArrowDown size={32} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
