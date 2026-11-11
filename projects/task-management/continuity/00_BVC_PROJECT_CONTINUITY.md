# 00 — BVC Project Continuity Entry Point

**Project:** BVC Task Management (BVCTM)  
**Project ID:** `BVC-TASK-MANAGEMENT`  
**Purpose:** Recover the current project in any authorized AI executor without copying an old conversation.  
**Principle:** Project owns continuity. AI executors consume continuity.  
**Current snapshot prepared against:** `main@aff2b42da26ec548de8088bf77de455a94723773`  
**Record status:** PILOT — live bootstrap is mandatory for every new session.

---

## One provider-neutral bootstrap prompt

Copy the prompt below as one message into a new authorized AI session. Do not paste an old conversation transcript. The executor must connect to GitHub independently if a connector is available and must not assume capabilities transfer across sessions.

### COPY-READY PROMPT — BVCTM CONTINUITY BOOTSTRAP

You are joining an existing project: **BVC Task Management (BVCTM)**, project ID **BVC-TASK-MANAGEMENT**, in repository https://github.com/donghp/beyond-vibe-coding.

This is a continuity recovery, not a new project. Follow the Global authority order and the active BVCTM Task Contract.

**1. Declare actual capabilities**
- State your real alias, model/tool label and environment.
- Confirm only capabilities you can actually use: GitHub read/write, local Git/terminal, GAIS Build Mode, DeepSeek/VS Code.
- Use UNKNOWN or UNAVAILABLE when not verified. Do not infer access from a product name.

**2. Verify GitHub live**
- Confirm repository identity, repository ID 1442470565, default branch main and current main SHA.
- Enumerate open PRs and inspect relevant PRs/branches, diffs, reviews, comments and checks where available.
- Distinguish main from open-PR proposals and merged history.
- Do not use this file's SHA as a substitute for live main.

**3. Read Global Continuity first**
Read current main versions of:
- docs/continuity/README.md
- docs/continuity/BOOTSTRAP.md
- docs/continuity/CONTINUITY_PROTOCOL.md
- docs/continuity/CURRENT_STATE.yaml
- docs/continuity/DECISIONS.md
- docs/continuity/HANDOFF_LOG.md
- docs/continuity/HANDOFF_TEMPLATE.md
- docs/continuity/SOURCE_MANIFEST.csv
- docs/continuity/GITHUB_REPOSITORY_VERIFICATION.md
- docs/continuity/CROSS_EXECUTOR_CONTINUITY.md
- docs/continuity/CROSS_EXECUTOR_RECOVERY_TEST_PLAN.md
- docs/continuity/WORKER_HANDOFF.schema.json
- docs/continuity/WORKER_HANDOFF.template.yaml

**4. Read BVCTM continuity in order**
Read the current main versions of:
1. projects/task-management/continuity/README.md
2. projects/task-management/continuity/00_BVC_PROJECT_CONTINUITY.md
3. projects/task-management/continuity/PROJECT_CONTINUITY_PROFILE.yaml
4. projects/task-management/continuity/PROJECT_STATE.json
5. projects/task-management/continuity/SOURCE_MANIFEST.csv
6. projects/task-management/continuity/HANDOFF_LOG.md
7. projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml
8. projects/task-management/continuity/registers/BVC_TM_PROMPT_REGISTER.yaml
9. projects/task-management/continuity/registers/EXTERNAL_SYSTEM_REGISTER.yaml
10. projects/task-management/continuity/evidence/EVIDENCE_INDEX.yaml
11. projects/task-management/continuity/validation/CONTINUITY_TEST_PLAN.md
12. projects/task-management/continuity/validation/CONTINUITY_TEST_RESULTS.md
13. projects/task-management/continuity/handoffs/README.md

Follow SOURCE_MANIFEST.csv, but verify every authority and file path against its source.

**5. Reconcile product and learning authority**
Read current main:
- projects/task-management/README.md
- Product Definition v0.2.0
- PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md
- BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md
- Phase 3.1 UX acceptance record
- Phase 3.2 Architecture acceptance record
- Phase 3.3 readiness/context pack and Contracts #001/#002/#003
- Practical Labs Curriculum Map V0.2 and Lesson Status Register V0.2
- Prompt files #0001/#0002/#0003.

