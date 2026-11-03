# BVC Task Management — Responsive UI Specification v0.1.0

**Document ID:** BVC-TM-UX-003  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** BVC-TM-PD-001, Product Definition v0.1.0

---

## 1. Purpose

Specify how one BVC Task Management web application adapts to iPhone, Android phones, tablets, laptops, and desktop browsers. Responsive behavior must preserve usability and task continuity, not merely scale the same desktop layout down.

## 2. Non-negotiable behavior

1. One responsive web application serves all supported viewport sizes.
2. The design starts with compact phone widths and expands as space becomes available.
3. Primary content must remain readable and controls reachable.
4. Do not require horizontal page scrolling for ordinary task lists or forms.
5. Kanban is optional on compact screens; list view is the default.
6. Orientation changes and split-screen resizing must not discard unsaved task input.
7. The local-data disclosure must remain accessible on every device.
8. Responsive display does not imply data synchronization. Each browser/device has its own local workspace in v0.1.

## 3. Responsive ranges

The parent Product Definition establishes these starting ranges:

| Mode | Width | Primary layout |
|---|---:|---|
| Compact | <600 CSS px | One content column, compact header, bottom navigation, task detail full screen/sheet |
| Medium | 600–1023 CSS px | Navigation rail or compact sidebar where space permits; one or two content panes depending on usable width |
| Expanded | ≥1024 CSS px | Persistent sidebar, focused main content, optional task detail panel |

These are layout starting points, not named-device detection. The implementation must also work at widths between the listed test points.

## 4. Compact layout (<600 CSS px)

### 4.1 Shell

- Header: application name or compact brand mark, current screen title, and only necessary contextual actions.
- Main content: one column; vertical scrolling.
- Primary action: clearly visible Add task button or action area that does not cover content.
- Navigation: bottom bar with My Day, My Tasks, Projects, More.
- More: contains Templates, Settings & Backup, and basic Help/Version.
- Task detail: full-screen page or near-full-height sheet with a visible close/back control.

### 4.2 Width constraints

- Validate 320, 360, and 390 CSS px.
- Keep 16 CSS px minimum side gutters on very narrow devices where possible; reduce only if required to preserve usable content.
- Task title and metadata may wrap; do not clip them.
- Long names must wrap or truncate with an accessible way to inspect the full value.
- No fixed-width card may force the page wider than the viewport.

### 4.3 On-screen keyboard

- Focused form fields must remain visible when the keyboard opens.
- The Save action must not be hidden behind the keyboard or device safe area.
- The layout may scroll the focused field into view.
- Do not reset a partially completed form when the viewport height changes.

## 5. Medium layout (600–1023 CSS px)

### 5.1 Navigation

- Use a navigation rail or compact sidebar when it provides better orientation than bottom navigation.
- Keep labels visible where there is sufficient width; icons alone must not be the only cue for an unfamiliar user.
- If a narrow split-screen window makes the rail intrusive, fall back to a compact navigation pattern without losing any destination.
- Templates and Settings & Backup may remain under More unless there is enough width for direct access.

### 5.2 Content panes

- At the lower end of the range, use one main content pane.
- A task detail sheet/page is preferred when list and detail side-by-side would make either too narrow.
- At wider tablet landscape sizes, a list plus detail preview may be used if both panes remain readable.
- Do not force a three-column desktop dashboard into tablet portrait.

### 5.3 Orientation and split screen

- Support portrait and landscape layouts.
- Recalculate content layout after rotation or split-screen resizing.
- Preserve selected task, current navigation destination, search query, filters, and unsaved form state.
- Avoid abrupt reflow that moves the user's active control off-screen without preserving focus.

## 6. Expanded layout (≥1024 CSS px)

### 6.1 Navigation shell

- Persistent left sidebar.
- My Day, My Tasks, Projects are primary entries.
- Templates and Settings & Backup may be direct sidebar entries.
- Do not show a redundant More entry if all destinations are directly available.

### 6.2 Main content

