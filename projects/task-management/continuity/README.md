# BVCTM Project Continuity

**Project:** BVC Task Management (BVCTM)  
**Project ID:** BVC-TASK-MANAGEMENT  
**Maturity:** PILOT — cold-start, cross-model and quota-recovery tests remain NOT_RUN  
**Current main checkpoint before this synchronization PR:** `4cb64b511fca813674fd7bf492da0f5d69f6ccd2`  
**Reconciled at:** 2026-11-13

## Purpose

This directory is the single project-owned continuity record set for BVC Task Management. It enables an authorized executor to reconstruct project state from live repository sources without relying on old chat history.

**Project owns continuity. AI executors consume continuity.**

## Canonical record map

| File | Responsibility | Update trigger |
|---|---|---|
| `00_BVC_PROJECT_CONTINUITY.md` | Provider-neutral bootstrap and recovery prompt | Bootstrap, authority or current-state change |
| `PROJECT_CONTINUITY_PROFILE.yaml` | BVCTM continuity architecture, source precedence and external systems | Project or continuity architecture change |
| `PROJECT_STATE.json` | Single project snapshot using Draft/Experimental Project State v0.1.0 | Material project/task/decision/risk/recovery change |
| `SOURCE_MANIFEST.csv` | Canonical source and evidence navigation | Path, authority or source change |
| `HANDOFF_LOG.md` | Append-only material checkpoint and real handoff history | Meaningful milestone, decision or handoff |
| `registers/TASK_EXECUTION_REGISTER.yaml` | Task IDs, Contract revisions, lifecycle and evidence | Task/Contract/execution/acceptance change |
| `registers/BVC_TM_PROMPT_REGISTER.yaml` | Prompt IDs, publication, execution, learning status and next sequence | Prompt allocation/publication/execution |
| `registers/EXTERNAL_SYSTEM_REGISTER.yaml` | GitHub, GAIS, local worktrees, DeepSeek/VS Code and screenshot store | External or local-state observation |
| `evidence/EVIDENCE_INDEX.yaml` | Evidence classifications and source references | New or corrected evidence |
| `validation/CONTINUITY_TEST_PLAN.md` | Recovery test definitions | Test scenario/precondition change |
| `validation/CONTINUITY_TEST_RESULTS.md` | Append-only actual test results | A test is actually run |
| `handoffs/README.md` | Procedure for real worker handoffs | Handoff procedure change |

## Authority and precedence

1. Current explicit Human Owner decisions on main.
2. Approved project governance and risk policy.
3. Current Product Definition and accepted UX/Architecture baselines.
4. Exact approved Task Contract and required Context Pack.
5. Published implementation and verification evidence.
6. Project State and Handoff Log as reconciled summaries.
7. Open PRs/branches as proposals only.
8. Chat history and AI memory as historical leads, not canonical authority.

The Global BVC Project Operating Standard and Global Continuity Protocol govern the operating model. This directory defines BVCTM-specific state and does not replace Product/UX/Architecture/Governance authorities.

## Current project checkpoint

- Product Definition v0.2.0 remains the current product baseline.
- Phase A A1–A4 is recorded COMPLETED as a learning path; this is not equivalent to product feature completion.
- Phase 3.1 formal UX Acceptance remains OPEN. Phase 3.2 is an accepted design baseline only.
- DR-005 is APPROVED through merged PR #62. DR-014 is accepted for design; runtime verification remains required.
- B1 / BVC-TM-P3.3-004 / BVC-TM-TC-004 R1 was Owner-accepted on 2026-11-12 as COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS and published by PR #60.
- B2 / BVC-TM-P3.3-005 / BVC-TM-TC-005 R1 was Owner-approved and published by PR #64. Execution has NOT_STARTED.
- GAIS remains the Human Owner-operated application workspace. GitHub remains the canonical repository for Product, UX, Architecture, Governance, Contracts, Prompts, continuity and evidence.

## B1 and B2 boundaries

### B1 — Create Your First Task
- B1 uses React in-memory state only. Persistence is explicitly excluded.
- The Owner reviewed the supplied app/page.tsx and confirmed the GAIS Code view contains one Page component.
- Known limitations: a complete archived manual Preview test set and independently reviewable before/after GAIS file inventory are not in the repository; browser E2E is not claimed.

### B2 — Save Your Task
- Contract: `BVC-TM-TC-005` Revision 1, published by merged PR #64.
- DR-005 was approved by merged PR #62.
- Risk: R2; allowed change is MODIFY `app/page.tsx` only; CREATE 0; DELETE 0; maximum 350 diff lines.
- No new dependencies, lockfiles, config, routes, CSS, database, Supabase, Auth, external services, cloud sync, cross-tab sync, Projects, Checklists, Backup/Restore or Settings page.
- Execution remains NOT_STARTED. Live GAIS identity/source/file-inventory/one-writer preflight and a separate Owner execution instruction are required.
- Canonical B2 Context Pack: `projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_B2_V0.1.yaml`.
- Canonical read-only preflight Prompt #0005: `practical-labs/bvc-task-management/prompts/BVCTM_PROMPT_0005_PHASE_B2_GAIS_PREFLIGHT.md`.

## GitHub / Practical Labs / GAIS separation

- `projects/task-management/` owns product, design, architecture, governance, implementation Contracts and project continuity.
- `practical-labs/bvc-task-management/` owns the learner-facing curriculum, lesson instructions, Context Packs, Prompts, templates and learning evidence.
- GAIS holds the app and its Project Instructions only. Do not recreate repository folders such as design, governance, task-contracts or continuity inside the newbie app.
- Each lesson receives only the relevant Context Pack, approved Contract and canonical Prompt with links back to source documents.

## One-bundle synchronization rule

After a material Owner approval, PR merge/main commit, GAIS checkpoint, task acceptance or milestone change, prepare one idempotent semantic synchronization PR for all affected records. Update Project State, Task Register, Prompt Register, Evidence Index, External System Register, lesson/status records, Project Profile, Source Manifest and Handoff Log only where affected. Use the source SHA/PR or explicit Owner decision as the event key; reuse an existing open sync PR for the same event.

GitHub Actions may capture deterministic main SHA/path/CI facts and update only the machine snapshot. It cannot read chat-only Owner decisions or infer semantic acceptance. The assistant must prepare the semantic sync PR in the same active session; this is not background automation.

## Validation and maturity

BVCTM continuity remains PILOT. CONT-T01 through CONT-T11 remain NOT_RUN until the actual scenarios are executed and evidence is appended. AC-011 baseline/control-plane treatment remains unresolved under its own continuity task. Local Windows worktrees remain UNKNOWN or DIRTY_PRESERVE unless the Owner supplies fresh inspection evidence.

## Recovery

Every new AI session must verify live main and open PRs, read Global Start Here and this project record map, inspect the active Contract and reconcile all registers. Do not copy old chat transcripts or assume local/GAIS state from GitHub. One active writer per task. A chat-window change alone is not a worker handoff.

---
