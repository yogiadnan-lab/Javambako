import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const contentDir = resolve(root, 'src/content/blog');
const output = resolve(root, process.argv[2] || 'public/_redirects');
const files = (await readdir(contentDir)).filter((file) => file.endsWith('.md'));
const redirects = new Set();

for (const file of files) {
  const source = await readFile(resolve(contentDir, file), 'utf8');
  const frontmatter = source.match(/^---\s*([\s\S]*?)\s*---/);
  if (!frontmatter) continue;
  const status = frontmatter[1].match(/^status:\s*["']?([^\r\n"']+)/m)?.[1]?.trim() || 'published';
  if (status !== 'published') continue;
  const original = frontmatter[1].match(/^original_url:\s*["']?([^\r\n"']+)/m)?.[1]?.trim();
  const slug = frontmatter[1].match(/^slug:\s*["']?([^\r\n"']+)/m)?.[1]?.trim() || basename(file, '.md');
  if (!original) continue;
  const oldPath = new URL(original).pathname;
  const target = `/blog/${slug}/`;
  if (oldPath !== target) redirects.add(`${oldPath} ${target} 301`);
}

const fixed = [
  'https://www.javatobacco.com/* https://javatobacco.com/:splat 301',
  'http://javatobacco.com/* https://javatobacco.com/:splat 301',
];
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${[...fixed, ...[...redirects].sort()].join('\n')}\n`, 'utf8');
console.log(`Generated ${redirects.size} legacy redirects in ${output}`);
