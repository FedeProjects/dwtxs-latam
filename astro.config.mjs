// @ts-check
import { defineConfig } from 'astro/config';

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

  vite: {
    plugins: [tailwindcss()],
  },
});
