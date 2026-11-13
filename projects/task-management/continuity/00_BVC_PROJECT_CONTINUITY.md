# 00 — BVC Task Management Continuity Entry Point

**Project ID:** `BVC-TASK-MANAGEMENT`  
**Repository:** https://github.com/donghp/beyond-vibe-coding  
**Current milestone:** Phase B2 — Save Your Task  
**Current checkpoint basis:** `main@6910a6b3b667b6695742cf0c80f0f0bc47fcc3df` (base of the unified synchronization PR)  
**Status:** Contract approved; GAIS B2 implementation NOT_STARTED; live preflight pending.

## Bootstrap instruction for any authorized AI executor

You are joining the existing BVC Task Management project. This is a recovery/resume operation, not a new project. Reconstruct the state from live GitHub sources; do not rely on old chat memory as authority.

### 1. Declare actual capabilities

State your actual model/tool identity and available capabilities:
- GitHub repository read/write and PR inspection;
- local Git/terminal, if actually available;
- GAIS Build mode and app access, if actually available;
- IDE/DeepSeek access, if actually available.

Use UNKNOWN or UNAVAILABLE when not verified. Do not infer private GAIS access from a shared URL.

### 2. Verify the repository

- Confirm repository `donghp/beyond-vibe-coding`, default branch `main` and live HEAD.
- Inspect open PRs, branch/head/base SHAs, mergeability, diffs, review and workflow status for the active task.
- Compare with the source commit recorded in Project State.
- Treat open branches/PRs as proposals only.

### 3. Read Global BVC governance

Read:
1. `docs/continuity/README.md`
2. `docs/continuity/BOOTSTRAP.md`
3. `docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md`
4. `docs/continuity/SYNC_IMPACT_MATRIX.yaml`
5. `docs/continuity/CONTINUITY_PROTOCOL.md`
6. `docs/continuity/TASK_LIFECYCLE.md`
7. `docs/continuity/CURRENT_STATE.yaml`
8. `docs/continuity/SOURCE_MANIFEST.csv)
9. `docs/continuity/GITHUB_REPOSITORY_VERIFICATION.md)
10. `docs/continuity/AI_EXECUTOR_ROLE_MODEL.md`

The Global BVC standard controls repository-wide synchronization. It does not replace BVCTM project-specific authority.

### 4. Read BVCTM canonical records

Read the current `main` versions of:
- `projects/task-management/README.md`
- Product Definition v0.2.0;
- UX design index and current Interaction Specification;
- Phase 3.2 Architecture index, Application Architecture and Data Model;
- Product/UX Decision Register and Risk Policy;
- Phase 3.1 UX and Phase 3.2 Architecture acceptance records;
- `projects/task-management/continuity/README.md`;
- `PROJECT_CONTINUITY_PROFILE.yaml`;
- `PROJECT_STATE.json`;
- `SOURCE_MANIFEST.csv`;
- Task Execution Register, Prompt Register and Evidence Index;
- active Task Contract and every required context path;
- the relevant Practical Labs lesson, Lesson Status Register and canonical Prompt.

Use Source Manifest as navigation only. Verify every source and authority against live `main`.

### 5. Current known state

- Product Definition v0.2.0 is the current approved Product baseline.
- Formal Phase 3.1 UX acceptance remains OPEN.
- Phase 3.2 Architecture is accepted as a design baseline only.
- DR-005 is APPROVED through merged PR #62.
- B1 / Contract TC-004 / Prompt #0004 is Owner-accepted with known limitations through PR #60; do not reopen or expand its scope.
- B2 / Contract TC-005 Revision 1 is Owner-approved through merged PR #64.
- B2 execution is NOT_STARTED. The Contract allows MODIFY `app/page.tsx` only, with a maximum 350-line diff and no new dependency/config/database/Auth/external service.
- B2 requires live GAIS preflight and a separate Owner execution instruction.
- GAIS app ID reported by the Owner: `ca589018-617d-4919-bbe2-6b9c588ccd85`. Verify it in the live workspace before acting.
- Do not claim GAIS source parity, local sync, build/lint/E2E or storage runtime behavior without direct evidence.

### 6. GitHub / GAIS separation

GitHub owns Product, UX, Architecture, Governance, Contracts, Prompts, registers, lessons and evidence. GAIS is only the newbie's application build/Preview workspace.

Do not recreate `design/`, `governance/`, `task-contracts/`, `continuity/` or register folders inside GAIS. Supply the current Project Instructions, task-specific Context Pack, approved Contract and Prompt with source links. Only application files allowed by the active Contract may be changed.

### 7. Before any write

- Verify explicit Owner authority and active Contract revision.
- Inspect the exact live GAIS app ID, current `app/page.tsx`, file list and no-competing-writer state.
- Confirm allowed paths, Change Budget, risk, acceptance criteria and stop conditions.
- Stop if source differs materially, more than one file is required, or an unresolved decision appears.
- Use a dedicated branch/PR for repository changes. Never merge or self-accept.

### 8. One synchronization transaction per material event

Follow `docs/continuity/REPOSITORY_CHANGE_SYNC_STANDARD.md` and `SYNC_IMPACT_MATRIX.yaml`:
1. identify the event and canonical source;
2. update all affected project/learner/continuity records in one focused PR;
3. run the synchronization validator and relevant tests;
4. request Human Owner review/merge;
5. verify the post-merge machine snapshot and latest main SHA.

Machine automation records Git facts only. It never infers semantic approval, execution, task completion or acceptance.

### 9. Recovery report

Before continuing, provide a Vietnamese report with live main SHA, relevant open PRs, current B1/B2 status, active Contract and Prompt, GAIS/source sync status, evidence limitations, checks actually run, blockers, and exactly one next permitted action. Ask the Human Owner to confirm/correct the understanding when required by the Global Bootstrap.

**Security:** Never include API keys, tokens, passwords, private customer information or confidential data in prompts, logs, evidence or continuity records.
