# BVC Verification Evidence Specification

**Specification ID:** `BVC-VERIFICATION-EVIDENCE`  
**Version:** `0.1.0`  
**Status:** Draft / Experimental  
**Schema:** [verification-evidence.schema.json](./verification-evidence.schema.json)  
**Schema dialect:** JSON Schema Draft 2020-12

## 1. Purpose

A **Verification Evidence** record captures the checks actually performed for a task, their outcomes, the acceptance criteria they address, the evidence artifacts produced, the execution environment, and any limitations. It separates a worker's claim from observable evidence and separates verification from the human decision to accept the task.

## 2. Design principles

1. **Criteria-linked:** every check references one or more acceptance-criteria IDs from the Task Contract.
2. **Result-specific:** distinguish `PASS`, `FAIL`, `INCONCLUSIVE`, `BLOCKED`, and `NOT_RUN`.
3. **Evidence-level aware:** record the level of evidence actually produced (1–4); a status alone is not enough.
4. **Traceable:** identify contract revision, task, run, source commit, and Change Record.
5. **Limitations are explicit:** inaccessible environments, missing data, skipped checks, and known coverage gaps must be recorded.
6. **Acceptance is separate:** a verification result of `PASS` does not automatically mean `ACCEPTED` or `RELEASE_APPROVED`.
7. **No fabricated proof:** references must identify real artifacts in real executions; examples in this repository are synthetic teaching data.

## 3. Check outcomes

- `PASS`: the specified check ran and met its stated condition.
- `FAIL`: the check ran and did not meet its condition.
- `INCONCLUSIVE`: evidence exists but cannot establish pass or fail.
- `BLOCKED`: the check could not proceed because a prerequisite was absent or prohibited.
- `NOT_RUN`: the check was not executed.

Evidence levels follow the book's scale: 1 static evidence; 2 automated execution evidence; 3 system evidence; 4 real-world evidence. A level is descriptive, not a universal quality score. The adopting project must define which evidence is sufficient for each risk and acceptance criterion.

## 4. Overall result

The overall result is `PASS`, `FAIL`, `INCONCLUSIVE`, or `NOT_RUN`. It must not be `PASS` when any required contract check fails, is blocked, is inconclusive, or has not run, or when a required acceptance criterion lacks a passing check at the required evidence level.

## 5. Acceptance decision

`acceptance_decision` is independent of `overall_result`:

- `PENDING`: no acceptance decision has been recorded;
- `ACCEPTED`: an authorized human/role accepted the task based on the evidence;
- `REJECTED`: acceptance was denied; or
- `CONDITIONALLY_ACCEPTED`: acceptance was granted with explicit conditions and an owner.

An evidence record with `overall_result: PASS` and `decision: PENDING` is valid: technical checks passed, but human acceptance has not yet been recorded. A system must not infer release authority from acceptance unless project policy explicitly grants that authority.

## 6. Evidence artifacts

Each artifact has an ID, kind, reference, description, and optional capture time and digest. Store logs, reports, screenshots, metrics, or CI run references outside the record and point to them. Avoid embedding credentials, secrets, customer data, or proprietary payloads. A digest can help detect later content changes but does not prove that the artifact is truthful or complete.

## 7. Relationship to other Core Specifications

- Task Contract declares acceptance criteria and the verification plan.
- Context Manifest documents selected inputs.
- Project State captures the durable project snapshot.
- Change Record records actual repository changes.
- Verification Evidence records the actual checks and evidence.

The five records form a traceable path from authorized task to selected context, project baseline, observed change, and verification result. They do not by themselves create a complete PAECS runtime or release system.

## 8. Validation and limitations

Run `python scripts/validate_core_specifications.py`. The validator checks evidence schema, task/contract/change-record linkage, criterion references, required-check coverage, evidence-level sufficiency, and consistency between check results and the overall result.

This draft does not cryptographically sign results, authenticate the actor, verify remote artifact availability, execute tests, or decide whether the project is ready for production. Those responsibilities belong to trusted CI/runtime services and authorized human roles.
