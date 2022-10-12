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
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
