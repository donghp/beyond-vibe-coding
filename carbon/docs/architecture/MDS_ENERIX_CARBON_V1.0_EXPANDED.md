# MDS ENERIX Carbon V1.0 (Expanded)

**Master Design System — ENERIX Carbon / Regulatory Carbon & GHG Engineering Platform**

**Status:** DESIGN BASELINE — V1.0 PROPOSED FOR CONTROLLED IMPLEMENTATION  
**Parent:** ENERIX Platform MDS V2.0  
**Product:** ENERIX Carbon  
**Design Direction:** Blue-dominant Industrial Technical Editorial  
**Primary Use:** Web application, engineering workspace, regulatory/assurance UI, knowledge/report surfaces

---

## 0. Design Authority

MDS ENERIX Carbon V1.0 inherits the structural discipline of ENERIX Platform MDS V2.0 and adapts its visual language for a regulatory/engineering product. It does **not** replace MDS V2.0.

**Inheritance:** grid discipline, data-first hierarchy, premium industrial minimalism, typography discipline, spacing, component normalization, icon discipline, quality checklist.

**Carbon adaptation:** blue becomes the product primary accent; ENERIX green becomes the positive/reduction/approved semantic accent; GHG-report editorial patterns become a knowledge/report visual language; the application remains dense, calm, auditable, and engineering-first.

**Rule:** Visual style may be adapted; regulatory meaning, calculation semantics, evidence meaning, status semantics, and provenance must never be altered by styling.

---

# 1. Design Philosophy

## 1.1 Core sentence

> **Regulatory clarity. Engineering precision. Evidence you can trust.**

## 1.2 Five design principles

1. **Data First, Visual Second** — numbers, status, source and traceability are primary. The MDS V2.0 explicitly prioritizes data over image and states that visual should serve data.
2. **Industrial Technical Editorial** — combine enterprise application discipline with the strong blue/green editorial grammar visible in the supplied GHG handbook.
3. **One Meaning per Surface** — every card, banner, chart and page has one dominant purpose.
4. **Evidence Before Decoration** — source, timestamp, methodology, factor and verification status must be easier to find than decorative graphics.
5. **Calm Under Failure** — BLOCKED, NEEDS REVIEW and regulatory exceptions must be visually strong but never sensational.

---

# 2. Visual DNA

### ENERIX Carbon should look like:

**Industrial engineering dashboard** + **regulatory handbook** + **audit workstation**.

### It should not look like:

- consumer sustainability app
- generic ESG dashboard
- neon "climate tech" startup
- marketing landing page
- crypto/Web3 dashboard
- dense legacy enterprise software

---

# 3. Color System — Blue Dominant

## 3.1 Brand foundation

| Token | HEX | Role |
|---|---|---|
| `carbon.navy.950` | `#081321` | global shell, strongest headings |
| `carbon.navy.900` | `#10233B` | secondary shell, strong text |
| `carbon.graphite.900` | `#191D2F` | high-emphasis text |
| `carbon.white` | `#FFFFFF` | primary surface |
| `carbon.surface.50` | `#F7FAFC` | app background |
| `carbon.surface.100` | `#F0F4F7` | section background |
| `carbon.border` | `#D6E0E8` | borders/dividers |

## 3.2 Carbon product primary — Blue family

The supplied GHG handbook uses a strong cyan/blue visual family for information and calculation-oriented sections. MDS Carbon formalizes this as the product primary accent.

| Token | HEX | Role |
|---|---|---|
| `carbon.blue.700` | `#0077B6` | deep blue, charts/strong link |
| `carbon.blue.600` | `#008FCC` | action/interactive |
| `carbon.blue.500` | `#00A0E0` | **PRIMARY CARBON BLUE** |
| `carbon.blue.300` | `#70C0F0` | soft info, process blocks |
| `carbon.blue.100` | `#E6F6FF` | selected/soft information surface |

## 3.3 ENERIX green family — positive / reduction / approved

The MDS V2.0 ENERIX accent green remains canonical and is reinforced by the green visual system in the supplied GHG handbook.

