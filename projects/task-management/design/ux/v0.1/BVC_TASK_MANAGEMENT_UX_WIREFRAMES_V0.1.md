# BVC Task Management — UX Wireframes v0.1.0

**Document ID:** BVC-TM-UX-002  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** BVC-TM-PD-001, Product Definition v0.1.0  
**Related:** [Responsive My Day Wireframe](assets/BVC_TASK_MANAGEMENT_MY_DAY_RESPONSIVE_WIREFRAMES_V0.1.svg)

---

## 1. Purpose and reading guide

These wireframes describe information hierarchy and responsive layout, not final graphic design or implemented screens. Text labels are examples. Sample tasks are synthetic.

The same product and navigation must remain recognizable across phone, tablet, laptop, and desktop. Do not shrink a desktop screen to create the phone UI.

## 2. Global design rules

- My Day is the first screen after setup.
- Add task is the most prominent action.
- My Day prioritizes actionable work, not charts.
- My Tasks is the place for all tasks and advanced search/filter behavior.
- Projects group tasks; tasks may exist without a project.
- Templates are optional starting points.
- Settings & Backup clearly explains local data behavior.
- On phones, primary navigation is a bottom bar: My Day, My Tasks, Projects, More.
- On wider screens, use a navigation rail or sidebar as space permits.
- No account avatar, team switcher, invite button, or cloud-sync status indicator belongs in the MVP.

## 3. My Day — phone (compact)

**Reference viewport:** 390 × 844 CSS px. Must also remain usable at 320 and 360 CSS px.

```text
┌────────────────────────────────────┐
│ BVC Task Management             ⋯  │
│                                    │
│ My Day                             │
│ Tuesday, 3 November                │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ OVERDUE · 1                    │ │
│ │ Prepare supplier payment       │ │
│ │ Yesterday · High               │ │
│ └────────────────────────────────┘ │
│                                    │
│ DUE TODAY                          │
│ ┌────────────────────────────────┐ │
│ │ ☆ Prepare weekly sales report  │ │
│ │   Sales · High                 │ │
│ ├────────────────────────────────┤ │
│ │ ○ Call supplier about delivery │ │
│ │   Operations · Normal          │ │
│ ├────────────────────────────────┤ │
│ │ ○ Review campaign draft        │ │
│ │   Marketing · Normal           │ │
│ └────────────────────────────────┘ │
│                                    │
│ TODAY'S FOCUS (other focus tasks)  │
│                                    │
│ UPCOMING                           │
│ ┌────────────────────────────────┐ │
│ │ ○ Prepare Friday meeting       │ │
│ │   Thursday · Normal             │ │
│ └────────────────────────────────┘ │
│                                    │
│       [ + Add task ]               │
│                                    │
│ ────────────────────────────────── │
│  ◉ My Day  □ My Tasks  ▦ Projects  │
│                           More    │
└────────────────────────────────────┘
```

### Phone notes

- Use one column and natural vertical scrolling.
- Do not show empty Overdue sections.
- Show the task title first, then secondary metadata.
- Section order follows the Product Definition: Overdue, Due Today, Today's Focus, Upcoming.
- A task marked Focus appears once. If overdue, it remains in Overdue with a Focus marker; if due today, it remains in Due Today with a Focus marker.
- Keep the Add task action visible without covering the last task or bottom navigation. A sticky action area may be used if it respects device safe areas.
- Task detail opens as a full-screen view or near-full-height sheet.
- Use a list rather than multi-column Kanban on narrow phones.

## 4. My Day — tablet portrait

**Reference viewport:** approximately 768 × 1024 CSS px.

```text
┌────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                  [ + Add task ] │
├────────┬───────────────────────────────────────────────────────────┤
│  ◉     │ My Day                                                    │
│ My Day │ Tuesday, 3 November                                       │
│        │                                                           │
│  □     │ OVERDUE                                                   │
│ Tasks  │ [ Prepare supplier payment ]                    High     │
│        │                                                           │
│  ▦     │ TODAY'S FOCUS                                             │
│ Proj.  │ [ Prepare weekly sales report ]                 High     │
│        │                                                           │
│  ⋯     │ DUE TODAY                                                 │
│ More   │ [ Call supplier about delivery ]               Normal   │
│        │ [ Review campaign draft ]                       Normal   │
│        │                                                           │
│        │ UPCOMING                                                  │
│        │ [ Prepare Friday meeting ]                      Thu      │
│        │                                                           │
│        │                                                           │
└────────┴───────────────────────────────────────────────────────────┘
```

### Tablet portrait notes

- A narrow navigation rail can preserve labels without using a full desktop sidebar.
- Main content remains a readable single column.
- Do not force a permanent task-detail panel into portrait width.
- The user opens task detail as a sheet or full-height secondary view.

## 5. My Day — tablet landscape

