# BVC Task Management — Project Operating Playbook

**Document ID:** BVCTM-OPS-001  
**Version:** 1.0.0  
**Status:** Proposed for Human Owner review  
**Project ID:** `BVC-TASK-MANAGEMENT`  
**Parent standard:** [BVC Project Operating Standard v1.0](../../../docs/continuity/BVC_PROJECT_OPERATING_STANDARD_V1.0.md)

---

## 1. Purpose and scope

This Playbook applies the BVC Project Operating Standard to the BVC Task Management product and its Beginner-to-Advanced Practical Labs.

It connects three separate workspaces:

1. **GitHub repository** — canonical product, design, architecture, governance, Contracts, Prompts, continuity, lessons and evidence.
2. **GAIS newbie app** — the existing application build/preview workspace used by the learner and Gemini.
3. **ChatGPT / AI coordination** — source recovery, architecture, context preparation, task orchestration, evidence review and continuity PR preparation.

These workspaces have different responsibilities. Do not copy the whole repository into GAIS.

## 2. Three-layer product and learning structure

### 2.1 Product authority — `projects/task-management/`

This layer defines what the product is and how it should behave:

- `product/` — Product Definition v0.2.0 is the current product baseline.
- `design/ux/v0.1/` — journeys, navigation, wireframes, responsive behavior, design system, interaction, accessibility and UX acceptance.
- `design/architecture/v0.1/` — application architecture, data model, security and development/deployment design.
- `governance/` — Product/UX Decision Register and Risk Policy.
- `phase3.3/task-contracts/` — exact approved implementation authority for individual engineering tasks.
- `continuity/` — Project State, task/prompt registers, evidence index, external-system register, source manifest and handoffs.
- `application/` — application source when/if the project later adopts a repository-backed application source workflow; do not assume GAIS code is automatically present here.

### 2.2 Learner experience — `practical-labs/bvc-task-management/`

This layer teaches the reader how to build and use the product:

- `PROJECT_INSTRUCTIONS_V0.1.md` — durable AI working rules for this GAIS project.
- `CURRICULUM_MAP_V0.2.md` and `LESSON_STATUS_REGISTER_V0.2.md` — learner progression and evidence state.
- `phase-a/`, `phase-b/`, `phase-c/`, `phase-d/` — step-by-step lessons.
- `prompts/` — canonical copy-ready prompts with monotonic IDs.
- `templates/` and Context Packs — concise task-specific learning context.
- Evidence and authentic screenshots — proof of the learner's actual GAIS experience.

### 2.3 Execution workspace — GAIS

The current GAIS app is:

- App ID: `ca589018-617d-4919-bbe2-6b9c588ccd85`
- Current observed project label: `BVC Task Management Scaffold Inspection`
- Model label observed in the supplied screenshot: Gemini 3.8 Flash.
- Access model: Human Owner operates the authenticated browser; ChatGPT does not claim direct GAIS account control.

GAIS should contain only what is needed for the application and its permanent Project Instructions. Do **not** create repository copies of `design/`, `governance/`, `task-contracts/`, `continuity/`, registers or Prompt libraries inside the beginner app.

## 3. Source-of-truth and context delivery

| Information | Canonical source | What GAIS/newbie receives |
|---|---|---|
| Product scope | Product Definition v0.2.0 | Short task-relevant excerpt/Context Pack |
| UI/UX | `design/ux/v0.1/` | Relevant interaction and visual constraints only |
| Architecture/data | `design/architecture/v0.1/` | Relevant design excerpt for the current lesson |
| Decisions and risk | `governance/` | Applicable approved decisions and restrictions |
| Task authorization | Exact Task Contract on `main` | Current Contract or a copy-ready excerpt that preserves its exact scope |
| Durable AI rules | Project Instructions | Saved in GAIS Instructions |
| Current action | Canonical Prompt in `practical-labs/.../prompts/` | Complete prompt copied by the learner |
| Actual outcome | GAIS Preview, Code/File Explorer, test and screenshot evidence | Captured by the Owner and supplied for review |

A Context Pack is a navigation and summarization artifact. It links to canonical sources and never overrides them. It should contain only the information needed for the current task.

## 4. Project Instructions ≠ Context Pack ≠ Task Contract ≠ Prompt

- **Project Instructions:** persistent working rules; not task permission.
- **Context Pack:** curated source map and relevant excerpts; not authority.
- **Task Contract:** exact task authorization, file scope, risk, acceptance, verification and stop conditions.
- **Task Prompt:** copy-ready instructions for one execution; it cannot expand the Contract.
- **Verification Evidence:** what actually happened; it is not replaced by an AI completion statement.

