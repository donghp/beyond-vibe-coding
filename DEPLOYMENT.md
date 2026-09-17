# Deployment: Beyond Vibe Coding & ENERIX Carbon

This repository contains two separate applications deployed to the same GitHub Pages site.

## Canonical URLs

### 1. Beyond Vibe Coding — Living Book (Root)
**URL:** https://donghp.github.io/beyond-vibe-coding/

### 2. ENERIX Carbon — Governed Demo (/carbon/)
**URL:** https://donghp.github.io/beyond-vibe-coding/carbon/

## Repository Structure
- **Root (/):** Beyond Vibe Coding — Living Book (Astro)
- **Sub-directory (/carbon/):** ENERIX Carbon (Standalone ESM)

## Deployment Mechanism
GitHub Pages via GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Build & Isolation Logic
1. **Root Build:** `npm run build` generates the Living Book in `dist/`.
2. **Sub-app Isolation:** The `/carbon/` directory is copied into `dist/carbon/` to preserve path isolation.
3. **Guard Safety:** ENERIX Carbon includes path-based guards in its bootstrap and router to prevent interference with the root application.

## Local Preview
1. For Living Book: `npm run dev`
2. For ENERIX Carbon: Serve the `carbon` folder (`npx serve carbon`) or access `/carbon/` via the root dev server.