**Reference viewport:** approximately 1024 × 768 CSS px.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                           [ + Add task ]│
├────────────┬────────────────────────────────────────────┬───────────────────┤
│ My Day     │ My Day                                     │ Task preview      │
│ My Tasks   │ Tuesday, 3 November                        │                   │
│ Projects   │                                            │ Prepare weekly     │
│ More       │ OVERDUE                                    │ sales report       │
│            │ [ Prepare supplier payment ]               │                   │
│            │                                            │ Due today          │
│            │ TODAY'S FOCUS                              │ Priority: High     │
│            │ [ Prepare weekly sales report ]            │ Project: Sales     │
│            │                                            │                   │
│            │ DUE TODAY                                  │ [ Open details ]   │
│            │ [ Call supplier about delivery ]           │                   │
│            │ [ Review campaign draft ]                   │                   │
│            │                                            │                   │
└────────────┴────────────────────────────────────────────┴───────────────────┘
```

### Tablet landscape notes

- Show a detail pane only if the task list and detail remain readable.
- If content becomes cramped, use one main pane and open details as a sheet.
- The preview pane is optional; the selected task must remain identifiable.

## 6. My Day — laptop / desktop

**Reference viewport:** 1440 × 900 CSS px.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ BVC Task Management                                              Search     + Add    │
├──────────────────┬───────────────────────────────────────────┬─────────────────────┤
│ MY WORK          │ My Day                                    │ QUICK VIEW          │
│                  │ Tuesday, 3 November                       │                     │
│ ◉ My Day         │                                           │ Prepare weekly      │
│ □ My Tasks       │ OVERDUE                                   │ sales report        │
│ ▦ Projects       │ ┌───────────────────────────────────────┐ │                     │
│                  │ │ Prepare supplier payment       High   │ │ Due today           │
│ ──────────────── │ └───────────────────────────────────────┘ │ Priority: High      │
│                  │                                           │ Project: Sales      │
│ TEMPLATES        │ TODAY'S FOCUS                             │                     │
│ Settings &       │ ┌───────────────────────────────────────┐ │ [Open details]      │
│ Backup           │ │ Prepare weekly sales report   Focus   │ │                     │
│                  │ └───────────────────────────────────────┘ │                     │
│                  │                                           │                     │
│                  │ DUE TODAY                                 │                     │
│                  │ ┌───────────────────────────────────────┐ │                     │
│                  │ │ Call supplier about delivery  Normal  │ │                     │
│                  │ └───────────────────────────────────────┘ │                     │
│                  │                                           │                     │
│                  │ UPCOMING                                  │                     │
│                  │ [ Prepare Friday meeting ]                │                     │
└──────────────────┴───────────────────────────────────────────┴─────────────────────┘
```

### Desktop notes

- Persistent sidebar provides stable orientation.
- Main content width should remain readable; do not stretch task lists across the full display.
- Quick View is optional and can be hidden when no task is selected.
- Search and Add task are easy to reach from the header.
- On narrower desktop windows, remove the right-side pane before shrinking the task list too much.

## 7. My Tasks — list view

### Phone

```text
┌────────────────────────────────────┐
│ My Tasks                       +   │
│ [ Search tasks...              ]   │
│ [Filter] [Sort]                    │
│                                    │
│ TO DO · 5                           │
│ ○ Prepare weekly report             │
│   Sales · Due today · High          │
│ ○ Call supplier                     │
│   Operations · Tomorrow             │
│                                    │
│ IN PROGRESS · 2                     │
│ ○ Review campaign draft             │
│   Marketing · Friday                │
│                                    │
│ DONE · 4                            │
│ ✓ Update product list               │
│                                    │
│ My Day  My Tasks  Projects  More    │
└────────────────────────────────────┘
```

On phone, filters open in a bottom sheet or full-screen panel. Keep active filters visible as removable chips. Search and filters must not be hidden behind gestures.

### Tablet / desktop

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ My Tasks                                               [ + Add task ]    │
│ [ Search tasks... ]   [Status ▾] [Priority ▾] [Due date ▾] [Project ▾]    │
│ [List] [Kanban]                                            Sort: Due ▾    │
├──────────────────────────────────────────────────────────────────────────┤
│ □ Prepare weekly report          Sales         Today       High          │
│ □ Call supplier                  Operations    Tomorrow    Normal        │
│ □ Review campaign draft          Marketing     Friday      Normal        │
│ ✓ Update product list            Shop          Done        Normal        │
└──────────────────────────────────────────────────────────────────────────┘
```

## 8. My Tasks — Kanban view

Kanban is optional and should appear only when the available width can support readable columns. On a phone, use the list view as the default; do not force three narrow columns onto the screen.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ My Tasks   [List] [Kanban]                             [ + Add task ]       │
├───────────────────┬───────────────────┬────────────────────────────────────┤
│ TO DO             │ IN PROGRESS       │ DONE                               │
│                   │                   │                                    │
│ [Task card A]     │ [Task card C]     │ [Task card E]                      │
│ [Task card B]     │ [Task card D]     │ [Task card F]                      │
│                   │                   │                                    │
└───────────────────┴───────────────────┴────────────────────────────────────┘
```

