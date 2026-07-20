import { readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const contentDir = resolve('src/content/blog');
const articleSlugs = new Set(readdirSync(contentDir).filter((file) => file.endsWith('.md')).map((file) => {
  const source = readFileSync(resolve(contentDir, file), 'utf8');
  return source.match(/^slug:\s*["']?([^\r\n"']+)/m)?.[1]?.trim() || basename(file, '.md');
}));

// Preserve imported Markdown while normalizing its rendered structure and
// migrating contextual links from legacy WordPress paths to Astro article URLs.
export default function remarkDemoteH1() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'heading' && node.depth === 1) node.depth = 2;
      if (node.type === 'link' && node.url) {
        try {
          const url = new URL(node.url, 'https://javatobacco.com');
          if (url.hostname === 'javatobacco.com') {
            const slug = url.pathname.split('/').filter(Boolean)[0];
            if (articleSlugs.has(slug)) node.url = `/blog/${slug}/`;
          }
        } catch {
          // Keep malformed legacy links unchanged so content rendering never fails.
        }
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}
