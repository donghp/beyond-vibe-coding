# BVCTM Project Continuity

**Project:** BVC Task Management (BVCTM)  
**Project ID:** `BVC-TASK-MANAGEMENT`  
**Continuity profile:** `BVC-TM-CONTINUITY-PROFILE` v0.1.0, revision 3  
**Maturity:** PILOT — independent cold-start and cross-model recovery are NOT_RUN  
**Current canonical source:** `main@202e78065e96d339f78d5a406edcd19ccf687e7f`  
**Reconciled at:** 2026-11-11T06:44:00+07:00

## Purpose

This directory is the single project-owned continuity record set for BVC Task Management. It enables an authorized executor or maintainer to reconstruct current project state from live repository sources without relying on an earlier chat.

**Project owns continuity. AI executors consume continuity.**

## Canonical record map

| File | Responsibility | Update trigger |
|---|---|---|
| `00_BVC_PROJECT_CONTINUITY.md` | The one provider-neutral BVCTM entry point and copy-ready recovery prompt | Bootstrap, authority, recovery or current-state changes |
| `PROJECT_CONTINUITY_PROFILE.yaml` | BVCTM-specific continuity architecture, domain and external-system rules | Project or continuity architecture changes |
| `PROJECT_STATE.json` | Single project snapshot conforming to Draft / Experimental Project State v0.1.0 schema | Material project, task, decision, risk or recovery change |
| `SOURCE_MANIFEST.csv` | Single navigation map to canonical sources and evidence | Source, authority, PR, path or bootstrap requirement changes |
| `HANDOFF_LOG.md` | Append-only material checkpoint and event history | Meaningful checkpoint, decision, blocker, milestone or actual handoff |
| `registers/TASK_EXECUTION_REGISTER.yaml` | Task IDs, Contract links, lifecycle and execution-evidence distinction | Contract/task status or evidence change |
| `registers/BVC_TM_PROMPT_REGISTER.yaml` | Prompt identities, publication, execution evidence and learning outcomes | Prompt publication or actual execution event |
| `registers/EXTERNAL_SYSTEM_REGISTER.yaml` | GitHub, GAIS, local worktrees, DeepSeek/VS Code and screenshot-store observations | External-system or local evidence change |
| `evidence/EVIDENCE_INDEX.yaml` | Evidence classification and canonical references | New or corrected evidence |
| `validation/CONTINUITY_TEST_PLAN.md` | Recovery test definitions, including GAIS quota interruption | Test scenario or precondition changes |
| `validation/CONTINUITY_TEST_RESULTS.md` | Append-only validation outcomes; NOT_RUN remains explicit until tested | A test is actually executed |
| `handoffs/README.md` | Rules for real worker handoff records using Global schema/template | Handoff procedure changes |

## Authority and source precedence

1. Current explicit Human Owner decisions in approved canonical governance records on `main`.
2. Current approved project governance, Product Definition, and accepted design baselines on `main`.
3. The exact current approved Task Contract and its required context.
4. Published execution records and verification evidence on `main`.
5. `PROJECT_STATE.json` and `HANDOFF_LOG.md` as snapshots/history that must be reconciled with live sources.
6. Open PRs and feature branches as proposals only; they are not canonical until merged.
7. Chat history, AI memory and Owner-supplied screenshots as historical or supporting evidence, never a substitute for current source verification.

The Global Continuity Bootstrap controls overall continuity behavior. This profile and its records define BVCTM-specific continuity.

## Current product and learning position

- Product Definition v0.2.0 is the current Product Owner-approved product baseline.
- Phase A learning path A1–A4 is recorded COMPLETED in Practical Labs Lesson Status Register v0.2 and the merged Phase A records.
- Phase A learning completion is not product-feature completion.
- Phase B — Build Your First Task — is the next product milestone, but feature implementation is NOT_AUTHORIZED until the scaffold-inspection work and applicable UX/decision gates are reconciled and a separate First Vertical Slice Task Contract is approved and canonical.
- Phase 3.1 formal UX Acceptance remains OPEN.
- Phase 3.2 Architecture is an accepted design baseline only; it is not runtime, security, integration or deployment acceptance.
- DR-005 remains OPEN for first-use storage disclosure timing/copy.
- DR-014 is ACCEPTED FOR DESIGN only; browser persistence still needs runtime evidence.

