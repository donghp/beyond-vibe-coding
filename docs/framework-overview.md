# Beyond Vibe Coding Framework — Overview

**Document status:** Draft — synchronized with BVC Core Specifications v0.1.0  
**Document role:** Framework definition  
**Phase:** Phase 1 foundation, updated for Phase 2 Core Specifications  
**Book companion:** _BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_ — Dong Hong  
**Related:** [Start Here](./00-start-here.md) · [Conceptual Architecture](./architecture.md) · [Engineering Glossary](./glossary.md) · [Book Chapter Map](./book-chapter-map.md) · [Core Specification Index](../specifications/v0.1/README.md)

---

## 1. Purpose

Beyond Vibe Coding (BVC) describes a **project-centric method for AI-assisted software engineering**. It addresses the gap between generating code and completing software that must remain understandable, secure, maintainable, verifiable, and capable of carrying real-world responsibility.

The framework starts from a simple distinction:

> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**

The purpose is not to make an AI model more intelligent, make prompts longer, or maximize the number of autonomous agents. It is to organize engineering work so that tasks are bounded, context is appropriate, decisions remain governed, changes are traceable, results are verified, and work can continue when an executor or environment changes.

BVC aims to make disciplined engineering practices understandable and progressively usable by beginners, independent builders, developers, team leads, CTOs, architects, and AI engineers. The method should scale its controls to the task and its risk rather than impose heavyweight process on every small experiment.

## 2. The engineering problem

AI-assisted development can accelerate exploration and implementation. As a project grows, however, the team must still handle problems that code generation alone does not solve:

- A broad task gives an executor too much room to infer scope and make decisions.
- A stronger or more expensive model is not automatically the best fit for every task.
- Conversation history does not reliably represent the canonical current project state.
- More context is not necessarily better; stale, irrelevant, conflicting, or unauthorized information can mislead an executor.
- An AI's capability to perform an action does not grant authority to perform it.
- Multiple executors can create inconsistent changes unless the project controls method, state, and write access.
- A completion claim is not the same as verified evidence.
- Security, data integrity, architecture, deployment, release, and customer value involve responsibilities beyond code generation.
- A project should not stop or lose its engineering history when a run, model, provider, quota, or machine changes.

BVC treats these as connected engineering concerns rather than isolated prompt-writing problems.

## 3. Scope and intended audience

BVC is a project-centric engineering method and an evolving set of practical specifications and tools. It is intended for people who build, design, govern, or deliver software with AI coding tools and agents.

### 3.1 Beginners and independent builders

People who use AI coding tools to build personal projects, prototypes, or their first software products. They may not know software architecture, automated testing, or AI engineering in depth.

BVC should help them start with a few practical questions:

- What exactly am I asking AI to do?
- Which files or parts of the project may it change?
- What must it not change?
- How will I check the result?
- What should I do if AI wants to go beyond the task?

The goal is not to turn every beginner into a professional software engineer. It is to help them adopt essential habits that preserve understanding, security, and human control.

### 3.2 Developers and engineering teams

Software developers, senior engineers, team leads, and engineering managers who need practical methods for task decomposition, context management, source control, validation, review, and delivery.

BVC provides a common way to describe task boundaries, project information, state, changes, and verification evidence across AI-assisted work.

### 3.3 CTOs, architects, and AI engineers

Technology leaders, software and solution architects, and AI engineers who need to reason about authority, security, architecture integrity, risk, evidence, executor eligibility, and responsible adoption of AI-assisted engineering.

The repository provides an initial foundation for evaluating and adapting the method. It does not replace an organization's architecture review, security program, regulatory obligations, or engineering governance.

### 3.4 What BVC is not

BVC is not primarily a beginner's prompt collection, a guide to one coding assistant, a general textbook on foundation-model training, or a claim that every reader must become an AI engineer. It is also not a complete production runtime in its current repository form.

## 4. Core proposition

The project, not the currently selected AI, should retain the durable information required to perform and continue engineering work.

This implies several distinctions:

| Do not confuse | With | BVC distinction |
|---|---|---|
| Prompt | Task | A prompt is an instruction surface; a task has an objective, scope, constraints, and completion conditions. |
| Conversation history | Project State | History records what was said; State records where the project stands. |
| AI Memory | Project Knowledge | AI memory may be useful, but it is not the project's canonical authority. |
| Similarity | Truth | A retrieved item must also be checked for authority, validity, freshness, and task relevance. |
| Capability | Authority | An executor may be capable of an action but not permitted to make or execute that decision. |
| Code output | Verified result | Generated code and a “done” message do not replace evidence. |
| Checkpoint | Current State | A checkpoint is a saved recovery point; it may be older than the current state. |
| Deployment | Release | Deploying software is not automatically authorization to release it to users. |
| Code progress | Product progress | The product is judged by requirements and customer outcomes, not code volume alone. |
| Verification PASS | Human acceptance | Passing technical checks does not automatically mean an authorized person accepted the result. |

The project should remain the durable source of truth even when the AI model, provider, IDE, or executor changes.

## 5. Seven capability areas

The seven areas below are an editorial grouping for explaining the method. They organize ideas and components discussed in the book; they are not a claim that seven independent software modules have already been implemented.

### 5.1 Task framing and decomposition

Start from the task, not from a preferred model. Define the objective, boundary, inputs, constraints, dependencies, expected outputs, stopping conditions, and acceptance criteria. Decompose large goals into bounded engineering tasks without removing the context needed to understand them.

The **Task Contract** is the current structured representation of task-level intent, permission, constraints, and completion requirements. It distinguishes CREATE, MODIFY, and DELETE permissions and makes scope expansion and stopping conditions explicit.

**Key book concepts:** Task Decomposition, task boundaries, atomic engineering tasks, stopping conditions, acceptance criteria, capability versus authority.

**Current repository artifacts:** [Task Contract guide](./task-contract.md), [Task Contract Specification](../specifications/v0.1/task-contract.md), [JSON Schema](../specifications/v0.1/task-contract.schema.json), [examples](../specifications/v0.1/examples/), and [template](../templates/task-contract.yaml).

### 5.2 Context resolution and compilation

Provide the executor with the information required for the task—not an indiscriminate dump of files or conversation history. Consider relevance, authority, validity, freshness, scope, dependencies, conflict, and the amount of information actually needed.

The book describes a **Context Compiler** as a mechanism that transforms task requirements and recognized project truth into a task-specific working context. It is not another AI model or an agent that owns project truth.

The **Context Manifest** records which sources were selected, why they were selected, their authority and trust classifications, freshness, exclusions, and unresolved conflicts. It records context assembly; it does not fetch sources or prove that a source is correct or accessible.

**Key book concepts:** Context Engineering, retrieval, retrieval tiers, Project Knowledge, Project State, Context Compiler, minimum sufficient context.

**Current repository artifacts:** [Context Manifest Specification](../specifications/v0.1/context-manifest.md), [JSON Schema](../specifications/v0.1/context-manifest.schema.json), [example](../specifications/v0.1/core-examples/context-manifest.example.yaml), and [template](../templates/context-manifest.yaml).

### 5.3 Authority and method control

Determine which actions are permitted, which decisions remain with people, and which changes require review or explicit approval. Keep the engineering method stable while allowing eligible executors and providers to vary through adapters.

A valid data record does not itself authenticate the person who approved it or enforce permissions at runtime. Those responsibilities require trusted identity, policy, and execution components.

**Key book concepts:** Authority, Controlled Autonomy, Method Lock, Semantic Contract, executor eligibility, human decision and approval.

**Current repository foundation:** Task Contract authority and approval fields, selected cross-record validation, and verification acceptance fields. A project-level Authority Policy and authenticated approval service remain future work.

### 5.4 Executor and Engineering Run coordination

An **AI Executor** is selected to perform a specific authorized task. An **Engineering Run** is a bounded period of engineering execution by an AI executor or a developer. A run can end while the project continues. Multiple AI systems may contribute different roles, but the project must preserve one coherent current state and a controlled path for canonical changes.

The framework is intended to remain independent of a specific model or provider. The executor's capability, availability, quota, cost, and suitability may influence selection, but they do not change the task's authority or acceptance requirements.

**Key book concepts:** AI Executor, Engineering Run, multiple AIs, provider change, Workspace Lock, handoff.

**Current repository foundation:** Task Contract is executor-neutral, and the conceptual architecture defines controlled workspace and provider-adapter principles. A runtime executor adapter, scheduler, Engineering Run service, and multi-executor coordinator are future implementation work.

### 5.5 Change and project-state management

Record material engineering changes and preserve the distinction between Project Knowledge and Project State. A Run Record and Run Delta help explain what happened during an execution period. Snapshots and event records serve different purposes: a snapshot captures a state; an event record captures a material occurrence or transition.

