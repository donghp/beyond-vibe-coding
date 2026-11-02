# Documentation Index

This directory contains the conceptual foundation and reader guides for the **Beyond Vibe Coding (BVC) Engineering Framework**.

## Framework foundation — v0.1

These five documents establish the initial framework definition and conceptual architecture. They describe the method and intended boundaries; they do not claim that every conceptual component has been implemented.

1. [Start Here — 5-Minute Introduction](./00-start-here.md)
2. [Framework Overview](./framework-overview.md)
3. [Conceptual Architecture](./architecture.md)
4. [Engineering Glossary](./glossary.md)
5. [Book Chapter Map](./book-chapter-map.md)

## Core Specifications — Phase 2

The repository now defines five technology-neutral Core Specifications, all Draft / Experimental v0.1.0:

1. [Task Contract](../specifications/v0.1/task-contract.md) — defines the task, authorized scope, constraints, acceptance, and stopping conditions.
2. [Context Manifest](../specifications/v0.1/context-manifest.md) — records source provenance, authority, trust, freshness, and conflicts.
3. [Project State](../specifications/v0.1/project-state.md) — records durable facts, assumptions, decisions, tasks, risks, and recovery references.
4. [Change Record](../specifications/v0.1/change-record.md) — records observed CREATE, MODIFY, DELETE changes and scope/budget outcomes.
5. [Verification Evidence](../specifications/v0.1/verification-evidence.md) — records checks, evidence artifacts, and the separate human acceptance decision.

The [v0.1 Specification Index](../specifications/v0.1/README.md) includes the JSON Schemas, examples, templates, commands, and limitations.

## Validation

From the repository root, run:

```bash
python scripts/validate_task_contracts.py
python scripts/validate_core_specifications.py
python -m unittest discover -s tests -v
```

The Python tooling is the current validator implementation. The five data contracts themselves are technology-neutral and are not tied to Python, TypeScript, Tailwind CSS, PostgreSQL, or a specific AI executor.

## Relationship to the book and EFIN

BVC generalizes the engineering method and principles discussed in **_BEYOND VIBE CODING_**. **Enerix Fin (EFIN)**, also referred to by its product name **EnerixFin**, is a real-world case study and validation environment. EFIN-specific repository paths, registries, governance IDs, and operational arrangements are not automatically universal BVC requirements.

Return to the [repository README](../README.md) for the project overview.
