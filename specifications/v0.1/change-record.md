# BVC Change Record Specification

**Specification ID:** `BVC-CHANGE-RECORD`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  
**Schema:** [change-record.schema.json](./change-record.schema.json)  
**Schema dialect:** JSON Schema Draft 2020-12

## 1. Purpose

A **Change Record** describes the repository changes observed for a task execution. It links the observed file inventory to the Task Contract, task, run, executor, and source baseline. It records file operations, diff statistics, sensitive categories supplied by a trusted project classifier, scope-integrity outcome, and change-budget outcome.

A Change Record is not a plan and not a Worker-authored summary. It should be produced or confirmed by a trusted version-control collector from the actual repository diff.

## 2. Design principles

1. **Observed, not merely reported:** use VCS-derived evidence wherever possible.
2. **Contract-linked:** identify the exact Task Contract ID, version, revision, and task.
3. **Operation-specific:** distinguish `CREATE`, `MODIFY`, and `DELETE`.
4. **Baseline-aware:** compare changes with the declared source commit and identify pre-existing changes.
5. **Budget-aware:** record additions, deletions, binary files, and totals.
6. **Classifier provenance:** sensitive categories must come from a documented, trusted project-specific classifier or protected-resource registry; do not guess from filename alone.
7. **Immutable after finalization:** corrections should create a new record revision or superseding record, not silently alter historical evidence.

## 3. Record lifecycle

- `DRAFT`: collection or review is incomplete.
- `FINAL`: the inventory and control results have been reviewed and finalized.
- `REJECTED`: the record is rejected as unreliable or invalid; retain its reason and evidence.

`FINAL` does not mean the task is accepted. It means the change inventory is finalized.

## 4. Change inventory

Each changed path records:

- repository-relative path;
- operation (`CREATE`, `MODIFY`, or `DELETE`);
- additions and deletions (integer counts; binary files report zero text diff lines);
- binary status;
- zero or more trusted category labels; and
- optional before/after digests and diff reference.

The `totals` object must exactly equal the counts calculated from `changes`. `diff_lines` is additions plus deletions. A path must appear only once in the final inventory; represent renames using the adopting project's documented delete/create mapping unless a future specification adds a dedicated rename operation.

## 5. Scope and budget results

`scope_integrity` and `change_budget_result` are separate outcomes:

- `PASS`: the supplied inventory is within the contract's declared paths and limits;
- `FAIL`: a violation was found;
- `NOT_EVALUATED`: the check was not performed or there is insufficient trusted data.

A final record that claims `PASS` must be backed by a successful comparison against the referenced contract. If the collector is `UNVERIFIED`, the record must not be treated as authoritative evidence for acceptance.

Sensitive category labels include dependency, lockfile, database schema, financial formula, authentication, architecture, security, personal data, and production. The adopting project is responsible for maintaining and testing the classifier that assigns these labels.

## 6. Relationship to other Core Specifications

- Task Contract is the authorization baseline and defines exact scope and budgets.
- Context Manifest records what information was assembled before execution.
- Project State provides the project snapshot and baseline context.
- Change Record records what actually changed.
- Verification Evidence records what was tested and whether the observed changes satisfy acceptance criteria.

A Change Record does not itself prove functional correctness, security, production readiness, or human acceptance.

## 7. Security and limitations

Do not place secrets or confidential file contents in a Change Record. Store references and digests instead. The schema validates the record's shape; the validator compares a supplied inventory with the Task Contract. This draft does not yet implement a Git diff collector, filesystem monitor, sandbox, or preventive permission enforcement. Post-execution checking cannot undo an unauthorized write.

## 8. Validation

Run `python scripts/validate_core_specifications.py`. The bundled validator checks totals, path scope, operation permissions, forbidden paths, sensitive-category permissions, and change budgets for the worked example bundle. It only validates data supplied to it; it does not prove the inventory was collected from a real Git repository.
