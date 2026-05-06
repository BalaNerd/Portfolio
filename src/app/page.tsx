'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, 
  ArrowDown, Mail, 
  Code, Briefcase, Award, User, Send,
  ExternalLink, Star, TrendingUp, Zap, Sparkles,
  Phone, MapPin
} from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleClick = () => {
      setClickEffect(true);
      setTimeout(() => setClickEffect(false), 300);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: clickEffect ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </>
  );
};

// Magnetic Button Component
const MagneticButton = ({ 
  children, 
  onClick, 
  className = '', 
  intensity = 0.3 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  intensity?: number;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    
    if (distance < maxDistance) {
      const strength = (1 - distance / maxDistance) * intensity;
      setPosition({
        x: mouseX * strength,
        y: mouseY * strength,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={`magnetic-button interactive ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.button>
  );
};

// 3D Tilt Card Component
const TiltCard = ({ 
  children, 
  className = '', 
  intensity = 15 
}: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: number;
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    setRotate({
      x: mouseY * intensity,
      y: -mouseX * intensity,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));

    const timeoutId = setTimeout(() => {
      setParticles(newParticles);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-accent-blue/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Main Portfolio Component
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden relative">
      <CustomCursor />
      <FloatingParticles />
      
      {/* Morphing Background */}
      <div className="morph-bg" />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              JD
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeSection === item.id 
                        ? 'bg-accent-blue/20 text-accent-blue' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Mobile Menu Toggle */}
            <MagneticButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MagneticButton>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden glass-dark border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                        activeSection === item.id 
                          ? 'bg-accent-blue/20 text-accent-blue' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <TiltCard intensity={10}>
              <div className="glass-dark p-12 rounded-3xl border-animated">
                <motion.h1 
                  className="text-6xl md:text-8xl font-black mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">S Bala</span>{' '}
                  <span className="gradient-text">Raju</span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Computer Science Student & Full Stack Developer
                </motion.h2>
                
                <motion.p 
                  className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  "I don't just write code — I design solutions."
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <MagneticButton
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl font-semibold glow-blue hover-lift"
                  >
                    <Code size={20} className="mr-2" />
                    View Projects
                  </MagneticButton>
                  <MagneticButton
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 glass text-white rounded-xl font-semibold border border-white/20 hover-lift"
                  >
                    <Send size={20} className="mr-2" />
                    Get In Touch
                  </MagneticButton>
                </motion.div>
                
                <motion.div 
                  className="flex justify-center space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[
                    { icon: Code, href: 'https://github.com/BalaNerd', label: 'GitHub' },
                    { icon: Mail, href: 'mailto:balaraju1805@gmail.com', label: 'Email' },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent-blue transition-colors interactive"
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: 5,
                          textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={24} />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MagneticButton
            onClick={() => scrollToSection('about')}
            className="p-3 glass-dark rounded-full glow-purple pulse-glow"
          >
            <ArrowDown size={24} />
          </MagneticButton>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <TiltCard>
              <div className="glass-dark p-12 rounded-3xl">
                <motion.h2 
                  className="text-4xl font-bold gradient-text mb-8 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="glass p-6 rounded-2xl mb-6 hover-lift">
                      <h3 className="text-xl font-semibold mb-4 text-accent-blue">🎓 Education</h3>
                      <p className="text-gray-300 leading-relaxed">
                        <strong>Computer Science Undergraduate</strong> specializing in Big Data Analytics 
                        with a strong focus on building scalable, real-world applications and data-driven systems. 
                        I enjoy combining analytical thinking with modern web development to create impactful 
                        and production-ready solutions.
                      </p>
                    </div>
                    
                    <div className="glass p-6 rounded-2xl mb-6 hover-lift">
                      <h3 className="text-xl font-semibold mb-4 text-accent-purple">💼 Professional Experience</h3>
                      <p className="text-gray-300 leading-relaxed">
                        <strong>Data Analytics Intern</strong> at Zidio Development, where I gained 
                        practical exposure to data analysis and real-world problem-solving. Developed production-ready 
                        applications including SpendWise (FinTech SaaS platform) and CanteenConnect 
                        (real-time canteen management system).
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="glass p-6 rounded-2xl mb-6 hover-lift">
                      <h3 className="text-xl font-semibold mb-4 text-accent-pink">🚀 Technical Focus</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Hands-on experience developing full-stack applications using React, Next.js, 
                        Node.js, and PostgreSQL. From designing RESTful APIs and implementing secure authentication 
                        to handling real-time data workflows, I focus on building systems that are both 
                        efficient and user-centric.
                      </p>
                    </div>
                    
                    <div className="glass p-6 rounded-2xl mb-6 hover-lift">
                      <h3 className="text-xl font-semibold mb-4 text-accent-cyan">📊 Data & ML Interests</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Deeply interested in data analytics and machine learning, with experience in Python, 
                        Pandas, and visualization techniques. Continuously exploring new technologies and striving 
                        to build solutions that transform data into meaningful insights and impactful user experiences.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Technical Skills</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive expertise across modern web technologies and data analytics
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                category: 'Languages',
                icon: '💻',
                skills: [
                  { name: 'Java', level: 85 },
                  { name: 'Python', level: 90 },
                  { name: 'JavaScript', level: 88 },
                ],
                color: 'accent-blue',
              },
              {
                category: 'Frameworks & Libraries',
                icon: '🛠️',
                skills: [
                  { name: 'Django', level: 85 },
                  { name: 'Flask', level: 75 },
                  { name: 'React', level: 88 },
                ],
                color: 'accent-purple',
              },
              {
                category: 'Databases',
                icon: '�️',
                skills: [
                  { name: 'MySQL', level: 82 },
                  { name: 'MongoDB', level: 78 },
                ],
                color: 'accent-pink',
              },
              {
                category: 'Tools',
                icon: '🔧',
                skills: [
                  { name: 'Git', level: 90 },
                  { name: 'GitHub', level: 95 },
                  { name: 'VS Code', level: 95 },
                ],
                color: 'accent-cyan',
              },
            ].map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <TiltCard>
                  <div className="glass-dark p-8 rounded-3xl">
                    <div className="text-4xl mb-6 text-center">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className="flex items-center justify-between p-3 glass rounded-lg hover-lift"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-gray-300">{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-400">{skill.level}%</div>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < Math.floor(skill.level / 20) ? `bg-${category.color}` : 'bg-gray-600'
                                  }`}
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    delay: categoryIndex * 0.2 + skillIndex * 0.1 + i * 0.05 
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Showcasing my best work with innovative solutions and cutting-edge technologies
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Weather Analysis Dashboard',
                description: 'Interactive weather data visualization platform with real-time updates and predictive analytics using machine learning models.',
                tech: ['Python', 'Pandas', 'Matplotlib', 'Machine Learning'],
                icon: '🌤️',
                featured: true,
              },
              {
                title: 'Movie Genre Prediction',
                description: 'ML-powered movie genre classification system using NLP and deep learning techniques with 85% accuracy.',
                tech: ['Python', 'TensorFlow', 'NLTK', 'Scikit-learn'],
                icon: '�',
                featured: true,
              },
              {
                title: 'Task Scheduler Application',
                description: 'Efficient task scheduling system built with C for backend algorithms and React for the web interface.',
                tech: ['C', 'React', 'Node.js', 'Algorithms'],
                icon: '📅',
                featured: false,
              },
              {
                title: 'E-commerce Platform',
                description: 'Full-stack Django e-commerce solution with user authentication, payment integration, and admin dashboard.',
                tech: ['Django', 'PostgreSQL', 'React', 'Stripe'],
                icon: '�',
                featured: false,
              },
              {
                title: 'Data Analytics Dashboard',
                description: 'Comprehensive analytics dashboard for business intelligence with interactive charts and real-time data processing.',
                tech: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
                icon: '📊',
                featured: false,
              },
              {
                title: 'ML Model Deployment Pipeline',
                description: 'Automated CI/CD pipeline for deploying machine learning models with monitoring and version control.',
                tech: ['Python', 'Docker', 'Kubernetes', 'Jenkins'],
                icon: '🚀',
                featured: true,
              },
              {
                title: 'Portfolio Website',
                description: 'Personal portfolio with advanced animations and interactions showcasing technical skills.',
                tech: ['Next.js', 'Framer Motion', 'Tailwind', 'TypeScript'],
                icon: '🎨',
                featured: true,
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard intensity={15}>
                  <div className="glass-dark p-8 rounded-3xl h-full hover-lift group">
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 right-4 z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <span className="px-3 py-1 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold rounded-full flex items-center">
                          <Star size={12} className="mr-1" />
                          Featured
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="text-6xl mb-4 text-center">{project.icon}</div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/20 hover:bg-accent-blue/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <MagneticButton
                        className="flex-1 px-4 py-2 glass text-white rounded-lg border border-white/20 text-sm"
                      >
                        <Code size={16} className="mr-2" />
                        Code
                      </MagneticButton>
                      <MagneticButton
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg text-sm"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Experience</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: 'Data Analytics Intern',
                company: 'Aditya Birla Group',
                location: 'Mumbai, India',
                period: 'June 2023 - August 2023',
                description: 'Developed automated data pipelines using Python and SQL to process and analyze large datasets. Created interactive dashboards and visualizations using Tableau and Power BI. Collaborated with cross-functional teams to identify business insights and trends.',
                achievements: [
                  'Improved data processing efficiency by 40% through automation and optimization',
                  'Created interactive dashboards that reduced reporting time by 60%',
                  'Collaborated with cross-functional teams to identify business insights and trends'
                ],
                type: 'internship',
                icon: '📊'
              },
              {
                title: 'Machine Learning Research Assistant',
                company: 'University Research Lab',
                location: 'Chennai, India',
                period: 'January 2023 - May 2023',
                description: 'Researched and implemented machine learning algorithms for predictive modeling. Developed classification models with 85% accuracy for movie genre prediction. Published research paper on feature engineering techniques and mentored junior students in ML concepts.',
                achievements: [
                  'Developed classification models with 85% accuracy for movie genre prediction',
                  'Published research paper on feature engineering techniques',
                  'Mentored junior students in ML concepts and programming'
                ],
                type: 'research',
                icon: '🤖'
              },
              {
                title: 'Web Development Freelancer',
                company: 'Self-Employed',
                location: 'Remote',
                period: '2022 - Present',
                description: 'Designed and developed responsive web applications for various clients. Implemented full-stack solutions using React.js and Django. Created RESTful APIs and integrated third-party services. Provided ongoing maintenance and optimization for client websites.',
                achievements: [
                  'Designed and developed 10+ responsive web applications',
                  'Implemented full-stack solutions using React.js and Django',
                  'Created RESTful APIs with proper authentication and security',
                  'Provided ongoing maintenance and optimization for client websites'
                ],
                type: 'freelance',
                icon: '💻'
              }
            ].map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <TiltCard>
                  <div className="glass-dark p-8 rounded-3xl hover-lift">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl mb-4">{experience.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
                            <div className="text-sm text-gray-400">{experience.company}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-accent-blue">{experience.period}</div>
                            <div className="text-xs text-gray-500">{experience.location}</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {experience.description}
                        </p>
                        
                        <div className="space-y-2">
                          {experience.achievements.map((achievement, achIndex) => (
                            <motion.div
                              key={achIndex}
                              className="flex items-center space-x-3 p-3 glass rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + achIndex * 0.1 }}
                            >
                                <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                                <span className="text-gray-300 text-sm">{achievement}</span>
                              </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <TiltCard>
              <div className="glass-dark p-12 rounded-3xl">
                <motion.h2 
                  className="text-4xl font-bold gradient-text mb-8 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Get In Touch
                </motion.h2>
                
                <motion.p 
                  className="text-gray-400 text-center mb-12 text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Have a project in mind or want to collaborate? I would love to hear from you!
                </motion.p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="space-y-6">
                      <div className="glass p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-4 text-accent-blue flex items-center">
                          <Mail size={20} className="mr-2" />
                          Email
                        </h3>
                        <p className="text-gray-300">balaraju1805@gmail.com</p>
                      </div>
                      
                      <div className="glass p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-4 text-accent-purple flex items-center">
                          <Phone size={20} className="mr-2" />
                          Phone
                        </h3>
                        <p className="text-gray-300">+91 98765 43210</p>
                      </div>
                      
                      <div className="glass p-6 rounded-2xl hover-lift">
                        <h3 className="text-xl font-semibold mb-4 text-accent-pink flex items-center">
                          <MapPin size={20} className="mr-2" />
                          Location
                        </h3>
                        <p className="text-gray-300">Chennai, India</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <form className="space-y-6">
                      <div className="glass p-6 rounded-2xl">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-accent-blue focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="glass p-6 rounded-2xl">
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-accent-blue focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="glass p-6 rounded-2xl">
                        <textarea
                          placeholder="Your Message"
                          rows={5}
                          className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-accent-blue focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      
                      <MagneticButton
                        className="w-full px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl font-semibold glow-blue hover-lift"
                      >
                        <Send size={20} className="mr-2" />
                        Send Message
                      </MagneticButton>
                    </form>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">
              © 2024 S Bala Raju. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Computer Science Student | Software Engineer | Data Analytics Specialist
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
