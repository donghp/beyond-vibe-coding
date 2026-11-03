# BEYOND VIBE CODING — Build & Learn

# BVC Task Management — Product Definition v0.1.0

**Document ID:** BVC-TM-PD-001  
**Version:** 0.1.0  
**Baseline date:** 2026-11-03  
**Status:** Frozen Product Baseline — MVP Scope  
**Product:** BVC Task Management  
**Product subtitle:** A Simple Daily Work Manager  
**Program:** BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides

---

## 1. Purpose of this document

This document defines the product direction, target users, user experience, MVP scope, functional requirements, quality expectations, and acceptance criteria for BVC Task Management.

It is the product baseline for Phase 3 implementation. Product design, architecture, UI design, implementation tasks, and practical learning labs must remain consistent with this document.

This is a product definition, not a technical architecture specification. Detailed component design, data structures, storage implementation, deployment, and technology choices are elaborated in the next design stage without silently changing the product scope.

## 2. Product identity and positioning

### 2.1 Build & Learn identity

**BEYOND VIBE CODING — Build & Learn: Practical Projects and Hands-on Guides**

A practical learning space for people who want to use AI to create useful real-world products, from their first steps to understanding and controlling the development process.

**Build & Learn promise:**

> Build something useful. Use it every day. Learn by doing.

The public experience should feel welcoming, modest, clear, practical, and honest. It must not present itself as an unnecessarily grand engineering platform.

### 2.2 First practical project

**BVC Task Management — A Simple Daily Work Manager**

A simple personal work-management application that helps people capture tasks, decide what matters, organize work, and follow through every day.

### 2.3 Product positioning

BVC Task Management is a practical everyday tool and a learning project. It is not primarily a software-development task tracker, enterprise project portfolio system, CRM, POS, inventory application, restaurant management system, or ERP.

A person should be able to use it for their own work without needing to be a programmer or an IT professional.

## 3. Product vision

Help people turn scattered daily work into a clear, manageable list of actions — using a simple tool they can understand, adapt, and use in real life.

The product must make it easy to answer five everyday questions:

1. What do I need to do today?
2. What is important or overdue?
3. Which project or area does this task belong to?
4. What have I completed, and what remains?
5. What should I do next?

## 4. Product principles

1. **Useful before impressive.** Solve a real everyday problem before adding advanced features.
2. **Simple on first use.** A new user should be able to create a task without reading a manual.
3. **Mobile-first, device-adaptive.** Design for comfortable use on phones first, then expand the same experience for tablets and desktop screens.
4. **One product, many kinds of work.** Use configurable starter kits instead of building separate applications for each profession.
5. **Progressive disclosure.** Show the essential action first; reveal optional details only when needed.
6. **Calm and focused.** Avoid crowded dashboards, excessive colors, unnecessary charts, and technical jargon.
7. **Human-readable language.** Prefer familiar terms such as My Day, My Tasks, Projects, and Templates.
8. **Local-first and transparent.** Make it clear where personal data is stored and what is not synchronized.
9. **Accessible by design.** Support touch, keyboard, readable text, sufficient contrast, and alternatives to gesture-only actions.
10. **Honest about capability.** Clearly distinguish implemented functions from planned features and limitations.
11. **AI helps build the product; AI does not silently control the user's work data.** AI integration inside the application is not part of the MVP.

## 5. Target users

### 5.1 Primary users

Individuals who need a straightforward way to manage their own daily responsibilities, regardless of whether their work is technical or non-technical.

| Persona | Typical daily work | Main need |
|---|---|---|
| Sales Team Lead | Follow-ups, meetings, proposals, weekly priorities | Keep commitments visible and follow up on time |
| Marketing Manager | Campaigns, content, events, publication deadlines | Organize work and keep deadlines under control |
| CEO / Executive | Strategic priorities, decisions, meetings, follow-ups | Focus on important actions without a complicated management suite |
| Shop Owner | Opening/closing routines, suppliers, maintenance, daily operations | Remember and complete recurring operational checklists |
| Restaurant Owner | Preparation, service readiness, cleaning, maintenance, follow-ups | Keep everyday operational tasks visible and organized |
| Project Manager | Project actions, milestones, deadlines, coordination | See project work and outstanding actions in one place |
| Individual / Independent Builder | Personal responsibilities, learning, side projects | Keep personal and work tasks in one simple tool |