| Token | HEX | Role |
|---|---|---|
| `enerix.green.700` | `#309040` | strong positive / approved |
| `enerix.green.600` | `#63B32E` | ENERIX brand accent |
| `enerix.green.500` | `#70C040` | reduction / environmental positive |
| `enerix.green.300` | `#A0D080` | soft reduction indicator |
| `enerix.green.100` | `#EEF8E8` | positive surface |

## 3.4 Semantic colors

| Semantic | Token | HEX | Use |
|---|---|---|---|
| Information | `semantic.info` | `#00A0E0` | methodology, references, informational status |
| Positive | `semantic.success` | `#309040` | approved, verified, reduction |
| Warning | `semantic.warning` | `#C88900` | review, incomplete, approaching threshold |
| Critical | `semantic.danger` | `#C62828` | blocked, critical exception |
| Pending | `semantic.pending` | `#64748B` | waiting, not yet reviewed |

### Color rules

- Blue is the **dominant product accent**.
- Green is **not** the primary navigation selection color; it communicates positive/reduction/approved meaning.
- Red is reserved for real blocking/critical states.
- Amber is reserved for warnings and required attention.
- Never use gradients in normal Carbon UI components.
- Do not use the blue/green palette as decoration without semantic meaning.

---

# 4. Typography

Inherited from MDS V2.0: **Be Vietnam Pro or Inter**.

Recommended Carbon implementation:

| Role | Font | Size | Weight | Line-height |
|---|---|---:|---:|---:|
| Display | Inter / Be Vietnam Pro | 40–48 px | 800 | 1.05 |
| Page title | Inter / Be Vietnam Pro | 28–32 px | 750–800 | 1.15 |
| Section title | Inter / Be Vietnam Pro | 20–22 px | 700 | 1.2 |
| Card title | Inter / Be Vietnam Pro | 16–18 px | 700 | 1.25 |
| Body | Inter / Be Vietnam Pro | 14–16 px | 400–500 | 1.5 |
| Dense data | Inter | 13–14 px | 400–600 | 1.4 |
| Caption | Inter | 12 px | 400–500 | 1.35 |
| KPI | Inter / Be Vietnam Pro | 32–40 px | 800 | 1.0 |
| Formula/code | JetBrains Mono / system mono | 12–14 px | 500 | 1.45 |

**Rule:** no decorative display fonts, no all-caps body content, no text effects.

---

# 5. Grid & Layout

MDS V2.0 defines a 12-column grid and 24 px gutters. Carbon adopts that discipline for the responsive web rather than using a fixed presentation canvas.

### Desktop

- 12 columns
- 24 px gutter
- 32 px page padding minimum
- max content width: 1600 px
- main workspace uses flexible `minmax(0, 1fr)` tracks

### Tablet

- 8 columns
- 20 px gutter
- 24 px page padding

### Mobile

- 4 columns
- 16 px gutter
- 16 px page padding
- no page-level horizontal scroll
- wide tables scroll only inside local table containers

### Standard spacing

`8 / 16 / 24 / 32 / 48 / 64 / 96 px`

MDS V2.0 explicitly establishes XS 8, SM 16, MD 24, LG 32, XL 48, XXL 64 and XXXL 96.

---

# 6. Surface System

## App shell

- `carbon.navy.950` header/sidebar anchors
- white primary workspace
- very light blue-gray application background

## Cards

- white background
- 1 px `carbon.border`
- 16–18 px radius
- Level 1 shadow only
- no gradient

## Technical panels

For Calculation Studio, Methodology and Evidence:

- white or `carbon.surface.50`
- 2–4 px blue rule for active technical focus
- compact metadata row
- source/version badges

## Editorial knowledge panels

The supplied GHG handbook provides a strong visual pattern: colored section header, white content field, blue/green callout block, process diagrams, and structured two-column explanation. Carbon adopts these patterns selectively for Knowledge Base, Methodology, Regulatory Guidance and Report preview—not for every operational dashboard card.

---

# 7. Navigation & Application Shell

## Header

**Left:** Carbon mark + `ENERIX Carbon`  
**Center/left:** product status / regulatory baseline indicator  
**Right:** language, environment/status, user menu or sign-off context.

Header background: `carbon.navy.950`.

## Sidebar

- white surface
- dark navy text
- blue active indicator
- icons 20–22 px
- section labels in 11–12 px uppercase, letter spacing 0.06em

