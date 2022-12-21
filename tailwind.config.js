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
        "primary": "#555358",
        "secondary": "#5f6062",
        "light-green": "#84cc4c",
        "light-red": "#e5523c",
      },
    },
  },
  plugins: [],
}
