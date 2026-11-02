# BVC Project State Specification

**Specification ID:** `BVC-PROJECT-STATE`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  
**Schema:** [project-state.schema.json](./project-state.schema.json)  
**Schema dialect:** JSON Schema Draft 2020-12

## 1. Purpose

A **Project State** is a durable, versioned snapshot of what is currently known about a project: its lifecycle, baseline, current milestone, objectives, verified facts, assumptions, accepted decisions, active tasks, blockers, risks, issues, next actions, and recovery point.

Project State is not AI memory and must not be treated as a transcript. Its purpose is to help a new session, a different executor, or a human maintainer understand the project without relying on one model's conversation history.

## 2. Design principles

1. **Project-owned:** the project, not an AI session, owns the state record.
2. **Snapshot, not event log:** Project State summarizes the latest accepted view; detailed changes belong in Change Records and project event/ledger systems.
3. **Facts are classified:** distinguish verified facts from assumptions and open questions.
4. **Traceable:** verified facts and accepted decisions include source references.
5. **Versioned:** each material update increments `revision`; do not silently rewrite the meaning of prior snapshots.
6. **Recoverable:** identify a recovery point and whether it has been verified.
7. **Minimal and safe:** do not store secrets, credentials, full conversation dumps, or unnecessary personal/customer data.

## 3. State lifecycle

`lifecycle_state` describes the project, not a task or execution run:

- `PLANNING`: scope and foundations are being established;
- `ACTIVE`: planned engineering work is progressing;
- `BLOCKED`: a material project-level condition prevents safe progress;
- `MAINTENANCE`: the product is primarily being operated or maintained;
- `ARCHIVED`: the project is no longer active.

Task status remains owned by the Task Registry or the project's workflow. A Task Contract's `APPROVED` status does not mean the task is complete.

## 4. State content

- **Repository and baseline:** canonical repository URL, default branch, source commit, and working-tree condition.
- **Current milestone and objectives:** the current project focus and measurable direction.
- **Facts:** each entry is `VERIFIED_FACT`, `ASSUMPTION`, `OPEN_QUESTION`, or `DEPRECATED_FACT`. A verified fact must cite at least one source.
- **Decisions:** proposed, accepted, rejected, or superseded decisions with decision owner and source references.
- **Active tasks:** task/contract references and task status. Do not copy the entire Task Contract into Project State.
- **Blocked items, risks, and issues:** record owner and status where known.
- **Next actions:** specific, prioritized actions; avoid vague entries such as “continue development.”
- **Recovery:** a reference to a commit, checkpoint, snapshot, or backup and whether it was verified.
- **Updated by:** the role or identity responsible for the snapshot update.

## 5. Consistency rules

A `DIRTY` working tree requires a reference to the pre-existing changes. A recovery source commit should match the project baseline or the declared recovery procedure. IDs must be unique within their respective collections. A verified fact without a source is invalid. An assumption must not be silently promoted to a verified fact without evidence and an update to the record.

## 6. Relationship to other Core Specifications

- Task Contract defines a bounded unit of authorized work.
- Context Manifest records information selected for a specific task.
- Project State records the durable project-wide snapshot.
- Change Record records observed changes for a specific execution.
- Verification Evidence records checks and evidence supporting acceptance.

A Project State may reference these records but must not replace them.

## 7. Security and operational limits

Project State is not a credential store, secret manager, audit log, database schema, or deployment system. It is a portable record format. Storage permissions, concurrency, revision conflict handling, backups, and retention must be implemented by the adopting project.

## 8. Validation

Run `python scripts/validate_core_specifications.py`. The validator checks schema structure and semantic consistency in the worked example bundle. It does not connect to Git, prove that a recovery point exists, or independently verify that facts are true.
