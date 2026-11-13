# BVC Project Operating Standard

**Document ID:** BVC-GOV-OPS-001  
**Version:** 1.0.0  
**Status:** Proposed for Human Owner review  
**Applies to:** BEYOND VIBE CODING — Build & Learn, all BVC projects and Practical Labs  
**Authority:** Operates under the Enterprise Constitution, approved project baselines, current Task Contracts and the Human Owner's decisions. It does not create authority over those sources.

---

## 1. Purpose

This Standard defines one repeatable operating system for designing, building, reviewing, teaching, and maintaining BVC projects.

The intended outcome is that every project can be continued by a new AI session, model, executor, or human collaborator using current repository sources rather than relying on an old chat transcript.

> **One repository of truth. One approved task at a time. One synchronized record update per material event.**

The standard joins five activities that must stay aligned:

1. Portfolio and project governance.
2. Product, UX, architecture and technical design.
3. Task specification, Contract and Prompt preparation.
4. Practical execution in the appropriate environment.
5. Evidence, acceptance, release and continuity synchronization.

## 2. Non-negotiable principles

1. **Human Owner remains the authority.** AI may analyze, draft, inspect, implement within approved scope and recommend. It may not self-approve a baseline, Contract, task acceptance, risk exception or merge.
2. **GitHub is the durable source of truth.** Product records, design, architecture, governance, Contracts, Prompts, source history, evidence indexes and continuity records live in the canonical repository.
3. **Execution environments are not repositories of governance.** GAIS, VS Code, Localhost and other tools host application work or technical execution only. Do not mirror the full BVC repository into them.
4. **One concept, one canonical source.** Use links and concise Context Packs rather than creating competing copies of Product Definition, UX, Architecture, Decision Registers or Contracts.
5. **Product First, Design First, Contract First.** Do not implement a feature before its applicable product/design decisions and task authorization are ready.
6. **Inspect before editing.** Verify the live repository, branch, source file, app identity and existing state immediately before a write.
7. **One active writer per task.** A second executor may review read-only; it may not write until the previous writer has released the role and the receiver is accepted.
8. **One lesson, one practical outcome.** Reader-facing material starts from a familiar problem, uses numbered beginner steps, and verifies a real result.
9. **Evidence before claims.** A prompt response, screenshot, successful build, merged PR or visible UI proves only what it directly establishes.
10. **One synchronization bundle per material event.** Update all affected registers and indexes together in one focused reconciliation PR. Do not create one commit per chat message or duplicate handoff entries.
11. **No silent scope expansion.** If another file, dependency, service, data model, security boundary or UX decision is required, stop and request a revised authorization.
12. **Preserve history and local-only work.** Never reset, clean, overwrite or delete worktrees, stashes, evidence or local files that have not been inspected and explicitly authorized.

## 3. Repository layers and authority

The BVC repository is organized by responsibility:

| Repository area | Responsibility | Authority |
|---|---|---|
| `specifications/` | BVC Core Specifications and machine-readable schemas | BVC engineering specification authority at its recorded maturity |
| `docs/continuity/` | Global bootstrap, executor roles, task lifecycle, event-driven synchronization and portfolio continuity | Global BVC operating protocol |
| `projects/<project-id>/product/` | Product definition, product changes and product requirements | Project Product Owner / Human Owner |
| `projects/<project-id>/design/ux/` | UX research, journeys, wireframes, design system, interaction and accessibility | Approved project UX baseline |
| `projects/<project-id>/design/architecture/` | Application architecture, data model, security and deployment design | Approved project architecture baseline |
| `projects/<project-id>/governance/` | Decisions, risk policy, approval records and governance indexes | Human Owner / designated governance authority |
| `projects/<project-id>/phase*/task-contracts/` | Task-specific engineering authorization | Exact approved Contract revision |
| `projects/<project-id>/continuity/` | Project State, task/prompt registers, evidence, external-system observations and handoffs | Project-specific continuity records, reconciled with their source authorities |
| `practical-labs/` | Reader-facing curriculum, lessons, prompts, Context Packs, templates and authentic learning evidence | Practical Labs authoring standard and project-approved learning scope |
| `.github/workflows/`, `scripts/`, `tests/` | Deterministic automation and validation | Reviewed engineering changes and CI evidence |

