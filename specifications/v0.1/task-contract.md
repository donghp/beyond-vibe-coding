# BVC Task Contract Specification

**Specification ID:** `BVC-TASK-CONTRACT`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  
**Schema:** [task-contract.schema.json](./task-contract.schema.json)  
**Schema dialect:** JSON Schema Draft 2020-12  
**Book alignment:** _BEYOND VIBE CODING_, Chapter 5 — “AI Can Do It. But Is It Allowed to?”  
**Implementation lessons:** Enerix Fin (EFIN), especially File Scope Contract, Change Budget, Governance Guard, Scope Integrity, and Continuity controls.

## 1. Purpose

A **Task Contract** is a technical agreement between a task and its executor. It defines:

- what result is required;
- which project resources may be changed;
- which actions are permitted and forbidden;
- what context is required;
- what outputs must be produced;
- how success will be evaluated;
- what evidence is required;
- which authority and approval boundaries apply; and
- when execution must stop.

The contract is not a legal agreement and is not merely a prompt. It is a project-controlled boundary for engineering execution.

The book calls this concept the **Execution Contract**. In this repository, **Task Contract** is the machine-readable artifact that formalizes that Execution Contract. The two terms describe the same boundary at different levels: the Execution Contract is the engineering concept; the Task Contract is its structured record.

> **The contract defines what the executor may do, must produce, and where it must stop.**

## 2. Design principles

### 2.1 Task first, executor second

The task must be sufficiently defined before an executor is selected and authorized. A model's capability does not define task scope and does not grant permission.

### 2.2 Discovery is not execution

An executor MAY inspect and report a finding outside the authorized scope when discovery is allowed. It MUST NOT implement that finding unless a new or revised contract explicitly authorizes the additional work.

An out-of-scope finding should become a report item or a follow-up task. It is not an implied permission to edit the affected resource.

### 2.3 Exact paths and separate operations

For write tasks, `create`, `modify`, and `delete` are separate permissions. Permission to modify a path does not imply permission to delete it. Permission to create a test file does not imply permission to change dependency manifests, lockfiles, database schemas, authentication code, or other protected resources.

In v0.1, allowed paths are exact repository-relative file paths. Broad wildcards such as `src/**`, `server/**`, or `06_TASKS/**` MUST NOT be used in the allowed path lists. A project may define a separate, reviewed policy for read-only inventory operations or generated-file workflows; that does not silently widen an ordinary write task.

### 2.4 Scope expansion fails closed

`scope_expansion_allowed` is fixed to `false` in this draft. If execution requires an additional file, action, dependency, permission, or risk category, the executor MUST stop before making that out-of-scope change and report `BLOCKED_SCOPE_EXPANSION`.

A Human Owner or other authorized role may approve a new contract revision with the additional scope, rationale, impact analysis, and required controls. The original approved contract and its execution record MUST remain traceable; approval MUST NOT be retroactively inferred from the fact that a change was made.

### 2.5 Risk determines control and verification depth

Task controls should be proportionate to impact, uncertainty, blast radius, data sensitivity, reversibility, and customer or production consequences. A low-risk documentation change does not need the same verification depth as a change to authentication, a financial calculation, a database migration, or a production system.

### 2.6 A claim is not evidence

An executor's “done” message is a claim. It is not, by itself, verification evidence. The contract specifies the checks and evidence needed to evaluate the acceptance criteria.

### 2.7 The project remains authoritative

The Task Contract references project policy and baseline records. It does not replace System Instructions, architecture authority, a Task Registry, a Prompt Registry, an Execution Ledger, a Continuity package, or a project's source-of-truth rules.

## 3. Contract lifecycle and authority

The schema carries a contract `status`:

| Status | Meaning | Execution consequence |
|---|---|---|
| `DRAFT` | Being prepared | Not authorized to execute |
| `PROPOSED` | Submitted for review | Not authorized to execute |
| `APPROVED` | Approved under the referenced project policy | Eligible to execute only when all other gates pass |
| `REJECTED` | Not approved | Must not execute |
| `SUPERSEDED` | Replaced by a later revision | Must not be used for new execution |

Contract approval is distinct from human approval required for a particular consequential action. The Task Contract can be approved while a later action still requires a separate approval gate.

A Task Contract is also distinct from:

- **Task lifecycle status:** whether the task is planned, active, blocked, completed, accepted, or otherwise. The canonical Task Registry or project workflow owns that state.
- **Execution Run status:** whether a specific run passed, failed, or stopped. An Execution Ledger or run record owns that result.
- **Handoff acceptance:** whether a receiving worker or process has accepted a handoff. The handoff record owns that decision.

`RUN PASS`, `TASK DONE`, and `HANDOFF ACCEPTED` MUST NOT be treated as interchangeable states.

## 4. Contract structure