Every status change must also be available through an explicit status menu/button. Drag-and-drop cannot be the only method.

## 9. Quick Add Task

### Phone sheet

```text
┌────────────────────────────────────┐
│ Add task                        ×  │
│                                    │
│ Task title *                       │
│ [ What needs to be done?         ] │
│                                    │
│ [ + Add details ]                  │
│                                    │
│                       [ Save task ]│
└────────────────────────────────────┘
```

### Expanded details

```text
Task title *          [________________________]
Due date              [No date              ▾]
Priority              [Normal               ▾]
Project               [No project           ▾]
Responsible person    [Optional              ]
Notes                 [Add a note...         ]
Checklist             [ + Add checklist item ]

[Cancel]                                  [Save task]
```

Title is the only required field. Product Definition defaults apply when optional fields are not supplied.

## 10. Task Detail

### Phone

Open as a full-screen page or sheet:

```text
┌────────────────────────────────────┐
│ ‹ Back                 Task details│
│                                    │
│ Prepare weekly sales report        │
│ [To Do ▾]                 [☆ Focus]│
│                                    │
│ Due date       Today                │
│ Priority       High                 │
│ Project        Sales                │
│ Responsible   Optional              │
│                                    │
│ Notes                              │
│ Review this week's sales activity. │
│                                    │
│ Checklist                          │
│ □ Collect figures                  │
│ □ Review results                   │
│ □ Prepare summary                  │
│                                    │
│ [Delete]                  [Save]   │
└────────────────────────────────────┘
```

### Tablet / desktop

Task detail may open in a right-side pane while retaining the current list context. On narrower widths, use a full-page/sheet layout instead.

## 11. Projects

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Projects                                             [ + New project]│
│                                                                      │
│ [Sales]             8 tasks · 3 done                                  │
│ [Marketing]         5 tasks · 2 done                                  │
│ [Store Operations]  6 tasks · 4 done                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Project detail:

```text
‹ Projects        Sales                                  [Edit project]

Description (optional)

Tasks                          [ + Add task ]
□ Prepare weekly report        Today
□ Call customer                Tomorrow
✓ Update proposal              Done

Basic progress summary
```

Do not add Gantt charts, resource planning, dependencies, or team assignment in v0.1.

## 12. Templates — starter kit preview

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Templates                                                            │
│ Choose a starting point for the kind of work you do.                 │
│                                                                      │
│ [Personal Work]        [Sales Team Lead]                              │
│ [Marketing Manager]    [CEO / Executive]                              │
│ [Shop Owner]           [Restaurant Owner]                             │
│ [Project Manager]                                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Preview before applying:

```text
Marketing Manager
Includes:
- Campaigns, Content, Social Media, Events, Reports
- Reusable checklist templates
- Optional example tasks

[Back]                              [Apply this starter kit]
```

For an existing workspace, the preview must state that selected starter content will be added and user-created work will not be replaced.

## 13. Settings & Backup

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Settings & Backup                                                    │
│                                                                      │
│ YOUR DATA                                                            │
│ Your workspace is stored in this browser on this device.             │
│ It does not automatically sync to your other devices.               │
│                                                                      │
│ [Export backup]                                                      │
│ [Restore from backup]                                                │
│                                                                      │
│ PREFERENCES                                                          │
│ Selected starter kit: Marketing Manager                              │
│                                                                      │
│ HELP & VERSION                                                       │
│ About this app · Version                                              │
└──────────────────────────────────────────────────────────────────────┘
```

## 14. Empty, error, and confirmation wireframes

### Empty My Day

```text
My Day
Tuesday, 3 November

You're all clear for today.
Add a task when something needs your attention.

[ + Add task ]

Want a head start? [Browse templates]
```

### Search with no results

```text
No tasks found for “supplier”.
Try another word or clear your filters.
[Clear search and filters]
```

### Delete confirmation

```text
Delete this task?
“Prepare weekly sales report” will be removed from this workspace.
This cannot be undone from the task list.

[Cancel]                         [Delete task]
```

### Restore confirmation

```text
Restore this backup?
Restoring will replace the current workspace on this device.
Export a backup of the current workspace first if you may need it later.

[Cancel]                         [Restore workspace]
```

## 15. What these wireframes do not define

- Final pixel-perfect spacing or production typography.
- Final icon artwork.
- Final frontend framework or component library.
- Database or local-storage implementation.
- Automatic synchronization or multi-user behavior.
- Native iOS/Android applications.
- Offline/PWA guarantees.

These are elaborated only where they remain within the Product Definition and are approved in the following design/architecture stages.
