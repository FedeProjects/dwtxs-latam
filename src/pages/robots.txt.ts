import type { APIRoute } from 'astro';
import { indexable } from '../site';

// Crawlers stay out while the site is a client preview (`indexable` in src/site.ts).
export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      indexable ? 'Allow: /' : 'Disallow: /',
      '',
      `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
      '',
    ].join('\n'),
  );