### 5.2 Secondary learning audiences

Developers, Vibe Coders, Tech Leads, Engineering Managers, CTOs, Architects, AI Engineers, Owners, and Founders may use the same project to learn how an application is designed, built, tested, and improved with AI.

Their learning needs do not redefine the everyday user's business task model.

### 5.3 Important distinction

A **Business Task** is an everyday work item managed by the application, such as “Prepare weekly sales report”.

An **Engineering Task** is a bounded task assigned to an AI executor to change the BVC application code or its supporting artifacts.

These are different concepts and must remain separate. A Business Task must not be treated as a Task Contract or merged into the five frozen BVC Core Specifications.

## 6. Problems the product addresses

The product focuses on common, observable problems:

- Tasks are scattered across notebooks, chat messages, emails, and memory.
- People forget follow-ups and deadlines.
- Important work is mixed with low-priority tasks.
- It is difficult to see what is due today or already overdue.
- Project-related tasks are separated from personal tasks.
- Repeated daily routines are recreated manually or forgotten.
- Existing tools may feel too complex for a person who only needs a simple personal work manager.

## 7. Product goals and non-goals

### 7.1 MVP goals

- Let a person capture a task quickly.
- Let a person organize tasks by project or work area.
- Make today's work, overdue work, and upcoming work easy to see.
- Let a person set a due date, priority, and status.
- Provide both list and Kanban ways to view tasks.
- Provide editable starter kits for common work roles.
- Preserve data on the current device/browser and provide backup/restore.
- Work comfortably on iPhone, Android phones, tablets, laptops, and desktop computers through a responsive web interface.
- Provide a practical example that readers can build and understand with AI.

### 7.2 Non-goals for v0.1

- Multiple people editing the same workspace.
- Login, registration, team accounts, invitations, or role-based access control.
- Automatic synchronization between devices.
- Cloud database or cloud backup.
- CRM, customer database, sales pipeline automation, POS, inventory, payroll, accounting, HR, restaurant booking, food-safety compliance, or ERP functions.
- Gantt charts, complex dependencies, resource planning, or enterprise portfolio management.
- AI chatbot, autonomous task assignment, AI-generated business decisions, or external AI API integration inside the application.
- Native iOS or Android applications distributed through app stores.
- Production-grade enterprise collaboration or compliance claims.

## 8. Product experience and navigation

### 8.1 Primary navigation

The product uses a small, consistent information architecture:

| Navigation item | Purpose |
|---|---|
| **My Day** | Today's focus, overdue tasks, and upcoming tasks |
| **My Tasks** | All tasks, with search, filters, sorting, and list/Kanban views |
| **Projects** | Group tasks by project or work area |
| **More** | Templates, settings, backup, restore, and help |

On larger screens, Templates and Settings may appear as separate sidebar entries. On narrow screens, they remain under More to keep navigation compact.

### 8.2 First screen

After first setup, open **My Day** by default.

My Day should make the most useful information visible without requiring configuration:

1. Overdue tasks, when present.
2. Tasks due today.
3. Tasks the user has marked as today's focus.
4. A small upcoming section for the next few days.
5. One clearly visible **Add task** action.

Do not fill the first screen with large decorative charts, large KPI panels, or technical status information.

### 8.3 Quick task capture

The shortest path to a useful task is:

1. Enter a task title.
2. Save.

The task can be enriched later with a due date, priority, project, notes, checklist, or responsible-person label. Do not force a new user to complete a long form before saving an idea.

Default values:

- Status: `To Do`.
- Priority: `Normal`.
- Due date: empty unless supplied.
- Project: optional.
- Responsible person: optional free text.

### 8.4 Progressive disclosure

Keep the default task card and quick-add form short. Optional details should be available in a task detail view or expandable section.

Do not show every field, filter, setting, and advanced action at the same time.

## 9. UI/UX direction — simple, familiar, and device-adaptive

### 9.1 Design intent

The intended feeling is the clarity and ease of a well-designed everyday product: a person opens it, immediately understands where they are, sees what matters, and knows what to do next.

