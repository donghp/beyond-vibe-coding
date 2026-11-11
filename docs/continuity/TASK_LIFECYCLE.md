# BVC Task Lifecycle — Backlog to Accepted Learning Evidence

**Purpose:** Define the mandatory repository-backed lifecycle for BEYOND VIBE CODING — Build & Learn. This is an operating protocol under existing BVC governance and Task Contracts; it does not create a second state store or grant task authority.

## Canonical sequence

`PRODUCT BACKLOG → TASK SPECIFICATION → TASK CONTRACT → OWNER APPROVAL → CONTRACT MERGED ON MAIN → PROMPT DRAFT → PROMPT REVIEW → PROMPT MERGED ON MAIN → GAIS EXECUTION → EVIDENCE INTAKE → TECHNICAL REVIEW → OWNER ACCEPTANCE → REGISTER RECONCILIATION`

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

After a material event, update relevant files together in one focused PR where practical: Task Execution Register; Prompt Register; Evidence Index and asset index; Lesson Status Register and lesson README; Project State and Handoff Log; Source Manifest when a canonical source is added/changed. Keep machine-observed Git metadata separate from semantic state. Automation must not infer task progress or Owner acceptance.

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