A project may use additional folders, but must not create a second state store or override a higher-authority source.

## 4. Authority precedence

When sources conflict, use this order:

1. Current explicit Human Owner decision in an approved canonical record on `main`.
2. Approved project governance, risk policy and decision records.
3. Current Product Definition and accepted UX/Architecture baselines.
4. Exact approved Task Contract revision and its required Context Pack.
5. Canonical Prompt that implements that Contract without changing its meaning.
6. Actual source, runtime observations, tests and accepted evidence.
7. Project State, registers and handoff logs as synchronized summaries.
8. Open PRs and branches as proposals only.
9. Chat history, AI memory, model output and local-only reports as supporting leads, never as the sole source of canonical project truth.

A merge publishes a reviewed change. Its meaning depends on the PR scope:
- Merging a Contract PR records Owner approval of that Contract when the PR is explicitly submitted for that purpose.
- Merging a Prompt or lesson PR publishes those materials; it does not prove execution.
- Merging implementation code publishes code; it does not by itself establish runtime acceptance.
- A task is accepted only when the Human Owner's acceptance decision and limitations are recorded.

## 5. Roles

| Role | Responsibility | May not do |
|---|---|---|
| Human Owner / Product Owner | Final scope, product/design/architecture decisions, risk exceptions, Contract approval, acceptance and PR merge | Delegate final authority implicitly to an AI |
| ChatGPT — Chief Architect / Project Engineering Orchestrator | Recover current context, inspect sources, plan architecture, prepare Contracts/Context Packs/Prompts, review evidence, coordinate one synchronization bundle | Self-approve, self-accept, merge or claim access to GAIS/local environments not actually inspected |
| Gemini in GAIS | Primary beginner/Vibe Coding implementation executor when the active Contract assigns GAIS | Change unlisted files, expand scope, claim unrun checks or introduce services not authorized |
| DeepSeek / VS Code | Independent reviewer, tester or code auditor when actually available and authorized | Become a second writer before handoff/release |
| GitHub Actions | Observe deterministic repository events, run validators and produce machine metadata | Infer semantic decisions, task acceptance, risk or runtime success |
| Learner / Newbie | Follow lesson steps, run prompts, inspect Preview, capture evidence and raise differences | Approve technical scope they do not own or hide failed results |

## 6. Canonical task lifecycle

Use the seven-step Practical Labs lifecycle:

1. **UNDERSTAND** — identify the real need and one observable outcome.
2. **INSPECT** — inspect the actual project, current source and applicable instructions.
3. **PREPARE** — assemble the smallest sufficient context, Contract, acceptance criteria and verification plan.
4. **AUTHORIZE** — confirm Human Owner approval and exact permitted scope.
5. **EXECUTE** — perform one bounded task in the assigned environment.
6. **VERIFY** — inspect the actual diff and run the checks defined by the Contract.
7. **ACCEPT** — Human Owner reviews the evidence and explicitly accepts, accepts with limitations or rejects.

For a write-capable task, the repository-backed sequence is:

`BACKLOG → TASK SPECIFICATION → TASK CONTRACT → OWNER APPROVAL → CONTRACT MERGED ON MAIN → CONTEXT PACK → PROMPT REVIEW → PROMPT MERGED ON MAIN → ENVIRONMENT PREFLIGHT → EXECUTION → EVIDENCE INTAKE → TECHNICAL REVIEW → OWNER ACCEPTANCE → ONE CONTINUITY SYNC PR`

The learner's lesson explains this in simple steps. The engineering system enforces it through canonical documents and review gates.

## 7. Task Contract minimum contents

Every implementation Contract must define:

- Unique Task ID, Contract ID and revision.
- Product/phase/lesson outcome and linked Product/UX/Architecture sources.
- Required context and known baseline.
- Risk level under the active project's Risk Policy.
- Exact CREATE / MODIFY / DELETE allowlist.
- Change Budget: files, diff size, dependencies, configuration and binary limits.
- Explicit prohibited scope and protected paths.
- Expected output and data/interaction boundaries.
- Acceptance Criteria with objective verification method.
- Evidence requirements and evidence classifications.
- Preflight requirements and recovery point.
- Stop conditions, error handling and permitted repair attempts.
- Executor/environment and approval state.
- Separate execution authorization where the project requires it.

