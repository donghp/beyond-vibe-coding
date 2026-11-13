# BVC Task Lifecycle — Backlog to Accepted Learning Evidence

**Purpose:** Define the mandatory repository-backed lifecycle for BEYOND VIBE CODING — Build & Learn. This is operating guidance under existing BVC governance and Task Contracts; it does not create a second state store or grant task authority.

## Executor roles and first-response gate

Follow AI_EXECUTOR_ROLE_MODEL.md:
- Human Owner retains final Product, Architecture, Governance, Contract, risk-escalation, acceptance and merge authority.
- ChatGPT is Chief Architect and Project Engineering Orchestrator; this delegated role does not confer self-approval authority.
- Gemini in Google AI Studio is the primary implementation executor for Beginner/Vibe Coding tasks when the active Contract routes work to GAIS.
- DeepSeek in VS Code may serve as an independent reviewer/tester/code auditor when available and explicitly authorized. It becomes a writer only after the previous writer releases the workspace and the receiver is accepted.

One semantic Task Contract governs every executor. Provider-specific prompt adapters preserve the same objective, scope, constraints, risk, acceptance criteria, verification and stop conditions. One authorized writer per task/workspace.

A new ChatGPT window must follow START_HERE.md and complete the read-only Vietnamese Project Understanding Review using PROJECT_UNDERSTANDING_REVIEW.template.md. Wait at WAITING_FOR_OWNER_REVIEW when required. Do not create new work merely because a new window starts.

## Canonical sequence

BACKLOG → TASK SPECIFICATION → TASK CONTRACT → OWNER APPROVAL → CONTRACT MERGED ON MAIN → CONTEXT PACK → PROMPT REVIEW → PROMPT MERGED ON MAIN → ENVIRONMENT PREFLIGHT → EXECUTION → EVIDENCE INTAKE → TECHNICAL REVIEW → OWNER ACCEPTANCE → ONE CONTINUITY SYNC PR

A write-capable prompt must not be given to a learner until its approved Task Contract and canonical Prompt are on main, required preflight has passed, and the Human Owner has separately authorized execution when the Contract requires it. Read-only learning exercises may use another explicitly recorded authorization basis.

## 1. Specify the task before writing a prompt

Define:
- Unique Task ID, title, phase/lesson and one observable outcome.
- Product/UX/Architecture/Decision/Risk source references.
- Dependencies and required Context Pack.
- Exact expected outputs and CREATE/MODIFY/DELETE allowlist.
- Risk and Change Budget.
- Stop conditions and recovery point.
- Acceptance criteria, verification method and evidence requirements.
- Executor/environment and separate approval/execution gates.

ChatGPT prepares the specification and Contract. The Human Owner approves the Contract. It becomes canonical only after its PR merges to main. Do not allocate a write-capable Prompt before this gate is satisfied.

## 2. Prepare the Context Pack

A Context Pack is a task-specific source map and concise summary. It links to canonical source documents and identifies the relevant parts. It does not replace or override Product Definition, UX, Architecture, Governance or the Contract.

Do not copy the full repository, design, governance, task-contracts or continuity folders into GAIS. GAIS receives only the persistent Project Instructions and the lesson-level sources needed for the active task.

## 3. Create and publish the Prompt

Every canonical Prompt references exact Task ID, Contract ID and revision; reads Project Instructions and the active Contract; declares permitted and prohibited operations; requires inspect-before-edit and stop-on-scope-mismatch; distinguishes checks actually run from code-path analysis; requests exact changed-file inventory, Preview results, tests, limitations and evidence; and never claims Owner acceptance.

Allocate Prompt IDs from the project Prompt Register. IDs are monotonic and never reused. The prompt file and learner lesson reference are committed through a reviewed PR. The Prompt is canonical only after merge.

## 4. Environment preflight and execution

Before the first write:
- Verify the exact app/project identity and environment.
- Inspect the actual current source and file inventory.
- Compare against the Contract baseline or Owner-supplied source.
- Confirm no competing writer or unsynchronized source.
- Confirm exact allowed files and change budget.
- Stop when source, environment or scope differs materially.

