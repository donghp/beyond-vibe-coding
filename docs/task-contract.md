# Task Contract — Phase 2 Core Specification

**Milestone:** Phase 2 — Core Specifications  
**Specification:** `BVC-TASK-CONTRACT`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  

## What is a Task Contract?

In _BEYOND VIBE CODING_, Chapter 5 calls the underlying concept the **Execution Contract**: a technical agreement between a task and its executor that defines what the executor is allowed to do, what it must produce, and where it must stop. In this repository, the **Task Contract** is the structured, machine-readable artifact that formalizes that concept. It is not a second or competing contract.

## Start with these files

- [Task Contract Specification](../specifications/v0.1/task-contract.md) — normative intent, lifecycle, field semantics, guardrails, limitations, and change policy.
- [JSON Schema](../specifications/v0.1/task-contract.schema.json) — Draft 2020-12 structural validation.
- [Examples](../specifications/v0.1/examples/) — read-only inspection, scoped component change, and a synthetic high-risk financial change.
- [Task Contract template](../templates/task-contract.yaml) — starting point for a project-specific contract.
- [Validator](../scripts/validate_task_contracts.py) — structural and semantic validation, plus post-run changed-file inventory checks.
- [Tests](../tests/test_task_contracts.py) — automated checks for schema, scope, approvals, and change budgets.

## The boundary it establishes

A contract records the task objective, project baseline, risk policy reference, authorized scope, separate CREATE/MODIFY/DELETE permissions, forbidden resources, required context, dependencies, expected outputs, acceptance criteria, verification evidence, change budget, authority, stopping conditions, reporting, and continuity requirements.

The v0.1 design applies several EFIN lessons without copying EFIN-specific paths or governance files into every project:

- Exact file paths for ordinary write tasks; no broad write wildcards.
- CREATE, MODIFY, and DELETE are distinct permissions.
- An out-of-scope finding is not permission to execute it.
- Scope expansion fails closed and requires an approved contract revision.
- File-count, diff-line, and binary-file budgets are checked against observed changes.
- Sensitive change categories are classified by the adopting project's trusted policy, not guessed from filenames.
- A task cannot self-authorize, rewrite its own governance state, or self-certify completion.
- Run result, task completion, and handoff acceptance remain distinct.

## Validate locally

From the repository root:

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_task_contracts.py
python -m unittest discover -s tests -v
```

This validator does not sandbox an AI executor or prevent writes. Runtime enforcement must restrict permissions during execution and compare the actual VCS diff with the approved contract after execution.

## Status and limitations

`0.1.0` is Draft / Experimental, not a stable industry standard. R0–R5 meanings are delegated to each project's referenced risk policy. The repository does not yet implement a complete PAECS runtime, identity/signing service, policy engine, filesystem sandbox, or provider adapter.

See [Framework Overview](./framework-overview.md) and [Conceptual Architecture](./architecture.md) for the broader BVC model.