The complete schema is authoritative for the machine-readable field names and types. The following sections explain their intent.

### 4.1 Contract identity

- `contract_version` identifies this schema version and MUST be `0.1.0` for this draft.
- `contract_id` identifies the contract independently of the task and execution run.
- `revision` identifies an approved or proposed revision of the same contract identity.
- `status` records the contract lifecycle state.
- `created_at` and `expires_at` provide optional time bounds.

Task ID, Prompt ID, Contract ID, and Run ID are separate identities. A Task Contract MUST NOT be used as a substitute for a Prompt Registry or Execution Ledger record.

### 4.2 Task and project baseline

`task` declares the task ID, title, and objective. `project` identifies the repository and baseline against which the task is authorized.

For a write task, the baseline MUST include:

- the source commit being used;
- the working-tree condition;
- applicable architecture baseline references; and
- a verified recovery point, such as a known commit, checkpoint, snapshot, or backup.

If the working tree is already dirty, the pre-existing changes MUST be identified before execution. The executor MUST NOT silently attribute pre-existing changes to the task.

The contract should reference canonical architecture and governance artifacts. A frozen baseline is read-only to ordinary implementation tasks. A mismatch between implementation and an approved architecture baseline is a deviation to report, not permission for the executor to rewrite the baseline.

### 4.3 Intent

`intent` records the objective, rationale, expected outcome, and optional business or user value. The objective must be specific enough to guide scope and acceptance criteria.

A broad product goal may need to be decomposed into multiple Task Contracts. “Build the entire application” is generally not a sufficiently bounded task objective for one execution contract.

### 4.4 Risk

`risk` records:

- a project-defined risk level (`R0` through `R5`);
- a reference to the project's authoritative risk policy;
- the rationale for the classification;
- material impact factors; and
- reversibility.

**Important:** EFIN uses R0–R5 labels, but the supplied EFIN material explicitly treats the detailed level-to-control mapping as a proposal that must be checked against the authoritative Runtime Kernel. Therefore, BVC v0.1 does not claim a universal meaning for R0–R5. Every project MUST supply `risk.policy_ref` and use its own approved mapping. The table below is an illustrative crosswalk only, not a normative BVC risk standard.

| Illustrative label | Example work | Illustrative control posture |
|---|---|---|
| R0 | Read-only inspection or diagnosis | No project writes |
| R1 | Low-impact documentation or metadata change | Exact scope and basic review |
| R2 | Bounded change within one module | Exact file scope and targeted tests |
| R3 | Cross-module or important business-logic change | Impact analysis and stronger verification |
| R4 | Security, identity, database, or financial-core change | Explicit human approval and domain-specific evidence |
| R5 | Destructive, production, or difficult-to-reverse action | Specific Human Owner authorization and recovery/rollback plan |

The actual project policy takes precedence. Risk MUST NOT be lowered merely to fit a preferred execution path or file-count budget.

### 4.5 Scope

`scope.mode` is either:

- `READ_ONLY`: the task may inspect and report but may not create, modify, or delete project files; or
- `WRITE`: the task may perform only the exact operations and paths listed in `allowed_changes`.

The `allowed_changes` object has three separate lists:

- `create`: exact paths that may be created;
- `modify`: exact paths that may be modified;
- `delete`: exact paths that may be deleted.

`forbidden_paths` lists explicitly prohibited files. `forbidden_path_prefixes` can protect whole directory trees. `protected_resource_refs` may point to the project's existing protected-resource or governance registry; the contract does not assume that a particular registry file exists.

The `scope_expansion_allowed` and `scope_expansion_policy` fields make the fail-closed rule explicit. Discovery may identify an out-of-scope concern, but execution must stop before changing it.

### 4.6 Constraints and required context

`constraints` records task-specific rules, including what must not change. `required_context` lists the sources that must be read or considered, their purpose, authority classification, and optional version/freshness information.

Authority labels are:

- `CANONICAL`: the project's recognized source of truth for the relevant subject;
- `APPROVED`: a reviewed or approved input that is not necessarily the canonical source;
- `REFERENCE`: useful reference material that does not override canonical project policy;
- `UNTRUSTED`: input that must not be treated as authoritative without validation.

A required source that is missing, stale beyond its requirement, or in unresolved conflict is a stop condition when it affects safe execution.

### 4.7 Dependencies and expected outputs

`dependencies` identifies upstream tasks or conditions. `expected_outputs` describes the artifacts the executor must produce. If an output path is specified, it is still subject to the authorized file scope and operation budget.

### 4.8 Acceptance criteria

Each acceptance criterion has a stable ID, a testable statement, a verification method, and a minimum evidence level. Criteria should describe observable outcomes rather than vague qualities such as “make it better.”

A task is not accepted merely because all expected files exist. The required acceptance criteria must be evaluated against evidence.

