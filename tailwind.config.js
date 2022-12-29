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
        "primary": "#130f11",
        "secondary": "#e9dfdd",
        "light-green": "#66c187",
        "light-red": "#f08937",
        "light-blue": "#87b3e0",
        "light-gray": "#5d5a60",
      },
    },
  },
  plugins: [],
}