### Active navigation rule

Selected navigation uses a **blue** bar and blue text. Green does not indicate navigation selection because green is reserved for positive/reduction semantics.

## Mobile

Sidebar becomes a drawer. Closed drawer does not consume layout width. Drawer overlays the workspace.

---

# 8. Page Header Pattern

Every operational page uses:

1. Blue/technical eyebrow or section label
2. Page title
3. One-line explanatory subtitle
4. Primary actions aligned right on desktop
5. Actions wrap below title on mobile

Example:

`REGULATORY CHECK`  
`Regulatory Applicability`  
`Determine mandatory inventory scope and temporal applicability for the active facility.`

---

# 9. KPI & Data Card System

MDS V2.0 defines KPI/data cards as a normalized component family. Carbon extends this with traceability.

### Carbon KPI Card

Contains:

- label
- dominant KPI
- unit
- period/context
- source/version badge
- delta or status
- trace link

Example:

**Gross Facility Emissions**  
**1,082.32 tCO₂e**  
Scope 1: 67.42 · Scope 2: 1,014.90  
`SNAP-CALC-FAC-2026-001-2026` · `View Calculation →`

### Rule

Every material number must answer:

**What is it? How was it calculated? Which source supports it?**

---

# 10. Status & Compliance Components

## Status badge hierarchy

- `MANDATORY` — amber/orange outline
- `PASS / VERIFIED / APPROVED` — green
- `BLOCKED / CRITICAL` — red
- `PENDING` — gray/blue-gray
- `INFORMATION` — blue

## Regulatory banner

Use a strong left rule and a semantic icon.

Example:

**STATUTORY COMPLIANCE BLOCKED**  
`Reporting period crosses a regulatory transition boundary. Temporal segmentation is required.`

The banner is an information/decision component, not decoration.

---

# 11. GHG Editorial Callout

Inspired by the supplied GHG handbook callout boxes.

### Use for

- definitions
- regulatory notes
- methodology notes
- examples
- evidence guidance
- calculation assumptions

### Do not use for

- ordinary error states
- navigation
- every KPI card
- routine notifications

### Visual

- blue fill for informational knowledge
- green fill for positive/reduction guidance
- white text
- compact supporting icon
- subtle corner/notch only in Knowledge/Report surfaces

---

# 12. Process Flow System

The GHG handbook presents a six-step inventory/reporting process visually. Carbon converts that into a first-class process component:

`BOUNDARY → BASE YEAR → INVENTORY → QUALITY → REPORT → VERIFICATION`

For product workflows the operational equivalent may be:

`REGULATORY → DATA → METHOD → CALCULATION → EVIDENCE → ASSURANCE`

Each step has:

- number
- title
- state
- owner
- blocking issue count
- completion indicator

Use blue for process progress; green only when a gate is verified.

---

# 13. Scope & GHG Visual Language

The supplied handbook visually distinguishes Scope 1, Scope 2 and Scope 3 and shows gases separately.

Carbon should therefore provide:

- Scope 1 / Scope 2 / Scope 3 summary cards
- gas breakdown: CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃ where applicable
- units and tCO₂e clearly separated
- facility/source filters
- drill-down to activity data and factors

Recommended visualization semantics:

- Scope 1: deep blue
- Scope 2: cyan blue
- Scope 3: green-blue neutral family
- verified: green
- blocked: red
- unavailable/not reported: gray

Do not assign arbitrary colors per chart.

---

# 14. Calculation Studio

Calculation UI must look like an engineering workstation, not a spreadsheet clone.

### Layout

`Context → Activity Data → Methodology → EF/GWP → Formula → Result → Evidence`

### Formula card

- formula in mono type
- inputs listed with units
- source/version beside each parameter
- calculation ID
- deterministic status

### Result card

- large tCO₂e result
- gas result underneath
- reproducibility state
- trace action

### Rule

AI may explain or assist, but the visual language must make the deterministic engine the authority.

---

# 15. Activity Data Ledger

Dense-data pattern inspired by the report's structured tables.

Columns should prioritize:

`Activity → Quantity → Unit → Period → Source → Evidence → Validation → Status`

Use compact rows, fixed numeric alignment and visible units.

Do not use oversized cards for raw activity data.