## Active task boundaries

### BVC-TM-P3.3-003 / BVC-TM-TC-003 Revision 1

Approved for one isolated, non-production blank WEB app scaffold inspection and two documentation outputs only:
- `projects/task-management/phase3.3/GAIS_SCAFFOLD_INSPECTION_REPORT_V0.1.md`
- `projects/task-management/phase3.3/GAIS_SCAFFOLD_INVENTORY_V0.1.yaml`

At this checkpoint the Task Execution Register still records `NOT_STARTED_OR_NOT_EVIDENCED`. The GAIS screenshot supplied on 2026-11-11 shows a project title and blank Preview; Phase A screenshots show a visual scaffold tree. They do not replace the two required outputs or independently verify package manifests, runtime, dependencies, scripts, versions, build/export behavior.

The Task #003 Contract's own baseline is historical and must not be silently rewritten. Any baseline/context revision must be handled under the applicable authority and approval process.

### BVC-TM-CONT-001 / BVC-TM-CONT-TC-001 Revision 4

Approved on `main`. It authorizes exactly one CREATE and twelve MODIFY paths under this continuity directory, with no DELETE. This reconciliation is proposed on a dedicated branch/PR; it is not canonical until the Human Owner merges the PR.

## Phase A evidence distinctions

- A1: authentic Apps landing and blank Preview files are repository assets published by merged PR #37.
- A2: the Code / File Explorer screenshot is on `main`; the detailed technical profile is still NOT_VERIFIED.
- A3: learning exercise completed; save is OWNER-CONFIRMED; the Instructions view and response evidence are recorded. Exact close/reopen and independent before/after file integrity remain NOT_VERIFIED.
- A4: read-only learning exercise completed; the response was reviewed; original A4-01/A4-02 screenshots are on `main` through PR #41. Independent before/after file integrity remains NOT_VERIFIED.

Publication, prompt execution, learning completion, technical verification and product acceptance are separate states.

## Current GitHub checkpoint

- Repository: https://github.com/donghp/beyond-vibe-coding
- Current main SHA: `202e78065e96d339f78d5a406edcd19ccf687e7f`
- Open PRs at last live check: 0
- Remote branch refs returned: 45 (including `main`)
- PR #37, #38, #39, #40, #41, #43, #44, #45 and #46 are merged.
- Main branch protection was `false` at the last repository endpoint check; do not change settings under this Contract.

## External and local-state boundaries

- GAIS is Human Owner-operated. ChatGPT must not claim direct account or private project access.
- The 2026-11-11 GAIS screenshot is OWNER_SUPPLIED and shows the named project and blank Preview only.
- `C:\beyond-vibe-coding-a4-evidence` was clean at `main@d2ac0f5` and behind 3 commits after fetching the current remote. It has not yet been fast-forwarded.
- `C:\beyond-vibe-coding` remains DIRTY on `docs/bvctm-continuity-contract-r3` with one modified continuity Markdown file and two untracked A1 PNGs. Preserve it and all six stash entries.
- The two paths are linked worktrees in the same local Git common directory; inspect worktree relationships before any local branch switch.
- Local state is Owner-supplied terminal evidence, not direct ChatGPT filesystem inspection.

## Worker handoffs

No actual sender-release / receiver-acceptance handoff has been recorded. Do not create a handoff YAML merely because a chat window changes. Use `handoffs/README.md` and the Global Worker Handoff schema only for a real transition with a verified checkpoint and explicit writer release/receiver acceptance.

## Validation and maturity

BVCTM Continuity remains PILOT. CONT-T01 through CONT-T11 are NOT_RUN. JSON Schema, YAML, CSV and source-path validation for this reconciliation must be performed against the candidate branch before acceptance. Do not claim a test PASS from content inspection alone.

## Update protocol

Update semantic records only on material, evidence-backed events. Keep machine-observed Git facts separate from Owner-reported local/external facts and AI-prepared interpretation. A machine updater must not change task completion, product decisions, acceptance or risk status.

Never store secrets, API keys, tokens, passwords, recovery information, customer data or confidential business data in continuity records.

