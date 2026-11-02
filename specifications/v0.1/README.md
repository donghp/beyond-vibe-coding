# BVC Task Contract — v0.1.0

**Status:** Draft / Experimental  
**Schema dialect:** JSON Schema Draft 2020-12  
**Specification:** [task-contract.md](./task-contract.md)  
**Machine-readable schema:** [task-contract.schema.json](./task-contract.schema.json)  
**Examples:** [`examples/`](./examples/)

## Purpose

The Task Contract is the structured, reviewable representation of the book's **Execution Contract**. It defines what the executor is expected to achieve, what it is permitted to do, what it must produce, how the result is verified, and where it must stop.

## Contents

- `task-contract.schema.json` — structural schema.
- `task-contract.md` — normative field definitions, operating rules, and limitations.
- `examples/read-only-inspection.yaml` — a no-write inspection contract.
- `examples/scoped-component-change.yaml` — an exact-file, bounded write contract.
- `examples/high-risk-financial-change.yaml` — a risk-shaped contract with explicit human approval.
- `examples/changed-files-inventory.example.json` — a sample VCS-derived post-run file inventory for diff validation.

## Validate locally

From the repository root:

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_task_contracts.py
python -m unittest discover -s tests -v
```

The validator checks schema validity and additional semantic rules such as exact path scope, operation permissions, read-only/write consistency, change-budget consistency, protected-path conflicts, and risk-based approval. It can also compare one contract with a VCS-derived file-diff inventory and enforce file-count, diff-line, binary-file, and supplied sensitive-category budgets. It does not collect the diff, sandbox an AI process, classify project-specific sensitive files, or enforce filesystem permissions while code is executing.

Example post-run diff check:

```bash
python scripts/validate_task_contracts.py \
  specifications/v0.1/examples/scoped-component-change.yaml \
  --changed-files-json specifications/v0.1/examples/changed-files-inventory.example.json
```

## Execution readiness

A structurally valid contract is not necessarily approved for execution. Before a write task starts, the adopting system must verify the contract status, human-approval status when required, current baseline, recovery point, executor eligibility, and actual runtime permissions.
