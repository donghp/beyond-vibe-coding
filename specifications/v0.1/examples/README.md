# Task Contract Examples

These examples are illustrative and use synthetic project identifiers and paths. They are designed to exercise the v0.1 schema and semantic validator; they are not production contracts and do not describe actual EFIN source paths or customer data.

| Example | Mode / risk | Demonstrates |
|---|---|---|
| [read-only-inspection.yaml](./read-only-inspection.yaml) | READ_ONLY / R0 | Inspection without project writes; all change budgets are zero. |
| [scoped-component-change.yaml](./scoped-component-change.yaml) | WRITE / project-defined R2 | Exact MODIFY and CREATE paths, separate operations, recovery point, acceptance criteria, and bounded change budget. |
| [high-risk-financial-change.yaml](./high-risk-financial-change.yaml) | WRITE / project-defined R4 | Synthetic financial-domain change with explicit approval, domain tests, and stronger evidence. |

A sample post-run diff inventory is available as [changed-files-inventory.example.json](./changed-files-inventory.example.json); use it with the scoped component contract and `--changed-files-json`.

Risk labels are interpreted by each example's `risk.policy_ref`. The examples do not establish a universal meaning for R0–R5.
