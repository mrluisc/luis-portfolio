/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0fafa',
          100: '#d0f0f1',
          200: '#a0e2e4',
          300: '#60cdd0',
          400: '#14b2b8',
          500: '#0d7377',
          600: '#0a5d61',
          700: '#07474a',
          800: '#053033',
          900: '#021a1c',
          DEFAULT: '#0d7377',
        },
        amber: {
          DEFAULT: '#F4A442',
          light: '#f9c87a',
          dark: '#d4851f',
        },
        navy: '#192248',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: { color: theme('colors.teal.DEFAULT') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
