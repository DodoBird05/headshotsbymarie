module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { 
    extend: {
      colors: {
        'warm-white': '#FEFDF8',
        'text-black': '#1C1C1C',
        'dark': '#0f0e0d',
        'accent-gold': '#DFBC49',
        'accent': '#DFBC49',
        gold: {
          50: '#fefbf0',
          100: '#fdf6dc',
          200: '#fbecb8',
          300: '#f7de8a',
          400: '#f2cd5c',
          500: '#DFBC49',
          600: '#c9a33b',
          700: '#a68430',
          800: '#86692a',
          900: '#6d5525',
          950: '#3d2f14',
        }
      },
      fontFamily: {
        'title': ['Majesti Banner', 'serif'],
        'body': ['Hanken Grotesk', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'letter-reveal': 'letter-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-scale': 'fade-in-scale 1s ease-out forwards',
        'pop-left': 'pop-left 0.8s ease-out forwards',
        'pop-right': 'pop-right 0.8s ease-out forwards',
        'pop-up': 'pop-up 0.6s ease-out forwards',
        'slide-up-push': 'slide-up-push 1.2s ease-out forwards',
      },
      rotate: {
        '15': '15deg',
      },
      backgroundImage: {
        'noise': "url('https://www.reactbits.dev/assets/noise.png')",
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)'
          },
          '50%': {
            transform: 'translateY(-20px) rotate(3deg)'
          }
        },
        'float-delayed': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)'
          },
          '50%': {
            transform: 'translateY(-15px) rotate(-2deg)'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)'
          }
        },
        'letter-reveal': {
          '0%': {
            opacity: '0.2',
            transform: 'translateY(20px) scale(0.8)',
            color: '#E5E5E5'
          },
          '50%': {
            opacity: '0.7',
            transform: 'translateY(-5px) scale(1.05)',
            color: '#888888'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px) scale(1)',
            color: '#1C1C1C'
          }
        },
        'fade-in-scale': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'pop-left': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) translateX(-50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateX(0)'
          }
        },
        'pop-right': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) translateX(50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateX(0)'
          }
        },
        'pop-up': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.7) translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        },
        'slide-up-push': {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    } 
  },
  plugins: [],
}