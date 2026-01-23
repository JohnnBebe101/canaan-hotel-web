/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './ui-demo/**/*.{html,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        'background-light': '#f8f8f5',
        'background-dark': '#181611',
        'text-primary': '#172554',
        'text-secondary': '#64748b',
        'border-color': '#e2e8f0',
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