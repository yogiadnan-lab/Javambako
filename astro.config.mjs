import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Untuk GitHub Pages project repo, workflow sudah mengisi BASE_PATH=/nama-repo
// Kalau pakai custom domain, hapus BASE_PATH di workflow atau set menjadi "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://adnanyogi88-dev.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
});
