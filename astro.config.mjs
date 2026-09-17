import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkDirective from 'remark-directive';
import { remarkBvcVisual } from './src/lib/visual/remarkPlugin.ts';
import { remarkSuppressDuplicateIdentity } from './src/lib/visual/remarkSuppress.ts';
import { remarkBvcDiagram } from './src/lib/visual/remarkDiagram.ts';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true' || process.argv.includes('build');

function carbonIntegration() {
  return {
    name: 'carbon-integration',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const carbonPath = path.resolve('carbon');
        // Serve /carbon directly and under the base path
        server.middlewares.use('/carbon', express.static(carbonPath));
        server.middlewares.use('/beyond-vibe-coding/carbon', express.static(carbonPath));
      },
      'astro:build:done': async ({ dir }) => {
        const srcDir = path.resolve('carbon');
        const destDir = fileURLToPath(new URL('./carbon', dir));
        fs.cpSync(srcDir, destDir, { recursive: true });
        console.log(`[carbon-integration] Copied carbon to ${destDir}`);
      }
    }
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://donghp.github.io',
  base: isProduction ? '/beyond-vibe-coding' : '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [carbonIntegration()],
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
    plugins: [tailwindcss()]
  },
});

