# Validation Scripts

## Task Contract validator

```bash
python scripts/validate_task_contracts.py
```

Validates Task Contract v0.1.0 YAML examples against the JSON Schema and additional semantic rules. It can also compare one contract with a supplied VCS-derived changed-files inventory using `--changed-files-json`.

## Core Specification validator

```bash
python scripts/validate_core_specifications.py
```

Validates the four companion Core Specification schemas and examples, then checks the linked five-record example bundle against the existing Task Contract example. It checks cross-record IDs, project and baseline references, required context inclusion, state fact provenance, change path scope and totals, Change Budget, verification-plan linkage, required check coverage, and acceptance/evidence consistency.

Use `--skip-cross-validation` only when validating the four companion schemas/examples individually.

## Limits

These scripts validate supplied files and records. They do not execute AI tasks, fetch external context, collect Git diffs, authenticate human approvals, enforce filesystem permissions, or provide a runtime sandbox. Those capabilities require trusted runtime components and project-specific policy integrations.
