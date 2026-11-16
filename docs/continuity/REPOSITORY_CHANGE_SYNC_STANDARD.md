# BVC Repository Synchronization Standard

**Standard ID:** BVC-GOV-SYNC-001  
**Version:** 1.0  
**Status:** Proposed for Human Owner review  
**Applies to:** The full BEYOND VIBE CODING repository, all projects under `projects/`, all Practical Labs, and their connected execution environments  
**Owner:** Human Owner / Repository Owner

## 1. Purpose

This standard defines one repeatable synchronization process for every material approval, decision, Contract revision, prompt publication, implementation result, evidence update, acceptance, and merge in the BEYOND VIBE CODING repository.

It prevents canonical documents and their dependent records from drifting apart, avoids duplicate sources of truth, protects the learner's GAIS workspace from repository-level governance clutter, and makes each material change auditable as one synchronization transaction.

## 2. The four operating layers

| Layer | Canonical location | What it owns |
|---|---|---|
| BVC repository governance | `docs/continuity/`, `.github/workflows/`, `scripts/`, `tests/` | Repository-wide authority, lifecycle, event synchronization, validation and recovery |
| Product / project authority | `projects/<project-id>/` | Product definition, requirements, UX/UI, architecture, governance, decisions, risk and project-specific Contracts |
| Learner-facing Practical Labs | `practical-labs/` | Beginner-readable lessons, prompts, Project Instructions, curriculum and authentic learning evidence |
| Execution workspace | GAIS, local IDE, browser Preview, or other task-authorized environment | The working application/source files and transient execution outputs for the active task |

These layers are connected by links, IDs, Context Packs, Task Contracts, Prompts and evidence references. They are not copies of one another.

### 2.1 GitHub is canonical; GAIS is not a repository mirror

For the BVC Task Management Beginner path:
- GitHub is the canonical home for Product Definition, UI/UX Design, Architecture, Governance, Decision Register, Task Contracts, Prompt Register, Project State, lessons, evidence and source history.
- The existing GAIS project is the application build and Preview workspace.
- The newbie must **not** recreate `design/`, `governance/`, `task-contracts/`, `continuity/`, `registers/`, or the full GitHub repository tree inside GAIS.
- The canonical Project Instructions are copied into GAIS Custom Instructions. That copy is an execution-time instruction, not a second canonical source.
- For each lesson, the learner receives only the relevant short Context Pack, the approved Task Contract excerpt/full Contract, and the canonical Prompt, with links back to GitHub.
- GAIS contains only application files needed by the product and tool-generated files. Documentation and governance changes belong in GitHub unless a Task Contract explicitly authorizes a different output.

### 2.2 Authority and state precedence

1. Explicit Human Owner decisions recorded in canonical approved governance/project records on `main`.
2. Current approved Product Definition, requirements, Decision Register, Risk Policy and accepted UX/Architecture baselines.
3. The exact current approved Task Contract and its required context.
4. Canonical Prompt, execution report, changed-file inventory and verification evidence.
5. Project State, task/prompt/evidence registers and handoff logs as synchronized snapshots/indices.
6. Open branches and PRs as proposals only.
7. Chat history and AI memory as historical leads, not proof of current repository or execution state.

A PR merge proves publication. It does not, by itself, prove that code ran, tests passed, a task was accepted, or a runtime behavior works. Approval of a Contract is different from authorization to execute it when the Contract requires a separate execution instruction.

## 3. Events that require synchronization

| Event | Required semantic update | Machine automation |
|---|---|---|
| Owner approves a product/UX/architecture/governance decision | Update its canonical source and all affected Project State, task blockers, learner instructions and source maps in one sync PR | After merge, capture the Git event and changed paths |
| Owner approves a Task Contract | Record Contract status/revision, task authorization, scope, risk and next permitted action in Project State and Task Execution Register | Validate sync bundle before merge; snapshot main after merge |
| Prompt is created or revised | Update Prompt file, Prompt Register, Prompt Library index and the relevant learner lesson; verify Contract reference | Validate dependent paths before merge; snapshot after merge |
| Gemini/GAIS executes a task | Classify the report, inspect source/diff and Preview evidence, update Task Execution Register, Prompt Register where relevant, Evidence Index, Lesson Status Register and lesson README | No AI result is inferred by the machine updater |
| Human Owner accepts/rejects a deliverable | Record exact decision, date, scope and limitations; update Project State, Task Execution Register, affected lesson and evidence index in one sync PR | After merge, capture the Git event and changed paths |
| Material Product/UX/Architecture source changes | Update the relevant project index, Project State and source navigation in the same PR | Sync validator checks required companion records |
| PR merged to `main` | Semantic records should already be included in the merged sync transaction | The continuity workflow updates only global machine-observed Git metadata in `docs/continuity/CURRENT_STATE.yaml` |
| Commit on a feature branch | No canonical Project State or acceptance update; branch remains proposal | No main snapshot |
| Chat-only Owner decision | Assistant prepares the canonical semantic sync PR; GitHub Actions cannot observe the conversation itself | No automation until the change is committed/merged |

