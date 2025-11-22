/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0083FF',
          dark: '#0067CC',
          light: '#4FB3FF',
          soft: '#E8F3FF',
        },
        optional: {
          DEFAULT: '#14B8A6',
          dark: '#0E8076',
          light: '#5EEAD4',
        },
      },
    },
  },
  plugins: [],
};
