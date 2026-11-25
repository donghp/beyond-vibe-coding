# BOOTSTRAP — BVC Task Management / DeepSeek Handoff

**Document ID:** BVC-TM-DEEPSEEK-BOOTSTRAP-001  
**Prepared:** 2026-11-25  
**Repository:** https://github.com/donghp/beyond-vibe-coding  
**Default branch:** `main`  
**Project:** BVC Task Management  
**Learning program:** BEYOND VIBE CODING — Build & Learn  
**Current milestone:** Phase C1 — My Day  
**Active implementation Contract:** `BVC-TM-TC-007`, Revision 1 — APPROVED  
**Handoff purpose:** Reconstruct project context for a DeepSeek session and perform an R4 Data Privacy/Security technical review.

---

## 1. Welcome: what this project actually is

You are joining **BVC Task Management**, a progressive, hands-on learning project in the BEYOND VIBE CODING — Build & Learn program.

This is not merely a software repository or a request to write code. It is a learning environment in which a real beginner is guided to build and use a useful task-management web application with AI.

The primary learner is a **newbie**: someone who may have never programmed, used a terminal, edited source code, configured a database, or understood software-engineering terminology.

The first learning environment is **Google AI Studio (GAIS), Build mode**. The learner interacts with Gemini, follows plain-language instructions, observes the generated app, tries the feature, and learns from the result. The learner must be guided one step at a time.

The governing teaching philosophy is:

> Build & Learn — build something useful, use it, observe what happened, and understand one new engineering concept at a time.

The project must not assume that a learner already knows:
- programming languages, TypeScript, React or Next.js;
- terminals, command lines, Git, GitHub or VS Code;
- browsers' developer tools or Local Storage;
- databases, SQL, authentication or authorization;
- software architecture, threat modeling or migration procedures.

Introduce technical terms only when relevant. Explain every new concept in accessible Vietnamese. Tell the learner exactly what to click, where to look, what to type, what should happen and how to recognize success. Do not turn beginner teaching into an unexplained technical specification.

## 2. Your role and authority

This handoff is for a read-only R4 technical review.

| Actor | Responsibility |
|---|---|
| Human Owner — Dong Hong | Final governance and execution authority; makes product decisions, approves Contracts, authorizes consequential actions and accepts outcomes |
| DeepSeek | Assigned R4 Data Privacy/Security Technical Reviewer; analyzes approved scope and evidence, reports findings and recommendations |
| ChatGPT | Human Owner-designated R4 Data Privacy/Security Domain Authority and Prompt Architect; independently evaluates DeepSeek findings and evidence, records a domain-review disposition, later prepares a bounded Gemini prompt |
| Gemini in Google AI Studio | Proposed implementation executor, only after all gates and a separate explicit Human Owner execution authorization |
| GitHub `main` | Canonical repository for approved project records and source-controlled governance |

Your authority is limited to producing a technical review report. You are **not** authorized to:
- modify GitHub files, branches, commits or pull requests;
- generate or apply implementation patches;
- access or modify the live GAIS application or its browser storage;
- run a migration, recovery or destructive operation;
- allocate Prompt #0006;
- authorize Gemini or begin implementation;
- change the approved Contract or silently expand its scope.

Do not claim to be a certified security professional, legal counsel, DPO or independent third-party auditor. This is an AI-assisted internal review arrangement. A qualified human professional review may be added where available or required; AI review must not be misrepresented as its substitute.

## 3. Canonical context and source precedence

Always read the current files from GitHub `main`, not stale copies from an earlier chat, old ZIP export, memory summary, branch or generated document.

Use this precedence when sources appear inconsistent:

1. Current explicit Human Owner decision published on `main`.
2. Approved project governance and policy on `main`.
3. Current approved Product Definition and accepted design/architecture decisions.
4. Current approved Task Contract and its exact scope.
5. Accepted execution, change and verification evidence.
6. Project State, registers and handoff records as reconciled snapshots.
7. Open pull requests and branches are proposals, not canonical truth until merged.
8. Old chat messages, model memory, old screenshots and historical archives are leads only; verify them against current canonical records.

**Important:** `docs/continuity/CURRENT_STATE.yaml` is an automatically generated machine-observed portfolio snapshot. It explicitly requires semantic reconciliation and is not a replacement for the project-specific Project State or task registers. Do not use old historical content in it to override current records.

