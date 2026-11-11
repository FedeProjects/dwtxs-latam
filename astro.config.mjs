// @ts-check
import process from 'node:process';
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Absolute URLs for canonical, hreflang, Open Graph and the sitemap. SITE_URL points to the
  // vercel.app demo until launch; without it the final domain is used (D-17).
  site: process.env.SITE_URL || 'https://dwtxslatam.com',
  output: 'static',
  // URLs without trailing slash: /maquinas/convencional (D-10).
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  // pt-BR at the root, es under /es/ (PROJECT_SPEC D-03).
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Schibsted Grotesk (D-11), downloaded at build time and served from our own domain.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-schibsted',
      weights: [400, 500, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', es: 'es' } },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
