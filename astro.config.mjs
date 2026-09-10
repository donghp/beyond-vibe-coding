import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import { remarkBvcVisual } from './src/lib/visual/remarkPlugin.ts';
import { remarkSuppressDuplicateIdentity } from './src/lib/visual/remarkSuppress.ts';

const isProduction = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://donghp.github.io',
  base: isProduction ? '/beyond-vibe-coding' : '/',
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkBvcVisual,
      remarkSuppressDuplicateIdentity,
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
