# BVC Practical Labs — Prompt Package Standard

**Document ID:** BVC-PL-PPS-001  
**Version:** 1.0.0  
**Status:** Proposed common standard

## 1. Purpose

Every learner-facing prompt that asks AI to inspect or change a project must be ready to use, bounded, and verifiable. The learner should not need to invent missing technical instructions.

## 2. Required prompt package

A prompt package includes the applicable fields:

1. Prompt ID and title.
2. Objective.
3. Project context.
4. Source of truth and precedence.
5. Current state / inspection requirement.
6. Technology constraints, including unknowns.
7. Authorized scope and allowed operations.
8. Forbidden scope.
9. Expected output.
10. Acceptance criteria.
11. Verification and evidence.
12. Stop conditions.
13. Final report format.

## 3. Read-only versus write-capable prompts

### Read-only prompt
Must explicitly state:
- No files may be edited, created or deleted.
- No commands with side effects may be run.
- No configuration or dependency changes may be made.
- Findings must be separated from assumptions.
- Any missing source or ambiguity must be reported.

### Write-capable prompt
Must pass the Prompt Readiness Gate defined in the Practical Labs Authoring Standard. It must name the authorized paths and change budget where applicable. A prompt cannot grant authority that the Human Owner or approved task contract has not granted.

## 4. Safe execution order

Teach the learner to follow:

**UNDERSTAND → INSPECT → PREPARE → AUTHORIZE → EXECUTE → VERIFY → ACCEPT**

If a readiness gate fails, stop at read-only preparation or request the missing owner decision. Do not let an AI model fill a missing approval with an assumption.

## 5. Copy-ready packaging

Where the project uses a canonical Prompt Library, keep the full prompt there and link to it from the lesson. Do not maintain multiple unlabelled copies that can drift.

For Beginner readers, explain in Vietnamese before a copy-ready prompt when required by the project's GAIS Prompt Delivery Standard.

## 6. Acceptance

A prompt is a prepared instruction, not proof that the resulting work succeeds. Verify the actual project changes and learner-visible behavior independently.
