# GAIS MASTER VISUAL IMPLEMENTATION PROMPT

Use this prompt after extracting the BVC Master Visual Design V1.0 package at the project root.

---

TARGET: GLOBAL VISUAL SYSTEM ONLY

SOURCE OF TRUTH:
`docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md`

RUNTIME MANIFEST:
`docs/standards/visual/BVC_VISUAL_RUNTIME_MANIFEST.yaml`

OBJECTIVE:
Implement the BVC Master Visual Design as a reusable JS/TS + HTML/CSS + SVG library for all current and future chapters.

MANDATORY:
- Do not modify any `src/content/chapters/*.md` file.
- Do not commit.
- Do not push.
- Do not initialize Git.
- Do not change GitHub remote.
- Do not modify publication state.
- Do not modify chapter prose.

Implement/align:
- `src/lib/visual/tokens.ts`
- `src/styles/bvc-visual.css`
- `src/lib/visual/visualAst.ts`
- `src/lib/visual/diagramClassifier.ts`
- `src/lib/visual/diagramParser.ts`
- specification / flow / architecture / ladder / decision renderers as required
- deterministic SVG/HTML rendering
- semantic color system
- responsive behavior
- accessibility
- single visible frame maximum
- global chapter identity suppression at AST/render layer

Classify source blocks into:
CODE, PLAIN TEXT, FLOW, ARCHITECTURE, LADDER, DECISION, STATE, COMPARISON, SPECIFICATION, ASCII.

Treat structured key/value blocks such as `engineering_method` as `VG-SPEC`, not generic code/ASCII diagrams.

For architecture diagrams, use a professional layout engine if available/appropriate, but BVC styling remains authoritative.

After implementation:
- clean build;
- test Chapters 01, 02, 03, 04, 05, 07;
- verify no duplicate chapter identity;
- verify no `.md` changes;
- report exact changed files;
- stop before GitHub Sync.