The design may learn from the clarity, consistency, readable hierarchy, and adaptive behavior associated with familiar mobile experiences. It must not imitate Apple's proprietary visual identity, copy iOS screens, or assume that all users are on Apple devices.

The same product must feel natural on Android, iPad/tablets, laptops, and desktop computers.

### 9.2 Responsive web application, not separate device products

The MVP is one responsive web application that adapts to available screen space and input method.

- iPhone: supported in a mobile browser such as Safari.
- Android phone: supported in a modern mobile browser such as Chrome.
- iPad and Android tablets: supported in portrait and landscape layouts.
- Laptop and desktop PC: supported in modern desktop browsers on common operating systems.

The MVP does not require a separate native app for each platform. Installable PWA behavior may be evaluated during technical design, but must not be assumed to work identically on every browser or operating system.

### 9.3 Layout behavior by available width

Breakpoints are starting design ranges. They must be validated against actual content and must not be based solely on a named device model.

| Layout mode | Indicative viewport width | Expected behavior |
|---|---:|---|
| Compact | Below 600 CSS px | Single-column content, compact header, bottom navigation, large touch-friendly actions, task details as a full-screen view or sheet |
| Medium | 600–1023 CSS px | More breathing room, navigation rail or compact sidebar where space permits, two-pane task list/detail where useful, tablet portrait and landscape support |
| Expanded | 1024 CSS px and above | Persistent sidebar, wider content area, optional task detail panel, larger Kanban workspace, keyboard-friendly controls |

The layout must also respond to orientation changes, browser resizing, split-screen windows, text-size changes, and safe-area insets.

### 9.4 Mobile layout

On a phone:

- Show one clear screen at a time.
- Keep the main action easy to reach.
- Use a bottom navigation bar for My Day, My Tasks, Projects, and More.
- Keep the current page title visible.
- Use a floating or prominently placed Add task action that does not cover content or navigation.
- Open task details as a full-screen view or an appropriately sized sheet.
- Use simple list cards rather than forcing a multi-column Kanban board into a narrow viewport.
- Allow comfortable vertical scrolling; avoid unnecessary horizontal scrolling.
- Respect device safe areas and the on-screen keyboard.

### 9.5 Tablet layout

On a tablet:

- Use the extra width to show more information, not simply larger empty cards.
- Support portrait and landscape orientation.
- Use a navigation rail or sidebar when there is sufficient width.
- In landscape, allow a task list and selected task detail to appear side by side.
- Keep controls and content stable as a split-screen window is resized.
- Do not force the compact phone layout when a useful two-pane layout fits.

### 9.6 Laptop and desktop layout

On larger screens:

- Use a persistent left navigation sidebar.
- Keep the main work area focused and readable.
- Allow a selected task to open in a right-side detail panel where this improves the workflow.
- Use a wider Kanban board when the available space supports it.
- Keep content width controlled; do not stretch paragraphs or task details across the full monitor unnecessarily.
- Support mouse, keyboard, and trackpad input.

### 9.7 Visual language

- Quiet, clean, warm, and functional.
- Neutral surfaces with restrained semantic colors.
- Clear distinction between primary actions, secondary actions, and destructive actions.
- Consistent spacing, alignment, typography, and icon use.
- Avoid decorative gradients, excessive shadows, dense dashboards, and unnecessary animation.
- Use icons with visible text labels for important navigation and actions, especially for new users.
- Do not use color as the only way to convey priority or status; include text labels or other visual cues.
- Provide clear empty states with one useful next action and optional sample content.

### 9.8 Touch, keyboard, and accessibility

- Design primary touch controls around a comfortable target of approximately 44 × 44 CSS px or larger where practical.
- Do not go below the applicable accessibility minimums without a justified exception and adequate spacing.
- Provide visible keyboard focus and logical keyboard navigation.
- Associate form controls with readable labels and explain validation errors in text.
- Maintain readable contrast and allow text enlargement without clipping essential controls.
- Do not require dragging as the only way to move a task between Kanban columns; provide a button/menu alternative.
- Do not make essential actions available only through swipe, long-press, hover, or another hidden gesture.
- Use confirmation or a reversible action for destructive operations.

### 9.9 Interaction feedback

Every important action should have a clear result:

