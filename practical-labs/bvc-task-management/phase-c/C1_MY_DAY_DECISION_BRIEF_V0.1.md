# C1 — My Day: Product Decision & Implementation Readiness Brief

**Project:** BVC Task Management  
**Phase:** C — Make It Useful Every Day  
**Curriculum:** Curriculum Map v0.2.0  
**Product authority:** Product Definition v0.2.0  
**Status:** OWNER-APPROVED PRODUCT DECISIONS RECORDED; DATA-COMPATIBILITY AND IMPLEMENTATION-CONTRACT PROPOSALS PREPARED FOR OWNER REVIEW  
**Prepared:** 2026-11-24  
**Proposal revision:** 2

---

## 1. Purpose

Prepare C1 — My Day for a separate, bounded implementation task without guessing unresolved product behavior or changing the working GAIS application.

C1 introduces an everyday view that helps a user understand what needs attention today. The implementation must follow Product Definition v0.2.0, the existing UX placement rules, the accepted Phase 3.2 Data Model, and the three Product/UX decisions approved by the Human Owner on 2026-11-24.

This brief contains technical recommendations for Owner review. It is not an approved implementation specification, Task Contract, execution authorization, or evidence that C1 has been implemented.

## 2. Canonical product behavior

Product Definition v0.2.0 §7.2 defines the My Day order:

1. Overdue.
2. Due Today.
3. Today's Focus.
4. Upcoming.
5. Add task.

Product requirement **FR-010** and acceptance criterion **AC-006** require the My Day view to group overdue, due-today, focus and upcoming work without duplicate task rows.

The UX Journey & Navigation §6.2 adds these placement rules:

- An overdue task appears once in Overdue, even if it is also marked Focus.
- A task due today appears once in Due Today, even if it is also marked Focus.
- A Focus task that is neither overdue nor due today appears in Today's Focus.
- Upcoming excludes tasks already displayed in an earlier section.
- A focused future-due task appears in Today's Focus, not again in Upcoming.
- Completed tasks are excluded from active My Day sections.
- Today's Focus is a marker, not a task status, priority or project.

## 3. Product decisions — approved C1 baseline

| Canonical decision | Current status | Approved outcome |
|---|---|---|
| DR-001 — Upcoming horizon | APPROVED — 2026-11-24 | Next 7 calendar days |
| DR-002 — Today's Focus lifetime/reset | APPROVED — 2026-11-24 | Focus is scoped to the current local calendar date and automatically expires at the next local calendar day |
| DR-017 — Timezone source and editing | APPROVED — 2026-11-24 | Detect the browser's IANA timezone on first use and allow the user to correct it |

**Decision authority:** Human Owner / Product Owner. The canonical outcomes are recorded in `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` §3.4 and were synchronized through merged PR #83.

These decisions are resolved for C1 and must not be reopened as pending. They do not approve an implementation Contract or authorize GAIS changes.

## 4. C1 data-compatibility proposal — for Owner review

### 4.1 Existing accepted workspace

B2 Contract #005 Revision 1 defines the current Beginner runtime workspace:

- Local Storage key: `bvc-task-management:workspace:v1`
- Envelope format: `bvc-task-management-workspace`
- `formatVersion: 1`
- `sourceMode: browser`
- A stable `workspaceId`
- `data.tasks` records containing `id` and `title`
- `data.settings` is an object; the B2 scope leaves it empty.

Owner-supplied evidence BVCTM-055 / BVCTM-056 shows two existing tasks stored under this key and restored after Preview refresh. Their identities and titles must be preserved. They are not test fixtures to delete or replace.

The accepted Phase 3.2 Data Model already defines the logical task fields `status`, `priority`, `due_date` and `focus_date`, plus an IANA timezone in user settings. C1 must introduce the relevant fields without silently losing the B2 records.

### 4.2 Recommended C1 task fields

The following mapping is proposed because it aligns the accepted Data Model with the current B2 envelope:

| Field | Proposed C1 meaning | Compatibility/default rule |
|---|---|---|
| `id` | Existing task UUID | Preserve the exact existing value |
| `title` | Existing non-empty title | Preserve the exact existing value |
| `status` | `todo`, `in_progress`, `done` | Migrated B2 tasks default to `todo`; new title-only tasks retain the Product Definition's To Do default |
| `priority` | `low`, `normal`, `high` | Migrated tasks default to `normal`; C1 does not implement priority controls |
| `due_date` | Optional calendar date, `YYYY-MM-DD` | Missing means no due date; never encode a date-only value as UTC midnight |
| `focus_date` | Optional local calendar date, `YYYY-MM-DD` | Focus is active only when it equals the current date in the selected IANA timezone |
| `data.settings.timezone` | User-selected IANA timezone | Initialize from browser detection; allow correction; validate before use |

The proposed `due_date` and `focus_date` names follow the accepted logical Data Model. The proposal uses `data.settings.timezone` because the B2 runtime envelope already contains `data.settings` and the Data Model defines timezone as a User Settings property. This is a proposed runtime extension, not a claim that Contract #005 already approved these new fields.

### 4.3 Recommended versioned migration

**Recommendation:** introduce a complete version-2 workspace under a new key, rather than silently changing the structure stored under the B2 v1 key.

| Item | Existing B2 source | Proposed C1 destination |
|---|---|---|
| Local Storage key | `bvc-task-management:workspace:v1` | `bvc-task-management:workspace:v2` |
| `formatVersion` | `1` | `2` |
| Task fields | `id`, `title` | Preserve `id`, `title`; add `status`, `priority`; optional `due_date`, `focus_date` |
| Settings | Empty object in B2 | Add validated `timezone` |

Proposed migration sequence:

1. Check whether a valid v2 workspace already exists. If it does, load it.
2. If v2 is absent, read and strictly validate the v1 envelope and every existing task.
3. Build a complete v2 candidate in memory. Preserve `workspaceId`, every task ID and every title. Set legacy task defaults to `status: "todo"` and `priority: "normal"`; leave `due_date` and `focus_date` unset.
4. Resolve a valid IANA timezone from browser detection. If detection is unavailable or invalid, ask the user to provide a valid timezone rather than silently treating UTC as the user's local timezone.
5. Validate the complete v2 candidate before any write.
6. Write the complete candidate once to the v2 key, read it back, and validate the persisted result before using it as the active workspace.
7. Preserve the original v1 key unchanged throughout C1. Do not delete it or attempt cleanup in this lesson.
8. If parsing, validation, quota, write or read-back verification fails, do not overwrite the v1 source and do not claim that migration succeeded. Keep the existing data recoverable and show a truthful error.

A present-but-invalid v2 key must not silently fall back to an older v1 snapshot after v2 may contain newer changes. Stop writes and expose a recovery message instead. Never split one task across multiple keys; v2 is one complete active workspace. The v1 copy is a preserved recovery point, not a second live data store.

This approach is a recommendation for Contract #007 review. The exact migration and recovery controls must be checked against the live GAIS source before execution.

### 4.4 Date, timezone and section semantics

Recommended deterministic rules for the implementation proposal:

- Treat `due_date` and `focus_date` as date-only strings in `YYYY-MM-DD` form.
- Derive "today" from the selected IANA timezone using timezone-aware date parts. Do not use `Date.toISOString().slice(0, 10)` as a substitute for the user's local calendar date.
- Perform calendar-day arithmetic on calendar dates, not by adding fixed 24-hour durations. This avoids daylight-saving and local-midnight errors.
- Interpret the approved seven-calendar-day Upcoming horizon as tomorrow through the date seven calendar days after today, inclusive. Due Today is handled by its own section. This boundary interpretation is included for Owner review in the implementation proposal.
- Exclude records whose status is `done` from active My Day sections. A legacy record without a status is migrated to `todo`.
- Place each task once, using this precedence: Overdue → Due Today → Today's Focus → Upcoming.
- A Focus marker is active only while `focus_date` equals today in the selected timezone. It expires through date comparison at the next local calendar day; no midnight timer or destructive cleanup is required.
- Changing the selected timezone immediately recalculates the current date and section placement. A previously stored `focus_date` is not silently rewritten; it is active only if it still equals the newly selected timezone's current date.
- Keep the selected IANA timezone visible and correctable through a small, accessible C1 control. The full Settings experience remains in C5.

