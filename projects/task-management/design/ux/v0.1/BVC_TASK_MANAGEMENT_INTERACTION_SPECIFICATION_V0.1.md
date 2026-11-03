# BVC Task Management — Interaction Specification v0.1.0

**Document ID:** BVC-TM-UX-005  
**Version:** 0.1.0  
**Status:** Draft — Product Owner Review Required  
**Date:** 2026-11-03  
**Parent baseline:** BVC-TM-PD-001, Product Definition v0.1.0

---

## 1. Purpose

Describe predictable interaction behavior for the everyday tasks in BVC Task Management. The user should understand what will happen before taking an important action and receive a clear result afterward.

## 2. General interaction rules

1. The shortest successful path should be the default.
2. Required information must be obvious; optional information must not block saving.
3. Do not lose typed information when a sheet closes, the viewport resizes, or validation fails.
4. Important actions provide immediate, truthful feedback.
5. Prevent accidental destructive actions.
6. Avoid hidden gesture-only controls.
7. Preserve list context when the user opens and closes task details.
8. Do not claim that data has synced or backed up to cloud storage.

## 3. Create a task

### 3.1 Quick add

- Entry points: My Day, My Tasks, and Project Detail.
- Required field: task title only.
- Default status: To Do.
- Default priority: Normal.
- Default due date: none.
- Default project: none, except when launched from a specific project context where the project may be preselected.
- Default responsible-person label: empty.

### 3.2 Interaction sequence

1. User activates Add task.
2. Quick-add surface opens and focuses the title field.
3. User enters a title.
4. User selects Save task.
5. The app validates that the title is not empty after trimming whitespace.
6. The app saves the task.
7. The app shows “Task saved” (or equivalent) only after persistence succeeds.
8. The new task appears in the current view when it matches that view's rules.

### 3.3 Optional details

“Add details” reveals optional fields: due date, priority, project, responsible-person label, notes, and checklist items. The user can save without opening this section.

### 3.4 Validation and errors

- Blank title: remain in the form, show a text explanation, and focus the title field.
- Persistence error: preserve all input, show a clear error, and offer Retry.
- Duplicate click: prevent duplicate task creation while the save is in progress.

## 4. View and edit a task

- Selecting a task opens its detail surface.
- The detail surface exposes title, status, priority, due date, project, optional responsible-person label, notes, and checklist.
- Save changes explicitly unless a field has an intentionally designed immediate-save behavior.
- If the user attempts to leave with unsaved changes, ask whether to discard or continue editing.
- Closing task detail returns to the previous screen and restores the prior search, filters, and scroll position where practical.

## 5. Mark a task complete

- A task can be marked Done through a clearly labeled checkbox or action.
- The operation must be possible using touch, mouse, and keyboard.
- After a successful save, the task is visibly marked Done and removed from active My Day sections.
- My Tasks and project views continue to show the task with Done status where their current filters include it.
- Provide a brief confirmation such as “Marked as done”.
- If saving fails, keep the previous status and explain the failure.

## 6. Change task status

Allowed MVP statuses:

- To Do
- In Progress
- Done

The user can change status through a menu/button. Kanban drag-and-drop may be supported on suitable screens, but must never be the only way to change status. Status updates use the same persistence and feedback rules as task completion.

## 7. Set priority and due date

### Priority

- Values: Low, Normal, High.
- Normal is the default.
- Display the text label; color is supplemental.
- Priority changes should not require opening a complex settings page.

### Due date

- Due date is optional.
- Date-only values are interpreted using the agreed local-calendar behavior.
- Clearing the due date must be possible.
- The date picker must work with keyboard and touch.
- Date labels should be human-readable; exact storage semantics belong to Application Architecture.

## 8. Today's Focus

- The user can mark/unmark a task as a focus item for the current day.
- The control must have a visible label or accessible name.
- Focus is a user-selected marker; it is not a new task status or priority.
- A task must appear only once in My Day. If it is both overdue and focused, show it in Overdue with a Focus marker.
- The detailed persistence/reset behavior for the focus marker (e.g., day boundary) must be agreed before implementation; proposed behavior is a date-scoped focus flag for the current local date.

## 9. Search and filters

- Search is available in My Tasks.
- Search field has a clear label and clear action.
- Filters: status, priority, due date, and project.
- Active filters appear as removable chips or an equivalent visible summary.
- Clear all resets filters and search in one explicit action.
- Empty search results explain that no tasks match and offer Clear search/filters.
- Returning from task detail preserves the current query and filters.
- Search must not silently modify task content.

## 10. List and Kanban

### List

- Default view on compact screens.
- Task rows show title first, then helpful metadata.
- Completion action is directly available.