Preserve:
- Phase A A1–A4 learning path is COMPLETED.
- This is not equivalent to product-feature completion.
- Phase B is the next product focus, but feature implementation requires a separate approved and canonical First Vertical Slice Task Contract.
- Formal Phase 3.1 UX Acceptance remains OPEN.
- Phase 3.2 is an accepted design baseline only.
- DR-005 remains OPEN; DR-014 is accepted for design only, runtime verification remains required.
- BVC-TM-P3.3-003 / BVC-TM-TC-003 R1 is a separate scaffold-inspection Contract. It remains APPROVED; its execution is NOT_STARTED_OR_NOT_EVIDENCED and both required report/inventory outputs are absent from main.
- BVC-TM-CONT-001 / BVC-TM-CONT-TC-001 Revision 5 is APPROVED on main after PR #49. PR #48 published three of twelve MODIFY outputs. Draft PR #50 proposes the remaining nine MODIFY outputs and one CREATE output; it remains NOT READY FOR MERGE pending AC-011 baseline inventory resolution and static validation.
- Do not confuse BVCTM Task #003 with Global BVC-GLOBAL-TC-003 (public website).

**6. Treat evidence correctly**
Use VERIFIED_FACT, OWNER_REPORTED, PROPOSAL, ASSUMPTION, OPEN_QUESTION, STALE and PARTIAL / NOT VERIFIED.
A PR merge proves publication, not prompt execution, runtime behavior or Human Owner acceptance.
The 2026-11-11 Owner-supplied GAIS screenshot shows the project title and expected Preview heading. It does not show the generated Code/File Explorer tree. Do not infer framework, dependencies, versions, package manager, scripts, build or export behavior from it.
A2/A4 repository screenshots show a visual code tree; they do not replace the scaffold inventory output.

**7. Check local worktrees only from actual evidence**
The last Owner-supplied output:
- C:\beyond-vibe-coding-a4-evidence: Owner-verified clean main at 202e780 after fast-forward. PR #47, #48 and #49 then advanced remote main to aff2b42. Expected local divergence is 0 ahead / 3 behind, but current local status has not been rechecked.
- C:\beyond-vibe-coding: DIRTY on docs/bvctm-continuity-contract-r3; one modified continuity Markdown file, two untracked A1 PNGs, six stashes; linked worktrees share a common Git directory.
Do not reset, clean, switch, pop stashes, overwrite or delete local-only work. Recheck current status before local operations.

**8. Writer and handoff rules**
One active writer per task/branch. Do not invent sender release, receiver acceptance, task completion or handoff records. Use the Global Worker Handoff schema only for a real handoff with verified checkpoint, file inventory, verification, sender release and receiver acceptance. No handoff record is required just because the ChatGPT window changes.

**9. Before any write**
- Verify the exact current approved Task Contract on main.
- Read its entire scope, exact CREATE/MODIFY/DELETE paths, required context, stopping conditions and Change Budget.
- Verify baseline and local worktree if local files are involved.
- Use a dedicated branch and PR; never write directly to main or merge.
- The executor may not self-certify IN_PROGRESS, READY_FOR_ACCEPTANCE or COMPLETED_ACCEPTED.
- Stop on conflicting evidence, local writer conflict, missing authority or scope expansion.

**10. Report before acting**
Return a Vietnamese recovery report with:
- current main SHA and open PRs;
- current product/UX/architecture/decision state;
- Task IDs, Contract revisions, risk, execution status and exact next authorized action;
- prompt publication/execution/learning status separately;
- evidence and local-sync status;
- continuity tests actually run;
- executor capabilities and unknowns;
- Continuity Health and Window Capacity Risk separately.
Do not invent context-window percentages. During this bootstrap, perform read-only inspection only. End with exactly one status: GREEN, AMBER or RED.

### End of copy-ready prompt

## Current verified checkpoint

- Current main: `aff2b42da26ec548de8088bf77de455a94723773`
- At checkpoint `aff2b42` before PR #50 was opened, open PRs: 0. Current proposal: PR #50 OPEN / DRAFT.
- Continuity Contract: BVC-TM-CONT-TC-001 Revision 5, APPROVED after PR #47 and approval-record PR #49.
- PR #48: merged partial reconciliation of three MODIFY paths. PR #50 proposes the remaining 9 MODIFY + 1 CREATE outputs; it is not canonical and not ready for merge.
- Product baseline: Product Definition v0.2.0.
- Phase A: learning A1–A4 completed.
- Phase B: next focus; implementation requires completion of scaffold inspection, applicable UX decision gates and a separate approved First Vertical Slice Task Contract.
- Task #003: approved Contract, execution NOT_STARTED_OR_NOT_EVIDENCED; report/inventory outputs absent.
- Continuity pilot: CONT-T01–CONT-T11 NOT_RUN.
- Local worktrees: one clean-but-behind main clone and one dirty historical worktree, per latest Owner terminal output.



## Phase B operating rule

Phase B's first implementation target is B1 — Create Your First Task: one personal task entered by title and displayed in a simple list. Keep creation/display separate from saving/persistence; saving is a later milestone. Before code changes: complete the approved scaffold inspection, resolve or explicitly defer DR-005 for the applicable first-use disclosure, review relevant UX conditions, and obtain a separate approved First Vertical Slice Task Contract. This bootstrap prompt itself is read-only and does not authorize implementation.
