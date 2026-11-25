# Phase C — Make It Useful Every Day

**Learning level:** Beginner Expansion  
**Status:** ACTIVE — C1 Product/UX decisions approved; Contract #007 Revision 1 Owner-approved; R4 execution gates remain open

Phase B was explicitly accepted and closed by the Human Owner on 2026-11-24. Phase C proceeds under Product Definition v0.2.0 and Curriculum Map v0.2. The six lesson groups below follow the canonical curriculum order.

## Learning sequence

| Lesson | Learning area | What the learner will learn | Gate before implementation |
|---|---|---|---|
| C1 | **My Day** | Understand and use Overdue, Due Today, Today's Focus and Upcoming, without duplicate task rows, including the Unscheduled section for undated active tasks. | DR-001, DR-002, DR-017 and DR-020 approved 2026-11-24; Contract #007 Revision 1 Owner-approved 2026-11-24; complete R4 domain approval, tested recovery, separate execution authorization and live preflight. |
| C2 | **My Tasks** | View, create, edit, complete, prioritize, search and filter tasks. | Approve task-state, priority, search/filter behavior and regression criteria. |
| C3 | **Projects** | Organize tasks into personal projects or work areas. | Resolve DR-003 project-removal behavior before implementation. |
| C4 | **Templates** | Understand, preview, customize and apply Role Starter Kits. | Resolve DR-004 repeat-application behavior and DR-015 packaging before dependent implementation. |
| C5 | **Settings & Backup** | Understand preferences, browser workspace, JSON export and restore. | Resolve DR-006 restore conflict/replacement semantics and define safe synthetic-data tests. |
| C6 | **Responsive & Everyday Use** | Use the app across phone, tablet, laptop and desktop; review accessibility and data transparency. | Reconcile applicable UX decisions and preserve the separate OPEN status of formal Phase 3.1 UX Acceptance. |

## C1 — My Day: first entry point

The Product Definition v0.2.0 §7.2 defines the four priority sections and Add task action. DR-020 adds one supplemental group for undated active work:

1. Overdue
2. Due Today
3. Today's Focus
4. Upcoming
5. Unscheduled — supplemental group for active tasks with no due date and no Focus active today
6. Add task

A task must appear only once in My Day. The four priority sections retain their Product Definition order; Unscheduled is supplemental and Add task remains last. The Human Owner approved DR-001, DR-002, DR-017 and DR-020 for C1 on 2026-11-24; see the canonical Decision Register updated through merged PR #86.

### Approved C1 Product/UX decisions

| Decision | Current status | Approved outcome | Implementation detail |
|---|---|---|---|
| DR-001 — Upcoming horizon | APPROVED — 2026-11-24 | Next 7 calendar days | The C1 proposal defines tomorrow through today + 7 calendar days, inclusive, for Owner review. |
| DR-002 — Today's Focus lifetime/reset | APPROVED — 2026-11-24 | Expires at next local calendar day | The C1 proposal stores a date-only focus marker and derives expiry by comparing it with today. |
| DR-017 — Timezone source and editing | APPROVED — 2026-11-24 | Browser IANA timezone detection with user correction | The C1 proposal stores a validated IANA timezone in workspace settings. |
| DR-020 — Legacy task visibility | APPROVED — 2026-11-24 | Supplemental Unscheduled section after Upcoming and before Add task | Both legacy tasks appear once without inventing dates or Focus. |

These decisions are approved for C1 and must not be treated as pending. Contract #007 Revision 1 is the implementation authority for its approved migration and behavior requirements. Runtime behavior, data preservation and recovery still require evidence under its verification checks.

### Current C1 preparation

- [C1 — My Day Decision Brief](C1_MY_DAY_DECISION_BRIEF_V0.1.md)
- [C1 Readiness Contract #006 proposal](../../../projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-006_TASK_CONTRACT_V0.1.yaml)
- [C1 Implementation Contract #007 proposal](../../../projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-007_TASK_CONTRACT_V0.1.yaml)

**Contract roles are separate:** #006 is an R1 documentation/readiness proposal and remains `DRAFT_NOT_APPROVED`. #007 is the R4 C1 implementation Contract; the Human Owner approved Revision 1 on 2026-11-24, canonical through merged PR #88. On 2026-11-25 the Human Owner designated DeepSeek as read-only AI technical reviewer and ChatGPT as R4 Data Privacy/Security Domain Authority and Prompt Architect; see [R4 review assignment](../../../projects/task-management/phase3.3/reviews/BVC-TM-TC-007_R4_DOMAIN_REVIEW_ASSIGNMENT_2026-11-25.md). DeepSeek's report and ChatGPT's domain decision are pending. Domain review assignment is not domain approval. Post-migration recovery must still be tested and approved, the Human Owner must issue separate explicit execution authorization, and fresh live GAIS/single-writer preflight must pass.

**Prompt #0006 has not been allocated.** Keep it unallocated until DeepSeek's R4 technical review has been assessed, ChatGPT has recorded the domain-review disposition, the post-migration recovery procedure has been tested and approved, the Human Owner has issued separate explicit execution authorization, and fresh live GAIS preflight has passed. The eventual prompt must follow the Vietnamese-first Prompt Delivery Standard: learner explanation, copy-ready prompt, and post-run review instructions.

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
