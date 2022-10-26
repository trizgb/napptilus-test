/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/App.{js,ts,jsx,tsx}',
    './src/routes/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Audiowide', 'cursive'],
        secondary: ['Bebas Neue', 'cursive'],
      },
      gridTemplateColumns: {
        'auto-fill-256': 'repeat(auto-fill, minmax(256px, 1fr))',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
