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

import crypto from 'node:crypto';

const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true' || process.argv.includes('build');

function carbonIntegration() {
  return {
    name: 'carbon-integration',
    hooks: {
      'astro:config:setup': () => {
        // Build-time asset validation check
        const manifestPath = path.resolve('carbon/assets/branding/manifest.json');
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          for (const asset of manifest.assets || []) {
            if (asset.required) {
              const fullPath = path.resolve('carbon', asset.canonical_path);
              if (!fs.existsSync(fullPath)) {
                throw new Error(`[CarbonBuildError] Missing required canonical asset: ${asset.canonical_path}`);
              }
              const fileBuf = fs.readFileSync(fullPath);
              const actualHash = crypto.createHash('sha256').update(fileBuf).digest('hex');
              if (actualHash !== asset.sha256) {
                throw new Error(`[CarbonBuildError] SHA-256 mismatch for ${asset.canonical_path}: expected ${asset.sha256}, got ${actualHash}`);
              }
            }
          }
        }
      },
      'astro:server:setup': ({ server }) => {
        const carbonPath = path.resolve('carbon');
        // Handle /carbon and /beyond-vibe-coding/carbon without trailing slash
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0].split('#')[0];
          if (url === '/carbon' || url === '/beyond-vibe-coding/carbon') {
            const queryAndHash = req.url.substring(url.length);
            res.writeHead(301, { Location: url + '/' + queryAndHash });
            res.end();
            return;
          }
          next();
        });
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

