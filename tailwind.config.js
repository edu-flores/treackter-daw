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
        "primary": "#5f6062",
        "secondary": "#555358",
        "light-green": "#84cc4c",
        "light-red": "#e5523c",
      },
    },
  },
  plugins: [],
}
