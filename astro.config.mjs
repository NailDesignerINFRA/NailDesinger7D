import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://naildesigner7d.com.br',

  build: {
    inlineStylesheets: 'auto',
    assets: '_a',
  },

  compressHTML: true,

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },

  adapter: cloudflare()
});