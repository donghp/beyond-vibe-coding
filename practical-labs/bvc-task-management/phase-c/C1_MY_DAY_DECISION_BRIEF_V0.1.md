# C1 — My Day: Product Decision & Implementation Readiness Brief

**Project:** BVC Task Management  
**Phase:** C — Make It Useful Every Day  
**Curriculum:** Curriculum Map v0.2.0  
**Product authority:** Product Definition v0.2.0  
**Status:** FOUR C1 PRODUCT DECISIONS APPROVED; CONTRACT #007 REVISION 1 OWNER-APPROVED; R4 EXECUTION GATES OPEN  
**Prepared:** 2026-11-24  
**Proposal revision:** 2

---

## 1. Purpose

Prepare C1 — My Day for a separate, bounded implementation task without guessing unresolved product behavior or changing the working GAIS application.

C1 introduces an everyday view that helps a user understand what needs attention today. The implementation must follow Product Definition v0.2.0, the existing UX placement rules, the accepted Phase 3.2 Data Model, and the four Product/UX decisions approved by the Human Owner on 2026-11-24.

This brief contains technical recommendations for Owner review. It is not an approved implementation specification, Task Contract, execution authorization, or evidence that C1 has been implemented.

## 2. Canonical product behavior

Product Definition v0.2.0 §7.2 defines the four priority sections and the Add task action. DR-020 adds one supplemental section for active tasks that are not assigned to a date-driven section:

1. Overdue.
2. Due Today.
3. Today's Focus.
4. Upcoming.
5. Unscheduled (supplemental section approved by DR-020).
6. Add task.

DR-020 does not reorder the four Product Definition priority sections; Add task remains the final action.

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

**Decision authority:** Human Owner / Product Owner. The canonical outcomes are recorded in `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` §3.4. DR-001, DR-002 and DR-017 were published through PR #83; DR-020 was added through merged PR #86.

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

This approach is a recommendation for Contract #007 review. The unchanged v1 key is only the original pre-migration checkpoint; it is not a rolling backup and does not by itself restore tasks created after v2 becomes active. A tested, Owner-approved post-migration downgrade/recovery procedure is a mandatory R4 execution gate. The exact migration and recovery controls must be checked against the live GAIS source before execution.

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

Existing B2 tasks with no due date and no Focus date remain preserved and active and are displayed in the approved Unscheduled section. C2 — My Tasks remains the planned destination for the complete task list.

### 4.6 Legacy B2 tasks with no due date or Focus — Owner decision required

The canonical B2 evidence shows two saved tasks, each represented by an `id` and `title`. No due-date or Focus field exists in the accepted B2 records. The proposed migration preserves both tasks and defaults their status to `todo` and priority to `normal`, but neither task would be assigned to Overdue, Due Today, Today's Focus or Upcoming.

Leaving these tasks stored but absent from the My Day screen may make a learner believe their work has disappeared. Do not automatically assign a due date or Focus; that would invent user intent and change task meaning.

**DR-020 — APPROVED 2026-11-24.** The Human Owner approved a supplemental `Unscheduled` section after Upcoming and before Add task. The four approved priority sections retain their existing order. Each active task with no due date and no Focus marker active today appears exactly once in Unscheduled; completed tasks are excluded. No due date or Focus marker is invented for legacy tasks. The canonical decision is recorded in `PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` §3.4.

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
| C1 implementation Contract #007 Revision 1 | OWNER-APPROVED — canonical via merged PR #88 |
| R4 review assignment | DeepSeek technical review; ChatGPT Domain Authority — report/decision pending | 
| Post-migration recovery test | NOT_TESTED |
| Prompt #0006 | NOT_ALLOCATED |
| GAIS code changes | NOT_AUTHORIZED |

---

**Conclusion:** Phase C is active and the four C1 Product/UX decisions are resolved. Contract #007 Revision 1 is Human Owner-approved and canonical via merged PR #88; Contract #006 Revision 2 remains a separate R1 readiness draft. On 2026-11-25 the Human Owner designated DeepSeek as read-only AI technical reviewer and ChatGPT as R4 Data Privacy/Security Domain Authority and Prompt Architect (see `projects/task-management/phase3.3/reviews/BVC-TM-TC-007_R4_DOMAIN_REVIEW_ASSIGNMENT_2026-11-25.md`). The review report and ChatGPT domain decision are still pending; assignment is not approval. Post-migration recovery remains untested, separate explicit execution authorization has not been granted, and fresh live GAIS/single-writer preflight remains required. DR-020 resolves legacy-task visibility. This brief does not authorize GAIS implementation; Prompt #0006 remains NOT_ALLOCATED.
