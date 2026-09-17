# ENERIX Carbon — Regulatory Carbon & GHG Engineering Platform

```yaml
package_id: ENERIX-CARBON
version: 1.0.0
status: SELF_CONTAINED_PORTABLE_PACKAGE
architecture: repository-native / zero-backend static SPA
runtime_dependencies: none (Standard Browser ES Modules + DOM APIs)
public_url: https://donghp.github.io/beyond-vibe-coding/carbon/
future_url: https://enerixon.com/carbon/
as_of: 2026-09-17
```

## Overview

**ENERIX Carbon** is an enterprise regulatory-aware Carbon & GHG Emissions Engineering Platform designed for Vietnamese organizations, facilities, and projects.

It translates authoritative climate regulations (Law 72/2020/QH14, Decision 42/2026/QĐ-TTg, Decree 83/2026/NĐ-CP, Decree 119/2025/NĐ-CP, Decree 06/2022/NĐ-CP, MONRE/MOIT Circulars) and international standards (TCVN ISO 14064-1/2/3:2025, GHG Protocol Corporate Standard) into versioned, evidence-bound, deterministic computation.

---

## 1. Portability & Self-Containment Contract

The entire `/carbon/` folder is a **100% self-contained, portable application package**. It can be copied directly to any static web host or integrated as a sub-path in any web project without depending on any external or parent files.

```text
COPY /carbon/
    ↓
Target Web Hosting / Server / CDN
    ↓
Run / Serve /carbon/index.html
    ↓
Application Fully Operational
```

### Portability Rules
- **Asset Ownership**: 100% of Carbon images, logos, and banners reside within `/carbon/assets/`. Zero runtime dependencies on `/public/` or parent `/src/` directories.
- **Style Ownership**: 100% of styling is encapsulated within `/carbon/ui/styles/main.css` and `tokens.css`. Zero dependency on external CSS frameworks.
- **Icon Ownership**: 100% inline geometric SVG definitions encapsulated in `/carbon/ui/components/icons.js`.
- **Data Ownership**: 100% of factors, GWPs, models, rules, and demo fixtures reside in `/carbon/data/`, `/carbon/demo-data/`, `/carbon/regulatory/`, and `/carbon/evidence/`.
- **Base-Path Portability**: Handled dynamically by `CarbonPath.getBase()`. Carbon functions identically at:
  - Sub-path: `/beyond-vibe-coding/carbon/` (GitHub Pages)
  - Sub-path: `/carbon/` (Local / Preview development)
  - Root/Domain: `https://enerixon.com/carbon/` (Future standalone domain)

---

## 2. Directory Structure

```text
carbon/
├── index.html                      # Portable application entry point
├── README.md                       # Package documentation & runbook
├── carbon-package-manifest.yaml    # Canonical package & portability manifest
├── carbon-manifest.yaml            # System architecture manifest
├── knowledge-manifest.yaml         # Regulatory & methodology source manifest
├── app/                            # Application core
│   ├── app.js                      # Bootstrap & lifecycle coordinator
│   ├── router.js                   # Client-side hash router (#overview, #trace, etc.)
│   ├── data-provider.js            # Repository-native data loader
│   ├── state-store.js              # State manager & view-model generator
│   ├── path.js                     # Base-path agnostic URL resolver (CarbonPath)
│   ├── formatters.js               # Number, date, badge, and CO2e formatters
│   └── i18n.js                     # Localization engine
├── assets/                         # Self-contained visual assets
│   └── branding/
│       ├── manifest.json           # Branding asset integrity registry
│       ├── banner_enerix_carbon.png # Preserved asset
│       └── canonical/
│           └── banner_enerix_carbon.png # Active canonical brand banner (SHA-256 verified)
├── data/                           # Canonical regulatory data tables
│   ├── activities.json             # Activity catalogue & scopes
│   ├── calculation-models.json     # 10 deterministic formula specifications
│   ├── emission-factors.json       # Governed emission factors
│   ├── emission-sources.json       # Point source definitions
│   ├── gwp-datasets.json           # IPCC AR4/AR5/AR6 GWP matrices
│   ├── methodologies.json          # Governed methodology catalogue
│   └── sectors.json                # Industrial sector profiles
├── demo-data/                      # Anonymized enterprise fixtures (PL 1 & 2, VHT, HC 1, HH)
│   ├── facilities.json
│   ├── activities.json
│   ├── reports.json
│   └── scenarios.json
├── engine/                         # Pure deterministic calculation & audit engines
│   ├── calculation-engine.js       # Mathematical engine (M01–M10)
│   ├── regulatory-engine.js        # Rule taxonomy & compliance engine
│   ├── temporal-engine.js          # Temporal boundary resolution
│   ├── methodology-engine.js       # Method tier selection
│   ├── plan-engine.js              # Calculation plan synthesis
│   ├── provenance-engine.js        # SHA-256 cryptographic lineage tracking
│   ├── qa-qc-engine.js             # 4-tier data health engine
│   ├── report-readiness-engine.js  # Statutory readiness & sign-off workflow
│   ├── reporting-blueprint.js      # ISO 14064 / Decision 42 report model
│   ├── document-intelligence-engine.js # OCR/AI confidence & bounding extraction
│   └── test-*.js                   # Comprehensive test suites
├── evidence/                       # Evidence metadata and source vaults
├── knowledge/                      # Legal acts, governance, and UX guidelines
├── locales/                        # Bilingual localization (vi.json, en.json)
├── regulatory/                     # Applicability matrix, rules, relationships
└── ui/                             # User Interface layer
    ├── components/                 # Header, Sidebar, Icons, Banner components
    ├── pages/                      # 11 workspace views
    └── styles/                     # Design tokens & master stylesheet
```

---

## 3. Running & Developing Carbon

### Option A: Standalone Static Serving
You can serve `/carbon/` with any standard static file server (e.g. `npx serve`, `python -m http.server`, nginx, Caddy):
```bash
# From within the /carbon directory:
npx serve .
# Or from workspace root:
npx serve -p 3000
```
Open `http://localhost:3000/carbon/index.html` in any modern web browser.

### Option B: Monorepo / Integrated Dev Server
When running inside the host project:
```bash
npm run dev
```
Navigate to `http://localhost:3000/carbon/` (or `http://localhost:3000/beyond-vibe-coding/carbon/`).

---

## 4. Verification & Testing

Run all self-contained Carbon engine and portability tests using Node.js:
```bash
for testfile in carbon/engine/test-*.js; do
  node "$testfile"
done
```

---

## 5. Deployment Build

In production builds, static assets are copied to `dist/carbon/`:
```bash
npm run build
```
Verify the build artifact:
```bash
ls -la dist/carbon/
```
The output is ready for immediate deployment to GitHub Pages or standalone static hosting.
