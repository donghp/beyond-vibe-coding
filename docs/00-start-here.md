
# Start Here — Your First Steps into Beyond Vibe Coding

> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**
>
> **Prompting gets you a prototype. Engineering gets you to production.**

Welcome to **Beyond Vibe Coding (BVC)**, a project-centric approach to building and maintaining software with AI.

This repository is the practical engineering companion to:

**BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI**  
Author: Dong Hong

You do not need to be an AI engineer to understand the central idea:

**AI should help people build software without taking control away from the people who own, understand, and are responsible for the project.**

---

## 1. Understand the problem

AI coding tools can generate code quickly. But generating code is not the same as building reliable software.

As a project grows, important questions appear:

- Does the AI understand the real requirements?
- Does it know which project information is authoritative?
- Is it allowed to modify the files it wants to change?
- Could its changes affect security, data, or architecture?
- How do we know the result actually works?
- Can another AI or developer continue the project if the current session stops?

BVC addresses these problems through project-centric engineering practices.

The project—not the AI conversation—must remain the durable source of truth.

## 2. Learn five fundamental engineering concerns

BVC organizes its initial Core Specifications around five connected concerns.

### 2.1 Task — What is the AI asked and allowed to do?

The **Task Contract** defines:

- The task objective.
- Authorized scope.
- Separate CREATE, MODIFY, and DELETE permissions.
- Constraints and stopping conditions.
- Expected outputs.
- Acceptance criteria.
- Verification requirements.
- Human approval requirements.

Start here:

[Task Contract Specification](../specifications/v0.1/task-contract.md)

### 2.2 Context — What information should the AI use?

The **Context Manifest** records the information selected for a task.

It helps distinguish:

- Authoritative sources.
- Untrusted information.
- Current and outdated information.
- Included and excluded sources.
- Conflicting information.
- Provenance and references.

Start here:

[Context Manifest Specification](../specifications/v0.1/context-manifest.md)

### 2.3 State — What is the actual condition of the project?

The **Project State** records durable project information, such as:

- Verified facts.
- Assumptions.
- Accepted decisions.
- Active tasks.
- Blockers.
- Open risks.
- Next actions.
- Recovery references.

Project State is different from AI conversation history.

Start here:

[Project State Specification](../specifications/v0.1/project-state.md)

### 2.4 Change — What did the AI actually change?

The **Change Record** records observed repository changes.

It distinguishes:

- CREATE.
- MODIFY.
- DELETE.

It also records the baseline, changed-file inventory, scope integrity, and change-budget results.

A Worker description of what it changed is not an authoritative replacement for an observed source-control diff.

Start here:

[Change Record Specification](../specifications/v0.1/change-record.md)

### 2.5 Evidence — How do we know the result has been checked?

The **Verification Evidence** record connects actual checks and results to the task's acceptance criteria.

It helps distinguish:

- Checks that were planned.
- Checks that actually ran.
- PASS and FAIL results.
- Evidence references.
- Known limitations.
- Human acceptance decisions.

A verification result of PASS does not automatically mean that a human has accepted the work or approved a production release.

Start here:

[Verification Evidence Specification](../specifications/v0.1/verification-evidence.md)

---

## 3. Follow a simple engineering lifecycle

The five specifications work together in a traceable engineering process:

1. Define the task and authorized scope.
2. Select relevant and permitted project context.
3. Record the project baseline and current state.
4. Let the AI execute only within the authorized scope.
5. Record the actual changes.
6. Verify the changes against acceptance criteria.
7. Collect evidence and obtain required human approval.
8. Update project records and prepare the next task or handoff.

This is a conceptual lifecycle supported by draft data specifications and validation tools. The repository does not yet automate every step.

---

## 4. Choose your learning path

### Beginner / Vibe Coder

You can start without deep knowledge of programming or AI architecture.

Suggested path:

1. Read the [Framework Overview](./framework-overview.md).
2. Understand the [Task Contract guide](./task-contract.md).
3. Open the [Read-only inspection example](../specifications/v0.1/examples/read-only-inspection.yaml).
4. Explore the [Task Contract template](../templates/task-contract.yaml).
5. Learn how to validate an example.

Your first goal is simple: learn how to give AI a bounded task and check what it has done.

### Developer / Team Lead

Suggested path:

1. Read the [Conceptual Architecture](./architecture.md).
2. Review all five Core Specifications.
3. Inspect the JSON Schemas and YAML examples.
4. Run the Python validators and automated tests.
5. Examine the GitHub Actions workflow.

Your goal is to introduce repeatable task, scope, change, and verification practices into software development.

### CTO / Architect / AI Engineer

Suggested path:

1. Review the [Framework Overview](./framework-overview.md).
2. Study the [Conceptual Architecture](./architecture.md).
3. Review all five Core Specifications and their relationships.
4. Examine the trust boundaries and known limitations.
5. Evaluate how the draft contracts could fit your organization's governance and engineering processes.

Your goal is to evaluate the method, define suitable policies, and determine what additional implementation and enforcement capabilities are required.

---

## 5. Try the validation tools

The current reference validation tools use Python.

From the repository root:

```bash
python -m pip install -r requirements-dev.txt

python scripts/validate_task_contracts.py

python scripts/validate_core_specifications.py

python -m unittest discover -s tests -v
```

The validators check the published examples, selected semantic rules, and cross-record relationships.

The GitHub Actions workflow runs the same validation process for relevant changes.

A passing validation means the tested structures and rules passed. It does not prove that a real AI executor has obeyed the contract or that a production system is correct.

---

## 6. What BVC currently provides

Phase 1 — Framework Foundation:

- Framework Overview.
- Conceptual Architecture.
- Engineering Glossary.
- Start Here.
- Book Chapter Map.

Phase 2 — Core Specifications:

- Task Contract.
- Context Manifest.
- Project State.
- Change Record.
- Verification Evidence.

The five specifications are Draft / Experimental v0.1.0. They have JSON Schemas, examples, templates, validators, and automated tests.

## 7. What BVC does not yet provide

The current repository is not a complete AI Engineering Runtime.

It does not yet provide:

- A runtime sandbox that prevents unauthorized file writes.
- Automatic authentication of human approvals.
- A trusted Git diff collector connected to every AI execution.
- A complete project continuity engine.
- A production-ready AI coding agent.
- A complete Web Application.

These are potential future implementation areas. They must not be represented as existing capabilities.

---

## 8. Our engineering principles

**Security First:** Security and access boundaries must be considered from the beginning.

**Human Authority:** People retain responsibility for authorization, consequential decisions, and release.

**AI as Executor:** AI performs assigned work; it does not own the project or grant itself authority.

**Scope Integrity:** An executor must not silently expand its assigned scope.

**Evidence before Acceptance:** A claim of completion must be supported by appropriate evidence.

**Technology Neutrality:** The engineering method should not depend on one AI provider or programming language.

**Proportionate Control:** Apply controls appropriate to the task's risk and impact.

---

## 9. Continue learning

- [Documentation Index](./README.md)
- [Core Specifications Index](../specifications/v0.1/README.md)
- [Repository README](../README.md)
- [GitHub Repository](https://github.com/donghp/beyond-vibe-coding)
- [BEYOND VIBE CODING on Google Play Books](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

**Start with a small task. Define its boundaries. Verify what AI changes. Keep the project under human control.**

That is the first step beyond Vibe Coding.

