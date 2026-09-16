# ENERIX Carbon — Regulatory-aware Carbon & GHG Emissions Engineering Platform

```yaml
product: ENERIX Carbon
version: 1.0.0-skeleton
status: BASELINE_ESTABLISHED
architecture: repository-native / zero-backend demo
database: none (Markdown + YAML + JSON + JS)
demo_url: https://donghp.github.io/beyond-vibe-coding/carbon/
as_of: 2026-09-16
```

## Overview

**ENERIX Carbon** is a regulatory-aware Carbon & GHG Emissions Engineering Platform designed for Vietnamese organizations, facilities, and projects.

It converts authoritative climate regulation (such as Law 72/2020/QH14, Decision 42/2026/QĐ-TTg, Decree 83/2026/NĐ-CP, Decree 119/2025/NĐ-CP, Decree 06/2022/NĐ-CP, and sectoral circulars) and international standards (TCVN ISO 14064-1/2/3:2025, GHG Protocol) into versioned, evidence-bound, deterministic computation.

## Four Authority Separation Model

1. **LEGAL AUTHORITY** — Authoritative signed legal instruments (Laws, Decrees, Decisions, Circulars).
2. **METHODOLOGY AUTHORITY** — Approved technical calculation/MRV standards and ministry guidelines.
3. **CALCULATION AUTHORITY** — Deterministic numerical engine (pure math, versioned parameters).
4. **AI ASSISTANCE** — Discovery, normalization, extraction, and natural language explanation (Advisory only; never calculation authority).

## Repository Architecture

```text
carbon/
├── index.html                  # Main application entry point shell
├── README.md                   # System documentation
├── carbon-manifest.yaml        # System manifest
├── knowledge-manifest.yaml     # Rehydrated regulatory/knowledge manifest
├── app/                        # Application core (router, state, data provider, formatters)
├── engine/                     # Calculation, regulatory, validation, and provenance engines
├── data/                       # Repository-native JSON databases (sectors, factors, GWPs, etc.)
├── knowledge/                  # Governance, legal, standards, methodology, and UX source pack
├── regulatory/                 # Rules engine, applicability matrix, and relationships graph
├── evidence/                   # Evidence manifests and source references
├── demo-data/                  # Demo facilities, activities, and calculation scenarios
├── ui/                         # Visual components, page renderers, and stylesheet
└── docs/                       # Architectural docs, data models, methodology, and decisions
```

## Getting Started

Open `/carbon/index.html` directly or serve via local web server / GitHub Pages.
