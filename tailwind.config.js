// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jura', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: {
          background: 'transparent',
          card: '#1a1a1a',
          border: '#2a2a2a',
          text: '#fff',
          muted: '#888',
        },
      },
    }
  },
  plugins: [],
};