- Keep a comfortable reading width for task lists and explanatory text.
- A practical initial main content maximum is approximately 760–840 CSS px; validate through wireframe review.
- A selected task may appear in a right-side detail panel when remaining space supports it.
- Hide the detail panel before compressing the main list below a usable width.
- Kanban columns may be displayed horizontally only when each column remains readable and actionable.

### 6.3 Window resizing

- A desktop browser can be resized to a narrow window; behavior must transition to the medium/compact patterns based on available width.
- Do not rely on device type or user-agent detection for layout.

## 7. Shared component adaptation

| Component | Compact | Medium | Expanded |
|---|---|---|---|
| Primary navigation | Bottom bar | Rail / compact sidebar | Persistent sidebar |
| Add task | Prominent button/action area | Header or content action | Header button and optional contextual action |
| Task row | Stacked title + metadata | Compact row with secondary column if useful | Row with aligned metadata columns |
| Task detail | Full-screen/sheet | Sheet or optional second pane | Right detail panel or page |
| Search | Full-width search field | Search row | Search in content/header area |
| Filters | Bottom sheet or expandable panel | Inline or sheet | Inline filter controls/chips |
| Kanban | Not default; list is default | Only if columns remain readable | Wider multi-column board |
| Starter-kit preview | Full page/sheet | Main content with preview panel if space permits | List and preview side-by-side if useful |
| Backup/restore | Single-column forms | Single or two-pane settings | Focused settings page; no unnecessary dashboard |

## 8. Spacing, sizing, and safe areas

- Use a consistent 4 px base spacing scale (see UI Design System).
- Primary touch targets should aim for approximately 44 × 44 CSS px or larger where practical.
- Keep sufficient spacing between adjacent controls to prevent accidental taps.
- Respect iOS/Android safe-area insets where relevant.
- Ensure sticky bottom actions and navigation do not overlap.
- Avoid fixed heights for text-heavy task cards.
- Use minimum heights only for controls, not content containers.

## 9. Text, zoom, and reflow

- Text must wrap naturally.
- Core actions and essential information must remain available at browser zoom and enlarged text settings.
- Avoid truncating task titles in a way that prevents identification; provide a details view or accessible full name.
- Avoid layouts dependent on a single fixed font size or fixed viewport height.
- At 320 CSS px, the primary content must remain usable without essential horizontal scrolling.

## 10. Date and locale behavior

- Present human-readable dates appropriate to the configured application locale.
- The initial public UI may use English, with UI strings centralized for later localization.
- Date-only deadlines must be interpreted consistently using the user's local calendar date; technical storage details are specified in the architecture stage.
- If device timezone changes, My Day grouping must be recalculated according to the agreed date policy without changing the stored date-only deadline unexpectedly.

## 11. Responsive quality checks

Minimum viewport test set:

| Category | Width × height | Orientation |
|---|---:|---|
| Narrow phone | 320 × 640 | Portrait |
| Common phone | 360 × 800 | Portrait |
| Larger phone | 390 × 844 | Portrait |
| Tablet portrait | 768 × 1024 | Portrait |
| Tablet landscape | 1024 × 768 | Landscape |
| Small laptop | 1280 × 720 | Landscape |
| Standard desktop | 1440 × 900 | Landscape |
| Large desktop | 1920 × 1080 | Landscape |

Also test at intermediate widths and with:

- Browser zoom at 200%.
- Text enlargement where supported.
- On-screen keyboard open in Add/Edit Task.
- Long task titles and long project names.
- Empty and error states.
- Split-screen / narrow browser window.
- Orientation change while a task form is open.

## 12. Non-goals and limitations

Responsive behavior does not imply:

- Automatic cross-device synchronization.
- Cloud storage or cloud backup.
- Shared workspaces or multi-user editing.
- Native mobile applications.
- Guaranteed PWA installation or offline behavior.

These remain outside MVP scope unless separately reviewed and approved.

## 13. Acceptance linkage

This specification supports Product Definition AC-017 through AC-025 and AC-029. Detailed testable criteria are in `BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md`.
