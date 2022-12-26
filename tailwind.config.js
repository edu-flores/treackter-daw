/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    letterSpacing: {
      widest: ".25em",
    },
    extend: {
      colors: {
        "primary": "#31393c",
        "secondary": "#5c6b70",
        "light-green": "#84cc4c",
        "light-red": "#e5523c",
        "light-gray": "#858585",
      },
    },
  },
  plugins: [],
}
