import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luiscarlosmoreno.com',
  integrations: [tailwind()],
  output: 'static',
  // No base needed — custom domain serves the site at root
});
