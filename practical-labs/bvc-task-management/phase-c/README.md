# Phase C — Make It Useful Every Day

**Learning level:** Beginner Expansion  
**Status:** ACTIVE — C1 Product/UX decisions approved; implementation Contract preparation

Phase B was explicitly accepted and closed by the Human Owner on 2026-11-24. Phase C now begins with the current Product Definition v0.2.0 and Curriculum Map v0.2. The six lesson groups below follow the canonical curriculum order.

## Learning sequence

| Lesson | Learning area | What the learner will learn | Gate before implementation |
|---|---|---|---|
| C1 | **My Day** | Understand and use Overdue, Due Today, Today's Focus and Upcoming, without duplicate task rows. | DR-001, DR-002 and DR-017 approved 2026-11-24; review storage/data-model compatibility and approve a bounded C1 Task Contract. |
| C2 | **My Tasks** | View, create, edit, complete, prioritize, search and filter tasks. | Approve exact task-state, priority, search/filter behavior and regression criteria. |
| C3 | **Projects** | Organize tasks into personal projects or work areas. | Resolve DR-003 project-removal behavior before implementation. |
| C4 | **Templates** | Understand, preview, customize and apply Role Starter Kits. | Resolve DR-004 repeat-application behavior and DR-015 packaging before dependent implementation. |
| C5 | **Settings & Backup** | Understand preferences, browser workspace, JSON export and restore. | Resolve DR-006 restore conflict/replacement semantics and define safe synthetic-data tests. |
| C6 | **Responsive & Everyday Use** | Use the app across phone, tablet, laptop and desktop; review accessibility and data transparency. | Reconcile applicable UX decisions and preserve the separate OPEN status of formal Phase 3.1 UX Acceptance. |

## C1 — My Day: first entry point

The approved Product Definition v0.2.0 §7.2 defines this order:

1. Overdue
2. Due Today
3. Today's Focus
4. Upcoming
5. Add task

A task must appear only once in My Day. C1 follows the Product Definition and current UX journey. The Human Owner approved DR-001, DR-002 and DR-017 for C1 on 2026-11-24; see the canonical Product/UX Decision Register §3.4.

### Approved C1 Product/UX decisions

| Decision | Current status | Proposed default in existing UX material | Required action |
|---|---|---|---|
| DR-001 — Upcoming horizon | APPROVED — 2026-11-24 | Next 7 calendar days | Define date boundaries and tests in Contract #006. |
| DR-002 — Today's Focus lifetime/reset | APPROVED — 2026-11-24 | Expires at next local calendar day | Define storage semantics and day-boundary tests in Contract #006. |
| DR-017 — Timezone source and editing | APPROVED — 2026-11-24 | Browser IANA timezone detection with user correction | Define persistence and fallback behavior in Contract #006. |

These three decisions are approved for C1. C1 implementation must not begin until Contract #006 is separately approved and an explicit execution authorization is issued.

### Current C1 preparation

- [C1 — My Day Decision Brief](C1_MY_DAY_DECISION_BRIEF_V0.1.md)
- [C1 Task Contract #006 proposal](../../../projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-006_TASK_CONTRACT_V0.1.yaml)

**Prompt #0006 has not been allocated.** It will be prepared only after the C1 Contract and relevant Product Owner decisions are approved. When a GAIS prompt is issued, it must follow the Vietnamese-first Prompt Delivery Standard: learner explanation, copy-ready prompt, and post-run review instructions.

## Product and implementation boundaries

- Product Definition v0.2.0 is the product authority.
- Curriculum Map v0.2 defines the learning sequence.
- Phase 3.2 Architecture is an accepted design baseline; this does not independently authorize code changes.
- Formal Phase 3.1 UX Acceptance remains OPEN.
- Beginner remains browser-local; do not add cloud synchronization, database, Auth, or external services in this phase.
- Every implementation lesson requires its own approved Task Contract, exact scope, acceptance criteria and verification evidence.
- Do not describe a planned feature as implemented or working before the actual GAIS Preview and evidence support that claim.

## Navigation

- [Phase B — Acceptance & Closeout](../phase-b/PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md)
- [Phase B Index](../phase-b/README.md)
- [Curriculum Map v0.2](../CURRICULUM_MAP_V0.2.md)
- [Lesson Status Register v0.2](../LESSON_STATUS_REGISTER_V0.2.md)
