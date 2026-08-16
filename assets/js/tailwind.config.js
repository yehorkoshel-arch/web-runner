tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              dark: '#07090e',
              card: '#0e131f',
              blue: '#00d2ff',
              navy: '#0057b7', // Ukrainian Blue
              yellow: '#ffd700', // Ukrainian Gold
              amber: '#ffaa00',
              neon: '#00f2fe',
              accent: '#ff2a5f'
            }
          },
          fontFamily: {
            gaming: ['Orbitron', 'sans-serif'],
            sans: ['Outfit', 'sans-serif']
          },
          boxShadow: {
            'glow-blue': '0 0 35px -5px rgba(0, 210, 255, 0.45)',
            'glow-yellow': '0 0 35px -5px rgba(255, 215, 0, 0.45)',
            'glow-accent': '0 0 30px -5px rgba(255, 42, 95, 0.4)'
          },
          animation: {
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'float': 'float 6s ease-in-out infinite',
            'grid-scroll': 'gridMove 20s linear infinite'
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-12px)' }
            },
            gridMove: {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '0 40px' }
            }
          }
        }
      }
    }