## 4. The one-transaction synchronization workflow

Every material event uses one focused PR for the complete semantic synchronization package. Do not create separate small PRs for each register if they describe the same event.

### Step 1 — Establish the source checkpoint

Before editing:
1. Read the current live `main` SHA.
2. Check open PRs, active branches and relevant changed files.
3. Identify the exact source record and its current revision.
4. Confirm the active Task Contract, authority, path allowlist and single-writer status.
5. Do not use stale snapshots or an earlier chat as the source of truth.

### Step 2 — Classify the event

Classify the event as one or more of:
- `PRODUCT_OR_DESIGN_CHANGE`
- `DECISION_APPROVED_OR_REVISED`
- `TASK_CONTRACT_PUBLISHED_OR_REVISED`
- `PROMPT_PUBLISHED_OR_REVISED`
- `EXECUTION_EVIDENCE_RECEIVED`
- `OWNER_ACCEPTANCE_OR_REJECTION`
- `LESSON_OR_CURRICULUM_CHANGE`
- `REPOSITORY_GOVERNANCE_CHANGE`
- `MACHINE_OBSERVED_MAIN_CHANGE`

A conversation is not a Git event. An open PR is not a canonical approval.

### Step 3 — Build the complete sync package

Update the authoritative source and all dependent records in the same PR, according to [SYNC_IMPACT_MATRIX.yaml](./SYNC_IMPACT_MATRIX.yaml).

For a Task Management implementation task, the affected files normally include only the relevant subset of:
- `projects/task-management/phase3.3/task-contracts/` — Task Contract;
- `projects/task-management/continuity/PROJECT_STATE.json` — project snapshot and next permitted action;
- `projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml` — lifecycle, scope, evidence and acceptance;
- `projects/task-management/continuity/registers/BVC_TM_PROMPT_REGISTER.yaml` — Prompt identity/publication/execution;
- `projects/task-management/continuity/evidence/EVIDENCE_INDEX.yaml` — evidence classification;
- `projects/task-management/continuity/SOURCE_MANIFEST.csv` — canonical path/authority index;
- `practical-labs/bvc-task-management/LESSON_STATUS_REGISTER_V0.2.md` — learner progress/evidence;
- the affected lesson README and Prompt Library index;
- `projects/task-management/README.md` where the public project status or navigation changes.

Do not update unrelated records merely to make a PR look comprehensive. Preserve independent blockers, risks and NOT_RUN evidence.

### Step 4 — Validate the synchronization package

Before Owner review:
1. Run the repository synchronization validator.
2. Run the relevant Contract, schema, YAML/JSON, CSV, unit-test and documentation checks available in the repository.
3. Verify that every changed source path has the required companion records according to the impact matrix.
4. Verify relative links and canonical paths.
5. Check that no stale status contradicts the new authoritative record.
6. Confirm the PR description lists the source event, affected records, checks run, checks not run and residual limitations.

The synchronization check is a completeness check, not approval. It cannot infer Human Owner intent or certify runtime behavior.

### Step 5 — Owner review and merge

The Human Owner reviews the **single consolidated PR** and decides whether to merge it.

- Before merge, all files in the PR are proposals.
- After merge, the source documents and dependent records become canonical together.
- Do not directly write to `main` or let an AI executor merge its own PR.
- Enable branch protection / required status checks if the repository should technically prevent incomplete PRs from merging. This standard does not silently change repository settings.

### Step 6 — Post-merge machine synchronization

After a material merge/push to `main`:
1. `.github/workflows/continuity-refresh.yml` observes the new main range.
2. `scripts/update_continuity_state.py` updates **only** `machine_snapshot` in `docs/continuity/CURRENT_STATE.yaml`.
3. The workflow creates or updates one reserved `automation/continuity-refresh` branch and one review PR.
4. The Human Owner reviews/merges that machine snapshot PR.
5. Verify the latest main SHA and successful workflow run.

Machine automation must never change Product decisions, Contract approval, task completion, evidence status, risk, acceptance or project-specific semantic state.

### Step 7 — Close the event

The coordinator records:
- merged PR number and merge commit;
- exact canonical files updated;
- latest verified main SHA;
- workflow/validator outcomes;
- unresolved limitations;
- one next action.

Do not create a duplicate handoff entry for every commit. Record meaningful milestones and recovery points only.

## 5. BVC Task Management — standard Beginner delivery path

The same lifecycle applies to every Phase B/C/D lesson, with learner-facing complexity introduced progressively:

`PRODUCT / UX / ARCHITECTURE → LESSON OUTCOME → TASK CONTRACT → OWNER APPROVAL → CANONICAL PROMPT → GAIS PREFLIGHT → GAIS EXECUTION → PREVIEW / SOURCE EVIDENCE → TECHNICAL REVIEW → OWNER ACCEPTANCE → ONE SYNC PR`

### Before each GAIS task

