/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'regal-white': '#fff',
        'blue1': 'blue',
        'red': 'red',
        'light-card': '#F7F7F7'
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
