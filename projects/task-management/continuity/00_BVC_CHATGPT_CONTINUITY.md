# 00 — BVC ChatGPT Continuity Entry Point

**Project:** BVC Task Management (BVCTM)\
**Project ID:** `BVC-TASK-MANAGEMENT`\
**Purpose:** Recover this project in a new ChatGPT window or another AI executor without copying the previous conversation history.\
**Prepared against `main`:** `53ed2649bd5ee687ae76be686db5838f4b9b0173`\
**Status:** PILOT — live bootstrap is required on every new session.

---

## Start here — instructions for a new AI session

You are joining an existing BVC project. Do not assume that the previous chat's summary, model memory, or this file alone is sufficient. Reconstruct the current state from the repository.

### Step 1 — Confirm project and repository

- Project: **BVC Task Management (BVCTM)**.
- Project ID: `BVC-TASK-MANAGEMENT`.
- Repository: https://github.com/donghp/beyond-vibe-coding
- Default branch: `main`.
- Read the live `main` HEAD. The SHA recorded in this entry point is a historical preparation checkpoint, not a substitute for a live check.

### Step 2 — Read BVC Global Continuity

Read these current files from `main`:

1. `docs/continuity/README.md`
2. `docs/continuity/BOOTSTRAP.md`
3. `docs/continuity/CONTINUITY_PROTOCOL.md`
4. `docs/continuity/CURRENT_STATE.yaml`
5. `docs/continuity/DECISIONS.md`
6. `docs/continuity/HANDOFF_LOG.md`
7. `docs/continuity/HANDOFF_TEMPLATE.md`
8. `docs/continuity/SOURCE_MANIFEST.csv`
9. `docs/continuity/BVC_NEXT_CHAT_PROMPT.md`

Follow the live Global Bootstrap authority order and execution gates. Do not replace or weaken them with this project-specific file.

### Step 3 — Read BVCTM Project Continuity

Read in this order:

1. `projects/task-management/continuity/README.md`
2. `projects/task-management/continuity/PROJECT_CONTINUITY_PROFILE.yaml`
3. `projects/task-management/continuity/PROJECT_STATE.json`
4. `projects/task-management/continuity/SOURCE_MANIFEST.csv`
5. `projects/task-management/continuity/HANDOFF_LOG.md`
6. Relevant files in `registers/`, `evidence/`, and `validation/`.

### Step 4 — Reconcile live project authority

At minimum, inspect the current versions on `main` of:

- `projects/task-management/README.md`
- `projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md`
- `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md`
- `projects/task-management/governance/BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md`
- `projects/task-management/design/architecture/v0.1/PHASE3_2_ARCHITECTURE_REVIEW_AND_ACCEPTANCE.md`
- `projects/task-management/design/ux/v0.1/PHASE3_1_UX_DESIGN_REVIEW_AND_ACCEPTANCE.md`
- `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-001_TASK_CONTRACT_V0.1.yaml`
- `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-002_TASK_CONTRACT_V0.1.yaml`
- `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-003_TASK_CONTRACT_V0.1.yaml`
- `projects/task-management/phase3.3/BEGINNER_IMPLEMENTATION_READINESS_V0.1.md`
- `projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_V0.1.yaml`

Inspect all currently open PRs and distinguish proposals from `main`. PR #15 is already merged and must be treated as historical merged work, not an open proposal. A branch or open PR does not update canonical project state.

### Step 5 — Reconcile external and local systems

Use `registers/EXTERNAL_SYSTEM_REGISTER.yaml` and `evidence/EVIDENCE_INDEX.yaml`.

- Google AI Studio is operated by the Human Owner. The AI must not claim direct account access.
- Confirm the current GAIS app/project and visible state from screenshots supplied during the active session.
- Confirm whether the screenshot files are actually present locally and committed to GitHub.
- Confirm the local branch and `git status` on the Human Owner's computer before giving any commit/push instructions.
- Never infer local working-tree cleanliness from GitHub.

### Step 6 — Classify every material statement

Use these labels in the recovery report:

- `VERIFIED_FACT`: confirmed against a current canonical source or reproducible evidence.
- `OWNER_REPORTED`: reported by the Human Owner but not independently verified in the current session.
- `PROPOSAL`: content in an open PR or branch.
- `ASSUMPTION`: plausible but not proven.
- `UNKNOWN`: no sufficient evidence.
- `STALE`: historical or superseded.

### Step 7 — Report the recovered state before acting

Return a concise Vietnamese report containing:

1. Current `main` SHA and open PRs.
2. Current Product / UX / Architecture authority and any open decisions relevant to the next action.
3. Active Task ID, exact Contract revision/status, and remaining authorized work.
4. Prompt Register sequence and whether the next prompt has actually been run.
5. GAIS app state, screenshot evidence, and local/remote synchronization state.
6. Continuity Health: COMPLETE / PARTIAL / BLOCKED, with reasons.
7. One next action that is authorized by the live Contract.

Do not invent context-window capacity percentages. If the UI exposes no capacity meter, say that it is unknown.

---

## Execution gate — before any write or external action

1. Confirm that the relevant Task Contract is still APPROVED on current `main`.
2. Read its complete scope, allowed paths, required context, stopping conditions, verification, and Change Budget.
3. Confirm the exact baseline and recovery point; inspect local status when local files are involved.
4. Stop if the work exceeds the Contract or if required context, authority, or evidence conflicts.
5. Do not connect GAIS to GitHub or push the generated app unless a later Contract explicitly permits it.
6. Do not claim a Preview is a production build, persistence test, security test, or deployment.
7. Human Owner approval and Merge remain required for repository changes under the current BVC governance model.

## Current known checkpoint at package preparation (revision 2)

- Current remote `main` HEAD observed after PR #15 merge: `53ed2649bd5ee687ae76be686db5838f4b9b0173`.
- Product Definition v0.2.0: current Product Owner-approved baseline.
- Phase 3.2 Architecture Design: accepted design baseline.
- Phase 3.1 formal UX Acceptance: OPEN.
- BVC-TM-TC-003 Revision 1: APPROVED; one isolated blank WEB scaffold inspection only.
- Current Task #003 execution: NOT_VERIFIED as started; no scaffold result has been evidenced in the repository at this checkpoint.
- PR #15: MERGED on 2026-11-05; merge commit / current `main` HEAD: `53ed2649bd5ee687ae76be686db5838f4b9b0173`. Lesson A1 and Prompt #0001 are canonical on `main`.
- A1-01 screen: supplied by the Human Owner in chat; repository PNG synchronization not verified.
- BVCTM-PROMPT-0001: published on `main`, but execution in GAIS is NOT_VERIFIED / NOT_STARTED_OR_NOT_EVIDENCED.
- Local working tree: UNKNOWN from this remote-only inspection.

Always refresh this section after material project events. Never use it in place of live reconciliation.


## Revision 2 source checkpoint

- PR #15 merged: `https://github.com/donghp/beyond-vibe-coding/pull/15`.
- Current `main` commit: `https://github.com/donghp/beyond-vibe-coding/commit/53ed2649bd5ee687ae76be686db5838f4b9b0173`.
- Verified at: `2026-11-05T21:54:16+07:00`.
- Repository open-PR query: no open PRs returned at this checkpoint.
