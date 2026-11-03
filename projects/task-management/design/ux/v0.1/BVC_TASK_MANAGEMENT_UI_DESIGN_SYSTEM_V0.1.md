# BVC Task Management — UI Design System v0.1.0

**Document ID:** BVC-TM-UX-004  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (UX authoring baseline dated 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (Product Owner approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN

---

## 1. Purpose

This document defines the proposed visual language and reusable interface components for BVC Task Management. It gives the design and implementation work one shared set of visual rules so that the application feels consistent on phones, tablets, laptops, and desktop screens.

The tokens below are **proposed v0.1 design values**. They are not a final brand identity and must be reviewed in the rendered UI and measured for contrast before implementation is accepted.

## 2. Visual direction

The interface should feel:

- **Calm:** avoid noisy dashboards, excessive colors, decorative gradients, and unnecessary animation.
- **Clear:** strong text hierarchy, obvious actions, and predictable placement.
- **Friendly:** plain-language labels and helpful empty/error states.
- **Practical:** use visual emphasis to help a person complete work, not to impress with effects.
- **Consistent:** the same concepts and component behavior across every supported device.

Do not imitate Apple's proprietary visual identity or copy iOS screens. Learn from the broader principles of clarity, consistency, and ease of use.

## 3. Proposed design tokens

### 3.1 Color palette

| Token | Proposed value | Use |
|---|---|---|
| `color.primary` | `#2457D6` | Primary actions, selected controls, links |
| `color.primary-hover` | `#1D49B5` | Hover/pressed emphasis where pointer states exist |
| `color.primary-soft` | `#EAF0FF` | Selected navigation background, soft emphasis |
| `color.text` | `#1F2937` | Main text and headings |
| `color.text-muted` | `#5F6B7A` | Secondary text and metadata |
| `color.background` | `#F7F8FA` | Application background |
| `color.surface` | `#FFFFFF` | Cards, sheets, dialogs, input surfaces |
| `color.border` | `#E4E8EF` | Dividers, card borders, input borders |
| `color.success` | `#16845B` | Success indicators with text/icon |
| `color.warning` | `#A85C00` | Warning indicators with text/icon |
| `color.danger` | `#B42318` | Destructive/error indicators with text/icon |
| `color.info` | `#2563EB` | Informational indicators with text/icon |
| `color.disabled` | `#98A2B3` | Disabled control text/icon; pair with a visible disabled treatment |

Color must never be the only way to convey task status, priority, validation, or selection. Use text labels, icons, shape, position, or other non-color cues as appropriate.

### 3.2 Contrast review of candidate text colors

The following contrast ratios were calculated for the proposed foreground colors against white (`#FFFFFF`) and the proposed light background (`#F7F8FA`). They are design checks for these exact pairs, not a full accessibility audit of the application.

| Foreground | On white | On light background | Intended use |
|---|---:|---:|---|
| Primary `#2457D6` | 6.16:1 | 5.80:1 | Primary button text/icons on light surface, links |
| Main text `#1F2937` | 14.68:1 | 13.81:1 | Body and headings |
| Muted text `#5F6B7A` | 5.43:1 | 5.11:1 | Secondary text |
| Success `#16845B` | 4.68:1 | 4.41:1 | Success text/icon; prefer white surface where contrast is tight |
| Warning `#A85C00` | 5.00:1 | 4.71:1 | Warning text/icon |
| Danger `#B42318` | 6.57:1 | 6.19:1 | Error/destructive text/icon |
| Info `#2563EB` | 5.17:1 | 4.86:1 | Informational text/icon |

Contrast must be measured again for actual component combinations, hover/focus/disabled states, borders, and text over tinted surfaces. Do not assume every combination passes because the foreground color passed against white.

### 3.3 Semantic color use

- **To Do / In Progress / Done:** keep explicit text labels. Color is supplementary and should not create an implied priority.
- **Low / Normal / High priority:** show the words; use restrained markers rather than large saturated banners.
- **Overdue:** use a clear “Overdue” label and restrained danger cue; do not make the entire screen red.
- **Focus:** use a small visible focus marker and text/accessible name.
- **Success/error:** include text or accessible status announcement, not just a colored toast or icon.

## 4. Typography

### 4.1 Font stack

Preferred system-first stack:

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

Inter may be bundled with the application if licensing and packaging are handled. Do not require an external font download for the application to remain usable. System fallbacks must render correctly on iOS, Android, Windows, macOS, and Linux.

### 4.2 Type scale

| Token | Size | Weight | Typical use |
|---|---:|---|---|
| `type.page-title` | 28 px / 1.75 rem | 650–700 | Main page title on larger screens |
| `type.section-title` | 20 px / 1.25 rem | 600–650 | Section headings |
| `type.card-title` | 16 px / 1 rem | 600 | Task and project titles |
| `type.body` | 16 px / 1 rem | 400 | Main reading text |
| `type.body-small` | 14 px / 0.875 rem | 400–500 | Supporting task metadata |
| `type.label` | 13–14 px | 500–600 | Form labels and control labels |
| `type.helper` | 12–13 px | 400 | Helper text; never use for essential instructions alone |

Use relative units in implementation where appropriate. Allow text wrapping and browser zoom. Do not shrink body text simply to fit a dense layout.

## 5. Spacing and layout tokens

Use a 4 px base scale:

| Token | Value | Common use |
|---|---:|---|
| `space.1` | 4 px | Icon/text micro-gap |
| `space.2` | 8 px | Compact control spacing |
| `space.3` | 12 px | Tight card spacing |
| `space.4` | 16 px | Standard component padding and phone side gutter |
| `space.5` | 20 px | Between related groups |
| `space.6` | 24 px | Section spacing |
| `space.8` | 32 px | Major grouping |
| `space.10` | 40 px | Large section separation |
| `space.12` | 48 px | Page-level separation where useful |

Layout rules:

- Compact screens use a single content column.
- Use consistent page gutters; aim for 16 px on compact phones where available width permits.
- Keep main text and task lists within a readable line length.
- Do not stretch long descriptions across very wide monitors.
- Avoid fixed heights for text-heavy cards and content containers.
- Respect device safe-area insets and avoid placing controls under bottom navigation or the on-screen keyboard.

## 6. Shape, borders, and elevation

| Token | Proposed value | Use |
|---|---:|---|
| `radius.small` | 6 px | Compact chips and small controls |
| `radius.medium` | 10 px | Inputs, buttons, task rows |
| `radius.large` | 14 px | Cards and sheets |
| `radius.xlarge` | 20 px | Large onboarding surfaces where appropriate |
| `border.width` | 1 px | Default separation |

Use borders and surface contrast as the primary way to group content. Shadows should be subtle and reserved for floating sheets, dialogs, or menus. Avoid heavy card shadows and excessive nested cards.

## 7. Core components

### 7.1 Buttons

| Type | Visual intent | Use |
|---|---|---|
| Primary | Filled primary color | One main action such as Add task, Save, Apply kit |
| Secondary | Neutral/outlined | Cancel, Back, secondary navigation actions |
| Text/Ghost | Minimal surface | Low-emphasis actions such as Clear filters |
| Destructive | Danger treatment with explicit label | Delete or remove actions only |

Rules:

- Use clear verbs: Add task, Save, Cancel, Mark as done, Export backup.
- Aim for a minimum interactive height around 44 CSS px for primary touch actions where practical.
- Avoid placing Delete beside Save or Complete without adequate visual separation.
- Show a visible label for important actions; do not rely on an unlabeled icon.
- Include disabled, hover, pressed, focus-visible, and loading states.

### 7.2 Task row / card

A default task row should show:

1. Completion control.
2. Task title.
3. One concise metadata line (project, due date, or priority as available).
4. Optional Focus marker.
5. Optional overflow menu for less common actions.

Do not show every field on the card. Open Task Detail to view and edit optional notes, checklist, responsible-person label, and other details.

### 7.3 Form fields

- Persistent visible labels; placeholders are examples, not labels.
- Clear required/optional status.
- Plain-language validation below the relevant field.
- Visible focus state.
- Keep entered values after validation/storage errors.
- Provide keyboard, touch, and pointer operation.

### 7.4 Navigation

- Compact: bottom navigation for My Day, My Tasks, Projects, More.
- Medium: navigation rail or compact sidebar when it fits.
- Expanded: persistent sidebar; show Templates and Settings & Backup directly when useful.
- Selected state uses a background/indicator plus text weight or icon treatment, not color alone.

### 7.5 Chips and labels

Use chips for active filters, project metadata, and compact state markers. Keep labels readable. A chip must not be the only way to expose a required action.

### 7.6 Sheets and dialogs

- Use a sheet for quick add or filters on compact screens when it remains usable with the keyboard.
- Use a full-screen detail view when a sheet would be too cramped.
- Use dialogs for consequential confirmation such as destructive delete or workspace replacement.
- Every modal must have a clear title, clear action labels, keyboard/screen-reader support, and a predictable close behavior.

### 7.7 Empty, loading, and feedback components

- Empty state: one short explanation and one next action.
- Loading: restrained, non-blocking when possible; prevent duplicate submission.
- Success: show only after the operation has succeeded.
- Error: explain what failed and what the user can do next.
- Persistence disclosure must be level-specific: Beginner explains browser-profile storage and manual JSON backup; Intermediate/Advanced explain the authenticated Supabase personal workspace. Do not imply team sharing or equate database persistence with a backup.

## 8. Iconography and imagery

- Use a consistent, simple line icon family.
- Icons supplement visible text; primary navigation and important actions retain labels.
- Decorative icons are hidden from assistive technology when appropriate.
- Avoid using emojis as the only icon system in the application UI.
- Use product photography or illustrations only when they help a user understand a task or starter kit. The core task interface should not depend on decorative images.

## 9. Responsive component rules

| Component | Compact | Medium | Expanded |
|---|---|---|---|
| Navigation | Bottom bar | Rail / compact sidebar | Persistent sidebar |
| Task row | Stacked title + metadata | Compact horizontal row where readable | Aligned title and metadata columns |
| Task detail | Full screen / sheet | Sheet or second pane | Optional right detail panel |
| Add task | Prominent reachable action | Header/content action | Header and contextual action |
| Filter | Bottom sheet / expandable | Inline or sheet | Inline controls/chips |
| Kanban | Not default | Optional if columns remain readable | Use wide board if each column remains usable |

See the Responsive UI Specification for exact viewport ranges and test cases.

## 10. Motion and feedback

- Motion is optional and should be short and purposeful.
- Respect reduced-motion preferences.
- Avoid animation that delays routine task capture or completion.
- Do not use motion as the only signal that an operation succeeded or that task status changed.
- Success/error feedback must also be available as text and, where appropriate, an accessible announcement.

## 11. Localization readiness

- Centralize UI strings instead of embedding text throughout components.
- Keep layouts tolerant of longer translated labels.
- Do not assume English text length when setting fixed widths.
- Initial UI language may be English; Vietnamese localization can be added later without changing business rules.

## 12. Token implementation example

The following CSS is illustrative and should be translated into the chosen styling system during architecture/implementation. It is not a technology decision.

```css
:root {
  --color-primary: #2457D6;
  --color-primary-hover: #1D49B5;
  --color-primary-soft: #EAF0FF;
  --color-text: #1F2937;
  --color-text-muted: #5F6B7A;
  --color-background: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-border: #E4E8EF;
  --color-success: #16845B;
  --color-warning: #A85C00;
  --color-danger: #B42318;
  --color-info: #2563EB;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-small: 6px;
  --radius-medium: 10px;
  --radius-large: 14px;
}
```

## 13. Open design decisions

| ID | Decision | Proposed direction | Required before |
|---|---|---|---|
| DS-OPEN-01 | Final primary hue | Keep proposed blue unless Product Owner prefers another restrained hue | UX baseline freeze |
| DS-OPEN-02 | Light-only or light + dark theme | Light theme for MVP; dark theme deferred unless a clear user need is established | UX baseline freeze |
| DS-OPEN-03 | Font packaging | Use system-first stack; bundle Inter only if justified and license/package handling is clear | Architecture / asset review |
| DS-OPEN-04 | Icon family | Select one consistent line icon set during implementation | Architecture / implementation |
| DS-OPEN-05 | Final contrast audit | Measure all real component/state combinations after visual implementation | UI verification |

These values are proposals. No final visual brand or theme decision is implied until reviewed.

## 14. Related documents

- [UX Package README](README.md)
- [User Journey & Navigation](BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md)
- [UX Wireframes](BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md)
- [Responsive UI Specification](BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md)
- [Interaction Specification](BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md)
- [Accessibility & Usability](BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md)
- [UX Acceptance Criteria](BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md)
- [Current Product Definition v0.2.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Historical Product Definition v0.1.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Canonical Product/UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md)

---

**BVC Task Management — UI Design System v0.1.0**  
*Quiet, clear, and useful before impressive.*
