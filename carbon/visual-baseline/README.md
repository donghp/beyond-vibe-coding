# ENERIXON Carbon — Public Website Visual Baseline Library
**Document Reference**: `EXOS-VBL-00074`  
**Standard**: ENERIX Carbon Master Design / EXOS Enterprise Design Language V7.0  
**Status**: GOVERNING BASELINE  
**Effective Date**: 2026-09-20  

---

## 1. Purpose

The Visual Baseline Library serves as the single immutable repository of design specifications, layout models, responsive contracts, and visual governance for all public pages across the **ENERIXON Carbon** platform. 

It establishes:
1. A **Master Baseline** governing global typography, tokens, and non-negotiable page-shell components.
2. Individual **Page Baselines** tracking layout hierarchy, asset placements, and user approval states.
3. The **Canonical Global Footer Standard**, anchored by the approved Homepage footer.
4. An audit trail ensuring no page silently mutates or adopts unapproved aesthetic patterns.

---

## 2. Directory Structure

```
/carbon/visual-baseline/
├── README.md                      # This governing document
├── 00_MASTER/                     # Shared visual grammar & page-shell standards
│   └── MASTER_VISUAL_BASELINE.yaml
├── 01_HOME/                       # Homepage visual baseline (APPROVED / FROZEN)
│   └── HOME_VISUAL_BASELINE.yaml
├── 02_PLATFORM/                   # Platform page visual baseline (USER_APPROVED)
│   └── PLATFORM_VISUAL_BASELINE.yaml
├── 03_SOLUTIONS/                  # Solutions visual baseline (USER_FAVORED_REFERENCE)
│   ├── SOLUTIONS_VISUAL_BASELINE.yaml
│   └── REFERENCE_METADATA.md
├── 04_INDUSTRIES/                 # Industries visual baseline (REFERENCE / PENDING)
│   └── INDUSTRIES_VISUAL_BASELINE.yaml
├── 05_SCIENCE/                    # Science visual baseline (REFERENCE / PENDING)
│   └── SCIENCE_VISUAL_BASELINE.yaml
├── 06_RESOURCES/                  # Resources visual baseline (REFERENCE / PENDING)
│   └── RESOURCES_VISUAL_BASELINE.yaml
├── 07_COMPANY/                    # Company visual baseline (REFERENCE / PENDING)
│   └── COMPANY_VISUAL_BASELINE.yaml
└── 08_CHILD_PAGES/                # Standards for future child public routes
    └── CHILD_PAGES_GOVERNANCE.yaml
```

---

## 3. Non-Negotiable Page-Shell Standard

Every public page must strictly adhere to this top-to-bottom structural hierarchy:

```
LOGO
  ↓
HEADER (Canonical Public Header with Active Indicator)
  ↓
BREADCRUMB (Required for child pages: Trang chủ → Page Name)
  ↓
BANNER / HERO (Image-Led / High Contrast Navy #08192D)
  ↓
MAIN CONTENT (Light #FFFFFF / #F8FAFC, Editorial Layout)
  ↓
SECTION FOOTER (Page-Specific Final CTA: Dark Premium #08192D)
  ↓
GLOBAL FOOTER (Canonical Shared Enterprise Footer: White #FFFFFF)
```

- **Banner/Hero**: Mandatory on all public pages. Must not be omitted.
- **Section Footer**: Dedicated dark high-contrast conversion layer specific to each page.
- **Global Footer**: Must be the shared canonical component (`PublicGlobalFooter` / `renderEnterpriseFooter()`). Never create custom or shortened alternatives.

---

## 4. Canonical Header Standard

- **Component**: `renderPublicHeader()` in `/carbon/ui/components/public-header.js`.
- **Background**: White `#FFFFFF` with bottom border `#E2E8F0`.
- **Navigation Links**: Must resolve to canonical path routes:
  - Logo → `/carbon/`
  - Nền tảng (Platform) → `/carbon/platform/`
  - Giải pháp (Solutions) → `/carbon/solutions/`
  - Ngành (Industries) → `/carbon/industries/`
  - Khoa học (Science) → `/carbon/science/`
  - Tài nguyên (Resources) → `/carbon/resources/`
  - Công ty (Company) → `/carbon/company/`
- **Active State**: Inferred directly from `window.location.pathname`, applying the bottom blue border (`#0066FF`) and bold text weight (`700`).

---

## 5. Canonical Global Footer Standard

- **Authority**: The **Homepage Footer** is the authoritative reference for all public pages.
- **Component**: `PublicGlobalFooter` (aliased as `renderEnterpriseFooter`) in `/carbon/ui/components/enterprise-footer.js`.
- **Rule**: All public pages must use identical structure, column hierarchy, language switch, legal disclosures, and link orders.
- **Zero Divergence**: No child page may modify, reorder, truncate, or inject unique footer content.
- **Canonical Routing**: All footer links resolve to canonical paths without bare hashes (`#`), placeholders, or `javascript:void(0)`.

---

## 6. Approval States

All baselines must declare their exact state using only these values:

| State | Definition | Current Assignment |
|---|---|---|
| `USER_APPROVED` | Formally approved by the product owner/user. | `01_HOME`, `02_PLATFORM` |
| `FROZEN` | Production-locked baseline; no visual modifications permitted. | `01_HOME` |
| `USER_FAVORED` | Explicitly favored by user as target layout direction; pending final sign-off. | `03_SOLUTIONS` (`02.page_solotion_vn.png`) |
| `REFERENCE` | Working layout draft or functional reference. | `04_INDUSTRIES`, `05_SCIENCE`, `06_RESOURCES`, `07_COMPANY` |
| `DRAFT` | Initial exploratory layout. | None |
| `SUPERSEDED` | Deprecated baseline preserved for historical audit. | Previous iterations |

> **Critical Rule**: A `USER_FAVORED` or `REFERENCE` state must **never** be converted into `USER_APPROVED` without explicit written confirmation from the user.

---

## 7. Baseline Versioning & Change Discipline

- Baseline files follow semantic versioning tags (e.g., `SOLUTIONS-VISUAL-BASELINE-V0.1`).
- Upon user approval: `SOLUTIONS-VISUAL-BASELINE-V1.0-APPROVED`.
- Upon production lock: `SOLUTIONS-VISUAL-BASELINE-V1.0-FROZEN`.
- Silent changes to layout, spacing, section sequences, or color semantics are strictly prohibited. Any update creates an incremented version with recorded provenance.

---

## 8. Asset Directory Rule & Provenance

- **Reference Images**: Stored in or referenced by `/carbon/visual-baseline/<PAGE_ID>/`.
- **Production Assets**: Remain strictly under `/carbon/assets/`.
- **Integrity**: Original reference filenames and aspect ratios must be preserved. Never overwrite user-provided references with generated substitutes.
