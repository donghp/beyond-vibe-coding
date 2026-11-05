# BVC Task Management — Project Risk Policy v0.1

**Policy ID:** BVC-TM-RISK-001  
**Version:** 0.1.0  
**Status:** APPROVED — Product Owner approval recorded 2026-11-05; publication to `main` pending  
**Owner:** Product Owner / Human Owner  
**Scope:** BVC Task Management project engineering tasks and AI-assisted repository changes  
**Source specification:** BVC Task Contract Specification v0.1.0 — Draft / Experimental  
**Prepared:** 2026-11-05  
**Approval date:** 2026-11-05  
**Approved by:** Product Owner / Human Owner  
**Effective date:** Upon controlled merge to `main`

---

## 1. Purpose

This policy defines how BVC Task Management classifies engineering-task risk from **R0 through R5** and how that classification determines the minimum execution controls, human approvals, recovery planning, and verification evidence.

It provides the project-specific mapping required by the `risk.policy_ref` field in a BVC Task Contract.

The policy is based on the risk principles and illustrative R0–R5 crosswalk in the BVC Task Contract Specification v0.1.0. The specification explicitly states that the labels are not a universal standard and that each adopting project must provide its own approved mapping. The Product Owner approved this project-specific mapping on 2026-11-05. The policy becomes the published, authoritative project risk mapping when this approved revision is merged into the repository's `main` branch.

> **Risk determines control depth. The task's scope determines what the executor is allowed to change.**

## 2. Scope and exclusions

This policy applies to engineering work performed for the BVC Task Management project, including:

- AI-assisted changes to repository files;
- product, UX, architecture, data, security, and implementation documentation;
- application code, tests, build and deployment configuration;
- database schema, migrations, identity, access control, and data handling;
- repository, CI, release, and operational actions.

This policy does **not** classify ordinary Business Tasks that a person creates and manages inside the Task Management application. It classifies the engineering work used to build, change, verify, and operate the product.

This policy does not replace:

- the BVC Task Contract Specification or its JSON Schema;
- Product Definition v0.2.0;
- the accepted Phase 3.2 Architecture Design Baseline;
- the canonical Product/UX Decision Register;
- repository access controls, security policy, or provider-specific release controls.

Where another approved policy imposes stricter controls, the stricter control applies.

## 3. Risk classification principles

### 3.1 Assess the task before execution

Classify the task using its reasonably foreseeable impact **before** the proposed controls are applied. Consider all of the following:

1. **Impact:** What could happen if the task is wrong or incomplete?
2. **Blast radius:** How many files, components, users, systems, or environments could be affected?
3. **Data sensitivity:** Does the task affect personal, confidential, financial, identity, or security-sensitive data?
4. **Reversibility:** Can the change be safely undone, and has recovery been demonstrated?
5. **Uncertainty and dependencies:** Does the task depend on unknown architecture, external services, unverified assumptions, or several interacting components?
6. **Customer and production consequence:** Could the task interrupt a real service, expose data, change live behavior, or affect a real user?

### 3.2 Use the highest applicable level

- Assign the **highest risk level triggered by any material factor**. Do not average high-risk and low-risk characteristics.
- A single sensitive operation can make a task R4 or R5 even when only one file or one line changes.
- If a task combines work at different risk levels, classify the whole contract at the highest applicable level or split it into separately controlled tasks.
- If classification is uncertain, pause and ask the Product Owner / Human Owner. Do not silently select a lower level.

### 3.3 Risk cannot be reduced by superficial measures

Risk MUST NOT be downgraded merely because:

- the change contains few files or few lines;
- the executor is a capable or highly rated AI model;
- a build or test passes;
- the task has a small time estimate;
- the change budget is low;
- the task is described as a prototype or experiment.

A Change Budget limits the authorized size of a change; it does not determine its risk level.

### 3.4 Risk level and evidence level are different

R0–R5 describe the **risk and required control posture**.

Evidence Levels 0–4 in the BVC Task Contract Specification describe the **strength of verification evidence**:

| Evidence level | Meaning | Examples |
|---:|---|---|
| 0 | Claim only — not sufficient to pass a verification gate | “It should work”; executor says “done” |
| 1 | Static evidence | Source/document inspection, schema validation, lint, type check |
| 2 | Automated execution evidence | Unit tests, integration tests, build results |
| 3 | System evidence | API behavior, database integrity, security checks, deployment checks |
| 4 | Real-world evidence | Real user workflows, production observation, operational metrics |

