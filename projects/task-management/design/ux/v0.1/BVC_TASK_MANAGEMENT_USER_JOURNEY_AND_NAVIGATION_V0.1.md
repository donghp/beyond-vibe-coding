# BVC Task Management — User Journey & Navigation v0.1.0

**Document ID:** BVC-TM-UX-001  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** `BVC-TM-PD-001`, Product Definition v0.1.0

---

## 1. Purpose

This document describes how a person moves through BVC Task Management to organize everyday work. It translates the Product Definition into practical user journeys and navigation rules for people who may not have a technical background.

It defines the expected user experience, not the application architecture, database design, or implementation technology. The Product Definition remains authoritative if a conflict appears.

## 2. Experience promise

> Open the app. See what matters. Add or complete a task without fighting the tool.

The product should help a person answer:

1. What needs my attention today?
2. What should I do next?
3. Where does this work belong?
4. What have I completed?
5. Is my work safely stored on this device?

The main experience must remain calm and direct. A user should not need to understand projects, workflows, or software terminology before adding a simple task.

## 3. People and everyday contexts

The same application serves different kinds of personal work. These are usage contexts, not separate products or permission roles.

| User context | Typical starting need | Useful first view or starter kit |
|---|---|---|
| Individual / Personal | Capture mixed personal and work responsibilities | Personal Work; My Day |
| Sales Team Lead | Track follow-ups, meetings, and proposals | Sales Team Lead |
| Marketing Manager | Organize campaigns, content, and deadlines | Marketing Manager |
| CEO / Executive | Keep priorities, decisions, and follow-ups visible | CEO / Executive |
| Shop Owner | Remember opening, closing, supplier, and maintenance tasks | Shop Owner |
| Restaurant Owner | Organize preparation, service-readiness, cleaning, and maintenance checklists | Restaurant Owner |
| Project Manager | Track project actions, milestones, meetings, and risks | Project Manager |

A starter kit is an editable starting point. It is not a user account, access role, industry-specialist system, or fixed workflow.

## 4. Information architecture

### 4.1 Primary destinations

| Destination | User question | Main contents |
|---|---|---|
| **My Day** | What should I focus on today? | Overdue, Due Today, Today's Focus, Upcoming, Add task |
| **My Tasks** | Where can I find all my work? | Search, filters, sorting, list, optional Kanban |
| **Projects** | How is my work grouped? | Project/work-area list, project details, associated tasks |
| **More** | Where are the supporting tools? | Templates, Settings & Backup, Help / Version |

The My Day section order must remain consistent with the frozen Product Definition v0.1.0, Section 8.2:

1. Overdue
2. Due Today
3. Today's Focus
4. Upcoming
5. Add task

A task must appear only once in My Day. When a task belongs to more than one conceptual group, the display rules in Section 6.2 determine which section owns the visible task row.

On expanded screens, Templates and Settings & Backup may be shown directly in the sidebar. They must not become duplicate destinations; the same destination and state should be used whichever entry point is selected.

### 4.2 Navigation by screen size

| Layout | Navigation pattern | Destinations |
|---|---|---|
| Compact phone | Bottom navigation | My Day, My Tasks, Projects, More |
| Medium tablet | Navigation rail or compact sidebar when useful; fallback to compact navigation in narrow split view | Same four primary destinations; Templates and Settings remain reachable from More |
| Expanded laptop / desktop | Persistent sidebar | My Day, My Tasks, Projects, Templates, Settings & Backup; no redundant More item when all destinations are visible |

### 4.3 Navigation behavior

- The current destination must be clearly identified using more than color alone.
- Opening a task should preserve the user's previous list, search query, active filters, and scroll context when the user returns, where the browser/application navigation model permits.
- A back action returns to the previous meaningful screen, not always to My Day.
- A direct navigation selection changes the main destination without silently deleting or resetting task data.
- On narrow screens, task detail is a full-screen view or sheet. On wider screens, it may use a second pane when both the list and detail remain readable.
- No essential destination may be accessible only through hover, swipe, or long-press.

## 5. First-use journey

### 5.1 Goal

Help a first-time user reach a useful workspace and create the first task without requiring a lengthy setup process.

### 5.2 Journey

1. User opens the application.
2. The app explains in plain language that the workspace is stored in this browser on this device and does not automatically sync to other devices.
3. User chooses either **Start with a blank workspace** or **Browse starter kits**.
4. If browsing starter kits, the user can preview a kit before applying it.
5. The app explains what sample groups, checklist templates, and optional example tasks will be added.
6. User applies the kit or returns to choose another option.
7. The app opens My Day.
8. My Day shows a brief empty-state explanation and one clear **Add task** action.
9. User adds a task with a title only.
10. The app confirms that the task was saved only after local persistence succeeds.