The **Project State** specification defines a versioned snapshot of project facts, assumptions, decisions, active tasks, blockers, risks, next actions, and recovery references.

The **Change Record** specification records observed repository changes and links them to a Task Contract, task, run, and source baseline. It distinguishes CREATE, MODIFY, and DELETE and records scope-integrity and change-budget outcomes.

A Change Record should be based on a trusted version-control inventory. The current repository validator can inspect supplied inventory data, but it does not yet collect and authenticate actual Git changes from every AI execution.

**Key book concepts:** Change, Run Record, Run Delta, Project Knowledge, Project State, snapshot, event log, checkpoint.

**Current repository artifacts:** [Project State Specification](../specifications/v0.1/project-state.md), [Change Record Specification](../specifications/v0.1/change-record.md), their schemas, examples, and templates. A durable event log, Run Record service, Run Delta engine, checkpoint manager, and trusted diff collector remain future work.

### 5.6 Evidence and verification

Treat a completion statement as a claim until the required evidence has been collected and evaluated. Verification should address the requirement and the risk of the change; it does not mean blindly running every possible test for every task. Evidence should have enough context to be inspected and, where relevant, reproduced.

The **Verification Evidence** specification records checks actually performed, outcomes, acceptance-criteria references, evidence artifacts, execution environment, and limitations. It distinguishes check results from the separate human decision to accept or reject the task.

A PASS result is not a universal quality certificate, proof of production readiness, or release approval. The project must define which evidence is sufficient for each risk and acceptance criterion.

**Key book concepts:** AI Claim, Engineering Evidence, Verification Budget, Evidence Package, Verification Gate, risk-informed review, verified state.

**Current repository artifacts:** [Verification Evidence Specification](../specifications/v0.1/verification-evidence.md), [JSON Schema](../specifications/v0.1/verification-evidence.schema.json), [example](../specifications/v0.1/core-examples/verification-evidence.example.yaml), and [template](../templates/verification-evidence.yaml).

### 5.7 Continuity, handoff, and recovery

Make it possible to resume work from project-owned artifacts without depending on one conversation, model, provider, or execution environment. Synchronize material changes, state, evidence, checkpoint, and next action before handoff. Preserve recovery information and block rather than guess when critical state cannot be established.

Project State and Change Record provide initial record foundations for parts of this capability. They do not by themselves implement durable event sourcing, automatic checkpoint creation, handoff orchestration, or recovery execution.

**Key book concepts:** Project Continuity, Checkpoint, Handoff Contract, Last Known Good State, Recovery, Continuity Artifact, Fail Closed.

**Current repository artifacts:** [Project State Specification](../specifications/v0.1/project-state.md), [Change Record Specification](../specifications/v0.1/change-record.md), and [Verification Evidence Specification](../specifications/v0.1/verification-evidence.md). A complete continuity runtime remains future work.

## 6. The five Core Specifications

Phase 2 formalizes the initial data foundation for the seven capability areas through five connected, technology-neutral records.

| Specification | Primary question | Main responsibility |
|---|---|---|
| [Task Contract](../specifications/v0.1/task-contract.md) | What is the executor expected and authorized to do? | Task objective, scope, constraints, outputs, acceptance, verification plan, change budget, authority, and stopping conditions. |
| [Context Manifest](../specifications/v0.1/context-manifest.md) | Which information sources were selected for this task, and why? | Source identity, reference, authority, trust, provenance, freshness, inclusion/exclusion, conflicts, and context readiness. |
| [Project State](../specifications/v0.1/project-state.md) | What is the durable current state of the project? | Project baseline, facts, assumptions, decisions, active work, blockers, risks, next actions, and recovery reference. |
| [Change Record](../specifications/v0.1/change-record.md) | What repository changes were observed? | File operations, baseline, changed-file inventory, diff totals, scope integrity, and change-budget result. |
| [Verification Evidence](../specifications/v0.1/verification-evidence.md) | Which checks ran and what evidence resulted? | Acceptance-criteria links, check outcomes, evidence artifacts, environment, limitations, overall verification result, and separate acceptance decision. |

All five specifications are **Draft / Experimental v0.1.0** and use JSON Schema Draft 2020-12. The repository includes human-readable guides, JSON Schemas, worked YAML examples, reusable templates, Python validation utilities, automated tests, and GitHub Actions integration.

The records establish an initial traceability path:

```text
TASK CONTRACT
  Authorized task, scope, and acceptance criteria
          |
          +-----------------------------+
          |                             |
          v                             v
CONTEXT MANIFEST                  PROJECT STATE
Selected sources                  Project baseline and facts
          |                             |
          +--------------+--------------+
                         |
                  AI EXECUTION
                         |
                         v
                  CHANGE RECORD
                  Observed changes
                         |
                         v
              VERIFICATION EVIDENCE
                  Checks and results
                         |
                         v
                 HUMAN ACCEPTANCE
                  When required
```

This is a conceptual relationship, not proof that every lifecycle step is automatically executed. A valid Schema or passing example does not establish runtime authorization, trusted source collection, or actual executor compliance.

See the [Core Specification Index](../specifications/v0.1/README.md) for the complete list of schemas, examples, templates, validation commands, and limitations.

## 7. PAECS and the BVC repository

The book names **PAECS — Project AI Engineering Continuity System** as a continuity-control system. It is not another AI model, coding agent, or Git replacement. The book describes its purpose as allowing a project to continue in a controlled way when an executor changes, a run ends, or the environment changes.

The book identifies possible PAECS components including:

- Authority Engine
- Method Engine
- Task Engine
- Change Engine
- State Engine
- Evidence Engine
- Verification Engine
- Handoff Engine
- Recovery Engine
- Security Engine
- Workspace Lock

The distinction matters:

- **BVC** is the book's broader engineering method and set of principles.
- **PAECS** is the continuity-control system described within that method.
- **This GitHub repository** is the public companion intended to document concepts and incrementally publish specifications, patterns, examples, validation tools, and eventually a practical reference implementation.

This repository is **not yet a complete PAECS implementation**. A diagram, specification, or planned component must not be represented as shipped software.

## 8. Design principles

1. **Security First:** consider security boundaries, data exposure, credentials, and trust from the beginning.
2. **Human Authority:** people retain responsibility for authorization, consequential decisions, acceptance, and release.
3. **AI as Executor:** AI performs assigned work; it does not own the project or grant itself authority.
4. **Task-first:** identify what the task requires before selecting an executor.
5. **Project-owned truth:** AI memory and chat history are not canonical project state.
6. **Minimum sufficient context:** retrieve and compile only the authorized information needed for the task.
7. **Capability does not create authority:** an executor's technical ability is not permission.
8. **Scope Integrity:** CREATE, MODIFY, and DELETE permissions remain distinguishable; an executor must not silently expand its scope.
9. **Method continuity:** providers and models may change without silently changing the project's engineering method.
10. **Controlled canonical writes:** unless coordinated concurrency is explicitly designed, use one authorized writer for canonical workspace changes.
11. **Evidence-based state:** do not promote a task to verified or released state without the evidence and approvals required by policy.
12. **Explicit handoff:** synchronize changes, state, evidence, checkpoint, and next action before transferring work.
13. **Recovery is designed:** checkpoints and recovery instructions are engineering artifacts, not afterthoughts.
14. **Risk-proportionate control:** do not impose the same process on a low-risk experiment and a high-impact production change.
15. **Honest limitations:** an executor must say when it cannot access or verify something.
16. **Model and provider neutrality:** keep the method separate from provider-specific adapters.

## 9. Non-goals

BVC does not aim to:

- replace source control systems such as Git;
- replace software architecture, security engineering, testing, product management, or human accountability;
- guarantee defect-free or production-safe software;
- require human approval for every low-risk action;
- require one specific AI model, IDE, agent framework, programming language, database, or cloud provider;
- turn every engineering task into a heavyweight workflow;
- treat every conversation message or generated token as a material engineering event;
- equate a schema-valid record with an authenticated real-world action;
- claim that a proposed specification is a stable standard before it has been validated and released; or
- claim that the current repository contains a complete PAECS runtime or BVC Web Application.

## 10. Maturity and adoption guidance

The framework is being documented and implemented incrementally.

### 10.1 Current maturity

**Phase 1 — Framework Foundation** provides the conceptual method, architecture, glossary, introductory guide, and book chapter map.

**Phase 2 — Core Specifications** publishes five connected machine-readable data contracts:

- Task Contract;
- Context Manifest;
- Project State;
- Change Record; and
- Verification Evidence.

Each is Draft / Experimental v0.1.0. The repository also provides JSON Schemas, examples, templates, Python validators, automated tests, and a GitHub Actions workflow configured to run relevant validation.

The current implementation does not yet provide:

- a complete stable API or conformance suite;
- a production-ready reference runtime;
- filesystem sandboxing or preventive runtime permission enforcement;
- a trusted Git diff collector integrated with actual AI execution;
- an authenticated human-approval service;
- automatic execution of all project-specific risk policies;
- complete PAECS continuity, handoff, and recovery services; or
- a complete BVC Starter Workbench Web Application.

The validators check supplied records and selected relationships. They do not execute AI tasks, fetch external context, authenticate approvals, enforce filesystem permissions, or prove that submitted evidence is truthful.

### 10.2 Adoption guidance

Adopters should begin with a small, low-risk workflow:

1. Define one bounded task and its expected outcome.
2. Explicitly state permitted and forbidden changes.
3. Select only the project context needed for the task.
4. Record the project baseline and current state.
5. Review the actual changes rather than relying only on the executor's report.
6. Run verification appropriate to the task and risk.
7. Record limitations and obtain required human approval.
8. Update project records before handing the work to another person or executor.

Do not treat the Draft / Experimental specifications as universal policy. Adapt them to local architecture, security, privacy, regulatory, and operational requirements.

### 10.3 Promotion to Stable

A future Stable specification should require broader valid and invalid examples, boundary and adversarial testing, compatibility rules, independent implementation experience, documented change control, security review, and technical feedback from real use.

A passing JSON Schema validation or a successful CI run is necessary evidence for the configured checks, but it is not sufficient evidence for Stable maturity.

## 11. Technology neutrality and implementation direction

The normative meaning of BVC records should remain independent of the implementation stack.

The repository currently uses Python for validation and development utilities. The project may later add:

| Technology | Potential role | Governing principle |
|---|---|---|
| Python | Validators and development utilities. | Tooling must implement the published specifications. |
| TypeScript | Web application logic, typed forms, and integrations. | Types and runtime checks must preserve the normative data model. |
| Tailwind CSS | User-interface styling for the planned Starter Workbench. | Presentation must not become a second source of governance rules. |
| PostgreSQL | Persistent storage for project records when required. | Database structures must remain compatible with the technology-neutral record definitions. |

These are implementation directions, not dependencies required to use the current specifications. A future language, framework, or database must not change the meaning of the Core Specifications.

## 12. Roadmap and phase boundaries

The BVC repository is developed incrementally. Each phase should produce reviewable, documented, and verifiable artifacts.

| Phase | Objective | Status |
|---|---|---|
| Phase 1 | Framework Foundation and Conceptual Architecture | Published foundation documents. |
| Phase 2 | Five Core Specifications and validation foundation | Draft / Experimental v0.1.0; undergoing integration and review. |
| Phase 3 | Practical BVC Starter Workbench | Planned. |
| Future evolution | Advanced runtime enforcement, orchestration, and broader integrations | Research / future work; not part of current Phase 2. |

### 12.1 Phase 3 direction

The planned **BVC Starter Workbench** is intended to make the method easier to learn and apply. The initial public version should remain intentionally simple and practical.

Potential capabilities include:

- guided learning paths for beginners, developers, team leads, and technology leaders;
- beginner-friendly explanations of the five Core Specifications;
- a Task Contract Builder;
- reusable engineering templates;
- schema and semantic validation interfaces;
- practical examples and downloadable project artifacts; and
- local-first operation on a developer's laptop.

The Workbench is a planned deliverable, not an existing application. Its first version should teach and validate core records; it should not pretend to be a complete AI executor, runtime sandbox, or production orchestration platform.

### 12.2 Advanced capabilities are deferred

Advanced Router–Worker orchestration, multi-agent Harness integration, speculative execution, and complex recovery automation are not prerequisites for completing Phase 2 or the planned beginner-focused Phase 3.

They may be evaluated in a later version only when real use cases, security requirements, and validation evidence justify their complexity. The current roadmap prioritizes a clear and useful foundation over technology-driven expansion.

## 13. Source alignment

This overview follows the concepts and terminology in the English International Edition manuscript and published PDF, especially the chapters on task decomposition, model fit and cost, Project Knowledge and State, Context Engineering, Authority, multiple AI executors, verification, continuity, PAECS, architecture, release, and product outcomes.

For the exact chapter sequence and repository traceability, see the [Book Chapter Map](./book-chapter-map.md). For definitions, see the [Engineering Glossary](./glossary.md). For the normative Draft / Experimental data contracts, see the [Core Specification Index](../specifications/v0.1/README.md).

---

**Security First. Human in Control. AI as Executor. Evidence before Acceptance.**