- Save: show that the task was saved.
- Complete: show the task as completed and update relevant counts.
- Delete: ask for confirmation or provide a reliable undo path.
- Validation error: explain what needs attention and how to fix it.
- Empty state: explain what is missing and offer a direct action.
- Backup/restore: show success or a useful error; do not claim success before the operation finishes.

### 9.10 Language and localization

The initial public UI may use English labels to align with the English International Edition and public repository. Keep interface text centralized so Vietnamese or other translations can be added without rewriting business logic. Localization is a design requirement; multiple-language UI is not a blocker for the first MVP unless user testing identifies it as essential.

### 9.11 Illustrative layout blueprints

These are structural wireframes, not final visual mockups. The same information architecture should remain recognizable across devices.

**Phone — My Day**

```text
┌─────────────────────────────┐
│ BVC Task Management     ⋯   │
│ Tuesday, November 3         │
│ My Day                      │
│                             │
│ OVERDUE (if any)             │
│ [Task title]        High     │
│                             │
│ DUE TODAY                    │
│ [ ] Prepare weekly report    │
│     Marketing · Today        │
│ [ ] Call supplier            │
│     Operations · Today       │
│                             │
│ UPCOMING                     │
│ [ ] Review next campaign     │
│     Tomorrow                 │
│                             │
│          [+ Add task]        │
│                             │
│ My Day  Tasks  Projects  More│
└─────────────────────────────┘
```

**Tablet — My Tasks**

```text
┌──────────────────────────────────────────────┐
│ BVC Task Management               [+ Add]     │
├─────────────┬───────────────────┬────────────┤
│ My Day      │ My Tasks          │ Task       │
│ My Tasks    │ Search / Filter   │ Details    │
│ Projects    │                   │            │
│ More        │ [ ] Task A        │ Title      │
│             │ [ ] Task B        │ Due date   │
│             │ [ ] Task C        │ Priority   │
│             │                   │ Notes      │
└─────────────┴───────────────────┴────────────┘
```

**Laptop / Desktop — My Day**

```text
┌────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                   [+ Add]   │
├───────────────┬─────────────────────────────────┬──────────────┤
│ My Day        │ My Day                          │ Quick View   │
│ My Tasks      │ Overdue                         │ Selected     │
│ Projects      │ Due Today                       │ Task         │
│ Templates     │ Upcoming                        │ Details      │
│ Settings      │                                 │              │
│               │                                 │              │
└───────────────┴─────────────────────────────────┴──────────────┘
```

On a narrow phone, use a single-column list and a compact bottom navigation. On a tablet, use a second pane only when it improves the task workflow. On a desktop, use a persistent sidebar and an optional details panel. Never force a three-column layout onto a screen that cannot comfortably support it.

## 10. Core screens

### 10.1 My Day

Purpose: provide a calm, useful overview of what needs attention today.

Must include:

- Today's date or clear day context.
- Overdue tasks, if any.
- Tasks due today.
- User-selected focus tasks.
- A small upcoming view.
- Add task action.

Do not turn My Day into an executive analytics dashboard.

### 10.2 My Tasks

Purpose: provide one place to find and manage all tasks.

Must include:

- List view as the default compact view.
- Optional Kanban view.
- Search by task title and notes where supported.
- Filters for status, priority, due date, and project.
- Sorting by due date, priority, and recently updated.
- A clear empty state.

### 10.3 Projects

Purpose: group tasks by a project, responsibility, or work area.

Must include:

- Create, view, edit, and archive/delete a project as defined by the implementation safeguards.
- Project name and optional description.
- A project task list and basic completion summary.
- Tasks may exist without a project.

### 10.4 Task detail

A task may contain:

- Required title.
- Optional description/notes.
- Status: To Do, In Progress, Done.
- Priority: Low, Normal, High.
- Optional due date.
- Optional project.
- Optional responsible-person label as free text.
- Optional checklist items.
- Created and updated timestamps.

Do not require users to assign a task to another account; the MVP has no accounts or shared workspace.

### 10.5 Templates

Purpose: help a new user start with a useful structure for their kind of work.

The user can preview a starter kit before applying it. Applying a kit must not silently overwrite or delete existing tasks. Users must be able to edit the tasks, checklist templates, and project names created from a kit.

### 10.6 Settings & Backup

Must include:

