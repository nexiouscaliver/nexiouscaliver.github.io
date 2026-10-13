// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site: served at the domain root by GitHub Pages. No base path.
const site = 'https://shahilkadia.me';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
