import { defineConfig } from 'astro/config';
import remarkDemoteH1 from './src/remark-demote-h1.mjs';

// Untuk GitHub Pages project repo, workflow sudah mengisi BASE_PATH=/nama-repo
// Kalau pakai custom domain, hapus BASE_PATH di workflow atau set menjadi "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://javatobacco.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  markdown: { remarkPlugins: [remarkDemoteH1] },
});
