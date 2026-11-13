# BVCTM Project Continuity

**Project:** BVC Task Management  
**Project ID:** `BVC-TASK-MANAGEMENT`  
**Repository:** https://github.com/donghp/beyond-vibe-coding  
**Default branch:** `main`  
**Continuity profile:** `BVC-TM-CONTINUITY-PROFILE` v0.1.0, revision 7 (proposed in this sync PR)  
**Continuity maturity:** PILOT — independent cold-start/cross-model tests remain NOT_RUN  
**Last reconciliation basis:** `main@6910a6b3b667b6695742cf0c80f0f0bc47fcc3df`, base of the current unified synchronization PR  
**Current milestone:** Phase B2 — Save Your Task; Contract approved, execution not started

## Purpose and ownership

This directory is the single project-owned continuity record set for BVC Task Management. It allows an authorized executor to reconstruct current state from live canonical repository sources.

**Project owns continuity. AI executors consume continuity.**

Global rules are in `docs/continuity/`; BVCTM-specific state and registers live here. The Project State schema remains Draft/Experimental v0.1.0; validate its current shape against the schema and do not imply that the pilot is a fully automated state engine.

## Canonical record map

| Record | Purpose | Update trigger |
|---|---|---|
| `00_BVC_PROJECT_CONTINUITY.md` | Provider-neutral BVCTM bootstrap entry and current operating snapshot | Bootstrap or recovery flow changes |
| `PROJECT_CONTINUITY_PROFILE.yaml` | Project-specific continuity architecture, domains and external-system boundaries | Project/continuity architecture changes |
| `PROJECT_STATE.json` | One semantic project snapshot: facts, decisions, tasks, blockers, risks and next action | Material project/decision/task/evidence/recovery event |
| `SOURCE_MANIFEST.csv` | Navigation and authority map to current canonical sources | New source path, authority, PR or bootstrap requirement |
| `HANDOFF_LOG.md` | Append-only meaningful checkpoints and handoffs | Material milestone, decision, blocker or actual handoff |
| `registers/TASK_EXECUTION_REGISTER.yaml` | Task IDs, Contract revisions, scope, execution, evidence and acceptance | Task/Contract/acceptance change |
| `registers/BVC_TM_PROMPT_REGISTER.yaml` | Prompt identity, monotonic sequence, Contract linkage, publication and execution/learning state | Prompt created/revised/published/executed |
| `registers/EXTERNAL_SYSTEM_REGISTER.yaml` | GitHub, GAIS, local worktrees, IDEs and evidence-store observations | A new verified or Owner-reported external-state observation |
| `evidence/EVIDENCE_INDEX.yaml` | Evidence provenance, classification and canonical paths | Evidence supplied, verified or corrected |
| `validation/CONTINUITY_TEST_PLAN.md` | Recovery test definitions | Scenario/precondition changes |
| `validation/CONTINUITY_TEST_RESULTS.md` | Actual continuity test outcomes; NOT_RUN remains explicit | A test is actually executed |
| `handoffs/README.md` | Rules for real worker handoff records | Handoff procedure changes |

## Authority and precedence

1. Current explicit Human Owner decisions in approved records on `main`.
2. Current approved Product Definition, governance, decision register and accepted UX/Architecture design baselines.
3. The exact current approved Task Contract and its required context.
4. Canonical Prompt, execution report, source diff and verification evidence.
5. Project State, registers and Handoff Log as synchronized project records.
6. Open branches and PRs as proposals; not canonical until merged.
7. Chat history and AI memory as historical leads, not proof of current repository or runtime state.

The Global [BVC Repository Change Synchronization Standard](../../../docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md) controls the one-event/one-PR process. The [Impact Matrix](../../../docs/continuity/SYNC_IMPACT_MATRIX.yaml) and validator enforce required companion records. This directory remains the BVCTM semantic state store.

## Current product and delivery state

