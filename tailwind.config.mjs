import * as brand from './src/brand/theme.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // LC brand: generated from tokens.json by `npm run brand:sync`. Never retype a value here.
      colors: brand.colors,
      fontSize: brand.fontSize,
      maxWidth: brand.maxWidth,
      spacing: brand.spacing,
      borderRadius: brand.borderRadius,
      fontFamily: {
        ...brand.fontFamily,
        // Anything that asks for the default sans face gets the brand's text face.
        sans: brand.fontFamily.text,
      },
    },
  },
};