For GAIS, the Human Owner operates the authenticated app. ChatGPT must not claim direct access to GAIS or its private account unless a supported tool actually provides that access.

## 5. Evidence intake

Capture:
- Original GAIS response and authentic Preview/Code screenshots.
- Exact file-change list/diff or export when required by Contract.
- Real build/lint/test/browser actions and their actual results.
- App/environment identifier when relevant.
- Known limitations, failures and unrun checks.

Evidence classifications:
- OWNER_SUPPLIED: provided by Owner; binary/source not yet independently verified.
- OWNER_REPORTED: action/result reported but not independently inspected.
- OBSERVED: visible in authentic Preview/screenshot or directly inspected source.
- REPOSITORY_VERIFIED: artifact/path/commit/checksum verified on canonical GitHub.
- NOT_VERIFIED / NOT_RUN: evidence is insufficient or the check did not run.

A chat attachment is not automatically a GitHub asset. Preserve original bytes, verify file signature, dimensions/size and SHA-256 after upload, then link the canonical repository asset. Never use a mockup or placeholder as implementation evidence.

## 6. Technical review and Owner acceptance

Compare the delivery against:
- Contract path allowlist and Change Budget.
- Every Acceptance Criterion.
- Actual Preview behavior and source diff.
- Tests actually executed, not merely described.
- Error behavior, limitations and residual risks.
- Required evidence and expected recovery state.

Keep separate dimensions: publication status, execution status, evidence completeness, technical verification and Human Owner acceptance. Use the project-specific register and schema for the exact allowed values.

A merge, prompt response, build, test or AI Done statement is not automatically product/task acceptance. Only the explicit Human Owner decision recorded canonically can set acceptance.

## 7. One continuity synchronization bundle

After a material Owner approval, merge/commit, GAIS checkpoint, task acceptance or milestone transition:
1. Identify the exact event source and current main SHA.
2. Determine the affected project(s) and authoritative records.
3. Update all relevant records together in one semantic reconciliation PR: Project State, Task Execution Register, Prompt Register, Evidence Index, External System Register, Lesson Status/README, lesson README, Project Continuity Profile, Source Manifest, Handoff Log and global portfolio pointer as applicable.
4. Use the source SHA/PR or explicit Owner decision reference as the idempotency key.
5. Reuse an existing open sync PR for the same event; do not create overlapping duplicate PRs.
6. Record checks actually run and unresolved conditions.
7. Ask the Human Owner to review and merge. After merge, verify the new main SHA and any machine snapshot workflow.

Machine automation updates only deterministic Git metadata. It must not infer Owner approval, task progress, acceptance, risk or GAIS runtime behavior. Chat-only Owner decisions are not visible to GitHub Actions; the assistant must record them in a semantic PR during the active session.

## 8. Chat-window / quota interruption checkpoint

Record latest verified main SHA and active branch/PR SHA; Task ID, Contract revision and Prompt ID; completed/uncompleted criteria; evidence paths/checksums; GAIS state and its evidence classification; local-only assets/worktrees; blockers; one next permitted action; and sender release/receiver acceptance only for a real cross-executor handoff.

A new session re-reads live sources and does not ask the Owner to reconstruct committed history.

## Current BVC Task Management checkpoint

For BVC-TM-P3.3-004 / BVC-TM-TC-004 R1 / BVCTM-PROMPT-0004:
- PR #53 published the Contract and Prompt.
- The Human Owner closed B1 on 2026-11-12 as COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS.
- The supplied app/page.tsx was reviewed; the Owner confirmed the actual GAIS Code view has one Page component.
- Full archived Preview test set and independent GAIS before/after file inventory remain unavailable. Browser E2E is not claimed. Retain these limitations.

For BVC-TM-P3.3-005 / BVC-TM-TC-005 R1:
- DR-005 is approved via merged PR #62.
- Contract #005 is Owner-approved and canonical via merged PR #64.
- Scope is MODIFY app/page.tsx only, max 350 diff lines, no dependencies/config/database/Auth/external service.
- B2 execution has not started. Live GAIS preflight and a separate Owner execution instruction remain required.

Do not let old historical examples elsewhere in this document override current main and the current project registers.
