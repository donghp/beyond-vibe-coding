# C1 — My Day: Product Decision & Implementation Readiness Brief

**Project:** BVC Task Management  
**Phase:** C — Make It Useful Every Day  
**Curriculum:** Curriculum Map v0.2.0  
**Product authority:** Product Definition v0.2.0  
**Status:** PREPARATION — DR-001, DR-002 and DR-017 approved by Human Owner on 2026-11-24; implementation Contract approval remains required  
**Prepared:** 2026-11-24

---

## 1. Purpose

Prepare the first Phase C lesson without guessing unresolved product behavior or changing the working GAIS application.

C1 — My Day introduces an everyday view that helps a user understand what needs attention today. The lesson must follow the approved Product Definition and existing UX journey. Proposed defaults in UX documents are not approvals.

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
- Completed tasks are excluded from active My Day sections.
- Today's Focus is a marker, not a task status, priority or project.

## 3. Product decisions — approved C1 baseline

| Canonical decision | Current status | Existing proposed default | Options for Product Owner consideration |
|---|---|---|---|
| DR-001 — Upcoming horizon | APPROVED — 2026-11-24 | Next 7 calendar days | Approved outcome: next 7 calendar days. |
| DR-002 — Today's Focus lifetime/reset | APPROVED — 2026-11-24 | Focus marker scoped to the current local calendar date | Approved outcome: Focus automatically expires at the next local calendar day. |
| DR-017 — Timezone source and editing | APPROVED — 2026-11-24 | Detect browser IANA timezone on first use and allow user correction | Approved outcome: detect browser IANA timezone and permit user correction. |

**Owner decision record:** The Human Owner explicitly approved all three defaults on 2026-11-24. The canonical outcomes are recorded in `PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md` §3.4. This resolves the three product decisions for C1, but does not itself approve Contract #006 or authorize GAIS implementation.

## 4. Data and compatibility implications

The accepted B2 Beginner workspace currently persists a versioned JSON envelope with task records containing only id and title. C1's product behavior introduces date- and focus-dependent concepts that are not present in the accepted B2 task record.

Before a write-capable C1 task is approved, the implementation proposal must address:

- Optional date-only due-date representation and local-calendar interpretation.
- How a Focus marker is stored and expires or persists under the approved DR-002 decision.
- The task status needed to exclude completed tasks from active My Day sections, coordinated with C2 — My Tasks.
- Backward compatibility for existing B2 workspaces containing only id and title.
- Whether the workspace format needs an explicit version migration, and how the app preserves existing tasks if migration or validation fails.
- How date boundaries behave around local midnight and timezone changes.

These are design questions, not permission to modify the B2 schema or app/page.tsx.

## 5. Recommended implementation sequence

1. Product Owner resolves DR-001, DR-002 and DR-017 in the canonical Product/UX Decision Register.
2. Review the accepted Phase 3.2 architecture and current GAIS source/readiness against those decisions.
3. Define the C1 task fields and a backward-compatible migration strategy for the existing version-1 browser workspace.
4. Prepare and approve a bounded C1 implementation Contract with exact files, diff budget, stop conditions, acceptance criteria and verification evidence.
5. Only after the Contract is approved, prepare the sequential GAIS Prompt #0006 using the Vietnamese-first Prompt Delivery Standard.
6. Newbie executes in their own GAIS workspace; no GitHub connection is required in Beginner mode.
7. Review actual Preview behavior and evidence before declaring C1 accepted.

## 6. Explicit exclusions from C1

Unless a later approved Contract says otherwise, C1 must not silently implement:

- Full task editing or deletion flows.
- Search, filters, Kanban or completion-management UI (C2).
- Projects or project-removal behavior (C3).
- Role Starter Kits (C4).
- JSON export/import or restore (C5).
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
| Existing B2 workspace compatibility design | REQUIRED |
| C1 implementation Contract | DRAFT_NOT_APPROVED |
| Prompt #0006 | NOT_ALLOCATED |
| GAIS code changes | NOT_AUTHORIZED |

---

**Conclusion:** Phase C is active. C1 My Day is the first lesson. The immediate next decision is to resolve DR-001, DR-002 and DR-017; implementation and Prompt #0006 remain gated until the C1 scope is approved.
