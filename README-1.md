# BVC MASTER VISUAL DESIGN V1.0 PACKAGE

This package is intended to be extracted at the ROOT of the existing
`beyond-vibe-coding` GAIS project.

## Contents

- `docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md`
  - canonical visual design specification
- `docs/standards/visual/BVC_VISUAL_RUNTIME_MANIFEST.yaml`
  - machine-readable runtime contract
- `gais/GAIS_VISUAL_SYSTEM_INSTALL.md`
  - installation/governance instructions
- `gais/GAIS_MASTER_VISUAL_IMPLEMENTATION_PROMPT.md`
  - copy/paste implementation prompt for GAIS

## Important

The package does NOT contain generated renderer source files because those must be integrated against the project's current Astro/TypeScript architecture rather than blindly overwriting existing implementation.

After extraction, use the GAIS implementation prompt and require ZERO DIFF in `src/content/chapters/*.md`.