1. Confirm the existing GAIS app identity and current app source.
2. Confirm the exact approved Contract and its revision on `main`.
3. Load the relevant Project Instructions and lesson-specific Context Pack.
4. Inspect the current code and file list before editing.
5. Confirm allowed CREATE/MODIFY/DELETE paths, Change Budget, risk and stop conditions.
6. Confirm no competing writer and no unsynchronized source.
7. Run only the canonical task Prompt for that lesson.

### During GAIS execution

- Gemini changes only the allowed files.
- The newbie observes Preview and Code view, follows numbered steps, and learns one result at a time.
- Stop if the project identity, source, allowed file list or implementation assumptions differ from the Contract.
- Do not create repository governance folders in GAIS.
- Do not add later-phase features, dependencies, database, Auth, API or cloud services unless explicitly authorized.

### After GAIS execution

The Owner supplies original Preview/Code/File Explorer screenshots, full Gemini response, actual changed-file inventory/diff or source export, exact manual actions and results, and checks not run. The coordinator classifies evidence as OWNER_SUPPLIED, OWNER_REPORTED, OBSERVED, REPOSITORY_VERIFIED or NOT_VERIFIED, then updates all relevant records in one sync PR.

### Current BVCTM position at this standard's creation

- Phase A A1–A4: learner path completed.
- B1 / `BVC-TM-P3.3-004`: Owner-accepted on 2026-11-12 as `COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS`; the missing complete archived manual test set and independently reviewable changed-file inventory remain limitations.
- DR-005: approved and merged through PR #62.
- B2 / `BVC-TM-P3.3-005` / `BVC-TM-TC-005 R1`: Owner-approved and merged through PR #64; GAIS execution has **not** started.
- B2 next gate: live GAIS preflight, continuity records reconciled, Context Pack/Prompt prepared, and separate Owner execution instruction. Only `app/page.tsx` is allowed by the approved Contract.
- B3 remains a separate learner close/reopen/recovery lesson; it must not silently expand B2.

## 6. What is and is not automatic

### Automatically performed by GitHub Actions

- machine-observed main SHA, commit range and changed-path snapshot;
- repository synchronization completeness validation on PRs;
- unit tests for the synchronization validator;
- continuity updater unit tests and state YAML validation;
- a single machine-snapshot PR on material main changes, when repository Actions permissions allow it.

### Requires AI coordinator and/or Human Owner

- interpret an Owner decision expressed in chat;
- decide which semantic facts changed;
- update Product/UX/Architecture/Decision Register content;
- classify GAIS evidence and test outcomes;
- decide whether a task is complete or accepted;
- approve Contract changes and implementation authorization;
- review and merge PRs.

### Repository setting required for automatic machine-snapshot PR creation

The existing continuity workflow uses the repository-provided `GITHUB_TOKEN` with `contents: write` and `pull-requests: write`. GitHub also requires the repository setting that allows Actions to create pull requests.

The Human Owner/repository administrator must verify:
`Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests`.

If this setting is disabled, the workflow may update/push its reserved branch but fail when creating or updating the PR. The workflow failure must remain visible; do not report an automatic sync as complete. This standard does not enable the setting on the Owner's behalf.

## 7. Anti-drift and anti-overlap rules

- One canonical source for each authority; manifests and Project State are indexes/snapshots, not competing sources.
- One material event → one semantic sync PR containing all affected records.
- One merged event → one machine snapshot refresh cycle; reuse the reserved automation branch.
- No automatic semantic inference from commit messages, AI responses or passing CI.
- No duplicate copies of Project Design, Governance, Contracts or registers inside GAIS.
- No prompt ID allocation before the task identity and Contract are established.
- No task acceptance from publication, merge, build, passing tests or AI statements alone.
- A failed sync validator blocks review completion; a missing workflow run is NOT_PASS.
- A direct push to main is a governance exception; branch protection should require the sync check before merge.
- A failed/partial update remains visible as BLOCKED, PARTIAL or NOT_VERIFIED. Never hide it to make the portfolio look green.

## 8. Recovery when a sync fails

1. Stop further semantic writes to the affected records.
2. Preserve the current main SHA, branch SHA, open PR, workflow run and error output.
3. Determine whether the failure is machine-only (CURRENT_STATE snapshot), semantic (Project State/register/lesson mismatch), or workspace-only (GAIS/local IDE not synced).
4. Do not reset or force-update a branch until its commits and author are inspected.
5. Prepare one corrective PR that reconciles all affected records.
6. Rerun the validator and relevant tests.
7. Ask the Human Owner to review/merge; then verify main and the post-merge workflow.

## 9. Security and authority

This standard does not grant permission to:
- edit application code outside an active approved Contract;
- change repository settings, branch protection, Actions secrets or tokens;
- create cloud resources, databases or identities;
- merge PRs or accept task deliverables;
- read/write the Human Owner's private GAIS account directly.

Never store secrets, customer data or sensitive information in Project State, Prompt Register, evidence files, PR bodies or GAIS learning examples.