For every implementation lesson, link all five roles where relevant. The beginner sees the required small set, not the entire governance system at once.

## 5. Standard BVCTM task lifecycle

`LEARNING OUTCOME → PRODUCT/UX CONTEXT → TASK SPECIFICATION → CONTRACT → OWNER APPROVAL → CONTRACT ON MAIN → CONTEXT PACK → PROMPT → PROMPT ON MAIN → GAIS PREFLIGHT → GAIS EXECUTION → PREVIEW/DIFF EVIDENCE → TECHNICAL REVIEW → OWNER ACCEPTANCE → ONE CONTINUITY SYNC PR`

The seven Practical Labs steps remain the learner-facing teaching model:

1. UNDERSTAND.
2. INSPECT.
3. PREPARE.
4. AUTHORIZE.
5. EXECUTE.
6. VERIFY.
7. ACCEPT.

Do not expose internal YAML, schema or governance complexity earlier than the lesson needs it.

## 6. Beginner teaching model

Every lesson must:
- Start with an everyday task-management problem.
- Have one observable outcome.
- Assume the learner has never programmed.
- Use numbered steps with one principal action per step.
- Show where to click/type only when the current GAIS UI label has been observed.
- Explain why the action matters in plain language.
- Provide exact copyable prompts and expected results.
- Include a simple verification step, common mistakes and safe recovery.
- Stop when actual GAIS differs from the lesson assumptions.
- Distinguish a product feature being implemented from the lesson being published or accepted.

Use synthetic task titles and non-sensitive sample data. Never ask learners to enter real passwords, API keys, private customer information or sensitive personal/business data.

## 7. BVC Task Management learning progression

| Phase | Learner outcome | Environment | Main boundaries |
|---|---|---|---|
| A — Meet AI & Build First App | Understand GAIS, create blank app, set Project Instructions, communicate with AI | GAIS | Learning exercises; no product feature implementation |
| B — Build Your First Task | Create, save, reopen and make one small improvement | Existing GAIS app | Beginner browser storage only; no external DB/Auth/GitHub sync |
| C — Make It Useful Every Day | My Day, My Tasks, Projects, Starter Kits, Settings/Backup, responsive use | GAIS Beginner | Each feature gets its own decision/Contract/verification |
| D — Beyond Beginner | Relational data, Supabase, Auth/RLS, source control, local testing and deployment | Intermediate/Advanced environments | Separate security, data, migration and release authority |

Do not start all phases in one prompt. Each lesson depends on the previous accepted outcome and its own source/decision/Contract gates.

## 8. Current Phase B state — authoritative checkpoint

### B1 — Create Your First Task

- Task: `BVC-TM-P3.3-004`
- Contract: `BVC-TM-TC-004 Revision 1`
- Owner disposition: `COMPLETED_ACCEPTED_WITH_KNOWN_LIMITATIONS`, 2026-11-12.
- Scope: title-only task capture in React page memory; no persistence.
- Known limitations: complete manual Preview test set and independent GAIS before/after file inventory were not archived in GitHub. Do not convert these gaps into PASS.
- B1 must not be reopened merely to add persistence. B1 behaviors become regression checks under later work.

### DR-005 — Storage disclosure

- Status: APPROVED and canonical on `main` through PR #62.
- Beginner copy and inline notice placement are in the canonical Product/UX Decision Register and B2 lesson.
- Beginner disclosure must appear before the first persisted task; acknowledge with **Got it — continue**.
- The full explanation remains available through More → Settings & Backup once that area exists.
- Intermediate/Advanced must use their distinct signed-in workspace/RLS wording.

### B2 — Save Your Task

- Task: `BVC-TM-P3.3-005`
- Contract: `BVC-TM-TC-005 Revision 1`
- Owner approval: recorded by successful Merge of PR #64 on 2026-11-13.
- Risk: R2 under the current one-component boundary.
- Allowed change: MODIFY `app/page.tsx` only; CREATE 0; DELETE 0; maximum 350 diff lines.
- Intent: persist the task-only Beginner workspace in browser `localStorage` using the Contract's versioned envelope and approved DR-005 notice.
- Exclusions: no new packages, dependencies, config, routes, database, Supabase, Firebase, Auth, external APIs, cloud sync, cross-tab sync, Projects, Checklists, Backup/Import/Export or Settings page.
- Execution: NOT_STARTED. Contract approval does not itself mean Gemini may edit GAIS; the live source/app preflight and separate Owner execution instruction are still required.

