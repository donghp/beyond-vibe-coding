# Beyond Vibe Coding Framework — Overview

**Document status:** Draft v0.1  
**Document role:** Framework definition  
**Book companion:** _BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI_ — Dong Hong

## 1. Purpose

Beyond Vibe Coding (BVC) describes a **project-centric method for AI-assisted software engineering**. It addresses the gap between generating code and completing software that must remain understandable, maintainable, verifiable, and capable of carrying real-world responsibility.

The framework starts from a simple distinction:

> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**

The purpose is not to make an AI model more intelligent. It is to organize engineering work so that tasks are bounded, context is appropriate, decisions remain governed, changes are traceable, results are verified, and work can continue when an executor or environment changes.

## 2. The engineering problem

AI-assisted development can accelerate exploration and implementation. As a project grows, however, the team must still handle problems that code generation alone does not solve:

- A broad task gives an executor too much room to infer scope and make decisions.
- A stronger or more expensive model is not automatically the best fit for every task.
- Conversation history does not reliably represent the canonical current project state.
- More context is not necessarily better; stale, irrelevant, conflicting, or unauthorized information can mislead an executor.
- An AI's capability to perform an action does not grant authority to perform it.
- Multiple executors can create inconsistent changes unless the project controls method, state, and write access.
- A completion claim is not the same as verified evidence.
- Deployment, release, and customer value involve responsibilities beyond code generation.
- A project should not stop or lose its engineering history when a run, model, provider, quota, or machine changes.

BVC treats these as connected engineering concerns rather than isolated prompt-writing problems.

## 3. Scope and intended audience

The method is intended primarily for people who build, design, govern, or deliver software with AI coding tools and agents:

- CTOs and technology leaders responsible for engineering capability and risk.
- Software and solution architects responsible for system integrity and technical decisions.
- AI engineers integrating models and coding agents into engineering workflows.
- Engineering managers and team leads coordinating task execution, review, and delivery.
- Senior developers working on codebases that must remain maintainable.
- Technical product managers translating product intent into engineering outcomes.

It is not primarily a beginner's prompt collection, a guide to one coding assistant, or a general textbook on foundation-model training and inference.

## 4. Core proposition

The project, not the currently selected AI, should retain the durable information required to perform and continue engineering work.

This implies several distinctions:

| Do not confuse | With | BVC distinction |
|---|---|---|
| Prompt | Task | A prompt is an instruction surface; a task has objective, scope, constraints, and completion conditions. |
| Conversation history | Project State | History records what was said; State records where the project stands. |
| AI Memory | Project Knowledge | AI memory may be useful, but it is not the project's canonical authority. |
| Similarity | Truth | A retrieved item must also be checked for authority, validity, freshness, and task relevance. |
| Capability | Authority | An executor may be capable of an action but not permitted to make or execute that decision. |
| Code output | Verified result | Generated code and a “done” message do not replace evidence. |
| Checkpoint | Current State | A checkpoint is a saved recovery point; it may be older than the current state. |
| Deployment | Release | Deploying software is not automatically authorization to release it to users. |
| Code progress | Product progress | The product is judged by requirements and customer outcomes, not code volume alone. |

## 5. Seven capability areas

The seven areas below are an editorial grouping for explaining the method. They organize ideas and components discussed in the book; they are not a claim that seven independent software modules have already been implemented.

### 5.1 Task framing and decomposition

Start from the task, not from a preferred model. Define the objective, boundary, inputs, constraints, dependencies, expected outputs, stopping conditions, and acceptance criteria. Decompose large goals into bounded engineering tasks without removing the context needed to understand them.

**Key book concepts:** Task Decomposition, task boundaries, atomic engineering tasks, stopping conditions, acceptance criteria, capability versus authority.

### 5.2 Context resolution and compilation

Provide the executor with the information required for the task—not an indiscriminate dump of files or conversation history. Consider relevance, authority, validity, freshness, scope, dependencies, conflict, and the amount of information actually needed.

The book describes a **Context Compiler** as a mechanism that transforms task requirements and recognized project truth into a task-specific working context. It is not described as another AI model or an agent that owns project truth.

**Key book concepts:** Context Engineering, retrieval, retrieval tiers, Project Knowledge, Project State, Context Compiler, minimum sufficient context.

### 5.3 Authority and method control

Determine which actions are permitted, which decisions remain with people, and which changes require review or explicit approval. Keep the engineering method stable while allowing eligible executors and providers to vary through adapters.