---

# 16. Evidence & Audit Trace

Visualize provenance as a chain:

`Document → Extraction → Activity Data → Method → Factor → Calculation → Result → Report`

Each link should show:

- object ID
- status
- source
- version
- confidence/verification
- timestamp

Verified steps use green. Neutral steps use blue. Blocked evidence uses red.

---

# 17. Regulatory Workspace

Use the GHG handbook's editorial organization style:

- strong section header
- concise explanatory paragraph
- blue/green regulatory callout
- structured table or checklist
- source citation line

For each rule:

`Rule → Applicability → Effective date → Scope → Evidence → Action`

Never bury the effective date or legal source.

---

# 18. Knowledge Base

Knowledge Base is the strongest place to use the supplied GHG handbook visual grammar.

### Card pattern

- source category
- title
- authority/status
- jurisdiction
- effective date
- topic tags
- short summary
- open source

### Detail pattern

Two-column desktop layout:

`Source navigation | Document content`

Add blue callout boxes for important definitions and green callouts for practical implementation tips.

---

# 19. Reports

The report experience should feel like a modern digital regulatory report rather than a generic dashboard export.

### Report cover

- white canvas
- Carbon Blue horizontal rule
- ENERIX identity
- reporting period
- facility / organizational scope
- report status

### Report body

Use:

- chapter header
- numbered sections
- data tables
- source lines
- methodology boxes
- uncertainty notes
- assurance/verification block

The supplied handbook organizes reporting into general description, organizational boundaries, reporting boundaries, quantified inventory, reduction initiatives, and verification. Carbon report templates should preserve this conceptual order while adding system-native evidence and provenance.

---

# 20. Charts & Data Visualization

MDS V2.0 calls for minimal charts with navy + green accent. Carbon modifies this to blue-first.

### Primary chart palette

1. Blue `#00A0E0`
2. Deep blue `#0077B6`
3. Sky blue `#70C0F0`
4. Green `#63B32E`
5. Deep green `#309040`
6. Gray `#94A3B8`

### Chart rules

- no gradients
- no 3D
- no excessive labels
- direct labeling where possible
- show units and period
- show source/method in metadata
- accessible contrast
- use patterns or label differences for color-blind safety where necessary

---

# 21. Tables

Tables are first-class engineering components.

### Rules

- numeric values right-aligned
- units adjacent to values
- sticky header only when justified
- row hover subtle
- status badge in dedicated column
- evidence/source links visible
- local horizontal scrolling only for genuinely wide tables
- never force page-level horizontal scrolling

---

# 22. Icons

Inherited from MDS V2.0:

- 2 px visual stroke
- clean engineering iconography
- no 3D
- no cartoon
- no gradient

Carbon icon family:

`CO₂ · CH₄ · N₂O · Electricity · Fuel · Factory · Vehicle · Waste · Water · Scope · Evidence · Shield · Regulation · Document · Calculation · Verification`

Primary icon color on light surfaces: `carbon.blue.600`.  
Positive icon: `enerix.green.700`.

---

# 23. Illustration & Diagram Language

Use the GHG handbook's highly structured vector-illustration grammar as inspiration:

- large simple objects
- flat fills
- strong blue/green outlines
- white background
- clean technical arrows
- minimal gradients
- no photorealistic hero image on operational screens

Knowledge/report surfaces may use diagrams more extensively.

Operational screens prioritize UI/data over illustration.

---

# 24. Responsive Design

## Mobile principles

- one-column primary workspace
- drawer navigation
- stacked KPI cards
- title bars wrap
- controls wrap
- long labels break safely
- tables scroll locally
- dialogs fit viewport
- safe-area aware
- user zoom remains enabled

## Tablet

- two-column cards where useful
- collapsible navigation
- denser data presentation

## Desktop

- full sidebar
- multi-card decision workspace
- wider tables
- multi-column Calculation Studio

---

# 25. Motion

Inherited from MDS V2.0:

- Fade
- Morph
- Wipe
- 0.4–0.6 seconds

Carbon additions:

- drawer slide: 180–220 ms
- table/status transition: 120–180 ms
- page transitions: restrained and optional

Never use bounce, spin or decorative zoom.

Motion must not hide state changes or evidence.

