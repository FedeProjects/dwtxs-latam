// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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

  vite: {
    plugins: [tailwindcss()],
  },
});