### 5.3 First-use rules

- Do not require registration, email, password, company name, or API key.
- Do not force the user to choose a role. Starting blank is always available.
- Do not import example tasks without telling the user what will be added.
- Do not imply that choosing a role enables multi-user permissions or specialist business features.
- The local-data explanation must be available again from Settings & Backup.

## 6. Daily-use journey — My Day

### 6.1 Goal

Help the user identify the next useful action with minimal scanning.

### 6.2 Default content order and task placement

The default My Day section order is:

1. **Overdue** — active tasks whose due date is before the user's current local calendar date.
2. **Due Today** — active tasks due on the current local calendar date.
3. **Today's Focus** — active tasks deliberately marked for attention today that are not already displayed in Overdue or Due Today.
4. **Upcoming** — a small preview of future active tasks due soon, excluding tasks already displayed in an earlier My Day section.
5. **Add task** — a clear, reachable primary action.

This order follows the frozen Product Definition v0.1.0, Section 8.2. UX documents must not silently change this product-level ordering.

A task must not appear more than once in My Day. Apply these placement rules:

- If a task is overdue and marked as Focus, show it once in **Overdue** with a visible Focus marker.
- If a task is due today and marked as Focus, show it once in **Due Today** with a visible Focus marker.
- If a task is marked as Focus but is neither overdue nor due today, show it in **Today's Focus**. This includes a focused task with a future due date or no due date.
- Do not show a task in **Upcoming** if it is already displayed in Overdue, Due Today, or Today's Focus.
- A focused future-due task therefore appears in Today's Focus, not a second time in Upcoming.
- Completed tasks are excluded from active My Day sections unless the user opens a completed/history view.

The Today's Focus section is for tasks the user deliberately wants to keep visible today. It is not a new task status, priority, or project.

### 6.3 Date behavior

- Date-only due dates are interpreted against the user's local calendar date.
- The exact Upcoming horizon is not fixed by the Product Definition. A proposed starting value is the next seven calendar days; this requires Product Owner approval before implementation.
- The date-scoped lifetime/reset rule for Today's Focus is also an open decision. The interaction specification proposes that the marker is associated with the current local date.
- Date grouping must be deterministic around midnight and when the device timezone changes. The final technical policy belongs in Phase 3.2.

## 7. Quick task capture journey

### Goal

Capture a useful reminder before the user loses the thought.

### Journey

1. User taps or clicks **Add task** from My Day, My Tasks, or a Project detail page.
2. The quick-add form opens and focuses the task-title field.
3. User enters a title.
4. User saves.
5. The app validates the non-empty title and persists the task.
6. The new task appears in the current view if it matches that view's rules.
7. User may open **Add details** to set a due date, priority, project, responsible-person label, notes, or checklist.

### Rules

- Title is the only required field for basic task creation.
- Default status is To Do; default priority is Normal.
- Due date, project, responsible person, notes, and checklist are optional.
- On a phone, the Save action must remain reachable while the on-screen keyboard is open.
- If validation or storage fails, preserve the title and any optional information already entered.

## 8. Task follow-through journey

1. User opens a task from My Day, My Tasks, or a project.
2. User reviews title, due date, priority, status, and optional details.
3. User changes status through a visible control; drag-and-drop is never the only option.
4. User marks the task Done.
5. The app persists the change.
6. Only after successful persistence does the app show completion feedback and update relevant counts/views.
7. The task remains findable in My Tasks or project views where Done tasks are included.

If persistence fails, the UI must not display a false success state. It should preserve the prior state or explain what needs to be retried.

## 9. Find and organize work journey

### 9.1 My Tasks

1. User opens My Tasks.
2. User searches by task title and, where supported, notes.
3. User filters by status, priority, due date, or project.
4. Active filters remain visible as removable chips or an equivalent summary.
5. User sorts by due date, priority, or recently updated.
6. User opens a task and returns without losing the current search/filter context.

List view is the default on compact screens. Kanban is optional when the viewport can support readable columns. A non-drag status control is always available.

### 9.2 Projects

1. User opens Projects.
2. User creates or selects a project/work area.
3. User sees its name, optional description, task list, and basic completion summary.
4. User adds a task directly in the project context or associates an existing task.
5. Tasks that do not belong to a project remain valid and visible in My Tasks.

Project removal behavior requires an explicit decision. The current safe proposal is to preserve associated tasks and detach them to No project rather than cascade-delete them.

## 10. Starter-kit journey

