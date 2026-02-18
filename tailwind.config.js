/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d4b996',
        'background-light': '#fafaf9',
        'background-dark': '#0c0a09',
        'text-primary': '#1c1917',
        'text-secondary': '#78716c',
        'border-color': '#e7e5e4',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [
    require('@iconify/tailwind4'),
  ],
}