- Current local workspace/data information in plain language.
- Export/backup to a user-selected file.
- Restore/import from a compatible backup file.
- A clear warning before a restore operation that replaces existing data.
- A way to see the selected starter-kit profile or reset sample content without deleting user-created work accidentally.
- Basic help and version information.

## 11. Role Starter Kits

Starter kits are editable starting configurations, not user roles, permissions, or separate application editions.

| Starter kit | Example groups and checklists | Example task patterns |
|---|---|---|
| Personal Work | Work, Personal, Errands, Learning | Prepare a weekly plan; pay a bill; finish a learning session |
| Sales Team Lead | Customer follow-up, Meetings, Proposals, Weekly priorities | Follow up on a proposal; prepare a customer meeting; review weekly sales actions |
| Marketing Manager | Campaigns, Content, Social Media, Events, Reports | Review campaign assets; prepare a post; publish content; prepare a campaign report |
| CEO / Executive | Strategic priorities, Decisions, Meetings, Follow-ups | Review a key decision; prepare an executive meeting; follow up an action owner |
| Shop Owner | Opening, Closing, Daily Operations, Suppliers, Maintenance | Complete opening checklist; follow up a supplier; inspect a display area |
| Restaurant Owner | Opening, Preparation, Service Readiness, Cleaning, Maintenance | Check opening readiness; prepare a shift checklist; follow up equipment maintenance |
| Project Manager | Projects, Milestones, Meetings, Risks, Follow-ups | Review a milestone; prepare a project meeting; follow up an outstanding action |

Starter-kit boundaries:

- Kits provide sample categories, reusable checklist templates, and optional example tasks.
- Users may start with a blank Personal Work setup instead.
- Users may edit or remove any starter content.
- Applying a kit to an existing workspace must add/merge selected template content safely; it must not silently replace the user's work.
- Starter kits do not contain real customer, employee, supplier, financial, health, or other personal data.
- Kits are not a substitute for a CRM, inventory, POS, accounting, food-safety compliance, or specialist operational system.
- Automatic recurring schedules are not required in v0.1. A user may create a fresh task from a reusable checklist template when needed.

## 12. Main user journeys

### Journey A — First use

1. User opens the application.
2. User chooses a starter kit or starts with a blank setup.
3. User may preview sample content before applying it.
4. User lands on My Day.
5. User sees a short explanation and one clear Add task action.
6. User creates the first task and sees it immediately in the appropriate view.

### Journey B — Capture and complete a task

1. User selects Add task.
2. User enters a title and saves.
3. User optionally adds a due date, priority, project, note, or checklist.
4. User sees the task in My Tasks and, where applicable, My Day.
5. User marks it Done.
6. Relevant counts and views update.

### Journey C — Manage a work area

1. User creates or opens a project/work area.
2. User adds tasks, optionally with deadlines and priorities.
3. User views the work as a list or Kanban board.
4. User filters or searches for outstanding tasks.
5. User reviews what is complete and what remains.

### Journey D — Use a role starter kit

1. User opens Templates.
2. User previews a kit relevant to their work.
3. User applies the kit, with an explanation of what will be added.
4. The application adds editable sample groups and reusable checklist templates.
5. User personalizes the content and uses it in daily work.

### Journey E — Backup and restore

1. User opens Settings & Backup.
2. User exports a backup file.
3. User stores the file somewhere they control.
4. When needed, user selects a compatible backup file to restore.
5. The application validates the file and explains the effect before replacing current data.

## 13. Local data and multi-device behavior

### 13.1 Local-first behavior

The MVP stores the user's workspace locally on the device/browser where the application is used. A browser-native local data store is the preferred direction to support phone, tablet, and desktop browsers without requiring the user to run a Python server on a phone.

The exact storage technology will be specified in the Application Architecture document. JSON is the interchange format for backup and restore; it is not necessarily the live storage engine.

### 13.2 Important device limitation

**Responsive across devices does not mean automatic data synchronization across devices.**

In v0.1:

- The same application interface can adapt to an iPhone, Android phone, tablet, laptop, or PC.
- Each device/browser has its own local workspace.
- Data created on one device does not automatically appear on another device.
- A user can manually export and import a backup to transfer data.
- Cloud synchronization and shared workspaces are future scope.

