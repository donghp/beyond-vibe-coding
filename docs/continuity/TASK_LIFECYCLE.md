# BVC Task Lifecycle — Backlog to Accepted Learning Evidence

**Purpose:** Define the mandatory repository-backed lifecycle for BEYOND VIBE CODING — Build & Learn. This is an operating protocol under existing BVC governance and Task Contracts; it does not create a second state store or grant task authority.

## Executor roles and first-response gate

Follow [AI_EXECUTOR_ROLE_MODEL.md](./AI_EXECUTOR_ROLE_MODEL.md) for the assigned responsibilities:
- Human Owner retains final Product, Architecture, Governance, Task Contract, risk-escalation, acceptance and merge authority.
- ChatGPT acts as Chief Architect and Project Engineering Orchestrator; this is a delegated working role, not self-approval authority.
- Gemini in Google AI Studio is the primary implementation worker for beginner/Vibe Coding tasks when the active Contract routes the work to GAIS.
- DeepSeek in VS Code is the default independent reviewer/tester/code auditor when available. It may implement only under separate explicit authorization and after the previous writer releases the workspace.

One semantic Task Contract governs every executor. Provider-specific prompt adapters preserve objective, authorization, scope, constraints, risk, acceptance criteria, verification and stop conditions. Only one authorized writer may modify a task branch/workspace at a time.

Before continuing work in a new ChatGPT window, complete the read-only Vietnamese Project Understanding Review using [PROJECT_UNDERSTANDING_REVIEW.template.md](./PROJECT_UNDERSTANDING_REVIEW.template.md). Ask the Human Owner to confirm or correct it and stop at `WAITING_FOR_OWNER_REVIEW`. Do not create a task, prompt or implementation action until the Owner confirms.

## Canonical sequence

`PRODUCT BACKLOG → TASK SPECIFICATION → TASK CONTRACT → OWNER APPROVAL → CONTRACT + REGISTER SYNC PR → MERGED ON MAIN → PROMPT + PROMPT REGISTER + LESSON SYNC PR → MERGED ON MAIN → GAIS PREFLIGHT / EXECUTION → EVIDENCE + REGISTER + LESSON SYNC PR → TECHNICAL REVIEW → OWNER ACCEPTANCE → ACCEPTANCE SYNC PR → MERGED ON MAIN → POST-MERGE MACHINE SNAPSHOT`

For implementation tasks, the order is mandatory. A write-capable prompt must not be given to a newbie until its approved Task Contract and exact prompt are canonical on `main`. Read-only learning exercises may use another explicitly recorded authorization basis.

## 1. Plan the task before writing a prompt

Define unique Task ID, title, phase/lesson, learning outcome, source references, dependencies, exact outputs and CREATE/MODIFY/DELETE path allowlist, risk, change budget, stop conditions, recovery point, acceptance criteria, verification method, executor/environment and required evidence.

ChatGPT prepares the task specification and Contract. The Human Owner approves it. The Contract is published through a reviewed PR and becomes canonical after merge. Do not allocate a prompt ID for a new implementation task before this gate is satisfied.

## 2. Create and publish the prompt

Every canonical prompt references exact Task ID, Contract ID and revision; reads project instructions and Contract; declares permitted files and prohibited operations; requires inspect-before-edit and stop-on-scope-mismatch; distinguishes checks actually run from code-path analysis; requests changed-file inventory, tests, Preview results, limitations and evidence; and never claims Owner acceptance.

Allocate prompt IDs from `BVC_TM_PROMPT_REGISTER.yaml`; IDs are monotonic and never reused. Commit prompt text, register updates and lesson embedding where required through a reviewed PR. The prompt is learner-ready only after canonical on `main`.

## 3. Run GAIS and capture evidence

The Human Owner/newbie runs the canonical prompt in the designated GAIS app. For each meaningful checkpoint, send original screenshots, complete GAIS response, changed-file list/diff or source export if required, actual build/lint/tests/manual browser actions, and app/environment identifier where relevant. Exclude credentials and secrets.

