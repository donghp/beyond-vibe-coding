# Beyond Vibe Coding — Living Book

This repository houses the premium Digital Book Experience for ***Beyond Vibe Coding***, written by **Hồng Đông**.

An intentional way to build with AI. Less Cost. More Real Value.

- **Canonical Repository:** `github.com/donghp/beyond-vibe-coding`
- **Official Production Site:** `https://donghp.github.io/beyond-vibe-coding/`

---

## Architectural Principles

This application is built as a **static-first, modular, lightweight** digital monograph. 

- **Static-First Compilation:** Crafted with Astro, compiled completely down to optimized HTML, CSS, and minimal client-side scripting.
- **Content Collections:** Chapters are modeled and strictly verified using TypeScript schemas in local Markdown files.
- **Privacy-First Progress:** Custom preference tracking (including distraction-free **Book Mode** and completed reading milestones) runs completely in browser `localStorage`. No trackers, tracking cookies, or external databases.
- **Pagefind Local Search:** Searches are performed using Pagefind, a lightweight WebAssembly indexing search client running completely in-browser without calling external APIs.

---

## Directory Structure

```
public/
  favicon.svg           - site vector brand logo
  images/               - book chapters background/heros
  icons/                - custom local vector SVG icons

src/
  components/           - modular UI blocks (BookSpine, ChapterReader, etc.)
  content/
    config.ts           - strict collection schema validators
    chapters/           - local Markdown source files (00 to 08)
  data/                 - shared static dictionaries
  layouts/
    BaseLayout.astro    - core HTML framework and SEO wrapper
  pages/
    index.astro         - primary landing layout and table of contents
    chapters/
      [slug].astro      - dynamic chapter reader and responsive layouts
  styles/
    global.css          - design tokens and CSS variables
```

---

## Local Development Guide

To launch the project locally and inspect components:

### 1. Install dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The server will boot on port `3000` (or your preferred local port).

### 3. Build & Run Production Static Analysis
```bash
npm run build
npx pagefind --site dist
npm run preview
```
This compiles the Astro files to HTML, triggers Pagefind to index the compiled assets, and previews the final static pages.
