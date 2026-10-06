/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        turtle: {
          50: '#F2F8F6',
          100: '#E1EFEA',
          200: '#C2DFD6',
          300: '#96C8BA',
          400: '#64AB97',
          500: '#3D8C78',
          600: '#2C6E5E',
          700: '#23574B',
          800: '#1C443A',
          900: '#15342D',
          950: '#0C1F1B',
        },
        sand: {
          50: '#FDFCFA',
          100: '#F8F6F0',
          200: '#EFECE0',
          300: '#E2DDCB',
          400: '#C9C0A7',
          500: '#AC9F82',
          600: '#8A7D63',
          700: '#6C604B',
          800: '#524939',
          900: '#3D362B',
        },
        accent: {
          DEFAULT: '#D97706',
          dark: '#B45309',
          light: '#FDE68A',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