The UI and documentation must state this clearly before a user creates important data.

### 13.3 Offline and installation claims

Do not claim guaranteed offline operation or identical PWA installation behavior until those capabilities have been implemented and tested on the supported browsers. The first requirement is a reliable responsive web experience. Installable PWA and offline support can be validated during technical design as separate capabilities.

## 14. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | The application shall open on My Day after initial setup. | Must |
| FR-002 | The user shall be able to start with a blank workspace or select a starter kit. | Must |
| FR-003 | The user shall be able to create a task with only a title. | Must |
| FR-004 | The user shall be able to view, edit, and delete a task. | Must |
| FR-005 | The user shall be able to set task status to To Do, In Progress, or Done. | Must |
| FR-006 | The user shall be able to set task priority to Low, Normal, or High. | Must |
| FR-007 | The user shall be able to set an optional due date. | Must |
| FR-008 | The user shall be able to assign a task to an optional project/work area. | Must |
| FR-009 | A task shall be allowed to exist without a project. | Must |
| FR-010 | The user shall be able to add notes and checklist items to a task. | Should |
| FR-011 | My Day shall show overdue tasks and tasks due today. | Must |
| FR-012 | The user shall be able to mark tasks as today's focus. | Should |
| FR-013 | The user shall be able to view tasks in a list. | Must |
| FR-014 | The user shall be able to view tasks in a Kanban board on suitable screen widths. | Should |
| FR-015 | Kanban status changes shall also be available without drag-and-drop. | Must |
| FR-016 | The user shall be able to search tasks. | Should |
| FR-017 | The user shall be able to filter tasks by status, priority, due date, and project. | Should |
| FR-018 | The user shall be able to create, view, edit, and remove projects/work areas. | Must |
| FR-019 | The user shall be able to preview and apply a role starter kit. | Must |
| FR-020 | Applying a starter kit shall not silently overwrite user-created tasks. | Must |
| FR-021 | The user shall be able to export a workspace backup. | Must |
| FR-022 | The user shall be able to restore a compatible backup after validation and confirmation. | Must |
| FR-023 | The application shall preserve local workspace data after the browser/application is closed and reopened, within the supported browser's storage guarantees. | Must |
| FR-024 | The application shall show clear success, error, empty, and confirmation feedback for important actions. | Must |
| FR-025 | The application shall disclose that data is local to the current device/browser and is not automatically synchronized. | Must |

## 15. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-001 | Responsiveness | Core screens shall adapt to compact, medium, and expanded layouts without clipped controls or unusable navigation. |
| NFR-002 | Browser support | Validate current supported Safari on iOS, Chrome on Android, and current Chrome/Edge/Firefox/Safari desktop releases selected in the technical test plan. |
| NFR-003 | Orientation | Phone and tablet layouts shall work in supported portrait and landscape orientations. |
| NFR-004 | Touch | Primary touch controls should target approximately 44 × 44 CSS px where practical. |
| NFR-005 | Accessibility | Support keyboard operation, visible focus, labels, text alternatives, adequate contrast, and non-drag alternatives for drag operations. |
| NFR-006 | Readability | Text and controls shall remain usable when text size or browser zoom is increased; essential content must not be clipped. |
| NFR-007 | Data durability | Successful changes shall persist locally and survive a normal browser/app restart. |
| NFR-008 | Backup | Export files shall be understandable, versioned, and validated before restore. |
| NFR-009 | Privacy | Personal workspace data shall not be sent to a cloud service in the Local-First MVP unless a future, explicitly disclosed feature requires it. |
| NFR-010 | Security | Do not store secrets, API keys, or credentials in the client application or public repository. Validate imported data and protect against unsafe rendering of user-entered text. |
| NFR-011 | Performance | Common actions such as opening My Day, viewing tasks, and saving a normal task should feel immediate on supported devices with typical personal task volumes. Establish measurable budgets during technical design. |
| NFR-012 | Maintainability | Keep business rules, UI presentation, and data access sufficiently separated to support later improvement without changing product semantics. |
| NFR-013 | Portability | Backup/export and restore/import shall provide a practical manual way to move a workspace between devices. |
| NFR-014 | Language readiness | Keep UI text structured for later localization. |

## 16. Data concepts

The product uses a small set of business concepts:

- **Task:** one actionable item belonging to the user.
- **Project / Work Area:** an optional way to group related tasks.
- **Checklist Item:** a small step inside a task or reusable checklist template.
- **Starter Kit:** a reusable set of sample groups, example tasks, and checklist templates for a type of work.
- **Workspace Settings:** local preferences and the selected starter-kit profile.

The data model must not require a registered user account in v0.1. A free-text responsible-person label may be used for reference, but it does not create collaboration, identity, or access control.

## 17. Implementation constraints for the next design stage

The Application Architecture stage must choose technologies that satisfy the following product constraints:

1. One responsive web application must serve phones, tablets, laptops, and desktop browsers.
2. A phone user must not be required to install Python, run a local backend server, or use a developer terminal just to use the application.
3. Local-first data must remain under the user's control and be stored on the current device/browser in the MVP.
4. Backup and restore must use a portable, documented interchange format such as versioned JSON.
5. The application must not depend on a cloud database or sign-in service for basic local use.
6. The design should preserve a clean boundary for a future cloud storage adapter, but no cloud implementation is part of v0.1.
7. Do not select a technology simply because it is fashionable. Prefer the smallest stack that meets the product and user-experience requirements.

A browser-native store such as IndexedDB is the preferred candidate for evaluating local persistence across mobile and desktop browsers. This is a design-stage recommendation, not a claim that it has already been implemented or validated.

## 18. MVP acceptance criteria

The MVP is ready for release review only when all applicable criteria below pass.

### Product behavior

- AC-001: A first-time user can start with a blank workspace or choose one of the published starter kits.
- AC-002: A user can create a task by entering only a title.
- AC-003: A user can edit and delete a task with clear feedback and appropriate protection from accidental deletion.
- AC-004: A user can change status and priority and set or clear a due date.
- AC-005: A user can create a project/work area and associate tasks with it; standalone tasks remain supported.
- AC-006: My Day correctly separates overdue, due-today, and upcoming tasks according to the documented date rules.
- AC-007: A user can find tasks using the implemented search and filter controls.
- AC-008: A user can use a list view and, where the viewport supports it, a Kanban view.
- AC-009: Every Kanban status operation has a non-drag alternative.
- AC-010: Applying a starter kit does not destroy or silently replace existing user-created data.

### Data and recovery

- AC-011: A created or edited task remains present after closing and reopening the application in the same supported browser profile.
- AC-012: A user can export a valid workspace backup.
- AC-013: A valid backup can be restored and the resulting workspace matches the exported data.
- AC-014: An invalid or unsupported backup is rejected with a useful explanation and does not corrupt the current workspace.
- AC-015: A restore that replaces existing data requires explicit confirmation.
- AC-016: The UI explains that local workspaces do not automatically sync across devices.

### Responsive UI/UX

- AC-017: Core screens are usable at compact viewport widths including 320, 360, and 390 CSS px without essential horizontal scrolling.
- AC-018: Core screens are usable at tablet widths including approximately 768, 820, and 1024 CSS px in portrait/landscape combinations selected for testing.
- AC-019: Core screens are usable at laptop/desktop widths including approximately 1280, 1440, and 1920 CSS px.
- AC-020: Navigation, buttons, forms, and task detail layouts adapt without covering content or becoming unreachable when the on-screen keyboard appears.
- AC-021: Resizing or rotating the viewport does not lose unsaved form input or corrupt task data.
- AC-022: Primary touch controls meet the product's approximate 44 × 44 CSS px design target where practical; any exception is documented and tested for spacing/accessibility.
- AC-023: Keyboard users can reach and operate all essential navigation and task actions, with visible focus.
- AC-024: Status and priority remain understandable without relying on color alone.
- AC-025: Increased text size/browser zoom does not hide essential actions or make core workflows unusable.

### Release quality

- AC-026: A beginner-facing setup guide explains how to open and use the application without assuming programming knowledge.
- AC-027: Sample data is synthetic and contains no personal, customer, employee, or confidential information.
- AC-028: Tests cover task operations, date behavior, starter-kit import/merge behavior, backup/restore, and responsive critical paths.
- AC-029: The README and product guide clearly state implemented functions, limitations, and device synchronization behavior.
- AC-030: All configured CI checks pass for the release candidate, and a human reviews the evidence before release.

