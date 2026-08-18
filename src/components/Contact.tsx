import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import VariableProximity from './ui/VariableProximity';
import MagneticButton from './ui/MagneticButton';
import BlurReveal from './ui/BlurReveal';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'balaraju1805@gmail.com',
    href: 'mailto:balaraju1805@gmail.com',
    ariaLabel: 'Send Email',
    color: '#4f46e5',
    bgColor: 'rgba(79, 70, 229, 0.08)',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'S Bala Raju',
    href: 'https://www.linkedin.com/in/s-balaraju/',
    ariaLabel: 'Visit LinkedIn Profile',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.08)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chennai, India',
    href: 'https://maps.app.goo.gl/xw1CNdUpqq44SCLF9',
    ariaLabel: 'View Location on Map',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.08)',
  },
];

const socialLinks = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/BalaNerd',                color: '#0e0f1a' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/s-balaraju/',    color: '#0284c7' },
  { icon: Mail,         label: 'Email',    href: 'mailto:balaraju1805@gmail.com',               color: '#4f46e5' },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // EmailJS logic — fully preserved from original implementation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const serviceId            = process.env.REACT_APP_EMAILJS_SERVICE_ID            || 'service_oqk6p0f';
      const contactTemplateId    = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID    || 'template_i3eciti';
      const autoReplyTemplateId  = process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID || 'template_29kz28s';
      const publicKey            = process.env.REACT_APP_EMAILJS_PUBLIC_KEY             || 'EaMDKrvlpD7yCRkQN';

      if (!process.env.REACT_APP_EMAILJS_SERVICE_ID) {
        console.warn('Warning: REACT_APP_EMAILJS_SERVICE_ID is undefined in process.env. Using fallback keys.');
      }
      if (!serviceId || !contactTemplateId || !autoReplyTemplateId || !publicKey) {
        console.error('EmailJS keys are totally missing.');
        throw new Error('Configuration error');
      }

      const templateParams = {
        from_name:  formData.name,
        from_email: formData.email,
        subject:    formData.subject,
        message:    formData.message,
      };

      await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey);
      await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <div className="section-divider mb-16" />
      <div className="container-main pt-0">

        {/* Section label */}
        <BlurReveal delay={0} className="mb-6">
          <span className="section-label text-indigo-600">05 — Contact</span>
        </BlurReveal>

        {/* Kinetic heading with Variable Proximity */}
        <div className="mb-20">
          <h2
            className="overflow-visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 7vw, 5.75rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
            }}
          >
            <div className="block leading-none">
              <VariableProximity
                label="LET'S BUILD"
                className="text-text-primary"
                initialDelay={0.15}
                radius={200}
                maxShiftX={10}
                maxShiftY={12}
                maxScale={0.1}
              />
            </div>
            <div className="block leading-none mt-1 sm:mt-2">
              <VariableProximity
                label="SOMETHING"
                className="gradient-text"
                gradient={true}
                initialDelay={0.3}
                radius={200}
                maxShiftX={10}
                maxShiftY={12}
                maxScale={0.1}
              />
            </div>
            <div className="block leading-none mt-1 sm:mt-2">
              <VariableProximity
                label="GREAT."
                className="text-text-primary"
                initialDelay={0.45}
                radius={200}
                maxShiftX={10}
                maxShiftY={12}
                maxScale={0.1}
              />
            </div>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">

          {/* Left — contact info */}
          <BlurReveal delay={0.2} direction="left">
            <div className="space-y-8">
              <p className="text-text-secondary leading-relaxed font-normal" style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.75 }}>
                Have a project in mind? Want to collaborate on something interesting?
                Or just want to say hello — my inbox is always open.
              </p>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('mailto') || item.href.startsWith('https://maps') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm group transition-all"
                      whileHover={{
                        borderColor: `${item.color}50`,
                        backgroundColor: '#ffffff',
                        x: 4,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                        style={{ background: item.bgColor, borderColor: `${item.color}25` }}
                      >
                        <Icon size={16} style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted section-label mb-0.5 font-bold">{item.label}</p>
                        <p className="text-text-primary text-sm font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{item.value}</p>
                      </div>
                      <ArrowUpRight size={15} className="ml-auto text-text-muted group-hover:text-indigo-600 transition-colors" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Social links */}
              <div>
                <p className="section-label mb-4 text-indigo-600">Connect</p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <MagneticButton
                        key={link.label}
                        as="a"
                        href={link.href}
                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-text-secondary hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
                      >
                        <Icon size={17} />
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>
            </div>
          </BlurReveal>

          {/* Right — contact form */}
          <BlurReveal delay={0.3} direction="right">
            <div className="p-7 rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="form-input"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="form-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={5}
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit button — stable layout container prevents mobile drift */}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center"
                    id="contact-submit"
                    aria-label="Send message"
                    intensity={0.2}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isSubmitting ? (
                        <motion.span
                          key="loading"
                          className="flex items-center gap-2 justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.span
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          className="flex items-center gap-2 justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Send size={15} /> Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </MagneticButton>
                </div>

                {/* Status messages */}
                <AnimatePresence>
                  {submitStatus !== 'idle' && (
                    <motion.div
                      className="flex items-center gap-2.5 p-4 rounded-xl text-sm font-medium"
                      style={{
                        background: submitStatus === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                        border: `1px solid ${submitStatus === 'success' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                        color: submitStatus === 'success' ? '#059669' : '#dc2626',
                      }}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                    >
                      {submitStatus === 'success' ? (
                        <><CheckCircle2 size={16} /> Message sent! I&apos;ll get back to you soon.</>
                      ) : (
                        <><AlertCircle size={16} /> Something went wrong. Please try again or email me directly.</>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
