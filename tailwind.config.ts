import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Custom colors from the design
        navy: '#1e3a8a',
        'blue-accent': '#5ba3f5',
        'purple-accent': '#8888ff',
        'dark-bg': '#000000',
        'gray-950': '#1a1a1a',
        'gray-900': '#2d2d2d',
        'gray-800': '#4a4a4a',
      },
    },
  },
  plugins: [],
};

export default config;