A Project Instructions file or Prompt does not replace a Task Contract. A Contract does not automatically authorize execution unless its approval and execution gate say so.

## 8. GitHub, Practical Labs and execution environment

### GitHub

GitHub stores canonical project records, code where applicable, Contracts, Context Packs, Prompts, evidence, PRs and validation results. Use feature branches and reviewed PRs. No AI executor may merge a PR on behalf of the Human Owner.

### Practical Labs

Practical Labs is the learner's experience layer. Each lesson must:
- State one observable outcome.
- Start from the learner's current state.
- Use numbered steps with one main action per step.
- Explain where to click/type and why.
- Provide exact copyable prompts when needed.
- Show the expected result and a simple check.
- Include common mistakes, safe recovery and stop conditions.
- Distinguish what is designed, implemented, observed, verified and accepted.

### GAIS / IDE / Localhost

The environment contains the application and files needed for the active task, not a copy of the governance repository. Give the executor only:
- Permanent Project Instructions.
- The current lesson's Context Pack.
- The exact approved Task Contract.
- The canonical Prompt.
- Required source excerpts or links.

Do not recreate repository-level `design/`, `governance/`, `task-contracts/`, `continuity/` or Prompt Register folders inside a beginner GAIS app.

## 9. Event-driven synchronization — one bundle per material event

### 9.1 Event classes

| Event | Canonical action | Synchronization |
|---|---|---|
| Chat message with no material decision or repository change | No commit | No update |
| Human Owner approval in ChatGPT or another chat | Assistant records the decision in its canonical source | One semantic sync PR in the same work session; ChatGPT itself is not a GitHub event source |
| Feature branch commit | Proposed work only | No canonical state transition; machine snapshot waits for main |
| PR opened/updated | Validate scope and CI | No acceptance or completion update |
| PR merged into `main` | Record exact merge commit and inspect changed paths | One semantic reconciliation bundle for all affected project/portfolio records; machine snapshot handled by workflow |
| Direct commit/push to `main` | Record exact commit, actor and changed paths | Same review and synchronization path; direct write is a governed exception, not the normal route |
| GAIS execution checkpoint | Record Owner-supplied response, Preview, diff/export and actions actually run | Update task/evidence/external-system/lesson records together |
| Owner acceptance/rejection | Record decision, date and limitations | Update task, evidence, lesson, Project State and handoff in one bundle |
| New ChatGPT window or executor handoff | Read-only bootstrap and capability check | Update only if a material recovery point or real writer handoff occurred |

### 9.2 Required synchronization bundle

When a material event occurs, inspect the whole affected project scope, then update all applicable records together in one focused PR:

1. Project State.
2. Task Execution Register.
3. Prompt Register.
4. Evidence Index and authentic evidence asset references.
5. External System Register when GAIS, IDE, Localhost or provider state changes.
6. Lesson Status Register and learner-facing lesson/index.
7. Project Continuity Profile and Source Manifest when authority, paths or bootstrap requirements change.
8. Handoff Log only for a meaningful checkpoint or actual handoff.
9. Project Index and global portfolio pointer when the active project/phase/task changes.
10. Relevant governance decision or acceptance record when an Owner decision itself must be published.

Do not update unrelated projects or duplicate a decision in multiple registers. Each record has one defined responsibility.

### 9.3 Idempotence and collision prevention

Each synchronization bundle must state:
- Event type and event source (Owner decision, PR merge or main commit).
- Exact source `main` SHA and relevant PR/commit URL.
- Project ID, Task ID, Contract revision and Prompt ID where applicable.
- Paths reviewed and paths changed.
- Whether machine metadata was updated separately by GitHub Actions.
- Evidence limitations and the next permitted action.

Use the source merge commit or decision reference as the event key. Before writing, check whether that event is already recorded. If a reconciliation PR for the same event is open, update that PR/branch rather than creating a duplicate. Never append the same checkpoint twice.

### 9.4 Automatic and semantic automation boundary

GitHub Actions can automatically observe pushes/merges to `main`, changed paths, commit ranges and validation results. The continuity updater changes only `machine_snapshot` in `docs/continuity/CURRENT_STATE.yaml`; it does not infer task meaning or acceptance.