---

# 26. Accessibility

Minimum Carbon standard:

- WCAG-oriented contrast
- keyboard-visible focus
- semantic buttons/links
- status not communicated by color alone
- table headers associated with cells
- accessible drawer/dialog labels
- reduced-motion support
- no disabled state that hides why an action is blocked

---

# 27. Component Library V1

Mandatory components:

1. `CarbonHeader`
2. `CarbonSidebar`
3. `CarbonMobileDrawer`
4. `CarbonPageHeader`
5. `CarbonKpiCard`
6. `CarbonStatusBadge`
7. `CarbonRegulatoryBanner`
8. `CarbonEditorialCallout`
9. `CarbonProcessFlow`
10. `CarbonDataTable`
11. `CarbonFilterBar`
12. `CarbonFormulaCard`
13. `CarbonEvidenceChain`
14. `CarbonSourceBadge`
15. `CarbonReportSection`
16. `CarbonAuditTimeline`
17. `CarbonEmptyState`
18. `CarbonErrorState`
19. `CarbonDrawer`
20. `CarbonModal`

Each component must consume design tokens rather than hard-coded ad-hoc colors.

---

# 28. Page-Level Design Recipes

## Overview / Decision Workspace

- executive KPI row
- regulatory banner
- four KPI cards
- five-pillar decision matrix
- scope/gas summary
- controlled issues
- sign-off state

## Regulatory Workspace

- rule header
- applicability status
- effective dates
- source citation
- segmentation/timeline
- actions

## Activity Data Ledger

- dense data table
- source/evidence columns
- validation state
- filters

## Calculation Studio

- formula/inputs
- methodology
- EF/GWP
- result
- trace

## Evidence & Audit Trace

- evidence chain
- document preview
- extraction state
- provenance
- verification

## Reports

- readiness state
- report outline
- source/metric trace
- report preview

## Knowledge Base

- editorial document browser
- blue/green callouts
- diagrams
- regulatory references

---

# 29. What Must Not Change

MDS Carbon V1.0 is visual/experience governance. It must not change:

- regulatory applicability logic
- temporal segmentation logic
- calculation formulas
- emission factor values
- GWP datasets
- evidence provenance
- report readiness semantics
- historical immutability
- tenant/security behavior
- deterministic calculation authority

Visual redesign must remain presentation-only unless a separate product/engineering task authorizes behavior changes.

---

# 30. Quality Gate

Before a Carbon UI change is promoted to canonical:

### Visual

- blue-first palette is consistent
- green only carries positive/reduction/approved meaning
- no unauthorized gradients
- typography hierarchy is consistent
- spacing follows token system
- icons remain 2 px engineering style

### Information

- primary metric is immediately visible
- units are visible
- source/version is visible for governed data
- status is explicit
- no critical information is color-only

### Engineering

- desktop responsive
- mobile responsive
- no page-level horizontal scroll
- only local wide tables scroll
- keyboard/focus works
- dialogs/drawers work

### Carbon governance

- styling does not mutate domain logic
- calculations remain deterministic
- evidence/provenance remains visible
- blocked states remain fail-closed

---

# 31. Design Direction Summary

**ENERIX Carbon V1.0 = MDS V2.0 DNA + GHG handbook editorial grammar + blue-first regulatory engineering language.**

Visual priority:

`Navy structure → Carbon Blue information/action → Green positive/reduction → Amber warning → Red block → Neutral gray support`

The product should feel like:

> **A regulatory engineering control room presented with the clarity of a high-quality technical handbook.**

---

# 32. Responsive UI/UX Engineering Standard — ALL DEVICES

This section is mandatory for ENERIX Carbon implementation. It defines responsive behavior as a continuous layout system, not as separate desktop/mobile mockups.

## 32.1 Core Responsive Principle

> **One product, one information architecture, adaptive presentation.**

The same Carbon workflow must remain understandable and usable across:

- Android phones
- iPhone / iOS Safari
- Android tablets
- iPad / iPadOS Safari
- Windows laptops
- macOS laptops
- desktop monitors
- large 4K/5K displays
- portrait and landscape orientations
- foldable / multi-segment devices where supported

No device receives a separate business logic implementation merely because the viewport is smaller.

