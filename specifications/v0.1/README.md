# BVC Core Specifications — v0.1.0

**Status:** Draft / Experimental  
**Schema dialect:** JSON Schema Draft 2020-12  
**Phase:** 2 — Core Specifications

## The five specifications

| Specification | Human-readable guide | JSON Schema |
|---|---|---|
| Task Contract | [task-contract.md](./task-contract.md) | [task-contract.schema.json](./task-contract.schema.json) |
| Context Manifest | [context-manifest.md](./context-manifest.md) | [context-manifest.schema.json](./context-manifest.schema.json) |
| Project State | [project-state.md](./project-state.md) | [project-state.schema.json](./project-state.schema.json) |
| Change Record | [change-record.md](./change-record.md) | [change-record.schema.json](./change-record.schema.json) |
| Verification Evidence | [verification-evidence.md](./verification-evidence.md) | [verification-evidence.schema.json](./verification-evidence.schema.json) |

## Examples and templates

- [Task Contract examples](./examples/README.md)
- [Context Manifest example](./core-examples/context-manifest.example.yaml)
- [Project State example](./core-examples/project-state.example.yaml)
- [Change Record example](./core-examples/change-record.example.yaml)
- [Verification Evidence example](./core-examples/verification-evidence.example.yaml)
- [Core example bundle notes](./core-examples/README.md)
- [Task Contract template](../../templates/task-contract.yaml)
- [Context Manifest template](../../templates/context-manifest.yaml)
- [Project State template](../../templates/project-state.yaml)
- [Change Record template](../../templates/change-record.yaml)
- [Verification Evidence template](../../templates/verification-evidence.yaml)

## Validation commands

From repository root:

```bash
python scripts/validate_task_contracts.py
python scripts/validate_core_specifications.py
python -m unittest discover -s tests -v
```

The second validator checks the four added schemas/examples plus the cross-artifact example bundle against the existing Task Contract. The full test command includes the original Task Contract tests and the additional cross-specification tests.

## Important limitations

- These are draft, technology-neutral data specifications, not a runtime platform.
- The Change Record validator checks a supplied inventory; no trusted Git collector is included yet.
- No filesystem sandbox or preventive runtime permission enforcement is included.
- A `READY` Context Manifest does not prove source access or correctness.
- A verified-looking Project State fact still requires its cited source to be reviewed.
- A Verification Evidence `PASS` does not automatically mean Task Accepted or Release Approved.
- Example data and evidence references are synthetic and are not reports of a real project execution.
