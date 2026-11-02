# Task Contract Validator

`validate_task_contracts.py` performs three distinct checks:

1. JSON Schema Draft 2020-12 validation of YAML contract documents.
2. Cross-field semantic checks such as READ_ONLY/WRITE consistency, exact scope, separate CREATE/MODIFY/DELETE permissions, approval requirements, linked acceptance criteria, and report completeness.
3. Optional post-run comparison of a single contract with a VCS-derived changed-file inventory.

## Validate all example contracts

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_task_contracts.py
```

## Validate one contract against an observed diff

```bash
python scripts/validate_task_contracts.py \
  specifications/v0.1/examples/scoped-component-change.yaml \
  --changed-files-json specifications/v0.1/examples/changed-files-inventory.example.json
```

Each changed-file item must include:

- `path`: repository-relative path.
- `operation`: `CREATE`, `MODIFY`, or `DELETE`.
- `diff_lines`: additions plus deletions, excluding diff headers.
- `is_binary`: whether the file is binary.
- `categories` (optional): categories assigned by a trusted project-specific classifier, from `dependency`, `lockfile`, `database_schema`, `financial_formula`, `authentication`, and `architecture`.

Sensitive categories must not be inferred from filenames alone. The adopting project is responsible for its protected-resource registry or classifier.

## Enforcement boundary

This script is a validator, not a sandbox. It can detect violations from an inventory that has already been collected, but cannot stop a process from writing a file before the diff is inspected. Use OS permissions, container/worktree isolation, protected branches, or equivalent runtime controls for preventive enforcement.
