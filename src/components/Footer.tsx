import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import MagneticButton from './ui/MagneticButton';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: GithubIcon,   href: 'https://github.com/BalaNerd',             label: 'GitHub',   ariaLabel: 'Visit GitHub Profile'  },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/s-balaraju/', label: 'LinkedIn', ariaLabel: 'Visit LinkedIn Profile' },
    { icon: Mail,         href: 'mailto:balaraju1805@gmail.com',            label: 'Email',    ariaLabel: 'Send Email'             },
  ];

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container-main">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Wordmark */}
          <motion.button
            onClick={scrollToTop}
            className="font-display font-800 text-text-secondary hover:text-indigo-600 transition-colors bg-transparent border-none cursor-pointer"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.14em' }}
            whileHover={{ scale: 1.02 }}
          >
            S. BALA RAJU
          </motion.button>

          {/* Copyright */}
          <p className="text-text-muted text-xs font-medium" style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
            © {new Date().getFullYear()} S. Bala Raju — Built with care &amp; kinetic precision
          </p>

          {/* Social + Back to top */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={14} />
              </motion.a>
            ))}

            <div className="w-px h-4 bg-slate-200 mx-1" />

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
              aria-label="Back to top"
              intensity={0.4}
            >
              <ArrowUp size={13} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
