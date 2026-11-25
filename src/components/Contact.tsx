import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight, Copy, Check } from 'lucide-react';
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
    value: 'Kanyakumari, Tamil Nadu, India',
    href: 'https://maps.google.com/?q=Kanyakumari,Tamil+Nadu,India',
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

interface IntentPreset {
  id: string;
  label: string;
  subject: string;
  message: string;
}

const INTENT_PRESETS: IntentPreset[] = [
  {
    id: 'role',
    label: 'Full-Stack / AI Role',
    subject: 'Engineering Opportunity: Full-Stack / AI Role',
    message:
      'Hi Bala,\n\nI reviewed your portfolio and engineering work on DevMetrics and CanteenConnect. We have an opportunity on our team and would love to connect with you regarding your background and technical skills.\n\nBest regards,\n',
  },
  {
    id: 'collab',
    label: 'Project Collaboration',
    subject: 'Project Collaboration & Engineering Discussion',
    message:
      'Hi Bala,\n\nI was impressed by your telemetry dashboards and real-time PWA architecture. I am building a project and would like to explore collaborating or exchanging technical insights.\n\nBest regards,\n',
  },
  {
    id: 'inquiry',
    label: 'General Inquiry',
    subject: 'General Inquiry / Connecting via Portfolio',
    message:
      'Hi Bala,\n\nReaching out through your portfolio to connect and discuss your software engineering work.\n\nBest regards,\n',
  },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('balaraju1805@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSelectIntent = (preset: IntentPreset) => {
    if (selectedIntent === preset.id) {
      setSelectedIntent(null);
    } else {
      setSelectedIntent(preset.id);
      setFormData((prev) => ({
        ...prev,
        subject: preset.subject,
        message: preset.message,
      }));
    }
  };

  const dynamicMailto = `mailto:balaraju1805@gmail.com?subject=${encodeURIComponent(
    formData.subject || 'Hello from Portfolio'
  )}&body=${encodeURIComponent(formData.message || '')}`;

  const handleCopyDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    const draftText = `Subject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

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
                      {item.label === 'Email' ? (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="relative overflow-hidden ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-all cursor-pointer shadow-2xs z-10"
                          style={{
                            background: copiedEmail ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.04)',
                            borderColor: copiedEmail ? 'rgba(16, 185, 129, 0.3)' : 'rgba(15, 23, 42, 0.1)',
                            color: copiedEmail ? '#059669' : '#475569',
                          }}
                          aria-label="Copy email address"
                          title="Click to copy email address"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {copiedEmail ? (
                              <motion.span
                                key="copied"
                                className="flex items-center gap-1"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check size={12} className="text-emerald-600" />
                                <span>Copied to clipboard ✓</span>
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                className="flex items-center gap-1"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Copy size={12} />
                                <span>Copy</span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {copiedEmail && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2, ease: 'linear' }}
                            />
                          )}
                        </button>
                      ) : (
                        <ArrowUpRight size={15} className="ml-auto text-text-muted group-hover:text-indigo-600 transition-colors" />
                      )}
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
              {/* Quick Intent Presets Builder */}
              <div className="mb-5 pb-5 border-b border-slate-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                    Quick Intent Presets
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">Click to autofill draft</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {INTENT_PRESETS.map((preset) => {
                    const isActive = selectedIntent === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectIntent(preset)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

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

                {/* Secondary Quick Actions: Open in Mail Client or Copy Draft */}
                <div className="flex items-center justify-between pt-1 text-[11.5px] font-mono text-slate-500">
                  <a
                    href={dynamicMailto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Draft Message</span>
                      </>
                    )}
                  </button>
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