### 4.9 Verification and evidence levels

The book distinguishes these evidence levels:

| Level | Evidence type | Examples |
|---:|---|---|
| 0 | Claim | “I believe it works.” |
| 1 | Static evidence | Code inspection, linting, type checking |
| 2 | Automated execution evidence | Unit tests, integration tests, build results |
| 3 | System evidence | API behavior, database integrity, deployment checks, security checks |
| 4 | Real-world evidence | Production observation, real user workflows, operational metrics, business outcomes |

The schema only permits evidence levels 1–4 for required verification. Level 0 is a claim, not evidence sufficient to pass a verification gate. Not every task needs Level 4 evidence; minimum evidence depth should be shaped by risk and acceptance criteria.

The contract lists required checks, their kind, evidence level, and the acceptance criteria they support. It also allows known verification limits to be declared honestly. An executor MUST report when it cannot access the system, data, environment, or authority needed to verify an item.

### 4.10 Change Budget

`change_budget` places an upper bound on the size and categories of change:

- `max_changed_files` — total file count across all operations;
- `max_created_files`, `max_modified_files`, `max_deleted_files` — category-specific file limits;
- `max_total_diff_lines` — the maximum number of changed text lines, calculated as additions plus deletions from the version-control diff (diff headers are excluded);
- `max_binary_files` — a limit for binary changes; and
- explicit booleans for dependency, lockfile, database schema, financial formula, authentication, and architecture changes.

The post-run validator expects a VCS-derived change inventory with `path`, `operation`, `diff_lines`, and `is_binary`. It may also receive `categories` from a trusted repository-specific classifier (`dependency`, `lockfile`, `database_schema`, `financial_formula`, `authentication`, or `architecture`). When a category is present, the validator checks the corresponding budget flag and required authority action. BVC does not guess sensitive categories from filenames because naming conventions differ across projects. The adopting project must provide and validate the classifier or protected-resource mapping.

A file-count or diff-line budget is a guardrail, not a substitute for impact analysis. One line in an authentication middleware or financial formula can be more consequential than hundreds of documentation lines.

A change category marked `false` is prohibited even if a path might otherwise appear to be in scope. If a task needs one of these changes, the contract must explicitly authorize the category, list the exact paths, define appropriate verification, and obtain approvals required by project policy.

### 4.11 Authority and executor

`authority` references the project's policy, requester, authorizer, and authorization evidence. It declares the executor class and identity, capability requirements, permitted actions, and human approval status.

The executor MUST NOT grant itself additional authority. A prompt, model response, tool capability, or successful test cannot amend the contract.

If human approval is required, a `PENDING` or `REJECTED` approval status blocks the relevant execution/action. `APPROVED` approval must have a traceable reference. For high-impact tasks, the contract must identify an approver role and the approval evidence required by project policy.

### 4.12 Stopping conditions and retry policy

The contract declares conditions that require execution to stop, including scope expansion, protected-resource detection, budget overrun, missing baseline/recovery, missing or conflicting required context, revoked authority, failed or insufficient verification, unexpected file changes, risk escalation, and security/data exposure.

When a stop condition occurs, the executor must preserve evidence, avoid further out-of-scope changes, report the condition, and state the next safe action.

The draft schema allows at most one bounded repair attempt within the same Run. This is an EFIN-informed default pattern, not a universal requirement for every organization. Additional attempts require approval under project policy.

### 4.13 Reporting and continuity

The final report must include the actual file inventory, create/modify/delete breakdown, scope-integrity result, change-budget result, verification results, evidence references, unresolved findings, limitations, and next action. Out-of-scope findings must be recorded even when no change was made.

For write tasks, a checkpoint is required. If execution is interrupted or handed to another executor, the handoff must identify current state, material changes, evidence, blockers, recovery point, and next action. The Task Contract does not itself replace a Run Record, Scope Integrity Record, or Handoff Record.

## 5. Pre-execution and post-execution controls

### 5.1 Preflight MUST verify

1. Contract status is `APPROVED` and not superseded or expired.
2. Task, contract, and run identities are distinct and valid.
3. Project repository and source commit match the intended baseline.
4. Working-tree state and pre-existing changes are known.
5. Architecture baseline and required governance references are available.
6. Required context is present, authoritative enough, and not in unresolved material conflict.
7. Risk is classified under the referenced project policy.
8. Recovery point is verified for a write task.
9. Executor is eligible and permitted actions match the contract.
10. Required human approval is present before the gated action.
11. Exact file paths and change budgets are unambiguous.

If a mandatory condition cannot be verified, the outcome is `BLOCKED` or `NOT_AUTHORIZED`, not an assumption.

### 5.2 Post-execution MUST verify

