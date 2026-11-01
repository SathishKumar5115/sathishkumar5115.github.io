import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sathishkumar5115.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