## 19. Success measures

The first release should be evaluated by real use, not by feature count alone.

Suggested measures:

- **Time to first task:** a new user can create their first task quickly after opening the app; initial target is under two minutes after setup.
- **First useful session:** a new user can create a project or choose a starter kit, add tasks, and understand My Day without direct assistance.
- **Daily usefulness:** users report that My Day helps them identify the next actions they need to take.
- **Data confidence:** users can export a backup and successfully restore it in a test scenario.
- **Device usability:** core workflows are usable on both a phone and a desktop browser.
- **Learning value:** a reader can follow a Hands-on Lab to make a controlled change and verify it.

Collect feedback with concrete questions and observed task completion. Do not interpret GitHub stars, page views, or downloads alone as proof of user value.

## 20. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Scope grows into a large business-management suite | Keep v0.1 focused on personal task capture, organization, and follow-through. |
| Interface becomes too dense | Use progressive disclosure, a small navigation set, and a focused My Day screen. |
| Mobile UI is treated as a scaled-down desktop | Design and test compact layouts first; adapt navigation and task details to touch. |
| Users assume data syncs between devices | State local-device behavior before use and in backup/settings documentation. |
| Applying a starter kit overwrites real work | Preview, merge safely, and never silently replace user-created tasks. |
| Users assume the app replaces specialist tools | Clearly state boundaries for CRM, POS, inventory, accounting, and specialist operations. |
| Local data is lost when browser data is cleared | Provide clear backup guidance and export/restore tests. |
| AI implementation expands beyond agreed scope | Use bounded Task Contracts, review each change, and verify against acceptance criteria. |

## 21. Relationship to BVC Core Specifications

The five Phase 2 Core Specifications remain unchanged and retain their current **Draft / Experimental v0.1.0** maturity:

1. Task Contract.
2. Context Manifest.
3. Project State.
4. Change Record.
5. Verification Evidence.

They govern and record appropriate engineering work performed while building or changing the application. They do not define the Task Management application's Business Task schema.

A practical learning example may show how an Engineering Task Contract authorizes an AI executor to change a feature, how context and project state are recorded, how actual changes are inventoried, and how verification evidence is reviewed. The example must preserve the limitations stated in the frozen specifications.

In particular:

- A validator is not a runtime sandbox.
- A Context Manifest does not fetch or authenticate source truth.
- A Project State is a snapshot, not an event log.
- A Change Record does not prove functional correctness.
- Verification PASS does not automatically mean human acceptance or release approval.
- AI capability does not grant AI authority.

## 22. Relationship to the book

The book explains the ideas, principles, trade-offs, and reasoning behind AI-assisted software development.

Build & Learn provides practical projects and hands-on guides so readers can experience those ideas by creating something useful.

The Task Management project is an independent BVC learning project. EFIN may provide generalized lessons only where supported by actual evidence and safely sanitized; EFIN-specific source code, private paths, governance identifiers, business data, and proprietary implementation details must not be copied into this public project.

## 23. Product baseline and change control

This document establishes the **BVC Task Management MVP Product Baseline v0.1.0** as of 2026-11-03.

The baseline freezes:

- Product identity and positioning.
- Primary users and everyday-use focus.
- Responsive web application direction.
- Local-first, single-user MVP boundary.
- Core screens and navigation.
- Role Starter Kit concept and initial set.
- MVP functional scope and non-goals.
- Acceptance criteria.

Changes that affect these decisions require a reviewed revision of this document. Implementation details may be refined in the Architecture and UX Design documents only when they remain within this product baseline. Any scope expansion must be recorded and approved before implementation.

**Implementation must not begin by silently changing the product scope.**

## 24. References

The following public guidance informed the responsive and accessible design direction. These references are guidance, not a requirement to copy a vendor's visual identity:

- Apple Developer, Human Interface Guidelines — Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- W3C, Web Content Accessibility Guidelines (WCAG) 2.2, Success Criterion 2.5.8 Target Size (Minimum): https://www.w3.org/TR/WCAG22/#target-size-minimum
- W3C, WCAG 2.2, Success Criterion 2.5.7 Dragging Movements: https://www.w3.org/TR/WCAG22/#dragging-movements

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
