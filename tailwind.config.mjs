/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ini baris paling penting!
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#F4F1EA',
        'ink': '#111111',
        'ink-light': '#444444',
        'accent': '#8b0000',
      },
      fontFamily: {
        'masthead': ['var(--font-unifraktur)'],
        'headline': ['var(--font-playfair)'],
        'body': ['var(--font-frank)'],
        'sans': ['var(--font-lato)'],
      },
      backgroundImage: {
        'paper-pattern': "url('/paper-texture.png')",
      }
    },
  },
  plugins: [],
};