The workflow must watch Practical Labs paths as well as Product, Project, Design, Governance, Scripts and Tests. It must ignore continuity-only paths so a continuity update does not create an unnecessary refresh loop.

A chat-only Human Owner decision is not visible to GitHub Actions. Without a separately authorized AI/GitHub integration that can receive that event, no workflow can automatically read the chat or safely infer its meaning. The assistant must therefore create the semantic sync PR in the same active work session. Do not describe this as background or guaranteed autonomous work.

After a semantic sync PR merges, verify the new `main` SHA and the relevant files. A material main event should then be captured by the machine snapshot workflow if the workflow run succeeds. Missing/failed workflow runs remain NOT_RUN/FAIL, never PASS.

## 10. Evidence and acceptance model

Keep these dimensions separate:

- **Publication:** DRAFT / PROPOSAL / CANONICAL_ON_MAIN.
- **Execution:** NOT_STARTED / OWNER_REPORTED / OBSERVED / VERIFIED / FAILED / NOT_RUN.
- **Evidence completeness:** NOT_RECEIVED / PARTIAL / COMPLETE_FOR_REVIEW.
- **Technical verification:** NOT_RUN / PARTIAL / PASS / FAIL.
- **Owner acceptance:** PENDING / ACCEPTED / ACCEPTED_WITH_LIMITATIONS / REJECTED.

Use project-specific registers where they already define these dimensions. Do not invent statuses unsupported by a governing schema.

Evidence labels:
- OWNER_SUPPLIED — supplied by the Owner; artifact not yet independently verified.
- OWNER_REPORTED — action/result reported by the Owner or AI; not independently inspected.
- OBSERVED — visible in authentic Preview/screenshot or directly inspected content.
- REPOSITORY_VERIFIED — artifact/commit/path/checksum directly verified on canonical GitHub.
- NOT_VERIFIED / NOT_RUN — evidence is insufficient or the check did not run.

A merge, build, screenshot or AI statement proves only its direct claim. Never infer all acceptance criteria from one success signal.

## 11. Risk, changes and stop conditions

- Use the applicable project's Risk Policy; do not invent or downgrade a risk level.
- One active writer per task. Any possible competing writer or uncertain sync state means stop and preserve both versions.
- Stop on unlisted files, exceeded change budget, new dependency/configuration, new service, security boundary, schema/migration or a design decision not covered by the Contract.
- Keep secrets, tokens, personal/customer/confidential data out of prompts, screenshots and example data.
- Preserve local-only assets and dirty worktrees until inspected and explicitly authorized.
- One repair attempt only when the Contract permits it; otherwise re-contract.

## 12. New-session bootstrap and handoff

Every new AI session must:
1. Declare its real model, tools and access.
2. Verify repository identity, current `main` SHA and open PRs.
3. Read this Standard, Global Bootstrap and Task Lifecycle.
4. Read the active project's Continuity README, Project State, registers, Source Manifest and handoff.
5. Read the active Product/UX/Architecture/Decision/Risk sources and exact approved Contract.
6. Produce a source-backed Project Understanding Review when required by Bootstrap.
7. Stop at the Owner review gate before any new write unless the Owner has already supplied explicit continuation authority.

A context-window change alone is not a worker handoff. A real handoff requires sender release, a verified checkpoint and receiver acceptance.

## 13. Current BVC Task Management reference

For the BVC Task Management subproject, use:
- [BVCTM Project Operating Playbook](../../projects/task-management/continuity/BVCTM_PROJECT_OPERATING_PLAYBOOK_V1.0.md)
- [Product Definition v0.2.0](../../projects/task-management/product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [UX Design Package](../../projects/task-management/design/ux/v0.1/README.md)
- [Project Continuity](../../projects/task-management/continuity/README.md)
- [Practical Labs](../../practical-labs/bvc-task-management/README.md)

The project playbook specializes this Standard; it does not override the Product, UX, Architecture, Governance or Task Contract sources.

## 14. Change control

This Standard is operating guidance. Any change to authority, risk, source precedence, approval, or merge requirements must be reviewed by the Human Owner and published through a PR. Project-specific extensions must link back to this document and must not silently contradict it.

---
