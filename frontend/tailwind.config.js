/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#5376e5",
        "mine-shaft": "#2e2e2e",
        "grayprop":   "#909090",
        "boulder": "#7b7b7b",
        "dove-gray": "#6c6c6c",
        "scorpion": "#606060",
        "cornflower": "#95bdeb",
        "emperor": "#545454",
        "tundora": "#4c4c4c",
      },
    },
  },
  plugins: [],
}