## 9. B2 execution preflight

Before any write-capable B2 prompt is used:

1. Confirm the GAIS app ID is still `ca589018-617d-4919-bbe2-6b9c588ccd85`.
2. Inspect the live `app/page.tsx` and compare it with the Owner-supplied B1 source.
3. Inspect the Code/File Explorer change list and confirm no competing writer or unsynchronized work.
4. Confirm the task can be completed in exactly `app/page.tsx` within the approved 350-line budget.
5. Confirm DR-005 and TC-005 are visible on current `main`.
6. Read the B2 Context Pack and exact Contract revision.
7. Run the read-only preflight Prompt and review Gemini's response.
8. Obtain the Human Owner's explicit instruction to execute B2.

If source differs materially, another file is required, localStorage is unavailable, invalid data may be overwritten, or a new design/schema decision is needed, stop and prepare a revised Contract rather than improvise.

## 10. GitHub → GAIS workflow for the learner

1. Read the lesson on GitHub.
2. Open the canonical Context Pack and the linked approved Contract.
3. Open the existing GAIS project; do not create repository folders inside the app.
4. Read the read-only preflight result and understand what will change.
5. Only after the Owner authorizes, paste the canonical write-capable Prompt.
6. Inspect Preview and Code/File Explorer. Ask AI for the exact modified-file list.
7. Run each lesson acceptance check manually; capture authentic screenshots and relevant source output.
8. Send the original evidence to the reviewer. Do not rely on the AI's final paragraph alone.
9. Update GitHub in one reconciliation PR covering task, prompt, evidence, external system, lesson, project state and source manifest as applicable.
10. Owner reviews and merges. Verify the resulting main SHA and records.

## 11. Evidence and task state

For every task, keep these independent:
- Contract publication/approval.
- Prompt publication.
- Prompt execution.
- Learning outcome.
- Technical verification.
- Evidence completeness.
- Human Owner acceptance.

For GAIS evidence, classify:
- OWNER_SUPPLIED — screenshot/source pasted by Owner.
- OWNER_REPORTED — action/result reported but not independently checked.
- OBSERVED — visible in authentic Preview/Code evidence.
- REPOSITORY_VERIFIED — artifact, path and checksum verified on GitHub.
- NOT_VERIFIED / NOT_RUN — evidence/check does not exist or did not run.

Never mark a task accepted because a Prompt was merged, Gemini said "Done", the Preview loads, or the app builds. Use the applicable Owner decision and record known limitations.

## 12. One-update synchronization rule

After a Human Owner approval, relevant GAIS checkpoint, task acceptance, PR merge or material main commit:
- Read the exact source event and current main.
- Determine which BVCTM records are actually affected.
- Update all affected records in one semantic reconciliation PR: Project State, Task Execution Register, Prompt Register, Evidence Index, External System Register, Lesson Status, lesson README, Project Continuity Profile, Source Manifest and Handoff Log where applicable.
- Record the source PR/commit SHA and one event reference; do not write duplicate handoffs.
- Reuse an existing open sync PR for the same event instead of creating another.
- Verify the PR diff and status before Owner merge.
- GitHub Actions separately records deterministic machine metadata; it must never infer semantic acceptance.

Chat-only decisions cannot be detected by GitHub Actions. ChatGPT must prepare the semantic synchronization PR in the same active session when the Owner provides the decision. This is not background automation.

## 13. Reusable source links

- [Project index](../README.md)
- [Product Definition v0.2.0](../product/BVC_TASK_MANAGEMENT_PRODUCT_DEFINITION_V0.2.0.md)
- [UX Design Package](../design/ux/v0.1/README.md)
- [Architecture Package](../design/architecture/v0.1/README.md)
- [Decision Register](../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md)
- [Task Contracts](../phase3.3/task-contracts/)
- [Practical Labs](../../../practical-labs/bvc-task-management/README.md)
- [Global BVC Operating Standard](../../../docs/continuity/BVC_PROJECT_OPERATING_STANDARD_V1.0.md)

---

## 14. Change control

This Playbook is a project-specific operating guide. It cannot change Product Definition, approved UX/Architecture, Risk Policy, decision status or Task Contract scope. Any conflict is resolved using the Global BVC authority precedence and the Human Owner's decision.
