/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#ff0000'
        },
        green: {
          DEFAULT: '#61d29557'
        }
      }
    }
  },
  plugins: []
};
