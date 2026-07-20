export const prerender = true;

export function GET({ site }) {
  const origin = site || new URL('https://javatobacco.com');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${new URL('/sitemap-0.xml', origin).href}</loc></sitemap>\n</sitemapindex>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