Do not confuse R1 risk with Evidence Level 1, or R4 risk with Evidence Level 4. The labels belong to different scales.

## 4. BVC Task Management risk levels

### R0 — READ-ONLY / INSPECTION

**Meaning:** The task only reads, inspects, compares, or analyzes authorized information. It does not create, modify, or delete repository or system resources.

**Typical BVC examples:**
- Read Product Definition, UX, Architecture, or Decision Register.
- Inventory repository files and links.
- Compare two commits or review a pull request without changing it.
- Analyze a screenshot, error log, or test report and provide findings.

**Minimum controls:**
- Use an authorized, identified source commit or artifact.
- Declare the read-only scope.
- Do not create, modify, or delete project files or system resources.
- Record sources, findings, limitations, and next action.
- If a write is needed, stop and request a new or revised WRITE Task Contract.

**Minimum verification:** Evidence Level 1 (source references and reproducible inspection notes).

**Approval:** The Task Contract or task authorization must permit the relevant read access. R0 grants no write authority.

### R1 — DOCUMENTATION / LOW-IMPACT CHANGE

**Meaning:** A bounded, reversible change to documentation or non-executable project metadata that does not alter application behavior, security, data structures, dependencies, financial logic, or an approved architecture baseline.

**Typical BVC examples:**
- Create a Beginner readiness plan or Context Pack.
- Update a scoped README, lesson, glossary, or explanatory diagram.
- Correct non-executable documentation metadata or links.
- Add a draft report or learning checklist under an explicitly authorized path.

**Minimum controls:**
- An APPROVED Task Contract before repository writes.
- Exact repository-relative paths; CREATE, MODIFY, and DELETE permissions separated.
- A documented Change Budget; deletion is zero by default unless explicitly justified and authorized.
- No broad write wildcards.
- No change to application source, dependencies, lockfiles, database schema, authentication, financial formulas, security controls, architecture baselines, CI, deployment, or release.
- Review the complete diff and verify links, Markdown, YAML, or other applicable document structure.
- Keep changes on a task-specific branch; merge into `main` only after Human Owner review and explicit authorization.

**Minimum verification:** Evidence Level 1. Use an automated schema/format validator as additional evidence when one exists and applies.

**Approval:** Product Owner / Human Owner approval of the Task Contract is required. The Owner reviews and accepts the resulting artifact before it becomes an authoritative project record.

### R2 — BOUNDED COMPONENT / SINGLE-MODULE CHANGE

**Meaning:** A limited implementation change within one component or module, with a clear boundary and no material change to cross-module business rules, security, identity, database schema, financial logic, or production infrastructure.

**Typical BVC examples:**
- Implement or refine one isolated task-form component.
- Add a bounded UI state or a small component-level validation rule.
- Correct a contained presentation defect without changing shared data contracts.
- Add a focused unit test for one existing module.

**Minimum controls:**
- An APPROVED Task Contract with exact paths, operation types, and Change Budget.
- Confirm the relevant Product/UX requirement and architecture compatibility.
- Identify component inputs, outputs, and dependencies.
- Keep dependency, lockfile, schema, authentication, financial, and architecture changes disabled unless separately reclassified and approved.
- Run targeted automated tests and the relevant build/type/lint checks.
- Review the complete diff before merge; preserve a recovery commit/checkpoint.

**Minimum verification:** Evidence Level 2 (automated execution evidence), plus static/manual review where applicable.

**Approval:** Product Owner or delegated technical owner approves the Task Contract. Human review of the result is required before merge.

### R3 — CROSS-COMPONENT / BUSINESS-LOGIC CHANGE

**Meaning:** The task changes multiple components, shared state, data flow, workflows, or important business logic, but does not cross into a specifically R4 sensitive domain or R5 destructive/production-critical action.

**Typical BVC examples:**
- Implement My Day grouping and date-placement logic across multiple views.
- Change task/project relationships or shared state behavior without changing the database schema.
- Implement a multi-step workflow spanning navigation, persistence adapter, and UI.
- Change a shared data transformation or validation rule used by several components.

