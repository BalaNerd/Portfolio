import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, GitBranch as GitHub, LucideIcon } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { containerVariants, itemVariants } from '../utils/variants';

type ContactInfo = {
  icon: LucideIcon | IconType;
  label: string;
  value: string;
  href: string;
  ariaLabel: string;
};

type SocialLink = {
  icon: LucideIcon | IconType;
  label: string;
  href: string;
  color: string;
  ariaLabel: string;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Attempt to load from env, fallback to known keys if the environment loader fails
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_oqk6p0f';
      const contactTemplateId = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID || 'template_i3eciti';
      const autoReplyTemplateId = process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID || 'template_29kz28s';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'EaMDKrvlpD7yCRkQN';

      if (!process.env.REACT_APP_EMAILJS_SERVICE_ID) {
        console.warn("Warning: REACT_APP_EMAILJS_SERVICE_ID is undefined in process.env. Using fallback keys.");
      }

      if (!serviceId || !contactTemplateId || !autoReplyTemplateId || !publicKey) {
        console.error("EmailJS keys are totally missing.");
        throw new Error("Configuration error");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // FIRST: Send the notification to the portfolio owner
      await emailjs.send(
        serviceId,
        contactTemplateId,
        templateParams,
        publicKey
      );

      // SECOND: Send the auto-reply confirmation to the user
      await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        templateParams,
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'balaraju1805@gmail.com',
      href: 'mailto:balaraju1805@gmail.com',
      ariaLabel: 'Send Email'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'S Bala Raju',
      href: 'https://www.linkedin.com/in/s-balaraju/',
      ariaLabel: 'Visit LinkedIn Profile'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, India',
      href: 'https://maps.app.goo.gl/xw1CNdUpqq44SCLF9',
      ariaLabel: 'View Location on Map'
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: GitHub,
      label: 'GitHub',
      href: 'https://github.com/BalaNerd',
      color: 'hover:text-white',
      ariaLabel: 'Visit GitHub Profile'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/s-balaraju/',
      color: 'hover:text-[#0a66c2]',
      ariaLabel: 'Visit LinkedIn Profile'
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-slate-950/30">
      <div className="max-w-6xl mx-auto">
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
            <span className="text-sm font-medium text-blue-400">Contact</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Let's Connect</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Ready to bring your next big idea to life? Reach out and let's talk.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - 2 Columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon as React.ElementType;
                const isLink = info.href !== '#';
                const Wrapper = isLink ? motion.a : motion.div;
                
                return (
                  <Wrapper
                    key={index}
                    href={isLink ? info.href : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                    aria-label={info.ariaLabel}
                    className="flex items-center gap-6 p-6 glass rounded-2xl hover:border-indigo-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300 group cursor-pointer"
                    whileHover={{ x: 5, scale: 1.01 }}
                  >
                    <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600/20 transition-colors duration-300 shadow-inner">
                      <Icon size={24} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{info.label}</p>
                      <p className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors duration-300 break-all">
                        {info.value}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Availability Badge */}
            <motion.div 
              variants={itemVariants}
              className="p-8 glass rounded-[2rem] border-dashed border-indigo-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-200 font-bold tracking-tight">OPEN FOR COLLABORATION</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                I'm currently seeking opportunities to apply my skills in high-impact environments. 
                Whether it's a freelance project or a full-time role, I'm just a message away.
              </p>
              
              <div className="mt-8 flex gap-4">
                {socialLinks.map((social, index) => {
                  const SocialIcon = social.icon as React.ElementType;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className={`p-4 glass rounded-[1.25rem] text-slate-400 ${social.color} hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 shadow-lg`}
                      whileHover={{ y: -5, scale: 1.1 }}
                    >
                      <SocialIcon size={28} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - 3 Columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <motion.div variants={itemVariants} className="glass p-10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full -mr-16 -mt-16" />
              
              <h3 className="text-3xl font-bold text-white mb-8">Send a Quick Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300 resize-none"
                    placeholder="Tell me about your amazing project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full h-16 inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[center_right_1rem] rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <span>Message Sent</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-bold text-center"
                  >
                    Message sent successfully! I'll be in touch soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-center"
                  >
                    Failed to send message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