### Mandatory first-read package

Read these files from `main` before reviewing:

1. `projects/task-management/continuity/PROJECT_STATE.json`
2. `projects/task-management/continuity/registers/TASK_EXECUTION_REGISTER.yaml`
3. `projects/task-management/continuity/registers/BVC_TM_PROMPT_REGISTER.yaml`
4. `projects/task-management/continuity/PROJECT_CONTINUITY_PROFILE.yaml`
5. `projects/task-management/continuity/registers/EXTERNAL_SYSTEM_REGISTER.yaml`
6. `projects/task-management/continuity/SOURCE_MANIFEST.csv`
7. `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-007_TASK_CONTRACT_V0.1.yaml`
8. `projects/task-management/phase3.3/reviews/BVC-TM-TC-007_R4_DOMAIN_REVIEW_ASSIGNMENT_2026-11-25.md`
9. `projects/task-management/governance/BVC_TASK_MANAGEMENT_RISK_POLICY_V0.1.md`
10. `projects/task-management/governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md`
11. `projects/task-management/design/architecture/v0.1/BVC_TASK_MANAGEMENT_DATA_MODEL_V0.1.md`
12. `projects/task-management/design/ux/v0.1/BVC_TASK_MANAGEMENT_INTERACTION_SPECIFICATION_V0.1.md`
13. `practical-labs/bvc-task-management/phase-c/C1_MY_DAY_DECISION_BRIEF_V0.1.md`
14. `practical-labs/bvc-task-management/GAIS_PROMPT_DELIVERY_STANDARD_V1.0.md`
15. `practical-labs/bvc-task-management/PROJECT_INSTRUCTIONS_V0.1.md`
16. `practical-labs/bvc-task-management/LESSON_STATUS_REGISTER_V0.2.md`
17. `practical-labs/bvc-task-management/phase-b/PHASE_B_ACCEPTANCE_AND_CLOSEOUT_2026-11-24.md)
18. `projects/task-management/phase3.3/task-contracts/BVC-TM-P3.3-005_TASK_CONTRACT_V0.1.json` — historical B2 source storage contract.

The R4 review assignment links additional source documents. Follow its exact scope and requested output format.

## 4. Verified project status at handoff

The current project-specific state is **Project State Revision 23**, dated 2026-11-25T10:26:23+07:00. Its source baseline reference is recorded in the JSON; the current `main` after PR #89 is commit:

`19e8ec939a1128631211406f95aae268652af54b`

### Product and learning lifecycle

- Product Definition v0.2.0 is the current approved product baseline.
- Phase 3.2 is an accepted architecture **design** baseline only; that does not prove runtime, migration, security or deployment tests.
- Formal Phase 3.1 UX acceptance remains OPEN.
- Phase A A1–A4 is recorded as completed in the learning path.
- Phase B B1–B4 was explicitly accepted and closed by the Human Owner on 2026-11-24, with known limitations preserved. Historical `NOT_RUN` and `NOT_VERIFIED` results remain unchanged.
- Phase C is active; C1 — My Day is first.

### C1 product decisions

The Human Owner approved and canonicalized:
- DR-001 — Upcoming horizon: next 7 calendar days.
- DR-002 — Today's Focus uses the current local calendar date and expires at the next local calendar day.
- DR-017 — Browser IANA timezone detection on first use, user-correctable.
- DR-020 — Supplemental Unscheduled section after Upcoming and before Add task. Existing B2 tasks without dates/Focus are shown exactly once; no due date or Focus is invented.

### Contract #007

- Contract ID: `BVC-TM-TC-007`
- Task ID: `BVC-TM-P3.3-007`
- Revision: 1
- Status: **APPROVED** by the Human Owner on 2026-11-24; approval metadata is canonical through merged PR #88.
- Risk: **R4**
- Objective: implement date-aware C1 My Day behavior in the existing GAIS Beginner app.
- Scope: modify `app/page.tsx` only; max one modified file and max 500 diff lines.
- No new packages, lockfiles, configuration, route, database, Auth, RLS, external services, cloud sync, architecture changes or other files.
- Contract #006 Revision 2 remains a separate R1 readiness draft and grants no implementation authority.

Contract approval is not execution authorization.

### R4 roles — Human Owner designation on 2026-11-25

- DeepSeek: read-only AI technical reviewer.
- ChatGPT: R4 Data Privacy/Security Domain Authority and Prompt Architect.
- Gemini: proposed executor after gates.
- Human Owner: retains final governance and execution authority.

PR #89 merged the assignment record and companion updates into `main`.

### Current execution gates — all must remain distinct

| Gate | Current status |
|---|---|
| Contract #007 Revision 1 | APPROVED |
| DeepSeek technical report | PENDING |
| ChatGPT R4 domain disposition | PENDING |
| Post-migration recovery test against a copy of v2 | NOT_TESTED |
| Separate Human Owner execution authorization | NOT_GRANTED |
| Fresh live GAIS app/source/single-writer preflight VC-001 | NOT_RUN |
| Prompt #0006 | NOT_ALLOCATED |
| GAIS implementation under C1 | NOT_AUTHORIZED |

Do not change any of these statuses just because this handoff is read, a prompt is written, or a static review is performed.

## 5. GAIS is the learner's build-and-preview environment

The target GAIS app is identified in the approved Contract and inventory:

- App ID: `ca589018-617d-4919-bbe2-6b9c588ccd85`
- App display name: `BVC Task Management Scaffold Inspection`
- Environment: Google AI Studio Build mode / Preview.
- The learner's app is not the GitHub repository.
- The beginner does not need GitHub or VS Code to use the beginner learning path.
- GitHub is used by the project team as the canonical repository and governance source.
- Do not create repository governance folders, contracts, or continuity structures inside GAIS.

### What the latest Owner-supplied screenshot shows

The Human Owner supplied a GAIS screenshot on 2026-11-25 showing:
- The GAIS app open at the target app URL/ID.
- The Gemini panel reports that the development server was restarted after dependencies had populated.
- The message reports no project files were created, modified or deleted during that server restart.
- The Preview displays the BVC Task Management page and the B2 storage disclosure.
- Three visible tasks: `Prepare weekly work plan`, `Review project milestones`, and `Review Phase B final verification`.

This is **Owner-supplied visual evidence of the screen at the time of capture**. It is not a machine-verified source inventory, does not reveal the current full `app/page.tsx`, does not verify the Local Storage payload, and does not prove that C1 migration or any C1 implementation has occurred.

The screenshot is not permission to edit GAIS. A fresh VC-001 preflight is still required immediately before any future execution.

### GAIS and security boundary

The Beginner app stores practice data in browser Local Storage. The project does not claim that Local Storage is a secure vault, encrypted database, access-control system, or separate backup. Task titles could contain personal or confidential text if a learner enters it; the approved disclosure tells learners not to enter passwords, API keys or sensitive information. Review actual risks without inventing cloud data flows or assuming a server/database exists within Contract #007 scope.

## 6. Why Contract #007 is R4

The project Risk Policy defines R4 for tasks affecting security, identity, access control, personal/confidential data, database schema/migrations, authentication, authorization, secrets, financial calculations or another protected technical domain.

Contract #007 handles:
- potentially personal/confidential task content stored in the browser;
- browser storage reads/writes and user disclosure;
- versioned v1-to-v2 migration;
- preservation of existing IDs/titles/workspace identity;
- failure modes and safe stop conditions;
- post-migration downgrade/recovery.

R4 is therefore based on the protected data/integrity/recovery domain, not file count. A one-file change can still be R4.

Minimum project-policy controls include threat/impact analysis, data-flow review, least-privilege assessment where relevant, domain approval before execution, appropriate recovery testing, and evidence-based verification. Evidence Level 3 is the minimum for migration/data integrity and security claims; Evidence Level 4 is needed for actual Preview/Owner-observed behavior claims.

## 7. Technical facts that must not be confused

### Current product task data vs engineering task governance

The end-user application's task records are not the same as engineering Task Contracts, Prompts, Project State or repository governance. Keep these domains separate.

### B2 v1 storage and proposed/approved C1 v2

B2 key:
`bvc-task-management:workspace:v1`

C1 v2 key:
`bvc-task-management:workspace:v2`

The approved Contract requires strict validation and preservation:
- preserve `workspaceId`;
- preserve every original task ID and title exactly;
- legacy defaults only: `status: todo` and `priority: normal`;
- do not invent `due_date` or `focus_date`;
- preserve v1 unchanged through migration;
- construct candidate v2 in memory, validate, write once, read back, validate again, then activate;
- if a v2 key exists but is malformed/unsupported, stop; do not fall back to a potentially stale v1;
- migration or read-back failures must stop mutations and show truthful error;
- v1 is only a pre-migration checkpoint, not a rolling backup after v2 writes occur.

### Recovery is separate from migration

A code downgrade may need to operate on a workspace already updated under v2. A safe recovery procedure must preserve the full v2 payload and test a v1-compatible projection on a copy without discarding v2-only fields. No automatic destructive rollback, v2 deletion or v1 overwrite is allowed. AC-011 and VC-010 specifically require the tested recovery procedure and appropriate approvals.

### Dates and timezone

`due_date` and `focus_date` are date-only values, not UTC-midnight timestamps. The selected IANA timezone must govern local calendar-day logic. Do not use `Date.toISOString().slice(0, 10)` as a substitute for selected-timezone date calculation. Consider local midnight, month/year boundaries and applicable DST changes.

## 8. Beginner teaching principles — mandatory for all learner-facing help

When preparing any explanation or prompt that will be shown to the learner:

1. Write in Vietnamese unless the Human Owner requests another language.
2. Assume zero prior programming experience.
3. Begin with the goal in everyday language, not jargon.
4. Give numbered steps: Step 1, Step 2, Step 3…
5. Each step should describe one action only.
6. Name the exact UI control, menu or location the learner should use.
7. State what the learner should expect to see.
8. Explain how to verify the result.
9. Include common mistakes and a safe way to recover.
10. Introduce no unrelated features or technical layers.
11. Explain that AI-generated output is not automatically correct; the learner must inspect and verify the result.
12. Keep the learner in control: no silent changes, no hidden authorization and no assumption that the learner understands a technical action.

The project may have rigorous engineering governance behind the scenes, but the beginner lesson should expose only the concepts the learner needs at that step.

## 9. Required DeepSeek task in this handoff

Perform the R4 Data Privacy/Security technical review exactly as described in:

`projects/task-management/phase3.3/reviews/BVC-TM-TC-007_R4_DOMAIN_REVIEW_ASSIGNMENT_2026-11-25.md`

Your report should be in Vietnamese and include:
- executive assessment and exact Contract revision;
- sources actually inspected and unavailable sources;
- data-flow and privacy analysis;
- lightweight threat/impact model;
- stable findings IDs (`DS-R4-001`, etc.), severity, evidence, impact, mitigation, blocking status and scope impact;
- migration failure matrix;
- post-migration downgrade/recovery analysis;
- AC/VC review mapping;
- unresolved risks and evidence gaps;
- one of the explicit technical recommendations required in the review assignment.

Use `NOT_VERIFIED` where evidence is missing. Do not label unrun tests PASS. Do not infer current app source behavior from historical screenshots or proposals. Do not generate implementation code or an execution prompt.

## 10. Project continuity and environment cautions

- Repository `main` is canonical; verify current main SHA and open PRs before starting.
- A machine snapshot in `docs/continuity/CURRENT_STATE.yaml` is only an index of Git metadata and is marked as requiring semantic reconciliation. Prefer project-specific current records.
- The project continuity framework remains a pilot; independent cold-start/cross-model recovery test status is not automatically PASS.
- The External System Register records prior local Windows worktrees, including a dirty historical worktree. Do not tell the Owner to reset, clean, pop stashes or overwrite any local workspace without a separately scoped request.
- The current live local worktree status is unknown to this session.
- Do not put secrets, API keys, tokens, passwords, account recovery information, personal customer information or confidential data into GitHub or the report.
- The Risk Policy metadata has an open recorded publication-status inconsistency; do not silently edit the protected policy. Report the ambiguity if it affects the review.

## 11. Expected handoff completion

The handoff is successful when DeepSeek returns one complete, evidence-based R4 technical review report and clearly identifies:
- what it actually inspected;
- what it could not inspect;
- what can be concluded from current sources;
- what remains unverified;
- what must be tested before implementation.

The report is then returned to ChatGPT for independent domain evaluation. Only after the review and recovery gates are resolved may the Human Owner consider a separate execution authorization.

**Do not start implementation. Do not allocate Prompt #0006. The purpose of this bootstrap is understanding and review, not execution.**
