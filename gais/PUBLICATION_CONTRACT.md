# Publication Contract — Beyond Vibe Coding

This contract outlines the technical and philosophical boundaries for publishing *Beyond Vibe Coding — Living Book* as a premium, static-first web reading experience.

## Principles

1. **Markdown is the Semantic Source**
   The source of truth for all book content is local Markdown files under the `src/content/chapters/` directory. No external databases, CMS APIs, or runtime systems dictate the content structure.

2. **Generated HTML**
   All static pages are compiled and generated at build time using Astro. The reader receives optimized, semantic, fast-loading HTML without client-side rendering overhead.

3. **No Direct PDF Dependency**
   The original, high-fidelity PDF is a separate design product. It is never used as the direct asset source or viewport source for the browser application.

4. **No Direct PDF Distribution**
   To maintain the integrity of both reading formats and prevent unauthorized scraping or direct hotlinking of massive files, the complete downloadable PDF is not distributed directly on the public website.

5. **Structured Metadata**
   Each chapter file must contain verified frontmatter metadata defining its ID, order, reading time, version, and descriptive criteria, enforced by a strict TypeScript schema.

6. **Stable Anchors**
   All headings and major text sections within chapters must compile to stable HTML `id` anchors to allow seamless deep-linking, referencing, and persistent navigation tracking.

7. **Structure-Driven Navigation**
   Site layouts, spines, and side navigation menus are generated programmatically using content collections and directory scanning, eliminating manual link management.

8. **Indexed Search**
   The client-side search indexing system (Pagefind) parses the fully built static HTML, ensuring the search database remains perfectly aligned with the published pages without relying on external SaaS search engines.

9. **Privacy-First Local Reading Progress**
   User preferences (such as Book Mode) and reading milestones (chapter scroll offsets, completed segments) are kept strictly local using browser standard storage APIs. No cloud databases, server logging, or tracking cookies are permitted.

10. **Optional and Independent Author Support**
    Donations, payments, or sponsor options on the site are entirely voluntary, unobtrusive, and separate from the reading layout. High-quality reading is never gated behind payment models, registration walls, or credentials.
