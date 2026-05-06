import React from 'react';
import { motion } from 'framer-motion';
import {GitBranch as GitHub, Mail, ArrowUp, LucideIcon } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';

type SocialLink = {
  icon: LucideIcon | IconType;
  href: string;
  label: string;
  ariaLabel: string;
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks: SocialLink[] = [
    {
      icon: GitHub,
      href: 'https://github.com/BalaNerd',
      label: 'GitHub',
      ariaLabel: 'Visit GitHub Profile',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/s-balaraju/',
      label: 'LinkedIn',
      ariaLabel: 'Visit LinkedIn Profile',
    },
    {
      icon: Mail,
      href: 'mailto:balaraju1805@gmail.com',
      label: 'Email',
      ariaLabel: 'Send Email',
    },
  ];

  return (
    <footer className="relative py-12 px-4 border-t border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">S Bala Raju</h3>
            <p className="text-gray-400 text-sm">
              Software Engineer & Data Analyst
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Building innovative solutions with code and data.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon as React.ElementType;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} Bala Nerd. All rights reserved.
            </p>
            

            <motion.button
              onClick={scrollToTop}
              className="glass p-3 rounded-full text-gray-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