1. User opens Templates.
2. User selects a role starter kit.
3. User previews its categories, reusable checklists, and optional example tasks.
4. User sees what will be added and whether the workspace already contains related items.
5. User confirms applying the kit.
6. The app adds/merges starter content without silently replacing user-created tasks or projects.
7. The app reports what was added and what was skipped.
8. User edits or removes the starter content as needed.

Reapplying the same kit must not create uncontrolled duplicates. The exact matching strategy for detecting already-applied template content must be defined in Phase 3.2 without changing the user-facing promise.

## 11. Backup and restore journey

### Export

1. User opens Settings & Backup.
2. User selects Export backup.
3. The app prepares a versioned export file.
4. The browser starts the download.
5. The app reports what it can truthfully confirm. It must not claim that the user has stored the downloaded file in a safe location.

### Restore

1. User chooses a backup file.
2. The app validates the file and its supported format before changing current data.
3. The app explains whether the operation will replace the current workspace.
4. User confirms the restore.
5. The app restores the data safely and shows the result.
6. If validation or restoration fails, the existing workspace must remain intact or be recoverable.

## 12. Empty, loading, error, and confirmation states

| State | User-facing explanation | Next useful action |
|---|---|---|
| No tasks yet | “Nothing here yet. Add a task to get started.” | Add task |
| No tasks due today | “You're clear for today.” | View My Tasks or add a task |
| No search results | “No tasks match this search.” | Clear search / filters |
| No project yet | “Group related tasks in a project, or keep tasks unassigned.” | Create project / Add task |
| No starter kit selected | “Start blank or choose a starter kit for your kind of work.” | Browse templates |
| Saving | Show a restrained progress state; prevent accidental duplicate submission | Wait for save result |
| Save failed | Explain that the task was not saved; preserve entered content | Retry / copy details if needed |
| Invalid backup | Explain why the file could not be used; preserve current workspace | Choose another file |
| Destructive action | State exactly what will be removed or detached | Confirm / Cancel |

Do not show empty sections as large decorative cards. Empty states should be brief and offer one relevant next action.

## 13. Cross-device experience and honest expectations

- The same responsive web application adapts to phones, tablets, laptops, and desktop browsers.
- In v0.1, each browser/device has its own local workspace.
- Data does not automatically appear on another device.
- Explicit export/import is the supported manual transfer path.
- No login, cloud sync, shared workspace, or team collaboration is implied by a role starter kit.

This limitation must be communicated before the user adds important data and remain available from Settings & Backup.

## 14. Out of scope for these journeys

These user journeys do not introduce:

- Multiple people editing one workspace.
- Team assignments with authenticated accounts or permissions.
- Cloud synchronization or cloud backup.
- CRM, POS, inventory, accounting, HR, restaurant booking, or ERP workflows.
- AI chatbot or autonomous task management inside the application.
- Changes to the five BVC Core Specifications.

## 15. Open decisions for Product Owner review

| ID | Decision | Current proposal | Why it matters |
|---|---|---|---|
| UJ-OPEN-01 | Upcoming horizon | Next seven calendar days | Determines which future tasks appear on My Day |
| UJ-OPEN-02 | Today's Focus lifetime | Date-scoped to the current local date | Determines whether focus resets at local midnight |
| UJ-OPEN-03 | Project removal | Preserve tasks and detach to No project | Prevents accidental loss of user work |
| UJ-OPEN-04 | Reapplying a starter kit | Skip already-applied template items and summarize | Prevents duplicate sample content |
| UJ-OPEN-05 | First-use disclosure | Explain local storage before first meaningful data entry | Prevents false expectations about sync and backup |

These are proposals for review, not approved product changes. They must be resolved or explicitly deferred before the relevant implementation tasks begin.

## 16. Related documents

- [UX Package README](README.md)
- [UX Wireframes](BVC_TASK_MANAGEMENT_UX_WIREFRAMES_V0.1.md)
- [Responsive UI Specification](BVC_TASK_MANAGEMENT_RESPONSIVE_UI_SPECIFICATION_V0.1.md)
- [UI Design System](BVC_TASK_MANAGEMENT_UI_DESIGN_SYSTEM_V0.1.md)
- [Interaction Specification](BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md)
- [Accessibility & Usability](BVC_TASK_MANAGEMENT_ACCESSIBILITY_USABILITY_V0.1.md)
- [UX Acceptance Criteria](BVC_TASK_MANAGEMENT_UX_ACCEPTANCE_CRITERIA_V0.1.md)
- [Product Definition v0.1.0](../../../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.1.md)

---

**BVC Task Management — User Journey & Navigation v0.1.0**  
*Make the next useful action obvious.*
