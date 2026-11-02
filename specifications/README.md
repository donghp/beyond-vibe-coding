# BVC Specifications

**Specification family:** Beyond Vibe Coding (BVC)  
**Current milestone:** Phase 2 — Core Specifications  
**Maturity:** Draft / Experimental; not a published industry standard

This directory contains machine-readable specifications and their explanatory documents. Each specification is versioned independently from the book and from any future reference implementation.

## Available specifications

| Version | Specification | Status | Purpose |
|---|---|---|---|
| [v0.1 — Task Contract](./v0.1/task-contract.md) | `task-contract.schema.json` | Draft v0.1.0 | Defines the technical agreement between a task and its executor: objective, authorized scope, actions, context, outputs, acceptance, verification, authority, stopping conditions, and reporting. |

## Specification maturity

BVC uses the following lifecycle labels:

- **Draft:** under design; fields, semantics, and examples may change.
- **Experimental:** implemented or exercised in examples, but not yet considered stable.
- **Stable:** has documented semantics, compatibility expectations, valid and invalid examples, and automated validation appropriate to its scope.
- **Deprecated:** retained for migration or reference but no longer recommended for new use.
- **Retired:** no longer maintained as an active specification.

A valid JSON or YAML document is not, by itself, proof that a workflow is safe or that an executor is authorized. Schema validation checks structure. Semantic validation checks additional cross-field rules. The v0.1 companion validator can inspect a VCS-derived post-run diff inventory, but it does not sandbox an executor, collect the diff, or enforce permissions during execution. Runtime enforcement must still compare the approved contract with actual actions and changes.

## Normative wording

Within a specification, **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** indicate requirement strength:

- **MUST / MUST NOT:** mandatory for conformance to that draft specification.
- **SHOULD / SHOULD NOT:** recommended; deviations need an explicit reason.
- **MAY:** optional.

These words define requirements within this repository's draft specifications. They do not imply external certification or standards-body approval.

## Versioning and compatibility

A versioned directory is an immutable release boundary in intent. Published versions should not be silently changed after downstream users depend on them. Breaking changes should be published under a new version path with migration notes. Draft versions may receive corrections before being treated as a stable release, but each material change must be recorded in Git history and the relevant changelog.

## Source alignment

The specifications translate concepts from _BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_ by Dong Hong into reviewable technical artifacts. They also incorporate implementation lessons from the Enerix Fin (EFIN) project where these can be generalized safely.

Project-specific paths, registries, risk mappings, and governance identities from EFIN are examples, not global BVC defaults. Each adopting project must bind a contract to its own canonical policies and repository state.

## License

The repository has not declared a repository-wide license. Do not assume that public visibility grants reuse or redistribution rights. Code, specifications, examples, diagrams, and book prose may require separate licensing decisions.