### Kanban

- Optional on suitable screen widths.
- Columns: To Do, In Progress, Done.
- A card can be moved by drag only as an enhancement.
- Also provide a status menu/button for keyboard, touch, and assistive technology users.
- Do not force a three-column layout onto a narrow phone.

## 11. Projects

### Create/edit

- Required: project/work-area name.
- Optional: description.
- Show a clear Save/Cancel action.
- Project detail lists associated tasks and a basic completion summary.
- Tasks may remain unassigned.

### Delete/archive behavior — proposed safety rule

Product Definition allows project removal but does not specify what happens to linked tasks. Proposed default for review:

- Removing a project must not delete its tasks.
- Tasks linked to it become unassigned (“No project”).
- Ask for confirmation and explain this effect before removal.

Do not implement a cascade deletion of tasks without an explicit, separately reviewed product decision.

## 12. Apply a starter kit

- User previews the starter kit before applying it.
- Preview lists categories/groups, checklist templates, and optional example tasks.
- Applying a kit to a non-empty workspace requires a clear merge explanation and confirmation.
- Existing user-created tasks, projects, and notes must not be silently overwritten or deleted.
- Applying the same kit repeatedly should not create uncontrolled duplicates. Proposed behavior: recognize previously applied template items and skip or offer only missing items.
- Show a result summary: items added, items skipped, and any issue requiring attention.
- Starter content remains editable and removable by the user.

## 13. Delete a task

- Delete is a destructive action and must be visually separated from Save/Complete.
- Ask for confirmation or provide a reliable undo path. Proposed v0.1 behavior: confirmation dialog.
- Name the task in the dialog so the user knows what will be deleted.
- Cancel returns to the task unchanged.
- Confirm removes the task and shows a truthful result.
- If deletion fails, preserve the task and show an error.

## 14. Backup and restore

### Export

1. User opens Settings & Backup.
2. User selects Export backup.
3. The app serializes the local workspace into a versioned portable file (exact schema is defined in the architecture/data stage).
4. The app initiates the browser download.
5. The UI confirms export initiation/completion according to what the browser can reliably report; do not claim that the user has stored the file in a safe location.

### Restore

1. User selects a file.
2. The app validates structure and supported version before modifying current data.
3. If invalid, reject it and preserve current data.
4. If valid, show what restore will do.
5. If it replaces the current workspace, request explicit confirmation.
6. Apply restore atomically where technically possible; on failure, preserve or recover the prior workspace.
7. Show a truthful result and make the restored data visible.

No automatic cloud backup or synchronization is part of v0.1.

## 15. Local-data disclosure

Before first important data entry, explain:

> Your tasks are stored in this browser on this device. They do not automatically appear on your other devices. Use Settings & Backup to export a file and restore it on another device.

Keep the explanation accessible later through More → Settings & Backup. The wording must not imply that the app controls the user's chosen file-storage location.

## 16. Notifications and feedback

| Event | Feedback |
|---|---|
| Task saved | “Task saved” after successful persistence |
| Task completed | “Marked as done” after successful persistence |
| Task updated | “Changes saved” after successful persistence |
| Task deleted | Confirmation before delete; success message after delete |
| Project saved | “Project saved” after successful persistence |
| Starter kit applied | Summary of added/skipped items |
| Backup exported | Clear export result; do not claim external backup storage |
| Invalid restore | Reason for rejection; existing workspace unchanged |
| Restore completed | Confirmation only after successful restore |
| Storage error | Plain-language error and safe retry/export guidance |

Use non-blocking status messages for routine success. Use dialogs only when the user must make a consequential decision.

## 17. Keyboard interaction

- All essential functions can be operated without a pointer.
- Tab order follows visual and logical reading order.
- Enter/Space activate buttons and checkboxes according to platform conventions.
- Escape closes a non-destructive sheet/dialog only when doing so does not discard unsaved changes without warning.
- Focus returns to the control that opened a modal/sheet when it closes.
- Search/filter controls remain keyboard accessible.

## 18. Open interaction decisions

| ID | Decision | Proposed behavior |
|---|---|---|
| INT-OPEN-01 | Today's Focus reset | Focus marker is scoped to the current local calendar date |
| INT-OPEN-02 | Project removal | Keep tasks and detach them from the project |
| INT-OPEN-03 | Reapplying a starter kit | Skip already-applied template items and show a summary |
| INT-OPEN-04 | Restore conflict | Validate first, then explicitly replace current workspace after confirmation |
| INT-OPEN-05 | Delete task | Confirmation dialog; no silent deletion |

These decisions should be reviewed before implementation tasks are written.
