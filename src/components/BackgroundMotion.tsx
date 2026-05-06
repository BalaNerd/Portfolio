import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundMotion = () => {
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    // Generate premium cosmic dust particles
    const generateParticles = (count: number) => {
      return Array.from({ length: count }, (_, i) => {
        // Randomize premium colors (indigo, purple, blue, soft white)
        const colors = ['bg-indigo-400', 'bg-purple-400', 'bg-blue-400', 'bg-white'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
          id: i,
          x: Math.random() * 100, // Initial viewport %
          y: Math.random() * 100, // Initial viewport %
          size: Math.random() * 2.5 + 1, // 1px to 3.5px for crisp dots
          color,
          duration: Math.random() * 20 + 20, // 20s to 40s slow drift
          // Start and end drift offsets
          startX: (Math.random() - 0.5) * 100,
          endX: (Math.random() - 0.5) * 100,
          startY: (Math.random() - 0.5) * 100,
          endY: (Math.random() - 0.5) * 100,
          baseOpacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 ALWAYS visible
        };
      });
    };

    const handleResize = () => {
      const count = window.innerWidth < 768 ? 15 : 75; // Less particles on mobile
      setParticles(generateParticles(count));
    };

    handleResize(); // Initial generation
    
    // Optional: could add resize listener, but generating once on load is safer for performance
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Background Gradient Globs - Highly subtle so they don't wash out UI */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[60px] md:blur-[120px] will-change-transform"
        style={{ transform: 'translateZ(0)' }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[60px] md:blur-[120px] will-change-transform"
        style={{ transform: 'translateZ(0)' }}
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid Overlay - Premium structure */}
      <motion.div 
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: "url('/grid.svg')",
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 25, // Slower, more cinematic grid pan
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Continuous Cosmic Dust Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          initial={{
            x: particle.startX,
            y: particle.startY,
            opacity: particle.baseOpacity,
          }}
          animate={{
            x: [particle.startX, particle.endX, particle.startX],
            y: [particle.startY, particle.endY, particle.startY],
            // Gentle pulse, never hitting 0
            opacity: [particle.baseOpacity, particle.baseOpacity + 0.3, particle.baseOpacity], 
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

export default BackgroundMotion;