**Minimum controls:**
- An APPROVED Task Contract and explicit Product Owner / Human Owner authorization before execution.
- Impact analysis covering affected components, consumers, dependencies, and acceptance criteria.
- Confirm alignment with Product Definition, UX decisions, and accepted Architecture.
- Exact path scope and Change Budget; no silent architecture-baseline change.
- A verified recovery point and a documented repair/rollback approach.
- Unit and integration tests, regression checks, and manual workflow review.
- Record unresolved decisions and stop when a required DR is still OPEN.

**Minimum verification:** Evidence Level 2. Evidence Level 3 is required when the change crosses a real system boundary, affects persisted data behavior, or needs API/system-integrity evidence.

**Approval:** Product Owner / Human Owner approval before execution. A relevant technical/domain reviewer should review cross-component impact and test evidence before merge.

### R4 — SENSITIVE / CRITICAL ENGINEERING

**Meaning:** The task affects security, identity, access control, personal or confidential data, database schema/migrations, authentication, authorization, secrets, financial calculations, or another explicitly protected technical domain.

**Typical BVC examples:**
- Implement Supabase Auth or account recovery.
- Create or change exposed PostgreSQL tables, constraints, or migrations.
- Write or change Row Level Security (RLS) policies.
- Change data ownership, permissions, or access boundaries.
- Handle privileged secrets or server-side credentials.
- Change a financial formula or security-sensitive data transformation.

**Minimum controls:**
- An APPROVED Task Contract with explicit Human Owner authorization and exact protected-resource paths.
- Approval from the Product Owner / Human Owner and the relevant domain authority (Security, Database, Identity, or Finance) before execution.
- Threat/impact analysis, data-flow and permission review, least-privilege assessment, and explicit acceptance criteria.
- For database changes: migration plan, compatibility review, backup/recovery plan, and tested migration/recovery procedure appropriate to the environment.
- For Auth/RLS: positive and negative access tests, including attempts to access another user's data.
- For secrets: verify that privileged values remain server-side and are absent from public bundles, logs, and repository history.
- Independent review by a qualified reviewer where available; a self-review is not independent approval.
- No direct unreviewed merge to `main` and no deployment implied by contract approval.

**Minimum verification:** Evidence Level 3 (system/security/database evidence). Use Evidence Level 4 when actual user or operational behavior is part of the acceptance claim.

**Approval:** Explicit Product Owner / Human Owner approval plus the relevant domain approval. A passing build alone is insufficient.

### R5 — DESTRUCTIVE / PRODUCTION-CRITICAL ACTION

**Meaning:** The task can cause irreversible or difficult-to-reverse change, data loss, significant production impact, or a material interruption/exposure affecting real users or live services.

**Typical BVC examples:**
- Destructive migration or bulk deletion of real user data.
- Reset, replacement, or irreversible modification of a live database.
- Production action that could remove access, expose data, or interrupt the live application.
- Force rewrite of protected source history or deletion of a critical production resource.
- Release or operational action with a material and difficult-to-reverse consequence.

**Minimum controls:**
- A specific, action-level authorization from the Human Owner immediately before the consequential action. General Task Contract approval is not a substitute.
- An APPROVED Task Contract identifying the exact target, operation, scope, risk, timing, and responsible actor.
- A verified backup or recovery point; for critical data, a restore/recovery test appropriate to the target environment.
- A written execution sequence, precondition checks, stop conditions, rollback/recovery plan, and post-action verification.
- Staged execution or a limited/canary approach where technically possible.
- A maintenance window, communication, monitoring, and escalation path when real users or availability may be affected.
- A qualified second-person review for the action where available and appropriate. If critical independent review or recovery capability is unavailable, defer the action.
- Preserve logs, commit IDs, migration IDs, timestamps, approvals, and evidence.
- Never infer approval from a successful dry run, an AI recommendation, or a previous approval for a different action.

**Minimum verification:** Evidence Level 3 before/after system checks. Evidence Level 4 is required when the task claims a real production or user outcome. The recovery path must be evidenced, not merely described.

**Approval:** Specific Human Owner authorization is required for each consequential production/destructive action, in addition to the approved contract and relevant domain approvals.

## 5. Classification and escalation rules

Apply these rules in order:

