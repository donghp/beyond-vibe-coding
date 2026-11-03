# BVC Task Management — UX Wireframes v0.1.0

**Document ID:** BVC-TM-UX-002  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Original design baseline:** BVC-TM-PD-001 v0.1.0 (authored 2026-11-03)  
**Current product authority:** BVC-TM-PD-001 v0.2.0 (approved 2026-11-04; published by merged PR #5)  
**Compatibility status:** Reconciled for v0.2.0 in this branch; formal Phase 3.1 UX Acceptance remains OPEN  
**Related documents:**
- [Current Product Definition v0.2.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [Historical Product Definition v0.1.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)
- [Canonical Product/UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md)
- [User Journey & Navigation](BVC_TASK_MANAGEMENT_USER_JOURNEY_AND_NAVIGATION_V0.1.md)
- [Responsive UI Specification](BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md)
- [UI Design System](BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md)
- [Interaction Specification](BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md)
- [Accessibility & Usability](BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md)
- [UX Acceptance Criteria](BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md)
- [Responsive My Day Wireframe — PNG](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.png)
- [Responsive My Day Wireframe — SVG](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg)

---

## 1. Purpose

This document defines the structural wireframes and screen-level information hierarchy for BVC Task Management.

It was originally authored against Product Definition v0.1.0. Product Definition v0.2.0 is now the governing product baseline; this compatibility revision preserves the original screen hierarchy and visual direction while aligning learning-level behavior and requirement traceability.

- Phone — compact layout.
- Tablet — portrait and landscape layouts.
- Laptop and desktop — expanded layout.

It also describes the primary screens, navigation patterns, task operations, project management, starter-kit experience, settings, backup/restore, and important system states.

The wireframes are intended to guide UX review, UI design, application architecture, and later implementation through Google AI Studio and AI-assisted engineering workflows.

These are structural wireframes. They explain:

- What information appears on each screen.
- Which controls and actions are available.
- How information is grouped and ordered.
- How the same experience adapts to different viewport sizes.
- How the user moves between screens.
- How success, empty, error, and confirmation states behave.

They do not represent pixel-perfect production UI or a claim that the application has already been implemented.

Current Product Definition v0.2.0 remains authoritative. The original v0.1.0 reference is preserved as the historical design-authoring baseline.

## 2. Product and design baseline

### 2.1 Product identity

**Product:** BVC Task Management  
**Subtitle:** A Simple Daily Work Manager

> Build something useful. Use it every day. Learn by doing.

BVC Task Management is a practical personal work-management application. It helps people capture tasks, decide what matters, organize work, and follow through every day.

It is intended for both technical and non-technical users.

### 2.2 Product principles reflected in the wireframes

1. **Useful before impressive.** Show the information needed to complete everyday work.
2. **Simple on first use.** A new user must be able to create a task without learning a complex workflow.
3. **Mobile-first, device-adaptive.** Design for phone usability first, then expand the same product for larger screens.
4. **One product, many kinds of work.** Use editable Starter Kits rather than separate applications for different professions.
5. **Progressive disclosure.** Keep essential information visible and reveal optional fields only when needed.
6. **Calm and focused.** Avoid excessive colors, unnecessary charts, and crowded dashboards.
7. **Human-readable language.** Use familiar terms such as My Day, My Tasks, Projects, and Templates.
8. **Storage-transparent by learning level.** Explain Beginner browser storage and the authenticated Supabase workspace used by Intermediate/Advanced.
9. **Accessible by design.** Support touch, keyboard, visible focus, readable text, and non-drag alternatives.
10. **Honest about capability.** Do not display controls or status indicators that imply unimplemented capabilities.

### 2.3 Product scope constraints

The following constraints apply to all wireframes:

- One responsive browser-based product progresses through three learning levels; this does not create three unrelated applications.
- **Beginner:** no external database, sign-in, VS Code or Localhost is required. A small versioned JSON workspace may use browser `localStorage`; it does not automatically sync across devices and must provide JSON export/restore.
- **Intermediate:** Supabase PostgreSQL and Supabase Auth provide the user's personal workspace; RLS must restrict access to records owned by that user.
- **Advanced:** the same Supabase data model is managed through GitHub, VS Code/Localhost, versioned migrations, CI/testing and compatible hosting.
- No team account, invitation, shared task workspace or role-based team collaboration is included.
- No CRM, POS, inventory, accounting, HR, ERP, or specialist business operations functions.
- No Gantt chart, resource planning, complex task dependencies, or enterprise portfolio management.
- No in-app AI chatbot, AI Agent, autonomous task assignment, or external AI API integration.
- A task can exist without a project.
- Business Tasks are separate from BVC Engineering Tasks and the five Phase 2 Core Specifications.

**Important:** storage, identity, backup and synchronization behavior must be disclosed by learning level. A role Starter Kit does not create a user identity or permission role. The wireframes do not claim that the application, database or deployment has been implemented.

### 2.4 ENERIXON-inspired visual direction

BVC may inherit the corporate design DNA and visual discipline of ENERIXON while retaining its own product identity.

The intended direction for BVC is:

**Industrial clarity · Engineering discipline · Modern simplicity · Everyday usability**

The visual direction should reference the supplied ENERIXON brand system:

| Brand role | Reference color | Intended use |
|---|---|---|
| Energy Green | `#22C55E` | Primary action, selected positive states, key emphasis |
| Sky Blue | `#0EA5E9` | Secondary actions, links, information emphasis |
| Deep Blue | `#0B1F3A` | Navigation, headings, important structural areas |
| Light Gray | `#F1F5F9` | Neutral backgrounds and supporting surfaces |
| White | `#FFFFFF` | Main content surfaces and readable contrast |

Typography direction:

- **Exo 2:** headings and selected brand-level display text.
- **Inter:** body text, labels, metadata, forms, and controls.

Application of the brand system must remain appropriate for an everyday productivity tool:

- Prefer light, readable working surfaces.
- Use Deep Blue for structure and hierarchy rather than making every screen a dark dashboard.
- Use Energy Green for important actions and positive emphasis, not as a background for every card.
- Use Sky Blue for secondary emphasis.
- Keep text and data readable.
- Do not rely on color alone to communicate task status, priority, or Focus.
- Avoid decorative 3D, neon, excessive gradients, or heavy shadows.
- Use simple, consistent line icons with visible labels for important navigation and actions.
- Do not replace the BVC identity with ENERIXON product logos. ENERIXON is the parent visual reference, not a reason to rename BVC Task Management.

The exact color tokens, font packaging, contrast pairs, spacing, and component states remain governed by the UI Design System and require Product Owner review.

This section describes visual direction. It is not a substitute for the UI Design System.

### 2.5 Wireframe notation

The following conventions are used:

| Notation | Meaning |
|---|---|
| `[ + Add task ]` | Primary action |
| `[Save]` | Save or confirm an operation |
| `[Cancel]` | Cancel an operation |
| `[Filter]` | Open filtering controls |
| `[Sort]` | Open sorting controls |
| `[Search...]` | Search input |
| `[Status ▾]` | Dropdown or selection control |
| `[☆ Focus]` | User-selected Focus marker |
| `[ ]` | Incomplete checklist item or task |
| `[x]` | Completed item |
| `⋯` | Contextual actions menu |
| `‹ Back` | Return to previous screen |
| `[No project]` | Task without an associated project |

Sample task names and data are illustrative and synthetic.

---

## 3. Responsive application shell and navigation

### 3.1 Responsive layout modes

The application uses the breakpoints established by the Product Definition and Responsive UI Specification.

| Layout mode | Indicative viewport | Main structure |
|---|---:|---|
| Compact | Below 600 CSS px | Single content column, compact header, bottom navigation |
| Medium | 600–1023 CSS px | Navigation rail or compact sidebar; one or two content panes depending on available width |
| Expanded | 1024 CSS px and above | Persistent sidebar, focused main content, optional task-detail panel |

These are starting ranges. Actual layout decisions must also consider usable width, content length, browser zoom, orientation, and split-screen behavior.

### 3.2 Compact navigation — phone

The primary navigation is a bottom navigation bar.

```text
┌──────────────────────────────────┐
│                                  │
│          CURRENT SCREEN          │
│                                  │
│                                  │
│                                  │
├──────────────────────────────────┤
│   My Day   My Tasks   Projects   │
│                         More     │
└──────────────────────────────────┘
```

Required destinations:

1. My Day
2. My Tasks
3. Projects
4. More

Navigation requirements:

- Each destination must have an understandable label.
- The selected destination must be visually identifiable.
- Do not rely on color alone to indicate selection.
- Bottom navigation must respect the device safe area.
- Main content must not be hidden behind the bottom navigation.
- Essential actions must not be available only through a hidden gesture.

### 3.3 Medium navigation — tablet

A navigation rail or compact sidebar may be used when sufficient width is available.

```text
┌────────┬─────────────────────────────────────────┐
│        │                                         │
│  My    │                                         │
│  Day   │                                         │
│        │             CURRENT SCREEN              │
│  My    │                                         │
│ Tasks  │                                         │
│        │                                         │
│  Proj. │                                         │
│        │                                         │
│  More  │                                         │
│        │                                         │
└────────┴─────────────────────────────────────────┘
```

Navigation requirements:

- Keep labels visible where possible.
- Icons alone must not be the only cue for an unfamiliar user.
- Templates and Settings & Backup remain reachable from More unless sufficient width justifies direct access.
- Do not duplicate destinations when they are exposed in a wider layout.
- In narrow split-screen windows, fall back to a compact navigation pattern.

### 3.4 Expanded navigation — laptop and desktop

Use a persistent left sidebar.

```text
┌────────────────────┬─────────────────────────────────────────────┐
│ BVC TASK MANAGEMENT│                                             │
│                    │                                             │
│ MY WORK            │                                             │
│                    │                                             │
│ ◉ My Day           │                                             │
│ □ My Tasks         │              MAIN WORK AREA                 │
│ ▦ Projects         │                                             │
│                    │                                             │
│ ────────────────── │                                             │
│                    │                                             │
│ SUPPORTING TOOLS   │                                             │
│                    │                                             │
│ Templates          │                                             │
│ Settings & Backup  │                                             │
│                    │                                             │
│ Help / Version     │                                             │
└────────────────────┴─────────────────────────────────────────────┘
```

Expanded navigation requirements:

- Persistent navigation provides stable orientation.
- My Day, My Tasks, and Projects remain the primary destinations.
- Templates and Settings & Backup may appear directly in the sidebar.
- Do not show a redundant More destination when all supporting destinations are directly available.
- A selected navigation item must be clearly identifiable.
- The sidebar must not consume so much space that the main work area becomes unusable.

### 3.5 Global application header

The header provides context and primary actions for the current screen.

Typical elements:

- Product name or compact brand mark.
- Current screen title.
- Optional page-specific action.
- Search where relevant.
- Add task action.

The header must not contain:

- Team switcher.
- Invite users.
- Cloud synchronization indicator.
- Account avatar implying registered accounts.
- Organization administration controls.
- Unimplemented notification or AI assistant controls.

---

## 4. My Day — daily work overview

### 4.1 Purpose

My Day is the default landing screen after initial setup.

It helps the user answer:

- What is overdue?
- What must be done today?
- What do I want to focus on?
- What is coming up?
- What useful task can I add?

My Day should remain a working screen, not an analytics dashboard.

### 4.2 Mandatory section order

The order is fixed by current Product Definition v0.2.0, Section 7.2:

1. **Overdue**
2. **Due Today**
3. **Today's Focus**
4. **Upcoming**
5. **Add task**

All phone, tablet, and desktop wireframes must preserve this order.

### 4.3 Task placement rules

A task must appear only once in My Day.

Apply the following rules in priority order:

1. **Overdue:** An active task with a due date before the user's current local calendar date appears in Overdue.
2. **Due Today:** An active task due on the current local calendar date appears in Due Today.
3. **Today's Focus:** An active task marked Focus that is neither overdue nor due today appears in Today's Focus. It may have a future due date or no due date.
4. **Upcoming:** An active future-due task appears in Upcoming only if it has not already been displayed in an earlier section.

Additional rules:

- An overdue task marked Focus stays in Overdue with a Focus marker.
- A task due today and marked Focus stays in Due Today with a Focus marker.
- A future-due task marked Focus appears in Today's Focus, not again in Upcoming.
- A task without a due date marked Focus appears in Today's Focus.
- Completed tasks do not appear in active My Day sections.
- Do not duplicate task cards to show more than one attribute.
- Use labels and metadata on one task card to communicate multiple attributes.

The exact lifetime and reset behavior of the Focus marker remains an open Product Owner decision. The wireframes must not silently approve that behavior.

The exact Upcoming horizon also remains an open Product Owner decision. The proposed value in the journey document is not a frozen product rule.

### 4.4 My Day — phone (compact)

**Reference viewport:** 390 × 844 CSS px.  
The layout must also remain usable at 320 and 360 CSS px.

```text
┌────────────────────────────────────┐
│ BVC Task Management             ⋯  │
│                                    │
│ My Day                             │
│ Tuesday, 3 November                │
│                                    │
│ OVERDUE · 1                        │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare supplier payment     │ │
│ │   Yesterday · High             │ │
│ └────────────────────────────────┘ │
│                                    │
│ DUE TODAY · 3                      │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare weekly sales report  │ │
│ │   Today · High · Focus         │ │
│ ├────────────────────────────────┤ │
│ │ ○ Call supplier about delivery│ │
│ │   Today · Normal               │ │
│ ├────────────────────────────────┤ │
│ │ ○ Review campaign draft        │ │
│ │   Today · Normal               │ │
│ └────────────────────────────────┘ │
│                                    │
│ TODAY'S FOCUS · 1                  │
│ ┌────────────────────────────────┐ │
│ │ ○ Review important proposal    │ │
│ │   Focus · Friday               │ │
│ └────────────────────────────────┘ │
│                                    │
│ UPCOMING                           │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare Friday meeting       │ │
│ │   Thursday · Normal            │ │
│ └────────────────────────────────┘ │
│                                    │
│          [ + Add task ]            │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

#### Phone notes

- Use one column and natural vertical scrolling.
- Do not show an empty Overdue section.
- The task title appears before secondary metadata.
- Due Today appears before Today's Focus.
- A task due today and marked Focus remains in Due Today.
- A future-due Focus task appears in Today's Focus and does not appear again in Upcoming.
- Empty sections should be hidden or shown as short, restrained messages.
- The Add task action must remain reachable without covering the final task or navigation.
- A sticky action area may be used only when it respects safe-area insets.
- Task detail opens as a full-screen view or near-full-height sheet.
- The list must not require horizontal scrolling.

### 4.5 My Day — tablet portrait

**Reference viewport:** approximately 768 × 1024 CSS px.

```text
┌────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                  [ + Add task ] │
├────────┬───────────────────────────────────────────────────────────┤
│        │                                                           │
│  ◉     │ My Day                                                    │
│ My Day │ Tuesday, 3 November                                       │
│        │                                                           │
│  □     │ OVERDUE · 1                                               │
│ Tasks  │ ┌───────────────────────────────────────────────────────┐ │
│        │ │ Prepare supplier payment                     High    │ │
│  ▦     │ └───────────────────────────────────────────────────────┘ │
│ Proj.  │                                                           │
│        │ DUE TODAY · 3                                             │
│  ⋯     │ ┌───────────────────────────────────────────────────────┐ │
│ More   │ │ Prepare weekly sales report             High · Focus  │ │
│        │ │ Call supplier about delivery                  Normal │ │
│        │ │ Review campaign draft                          Normal │ │
│        │ └───────────────────────────────────────────────────────┘ │
│        │                                                           │
│        │ TODAY'S FOCUS · 1                                         │
│        │ ┌───────────────────────────────────────────────────────┐ │
│        │ │ Review important proposal                    Focus   │ │
│        │ └───────────────────────────────────────────────────────┘ │
│        │                                                           │
│        │ UPCOMING                                                  │
│        │ ┌───────────────────────────────────────────────────────┐ │
│        │ │ Prepare Friday meeting                       Thursday│ │
│        │ └───────────────────────────────────────────────────────┘ │
│        │                                                           │
└────────┴───────────────────────────────────────────────────────────┘
```

#### Tablet portrait notes

- Use a navigation rail or compact sidebar.
- Main content remains a readable single column.
- Add task is available in the page header.
- Do not force a permanent task-detail panel into portrait width.
- Task detail opens as a sheet or full-height secondary view.
- Keep the section order consistent with the Product Definition.
- Do not repeat a Focus task in Due Today and Today's Focus.

### 4.6 My Day — tablet landscape

**Reference viewport:** approximately 1024 × 768 CSS px.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                           [ + Add task ]│
├────────────┬────────────────────────────────────────────┬───────────────────┤
│ My Day     │ My Day                                     │ Task preview      │
│ My Tasks   │ Tuesday, 3 November                        │                   │
│ Projects   │                                            │ Prepare weekly     │
│ More       │ OVERDUE · 1                                │ sales report       │
│            │ [ Prepare supplier payment ]               │                   │
│            │                                            │ Due today          │
│            │ DUE TODAY · 3                              │ Priority: High     │
│            │ [ Prepare weekly sales report ]            │ Focus              │
│            │ [ Call supplier about delivery ]           │ Project: Sales     │
│            │ [ Review campaign draft ]                   │                   │
│            │                                            │ [ Open details ]   │
│            │ TODAY'S FOCUS · 1                          │                   │
│            │ [ Review important proposal ]              │                   │
│            │                                            │                   │
│            │ UPCOMING                                   │                   │
│            │ [ Prepare Friday meeting ]                  │                   │
│            │                                            │                   │
└────────────┴────────────────────────────────────────────┴───────────────────┘
```

#### Tablet landscape notes

- A detail preview pane is optional.
- Show the pane only if both the list and detail remain readable.
- If the layout becomes cramped, hide the pane and use the main content area.
- The currently selected task must remain identifiable.
- A task due today and marked Focus stays in Due Today.
- Upcoming must not repeat a task already displayed in an earlier section.

### 4.7 My Day — laptop / desktop

**Reference viewport:** 1440 × 900 CSS px.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                              Search                [ + Add task]│
├──────────────────┬───────────────────────────────────────────┬─────────────────────┤
│ MY WORK          │ My Day                                    │ QUICK VIEW          │
│                  │ Tuesday, 3 November                       │                     │
│ ◉ My Day         │                                           │ Prepare weekly      │
│ □ My Tasks       │ OVERDUE · 1                               │ sales report        │
│ ▦ Projects       │ ┌───────────────────────────────────────┐ │                     │
│                  │ │ Prepare supplier payment       High   │ │ Due today           │
│ ──────────────── │ └───────────────────────────────────────┘ │ Priority: High      │
│                  │                                           │ Focus               │
│ SUPPORTING TOOLS │ DUE TODAY · 3                             │ Project: Sales      │
│                  │ ┌───────────────────────────────────────┐ │                     │
│ Templates        │ │ Prepare weekly sales report   Focus   │ │ [Open details]      │
│ Settings &       │ └───────────────────────────────────────┘ │                     │
│ Backup           │ ┌───────────────────────────────────────┐ │                     │
│ Help / Version   │ │ Call supplier about delivery  Normal  │ │                     │
│                  │ └───────────────────────────────────────┘ │                     │
│                  │ ┌───────────────────────────────────────┐ │                     │
│                  │ │ Review campaign draft          Normal │ │                     │
│                  │ └───────────────────────────────────────┘ │                     │
│                  │                                           │                     │
│                  │ TODAY'S FOCUS · 1                         │                     │
│                  │ [ Review important proposal     Focus ]  │                     │
│                  │                                           │                     │
│                  │ UPCOMING                                  │                     │
│                  │ [ Prepare Friday meeting ]                │                     │
└──────────────────┴───────────────────────────────────────────┴─────────────────────┘
```

#### Desktop notes

- Use a persistent sidebar.
- Keep the main content width readable.
- Do not stretch task lists across the full display.
- Quick View is optional and can be hidden if no task is selected.
- Search and Add task should be easy to reach from the header.
- Remove the right-side pane before compressing the task list below a usable width.
- Maintain the same section order as phone and tablet.
- Do not turn My Day into a large KPI or executive analytics dashboard.

### 4.8 My Day — empty state

```text
┌────────────────────────────────────┐
│ My Day                             │
│ Tuesday, 3 November                │
│                                    │
│                                    │
│          You're all clear          │
│                                    │
│ Nothing needs your attention       │
│ right now.                         │
│                                    │
│ Add a task when something needs    │
│ your attention.                    │
│                                    │
│          [ + Add task ]            │
│                                    │
│ Want a head start?                 │
│ [Browse templates]                 │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

Empty-state requirements:

- Do not display large empty section cards.
- Offer one clear primary action.
- Starter Kit discovery may be offered as a secondary action.
- Do not make the user believe that data has been deleted or lost.

---

## 5. My Tasks — all tasks and task discovery

### 5.1 Purpose

My Tasks is the central place to find and manage all tasks.

It provides:

- Search.
- Filters.
- Sorting.
- List view.
- Optional Kanban view.
- Task creation and editing.
- Access to completed tasks where the selected view includes them.

### 5.2 My Tasks — phone list view

**Reference viewport:** 390 × 844 CSS px.

```text
┌────────────────────────────────────┐
│ My Tasks                      [ + ]│
│                                    │
│ [ Search tasks...              ]   │
│                                    │
│ [Filter]                 [Sort]    │
│                                    │
│ ACTIVE TASKS                       │
│                                    │
│ TO DO · 5                          │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare weekly report        │ │
│ │   Sales · Today · High         │ │
│ │                         ⋯      │ │
│ ├────────────────────────────────┤ │
│ │ ○ Call supplier                │ │
│ │   Operations · Tomorrow        │ │
│ │                         ⋯      │ │
│ └────────────────────────────────┘ │
│                                    │
│ IN PROGRESS · 2                    │
│ ┌────────────────────────────────┐ │
│ │ ○ Review campaign draft        │ │
│ │   Marketing · Friday           │ │
│ └────────────────────────────────┘ │
│                                    │
│ DONE · 4                           │
│ ┌────────────────────────────────┐ │
│ │ ✓ Update product list          │ │
│ │   Shop Operations              │ │
│ └────────────────────────────────┘ │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

### 5.3 My Tasks — tablet and desktop list view

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ My Tasks                                                [ + Add task ]      │
│                                                                            │
│ [ Search tasks... ]                                                        │
│                                                                            │
│ [Status ▾] [Priority ▾] [Due date ▾] [Project ▾]       [Clear all]         │
│                                                                            │
│ Active filters: [Status: To Do ×] [Priority: High ×]                       │
│                                                                            │
│ [ List ] [ Kanban ]                                     Sort: Due date ▾   │
├────────────────────────────────────────────────────────────────────────────┤
│ STATUS       TASK                          PROJECT       DUE          PRIORITY│
├────────────────────────────────────────────────────────────────────────────┤
│ ○ To Do      Prepare weekly report         Sales         Today        High  │
│ ○ To Do      Call supplier                 Operations    Tomorrow     Normal│
│ ○ Progress   Review campaign draft         Marketing     Friday       Normal│
│ ✓ Done       Update product list           Shop          Completed    Normal│
└────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 My Tasks interactions

- Search by task title and notes where supported.
- Filters include status, priority, due date, and project.
- Active filters remain visible as removable chips or an equivalent summary.
- Clear all resets the active search and filters through one explicit action.
- Sort by due date, priority, or recently updated where supported.
- Task rows show the task title first.
- Status, due date, priority, Focus, and project appear as secondary information.
- Completed tasks remain findable when the selected filter includes Done.
- Opening task detail preserves the previous search, filters, sort, and scroll context where practical.
- Search and filters must not silently modify task data.

### 5.5 Filter panel — phone

```text
┌────────────────────────────────────┐
│ Filters                       [ × ]│
│                                    │
│ STATUS                             │
│ [ ] To Do                          │
│ [ ] In Progress                    │
│ [ ] Done                           │
│                                    │
│ PRIORITY                           │
│ [ ] Low                            │
│ [ ] Normal                         │
│ [ ] High                           │
│                                    │
│ DUE DATE                           │
│ [Any date                      ▾ ] │
│                                    │
│ PROJECT                            │
│ [All projects                  ▾ ] │
│                                    │
│ [Clear all]        [Apply filters] │
└────────────────────────────────────┘
```

Filter panel requirements:

- Show all selected filter values.
- Provide an explicit Apply action where needed.
- Provide an explicit Clear all action.
- Do not require swipe gestures to remove a filter.
- Preserve the task list context when the panel closes.

---

## 6. My Tasks — Kanban view

### 6.1 Purpose

Kanban provides an optional visual way to organize tasks by status.

The three columns are:

- To Do.
- In Progress.
- Done.

Kanban is an enhancement, not the only way to manage status.

### 6.2 Tablet / desktop Kanban

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ My Tasks                                        [List] [Kanban] [ + Add task]│
│                                                                              │
│ [ Search tasks... ]                     [Priority ▾] [Project ▾]             │
├──────────────────────┬──────────────────────┬────────────────────────────────┤
│ TO DO · 5            │ IN PROGRESS · 2      │ DONE · 4                       │
│                      │                      │                                │
│ ┌──────────────────┐ │ ┌──────────────────┐ │ ┌────────────────────────────┐ │
│ │ Prepare weekly   │ │ │ Review campaign  │ │ │ Update product list       │ │
│ │ report           │ │ │ draft            │ │ │                            │ │
│ │ Sales · High     │ │ │ Marketing        │ │ │ Shop Operations            │ │
│ │ Today            │ │ │ Friday           │ │ │ Completed                  │ │
│ │             ⋯    │ │ │             ⋯    │ │ │                       ⋯    │ │
│ └──────────────────┘ │ └──────────────────┘ │ └────────────────────────────┘ │
│                      │                      │                                │
│ ┌──────────────────┐ │                      │ ┌────────────────────────────┐ │
│ │ Call supplier    │ │                      │ │ Prepare monthly report    │ │
│ │ Operations       │ │                      │ │ Sales                      │ │
│ │ Tomorrow         │ │                      │ │ Completed                  │ │
│ └──────────────────┘ │                      │ └────────────────────────────┘ │
│                      │                      │                                │
└──────────────────────┴──────────────────────┴────────────────────────────────┘
```

### 6.3 Kanban interaction rules

- Kanban is displayed only when columns remain readable.
- Task status may be changed by drag-and-drop where appropriate.
- Each task must also offer a non-drag status menu/button.
- Status changes must work with keyboard and touch.
- A successful status change must persist before the UI shows confirmation.
- The user must receive feedback when a task moves between columns.
- A failed save must preserve the previous task status or clearly explain the failure.

### 6.4 Kanban — compact phone

On compact phone screens, List view is the default.

If a Kanban-related status operation is offered on a phone, it should be a simple status selector rather than three narrow side-by-side columns.

```text
┌────────────────────────────────────┐
│ Task details                       │
│                                    │
│ Status                             │
│ [To Do                          ▾ ]│
│                                    │
│ Move to:                           │
│ [To Do]                            │
│ [In Progress]                      │
│ [Done]                             │
│                                    │
│ [Cancel]                  [Save]   │
└────────────────────────────────────┘
```

Do not require horizontal dragging across narrow columns.

---

## 7. Quick Add Task

### 7.1 Purpose

Quick Add provides the shortest path from an idea to a saved task.

The only required field is the task title.

### 7.2 Quick Add — phone sheet

```text
┌────────────────────────────────────┐
│ Add task                       [ × ]│
│                                    │
│ TASK TITLE *                       │
│ ┌────────────────────────────────┐ │
│ │ What needs to be done?         │ │
│ └────────────────────────────────┘ │
│                                    │
│ [ + Add details ]                  │
│                                    │
│                                    │
│                                    │
│                     [ Save task ]  │
└────────────────────────────────────┘
```

### 7.3 Expanded task details

When the user chooses Add details:

```text
┌────────────────────────────────────┐
│ Add task                       [ × ]│
│                                    │
│ TASK TITLE *                       │
│ [ Prepare weekly sales report    ] │
│                                    │
│ DUE DATE                           │
│ [ No date                       ▾ ]│
│                                    │
│ PRIORITY                           │
│ [ Normal                        ▾ ]│
│                                    │
│ PROJECT                            │
│ [ No project                    ▾ ]│
│                                    │
│ RESPONSIBLE PERSON                 │
│ [ Optional                      ]  │
│                                    │
│ NOTES                              │
│ [ Add a note...                 ]  │
│                                    │
│ CHECKLIST                          │
│ [ + Add checklist item ]           │
│                                    │
│ [Cancel]                 [Save task]│
└────────────────────────────────────┘
```

### 7.4 Default values

| Field | Default |
|---|---|
| Title | Required from user |
| Status | To Do |
| Priority | Normal |
| Due date | Empty |
| Project | None |
| Responsible person | Empty |
| Notes | Empty |
| Checklist | No items |

If Quick Add is launched from a Project detail screen, the project may be preselected.

### 7.5 Quick Add states

**Blank title**

```text
TASK TITLE *
[                                ]

Enter a task title to continue.

[Cancel]                 [Save task]
```

**Saving**

```text
[Saving task...]

Please wait.
```

Prevent repeated submission while saving.

**Save failed**

```text
Unable to save this task.

Your entered information is still available.
Please try again.

[Retry]                    [Cancel]
```

Requirements:

- Preserve entered content after validation or persistence errors.
- Show confirmation only after persistence succeeds.
- Keep the Save action visible when the phone keyboard is open.
- Do not require optional information before saving.
- Do not silently discard an unfinished task form.

---

## 8. Task Detail

### 8.1 Purpose

Task Detail provides access to the full information associated with one task.

It must remain understandable to users who are not familiar with project-management software.

### 8.2 Task Detail — phone

```text
┌────────────────────────────────────┐
│ ‹ Back                 Task details│
│                                    │
│ PREPARE WEEKLY SALES REPORT        │
│                                    │
│ STATUS                             │
│ [ To Do                         ▾ ]│
│                                    │
│ PRIORITY                           │
│ [ High                          ▾ ]│
│                                    │
│ DUE DATE                           │
│ [ Today                         ▾ ]│
│                                    │
│ FOCUS                              │
│ [ ★ Mark as today's focus       ]  │
│                                    │
│ PROJECT                            │
│ [ Sales                         ▾ ]│
│                                    │
│ RESPONSIBLE PERSON                 │
│ [ Optional                      ]  │
│                                    │
│ NOTES                              │
│ Review this week's sales activity. │
│                                    │
│ CHECKLIST                          │
│ [ ] Collect figures                │
│ [ ] Review results                 │
│ [ ] Prepare summary                │
│ [ + Add checklist item ]           │
│                                    │
│ [Delete]                  [Save]   │
└────────────────────────────────────┘
```

### 8.3 Task Detail — tablet

```text
┌────────────────────────────────────────────────────────────────────┐
│ ‹ Back to My Tasks                                  Task details    │
├───────────────────────────────────────┬────────────────────────────┤
│ TASK INFORMATION                      │ TASK ACTIONS               │
│                                       │                            │
│ Prepare weekly sales report           │ Status                     │
│                                       │ [To Do ▾]                  │
│ Notes                                 │                            │
│ Review this week's sales activity.    │ Priority                   │
│                                       │ [High ▾]                   │
│ Checklist                             │                            │
│ [ ] Collect figures                   │ Due date                   │
│ [ ] Review results                    │ [Today ▾]                  │
│ [ ] Prepare summary                   │                            │
│                                       │ [★ Focus]                  │
│ [ + Add checklist item ]              │                            │
│                                       │ [Delete]       [Save]      │
└───────────────────────────────────────┴────────────────────────────┘
```

This two-pane layout is optional. If the tablet viewport is too narrow, use the phone-style detail sheet.

### 8.4 Task Detail — desktop side panel

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ My Tasks                                                   [ + Add task ]  │
├──────────────────────────────────────┬─────────────────────────────────────┤
│ TASK LIST                            │ TASK DETAIL                          │
│                                      │                                     │
│ [ Search tasks... ]                  │ Prepare weekly sales report          │
│                                      │                                     │
│ ○ Prepare weekly sales report        │ Status       [To Do ▾]               │
│   Sales · Today · High               │ Priority     [High ▾]                 │
│                                      │ Due date     [Today ▾]                │
│ ○ Call supplier                      │ Focus        [★ Mark as Focus]        │
│   Operations · Tomorrow              │ Project      [Sales ▾]                │
│                                      │ Responsible  [Optional]              │
│ ○ Review campaign draft              │                                     │
│   Marketing · Friday                 │ Notes                                │
│                                      │ Review this week's sales activity.   │
│                                      │                                     │
│                                      │ Checklist                            │
│                                      │ [ ] Collect figures                  │
│                                      │ [ ] Review results                   │
│                                      │ [ ] Prepare summary                  │
│                                      │                                     │
│                                      │ [Delete]              [Save changes] │
└──────────────────────────────────────┴─────────────────────────────────────┘
```

### 8.5 Task Detail behavior

- Show the task title clearly.
- Show status, priority, due date, project, and Focus where applicable.
- Responsible person is free text; it does not create a user account or team assignment.
- Notes and checklist are optional.
- Save changes explicitly unless an interaction has a reviewed immediate-save behavior.
- Warn before leaving with unsaved changes.
- Return to the previous screen and preserve search/filter/scroll context where practical.
- Provide a visible Delete action with confirmation.
- Mark as Done must be available without drag-and-drop.
- Focus is a marker, not a task status or priority.

---

## 9. Projects

### 9.1 Purpose

Projects group related tasks by project or work area.

A project is optional. A standalone task remains valid even when it is not linked to any project.

### 9.2 Projects — phone list

```text
┌────────────────────────────────────┐
│ Projects                      [ + ]│
│                                    │
│ Manage related tasks in one place. │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Sales                          │ │
│ │ 8 tasks · 3 done               │ │
│ │                           ⋯    │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Marketing                      │ │
│ │ 5 tasks · 2 done               │ │
│ │                           ⋯    │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Store Operations               │ │
│ │ 6 tasks · 4 done               │ │
│ │                           ⋯    │ │
│ └────────────────────────────────┘ │
│                                    │
│ [ + New project ]                  │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

### 9.3 Projects — tablet / desktop

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Projects                                              [ + New project ]     │
│                                                                            │
│ Group tasks by project or work area.                                       │
│                                                                            │
│ PROJECT              DESCRIPTION              TASKS             COMPLETION │
│                                                                            │
│ Sales                Sales and follow-up      8 tasks           3 done     │
│ Marketing            Campaigns and content    5 tasks           2 done     │
│ Store Operations     Daily store work         6 tasks           4 done     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 9.4 Project Detail — phone

```text
┌────────────────────────────────────┐
│ ‹ Projects                ⋯        │
│                                    │
│ SALES                              │
│ Sales activities and follow-ups.   │
│                                    │
│ 8 Tasks                            │
│ 3 Completed                        │
│                                    │
│ [ + Add task ]                     │
│                                    │
│ TO DO                              │
│ [ ] Prepare weekly report          │
│ [ ] Call customer                  │
│                                    │
│ IN PROGRESS                        │
│ [ ] Prepare proposal               │
│                                    │
│ DONE                               │
│ [x] Update customer list           │
│                                    │
│ [Edit project]                     │
└────────────────────────────────────┘
```

### 9.5 Project Detail — tablet / desktop

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ ‹ Projects                                                                  │
│                                                                            │
│ Sales                                             [Edit project]           │
│ Sales activities and follow-ups.                                           │
│                                                                            │
│ 8 Tasks                   3 Completed                 5 Remaining           │
│                                                                            │
│ [ + Add task ]                                                             │
│                                                                            │
│ [Status ▾] [Priority ▾] [Due date ▾]                      [Sort ▾]          │
│                                                                            │
│ ○ Prepare weekly report               Today              High              │
│ ○ Call customer                       Tomorrow           Normal            │
│ ○ Prepare proposal                    Friday             High              │
│ ✓ Update customer list                Completed          Normal            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 9.6 Create / Edit Project

```text
┌────────────────────────────────────┐
│ New project                    [ × ]│
│                                    │
│ PROJECT NAME *                     │
│ [ Enter project name             ] │
│                                    │
│ DESCRIPTION                        │
│ [ Optional description           ] │
│                                    │
│                                    │
│ [Cancel]               [Save project]│
└────────────────────────────────────┘
```

Requirements:

- Project name is required.
- Description is optional.
- Tasks may remain unassigned.
- A project detail page must show its associated tasks.
- Keep project-management features simple.

### 9.7 Project removal confirmation

The Product Definition does not fully specify the effect of project removal on associated tasks.

The current safety proposal is to preserve the tasks and detach them to No project. This remains subject to Product Owner approval.

```text
┌────────────────────────────────────┐
│ Remove this project?               │
│                                    │
│ Sales                              │
│                                    │
│ This project will be removed.      │
│ Associated tasks will be preserved │
│ and become unassigned.             │
│                                    │
│ [Cancel]              [Remove]     │
└────────────────────────────────────┘
```

Do not implement cascade deletion of associated tasks without an explicit, separately reviewed product decision.

---

## 10. Templates — Role Starter Kits

### 10.1 Purpose

Starter Kits provide editable starting configurations for common work contexts.

They are not separate products, authenticated user roles, permission systems, or industry-specific management suites.

### 10.2 Starter Kit gallery — phone

```text
┌────────────────────────────────────┐
│ Templates                          │
│                                    │
│ Choose a starting point for your   │
│ kind of work.                      │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Personal Work                  │ │
│ │ Everyday tasks and routines    │ │
│ │ [Preview]                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Sales Team Lead                │ │
│ │ Follow-ups and proposals       │ │
│ │ [Preview]                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Marketing Manager              │ │
│ │ Campaigns and content          │ │
│ │ [Preview]                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ CEO / Executive                │ │
│ │ Priorities and decisions       │ │
│ │ [Preview]                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ [More starter kits]                │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

### 10.3 Starter Kit gallery — tablet / desktop

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Templates                                                                  │
│ Choose a starting point for the kind of work you do.                       │
│                                                                            │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐       │
│ │ Personal Work      │ │ Sales Team Lead    │ │ Marketing Manager  │       │
│ │                    │ │                    │ │                    │       │
│ │ Everyday tasks     │ │ Follow-ups         │ │ Campaigns          │       │
│ │ [Preview]          │ │ [Preview]          │ │ [Preview]           │       │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘       │
│                                                                            │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐       │
│ │ CEO / Executive    │ │ Shop Owner         │ │ Restaurant Owner   │       │
│ │                    │ │                    │ │                    │       │
│ │ Priorities         │ │ Store operations   │ │ Daily operations   │       │
│ │ [Preview]          │ │ [Preview]          │ │ [Preview]           │       │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘       │
│                                                                            │
│ ┌────────────────────┐                                                    │
│ │ Project Manager    │                                                    │
│ │                    │                                                    │
│ │ Project actions    │                                                    │
│ │ [Preview]          │                                                    │
│ └────────────────────┘                                                    │
└────────────────────────────────────────────────────────────────────────────┘
```

The initial Role Starter Kit contexts are:

1. Individual / Personal.
2. Sales Team Lead.
3. Marketing Manager.
4. CEO / Executive.
5. Shop Owner.
6. Restaurant Owner.
7. Project Manager.

### 10.4 Starter Kit preview

```text
┌──────────────────────────────────────────────────────────────────────┐
│ ‹ Templates                                      Marketing Manager  │
│                                                                      │
│ MARKETING MANAGER                                                    │
│ Organize marketing activities and follow-ups.                        │
│                                                                      │
│ INCLUDES                                                             │
│                                                                      │
│ Groups                                                               │
│ • Campaigns                                                          │
│ • Content                                                            │
│ • Social Media                                                       │
│ • Events                                                             │
│ • Reports                                                            │
│                                                                      │
│ Reusable checklist templates                                         │
│ • Campaign launch checklist                                          │
│ • Content review checklist                                           │
│                                                                      │
│ Optional example tasks                                               │
│ • Prepare campaign plan                                              │
│ • Review content calendar                                            │
│                                                                      │
│                                                                      │
│ [Back]                                  [Apply this starter kit]      │
└──────────────────────────────────────────────────────────────────────┘
```

### 10.5 Apply Starter Kit to an existing workspace

```text
┌────────────────────────────────────┐
│ Apply starter kit?                 │
│                                    │
│ Marketing Manager                  │
│                                    │
│ This starter kit will add selected │
│ groups, reusable checklists, and   │
│ optional example tasks.           │
│                                    │
│ Your existing tasks and projects   │
│ will not be silently replaced.     │
│                                    │
│ [Cancel]                 [Apply]   │
└────────────────────────────────────┘
```

### 10.6 Application result

```text
┌────────────────────────────────────┐
│ Starter kit applied                │
│                                    │
│ Added                              │
│ • 5 groups                         │
│ • 2 checklist templates            │
│ • 4 example tasks                  │
│                                    │
│ Skipped                            │
│ • 1 existing template item         │
│                                    │
│ Your workspace is ready.           │
│                                    │
│ [View My Day]                      │
│ [Review added items]               │
└────────────────────────────────────┘
```

The exact duplicate-detection and merge strategy remains a Phase 3.2 architecture decision. The user-facing promise is that applying a Starter Kit must not silently destroy existing user-created data.

---

## 11. More — Supporting tools

### 11.1 More menu — phone

```text
┌────────────────────────────────────┐
│ More                               │
│                                    │
│ SUPPORTING TOOLS                   │
│                                    │
│ [ Templates                   → ]  │
│                                    │
│ [ Settings & Backup           → ]  │
│                                    │
│ [ Help & Version              → ]  │
│                                    │
│                                    │
│                                    │
├────────────────────────────────────┤
│ My Day  My Tasks  Projects  More   │
└────────────────────────────────────┘
```

On wider screens, Templates and Settings & Backup may appear directly in the sidebar.

### 11.2 Settings & Backup

Purpose:

- Explain where the workspace is stored.
- Provide export and restore actions.
- Show basic preferences and help/version information.

### 11.3 Settings & Backup — phone

```text
┌────────────────────────────────────┐
│ ‹ More                Settings     │
│                                    │
│ YOUR DATA                          │
│                                    │
│ Beginner: stored in this browser  │
│ profile; no automatic device sync.│
│                                    │
│ Intermediate/Advanced: saved to   │
│ your signed-in personal workspace.│
│                                    │
│ [Export backup]                   │
│                                    │
│ [Restore from backup]              │
│                                    │
│ ────────────────────────────────── │
│                                    │
│ PREFERENCES                       │
│                                    │
│ Selected starter kit              │
│ [Marketing Manager             ▾ ]│
│                                    │
│ ────────────────────────────────── │
│                                    │
│ HELP & VERSION                    │
│                                    │
│ About this app                    │
│ Version information              │
│                                    │
└────────────────────────────────────┘
```

### 11.4 Settings & Backup — desktop

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Settings & Backup                                                          │
│                                                                            │
│ YOUR DATA                                                                  │
│                                                                            │
│ Beginner: stored in this browser profile; no automatic device sync.        │
│ Intermediate/Advanced: saved to your signed-in personal workspace.          │
│                                                                            │
│ [Export backup]                         [Restore from backup]               │
│                                                                            │
│ ────────────────────────────────────────────────────────────────────────── │
│                                                                            │
│ PREFERENCES                                                                │
│                                                                            │
│ Selected Starter Kit                     [Marketing Manager ▾]             │
│                                                                            │
│ ────────────────────────────────────────────────────────────────────────── │
│                                                                            │
│ HELP & VERSION                                                             │
│                                                                            │
│ About this app · Version information                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

### 11.5 Export backup

```text
┌────────────────────────────────────┐
│ Export workspace backup            │
│                                    │
│ Your current workspace will be     │
│ prepared as a portable backup file.│
│                                    │
│ The browser will start downloading │
│ the file.                          │
│                                    │
│ [Cancel]              [Export]     │
└────────────────────────────────────┘
```

After export is initiated:

```text
Backup export initiated.

Your browser has been asked to download
the backup file.

Choose a safe location to keep this file.
```

The application must not claim that the user stored the downloaded file in a safe location. The browser controls the download destination.

### 11.6 Restore backup — file selection

```text
┌────────────────────────────────────┐
│ Restore workspace                  │
│                                    │
│ Choose a compatible backup file.   │
│                                    │
│ [Choose backup file]               │
│                                    │
│ Supported format: versioned JSON   │
│                                    │
│ [Cancel]                            │
└────────────────────────────────────┘
```

### 11.7 Restore validation result

Invalid backup:

```text
┌────────────────────────────────────┐
│ Backup could not be used           │
│                                    │
│ The file is invalid or uses an     │
│ unsupported format/version.       │
│                                    │
│ Your current workspace is          │
│ unchanged.                         │
│                                    │
│ [Choose another file]              │
│ [Cancel]                           │
└────────────────────────────────────┘
```

Valid backup:

```text
┌────────────────────────────────────┐
│ Backup ready to restore            │
│                                    │
│ The backup file has passed         │
│ validation.                        │
│                                    │
│ Restoring may replace your current │
│ workspace on this device.          │
│                                    │
│ Export your current workspace      │
│ first if you may need it later.    │
│                                    │
│ [Cancel]               [Continue] │
└────────────────────────────────────┘
```

### 11.8 Restore confirmation

```text
┌────────────────────────────────────┐
│ Replace current workspace?         │
│                                    │
│ Restoring this backup will replace │
│ the current workspace on this      │
│ device.                            │
│                                    │
│ This operation must not start      │
│ without your confirmation.         │
│                                    │
│ [Cancel]             [Restore]     │
└────────────────────────────────────┘
```

After a successful restore:

```text
Workspace restored successfully.

Your restored tasks and projects
are now available.

[Open My Day]
```

A failed restore must preserve or recover the previous workspace where technically possible and must never display a false success state.

---

## 12. Empty, loading, error, and confirmation states

Important states must be designed as part of the screen, not left entirely to implementation.

### 12.1 Empty My Tasks

```text
┌────────────────────────────────────┐
│ My Tasks                           │
│                                    │
│                                    │
│ No tasks yet                       │
│                                    │
│ Add a task to start organizing     │
│ your work.                         │
│                                    │
│          [ + Add task ]            │
│                                    │
└────────────────────────────────────┘
```

### 12.2 No search results

```text
┌────────────────────────────────────┐
│ My Tasks                           │
│ [ Search: supplier              ]  │
│                                    │
│ No tasks match this search.        │
│                                    │
│ Try another word or clear filters. │
│                                    │
│ [Clear search and filters]         │
└────────────────────────────────────┘
```

### 12.3 No tasks due today

```text
My Day

You're clear for today.

No tasks are due today.

[View My Tasks]
[+ Add task]
```

This state does not mean the entire workspace is empty. Overdue, Focus, or Upcoming sections may still contain tasks.

### 12.4 Project list empty

```text
Projects

No projects yet.

You can keep tasks unassigned or
create a project to group related work.

[+ New project]
```

### 12.5 Starter Kit not selected

```text
Templates

Start with a blank workspace or
choose a starter kit for your kind of work.

[Browse starter kits]
```

### 12.6 Loading state

```text
Loading...

Please wait.
```

Use a restrained loading indicator. Avoid large decorative animations.

### 12.7 Save failure

```text
Unable to save changes.

Your existing information has been
preserved where possible.

Please retry.
```

Do not show success until the operation has actually succeeded.

### 12.8 Delete task confirmation

```text
Delete this task?

"Prepare weekly sales report" will be
removed from this workspace.

This action may not be reversible.

[Cancel]                         [Delete task]
```

### 12.9 Unsaved changes confirmation

```text
You have unsaved changes.

What would you like to do?

[Continue editing]
[Discard changes]
```

The user must not lose typed content by accidentally closing a detail sheet or form.

### 12.10 Storage error

```text
Unable to save your workspace.

The browser may not be able to complete
the storage operation.

Your latest changes may not have been saved.

[Retry]
[Review information]
```

Do not claim the data is safely stored if persistence has failed.

### 12.11 Destructive action feedback

Every destructive action must:

- Identify what will be removed or changed.
- Explain the effect on related data where relevant.
- Offer a clear Cancel action.
- Require explicit confirmation or provide a reliable undo path.
- Provide truthful feedback after the operation completes.

---

## 13. Responsive behavior and viewport validation

### 13.1 Phone validation

| Viewport | Expected layout |
|---|---|
| 320 × variable height | Compact single-column layout |
| 360 × variable height | Compact single-column layout |
| 390 × variable height | Standard compact layout |

Phone checks:

- No essential horizontal scrolling.
- Task titles wrap without clipping.
- Buttons remain reachable.
- Bottom navigation does not cover content.
- Add/Edit Task remains usable when the keyboard opens.
- Sheets and dialogs remain usable at short viewport heights.
- Controls remain touch-friendly.

### 13.2 Tablet validation

| Viewport | Expected layout |
|---|---|
| 768 × 1024 | Tablet portrait |
| 820 × 1180 | Tablet portrait / adaptable medium |
| 1024 × 768 | Tablet landscape / expanded boundary |

Tablet checks:

- Navigation rail or compact sidebar works without crowding content.
- Portrait uses a readable single main column.
- Landscape may use list plus detail where both remain usable.
- Split-screen resizing preserves selected task and unsaved input.
- Avoid forcing desktop three-column layouts into a narrow tablet.

### 13.3 Laptop and desktop validation

| Viewport | Expected layout |
|---|---|
| 1280 × 800 | Expanded layout |
| 1440 × 900 | Standard desktop layout |
| 1920 × 1080 | Wider desktop layout with controlled content width |

Desktop checks:

- Persistent sidebar.
- Readable main content width.
- Optional right-side task detail panel.
- Kanban columns remain readable.
- Search, filters, and Add task are reachable.
- Side panels collapse before the central work area becomes too narrow.

### 13.4 Resize and orientation behavior

- Layout decisions are based on available viewport width, not user-agent or device-model detection.
- Changing orientation must not lose task input.
- Split-screen resizing must not silently reset the current screen.
- Browser zoom and text enlargement must not hide important actions.
- Focus must remain visible and must not be lost during responsive reflow.
- The selected navigation destination must remain consistent after resizing.

---

## 14. Accessibility and usability requirements

These wireframes must be implementable with touch, keyboard, mouse, and assistive technology.

### 14.1 Navigation

- Important navigation items include visible text labels.
- The current destination has a clear selected state.
- Keyboard focus is visible.
- Navigation order follows a logical reading order.

### 14.2 Task actions

- Complete, edit, delete, and Focus actions must have understandable labels or accessible names.
- Important actions must not be available only through an unlabeled icon.
- Drag-and-drop has an explicit non-drag alternative.
- Destructive actions are separated from Save and Complete.

### 14.3 Forms

- Each field has a persistent label.
- Required fields are clearly identified.
- Placeholder text is not the only label.
- Validation errors are presented in text.
- Entered values are preserved when validation or storage errors occur.
- Date controls work with keyboard and touch.

### 14.4 Visual accessibility

- Text and controls use readable contrast.
- Status and priority do not rely on color alone.
- Text size can increase without hiding essential controls.
- Focus indicators remain visible.
- Motion is restrained and respects reduced-motion preferences.

### 14.5 Touch usability

- Primary controls aim for approximately 44 × 44 CSS px where practical.
- Controls have adequate spacing.
- No essential action requires hover or long-press.
- Avoid tightly packed destructive and non-destructive controls.

This document describes accessibility expectations. It does not claim that an unimplemented application conforms to WCAG.

---

## 15. UI content and terminology

Use familiar, action-oriented language.

| Prefer | Avoid in primary UI |
|---|---|
| Add task | Create work item entity |
| Due date | Temporal constraint |
| Priority | Execution rank |
| Project | Work package identifier |
| Save backup | Serialize workspace |
| Restore backup | Import persistence snapshot |
| Stored on this device | Browser origin storage |
| Today's Focus | AI-selected priority |

Use consistent capitalization and labels for:

- My Day
- My Tasks
- Projects
- Templates
- Settings & Backup
- Add task
- Save task
- Mark as done
- Today's Focus
- Overdue
- Due Today
- Upcoming

The initial public UI may use English labels. Keep text structured so localization can be added without rewriting product logic.

---

## 16. Visual consistency and design-system relationship

These wireframes define screen structure and content priority.

The UI Design System remains responsible for:

- Exact color tokens.
- Font packaging and font weights.
- Spacing scale.
- Border radius.
- Elevation and shadow rules.
- Icon stroke and sizing.
- Button and input variants.
- Focus, hover, disabled, error, and success states.
- Color contrast verification.
- Light/dark theme decisions.

The proposed ENERIXON-inspired direction should be adapted for BVC's everyday productivity context.

Do not use the wireframes as justification to introduce a new product feature or silently change a Product Definition requirement.

The PNG and SVG files are visual reference assets. If they differ from this document or current Product Definition v0.2.0 in task placement or content order, Product Definition v0.2.0 and approved UX documents take precedence. Visual assets should be updated during the visual-design review when required.

---

## 17. Out of scope

These wireframes do not define or authorize:

- Multi-user team workspaces, team collaboration, invitations or team roles.
- A new identity/permission model beyond the personal Supabase Auth account in Intermediate/Advanced.
- Shared tasks or cross-user data access.
- Provider-specific hosting commitments or paid infrastructure selections.

Beginner remains browser-profile based and does not automatically synchronize across devices. Intermediate/Advanced use the Supabase personal workspace specified by Product Definition v0.2.0.
- CRM, POS, inventory, payroll, accounting, HR, or ERP features.
- Gantt charts, project dependencies, resource planning, or portfolio management.
- AI chatbot or AI Agent inside the application.
- Automatic task creation or autonomous task changes.
- Native iOS or Android applications.
- Guaranteed offline or PWA behavior.
- Final backend architecture or database schema.
- Final production deployment.

Provider-specific deployment details remain subject to the provider-neutral Phase 3.2 architecture and Phase 3.3 verification gates.

---

## 18. Open decisions and implementation boundaries

The following decisions remain subject to Product Owner review and must not be treated as approved merely because a wireframe shows an example. Canonical status and aliases are maintained in the [Product/UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md).

| ID | Decision | Current proposal | Status |
|---|---|---|---|
| DEC-UX-001 | Upcoming horizon | Next seven calendar days | OPEN |
| DEC-UX-002 | Today's Focus reset | Marker scoped to current local date | OPEN |
| DEC-UX-003 | Project removal | Preserve tasks; detach to No project | OPEN |
| DEC-UX-004 | Reapplying a starter kit | Skip recognized items; show summary | OPEN |
| DEC-UX-005 | First-use disclosure | Before first meaningful data entry | OPEN |
| DEC-UX-006 | Initial visual theme | Calm light theme; dark theme deferred | OPEN |
| DEC-UX-007 | Proposed primary palette | Review ENERIXON-inspired tokens and contrast in rendered UI | OPEN |
| DEC-UX-008 | Browser support matrix | Confirm against target users and Phase 3.3 test evidence | OPEN |

The sample task names and section counts in these wireframes are illustrative, not fixed product data.

Final date/time behavior, persistence rules, storage, backup format, browser support, and technical implementation belong to later architecture and implementation work.

---

## 19. Traceability to Product Definition

The wireframes support the current Product Definition v0.2.0 requirements below. FR numbering is intentionally rebuilt against v0.2.0; the former v0.1.0 mappings are not authoritative.

| Product Definition v0.2.0 | Wireframe coverage |
|---|---|
| FR-001 | First-use choice: blank workspace or previewable Starter Kit |
| FR-002 | Quick Add Task with title only |
| FR-003 | Task detail, view/edit/complete/delete and feedback |
| FR-004–FR-006 | Status, priority and due-date controls |
| FR-007–FR-008 | Project grouping and valid unassigned tasks |
| FR-009 | Notes and checklist |
| FR-010 | My Day placement and no duplicate task rows |
| FR-011–FR-013 | List/Kanban and non-drag status alternatives |
| FR-014 | Search and filters |
| FR-015–FR-016 | Starter Kit preview/application and protection of existing data |
| FR-017–FR-018 | Beginner browser workspace and versioned JSON export/import disclosures |
| FR-024 | Level-specific storage/access disclosure |
| FR-025 | Loading, success, validation, empty and error states |

FR-019–FR-023 concern Supabase identity/data security, migration and Advanced engineering/deployment workflow. They are not screen behaviors proven by these structural wireframes; they require separate implementation and security evidence.

The corresponding Product Definition v0.2.0 AC-001–AC-036 remain the authoritative product acceptance baseline. These wireframes do not prove those criteria pass.

---

## 20. Wireframe review checklist

Before Phase 3.1 can be accepted, review the following:

### Information architecture

- [ ] My Day, My Tasks, Projects, and More are consistently represented.
- [ ] Templates and Settings & Backup are reachable at every supported layout.
- [ ] Navigation changes appropriately between compact, medium, and expanded modes.
- [ ] No duplicate or conflicting navigation destination is introduced.

### My Day

- [ ] Phone, tablet portrait, tablet landscape, and desktop show the same section order.
- [ ] The order is Overdue, Due Today, Today's Focus, Upcoming, Add task.
- [ ] A task due today and marked Focus remains in Due Today with a Focus marker.
- [ ] A future-due Focus task appears in Today's Focus, not again in Upcoming.
- [ ] No active task appears twice in My Day.
- [ ] Empty sections do not become large empty cards.
- [ ] Add task remains accessible.

### My Tasks

- [ ] List view is usable on phone, tablet, and desktop.
- [ ] Search and filters are visible and understandable.
- [ ] Active filters can be cleared.
- [ ] Completed tasks remain accessible through the appropriate view/filter.
- [ ] Opening task detail preserves list context.

### Kanban

- [ ] Kanban appears only when columns remain readable.
- [ ] To Do, In Progress, and Done are represented.
- [ ] Every drag operation has a non-drag alternative.
- [ ] Keyboard and touch users can change status.

### Tasks and projects

- [ ] Quick Add requires only a task title.
- [ ] Optional fields are not forced on first use.
- [ ] Task Detail covers status, priority, due date, project, Focus, notes, and checklist.
- [ ] Tasks without a project remain valid.
- [ ] Project removal does not silently delete tasks.
- [ ] Unsaved changes and destructive actions are handled clearly.

### Starter Kits

- [ ] All seven initial work contexts are represented.
- [ ] A Starter Kit can be previewed before application.
- [ ] Applying a kit explains what will be added.
- [ ] Existing user-created data is not silently overwritten.
- [ ] The result state shows what was added or skipped.

### Settings and backup

- [ ] Local-data disclosure is clear.
- [ ] Export backup is reachable.
- [ ] Restore validates before replacing current data.
- [ ] Restore requires explicit confirmation.
- [ ] Invalid restore preserves existing data or leaves it unchanged.

### Responsive and accessibility

- [ ] Compact widths 320, 360, and 390 CSS px are considered.
- [ ] Tablet widths 768, 820, and 1024 CSS px are considered.
- [ ] Desktop widths 1280, 1440, and 1920 CSS px are considered.
- [ ] No essential horizontal scrolling is required.
- [ ] On-screen keyboard does not hide the Save action.
- [ ] Keyboard focus is visible.
- [ ] Color is not the only indicator of state.
- [ ] No essential action depends only on hover, swipe, long-press, or drag.

### Baseline integrity

- [ ] Product Definition v0.2.0 is treated as current product authority; v0.1.0 is preserved as historical design context.
- [ ] Beginner, Intermediate and Advanced storage/identity disclosures are distinct and accurate.
- [ ] The wireframes do not silently add team collaboration or cross-user data access.
- [ ] The five frozen BVC Core Specifications remain unchanged.
- [ ] Open Product Owner decisions remain explicitly OPEN.
- [ ] No claim is made that the application has already been implemented or device-tested.

---

## 21. What these wireframes do not prove

A completed wireframe package does not prove that:

- The application has been implemented.
- The application has been tested on real iPhone or Android devices.
- The application is accessible or WCAG-conformant.
- Data persistence, export, or restore works in a running application.
- Responsive behavior has passed browser/device testing.
- Performance targets have been met.
- The final design has been accepted by the Product Owner.

Those claims require implementation and verification evidence in later phases.

---

**BVC Task Management — UX Wireframes v0.1.0**  
*Make the next useful action obvious. Keep everyday work simple.*