Evidence classifications:
- `OWNER_SUPPLIED`: supplied in chat; binary not yet in repository.
- `OWNER_REPORTED`: action/result reported by Owner but not independently inspected.
- `OBSERVED`: directly visible in an authentic screenshot or live Preview.
- `REPOSITORY_VERIFIED`: artifact exists on canonical GitHub and its path/checksum were verified.
- `NOT_VERIFIED`: evidence does not establish the claim.

A chat attachment is not automatically a GitHub asset. Preserve original bytes, verify image signature, dimensions, byte size and SHA-256 after upload, then embed a relative Markdown image link. Never use placeholders, mockups or truncated binaries as evidence.

## 4. Review and acceptance

Technical review compares delivery with Contract path allowlist, change budget, acceptance criteria, actual Preview behavior, tests actually run and declared limitations.

Keep separate dimensions:
- Task lifecycle: PLANNED, CONTRACT_DRAFT, APPROVED, IN_PROGRESS, EXECUTION_REPORTED, READY_FOR_ACCEPTANCE, COMPLETED_ACCEPTED, COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS, REJECTED, BLOCKED.
- Evidence completeness: NOT_RECEIVED, PARTIAL, COMPLETE_FOR_REVIEW.
- Technical verification: NOT_RUN, PARTIAL, PASS, FAIL.
- Human Owner acceptance: PENDING, ACCEPTED, ACCEPTED_WITH_LIMITATIONS, REJECTED.

Do not infer acceptance from a merge, prompt response, build, passing check or AI statement. Only an explicit Owner decision recorded canonically can set the acceptance dimension.

## 5. Update GitHub records as one transaction

Follow [REPOSITORY_CHANGE_SYNC_STANDARD.md](./REPOSITORY_CHANGE_SYNC_STANDARD.md) and validate the same-PR companion paths in [SYNC_IMPACT_MATRIX.yaml](./SYNC_IMPACT_MATRIX.yaml).

After a material event, update the authoritative source and all affected dependent records together in one focused PR: Project State; Task Execution Register; Prompt Register when a Prompt event occurs; Evidence Index when evidence changes; Lesson Status Register and lesson README when learner outcomes/status change; Source Manifest when canonical paths/authority change; and Handoff Log only for a meaningful checkpoint/handoff. Do not create multiple register-only PRs for the same event.

The sync validator checks completeness, not semantic correctness or Owner intent. Keep machine-observed Git metadata separate from semantic state. Automation must not infer task progress, decision approval, task completion or Owner acceptance.

## 6. ChatGPT-window / quota interruption checkpoint

Record latest verified `main` SHA and active branch/PR SHA; Task ID, Contract revision, Prompt ID and lifecycle dimensions; completed/uncompleted criteria; artifact paths/checksums and local-only assets; GAIS app state as OWNER_REPORTED or VERIFIED; blockers and one next action; sender release for actual cross-executor handoff.

A new ChatGPT window reads the live entrypoint, verifies repository identity/current `main` and open PRs, reconciles task registers and evidence, then continues. It should not ask the Owner to reconstruct old history unless needed information exists only in the old conversation and has not been supplied or committed.

## Current B1 example

For `BVC-TM-P3.3-004 / BVC-TM-TC-004 R1 / BVCTM-PROMPT-0004`:
- Contract and prompt are canonical on `main` through PR #53.
- Owner supplied Gemini 3.8 Flash report: one-file `app/page.tsx` change, React in-memory state, no persistence/dependency changes, ESLint and production build PASS.
- Owner supplied Preview screenshots before and after refresh. The after-refresh screenshot visibly shows empty task list, blank input, cleared validation and friendly empty state; classify B1-08 as `OBSERVED_PASS`.
- Exact GAIS changed-file diff was not independently inspected. Browser E2E was not run; some checks were code-path analysis.
- Human Owner acceptance remains pending. Do not declare B1 accepted or unlock B2.
- B1-08 original binary must be committed and checksum-verified before it is REPOSITORY_VERIFIED.


## 7. Synchronization gate

A material PR is not ready for Owner review until:
1. the canonical source is correct;
2. every required companion record in the impact matrix is included;
3. the repository sync validator passes;
4. relevant schema/Contract/unit tests are run or explicitly marked NOT_RUN;
5. the PR body states what is synchronized, what is not, and why.

After merge, the machine snapshot is a separate deterministic Git-metadata refresh. It must not be treated as a second semantic approval.