- Product Definition v0.2.0 remains the approved product baseline.
- Phase A A1–A4 learner path is COMPLETED; this is not full product completion.
- Phase 3.1 formal UX acceptance remains OPEN.
- Phase 3.2 Architecture is an accepted design baseline only; it does not prove runtime, security, integration or deployment acceptance.
- DR-005 first-use storage disclosure is APPROVED and merged through PR #62.
- DR-014 browser localStorage is ACCEPTED FOR DESIGN; runtime behavior still requires implementation and verification.
- B1 / `BVC-TM-P3.3-004` is Owner-accepted on 2026-11-12 as `COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS`. Full archived manual Preview test evidence and an independently reviewable before/after GAIS file inventory remain unavailable.
- B2 / `BVC-TM-P3.3-005` / `BVC-TM-TC-005 R1` is Owner-approved and canonical through merged PR #64. B2 execution is NOT_STARTED.
- B2 is restricted to the existing GAIS app and `app/page.tsx` only. Live GAIS preflight and a separate Owner execution instruction are still required.

## Environment boundaries

- GitHub is canonical for Product, UX, Architecture, Governance, Contracts, Prompts, registers, lessons and evidence.
- GAIS is the app-building and Preview workspace operated by the Human Owner/newbie. Do not recreate repository-level `design/`, `governance/`, `task-contracts/`, `continuity/` or `registers/` folders inside GAIS.
- Copy the canonical Project Instructions into GAIS Custom Instructions. For each lesson, supply only the current Context Pack, approved Contract and canonical Prompt with links to full GitHub sources.
- A GitHub read does not prove the local Windows worktree or GAIS workspace is synchronized. Verify app ID, branch/SHA where available, current source and changed-file inventory at the time of execution.
- No direct GAIS account access is claimed by ChatGPT. Screenshots and reports remain OWNER_SUPPLIED/OWNER_REPORTED until independently verified.

## Current task boundaries

### B1 — Create Your First Task

- Task: `BVC-TM-P3.3-004`; Contract: `BVC-TM-TC-004 R1`; Prompt: `BVCTM-PROMPT-0004`.
- Owner accepted on 2026-11-12 with known limitations; see Task Execution Register and B1 lesson.
- Keep its scope closed. B2 may run B1 regression checks but must not broaden B1.

### B2 — Save Your Task

- Task: `BVC-TM-P3.3-005`; Contract: `BVC-TM-TC-005 R1`; approved through merged PR #64.
- Allowed change: MODIFY `app/page.tsx` only; no create/delete, dependency/config changes, database, Auth or external services.
- Execution: NOT_STARTED. Preflight the live GAIS project ID and source, verify source parity and one-file inventory, and confirm no competing writer.
- Prepare Context Pack/Prompt only after preflight. Execute only after the Human Owner separately instructs implementation.
- No Projects, Checklists, Settings page, backup/export/import, cross-tab sync or cloud sync in B2.

## Unified update protocol

For each material event, update the canonical source and all affected dependent records in one semantic PR. Run the Global Repository Sync Validator before Owner review. After merge, GitHub Actions updates only the global machine-observed `CURRENT_STATE.yaml` snapshot. It does not change semantic project/task/acceptance state.

See:
- [Global sync standard](../../../docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md)
- [Project State](./PROJECT_STATE.json)
- [Task Execution Register](./registers/TASK_EXECUTION_REGISTER.yaml)
- [Prompt Register](./registers/BVC_TM_PROMPT_REGISTER.yaml)
- [Source Manifest](./SOURCE_MANIFEST.csv)

## Independent open items retained

- Continuity tests CONT-T01–CONT-T11 remain NOT_RUN.
- AC-011 baseline/control-plane inventory concern under Continuity Contract R5 remains open; do not mark PASS.
- Local Windows worktree status remains NOT_VERIFIED in this synchronization pass. Preserve all local-only files and stashes.
- GAIS current app source has not yet been reinspected immediately before B2 implementation.

Never store credentials, API keys, tokens, passwords, customer data or confidential business information in continuity records.