1. Enumerate actual created, modified, and deleted paths.
2. Compare every actual path and operation with `allowed_changes`.
3. Check `forbidden_paths`, forbidden prefixes, and protected-resource references.
4. Compare actual counts and diff size with the Change Budget.
5. Confirm that dependency, lockfile, database, financial, authentication, and architecture flags were respected.
6. Run the required tests and checks.
7. Collect evidence with enough context to inspect it.
8. Record limitations and out-of-scope findings.
9. Prepare Scope Integrity and Continuity information before handoff.

A build passing or tests passing MUST NOT override a scope violation. A post-execution check is an additional guard; it does not replace least-privilege controls during execution.

## 6. EFIN-informed governance rules

The EFIN material contributes practical controls that are generalized here:

- A frozen architecture baseline remains immutable to ordinary workers. A deviation is recorded; the baseline is not silently edited to match implementation.
- File operations are separated into CREATE, MODIFY, and DELETE.
- Each task has its own exact file scope; a shared broad allowlist is not sufficient.
- Broad write wildcards are avoided for ordinary implementation tasks.
- Change Budget is separate from path scope.
- Governance files such as task registries, prompt registries, sequence counters, execution ledgers, lock state, and continuity state require their own controlled update process.
- A task MUST NOT modify governance records to grant itself permission, change its own status, or self-certify completion.
- `RUN PASS`, `TASK DONE`, and `HANDOFF ACCEPTED` remain separate decisions.
- Handoff requires state synchronization and a Scope Integrity Record.

The supplied EFIN material proposed a `PROTECTED_FILE_REGISTRY.yaml` as a possible addition and explicitly said to verify the actual repository before creating it. BVC therefore supports references to a project's protected-resource registry, but does not claim that this EFIN file already exists.

EFIN-specific paths such as `06_TASKS/TASK_REGISTRY.yaml` and `11_RECOVERY/WORKER_LOCK_STATE.json` MUST NOT be copied into another project as universal defaults. Each project must bind the contract to its own canonical paths and policies.

## 7. Prompt and instruction layering

The Task Contract does not replace higher-level instructions or the execution prompt:

1. **System Instructions / project governance:** stable roles, security rules, authority model, continuity rules, and stop conditions.
2. **Task Contract:** task-specific objective, scope, permitted actions, constraints, context, outputs, verification, and reporting.
3. **Execution Prompt:** the operational instruction for the current run; it references the contract and MUST NOT widen it.

The same Task Contract should remain meaningful when the executor or provider changes. Provider-specific prompts are adapters, not the source of task authority.

## 8. Examples and validation

See the examples directory:

- [Read-only inspection](./examples/read-only-inspection.yaml)
- [Scoped component change](./examples/scoped-component-change.yaml)
- [High-risk financial change](./examples/high-risk-financial-change.yaml)

Validate the schema and examples from the repository root:

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_task_contracts.py
python -m unittest discover -s tests -v
```

To validate one approved contract against a VCS-derived diff inventory, pass one YAML contract and a JSON array of changed-file records:

```bash
python scripts/validate_task_contracts.py \
  specifications/v0.1/examples/scoped-component-change.yaml \
  --changed-files-json path/to/changed-files.json
```

Each JSON record contains `path`, `operation` (`CREATE`, `MODIFY`, or `DELETE`), `diff_lines` (additions plus deletions), and `is_binary`. An optional `categories` array enables project-specific protected-category checks. The inventory must be produced from the actual version-control diff, not supplied by the AI executor as an unverified claim.

JSON Schema validation checks shape and types. The companion validator adds cross-field checks. Neither performs a live filesystem sandbox or proves that an executor obeyed the contract; runtime enforcement must inspect actual actions and changed files.

## 9. Known limitations of v0.1.0

- Risk labels `R0`–`R5` are project-policy labels; their meaning is not standardized by this draft.
- JSON Schema cannot by itself compare a contract with a live Git diff or enforce operating-system permissions.
- The companion validator checks a supplied VCS diff inventory; it does not itself collect the diff, sandbox writes, or enforce OS permissions. Sensitive `categories` must come from a trusted project-specific classifier or protected-resource mapping.
- Approval references are identifiers supplied by the adopting project; BVC does not implement a signing or identity service.
- Exact-path write scopes favor safety and auditability but can create contract-maintenance overhead for generated files or bulk transformations.
- File count and diff-line budgets are coarse controls and must be supplemented by domain-specific risk review.
- The specification does not define a complete Task Registry state machine, Execution Ledger, Prompt Registry, Workspace Lock service, or PAECS runtime.

## 10. Change policy

This specification is Draft / Experimental. Changes to fields, semantics, enums, or cross-field rules must be reflected in the schema, documentation, examples, validator, and tests together. Breaking changes should be introduced through a new versioned specification path rather than silently redefining a released contract.
