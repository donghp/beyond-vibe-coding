# BVC v0.1.0 Examples

All examples are synthetic teaching data. They contain no EFIN source paths, customer data, credentials, or claim of a real execution.

## Task Contract examples

- `read-only-inspection.yaml` — a no-write inspection task.
- `scoped-component-change.yaml` — exact CREATE/MODIFY paths and a bounded change budget.
- `high-risk-financial-change.yaml` — a synthetic financial-domain task with explicit human approval requirements.
- `changed-files-inventory.example.json` — illustrative VCS-derived file inventory for the Task Contract diff validator.

## Companion Core Specification examples

Companion examples are stored separately in [`core-examples/`](../core-examples/): Context Manifest, Project State, Change Record, and Verification Evidence. The four files form one deliberately linked bundle. They are kept outside this Task Contract examples directory so the existing Task Contract validator does not try to interpret them as Task Contracts. Run:

```bash
python scripts/validate_core_specifications.py
```

Do not copy synthetic IDs, commits, approvals, evidence references, or repository paths into a real project without replacing and verifying them.
