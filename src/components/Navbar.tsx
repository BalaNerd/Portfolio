import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, GitBranch as GitHub, Mail, LucideIcon } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useScroll } from '../hooks/useScroll';

type SocialLink = {
  icon: LucideIcon | IconType;
  href: string;
  label: string;
  ariaLabel: string;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollY > 20);
  }, [scrollY]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks: SocialLink[] = [
    { icon: GitHub as LucideIcon, href: 'https://github.com/BalaNerd', label: 'GitHub', ariaLabel: 'Visit GitHub Profile' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/s-balaraju/', label: 'LinkedIn', ariaLabel: 'Visit LinkedIn Profile' },
    { icon: Mail, href: 'mailto:balaraju1805@gmail.com', label: 'Email', ariaLabel: 'Send Email' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 pt-4`}
    >
      <div className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-2xl py-2 px-6'
          : 'bg-transparent py-4 px-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <span className="text-xl font-black text-white">B</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tighter hidden sm:block">S Bala Raju</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white transition-all rounded-xl hover:bg-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Tools */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon as React.ElementType;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="p-2.5 glass rounded-xl text-slate-400 hover:text-white transition-all duration-300 border-slate-800/50"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>

            <motion.a
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk
            </motion.a>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 glass border-slate-800/50 flex items-center justify-center rounded-xl text-slate-400 hover:text-white transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto', marginTop: '1rem' },
            closed: { opacity: 0, height: 0, marginTop: '0rem' },
          }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-6 space-y-2 border-t border-slate-800/50">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-indigo-600/10 text-base font-bold transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between px-4">
               <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const LinkIcon = link.icon as React.ElementType;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="p-3 glass rounded-xl text-slate-400 hover:text-white transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                    >
                      <LinkIcon size={18} />
                    </a>
                  );
                })}
              </div>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
