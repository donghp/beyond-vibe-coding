# BVC MASTER VISUAL DESIGN V1.0 — GAIS INSTALLATION INSTRUCTIONS

## Purpose

Install the BVC Master Visual Design as the permanent visual governance and runtime baseline for Beyond Vibe Coding.

## Placement

After extracting this package at the project root, the canonical specification must exist at:

`docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md`

The runtime manifest must exist at:

`docs/standards/visual/BVC_VISUAL_RUNTIME_MANIFEST.yaml`

## Installation rules

1. Register `BVC_MASTER_VISUAL_DESIGN_V1.0.md` as the canonical global visual design authority.
2. Register `BVC_VISUAL_RUNTIME_MANIFEST.yaml` as the machine-readable runtime manifest.
3. Implement the runtime token system at `src/lib/visual/tokens.ts` and `src/styles/bvc-visual.css` from the canonical specification.
4. Keep the existing manuscript protection policy active: `src/content/chapters/*.md` is default-deny for write operations.
5. Do not rewrite, translate, normalize, or otherwise mutate chapter Markdown to make visuals render.
6. Build diagrams from the Markdown/AST at render time/build time only. Never write the transformed representation back to Markdown.
7. Use SVG/HTML/CSS as the primary output for structured diagrams.
8. Keep the BVC visual identity authoritative; any external layout engine is only a geometry/layout engine.
9. Keep the global chapter identity de-duplication at the AST/render layer. Do not hide or delete source headings.
10. Production must not require AI/Gemini at runtime. GAIS and GitHub Pages must use the same checked-in renderers, styles, and tokens.

## Repository governance

Canonical repository:

`https://github.com/donghp/beyond-vibe-coding`

Canonical branch:

`main`

Do not run `git init`. Do not create a new repository. Do not change `origin` automatically. Use the existing GAIS GitHub Sync / Source Control workflow.

## Implementation scope

This package provides the specification and runtime contract. GAIS must inspect the existing codebase and integrate the system without overwriting unrelated work.

Do not modify chapter manuscripts as part of installation.

## Acceptance

Installation is complete only when:

- the specification is registered;
- runtime tokens match the specification;
- diagram rendering uses the BVC runtime library;
- chapter Markdown files have ZERO DIFF from before installation;
- Chapters 01–05 retain the correct one-time chapter identity rendering;
- build passes;
- Preview visually matches the intended BVC Master Visual Design;
- GitHub Sync is performed only through the existing user-controlled UI.
