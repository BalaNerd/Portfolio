/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Base surface colors — Light Aurora palette
        aurora: {
          bg:       '#fbfbfe',
          surface:  '#ffffff',
          card:     'rgba(255, 255, 255, 0.82)',
          border:   'rgba(15, 23, 42, 0.08)',
        },
        // Primary accent — electric indigo
        electric: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // primary light mode
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Secondary — cyan
        cyan: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        // Violet atmospheric
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // High contrast dark text
        text: {
          primary:   '#0e0f1a',
          secondary: '#475569',
          muted:     '#64748b',
          subtle:    '#94a3b8',
          accent:    '#4f46e5',
        },
        // Compatibility keys
        border:     'rgba(15, 23, 42, 0.08)',
        input:      '#ffffff',
        ring:       '#6366f1',
        background: '#fbfbfe',
        foreground: '#0e0f1a',
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#7c3aed',
          foreground: '#ffffff',
          blue:  '#4f46e5',
          violet:'#7c3aed',
          cyan:  '#0284c7',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(135deg, #0e0f1a 0%, #3730a3 40%, #7c3aed 100%)',
        'gradient-electric': 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #0284c7 100%)',
        'gradient-subtle':   'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)',
      },
      boxShadow: {
        'aurora':    '0 0 40px rgba(99,102,241,0.12), 0 0 80px rgba(139,92,246,0.06)',
        'card':      '0 1px 3px rgba(0,0,0,0.02), 0 10px 28px -6px rgba(15,23,42,0.04)',
        'card-hover':'0 4px 16px rgba(0,0,0,0.03), 0 20px 40px -10px rgba(99,102,241,0.14)',
        'glow-sm':   '0 0 20px rgba(99,102,241,0.2)',
        'glow':      '0 0 40px rgba(99,102,241,0.25)',
        'btn':       '0 2px 8px -1px rgba(79,70,229,0.35), 0 8px 20px -4px rgba(79,70,229,0.2)',
      },
      animation: {
        'aurora-drift': 'aurora-drift 24s ease-in-out infinite alternate',
        'aurora-slow':  'aurora-drift 32s ease-in-out infinite alternate-reverse',
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite reverse',
        'spin-slow':    'spin 20s linear infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'draw-line':    'draw-line 1.2s ease-out forwards',
        'shimmer':      'shimmer 4s linear infinite',
      },
      keyframes: {
        'aurora-drift': {
          '0%':   { transform: 'translate(0%, 0%) scale(1)' },
          '33%':  { transform: 'translate(3%, -4%) scale(1.03)' },
          '66%':  { transform: 'translate(-3%, 3%) scale(0.97)' },
          '100%': { transform: 'translate(2%, -2%) scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'draw-line': {
          from: { 'stroke-dashoffset': '1' },
          to:   { 'stroke-dashoffset': '0' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};