**Key book concepts:** Authority, Controlled Autonomy, Method Lock, Semantic Contract, executor eligibility, human decision and approval.

### 5.4 Executor and Engineering Run coordination

An **AI Executor** is selected to perform a specific authorized task. An **Engineering Run** is a bounded period of engineering execution by an AI executor or a developer. A run can end while the project continues. Multiple AI systems may contribute different roles, but the project must preserve one coherent current state and a controlled path for canonical changes.

**Key book concepts:** AI Executor, Engineering Run, multiple AIs, provider change, Workspace Lock, handoff.

### 5.5 Change and project-state management

Record material engineering changes and preserve the distinction between Project Knowledge and Project State. A Run Record and Run Delta help explain what happened during an execution period. Snapshots and event records serve different purposes: a snapshot captures a state; an event record captures a material occurrence or transition.

**Key book concepts:** Change, Run Record, Run Delta, Project Knowledge, Project State, snapshot, event log, checkpoint.

### 5.6 Evidence and verification

Treat a completion statement as a claim until the required evidence has been collected and evaluated. Verification should address the requirement and the risk of the change; it does not mean blindly running every possible test for every task. Evidence should have enough context to be inspected and, where relevant, reproduced.

**Key book concepts:** AI Claim, Engineering Evidence, Verification Budget, Evidence Package, Verification Gate, risk-informed review, verified state.

### 5.7 Continuity, handoff, and recovery

Make it possible to resume work from project-owned artifacts without depending on one conversation, model, provider, or execution environment. Synchronize material changes, state, evidence, checkpoint, and next action before handoff. Preserve recovery information and block rather than guess when critical state cannot be established.

**Key book concepts:** Project Continuity, Checkpoint, Handoff Contract, Last Known Good State, Recovery, Continuity Artifact, Fail Closed.

## 6. PAECS and the BVC repository

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
- **This GitHub repository** is the public companion intended to document concepts and incrementally publish specifications, patterns, examples, and eventually a reference implementation.

This repository is **not yet a complete PAECS implementation**. A diagram or planned component must not be represented as shipped software.

## 7. Design principles

1. **Task-first:** identify what the task requires before selecting an executor.
2. **Project-owned truth:** AI memory and chat history are not canonical project state.
3. **Minimum sufficient context:** retrieve and compile only the authorized information needed for the task.
4. **Capability does not create authority:** an executor's technical ability is not permission.
5. **Method continuity:** providers and models may change without silently changing the project's engineering method.
6. **Controlled canonical writes:** unless coordinated concurrency is explicitly designed, use one authorized writer for canonical workspace changes.
7. **Evidence-based state:** do not promote a task to a verified or released state without the evidence and approvals required by policy.
8. **Explicit handoff:** synchronize changes, state, evidence, checkpoint, and next action before transferring work.
9. **Recovery is designed:** checkpoints and recovery instructions are engineering artifacts, not afterthoughts.
10. **Risk-proportionate control:** do not impose the same process on a low-risk experiment and a high-impact production change.
11. **Honest limitations:** an executor must say when it cannot access or verify something.
12. **Model and provider neutrality:** keep the method separate from provider-specific adapters.

## 8. Non-goals

BVC does not aim to:

- replace source control systems such as Git;
- replace software architecture, security engineering, testing, or product management;
- guarantee defect-free or production-safe software;
- require human approval for every low-risk action;
- require one specific AI model, IDE, agent framework, or cloud provider;
- turn every engineering task into a heavyweight workflow;
- treat all conversation messages or generated tokens as material engineering events;
- claim that a proposed specification is a stable standard before it has been validated and released.

## 9. Maturity and adoption guidance

The framework is being documented incrementally. At Draft v0.1, this repository defines vocabulary, purpose, conceptual capabilities, and architecture. It does not yet establish a stable API, complete normative schemas, a conformance suite, or a production-ready orchestration engine.

Adopters should begin with a small, low-risk workflow, record what works and what fails, and strengthen controls in proportion to project risk. Future specifications should be versioned and accompanied by valid and invalid examples, automated tests, compatibility notes, and known limitations before being described as Stable.

## 10. Source alignment

This overview follows the concepts and terminology in the English International Edition manuscript and published PDF, especially the chapters on task decomposition, model fit and cost, Project Knowledge and State, Context Engineering, Authority, multiple AI executors, verification, continuity, PAECS, architecture, release, and product outcomes.

For the exact chapter sequence and the repository mapping, see [Book Chapter Map](./book-chapter-map.md). For definitions, see [Glossary](./glossary.md).
