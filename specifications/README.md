# BVC Specifications

**Specification family:** Beyond Vibe Coding (BVC)  
**Current milestone:** Phase 2 — Core Specifications  
**Maturity:** Draft / Experimental; not a published industry standard

Phase 2 defines five technology-neutral records that form a traceable engineering control cycle. Their field names and semantics do not depend on Python, TypeScript, Tailwind CSS, PostgreSQL, a particular AI model, or a specific executor.

## The five Core Specifications

| Order | Specification | Record answers | Status |
|---:|---|---|---|
| 1 | [Task Contract](./v0.1/task-contract.md) | What is the task, what may the executor do, and where must it stop? | Draft / Experimental v0.1.0 |
| 2 | [Context Manifest](./v0.1/context-manifest.md) | Which sources were selected, with what authority, provenance, and freshness? | Draft / Experimental v0.1.0 |
| 3 | [Project State](./v0.1/project-state.md) | What is the durable, current state of the project? | Draft / Experimental v0.1.0 |
| 4 | [Change Record](./v0.1/change-record.md) | What actually changed in the repository for a task execution? | Draft / Experimental v0.1.0 |
| 5 | [Verification Evidence](./v0.1/verification-evidence.md) | Which checks ran, what evidence resulted, and has a human accepted the work? | Draft / Experimental v0.1.0 |

## Relationship

`Task Contract → Context Manifest → Project State → Change Record → Verification Evidence`

This is a conceptual traceability path, not a mandatory temporal sequence for every storage operation. Project State exists across tasks; Context Manifest is assembled for a task; Change Record is produced from observed changes; Verification Evidence is linked to the contract and change record. A complete workflow must preserve IDs, revisions, repository baselines, and evidence references across these records.

## Validation

From the repository root:

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate_task_contracts.py
python scripts/validate_core_specifications.py
python -m unittest discover -s tests -v
```

The validators perform JSON Schema validation, selected cross-field semantic checks, and cross-record checks on the synthetic example bundle. These checks do not implement a runtime sandbox, collect real Git diffs, authenticate approvers, verify remote source access, or prove production correctness.

## Maturity and normative language

All five specifications are **Draft / Experimental v0.1.0**. `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` define requirements within these drafts; they do not imply external certification. Stable status requires broader valid/invalid examples, boundary and adversarial tests, compatibility rules, independent implementation experience, and review.

## Technology neutrality

The specifications define portable data contracts. The current reference validators are implemented in Python because the repository's present tooling is Python-based. Future TypeScript, Tailwind CSS, or PostgreSQL components may implement interfaces, user experience, and persistence without changing the normative data model. PostgreSQL tables must preserve record identity, revision, provenance, and relationships; Tailwind CSS is a presentation layer, not a source of authority; TypeScript types should be generated from or checked against the normative schemas rather than becoming a competing definition.

## License

No repository-wide license is declared in this milestone. Do not assume that public visibility grants reuse or redistribution rights; resolve licensing separately before advertising broad reuse.
