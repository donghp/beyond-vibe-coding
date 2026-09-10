import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import { remarkBvcVisual } from './src/lib/visual/remarkPlugin';

const isProduction = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://donghp.github.io',
  base: isProduction ? '/beyond-vibe-coding' : '/',
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkBvcVisual,
    ],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
