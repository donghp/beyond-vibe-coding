# Documentation Index

This directory contains the conceptual foundation and reader guides for the **Beyond Vibe Coding (BVC) Engineering Framework**.

## Framework foundation — v0.1

These five documents establish the initial framework definition and conceptual architecture. They describe the method and intended boundaries; they do not claim that every conceptual component has been implemented.

1. [Start Here — 5-Minute Introduction](./00-start-here.md) — project purpose, intended readers, maturity, and a suggested reading path.
2. [Framework Overview](./framework-overview.md) — BVC philosophy, the engineering problem, and the seven capability areas.
3. [Conceptual Architecture](./architecture.md) — system context, Context Compiler, execution, evidence, verification, and continuity.
4. [Engineering Glossary](./glossary.md) — shared terminology and distinctions used throughout the book companion.
5. [Book Chapter Map](./book-chapter-map.md) — mapping to the English edition's Introduction, 21 chapters, Conclusion, and end matter.

**Suggested reading order:** Start Here → Framework Overview → Conceptual Architecture. Use the Glossary and Book Chapter Map as references.

## Core Specifications — Phase 2

The first machine-readable core specification is the Task Contract:

- [Task Contract guide](./task-contract.md) — scope, control principles, validation commands, and limitations.
- [Task Contract Specification v0.1.0](../specifications/v0.1/task-contract.md) — specification semantics and lifecycle.
- [JSON Schema — Draft 2020-12](../specifications/v0.1/task-contract.schema.json) — machine-readable structural contract.
- [Examples](../specifications/v0.1/examples/) — read-only inspection, scoped component change, and synthetic high-risk financial change.
- [Task Contract template](../templates/task-contract.yaml) — a starting point for project-specific contracts.
- [Validator](../scripts/validate_task_contracts.py) — structural, semantic, and post-run diff-inventory checks.
- [Automated tests](../tests/test_task_contracts.py) — 17 tests for schema, scope, approval, and change-budget behavior.

**Maturity:** Task Contract v0.1.0 is Draft / Experimental. Its validator is not a runtime filesystem sandbox and does not, by itself, prevent unauthorized writes.

## Relationship to the book and EFIN

BVC generalizes the engineering method and principles discussed in **_BEYOND VIBE CODING_**. **Enerix Fin (EFIN)**, also referred to by its product name **EnerixFin**, is a real-world case study and validation environment. EFIN-specific repository paths, registries, governance IDs, and operational arrangements are not automatically universal BVC requirements.

For the main project overview, return to the [repository README](../README.md).
