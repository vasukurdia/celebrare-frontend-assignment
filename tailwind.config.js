/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#F5F0E8',
        ink: '#1A1A2E',
        rose: '#E8506A',
        'rose-dark': '#C93D57',
        muted: '#8A8A9A',
      },
      gridTemplateColumns: {
        'gallery': 'repeat(4, minmax(0, 1fr))',
        'gallery-md': 'repeat(2, minmax(0, 1fr))',
        'gallery-sm': 'repeat(1, minmax(0, 1fr))',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulse: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        heartPop: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.4)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease forwards',
        pulse: 'pulse 1.5s ease-in-out infinite',
        heartPop: 'heartPop 0.3s ease',
      },
    },
  },
  plugins: [],
}