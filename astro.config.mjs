import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import { remarkBvcVisual } from './src/lib/visual/remarkPlugin.ts';
import { remarkSuppressDuplicateIdentity } from './src/lib/visual/remarkSuppress.ts';
import { remarkBvcDiagram } from './src/lib/visual/remarkDiagram.ts';

const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true' || process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  site: 'https://donghp.github.io',
  base: isProduction ? '/beyond-vibe-coding' : '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
    remarkPlugins: [
      remarkDirective,
      remarkBvcDiagram,
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
    server: {
      fs: {
        allow: ['.', 'carbon'],
      },
    },
    resolve: {
      alias: {
        '@': '/src',
        '/carbon': '/carbon',
      },
    },
  },
});