1. Identify every material operation in the task, including indirect effects and generated changes.
2. Identify whether any R4 or R5 category is present. If yes, classify at that level or higher, even if the rest of the task is R1–R3.
3. If no R4/R5 category applies, assess whether the change crosses modules or changes shared business logic (R3), is contained within one component (R2), is documentation-only (R1), or is read-only (R0).
4. When the work combines levels, either classify the entire task at the highest applicable level or split it into separate contracts with independent scopes and approvals.
5. Reassess risk if discovery reveals a new affected system, data class, dependency, or operation. Stop before performing the newly identified work.
6. Risk escalation requires a revised/new Task Contract and the approvals for the higher level. The executor must not upgrade its own authority and continue under the original contract.

## 6. Applying the policy to BVC Task Contract #001

**Task:** `BVC-TM-P3.3-001 — Beginner Implementation Readiness`

**Proposed risk:** **R1 — Documentation / Low-Impact Change**

**Rationale:**
- The task creates two explicitly named documentation/configuration artifacts only.
- It does not modify existing source code, product baseline, UX baseline, architecture baseline, database schema, authentication, security controls, dependency manifests, lockfiles, CI, or deployment.
- The change is performed on a task-specific branch and can be reviewed and reverted through Git.
- The expected verification consists of document review, YAML parsing, source-path resolution, and VCS diff-scope validation.

**Authorized output paths in Task Contract #001:**
- `projects/task-management/phase3.3/BEGINNER_IMPLEMENTATION_READINESS_V0.1.md`
- `projects/task-management/phase3.3/BEGINNER_CONTEXT_PACK_V0.1.yaml`

This classification applies only while the task remains inside those exact paths and constraints. If the task needs to modify an existing governance, product, UX, architecture, application, schema, dependency, authentication, security, CI, or deployment resource, execution must stop and the task must be reclassified or split.

The approval of Task Contract #001 does not approve any future GAIS application implementation task.

## 7. Mandatory Task Contract controls for every risk level

The following BVC Task Contract controls apply regardless of risk level:

- Use a distinct Task ID, Contract ID, and Execution Run ID.
- Identify the repository, source commit, working-tree status, architecture references, and verified recovery point for write tasks.
- Separate CREATE, MODIFY, and DELETE permissions using exact repository-relative paths.
- Keep `scope_expansion_allowed: false`; stop and request approval for scope expansion.
- Declare constraints, required context, dependencies, expected outputs, acceptance criteria, and verification checks.
- Apply a task-specific Change Budget. The budget does not replace impact analysis.
- Declare the executor's permitted actions and required Human Owner approval.
- Stop on missing/conflicting context, unverified baseline/recovery, scope expansion, protected-resource detection, budget overrun, unexpected changes, risk escalation, or security/data exposure.
- Record actual changed files, scope integrity, Change Budget result, verification, evidence, limitations, unresolved findings, and next action.
- Maintain a checkpoint and handoff information for write tasks.

A Task Contract with status `DRAFT` or `PROPOSED` is not authorized to execute. An `APPROVED` contract is eligible only after all required dependencies, permissions, and action-specific approval gates are also satisfied.

## 8. Decision authority and exceptions

- **Product Owner / Human Owner:** approves this policy, approves risk classifications where required, authorizes tasks and consequential actions, and accepts project deliverables.
- **Technical / Domain Reviewer:** assesses technical, security, database, identity, or financial impact within the area of competence.
- **AI executor:** may recommend a classification and report risk factors; it cannot approve the policy, lower a risk level, approve its own contract, expand scope, or authorize a consequential action.

No exception may silently lower the assigned risk level. An exception must identify the affected control, rationale, residual risk, compensating measures, approver, and expiry/review point. R4/R5 controls may not be waived by an AI executor.

## 9. Policy lifecycle and review

- The Product Owner approved this policy on **2026-11-05**. Approval is recorded in the document metadata and this commit history.
- The policy becomes the published project authority when the approved revision is merged into `main`; until then, the approved branch copy is pending publication.
- After merge, the effective Git commit on `main` is the canonical policy reference for subsequent Task Contracts.
- Review the policy when the Task Contract Specification changes, the project adds new sensitive domains, or an incident/near miss reveals a control gap.
- Any change to risk-level meanings or mandatory controls requires a versioned policy update and Product Owner approval.
- Do not retrospectively change the classification of an already executed task to make its control record appear compliant.

---

**BVC Task Management — Risk Policy v0.1.0**  
*Risk determines control depth. Scope determines what may change. Evidence determines what may be accepted.*