### 4.5 Minimal C1 interaction boundary

To make the approved My Day sections usable without expanding into C2:

- Keep title-only task creation valid.
- Allow an optional due date during quick task capture.
- Allow the user to mark a newly created task as Today's Focus and to toggle Focus on tasks already visible in My Day.
- Display tasks in the five canonical sections and prevent duplicate rows.
- Provide a minimal correction control for the selected IANA timezone.
- Do not add full task editing/deletion, search, filters, Kanban, priority management, project management, backup/restore or cloud features. Those remain outside C1 unless separately approved.

Existing B2 tasks with no due date and no Focus date remain preserved and active, but are not placed into the date-based My Day sections. C2 — My Tasks is the planned destination for the complete task list. The implementation must not hide this distinction from the learner or imply that the old records were deleted.

## 5. Recommended implementation sequence

1. Confirm the C1 data-compatibility proposal and the exact date-boundary interpretation.
2. Review the readiness Contract #006 Revision 2 and the separate implementation Contract #007 proposal.
3. Approve or reject Contract #007 separately. Contract #006 is a documentation/readiness task; it does not authorize the C1 app implementation.
4. Only after Contract #007 is approved, prepare Prompt #0006 under the Vietnamese-first Prompt Delivery Standard.
5. Obtain explicit execution authorization and run a fresh read-only preflight of the exact GAIS app and current `app/page.tsx`; confirm the single-writer condition.
6. Execute only within the approved Contract #007 scope.
7. Review Preview behavior, migration evidence, date-boundary tests and regression results before requesting C1 acceptance.

## 6. Explicit exclusions from C1

Unless a later approved Contract says otherwise, C1 must not silently implement:

- Full task editing or deletion flows.
- Search, filters, Kanban or completion-management UI (C2).
- Priority management beyond the Product Definition defaults.
- Projects or project-removal behavior (C3).
- Role Starter Kits (C4).
- JSON export/import, backup or restore (C5).
- Cloud synchronization, database, Auth, Supabase, APIs or external services.
- A navigation redesign or reopening the formal Phase 3.1 UX package.

## 7. Current readiness gate

| Gate | Status |
|---|---|
| Phase B Owner closeout | ACCEPTED — 2026-11-24 |
| Curriculum C1 identity | CONFIRMED — My Day |
| Product FR-010 / AC-006 | CANONICAL |
| DR-001 Upcoming horizon | APPROVED — 2026-11-24 |
| DR-002 Focus lifetime/reset | APPROVED — 2026-11-24 |
| DR-017 Timezone source/editing | APPROVED — 2026-11-24 |
| B2 v1 source and two saved task records | OWNER-SUPPLIED EVIDENCE ON MAIN; must be preserved |
| C1 v1 → v2 compatibility/migration design | PROPOSED — OWNER REVIEW REQUIRED |
| Readiness Contract #006 Revision 2 | DRAFT_NOT_APPROVED |
| Separate C1 implementation Contract #007 Revision 1 | DRAFT_NOT_APPROVED |
| Prompt #0006 | NOT_ALLOCATED |
| GAIS code changes | NOT_AUTHORIZED |

---

**Conclusion:** Phase C is active and the three C1 Product/UX decisions are resolved. The next gate is Owner review of the data-compatibility proposal and the two separate Contract roles. No C1 implementation or Prompt #0006 execution is authorized by this brief or by merging the documentation PR.