## 32.2 Continuous Breakpoint Model

Breakpoints are behavioral thresholds, not device-specific assumptions:

| Range | Layout intent |
|---|---|
| `< 480 px` | compact mobile |
| `480–639 px` | large mobile |
| `640–767 px` | small tablet / landscape phone |
| `768–1023 px` | tablet |
| `1024–1279 px` | small desktop / laptop |
| `1280–1599 px` | desktop |
| `>= 1600 px` | large desktop / 4K workspace |

Components must use CSS grid/flex constraints and `minmax(0, 1fr)` rather than assuming a fixed device width.

## 32.3 Mobile Viewport Contract

Every page must include a correct viewport declaration equivalent to:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

For full-screen/fixed-shell experiences, use safe-area environment variables:

```css
padding-top: max(16px, env(safe-area-inset-top));
padding-right: max(16px, env(safe-area-inset-right));
padding-bottom: max(16px, env(safe-area-inset-bottom));
padding-left: max(16px, env(safe-area-inset-left));
```

## 32.4 Mobile Height Contract

Do not assume `100vh` is the visible mobile viewport.

Recommended shell strategy:

```css
min-height: 100svh;
min-height: 100dvh;
```

## 32.5 Horizontal Overflow Contract

This is a hard invariant:

```text
PAGE-LEVEL HORIZONTAL SCROLL = NO
LOCAL DATA REGION HORIZONTAL SCROLL = ALLOWED
```

The following containers must normally satisfy:

```text
html/body/app-shell/page-shell:
    scrollWidth <= clientWidth
```

Only intrinsically wide content may exceed its local container:

```text
CarbonDataTableWrapper
CarbonWideChartWrapper
CarbonFormulaOverflow
```

Never fix overflow by adding global `overflow-x: hidden` without identifying the overflowing child.

## 32.6 Touch Interaction

Touch is a first-class input method.

Rules:

- primary actions must be comfortably tappable;
- touch targets should normally be at least 44×44 CSS px;
- adjacent destructive/positive actions require meaningful spacing;
- normal vertical page scrolling must never be blocked by horizontal gesture settings;
- tables may use local horizontal swiping;
- drawers and sheets must support touch-dismiss only when the action is discoverable and reversible.

## 32.7 Orientation

Portrait is the primary phone composition.

Landscape must remain fully usable and must not expose desktop-only overflow.

## 32.8 Foldables / Multi-Segment Devices

Do not hard-code content across a hinge/fold.

---

# 33. Responsive Application Shell

## 33.1 Desktop

Full sidebar 240–264 px with fluid main workspace.

## 33.2 Tablet

2-column adaptive cards with collapsible navigation rail.

## 33.3 Phone

Compact header, stacked cards, local scroll tables.

## 33.4 Mobile Navigation

Sidebar becomes an overlay modal drawer with backdrop, focus trap, Escape closure, and safe-area margins.

---

# 34. Responsive Page Patterns

- **Overview:** Desktop 4 KPI cards + decision matrix; tablet 2x2; phone stacked.
- **Regulatory:** Rule title, status, effective date directly visible; local table scroll.
- **Calculations:** Single-column sequential workflow on phone: Context → Activity Data → Methodology → EF/GWP → Formula → Result → Evidence.
- **Evidence & Trace:** Split view becomes document first, evidence detail second on mobile.
- **Reports:** Local-scroll tables, accessible review drawer.
- **Knowledge Base:** Two-column desktop (source navigation | document content) becomes stacked on mobile.

---

# 35. Component Interaction Standard

Every interactive Carbon component must define:
`DEFAULT`, `HOVER`, `FOCUS`, `ACTIVE`, `SELECTED`, `DISABLED`, `LOADING`, `SUCCESS`, `WARNING`, `ERROR`, `BLOCKED`, `EMPTY`.

---

# 36. Master UX Invariant

```text
ONE INFORMATION ARCHITECTURE
        +
ONE DESIGN LANGUAGE
        +
ADAPTIVE RESPONSIVE LAYOUT
        +
LOCAL DATA OVERFLOW
        +
ACCESSIBLE INTERACTION
        +
DETERMINISTIC ENGINEERING UX
        +
REGULATORY TRACEABILITY
```
